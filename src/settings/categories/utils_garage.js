import { vehicule, garage_type, telephone, email } from "./commons";

const utils_garage = {
  name: "UTILS_GARAGE",
  type: "utils",
  slug: "garage",
  order: 7,
  color: "#d17559",
  color_text: "#fff",
  icon: "mdi-wrench",
  fields: [telephone, email, vehicule, garage_type],
  comments: true,
  delete_steps: 3,
};

export default utils_garage;
