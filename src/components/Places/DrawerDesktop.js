import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/fr";

import allCategories from "/src/settings/categories/index";
import { Link } from "react-router-dom";
import { useFooterActions } from "./utils";
import { getDistance } from "geolib";
import {
  Description,
  Information,
  Divider,
  LastUpdate,
  Footer,
  ErrorSignal,
} from "./styles";
import { useMapContext } from "../../context/mapContext";
import { SPECIAL_CATEGORIES } from "../../settings/categories";
import { useTracker } from "meteor/react-meteor-data";
import Places from "../../api/spots/model";
import { useAppContext } from "/src/context/appContext";
import LacartoLoader from "./LacartoLoader";
import { useQuery } from "../../api/utils/hooks";
import SignalIcon from "./SignalIcons";
import PresencesOfNomads from "./PresencesOfNomads";

const DrawerDesktop = ({ match, location: { state } }) => {
  const { t, i18n } = useTranslation();
  const [{ online }] = useAppContext();
  const [{ location }, updateMap] = useMapContext();
  const [place, setPlace] = useState({});
  const [loaded, setloaded] = useState(false);
  const { center, zoom } = useQuery();

  useEffect(() => {
    if (online) {
      Meteor.call(
        "places.methods.getOne",
        { _id: match.params._id },
        (error, success) => {
          if (success) {
            setPlace(success);
            Places.setPersisted({ [match.params._id]: success });
          }
        }
      );
    } else {
      const getStored = async () => {
        const stored = await Places.getPersisted(match.params._id);
        setPlace({ ...stored, _id: match.params._id });
      };
      getStored();
    }
    if(state && state.fromBrowserLink){
      setTimeout(() => {
        updateMap({
          type: "map.refresh",
          data: true,
        });
      }, 1000);
    }
  }, []);

  const footerActions = useFooterActions(place);

  useEffect(() => {
    if (place.longitude && !loaded) {
      const dataViewport = {};
      if (zoom) {
        dataViewport.zoom = zoom;
      }
      dataViewport.center = { lng: place.longitude, lat: place.latitude };
      updateMap({
        type: "map.viewport",
        data: dataViewport,
      });
      if(zoom || state.refresh){
        setTimeout(() => {
          updateMap({ type: "map.refresh", data: true });
        }, 1000);
      }
      setloaded(true);
    }
  }, [place]);
  const zoomOnPlace = () => {
    const dataViewport = {
      center: { lng: place.longitude, lat: place.latitude },
      zoom: 12,
    };
    updateMap({
      type: "map.viewport",
      data: dataViewport,
    });
    setTimeout(() => {
      updateMap({ type: "map.refresh", data: true });
    }, 1000);
  };

  if (!place._id || !place.category) {
    return <LacartoLoader />;
  }
  const category =
    allCategories.find((cat) => cat.name === place.category[0]) || {};
  return (
    <>
      <Description color={category.color}>
        <h2 className="title is-4">
          <span>
            <span className="icon" data-tip data-for={place.category[0]}>
              <i
                className={`mdi ${category.icon} mdi-36px ${place.category[0]}`}
              ></i>
            </span>
            {place.name}
          </span>
          <Link to="/" className="delete is-large"></Link>
        </h2>
      </Description>

      <Information>
        <div className="description">
          {!!place.description &&
            place.description
              .split("\n")
              .map((paragraph, i) => <p key={i}>{paragraph}</p>)}
        </div>
        <h4 className="title is-5 address-title">
          {t("place.address")}
          <button onClick={zoomOnPlace} className="button is-small is-info">
            {t("place.zoom")}
          </button>
        </h4>
        {place.private && (
          <div className="private-label">
            <span
              className="icon"
              data-tip
              data-for={SPECIAL_CATEGORIES.PRIVATES.NAME}
            >
              <i
                className={`mdi ${SPECIAL_CATEGORIES.PRIVATES.ICON} mdi-24px`}
              ></i>
            </span>
            <span>{t("place.this_is_a_private_place")}</span>
          </div>
        )}
        <p>
          {place.address}
          {!!location.lat && (
            <>
              <br />
              <span className="address">
                <i className={`mdi mdi-sign-direction mdi-24px`}></i>
                {Math.round(
                  getDistance(
                    { latitude: location.lat, longitude: location.lng },
                    { latitude: place.latitude, longitude: place.longitude }
                  ) / 100
                ) / 10}
                km
              </span>
            </>
          )}
        </p>

        <br />
        {!!place.photo && <img src={place.photo} />}
        <Divider />
        <h4 className="title is-5">{t("place.information")}</h4>
        {place.category.map((categ) => {
          const currentCateg =
            allCategories.find((cat) => cat.name === categ) || {};
          return (
            <div key={categ}>
              <p>
                <span className="icon" data-tip data-for={categ}>
                  <i
                    className={`mdi ${currentCateg.icon} mdi-24px ${categ}`}
                  ></i>
                </span>
                {t(categ)}
              </p>
              {currentCateg.fields.map(
                ({ label, type, name, private, componentRead }) => {
                  let value = place[name];

                  if (!place[name]) {
                    return null;
                  }
                  if (type === "checkboxes") {
                    value = place[name].map((v) => t(v)).join(", ");
                  } else if (type === "radios") {
                    value = t(place[name]);
                  } else if (componentRead) {
                    const ComponentToDisplay = componentRead;
                    return (
                      <ComponentToDisplay
                        key={`${label}-field`}
                        value={value}
                        placeId={place._id}
                        label={t(label)}
                      />
                    );
                  }

                  return (
                    <p key={label}>
                      <b>{t(label)} : </b>
                      {value}
                    </p>
                  );
                }
              )}
              <Divider />
            </div>
          );
        })}
        {allCategories
          .filter((c) => place.category.find((e) => e === c.name))
          .find((c) => c.presences) && (
          <>
            <PresencesOfNomads placeId={place._id} />

            <Divider />
          </>
        )}
        <LastUpdate>
          {t("place.last_update")} :{" "}
          {moment(place.updatedAt).locale(i18n.language).format("LLLL")}
        </LastUpdate>

        {!!place.delete_steps && (
          <>
            <Divider />
            <h5 className="title is-5">
              {t("place_deletion.signals")}: {place.delete_steps.length}
            </h5>
            <SignalIcon
              delete_steps={
                allCategories.find(({ name }) => name === place.category[0])
                  .delete_steps
              }
              currentSteps={place.delete_steps}
            />
          </>
        )}
      </Information>
      <Footer color={category.color} color_text={category.color_text}>
        <div className="columns is-multiline is-centered">
          {footerActions.map(({ icon, text, onClick, props }) => (
            <a className={`column ${footerActions.length === 4 ? "is-3" : "is-4"}`} key={text} onClick={onClick} 
            {...props}>
              <span className="icon">
                <i className={`mdi ${icon}`}></i>
              </span>
              {t(text)}
            </a>
          ))}
        </div>
      </Footer>
    </>
  );
};

export default DrawerDesktop;
