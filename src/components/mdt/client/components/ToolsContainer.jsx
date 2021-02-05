import React from "react";
import { ActionZone } from "../utils/styles";
import AutoPublish from "./AutoPublish";
import Impersonate from "./Impersonate";
import MethodsHandlers from "./MethodsHandlers";
import MeteorStatus from "./MeteorStatus";

const ToolsContainer = ({ handleClose }) => (
  <ActionZone onContextMenu={handleClose}>
    <AutoPublish />
    <Impersonate />
    <MethodsHandlers />
    <MeteorStatus />
  </ActionZone>
);

export default ToolsContainer;
