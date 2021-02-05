import nature from "./spots_nature";
import parking from "./spots_parking";
import aera from "./spots_rest_aera";
import private from "./spots_private_land";
import water from "./utils_water";
import wood_dust from "./utils_wood_dust";
import oil from "./utils_oil";
import garage from "./utils_garage";
import warehouse from "./utils_warehouse";
import compost from "./utils_compost";

function sortCategories(a, b) {
  if (a.order < b.order) return -1;
  if (a.order > b.order) return 1;
  return 0;
}

const allCategories = [
  parking,
  nature,
  aera,
  private,
  water,
  wood_dust,
  oil,
  garage,
  warehouse,
  compost,
].sort(sortCategories);

export const allTypes = ["spots", "utils"];
export const forbidden_gathering = [
  [parking.name, nature.name, aera.name, private.name],
  // [parking.name, nature.name],
  // [parking.name, aera.name],
];

export const SPECIAL_CATEGORIES = {
  FAVORITES: {
    NAME: "FAVORITES",
    ICON: "mdi-heart",
    COLOR: "#c21026",
  },
  PRIVATES: {
    NAME: "PRIVATES",
    ICON: "mdi-map-marker-circle",
    COLOR: "grey",
  },
  PRESENCES: {
    NAME: "PRESENCES",
    ICON: "mdi-account-group",
    COLOR: "#3e9f74",
  },
};

export default allCategories;
