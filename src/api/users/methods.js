import { ValidatedMethod } from "meteor/mdg:validated-method";
import { updateActivities } from "../activities/utils";

export const addPlaceToFavorites = new ValidatedMethod({
  name: "users.methods.addFavorites",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  run({ placeId }) {
    try {
      return Meteor.users.update(
        {
          _id: this.userId,
        },
        {
          $addToSet: {
            "profile.favorites": placeId,
          },
        }
      );
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});
export const removePlaceToFavorites = new ValidatedMethod({
  name: "users.methods.removeFavorites",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  run({ placeId }) {
    try {
      return Meteor.users.update(
        {
          _id: this.userId,
        },
        {
          $pull: {
            "profile.favorites": placeId,
          },
        }
      );
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const chooseNewAvatar = new ValidatedMethod({
  name: "users.methods.chooseNewAvatar",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  run({ avatar }) {
    try {
      if(Meteor.isServer){
        updateActivities({ avatar: `/avatars/${avatar}`, userId: this.userId })
      }
      return Meteor.users.update(
        {
          _id: this.userId,
        },
        {
          $set: {
            "profile.avatar": `/avatars/${avatar}`,
          },
        }
      );
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const createNewPresence = new ValidatedMethod({
  name: "users.methods.setPresence",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({ placeId, duration }) {
    try {
      if (!this.userId) {
        throw new Meteor.Error("405", "you_need_an_account");
      }
      console.log(`Presence created: ${this.userId}`);
      const untilDate = new Date().valueOf() + duration * 60 * 60 * 1000;
      return Meteor.users.update(
        { _id: this.userId },
        {
          $set: {
            "profile.presentInPlace": placeId,
            "profile.presenceUntil": untilDate,
          },
        }
      );
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const removePresence = new ValidatedMethod({
  name: "users.methods.removePresence",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run() {
    try {
      if (!this.userId) {
        throw new Meteor.Error("405", "you_need_an_account");
      }

      console.log(`Presence remove for user: ${this.userId}`);
      return Meteor.users.update(
        { _id: this.userId },
        {
          $unset: {
            "profile.presentInPlace": "",
            "profile.presenceUntil": "",
          },
        }
      );
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});
export const updateUserLanguage = new ValidatedMethod({
  name: "users.methods.updateUserLanguage",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({ language }) {
    try {
      if (!this.userId) {
        throw new Meteor.Error("405", "you_need_an_account");
      }

      console.log(`Language changed for user: ${this.userId}`);
      return Meteor.users.update(
        { _id: this.userId },
        {
          $set: {
            "profile.language": language,
          },
        }
      );
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});