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
const { FAVORITES, PRIVATES, PRESENCES } = SPECIAL_CATEGORIES;

const Drawer = () => {
  const [{ menuOpened, isMobile, user }, dispatch] = useAppContext();
  const [{ selected = [] }, updateMapParams] = useMapContext();
  const history = useHistory();
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [mainMenu, setMainMenu] = useState(true)

  const listMode = pathname.indexOf("list") > -1;

  const transitions = useTransition(menuOpened, null, {
    from: { position: "absolute", opacity: 1, transform: "translateX(-100%)" },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: { opacity: 1, transform: "translateX(-100%)" },
    config: { duration: 200 },
  });

  const changeCategory = (name, keepMenu) => (e) => {
    updateMapParams({ type: "categories.change", data: name });
    setMainMenu(keepMenu)
    history.push(listMode ? "/list" : "/");
  };
  const currentCategory =
    selected.length === 1 && !mainMenu &&
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
                  selected.length === 1 && !mainMenu ? "" : "active"
                }`}
                onClick={changeCategory(allCategories.map(({ name }) => name))}
              >
                <span>{t("drawer.all_categories")}</span>
              </li>
              {allCategories.map((categ, i) => (
                <>
                {allCategories[i-1] && categ.type !== allCategories[i-1].type && 
                  <SmallDivider className="menu-item" key={`divider-${i}`} />
                }
                  <li
                    key={categ.name}
                    className={`menu-item ${categ.name} ${
                      selected.length === 1 && !mainMenu && selected[0] === categ.name
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
                </>
              ))}

              {Meteor.user() && (
                <>
                  <SmallDivider className="menu-item" />
                  <li
                    className={`menu-item ${FAVORITES.NAME} ${
                      selected.length === 1 && !mainMenu && selected[0] === FAVORITES.NAME
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
                    className={`menu-item ${PRIVATES.NAME} ${
                      selected.length === 1 && !mainMenu && selected[0] === PRIVATES.NAME
                        ? "active"
                        : ""
                    }`}
                    onClick={changeCategory([PRIVATES.NAME])}
                  >
                    <span
                      className="is-large icon"
                      data-tip
                      data-for={PRIVATES.NAME}
                    >
                      <i
                        className={`mdi ${PRIVATES.ICON} mdi-24px ${PRIVATES.NAME} white`}
                      ></i>
                    </span>
                    {!isMobile && (
                      <ReactTooltip
                        textColor={COLORS.MENUS.MENU_ICONS.COLOR}
                        backgroundColor={COLORS.MENUS.MENU_ICONS.BACKGROUND}
                        className="tooltip-category"
                        id={PRIVATES.NAME}
                        place="right"
                        effect="solid"
                      >
                        {t(PRIVATES.NAME)}
                      </ReactTooltip>
                    )}
                  </li>
                  <li
                    className={`menu-item ${PRESENCES.NAME} ${
                      selected.length === 1 && !mainMenu && selected[0] === PRESENCES.NAME
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
                {allTypes.map(type => {
                  const allTypedCategs = allCategories.filter((c) => c.type === type)
                  return (
                  <ul className="menu-list" key={type}>
                    <SingleCategoryType 
                      currentType={type} 
                      allTypedCategs={allTypedCategs}
                      changeCategory={changeCategory}
                      selected={selected}
                    />
                    {allTypedCategs.map((categ) => (
                      <SingleCategoryLine
                        changeCategory={changeCategory}
                        category={categ}
                        key={categ.name}
                        selected={selected}
                      />
                    ))}
                  </ul>
                )})}
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
                        name: PRIVATES.NAME,
                        icon: PRIVATES.ICON,
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

const SingleCategoryType = ({currentType, changeCategory, allTypedCategs, selected}) => {
  const { t } = useTranslation();
  let allChecked = true
  allTypedCategs.forEach(c => {
    if(!selected.find(s => s === c.name)){
      allChecked = false
    }
  }) 
  const updateCategories = () => {
    let newSelected = []
    if(allChecked){
      selected.map(s => {
        if(!allTypedCategs.find(c => c.name === s)){
          newSelected.push(s)
        }
      })
    } else {  
      newSelected = [...selected]
      allTypedCategs.forEach(c => {
        if(!selected.find(s => s === c.name)){
          newSelected.push(c.name)
        }
      }) 
    }
    changeCategory(newSelected, true)()
  }

  return(
      <SingleCategoryLineStyle className="menu-item title">
        <span className="name-wrapper">
          <h4 className="title is-6" onClick={updateCategories}>
            {t(`drawer.${currentType}`)}
          </h4>
        </span>
        <Checkbox
          checked={allChecked}
          onChange={updateCategories}
        />
      </SingleCategoryLineStyle>
  )
}

const SingleCategoryLine = ({
  changeCategory,
  category,
  favorites,
  selected
}) => {
  const exceptions = [PRIVATES.NAME, FAVORITES.NAME, PRESENCES.NAME];
  const isExceptionCateg = exceptions.find((e) => category.name === e);
  const isChecked = !!selected.find((s) => category.name === s)

  const count = useTracker(() => {
    if (category.name === PRIVATES.NAME) {
      Meteor.subscribe("places.private.count");
      return Counts.get("places.private.count");
    } else if (category.name === PRESENCES.NAME) {
      Meteor.subscribe("places.presences.count");
      return Counts.get("places.presences.count");
    } else if (category.name === FAVORITES.NAME) {
      return favorites ? favorites.length : 0;
    }
  });

  const toggleCategory = () => {
    if (exceptions.find((a) => a === selected[0])) {
      changeCategory(allCategories.map(({ name }) => name), true);
    } else if (selected.find((s) => category.name === s)) {
      changeCategory(selected.filter((s) => s !== category.name), true)();
    } else {
      changeCategory([...selected, category.name], true)();
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
        !selected.find((s) => exceptions.find((e) => e == s)) && (
          <Checkbox
            checked={isChecked}
            onChange={toggleCategory}
            small
          />
        )}
    </SingleCategoryLineStyle>
  );
};

export default Drawer;
