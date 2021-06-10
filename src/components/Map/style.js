import { MapContainer } from 'react-leaflet'
import styled, { css } from 'styled-components'
import { POINTER_ICONS, ICON_SIZE } from "./categories_markers";
import { COLORS, ICONS } from '/src/settings/theme'
import allCategories, { SPECIAL_CATEGORIES } from '../../settings/categories'

export const StyledMap = styled(MapContainer)`
  position: relative;
  ${({ small, menuOpened, isMobile }) =>
    small
      ? css`
          height: 300px;
          width: 100%;
          z-index: 3;
          margin-bottom: 15px;
        `
      : css`
          height: calc(100vh - 52px);
          overflow: hidden;
          /* height: 100%; */
          width: 100%;
          z-index: 0;
          transition: all 0.2s ease-in-out;
        `}
  .ICONS_MARKER {
    position: relative;
    margin-top: -35px !important;
    margin-left: -20px !important;
    /* text-shadow: rgba(0, 0, 0, 0.5) 18px -7px 19px; */
    .pointer {
      height: ${4 * ICON_SIZE}px;
      width: ${4 * ICON_SIZE}px;
    }
  }

  .leaflet-tooltip {
      margin-top: 5px;
  }
  .leaflet-div-icon {
    background: transparent;
    border: none;
  }

  /* when hover */
  .ICONS_MARKER:hover{
    transform: scale(1.3, 1.3) translateY(-${0.5 * ICON_SIZE}px);
  }
  /* when is active */
  .ICONS_MARKER.is-active{
    transform: scale(1.3, 1.3) translateY(-${0.5 * ICON_SIZE}px);
  }

  ${allCategories.map(
    (category) => `
      .ICONS_MARKER.${category.name} {
        fill:${category.color};
      }
      .leaflet-tooltip.${category.name} {
          background-color: ${category.color};
          border: 1px solid ${category.color};
          color: ${category.color_text};
          margin-left: -${ICON_SIZE / 3}px;
      } 
      .leaflet-tooltip.${category.name}::before {
          border-top-color: ${category.color};
      }
    `
  )}

  .ICONS_MARKER.${SPECIAL_CATEGORIES.NEW_PLACE.NAME} {
    fill:${SPECIAL_CATEGORIES.NEW_PLACE.COLOR};
  }
  .leaflet-tooltip.${SPECIAL_CATEGORIES.NEW_PLACE.NAME} {
      background-color: ${SPECIAL_CATEGORIES.NEW_PLACE.COLOR};
      border: 1px solid ${SPECIAL_CATEGORIES.NEW_PLACE.COLOR};
      color: ${SPECIAL_CATEGORIES.NEW_PLACE.COLOR_TEXT};
      margin-left: -${ICON_SIZE / 3}px;
  } 
  .leaflet-tooltip.${SPECIAL_CATEGORIES.NEW_PLACE.NAME}::before {
      border-top-color: ${SPECIAL_CATEGORIES.NEW_PLACE.COLOR};
  }
  .icon-marker-location {
    border-radius: 50%;
    background-color: #5353e8;
    box-shadow: 0px 0px 5px 0px rgba(60, 54, 235, 1);
  }
  ${({ menuOpened, isMobile }) => css`
    .loading-map-message {
      position: fixed;
      bottom: ${isMobile ? '56px' : '0'};
      left: ${menuOpened && !isMobile ? '350px' : '0'};
      background-color: #1b4947;
      padding: 5px 20px;
      color: white;
      z-index: 1000;
      border-top-right-radius: 5px;
      opacity: 0.85;
    }
  `}
`
