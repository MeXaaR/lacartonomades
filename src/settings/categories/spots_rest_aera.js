import {
  access,
  size,
  natural_water,
  internet,
  pollution,
  equipment,
} from "./commons";

const spots_rest_aera = {
  name: "SPOTS_REST_AERA",
  type: "spots",
  slug: "rest_aera",
  order: 1,
  color: "#4ac1ad",
  color_text: "#fff",
  icon: "mdi-nature-people",
  fields: [access, size, natural_water, internet, equipment, pollution],
  comments: true,
  delete_steps: 3,
  presences: true,
};

export default spots_rest_aera;
