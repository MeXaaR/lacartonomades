import React, { useState } from "react";
import { useTracker } from "meteor/react-meteor-data";
import { useTranslation } from "react-i18next";
import { useAppContext } from "../../context/appContext";
import ConfirmButton from "../system/ConfirmButton";
import Radios from "../system/Radios";
import { createNewPresence, removePresence } from "../../api/users/methods";

const PresencesOfNomads = ({ placeId }) => {
  const { t } = useTranslation();
  const [{ online, user = {} }] = useAppContext();
  const [loading, setLoading] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const [time, setTime] = useState(24);

  const isReady = useTracker(() => {
    const handle = Meteor.subscribe("users.publications.on_a_place", {
      placeId,
    });
    return handle.ready();
  });

  const nomads = useTracker(() => Meteor.users.find({}).fetch());

  const isPresent =
    user && user.profile && user.profile.presentInPlace == placeId;

  const sayIAmHere = () => {
    setLoading(true);
    createNewPresence.call({ placeId, duration: time }, (error, s) => {
      setLoading(false);
      if (error) {
        const errorMessage =
          t(`errors.${error.reason}`) === `errors.${error.reason}`
            ? error.reason
            : t(`errors.${error.reason}`);
        msg.error(errorMessage);
      } else {
        setShowTimer(false);
        msg.info(`${t("place.presence_created")} ${t(`place.${time}`)}`);
      }
    });
  };

  const cancelPresence = () => {
    setLoading(true);
    removePresence.call({}, (e) => {
      setLoading(false);
      if (!e) {
        msg.info(t("place.presence_removed"));
      }
    });
  };
  return (
    <div>
      <h4 className="title is-5">{t("place.presences_of_nomads")}</h4>
      {!online || !Meteor.userId() ? (
        <article className="message is-info">
          <div className="message-body">
            {t(
              !Meteor.userId()
                ? "place.account_for_nomads"
                : "place.no_connection_for_nomads"
            )}
          </div>
        </article>
      ) : !nomads.length ? (
        <article className="message is-info">
          <div className="message-body">{t("place.no_nomads")}</div>
        </article>
      ) : (
        nomads.map(({ _id, profile: { avatar }, username }) => {
          if (_id !== user._id || isPresent) {
            return (
              <article className="media" key={username}>
                <figure className="media-left">
                  <p className="image is-32x32">
                    <img
                      src={avatar || "/logo-192.png"}
                      alt={`Avatar for ${username}`}
                    />
                  </p>
                </figure>
                <div className="media-content">
                  <div
                    className="content"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <b style={{ marginRight: 8 }}>{username}</b>
                    {_id === Meteor.userId() && (
                      <ConfirmButton
                        text={t("place.cancel")}
                        onAction={cancelPresence}
                        icon="mdi mdi-account-minus"
                        onCancel={() => console.log("canceled")}
                        classes={`is-small is-danger ${
                          loading ? "is-loading" : ""
                        }`}
                      />
                    )}
                  </div>
                </div>
              </article>
            );
          }
        })
      )}
      {online && !isPresent && Meteor.userId() && (
        <>
          <br />
          {showTimer && (
            <Radios
              label={t("place.how_long")}
              options={["place.12", "place.24", "place.48"]}
              value={`place.${time}`}
              onChange={({ value }) => setTime(Number(value.split(".")[1]))}
              name="time"
              fade
            />
          )}
          <div className="buttons">
            {showTimer && (
              <button
                onClick={sayIAmHere}
                className={`button is-info ${loading ? "is-loading" : ""}`}
              >
                <span className="icon">
                  <i
                    className="mdi mdi-account-plus"
                  ></i>
                </span>
                <span>
                  {t("place.say_i_am_here")}
                </span>
              </button>
            )}
            <button
              onClick={() => setShowTimer(!showTimer)}
              className={`button ${showTimer ? "is-danger" : "is-info"}`}
            >
              <span className="icon">
                <i
                  className={`mdi mdi-account-${showTimer ? "minus" : "plus"}`}
                ></i>
              </span>
              <span>
                {showTimer ? t("place.cancel") : t("place.say_i_am_here")}
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PresencesOfNomads;
