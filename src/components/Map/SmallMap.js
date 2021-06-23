import React, { useState, useEffect } from "react";
import { Marker, TileLayer, ZoomControl, Tooltip, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { StyledMap } from "./style";
import L from "leaflet";
import { useTranslation } from "react-i18next";
import { MAP_TILES, ATTRIBUTION } from "../../settings/theme";
import findAddressFromLocation from "../../api/utils/findAddressFromLocation";
import SVG_ICONS from "./svg_icons";
import { useMapContext } from "../../context/mapContext";
import { useQuery } from "../../api/utils/hooks";

const DEFAULT_VIEWPORT = {
  center: [47.010225655683485, 2.2631835937500004],
  zoom: 8,
};
const ICON_SIZE = 12
const MARKER = new L.divIcon({
  className: `${Meteor.isCordova ? "mobile" : "desktop"}`,
  html: SVG_ICONS.NEW_PLACE(),
});

const SmallMap = ({ position, onChange, getAddress, noUpdate }) => {
  const [viewport, setViewport] = useState(DEFAULT_VIEWPORT);

  useEffect(() => {
    if (getAddress) {
      findAddressFromLocation(position, (address) =>
        onChange({
          address,
        })
      );
    }
  }, [getAddress]);



  return (
    <StyledMap
      small
      center={viewport.center}
      zoom={viewport.zoom || 8}
      zoomControl={false}
      scrollWheelZoom={!noUpdate}
      dragging={!noUpdate}
    >
      <TileLayer attribution={ATTRIBUTION} url={MAP_TILES} />
      <ZoomControl position="topright" />

      <MapContent noUpdate={noUpdate} position={position} onChange={onChange} viewportHook={[viewport, setViewport]} />
    </StyledMap>
  );
};

export default SmallMap;

const MapContent = ({ noUpdate, position, onChange, viewportHook: [viewport, setViewport] }) => {
  const { t } = useTranslation();
  const [{ location, locateMe }] = useMapContext();
  const { lat, lng } = useQuery()


  const map = useMapEvents({
    locationerror: ({ message }) => {
      dispatch({ type: "map.location", data: null });
      msg.error(message);
    },
    locationfound: ({ latlng }) => {
      console.log(latlng)
      if (!noUpdate) {
        map.flyTo(latlng, map.getZoom())
        dispatch({ type: "map.location", data: latlng });
      }
    },
  })

  const updatePosition = ({ target: { _latlng } }) => {
    const coordinates = Object.values(_latlng);
    map.flyTo(_latlng, map.getZoom())
    onChange({
      coordinates,
    });
    findAddressFromLocation(coordinates, (address) =>
      onChange({
        address,
      })
    );
  };

  useEffect(() => {
    if(lat && lng){
      updatePosition({ target: { _latlng: { lat, lng }}})
    }
  }, [])
  
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


  return !!position && (
    <Marker
      position={position}
      draggable={!noUpdate}
      icon={MARKER}
      eventHandlers={{
        dragend: updatePosition,
      }}
    >
      <Tooltip
        direction="top"
        offset={[0, -(4 * ICON_SIZE + 15)]}
        opacity={1}
      >
        {t("map.drag_me_around")}
      </Tooltip>
    </Marker>
  )
}