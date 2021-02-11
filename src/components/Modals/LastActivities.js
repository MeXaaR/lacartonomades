import React from "react";
import { AboutWrapper, ModalFooter } from "./style";
import { useTranslation } from "react-i18next";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import Activities from "../../api/activities/model";
import moment from "moment"
import { ACTIVITIES_ICONS, ACTIVITIES_COLORS, ACTIVITIES_TYPES } from "../../api/activities/utils";

const LastActivities = () => {
  const { t, i18n } = useTranslation();
  const activities = useTracker(() => {
      const handler = Meteor.subscribe('activities.last')
      const data = Activities.find({}, { sort: { createdAt: -1 }}).fetch()
      return data
  })

  return (
    <>
      <AboutWrapper className="modal-card-body columns is-multiline is-centered">
        <div className="column is-full">
          {!activities.length && "Il n'y aucune activité pour le moment"}
          {activities.map(a => (
            <article className="media" key={a._id}>
                <figure className="media-left">
                <p className="image is-48x48">
                    <img src={a.createdByAvatar} />
                </p>
                </figure>
                <div className="media-content activity">
                  <div className="content">
                      <div>
                      <strong>{a.createdByUsername}</strong>
                      <br/>
                      <div className="icon-text">
                          <span className={`icon ${ACTIVITIES_COLORS[a.type]}`}>
                              <i className={` mdi-18px ${ACTIVITIES_ICONS[a.type]}`}></i>
                          </span>
                          <span>{t(`activities.${a.type}`)} <b>{a.name}</b></span>
                      </div>
                      <small>{moment(a.createdAt).locale(i18n.language).fromNow()}{a.type !== ACTIVITIES_TYPES.PLACE_REMOVED && <> · <Link to={`/map/places/${a.objectId}?center=true&zoom=10`}>
                              {t(`profile.lets_go_check`)}
                            </Link> </>}
                      </small>
                      </div>
                  </div>
                </div>
            </article>
          ))}

        </div>
      </AboutWrapper>

      <ModalFooter className="modal-card-foot">
        <Link to="/" className="is-right">
          <button className={`button is-success`}>{t("buttons.back")}</button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default LastActivities;
