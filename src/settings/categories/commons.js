import EmailSender from "../../components/system/EmailSender";
import EmailTo from "../../components/system/EmailTo";
import TelTo from "../../components/system/TelTo";

export const access = {
  name: "access",
  label: "access.label",
  type: "checkboxes",
  options: ["access.limited_height", "access.small_path", "access.complicated"],
};
export const size = {
  name: "size",
  label: "size.label",
  type: "radios",
  options: ["size.small", "size.many", "size.big"],
};
export const natural_water = {
  name: "natural_water",
  label: "natural_water.label",
  type: "checkboxes",
  options: [
    "natural_water.nothing",
    "natural_water.river",
    "natural_water.lake",
  ],
};
export const internet = {
  name: "internet",
  label: "internet.label",
  type: "radios",
  options: ["internet.none", "internet.random", "internet.good", "internet.4g"],
};
export const pollution = {
  name: "pollution",
  label: "pollution.label",
  type: "radios",
  options: [
    "pollution.clean",
    "pollution.some_rubbish",
    "pollution.deserve_cleanup",
    "pollution.cleaned",
  ],
};
export const equipment = {
  name: "equipment",
  label: "equipment.label",
  type: "checkboxes",
  options: [
    "equipment.drinking_water",
    "equipment.trash_bin",
    "equipment.toilet",
    "equipment.table",
  ],
};
export const water_quality = {
  name: "water_quality",
  label: "water_quality.label",
  type: "radios",
  options: ["water_quality.drinking_water", "water_quality.not_drinking"],
};
// export const water_verified = {
//   name: "water_verified",
//   label: "water_verified.label",
//   type: "radios",
//   options: ["water_verified.yes", "water_verified.no"],
//   defaultValue: "water_verified.yes"
// };
export const participation = {
  name: "participation",
  label: "participation.label",
  type: "radios",
  options: ["participation.free", "participation.paid"],
};
export const garage_type = {
  name: "garage_type",
  label: "garage_type.label",
  type: "checkboxes",
  options: [
    "garage_type.pro",
    "garage_type.asso",
    "garage_type.rviste",
    "garage_type.nomad",
  ],
};
export const vehicule = {
  name: "vehicule",
  label: "vehicule.label",
  type: "checkboxes",
  options: ["vehicule.vl", "vehicule.pl", "vehicule.rv"],
};
export const usage = {
  name: "usage",
  label: "usage.label",
  type: "checkboxes",
  options: ["usage.storage", "usage.workshop"],
};
export const features = {
  name: "features",
  label: "features.label",
  type: "checkboxes",
  options: ["features.electricity", "features.water", "features.tools"],
};
export const participation_warehouse = {
  name: "participation_warehouse",
  label: "participation_warehouse.label",
  type: "checkboxes",
  options: [
    "participation_warehouse.free",
    "participation_warehouse.collectivity",
    "participation_warehouse.trade",
    "participation_warehouse.paid",
  ],
};
export const compost_type = {
  name: "compost_type",
  label: "compost_type.label",
  type: "checkboxes",
  options: ["compost_type.foodies", "compost_type.shities"],
};
export const compost_access = {
  name: "compost_access",
  label: "compost_access.label",
  type: "radios",
  options: ["compost_access.free", "compost_access.private"],
};
export const telephone = {
  name: "telephone",
  label: "telephone.label",
  type: "input",
  icon: "mdi mdi-phone",
  componentRead: TelTo,
  props: { type: "tel" },
};
export const email = {
  name: "email",
  label: "email.label",
  type: "input",
  icon: "mdi mdi-email",
  componentRead: EmailTo,
  props: { type: "email" },
};
export const emailPrivate = {
  name: "email",
  label: "email.label",
  type: "input",
  private: true,
  icon: "mdi mdi-email",
  componentRead: EmailSender,
  props: { type: "email" },
};
