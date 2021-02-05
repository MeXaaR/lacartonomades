import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ModalFooter, UpdateTime, UpdateWrapper } from "../style";
import { useTranslation } from "react-i18next";
import Divider from "/src/components/system/Divider";
import updates_list from "./updates_list.json";
import { useAppContext } from "/src/context/appContext";
import moment from "moment";
import "moment/locale/fr";

const Updates = () => {
  const { t, i18n } = useTranslation();
  const [{ news = 0 }, dispatchApp] = useAppContext();
  useEffect(() => {
    if (news < updates_list.length) {
      dispatchApp({
        type: "news",
        data: updates_list.length,
      });
    }
  }, []);
  const openBrowser = (url) => {
    if (Meteor.isCordova) {
      cordova.InAppBrowser.open(url, "_system");
    }
  };
  return (
    <>
      <UpdateWrapper className="modal-card-body columns is-multiline is-centered">
        {updates_list.map((update, i) => (
          <>
            {i !== 0 && <Divider key={`divider${i}`} />}
            <div className="column is-full" key={`content${i}`}>
              <h4 className="title is-5">Version {update.version}</h4>
              <UpdateTime className="subtitle">
                <span className="icon is-small">
                  <i className="mdi mdi-calendar"></i>
                </span>
                {moment(update.date).locale(i18n.language).format("LL")}
              </UpdateTime>
              {update.features.map((f) => (
                <div className="feature" key={f}>
                  <span className="icon is-success">
                    <i className="mdi mdi-star"></i>
                  </span>
                  {f}
                </div>
              ))}
              {update.corrections.map((c) => (
                <div className="correction" key={c}>
                  <span className="icon is-warning">
                    <i className="mdi mdi-alert-outline"></i>
                  </span>
                  {c}
                </div>
              ))}
            </div>
          </>
        ))}
      </UpdateWrapper>

      <ModalFooter className="modal-card-foot">
        <a
          href="https://github.com/MeXaaR/lacartonomades"
          onClick={() =>
            openBrowser("https://github.com/MeXaaR/lacartonomades")
          }
          target="__blank"
        >
          <button className="button is-black">{t("buttons.github")}</button>
        </a>
        <Link to="/menu">
          <button className="button is-success">{t("buttons.back")}</button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default Updates;
