export const LOGOS = {
  CORDOVA: "/images/logo_one_two_lines.svg",
  DESKTOP: "/images/logo_one_line.svg",
};

export const COLORS = {
  MAIN: "#3e9f74",
  SECONDARY: "#8eaa43",
  LIGHT: "#fff",
  LIGHT_GREY: "#f0eded",
  GREY: "grey",
  DARK_GREY: "#4f4f4f",
  BACKGROUND_ICONS: "#fff",
  MENUS: {
    MENU_ICONS: {
      BACKGROUND: "#4f4f4f",
      COLOR: "#fff",
      ACTIVE: "#3e9f74",
    },
    MENU_DETAILS: {
      BACKGROUND: "#ffffff",
      COLOR: "#4f4f4f",
      HOVER: "#A4A4A4",
    },
  },
  BULMA: {
    SUCCESS: "#8EAA43",
    DANGER: "#aa0707",
  },
};

export const FONTS = {
  TITLES: "DKBorisBrush",
};

export const ICONS = {
  MARKER: "mdi-map-marker",
};

const osmFrance = {
  attrib:
    '&copy; Openstreetmap France | &copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  tiles: "https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png",
};

const osmOrg = {
  attrib:
    '&copy; <a target="_blank" href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  tiles: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
};
export const MAP_TILES = osmOrg.tiles;
export const ATTRIBUTION = osmOrg.attrib;
export const MARKER_SURFACE = Meteor.settings.public.MARKER_SURFACE;

export const MARKER_SURFACE_LNG = 0.5;
export const MARKER_SURFACE_LAT = 0.5;
