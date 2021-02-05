import React, { useState, useEffect } from "react";
import { useToggle } from "/src/api/utils/hooks";
import { ModalFooter, DeletionStepsWrapper } from "../style";
import { useTranslation } from "react-i18next";
import allCategories from "/src/settings/categories";
import { Link, useHistory } from "react-router-dom";
import { ROLES_ENUMS } from "/src/api/users/roles";
import ConfirmButton from "../../system/ConfirmButton";
import {
  removePlaceForFounders,
  removePlacesWithSteps,
  cancelPlaceSignals,
} from "../../../api/spots/methods";
import Divider from "/src/components/system/Divider";
import SignalIcon from "../../Places/SignalIcons";

const initialState = {
  category: [],
};
const DeletionSteps = ({
  match: {
    params: { _id },
  },
  location: { pathname },
}) => {
  const [place, setPlace] = useState({ ...initialState });
  const [steps_needed, set_steps_needed] = useState(0);
  const [loading, toggleLoading] = useToggle(false);
  const { t } = useTranslation();
  const history = useHistory();

  useEffect(() => {
    if (_id) {
      Meteor.call("places.methods.getOne", { _id }, (error, success) => {
        setPlace(success);
        if (success.category) {
          set_steps_needed(
            allCategories.find((c) => success.category[0] === c.name)
              .delete_steps
          );
        }
      });
    }
  }, []);
  const deleteFounders = () => {
    toggleLoading(!loading);
    removePlaceForFounders.call({ _id }, (error) => {
      toggleLoading((l) => !l);
      if (error) {
        const errorMessage =
          t(`errors.${error.reason}`) === `errors.${error.reason}`
            ? error.reason
            : t(`errors.${error.reason}`);
        msg.error(errorMessage);
      } else {
        msg.info(t("place_deletion.removed_success"));
        history.push("/");
      }
    });
  };
  const signalError = () => {
    toggleLoading(!loading);
    removePlacesWithSteps.call({ _id }, (error, success) => {
      toggleLoading((l) => !l);
      if (error) {
        const errorMessage =
          t(`errors.${error.reason}`) === `errors.${error.reason}`
            ? error.reason
            : t(`errors.${error.reason}`);
        msg.error(errorMessage);
      } else if (success === "deleted") {
        msg.info(t("place_deletion.removed_success"));
        history.push("/");
      } else {
        msg.info(t("place_deletion.signal_success"));
        history.push(
          `/${pathname.indexOf("list") > -1 ? "list" : "map"}/places${
            _id ? `/${_id}` : ""
          }`
        );
      }
    });
  };
  const cancelSignal = () => {
    toggleLoading(!loading);
    cancelPlaceSignals.call({ _id }, (error, success) => {
      toggleLoading((l) => !l);
      if (error) {
        const errorMessage =
          t(`errors.${error.reason}`) === `errors.${error.reason}`
            ? error.reason
            : t(`errors.${error.reason}`);
        msg.error(errorMessage);
      } else {
        msg.info(t("place_deletion.cancel_success"));
        history.push(
          `/${pathname.indexOf("list") > -1 ? "list" : "map"}/places${
            _id ? `/${_id}` : ""
          }`
        );
      }
    });
  };
  const { delete_steps = [] } = place;
  return (
    <>
      <DeletionStepsWrapper className="modal-card-body">
        <article className="message is-info">
          <div className="message-body">
            <h5 className="title is-5">{t("place_deletion.community")}</h5>
            <p>{t("place_deletion.explanation")}</p>
          </div>
        </article>
        <article className="message is-info">
          <div className="message-body">
            <h5 className="title is-5">
              {t("place_deletion.signals")}: {delete_steps.length}
            </h5>
            <p>{t("place_deletion.type")}</p>
          </div>
        </article>
        <SignalIcon
          delete_steps={steps_needed}
          currentSteps={place.delete_steps}
          display
        />
        <div className="columns is-multiline">
          <div className="column is-full">
            <Divider />
            <ConfirmButton
              text={
                place.createdBy === Meteor.userId()
                  ? t("place_deletion.delete")
                  : t("place_deletion.signal_error")
              }
              onAction={signalError}
              onCancel={() => console.log("canceled")}
              classes={`is-danger is-fullwidth ${loading ? "is-loading" : ""}`}
            />
            {place.createdBy === Meteor.userId() && (
              <p className="help is-danger">
                {t("place_deletion.your_creation")}
              </p>
            )}
            <br />
            {!!delete_steps.length && (
              <ConfirmButton
                text={t("place_deletion.cancel_error")}
                onAction={cancelSignal}
                onCancel={() => console.log("canceled")}
                classes={`is-success is-fullwidth ${
                  loading ? "is-loading" : ""
                }`}
              />
            )}
          </div>
        </div>
        {Roles.userIsInRole(Meteor.userId(), ROLES_ENUMS.FOUNDERS) && !!_id && (
          <>
            <br />
            <br />
            <Divider text="Fondateurs" />
            <ConfirmButton
              text="Supprimer"
              onAction={deleteFounders}
              onCancel={() => console.log("canceled")}
              classes="is-danger is-fullwidth"
            />
          </>
        )}
      </DeletionStepsWrapper>

      <ModalFooter className="modal-card-foot">
        <Link
          to={`/${pathname.indexOf("list") > -1 ? "list" : "map"}/places${
            _id ? `/${_id}` : ""
          }`}
        >
          <button
            className={`button is-danger ${loading && "is-loading"}`}
            disabled={loading}
          >
            {t("buttons.cancel")}
          </button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default DeletionSteps;
