import React, { useMemo, useState } from "react";
import { Marker, Tooltip, Circle, useMapEvents } from "react-leaflet";
import L from 'leaflet'
import { withRouter } from "react-router";
import { POINTER_ICONS, ICON_SIZE } from "./categories_markers";
import { COLORS } from "../../settings/theme";
import usePlaces from "./usePlaces";
import { useMapContext } from "../../context/mapContext";
import { SPECIAL_CATEGORIES } from "../../settings/categories";
import { useTranslation } from "react-i18next";

import SVG_ICONS from "./svg_icons";
import { DEFAULT_VIEWPORT } from "./MapWrapper";

const { PRESENCES, FAVORITES, NEW_PLACE } = SPECIAL_CATEGORIES

const MapContent = (props) => {
  const {
    history,
    location: { pathname },
    online
  } = props;

  const [
    {
      selected,
      viewport = DEFAULT_VIEWPORT,
    },
    dispatch,
  ] = useMapContext();
  const [newPlaceMarker, setNewPlaceMarker] = useState()
  const { t } = useTranslation()
  const handleCreateMarker = ({ latlng })=> {
    setNewPlaceMarker(latlng)
  }
  const handleCreatePlace = () =>{
    if(!Meteor.userId){
      msg.error(`${t("system.you_need_an_account")}`);
    }
    history.push(`/newplace?lat=${newPlaceMarker.lat}&lng=${newPlaceMarker.lng}`);
    setNewPlaceMarker()
  }
  
  const map = useMapEvents({
    click: () => {
      history.push('/')
    },
    moveend: (event) => {
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
    },
    locationfound: ({ latlng }) => {
      dispatch({ type: "map.location", data: latlng });
      map.flyTo(latlng, map.getZoom())
    },
    locationerror: ({ message }) => {
      dispatch({ type: "map.location", data: null });
      msg.error(message);
    },
    contextmenu: handleCreateMarker
  })

  const { places, loading, circleCenter } = usePlaces({})

  const iconFinder = (place) => {
    const currentCateg = place.category.find(c => selected.indexOf(c) > -1) || place.category[0]
    return pathname.indexOf(place._id) > -1
              ? POINTER_ICONS[currentCateg].active
              : POINTER_ICONS[currentCateg].default
  }
  
  const displayCircle = !!circleCenter && online && selected.indexOf(PRESENCES.NAME) === -1 && selected.indexOf(FAVORITES.NAME) === -1 && Meteor.settings.public.LIMIT_SEARCH_SURFACE

  const markers = useMemo(() => (
    places.map((place) => (
      <Marker
        position={[place.latitude, place.longitude]}
        icon={iconFinder(place)}
        key={place._id}
        eventHandlers={{
          click: () => {
            history.push(`/map/places/${place._id}`);
            setNewPlaceMarker();
          },
        }}
      >
        <Tooltip
          direction="top"
          className={place.category.find(c => selected.indexOf(c) > -1) || place.category[0]}
          offset={[0, -(4 * ICON_SIZE + 15)]}
          opacity={1}
        >
          {place.name}
        </Tooltip>
      </Marker>
    ))
  ), [places])


  const newPlaceMarkerComp = useMemo(() => newPlaceMarker ? (
    <Marker
          position={[newPlaceMarker.lat, newPlaceMarker.lng]}
          icon={new L.divIcon({
            html: SVG_ICONS.NEW_PLACE(true),
          })}
          eventHandlers={{
            click: handleCreatePlace
          }}
        >
          <Tooltip
            direction="top"
            permanent
            className={NEW_PLACE.NAME}
            offset={[0, -(4 * ICON_SIZE + 15)]}
            opacity={1}
          >
            {t("map.new_place_tooltip")}
          </Tooltip>
        </Marker>
  ) : null, [newPlaceMarker])

  return (
    <>
      {loading && (
        <div className="loading-map-message">{t("system.loading")}...</div>
      )}
      {displayCircle && (
        <Circle
          center={circleCenter}
          color={COLORS.MAIN}
          fillOpacity="0"
          weight="2"
          eventHandlers={{
            contextmenu: handleCreateMarker
          }}
          radius={Meteor.settings.public.LIMIT_SEARCH_DISTANCE}
        />
      )}
      {newPlaceMarkerComp}
      {markers}
    </>
    );
};

export default withRouter(MapContent);
