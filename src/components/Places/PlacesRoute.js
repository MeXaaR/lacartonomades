import React from "react";
import { useLocation, Switch, Route } from "react-router";
import { useTransition, config } from "react-spring";
import { useAppContext } from "../../context/appContext";
import DrawerMobile from "./DrawerMobile";
import DrawerDesktop from "./DrawerDesktop";
import { DrawerWrapper } from "./styles";

const PlacesRoute = () => {
  const location = useLocation();
  const [{ isMobile, isTablet, menuOpened }] = useAppContext();

  const transitions = useTransition(location, (location) => location.pathname, {
    from: {
      opacity: 1,
      transform:
        isMobile || isTablet || Meteor.isCordova
          ? "translateY(100%)"
          : "translateX(100%)",
    },
    enter: {
      opacity: 1,
      transform:
        isMobile || isTablet || Meteor.isCordova
          ? "translateY(0%)"
          : "translateX(0%)",
    },
    leave: {
      opacity: 1,
      transform:
        isMobile || isTablet || Meteor.isCordova
          ? "translateY(100%)"
          : "translateX(100%)",
    },
    config: config.default,
  });
  return transitions.map(({ item, props, key }) => (
    <Switch location={item} key={key}>
      <Route
        exact
        path="/map/places/:_id"
        render={(routerProps) => (
          <DrawerWrapper
            isMobile={isMobile}
            isTablet={isTablet}
            menuOpened={menuOpened}
            style={props}
          >
            {isMobile || isTablet || Meteor.isCordova ? (
              <DrawerMobile {...routerProps} />
            ) : (
              <DrawerDesktop {...routerProps} />
            )}
          </DrawerWrapper>
        )}
      />
    </Switch>
  ));
};

export default PlacesRoute;
