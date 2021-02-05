import React from "react";
import { useTracker } from "meteor/react-meteor-data";
import { Link } from "react-router-dom";
import { ModalFooter } from "../style";
import avatars_list from "./avatars.json";
import { useTranslation } from "react-i18next";
import { AvatarWrapper } from "./style";
import { chooseNewAvatar } from "/src/api/users/methods";
import { ROLES_ENUMS } from "/src/api/users/roles";

const AvatarSelector = () => {
  const { t } = useTranslation();
  const avatars = useTracker(() => {
    const isFounder = Roles.userIsInRole(Meteor.userId(), ROLES_ENUMS.FOUNDERS);
    return isFounder
      ? avatars_list
      : avatars_list.filter(
          (a) => a !== "097-caravan.svg" && a !== "089-animals-1.svg"
        );
  });

  return (
    <>
      <AvatarWrapper className="modal-card-body columns is-multiline is-centered is-mobile">
        {avatars.map((avatar) => (
          <div
            key={avatar}
            className="column is-one-fifth-desktop is-one-quarter-tablet is-one-third-mobile"
          >
            <Link to="/profile">
              <figure
                className="image"
                onClick={() => chooseNewAvatar.call({ avatar })}
              >
                <img src={`/avatars/${avatar}`} alt={avatar} />
              </figure>
            </Link>
          </div>
        ))}
      </AvatarWrapper>

      <ModalFooter className="modal-card-foot">
        <Link to="/profile" className="is-right">
          <button className="button is-danger">{t("buttons.cancel")}</button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default AvatarSelector;
