import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import moment from "moment";
import "moment/locale/fr";

import allCategories from "/src/settings/categories/index";
import { useAppContext } from "/src/context/appContext";
import { useFooterActions } from "../Places/utils";
import { getDistance } from "geolib";
import { Information, Divider, LastUpdate, Footer } from "../Places/styles";
import { useMapContext } from "../../context/mapContext";
import { SPECIAL_CATEGORIES } from "../../settings/categories";
import Places from "../../api/spots/model";
import SignalIcon from "../Places/SignalIcons";
import PresencesOfNomads from "../Places/PresencesOfNomads";

const AllInformation = ({ place }) => {
  const [{ isMobile, isTablet, online }] = useAppContext();
  const { t, i18n } = useTranslation();
  const footerActions = useFooterActions(place);
  const [{ location }] = useMapContext();

  const category = allCategories.find((cat) => cat.name === place.category[0]);

  useEffect(() => {
    Places.setPersisted({ [place._id]: place });
  }, []);

  return (
    <>
      <Footer
        fullOpened
        list
        color={category.color}
        color_text={category.color_text}
      >
        <div className="columns is-multiline is-mobile is-centered">
          {footerActions.map(({ icon, text, onClick, props }) => (
            <a className={`column is-narrow ${footerActions.length === 5 ? "is-one-fifth" : "is-one-quarter"}`} key={text} onClick={onClick} {...props} >
              <span className="icon">
                <i className={`mdi ${icon}`}></i>
              </span>
              {isTablet || (!isMobile && t(text))}
            </a>
          ))}
        </div>
      </Footer>
      <div className="wrapper">
        <Information fullOpened mobile list>
          <h4 className="title is-5">{t("place.address")}</h4>
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
      </div>
    </>
  );
};

export default AllInformation;
