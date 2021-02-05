import React, { memo } from "react";
import { Marker, Tooltip } from "react-leaflet";
import { useHistory, withRouter } from "react-router";
import { POINTER_ICONS, ICON_SIZE } from "./categories_markers";

const MakerCategory = (props) => {
  const {
    places,
    selected,
    location: { pathname },
  } = props;

  const iconFinder = (place) => {
    const currentCateg = place.category.find(c => selected.indexOf(c) > -1) || place.category[0]
    return pathname.indexOf(place._id) > -1
              ? POINTER_ICONS[currentCateg].active
              : POINTER_ICONS[currentCateg].default
  }
  
  const history = useHistory();
  return places.map((place) => (
    <Marker
      position={[place.latitude, place.longitude]}
      icon={iconFinder(place)}
      key={place._id}
      onClick={() => {
        history.push(`/map/places/${place._id}`);
      }}
    >
      <Tooltip
        direction="top"
        // permanent={pathname.indexOf(place._id) > -1}
        className={place.category.find(c => selected.indexOf(c) > -1) || place.category[0]}
        offset={[0, -(4 * ICON_SIZE + 15)]}
        opacity={1}
      >
        {place.name}
      </Tooltip>
    </Marker>
  ));
};

function areEqual(prevProps, nextProps) {
  return JSON.stringify(prevProps) === JSON.stringify(nextProps);
}

export default withRouter(memo(MakerCategory, areEqual));
