import React from "react";
import useTracker from "../utils/useTracker";
import { IconWrapper } from "../utils/styles";
import { ConnectedIcon, UnpluggedIcon } from "../utils/icons";

const MeteorStatus = () => {
  const connected = useTracker(() => Meteor.status().connected);
  const toggleMeteorStatus = () =>
    connected ? Meteor.disconnect() : Meteor.reconnect();
  return (
    <IconWrapper onClick={toggleMeteorStatus}>
      {connected ? <ConnectedIcon /> : <UnpluggedIcon />}
    </IconWrapper>
  );
};

export default MeteorStatus;
