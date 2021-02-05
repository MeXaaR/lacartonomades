import React, { useState, useEffect } from "react";
import { useMapContext } from "../../context/mapContext";
import { ListWrapper } from "./style";
import allCategories, { SPECIAL_CATEGORIES } from "../../settings/categories";
import { useAppContext } from "../../context/appContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import AllInformation from "./AllInformation";
import SearchList from "./SearchList";
import Places from "../../api/spots/model";
import geolib from "geolib";
import { useLocating } from "../../api/utils/hooks";
import usePlaces from '../Map/usePlaces'
import { DEFAULT_VIEWPORT } from "../Map/MapWrapper";
const { FAVORITES, PRIVATES } = SPECIAL_CATEGORIES;


const PlacesList = (props) => {
  const {
    match: { params },
  } = props;
  const [search, setSearch] = useState("");
  const [
    { location },
  ] = useMapContext();
  const [
    { menuOpened, isMobile, favorites, user = {}, online },
  ] = useAppContext();
  const { t } = useTranslation();
  const { locating, located, isOnLocation } = useLocating();
  const { places, loading } = usePlaces({ list: true, search })

  return (
    <ListWrapper open={menuOpened} isMobile={isMobile}>
      <div className="columns is-centered">
        <div className="column is-10">
          <div className="container">
            <h4 className="title is-4">{t("system.places_list")}</h4>
            <SearchList search={search} setSearch={setSearch} />
            {places
              .map((l) => ({
                ...l,
                distance: geolib.getPreciseDistance(
                  { latitude: location.lat || 0, longitude: location.lng || 0 },
                  { latitude: l.latitude, longitude: l.longitude }
                ),
              }))
              .sort((a, b) => a.distance - b.distance)
              .map((place) => {
                const {
                  name,
                  category = [],
                  _id,
                  description,
                  distance,
                } = place;

                const currentCategory =
                  allCategories.find(({ name }) => name === category[0]) || {};
                return (
                  <div
                    className={`box ${params._id === _id ? "active" : ""}`}
                    key={_id}
                  >
                    <Link
                      to={params._id === _id ? "/list" : `/list/places/${_id}`}
                    >
                      <div className="information">
                        <div className="name">
                          <span style={{ color: currentCategory.color }}>
                            <span className="icon" data-tip data-for={category}>
                              <i
                                className={`mdi ${currentCategory.icon} mdi-24px ${category}`}
                              ></i>
                            </span>
                            {name}
                          </span>

                          <span className="address">
                            {!!location &&
                              `${Math.round(distance / 100) / 10}km`}
                          </span>
                        </div>

                        {params._id === _id ? (
                          <div className="description">
                            {!!description &&
                              description
                                .split("\n")
                                .map((paragraph) => <p>{paragraph}</p>)}
                          </div>
                        ) : (
                          <p className="description">{description}</p>
                        )}

                        <div className="category">
                          {place.private && (
                            <span
                              className={`icon ${SPECIAL_CATEGORIES.PRIVATES.NAME}`}
                              data-tip
                              data-for={SPECIAL_CATEGORIES.PRIVATES.NAME}
                            >
                              <i
                                className={`mdi ${SPECIAL_CATEGORIES.PRIVATES.ICON} mdi-24px`}
                              ></i>
                            </span>
                          )}
                          {favorites && favorites.indexOf(place._id) > -1 && (
                            <span
                              className={`icon ${SPECIAL_CATEGORIES.FAVORITES.NAME}`}
                              data-tip
                              data-for={SPECIAL_CATEGORIES.FAVORITES.NAME}
                            >
                              <i
                                className={`mdi ${SPECIAL_CATEGORIES.FAVORITES.ICON} mdi-24px`}
                              ></i>
                            </span>
                          )}
                          {category.map((v) => t(v)).join(", ")}
                        </div>
                      </div>
                    </Link>
                    {params._id === _id && <AllInformation place={place} />}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </ListWrapper>
  );
};

export default PlacesList;
