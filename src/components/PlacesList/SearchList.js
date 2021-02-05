import React, { useState, useEffect, useRef } from "react";
import { handleInput } from "/src/api/utils/hooks";
import { useTranslation } from "react-i18next";
import { useMapContext } from "../../context/mapContext";
import { SearchWithStyle } from "../Drawer/style";
import { useAppContext } from "../../context/appContext";

const SearchList = ({ search, setSearch }) => {
  const [{ location, loading, locateMe }, updateMap] = useMapContext();
  const [{ isMobile, isTablet }] = useAppContext();
  const { t } = useTranslation();

  useEffect(() => {
    document.getElementById("search").focus();
  }, []);

  const handleChange = handleInput(({ value = "" }) => {
    setSearch(value);
  });
  const resetSearch = () => setSearch("");

  const handleLocateMe = () => {
    updateMap({ type: "map.locateMe" });
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
        updateMap({ type: "map.location", data: [] });
        msg.error(error.reason);
      },
      { timeout: 30000, enableHighAccuracy: true }
    );
  };

  return (
    <SearchWithStyle list>
      <div className={`field has-addons`}>
        <div className="control has-icons-left has-icons-right">
          <input
            className={`input ${isMobile ? "is-medium" : ""}`}
            type="text"
            value={search}
            onChange={handleChange}
            name="search"
            id="search"
            autoComplete="off"
            placeholder={t("search.label")}
          />
          {search && (
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
    </SearchWithStyle>
  );
};

export default SearchList;
