import React from "react";
import { Link } from "react-router-dom";
import { ModalFooter } from "./style";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import { ROLES_ENUMS } from "/src/api/users/roles";
import Divider from "/src/components/system/Divider";
import updates_list from "./Updates/updates_list.json";
import Places from "../../api/spots/model";
import LanguagePicker from "../system/LanguagePicker";

const SettingsMenu = ({ history }) => {
  const { t } = useTranslation();
  const [{ user, devtools, online, news = 0 }, dispatchApp] = useAppContext();

  const toggleDevTools = () => {
    if (Roles.userIsInRole(Meteor.userId(), ROLES_ENUMS.FOUNDERS)) {
      dispatchApp({
        type: "devtools",
        data: !devtools,
      });
    }
  };

  const handleLogout = () => {
    Meteor.logout((error) => {
      Places.clearPersisted();
      Meteor.users.clearPersisted();
      if (error) {
        msg.error(error.reason);
      } else {
        msg.info(t("login_form.logged_out"));
      }
    });
  };

  const share = () => {
    navigator
    .share({
      title: "La Carto'Nomades - Android App",
      text: t("system.share_app"),
      url: Meteor.settings.public.APPS.myserver,
    })
    .then(() => console.log("Successful share"))
    .catch((error) => console.log("Error sharing", error));
  }

  const buttons = [
    {
      text: "menu.add_a_place",
      action: null,
      link: "/newplace",
      className: "is-info",
      condition: !!user && online,
    },
    {
      text: "menu.profile",
      action: null,
      link: "/profile",
      className: "",
      condition: !!user,
    },
    {
      text: "menu.login",
      action: null,
      link: "/login",
      className: "is-success",
      condition: !user,
    },
    {
      text: "menu.about",
      action: null,
      link: "/about",
      className: "",
      condition: true,
    },
    {
      content: <Divider key="divider0" />,
    },
    {
      text: "menu.help",
      action: null,
      link: "/help",
      className: "",
      condition: true,
    },
    {
      text: "menu.guidedTour",
      action: () => {
        dispatchApp({
          type: "guidedTour",
          data: true,
        })
        history.push('/')
      },
      className: "is-info",
      condition: true,
    },
    {
      text: "menu.updates",
      link: "/updates",
      className: "",
      content: news < updates_list.length && (
        <span style={{ marginRight: 5 }} className="tag is-info">
          !
        </span>
      ),
      condition: true,
    },
    {
      content: <Divider key="divider" />,
    },
    {
      text: "menu.share",
      action: share,
      link: null,
      className: "is-info",
      condition: Meteor.isCordova,
    },
    {
      text: "menu.last-news",
      link: "/last-news",
      condition: true,
    },
    {
      text: "menu.mentions",
      link: "/mentions",
      condition: true,
    },
    {
      text: "menu.logout",
      action: handleLogout,
      link: null,
      className: "is-danger",
      condition: !!user,
    },
    {
      text: "menu.devtools",
      action: toggleDevTools,
      className: "",
      condition: Roles.userIsInRole(Meteor.userId(), ROLES_ENUMS.FOUNDERS),
    },
    {
      content: <Divider key="divider2" />,
    },
    {
      content: (
        <div className="column is-full" key="language">
          <LanguagePicker />
        </div>
      ),
    },
  ];

  const buttonStyle = {
    height: "fit-content",
    display: "flex",
    justifyContent: "center",
  };
  return (
    <>
      <section className="modal-card-body columns is-multiline is-centered">
        {buttons.map(
          ({ text, action, link, className, condition, content }) => {
            if (!text) {
              return content;
            }
            if (!condition) {
              return null;
            }
            const handleAction = () => {
              if (link) {
                return history.push(link);
              }
              return action();
            };
            return (
              <div className="column is-8" style={buttonStyle} key={text}>
                <button
                  onClick={handleAction}
                  className={`button is-fullwidth ${className}`}
                >
                  {content} {t(text)}
                </button>
              </div>
            );
          }
        )}

      </section>

      <ModalFooter className="modal-card-foot">
        <Link to="/" className="is-right">
          <button className="button is-danger ">{t("buttons.close")}</button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default SettingsMenu;
