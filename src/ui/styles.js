import { createGlobalStyle } from "styled-components";
import { ICONS, COLORS } from "../settings/theme";
import allCategories, { SPECIAL_CATEGORIES } from "../settings/categories";

export const AppWrapper = createGlobalStyle`

  ${allCategories.map(
    (category) => `
        .${ICONS.MARKER}.${category.name} {
            color: ${category.color};
        }
        .tag.${category.name} {
            background-color: ${category.color};
            color: white;
            margin: 3px;
        }
        .${category.icon}:not(.white) {
            color: ${category.color}
        }
    `
  )}

  .${SPECIAL_CATEGORIES.FAVORITES.NAME}.icon {
      color: ${SPECIAL_CATEGORIES.FAVORITES.COLOR};
  }
  .${SPECIAL_CATEGORIES.PRESENCES.NAME}.icon {
      color: ${SPECIAL_CATEGORIES.PRESENCES.COLOR};
  }

  .leaflet-cluster-anim .leaflet-marker-icon, .leaflet-cluster-anim .leaflet-marker-shadow {
    -webkit-transition: -webkit-transform 0.3s ease-out, opacity 0.3s ease-in;
    -moz-transition: -moz-transform 0.3s ease-out, opacity 0.3s ease-in;
    -o-transition: -o-transform 0.3s ease-out, opacity 0.3s ease-in;
    transition: transform 0.3s ease-out, opacity 0.3s ease-in;
  }

  .leaflet-cluster-spider-leg {
    /* stroke-dashoffset (duration and function) should match with leaflet-marker-icon transform in order to track it exactly */
    -webkit-transition: -webkit-stroke-dashoffset 0.3s ease-out, -webkit-stroke-opacity 0.3s ease-in;
    -moz-transition: -moz-stroke-dashoffset 0.3s ease-out, -moz-stroke-opacity 0.3s ease-in;
    -o-transition: -o-stroke-dashoffset 0.3s ease-out, -o-stroke-opacity 0.3s ease-in;
    transition: stroke-dashoffset 0.3s ease-out, stroke-opacity 0.3s ease-in;
  }
  .message {
    .message-body {
      text-align: justify;
    }
  }
  .button.is-info *, .button.is-danger *, .button.is-success *{
    color: white !important;
  }
  a {
    text-decoration: none !important;
  }

  a.phone-link, a.email-link {
    text-decoration: underline !important;
    color: ${COLORS.MAIN} !important;
    font-weight: bold;
  }
  .leaflet-bottom.leaflet-right{
    bottom: 3px;
  }
`;
