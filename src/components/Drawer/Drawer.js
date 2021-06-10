import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";
import { useTranslation } from "react-i18next";
import { useTransition, config } from "react-spring";
import ReactTooltip from "react-tooltip";

import { COLORS } from "/src/settings/theme";
import allCategories from "/src/settings/categories/index";
import SingleCategoryMenu from "./SingleCategoryMenu";
import { useAppContext } from "/src/context/appContext";
import { useMapContext } from "../../context/mapContext";
import { useTracker } from "meteor/react-meteor-data";
import {
  DrawerWrapper,
  MenusWrapper,
  MenuIcons,
  MenuDetails,
  SmallDivider,
  SingleCategoryLineStyle,
} from "./style";
import SearchField from "./SearchField";
import { ICONS } from "../../settings/theme";
import { SPECIAL_CATEGORIES, allTypes } from "../../settings/categories";
import Checkbox from "../system/Checkbox";
const { FAVORITES, PRESENCES } = SPECIAL_CATEGORIES;

const Drawer = () => {
  const [{ menuOpened, isMobile, user }, dispatch] = useAppContext();
  const [{ selected = [] }, updateMapParams] = useMapContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = useLocation();

  const listMode = pathname.indexOf("list") > -1;

  const transitions = useTransition(menuOpened, null, {
    from: { position: "absolute", opacity: 1, transform: "translateX(-100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 1, transform: "translateX(-100%)" },
    config: { duration: 200 },
  });

  const changeCategory = (name) => (e) => {
    updateMapParams({ type: "categories.change", data: name });
    history.push(listMode ? "/list" : "/");
  };
  const currentCategory =
    selected.length === 1 &&
    allCategories.find(({ name }) => selected.indexOf(name) > -1);
  return transitions.map(({ item, key, props }) =>
    item ? (
      <DrawerWrapper
        isMobile={isMobile}
        open={menuOpened}
        className="menu"
        style={props}
        key={key}
      >
        {!isMobile && !listMode && <SearchField />}
        <MenusWrapper isMobile={isMobile} listMode={listMode}>
          <MenuIcons className="menu">
            <ul className="menu-list">
              <li
                className={`menu-item all ${
                  selected.length === 1 ? "" : "active"
                }`}
                onClick={changeCategory(allCategories.map(({ name }) => name))}
              >
                <span>{t("drawer.all_categories")}</span>
              </li>
              {allCategories.map((categ) => (
                <li
                  key={categ.name}
                  className={`menu-item ${categ.name} ${
                    selected.length === 1 && selected[0] === categ.name
                      ? "active"
                      : ""
                  }`}
                  onClick={changeCategory([categ.name])}
                >
                  <span
                    className="is-large icon"
                    data-tip
                    data-for={categ.name}
                  >
                    <i
                      className={`mdi ${categ.icon} mdi-24px ${categ.name} white`}
                    ></i>
                  </span>
                  {!isMobile && (
                    <ReactTooltip
                      textColor={COLORS.MENUS.MENU_ICONS.COLOR}
                      backgroundColor={COLORS.MENUS.MENU_ICONS.BACKGROUND}
                      className="tooltip-category"
                      id={categ.name}
                      place="right"
                      effect="solid"
                    >
                      {t(categ.name)}
                    </ReactTooltip>
                  )}
                </li>
              ))}

              {Meteor.user() && (
                <>
                  <SmallDivider className="menu-item" />
                  <li
                    className={`menu-item ${FAVORITES.NAME} ${
                      selected.length === 1 && selected[0] === FAVORITES.NAME
                        ? "active"
                        : ""
                    }`}
                    onClick={changeCategory([FAVORITES.NAME])}
                  >
                    <span
                      className="is-large icon"
                      data-tip
                      data-for={FAVORITES.NAME}
                    >
                      <i
                        className={`mdi ${FAVORITES.ICON} mdi-24px ${FAVORITES.NAME} white`}
                      ></i>
                    </span>
                    {!isMobile && (
                      <ReactTooltip
                        textColor={COLORS.MENUS.MENU_ICONS.COLOR}
                        backgroundColor={COLORS.MENUS.MENU_ICONS.BACKGROUND}
                        className="tooltip-category"
                        id={FAVORITES.NAME}
                        place="right"
                        effect="solid"
                      >
                        {t(FAVORITES.NAME)}
                      </ReactTooltip>
                    )}
                  </li>
                  <li
                    className={`menu-item ${PRESENCES.NAME} ${
                      selected.length === 1 && selected[0] === PRESENCES.NAME
                        ? "active"
                        : ""
                    }`}
                    onClick={changeCategory([PRESENCES.NAME])}
                  >
                    <span
                      className="is-large icon"
                      data-tip
                      data-for={PRESENCES.NAME}
                    >
                      <i
                        className={`mdi ${PRESENCES.ICON} mdi-24px ${PRESENCES.NAME} white`}
                      ></i>
                    </span>
                    {!isMobile && (
                      <ReactTooltip
                        textColor={COLORS.MENUS.MENU_ICONS.COLOR}
                        backgroundColor={COLORS.MENUS.MENU_ICONS.BACKGROUND}
                        className="tooltip-category"
                        id={PRESENCES.NAME}
                        place="right"
                        effect="solid"
                      >
                        {t(PRESENCES.NAME)}
                      </ReactTooltip>
                    )}
                  </li>
                </>
              )}
            </ul>
          </MenuIcons>
          <MenuDetails className="menu" isMobile={isMobile}>
            {isMobile && (
              <button
                className="modal-close is-large"
                onClick={() => dispatch({ type: "menu.toggle", data: false })}
                aria-label="close"
              />
            )}
            {currentCategory ? (
              <SingleCategoryMenu category={currentCategory} />
            ) : (
              <>
                <h3 style={{ textTransform: "uppercase" }}>
                  {t("drawer.all_places")}
                </h3>

                {allTypes.map((t) => (
                  <ul className="menu-list" key={t}>
                    {allCategories
                      .filter(({ type }) => type === t)
                      .map((categ) => (
                        <SingleCategoryLine
                          changeCategory={changeCategory}
                          category={categ}
                          selected={selected}
                          key={categ.name}
                        />
                      ))}
                  </ul>
                ))}
                {!!user && (
                  <ul className="menu-list">
                    <SingleCategoryLine
                      changeCategory={changeCategory}
                      favorites={user.profile.favorites}
                      selected={selected}
                      category={{
                        name: FAVORITES.NAME,
                        icon: FAVORITES.ICON,
                      }}
                    />
                    <SingleCategoryLine
                      changeCategory={changeCategory}
                      selected={selected}
                      category={{
                        name: PRESENCES.NAME,
                        icon: PRESENCES.ICON,
                      }}
                    />
                  </ul>
                )}
              </>
            )}
          </MenuDetails>
        </MenusWrapper>
      </DrawerWrapper>
    ) : (
      <div key={key} />
    )
  );
};

const SingleCategoryLine = ({
  changeCategory,
  category,
  favorites,
  selected = [],
}) => {
  const exceptions = [FAVORITES.NAME, PRESENCES.NAME];
  const isExceptionCateg = exceptions.find((e) => category.name === e);

  const count = useTracker(() => {
    if (category.name === PRESENCES.NAME) {
      Meteor.subscribe("places.presences.count");
      return Counts.get("places.presences.count");
    } else if (category.name === FAVORITES.NAME) {
      return favorites ? favorites.length : 0;
    }
  });

  const toggleCategory = () => {
    if (exceptions.find((a) => a === selected[0])) {
      changeCategory(allCategories.map(({ name }) => name));
    } else if (selected.find((s) => category.name === s)) {
      changeCategory(selected.filter((s) => s !== category.name))();
    } else {
      changeCategory([...selected, category.name])();
    }
  };
  const { t } = useTranslation();
  return (
    <SingleCategoryLineStyle className="menu-item">
      <span className="name-wrapper">
        <span
          className={`is-large icon ${category.name}`}
          onClick={changeCategory([category.name])}
        >
          <i className={`mdi ${category.icon} mdi-24px`}></i>
        </span>
        <div onClick={changeCategory([category.name])}>
          {t(category.name)} {isExceptionCateg && `- ${count}`}
        </div>
      </span>
      {!isExceptionCateg &&
        selected.find((s) => !exceptions.find((e) => e == s)) && (
          <Checkbox
            checked={selected.find((s) => category.name === s)}
            onChange={toggleCategory}
          />
        )}
    </SingleCategoryLineStyle>
  );
};

export default Drawer;
