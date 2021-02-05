import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAppContext } from "/src/context/appContext";
import { MobileNav } from "./style";
import { useHistory, useLocation } from "react-router";
import { useMapContext } from "../../context/mapContext";

const BottomMenu = () => {
  const { t } = useTranslation();
  const [{ menuOpened }, dispatch] = useAppContext();
  const [watchId, setWatcher] = useState();
  const [{ location }, updateMap] = useMapContext();
  const history = useHistory();
  const { pathname } = useLocation();
  const isList = pathname.indexOf("list") > -1;
  const pathToGo = isList ? "/list" : "/";

  const handleLocateMe = () => {
    updateMap({ type: "map.loading", data: true });
    navigator.geolocation.getCurrentPosition(
      function({ coords }){
        updateMap({
          type: "map.location",
          data: {
            lat: coords.latitude,
            lng: coords.longitude,
          },
        });
      },
      function (error){
        updateMap({ type: "map.loading", data: false });
        msg.error(error.reason);
      }, {maximumAge: 2000, timeout:5000, enableHighAccuracy:true}
    );
    if (watchId) {
      navigator.geolocation.clearWatch(watchId);
      setWatcher(null);
    } else {
      const watcher = navigator.geolocation.watchPosition(
        ({ coords }) => {
          updateMap({
            type: "map.location.follow",
            data: {
              lat: coords.latitude,
              lng: coords.longitude,
            },
          });
        },
        () => null,
        { timeout: 5000, enableHighAccuracy: true }
      );
      setWatcher(watcher);
    }
  };

  const actions = [
    {
      text: "bottom_menu.filters",
      onClick: () => {
        dispatch({ type: "menu.toggle", data: !menuOpened });
        history.push(pathToGo);
      },
      icon: "mdi-tune",
    },
    {
      text: !isList ? "bottom_menu.display_list" : "bottom_menu.display_map",
      onClick: () => {
        dispatch({ type: "menu.toggle", data: false });
        if (isList) {
          history.push("/");
        } else {
          history.push("/list");
        }
      },
      icon: !isList ? "mdi-format-list-bulleted-square" : "mdi-map",
    },
    {
      text: "bottom_menu.refresh",
      onClick: () => {
        updateMap({ type: "map.refresh", data: true });
        history.push(pathToGo);
      },
      icon: "mdi-refresh",
    },
    {
      text: "bottom_menu.locate_me",
      onClick: handleLocateMe,
      icon: !location.lng
        ? "mdi-crosshairs-question"
        : watchId
        ? "mdi-crosshairs-gps"
        : "mdi-crosshairs",
    },
  ];

  return (
    <MobileNav className="navbar is-transparent is-fixed-bottom">
      <div className="columns is-multiline is-mobile">
        {actions.map(({ icon, text, onClick }) => (
          <a
            className="column is-one-quarter is-narrow"
            key={text}
            onClick={onClick}
          >
            <span className="icon is-small">
              <i className={`mdi ${icon}`}></i>
            </span>
            <div style={{ fontSize: 12 }}>{t(text)}</div>
          </a>
        ))}
      </div>
    </MobileNav>
  );
};

export default BottomMenu;
