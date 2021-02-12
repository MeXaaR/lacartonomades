import React, { useState, useEffect, useRef } from "react";
import { Marker, TileLayer, ZoomControl, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { StyledMap } from "./style";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import { MAP_TILES, ATTRIBUTION, ICONS } from "../../settings/theme";
import findAddressFromLocation from "../../api/utils/findAddressFromLocation";

const DEFAULT_VIEWPORT = {
  center: [47.010225655683485, 2.2631835937500004],
  zoom: 5,
};
const ICON_SIZE = 12
const MARKER = new L.divIcon({
  className: `${Meteor.isCordova ? "mobile" : "desktop"}`,
  html: `
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlns:xlink="http://www.w3.org/1999/xlink" 
      version="1.1" 
      width="${4 * ICON_SIZE}" 
      height="${4 * ICON_SIZE}" 
      viewBox="0 0 ${2 * ICON_SIZE} ${2 * ICON_SIZE}" 
      class="ICONS_MARKER"
    >
      <path 
        d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z" 
      />
    </svg>
  `,
});

const SmallMap = ({ position, onChange, getAddress, noUpdate }) => {
  const { t } = useTranslation();
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);
  const refmarker = useRef();

  const onViewportChanged = (viewport) => {
    if (!noUpdate) {
      setViewport(viewport);
    }
  };
  const handleLocationFound = ({ latlng }) => {
    if (!noUpdate) {
      dispatch({ type: "map.location", data: latlng });
    }
  };
  const handleLocationError = ({ message }) => {
    dispatch({ type: "map.location", data: null });
    msg.error(message);
  };
  useEffect(() => {
    if (position && position[0]) {
      setViewport({
        center: {
          lat: position[0],
          lng: position[1],
        },
        zoom: viewport.zoom > 14 ? viewport.zoom : 14,
      });
    }
  }, [position]);


  const updatePosition = () => {
    const marker = refmarker.current;
    if (marker != null) {
      const coordinates = Object.values(marker.leafletElement.getLatLng());
      findAddressFromLocation(coordinates, (address) =>
        onChange({
          address,
          coordinates,
        })
      );
    }
  };

  return (
    <StyledMap
      small
      onViewportChanged={onViewportChanged}
      viewport={viewport}
      zoomControl={false}
      onLocationfound={handleLocationFound}
      onLocationError={handleLocationError}
      scrollWheelZoom={!noUpdate}
      dragging={!noUpdate}
    >
      <TileLayer attribution={ATTRIBUTION} url={MAP_TILES} />
      <ZoomControl position="topright" />

      {!!position && (
        <Marker
          position={position}
          draggable={!noUpdate}
          icon={MARKER}
          onDragend={updatePosition}
          ref={refmarker}
        >
        <Tooltip
          direction="top"
          offset={[0, -(4 * ICON_SIZE + 15)]}
          opacity={1}
        >
          {t("map.drag_me_around")}
        </Tooltip>
        </Marker>
      )}
    </StyledMap>
  );
};

export default SmallMap;
