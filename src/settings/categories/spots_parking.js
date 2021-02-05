import {
  access,
  size,
  natural_water,
  internet,
  pollution,
  equipment,
} from "./commons";

const spots_parking = {
  name: "SPOTS_PARKING",
  type: "spots",
  slug: "parkings",
  order: 2,
  color: "#054A61",
  color_text: "#fff",
  icon: "mdi-parking",
  fields: [access, size, natural_water, internet, equipment, pollution],
  comments: true,
  delete_steps: 3,
  presences: true,
};

export default spots_parking;
