import { water_quality, participation } from "./commons";

const utils_water = {
  name: "UTILS_WATER",
  type: "utils",
  slug: "water",
  order: 4,
  color: "#6FACC0",
  color_text: "#fff",
  icon: "mdi-water",
  fields: [participation],
  comments: true,
  delete_steps: 2,
};

export default utils_water;
