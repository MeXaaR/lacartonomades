import { compost_access, compost_type } from "./commons";

const utils_compost = {
  name: "UTILS_COMPOST",
  type: "utils",
  slug: "compost",
  order: 9,
  color: "#9d7e70",
  color_text: "#fff",
  icon: "mdi-recycle",
  fields: [compost_type, compost_access],
  comments: true,
  delete_steps: 3,
};

export default utils_compost;
