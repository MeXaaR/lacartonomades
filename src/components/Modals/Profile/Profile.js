import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppContext } from "/src/context/appContext";
import moment from "moment";
import "moment/locale/fr";
import { ProfileWrapper } from "./style";
import Places from "/src/api/spots/model";
import { ModalFooter } from "../style";
import LacartoLoader from "../../Places/LacartoLoader";
import ConfirmButton from "../../system/ConfirmButton";
import Divider from "/src/components/system/Divider";
import { msToTime } from "../../../api/utils/functions";

const tabs = [
  {
    name: "info",
    icon: "mdi mdi-information-outline",
  },
  {
    name: "security",
    icon: "mdi mdi-security",
  },
];

const Profile = () => {
  const { t, i18n } = useTranslation();
  const [currentTab, setTab] = useState(tabs[0].name);
  const [loading, setLoading] = useState(false);
  const [{ user = {} }] = useAppContext();
  const { profile = {}, username = "", emails = [] } = user;
  const currentEmail = emails[0] && emails[0].address || ""
  const [newUsername, setNewUsername] = useState(username);
  const [newEmail, setNewEmail] = useState(currentEmail);
  const removeDataFromCache = () => {
    Places.clearPersisted().then((r) => {
      msg.info(t("profile.cache_removed"));
    });
  };
  const isPresentOnPlace = profile.presentInPlace;
  const timeLeftOnPlace = profile.presenceUntil - new Date().valueOf();
  const deleteAccount = () => {
    setLoading(true);
    Meteor.call("users.methods.removeAccount", {}, () => {
      Meteor.logout((error) => {
        Places.clearPersisted();
        Meteor.users.clearPersisted();
        if (error) {
          msg.error(error.reason);
        } else {
          msg.info(t("login_form.logged_out"));
        }
      });
      setLoading(false);
    });
  };

  const changeUsername = () => {
    if(!newUsername){
      msg.error(t("login_form.username_mandatory"))
    } else {
      setLoading(true)
      Meteor.call("users.methods.changeUserName",{ newUsername }, (e,s) => {
        setLoading(false)
        if(e){
          msg.error(e.reason)
        } else {
          msg.info(t("system.username_changed"))
        }
      })
    }
  }
  const changeEmail = () => {
      setLoading(true)
      Meteor.call("users.methods.changeEmail",{ newEmail }, (e,s) => {
        setLoading(false)
        if(e){
          msg.error(e.reason)
        } else {
          msg.info(t("system.email_changed"))
        }
      })
  }
  return (
    <>
      <ProfileWrapper className="modal-card-body columns is-multiline is-centered">
        {user.loading ? (
          <LacartoLoader message="" />
        ) : (
          <div className="column is-four-fifths is-full-mobile">
            <div className="media">
              <div className="media-left">
                <Link to="/profile/avatar">
                  <figure className="image is-96x96">
                    <img
                      src={profile.avatar || "/logo-192.png"}
                      alt="My avatar image"
                    />
                  </figure>
                </Link>
              </div>
              <div className="media-content">
                <p className="title is-4">{user.username}</p>
                <p className="subtitle is-6">
                  <em>
                    {t("profile.since")}{" "}
                    <time dateTime={moment(user.createdAt).format("YYYY-M-D")}>
                      {moment(user.createdAt)
                        .locale(i18n.language)
                        .format("Do MMMM YYYY")}
                    </time>
                  </em>
                </p>
              </div>
            </div>
            <article className="message is-info">
              <div className="message-body">{t("profile.change_avatar")}</div>
            </article>
            <div className="tabs is-centered">
              <ul>
                {tabs.map(({ name, icon }) => (
                  <li
                    className={(currentTab === name && "is-active") || ""}
                    onClick={() => setTab(name)}
                    key={name}
                  >
                    <a>
                      <span className="icon is-small">
                        <i className={icon} aria-hidden="true"></i>
                      </span>
                      <span>{t(`profile.${name}`)}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            {currentTab === "info" && (
              <>
                <div className="content">{profile.about}</div>
                <article className="message is-info">
                    <div className="message-body">
                      <h3 className="title is-4">{t("profile.your_info")}</h3>
                      <p>
                      <div className="field">
                      <label class="label">{t("user.username")}</label>
                        <div className="control has-icons-left has-icons-right"  style={{ display: "flex"}}>
                          <input
                            onChange={({ target: { value }}) => setNewUsername(value)}
                            className={`input ${loading ? "is-loading" : null}`}
                            value={newUsername}
                            name="username"
                            disabled={loading}
                            placeholder={t("user.username")}
                          />
                          <span className="icon is-small is-left">
                            <i className="mdi mdi-account"></i>
                          </span>
                          
                        {username !== newUsername && 
                        <span className="button is-success" onClick={changeUsername}>
                            {t("system.save")}
                        </span>
                        }
                        </div>
                      </div>
                      <div className="field">
                      <label class="label">{t("user.email")}</label>
                        <div className="control has-icons-left has-icons-right" style={{ display: "flex"}}>
                          <input
                            onChange={({ target: { value }}) => setNewEmail(value)}
                            className={`input ${loading ? "is-loading" : null}`}
                            value={newEmail}
                            type="email"
                            name="email"
                            disabled={loading}
                            placeholder={t("user.email")}
                          />
                          <span className="icon is-small is-left">
                            <i className="mdi mdi-email"></i>
                          </span>
                          {currentEmail !== newEmail && 
                            <span className="button is-success" onClick={changeEmail}>
                                {t("system.save")}
                            </span>
                          }
                        </div>
                      </div>
                      </p>
                    </div>
                  </article>
                {!!isPresentOnPlace && (
                  <>
                    <Divider />
                    <article className="message is-info">
                      <div className="message-body">
                        <p>{t("profile.presence_on_a_place")}</p>
                        <p>
                          {t("profile.time_left")} {msToTime(timeLeftOnPlace)}
                        </p>
                        <br />
                        <Link to={`/map/places/${isPresentOnPlace}`}>
                          <button className="button is-success">
                            {t("profile.lets_go_check")}
                          </button>
                        </Link>
                      </div>
                    </article>
                  </>
                )}
                <button
                  onClick={removeDataFromCache}
                  className="button is-warning is-fullwidth"
                >
                  {t("profile.empty_cache")}
                </button>
                <br />
              </>
            )}
            {currentTab === "security" && (
              <>
                <div className="content">
                  <ConfirmButton
                    text={t("profile.delete")}
                    onAction={deleteAccount}
                    disabled={loading}
                    onCancel={() => console.log("canceled")}
                    classes={`is-danger is-fullwidth ${
                      loading ? "is-loading" : ""
                    }`}
                  />
                  <br />
                  <article className="message is-danger">
                    <div className="message-body">
                      {t("profile.delete_explain")}
                    </div>
                  </article>
                </div>
              </>
            )}
          </div>
        )}
      </ProfileWrapper>

      <ModalFooter className="modal-card-foot">
        <Link to="/menu" className="is-right">
          <button className="button is-success">{t("buttons.back")}</button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default Profile;
