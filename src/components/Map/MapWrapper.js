import React, { useEffect } from 'react';
import { Marker, TileLayer, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { StyledMap } from './style';
import { useMapContext } from '../../context/mapContext';
import { useAppContext } from '../../context/appContext';
import { MAP_TILES, ATTRIBUTION } from '../../settings/theme';
import MapContent from './MapContent';

export const DEFAULT_VIEWPORT = {
  center: {
    lat: 47.010225655683485,
    lng: 2.2631835937500004,
  },
  zoom: 6,
};

const GPS_MARKER = new L.divIcon({
  className: 'icon-marker-location',
});

const MapWrapper = () => {
  const [{ location, locateMe, viewport = DEFAULT_VIEWPORT }, dispatch] =
    useMapContext();
  const [{ isMobile, online, menuOpened }, setState] = useAppContext();

  useEffect(() => {
    if (location && locateMe === 'success')
      dispatch({
        type: 'map.viewport',
        data: {
          center: {
            lat: location.lat,
            lng: location.lng,
          },
          zoom: 12,
        },
      });
  }, [locateMe]);

  const setMapState = mapref => {
    setState({
      type: 'map',
      data: mapref,
    });
  };

  return (
    <StyledMap
      center={viewport.center}
      zoom={viewport.zoom || 8}
      isMobile={isMobile}
      menuOpened={menuOpened}
      zoomControl={false}
      // preferCanvas={true}
      // renderer={L.canvas()}
      whenCreated={setMapState}
    >
      >
      <TileLayer attribution={ATTRIBUTION} url={MAP_TILES} />
      {!isMobile && <ZoomControl position="topright" />}
      <MapContent online={online} />
      {location && location.lng ? (
        <Marker position={location} icon={GPS_MARKER} />
      ) : null}
    </StyledMap>
  );
};

export default MapWrapper;
