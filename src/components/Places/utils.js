import React from "react";
import { useHistory, useParams, useLocation } from "react-router";

import { useTranslation } from "react-i18next";
import {
  addPlaceToFavorites,
  removePlaceToFavorites,
} from "../../api/users/methods";
import { useAppContext } from "../../context/appContext";

export const useFooterActions = (place = {}) => {
  const history = useHistory();
  const { _id } = useParams();
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const [{ favorites, user }] = useAppContext();
  const isInFavorites = favorites && favorites.indexOf(place._id) > -1;


  const geocoords = place.latitude + "," + place.longitude;
  const ggmapurl = `https://www.google.fr/maps/search/?api=1&query=${geocoords}`
  const cordovaURL = Meteor.isCordova && cordova && cordova.platformId === "ios" ? `maps://${geocoords}?q=${geocoords}` : `geo:${geocoords}?q=${geocoords}`

  const copyURLToClipboard = () => {
    const URL = `${Meteor.absoluteUrl()}map/places/${_id}?center=true&zoom=12`;
    if (Meteor.isCordova) {
      navigator
        .share({
          title: "",
          text: `${place.name} - ${place.address}`,
          url: URL,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    } else {
      if (!navigator.clipboard.writeText) {
        msg.error("Ton navigateur n'accepte pas cette fonctionnalité");
        return;
      }
      navigator.clipboard.writeText(URL).then(
        function () {
          msg.info(
            <div>
              {t("system.url_paste_to_clipboard")}:
              <br /> {URL}
            </div>
          );
        },
        function (err) {
          msg.error(`${t("system.url_not_paste_to_clipboard")}`);
        }
      );
    }
  };
  const handleFavorites = () => {
    if (!user) {
      msg.error(`${t("system.you_need_an_account")}`);
    } else if (favorites && favorites.indexOf(place._id) > -1) {
      removePlaceToFavorites.call({ placeId: place._id });
    } else {
      addPlaceToFavorites.call({ placeId: place._id });
    }
  };

  const handleOpenMap = () => {
  };
  const handleEdit = () => {
    if (!user) {
      msg.error(`${t("system.you_need_an_account")}`);
    } else if (place.private && place.createdBy !== user._id) {
      msg.error(`${t("errors.this_is_not_your_private_place")}`);
    } else {
      history.push(
        `/${pathname.indexOf("list") > -1 ? "list" : "map"}/places/${_id}/edit`
      );
    }
  };
  const handleSignal = () => {
    if (!user) {
      msg.error(`${t("system.you_need_an_account")}`);
    } else if (place.private && place.createdBy !== user._id) {
      msg.error(`${t("errors.this_is_not_your_private_place")}`);
    } else {
      history.push(
        `/${
          pathname.indexOf("list") > -1 ? "list" : "map"
        }/places/${_id}/signal`
      );
    }
  };

  return [
    {
      text: "place.favorites",
      onClick: handleFavorites,
      icon: isInFavorites ? "mdi-heart" : "mdi-heart-outline",
    },
    {
      text: "place.share_url",
      onClick: copyURLToClipboard,
      icon: "mdi-share-variant",
    },
    {
      text: "place.go_to_place",
      onClick: handleOpenMap,
      icon: "mdi-road-variant",
      props: {
        href: Meteor.isCordova ? cordovaURL : ggmapurl,
        target: Meteor.isCordova ? "_system" : "_blank"
      }
    },
    {
      text: "place.modify",
      onClick: handleEdit,
      icon: "mdi-pencil",
    },
    {
      text: "place.signal",
      onClick: handleSignal,
      icon: "mdi-alert-octagon",
    },
  ];
};
