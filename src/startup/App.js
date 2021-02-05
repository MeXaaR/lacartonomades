import React, { lazy, Suspense, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MapWrapper from "/src/components/Map/MapWrapper";
import Navbar from "/src/components/Navbar/Navbar";

//routes
import Toaster from "/src/components/Toaster";
import DynamicStore, { useAppContext } from "/src/context/appContext";
import ActionButtons from "/src/components/Drawer/ActionButtons";
import DrawerMenu from "../components/Drawer/Drawer";
import { AppWrapper } from "../ui/styles";
import MapStoreContext, { useMapContext } from "../context/mapContext";
import PlacesRoute from "../components/Places/PlacesRoute";
import BottomMenu from "../components/Drawer/BottomMenu";
import PlacesList from "../components/PlacesList/PlacesList";
import ModalRouteAnimations from "../components/Modals/ModalRouteAnimation";
import { ROLES_ENUMS } from "/src/api/users/roles";
import MenuButton from "../components/Drawer/MenuButton";
import { useLocalStorage } from "../api/utils/hooks";
import { useHistory } from "react-router";
import { MESSAGE_VERSION } from "../components/Modals/LastNewsModal";

const MDT = lazy(() => import("/src/components/mdt/client/DevTools"));

const App = (props) => {
  const [{ isMobile, devtools }] = useAppContext();
  const [, updateMap] = useMapContext()
  const [cameBefore] = useLocalStorage(
    Meteor.settings.public.LOCALSTORAGE_FIRST_CONNECT
  );
  const [newsMessageVersion] = useLocalStorage("news_message_version");

  const history = useHistory();
  useEffect(() => {
    if (!cameBefore) {
      history.push("/about");
    } else if(newsMessageVersion !== MESSAGE_VERSION){
      history.push("/last-news");
    }
      if(Meteor.isCordova){
        universalLinks.subscribe("openLinkForApp", data => {
            const isThereParams = Object.keys(data.params)
            history.push({
              pathname: data.path,
              search: isThereParams ? `?${data.url.split('?')[1]}` : null
            }, {
              fromBrowserLink: true
            })
          })
        }
  }, []);

  return (
    <>
      {isMobile ? <BottomMenu /> : <Navbar />}
      {isMobile && <MenuButton />}
      <DrawerMenu />
      <ActionButtons />
      <PlacesRoute />
      <ModalRouteAnimations />
      <Switch>
        <Route exact path="/list/places/:_id" component={PlacesList} />
        <Route path="/list" component={PlacesList} />
        <Route path="/map/places/:_id" component={MapWrapper} />
        <Route path="*" component={MapWrapper} />
      </Switch>
      {devtools && Roles.userIsInRole(Meteor.userId(), ROLES_ENUMS.FOUNDERS) && (
        <Suspense fallback="loading">
          <MDT />
        </Suspense>
      )}
      <Toaster />
    </>
  );
};

export default () => (
  <Router>
    <MapStoreContext>
      <DynamicStore>
        <AppWrapper />
        <App />
      </DynamicStore>
    </MapStoreContext>
  </Router>
);
