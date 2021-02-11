import React from "react";
import { useLocation, Switch } from "react-router";
import { useTransition, config } from "react-spring";
import SettingsMenu from "./SettingsMenu";
import Newplace from "./Places/Newplace";
import Login from "./Account/Login";
import Register from "./Account/Register";
import LostPassword from "./Account/LostPassword";
import { ModalRouteWrapper } from "./ModalRouteWrapper";
import { useAppContext } from "../../context/appContext";
import About from "./About/About";
import Profile from "./Profile/Profile";
import AvatarSelector from "./Profile/AvatarSelector";
import Updates from "./Updates/Updates";
import Help from "./Help/Help";
import { useLocalStorage } from "../../api/utils/hooks";
import DeletionSteps from "./Places/DeletionStep";
import ResetPassword from "./Account/ResetPassword";
import Mentions from "./Mentions";
import LastNewsModal from "./LastNewsModal";
import LastActivities from "./LastActivities";

const ModalRouteAnimations = () => {
  const location = useLocation();
  const [{ authenticated, loggingIn }] = useAppContext();
  const [cameBefore] = useLocalStorage(
    Meteor.settings.public.LOCALSTORAGE_FIRST_CONNECT
  );
  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 0,
      transform: "translateY(50%)",
    },
    enter: {
      opacity: 1,
      transform: "translateY(0%)",
    },
    leave: {
      opacity: 0,
      transform: "translateY(50%)",
    },
    config: config.default,
  });
  return transitions.map(({ item, props, key }) => (
    <Switch key={key} location={item}>
      <ModalRouteWrapper
        exact
        path="/about"
        component={About}
        condition
        style={props}
        title={cameBefore ? "about" : "about_welcome"}
      />
      <ModalRouteWrapper
        exact
        path="/last-news"
        component={LastNewsModal}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/menu"
        component={SettingsMenu}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/profile"
        component={Profile}
        condition={authenticated || loggingIn}
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/profile/avatar"
        component={AvatarSelector}
        pathToGo="/profile"
        condition={authenticated || loggingIn}
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/login"
        component={Login}
        condition={!authenticated}
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/last-activities"
        component={LastActivities}
        condition={authenticated}
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/register"
        component={Register}
        condition={!authenticated}
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/lost-password"
        component={LostPassword}
        condition={!authenticated}
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/reset-password/:token"
        component={ResetPassword}
        condition={!authenticated}
        style={props}
        title="reset_password"
      />
      <ModalRouteWrapper
        exact
        path="/newplace"
        component={Newplace}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/map/places/:_id/edit"
        component={Newplace}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/map/places/:_id/signal"
        component={DeletionSteps}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/list/places/:_id/edit"
        component={Newplace}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/list/places/:_id/signal"
        component={DeletionSteps}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/updates"
        component={Updates}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/mentions"
        component={Mentions}
        condition
        style={props}
      />
      <ModalRouteWrapper
        exact
        path="/help"
        component={Help}
        condition
        style={props}
      />
    </Switch>
  ));
};

export default ModalRouteAnimations;
const Test = () => <div style={{ position: "absolute", right: 0 }}></div>;
