import React, { useState } from "react";
import { useMapContext } from "../../context/mapContext";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import styled from "styled-components";
import findAddressFromLocation from "../../api/utils/findAddressFromLocation";
import { useToggle } from "../../api/utils/hooks";
const provider = new OpenStreetMapProvider({
  params: {
    email: "contact@mexar.fr", // auth for large number of requests
    "accept-language": "fr", // render results in French
    countrycodes: "fr", // limit search results to the France
  },
});

const ChoicesWrapper = styled.div`
  position: absolute;
  z-index: 10;
  background-color: white;
  width: 100%;
  border-bottom-left-radius: 8px;
  padding: 5px;
  /* box-shadow: 5px 0 5px rgba(0,0,0,0.2); */
  border-bottom-right-radius: 8px;
  top: 40px;
  border: 1px solid lightgrey;
  border-top: none;
  .single-choice {
    padding-top: 5px;
    padding: 5px;
    border-top: 1px solid lightgrey;
    cursor: pointer;
  }
  .single-choice:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .single-choice:first-child {
    border-top: none;
  }
  .second-line {
    color: grey;
    font-size: 14px;
  }
  i {
    color: grey;
    margin-right: 8px;
  }
`;
let timer
const Geocoder = ({ onChange, label, coordinates, address, ...props }) => {
  const [{ location, loading, locateMe }, dispatch] = useMapContext();
  const [choices, setChoices] = useState([]);
  const [searching, setSearching] = useState(false)
  const [value, setValue] = useState("");
  const handleUpdate = ({ target }) => {
    setValue(target.value);
    onChange({ address: target.value });
    if(timer){
      clearTimeout(timer)
    }
    if(target.value){
      timer = setTimeout(() => {
        onSubmitSearch(target.value)
      }, 1000)
    }
  };
  const handleLocateMe = () => {
    dispatch({ type: "map.locateMe" });
    navigator.geolocation.getCurrentPosition(
      async (data) => {
        const { coords } = data;
        const results = await provider.search({
          query: [coords.latitude, coords.longitude],
        });
        setChoices(results);
        dispatch({
          type: "map.location",
          data: [coords.latitude, coords.longitude],
        });
        onChange({
          coordinates: [coords.latitude, coords.longitude],
        });

        findAddressFromLocation(
          [coords.latitude, coords.longitude],
          (address) =>
            onChange({
              address,
            })
        );
      },
      (error) => {
        dispatch({ type: "map.location", data: [] });
        msg.error(error.reason);
      },
      { timeout: 5000, enableHighAccuracy: true }
    );
  };
  const onSubmitSearch = async (query) => {
    setSearching(true)
    try {
      const results = await provider.search({ query: query ? query : value });
      setChoices(results);
      setSearching(false)
    } catch (error) {
      setChoices([]);
      setSearching(false)
    }
  };

  const selectPlace = (place) => {
    const arrayName = place.label.split(", ");
    const address = arrayName.slice(0, 4).join(", ");
    onChange({ coordinates: [place.y, place.x], address });
    setChoices([]);
  };

  return (
    <>
      {!!label && <label className="label">{label}</label>}
      <div
        className="field has-addons"
        style={{ position: "relative" }}
        onSubmit={onSubmitSearch}
      >

        <div className={`control ${loading ? "is-loading" : ""} is-expanded`}>
          <input
            className="input"
            {...props}
            onChange={handleUpdate}
            autoComplete="false"
            onBlur={() => {
              setTimeout(() => {
                setChoices([])
              }, 500);
            }}
            value={address}
          />
        </div>
        <div className="control">
          <a
            className={`button is-success ${searching ? "is-loading" : ""}`}
            onClick={onSubmitSearch}
          >
            {!searching && (
              <span className="icon is-small">
                <i className="mdi mdi-magnify"></i>
              </span>
            )}
          </a>
        </div>
        <div className="control">
          <a
            className={`button is-info ${loading ? "is-loading" : ""}`}
            onClick={handleLocateMe}
          >
            {!loading && (
              <span className="icon is-small">
                <i className="mdi mdi-crosshairs-gps"></i>
              </span>
            )}
          </a>
        </div>
        {!!choices.length && (
          <ChoicesWrapper>
            {choices.map((place) => {
              const { label, x, y, raw } = place;
              const coords = [x, y];
              const arrayName = label.split(", ");
              const firstLine = arrayName.slice(0, 3).join(", ");
              const secondLine = arrayName.slice(3).join(", ");
              return (
                <div
                  className="single-choice"
                  key={raw.place_id}
                  onClick={() => selectPlace(place)}
                >
                  <div className="first-line">
                    <span className="is-small icon">
                      <i className={`mdi mdi-map-marker`}></i>
                    </span>
                    {firstLine}
                  </div>
                  <div className="second-line">{secondLine}</div>
                </div>
              );
            })}
          </ChoicesWrapper>
        )}
      </div>
    </>
  );
};

export default Geocoder;
