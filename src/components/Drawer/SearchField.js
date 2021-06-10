import React, { useState, useEffect, useRef } from "react";
import { handleInput, useOnClickOutside } from "/src/api/utils/hooks";
import { useTranslation } from "react-i18next";
import { useSpring, animated, useTransition } from "react-spring";
import { useMapContext } from "../../context/mapContext";
import {
  SearchWithMobileStyle,
  SearchWithStyle,
  ResultsBox,
  SmallDivider,
} from "./style";
import { useAppContext } from "../../context/appContext";
import allCategories, { SPECIAL_CATEGORIES } from "../../settings/categories";
import Places from "../../api/spots/model";
import { useTracker } from "meteor/react-meteor-data";
import { Link, useHistory } from "react-router-dom";
import geolib from "geolib";
import { OpenStreetMapProvider } from "leaflet-geosearch";
import { DEFAULT_VIEWPORT } from "../Map/MapWrapper";
const { FAVORITES } = SPECIAL_CATEGORIES;

const provider = new OpenStreetMapProvider({
  params: {
    email: "contact@mexar.fr", // auth for large number of requests
    "accept-language": "fr", // render results in French
    countrycodes: "fr", // limit search results to the France
  },
});

const SearchField = ({ onClose }) => {
  const [search, setSearch] = useState("");
  const [
    { location, loading, selected, viewport = DEFAULT_VIEWPORT },
    updateMap,
  ] = useMapContext();
  const [{ isMobile, isTablet }] = useAppContext();
  const { t } = useTranslation();
  const history = useHistory();
  const [mapResults, setMapResults] = useState([]);

  useEffect(() => {
    if (search) {
      provider.search({ query: search }).then((results) => {
        setMapResults(
          results
            .map((l) => ({
              ...l,
              distance: geolib.getPreciseDistance(
                { latitude: location.lat || 0, longitude: location.lng || 0 },
                { latitude: l.y, longitude: l.x }
              ),
            }))
            .sort((a, b) => a.distance - b.distance)
        );
      });
    }
  }, [search]);

  const results = useTracker(() => {
    Meteor.subscribe("places.search", {
      categories: selected,
      favorites: selected.indexOf(FAVORITES.NAME) > -1,
      search,
    });

    const regex = { $regex: new RegExp(search, "i") };
    const query = {
      $or: [{ name: regex }, { description: regex }, { address: regex }],
    };
    return Places.find(query, { limit: 10 })
      .fetch()
      .map((l) => ({
        ...l,
        distance: geolib.getPreciseDistance(
          { latitude: location.lat || 0, longitude: location.lng || 0 },
          { latitude: l.latitude, longitude: l.longitude }
        ),
      }))
      .sort((a, b) => a.distance - b.distance);
  }, [search]);

  const ref = useRef();
  useOnClickOutside(ref, () => setSearch(""));

  useEffect(() => {
    document.getElementById("search").focus();
  }, []);

  const handleChange = handleInput(({ value }) => {
    setSearch(value);
  });
  const resetSearch = () => setSearch("");

  const animation = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
  });
  const handleLocateMe = () => {
    updateMap({ type: "map.loading", data: true });
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        updateMap({
          type: "map.location",
          data: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      },
      (error) => {
        msg.error(error.reason);
      },
      { timeout: 30000, enableHighAccuracy: true }
    );
    setTimeout(() => {
      updateMap({ type: "map.loading", data: false });
    }, 3000);
  };

  const handleOnFocus = () => {
    if (search === t("geolocalise")) {
      setSearch("");
    }
  };

  const refreshMap = () => {
    if (isMobile) {
      onClose();
    }
    updateMap({
      type: "categories.change",
      data: allCategories.map(({ name }) => name),
    });
    history.push("/");
  };

  const updateViewport = (coord) => {
    updateMap({
      type: "map.viewport",
      data: {
        center: {
          lat: coord.y,
          lng: coord.x,
        },
        zoom: viewport.zoom,
      },
    });
    setSearch(null);
  };
  const transitions = useTransition(results, (item) => item._id, {
    from: { opacity: 0, transform: "translate3d(-25%, 0px, 0px)" },
    enter: { opacity: 1, transform: "translate3d(0%, 0px, 0px)" },
    leave: { opacity: 0, height: 0, transform: "translate3d(25%, 0px, 0px)" },
  });

  const Field = (
    <div className="field has-addons">
      <div className="control has-icons-left has-icons-right">
        <input
          className={`input ${isMobile ? "is-medium" : ""}`}
          type="text"
          onFocus={handleOnFocus}
          value={search}
          onChange={handleChange}
          name="search"
          id="search"
          autoComplete="off"
          placeholder={t("search.label")}
        />
        {!!search && (
          <span className="icon is-small is-right" onClick={resetSearch}>
            <a className="delete"></a>
          </span>
        )}
        <span className="icon is-small is-left">
          <i className="mdi mdi-magnify"></i>
        </span>
      </div>
      <div className="control">
        <a
          className={`button ${isMobile ? "is-medium" : ""} ${
            loading ? "is-loading" : ""
          }`}
          onClick={handleLocateMe}
        >
          {!loading && (
            <span className="icon is-small">
              <i className="mdi mdi-crosshairs-gps"></i>
            </span>
          )}
        </a>
      </div>
    </div>
  );

  const ResultsWrapper = (
    <ResultsBox className="box" isMobile={isMobile}>
      <div className="menu">
        <p className="menu-label">{t("system.results")}</p>
        <ul className="menu-list">
          {mapResults.length && (
            <>
              {mapResults.map(
                ({ label, distance, x, y }, i) =>
                  i < 2 && (
                    <li key={Math.random()}>
                      <a onClick={() => updateViewport({ x, y })}>
                        <span className="is-large icon">
                          <i className={`mdi mdi-map-marker mdi-24px`}></i>
                        </span>
                        <div className="information">
                          <div className="address">
                            {label}{" "}
                            {!!location &&
                              `- ${Math.round(distance / 100) / 10}km`}
                          </div>
                        </div>
                      </a>
                    </li>
                  )
              )}

              <li>
                <SmallDivider />
              </li>
            </>
          )}
          {transitions.map(({ item = {}, props }) => {
            const { name, address, category = [], _id, distance } = item;
            const currentCategory =
              (!!category &&
                allCategories.find(({ name }) => name === category[0])) ||
              {};

            return (
              <animated.li key={Math.random()} style={props}>
                <Link
                  to={`/map/places/${_id}?center=true&zoom=12`}
                  onClick={refreshMap}
                >
                  <span className="is-large icon" data-tip data-for={category}>
                    <i
                      className={`mdi ${currentCategory.icon} mdi-24px ${category}`}
                    ></i>
                  </span>
                  <div className="information">
                    <div className="name">{name}</div>
                    <div className="address">
                      {address}{" "}
                      {!!location && `- ${Math.round(distance / 100) / 10}km`}
                    </div>
                  </div>
                </Link>
              </animated.li>
            );
          })}
        </ul>
      </div>
    </ResultsBox>
  );

  if (!isMobile) {
    return (
      <SearchWithStyle ref={ref} isTablet={isTablet}>
        {Field}
        {(!!results.length || !!mapResults.length) &&
          !!search &&
          ResultsWrapper}
      </SearchWithStyle>
    );
  }

  return (
    <SearchWithMobileStyle
      className="modal is-active"
      style={animation}
      isMobile={isMobile}
      ref={ref}
    >
      <div className="modal-background" onClick={onClose}></div>
      <div className="modal-content">
        {Field}
        {(!!results.length || !!mapResults.length) &&
          !!search &&
          ResultsWrapper}
      </div>
    </SearchWithMobileStyle>
  );
};

export default SearchField;
