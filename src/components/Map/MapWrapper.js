import React, { useState, useEffect, useRef } from "react";
import { Marker, TileLayer, ZoomControl, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { StyledMap } from "./style";
import { useMapContext } from "../../context/mapContext";
import { useAppContext } from "../../context/appContext";
import { MAP_TILES, ATTRIBUTION, COLORS } from "../../settings/theme";
import MakerCategory from "./MarkerCategory";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import usePlaces from "./usePlaces";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "react-leaflet-markercluster/dist/styles.min.css"

export const DEFAULT_VIEWPORT = {
  center: {
    lat: 47.010225655683485,
    lng: 2.2631835937500004,
  },
  zoom: 6,
};

const GPS_MARKER = new L.divIcon({
  className: "icon-marker-location",
});

const MapWrapper = () => {
  const [
    {
      location,
      locateMe,
      selected,
      viewport = DEFAULT_VIEWPORT,
    },
    dispatch,
  ] = useMapContext();
  const mapRef = useRef();
  const [{ isMobile, online, menuOpened }] = useAppContext();
  const { places, loading, circleCenter } = usePlaces({})

  const history = useHistory();
  const { t } = useTranslation();

  const onViewportChanged = (event) => {
    const data = {
      center: event.target.getCenter(),
      zoom: event.target.getZoom(),
    };
    if (JSON.stringify(data) !== JSON.stringify(viewport)) {
      dispatch({
        type: "map.viewport",
        data,
      });
    }
  };

  const handleLocationFound = ({ latlng }) => {
    dispatch({ type: "map.location", data: latlng });
  };
  const handleLocationError = ({ message }) => {
    dispatch({ type: "map.location", data: null });
    msg.error(message);
  };
  useEffect(() => {
    if (location && locateMe === "success")
      dispatch({
        type: "map.viewport",
        data: {
          center: {
            lat: location.lat,
            lng: location.lng,
          },
          zoom: 12,
        },
      });
  }, [locateMe]);

  return (
    <StyledMap
      viewport={viewport}
      ref={mapRef}
      isMobile={isMobile}
      menuOpened={menuOpened}
      zoomControl={false}
      preferCanvas={true}
      onmoveend={onViewportChanged}
      onLocationfound={handleLocationFound}
      onLocationError={handleLocationError}
    >
      {loading && online && (
        <div className="loading-map-message">{t("system.loading")}...</div>
      )}
      <TileLayer
        attribution={ATTRIBUTION}
        url={MAP_TILES}
      />
      {!!circleCenter && online && Meteor.settings.public.LIMIT_SEARCH_SURFACE && (
        <Circle
          center={circleCenter}
          color={COLORS.MAIN}
          fillColor={COLORS.MAIN}
          fillOpacity="0.1"
          weight="1"
          onClick={() => history.push('/')}
          radius={Meteor.settings.public.LIMIT_SEARCH_DISTANCE}
        />
      )}
      {!isMobile && <ZoomControl position="topright" />}
      {Meteor.settings.public.LIMIT_SEARCH_SURFACE ? 
        <MakerCategory selected={selected} places={places} />
        :
        <MarkerClusterGroup disableClusteringAtZoom={11}>
          <MakerCategory selected={selected} places={places} />
        </MarkerClusterGroup>
      }

      {location && location.lng ? <Marker position={location} icon={GPS_MARKER} /> : null}
    </StyledMap>
  );
};

export default MapWrapper;
