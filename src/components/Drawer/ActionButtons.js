import React, { useEffect } from "react";
import { useToggle } from "/src/api/utils/hooks";
import SearchField from "./SearchField";
import { useAppContext } from "/src/context/appContext";
import { ActionButtonsWrapper, RoundedButton } from "./style";
import { useMapContext } from "../../context/mapContext";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import ReactTooltip from "react-tooltip";
import { useTranslation } from "react-i18next";

const buttonClasses = "button is-medium";
const ActionButtons = () => {
  const [
    { menuOpened, isMobile, isTablet, online },
    dispatch,
  ] = useAppContext();
  const [{ loading, refresh }, updateMap] = useMapContext();
  const [search, toggleSearch] = useToggle(false);
  const history = useHistory();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const isList = pathname.indexOf("list") > -1;
  const pathToGo = isList ? "/list" : "/";

  useEffect(() => {
    if (search) {
      history.push(pathToGo);
    }
  }, [search]);

  const toggleMenu = () => {
    dispatch({ type: "menu.toggle", data: !menuOpened });
    history.push(pathToGo);
  };
  const refreshMap = () => {
    if(!refresh){
      updateMap({ type: "map.refresh", data: true });
    }
  };

  if (isMobile && pathname.indexOf("list") > -1) {
    return null;
  }
  if (search) {
    return <SearchField onClose={() => toggleSearch(!search)} />;
  }

  return (
    <ActionButtonsWrapper
      menuOpened={menuOpened}
      isTablet={isTablet}
      isMobile={isMobile}
    >
      <ReactTooltip place="bottom" effect="solid" />
      <p className="buttons">
        {isMobile ? (
          <>
            <RoundedButton
              className={`${buttonClasses} colored  ${
                loading ? "is-loading" : ""
              }`}
              onClick={toggleSearch}
            >
              {!loading && (
                <span className="icon is-large">
                  <i className="mdi mdi-magnify"></i>
                </span>
              )}
            </RoundedButton>

            <RoundedButton
              className={`${buttonClasses} ${online ? "colored" : "is-danger"}`}
              onClick={online ? Meteor.disconnect : Meteor.reconnect}
            >
              <span className="icon is-large">
                <i className={`mdi mdi-wifi${online ? "" : "-off"}`}></i>
              </span>
            </RoundedButton>
          </>
        ) : (
          <>
            <RoundedButton
              className={`${buttonClasses} white`}
              onClick={toggleMenu}
              data-tip={t("bottom_menu.filters")}
            >
              <span className="icon is-large">
                <i className="mdi mdi-tune"></i>
              </span>
            </RoundedButton>
            {!isList && <RoundedButton
              className={`${buttonClasses} colored ${
                refresh ? "is-loading" : ""
              }`}
              data-tip={t("bottom_menu.refresh")}
              onClick={refreshMap}
            >
              <span className="icon is-large">
                <i className="mdi mdi-refresh"></i>
              </span>
            </RoundedButton>}
            <RoundedButton
              className={`${buttonClasses} white`}
              style={{ alignSelf: "flex-end" }}
              data-tip={t(
                !isList ? "bottom_menu.display_list" : "bottom_menu.display_map"
              )}
            >
              <Link to={!isList ? "/list" : "/"}>
                <span className="icon is-large">
                  {isList ? (
                    <i className="mdi mdi-map"></i>
                  ) : (
                    <i className="mdi mdi-format-list-bulleted-square"></i>
                  )}
                </span>
              </Link>
            </RoundedButton>
            <RoundedButton
              className={`${buttonClasses} ${online ? "colored" : "is-danger"}`}
              onClick={online ? Meteor.disconnect : Meteor.reconnect}
              data-tip={t("bottom_menu.offline_mode")}
            >
              <span className="icon is-large">
                <i className={`mdi mdi-wifi${online ? "" : "-off"}`}></i>
              </span>
            </RoundedButton>
          </>
        )}
      </p>
    </ActionButtonsWrapper>
  );
};

export default ActionButtons;
