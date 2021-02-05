import { participation_warehouse, usage, features } from "./commons";

const utils_warehouse = {
  name: "UTILS_WAREHOUSE",
  type: "utils",
  slug: "warehouse",
  order: 8,
  color: "#808199",
  color_text: "#fff",
  icon: "mdi-barn",
  fields: [usage, features, participation_warehouse],
  comments: true,
  delete_steps: 3,
  presences: true,
};

export default utils_warehouse;
