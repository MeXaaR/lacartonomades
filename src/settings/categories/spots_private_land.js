import {
  access,
  size,
  natural_water,
  internet,
  pollution,
  equipment,
  emailPrivate,
  telephone,
} from "./commons";

const spots_private_land = {
  name: "SPOTS_PRIVATE_LAND",
  type: "spots",
  slug: "private",
  information: "information.spots_private_land",
  order: 3,
  color: "#B9C13C",
  color_text: "#fff",
  icon: "mdi-home-account",
  fields: [
    emailPrivate,
    telephone,
    access,
    size,
    natural_water,
    internet,
    equipment,
    pollution,
  ],
  comments: true,
  delete_steps: 1,
  presences: true,
  onlyOwner: true,
};

export default spots_private_land;
