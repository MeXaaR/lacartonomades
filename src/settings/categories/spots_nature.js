import { access, size, natural_water, internet, pollution } from "./commons";

const spots_natures = {
  name: "SPOTS_NATURE",
  type: "spots",
  slug: "natures",
  order: 0,
  color: "#00964c",
  color_text: "#fff",
  icon: "mdi-leaf",
  fields: [access, size, natural_water, internet, pollution],
  comments: true,
  delete_steps: 3,
  presences: true,
};

export default spots_natures;
