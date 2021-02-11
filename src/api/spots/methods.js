import { ValidatedMethod } from "meteor/mdg:validated-method";
import Places from "./model";
import axios from "axios";
import FormData from "form-data";
import { ROLES_ENUMS } from "/src/api/users/roles";
import allCategories from "../../settings/categories";
import { ACTIVITIES_TYPES, addActivities } from "../activities/utils";

const uploadPic = async (picture) => {
  var bodyData = new FormData();
  bodyData.append("image", picture.split("base64,")[1]);
  const response = await axios({
    method: "post",
    url: `https://api.imgbb.com/1/upload?key=${Meteor.settings.private.IMGBB_API_KEY}`,
    headers: bodyData.getHeaders(),
    data: bodyData,
  });
  const { data = {} } = response.data;
  return data.medium ? data.medium.url : data.url;
};

export const createNewPlace = new ValidatedMethod({
  name: "places.methods.create",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run(newPlace) {
    try {
      if (!this.userId) {
        throw new Meteor.Error("405", "you_need_an_account");
      }
      if (newPlace.private && newPlace.picture) {
        delete newPlace.picture;
      }
      if (newPlace.picture && Meteor.isServer) {
        newPlace.photo = await uploadPic(newPlace.picture);
        delete newPlace.picture;
      }
      const objectId = Places.insert(newPlace);

      console.log(`Place created: ${objectId}`);
      addActivities({ 
        type: ACTIVITIES_TYPES.PLACE_CREATED,
        objectId,
        userId: this.userId,
        name: newPlace.name
      })
      return Places.findOne({ _id: objectId });
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});
export const updatePlace = new ValidatedMethod({
  name: "places.methods.update",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({ _id, ...newPlace }) {
    try {
      if (!this.userId) {
        throw new Meteor.Error("405", "you_need_an_account");
      }
      const placeDB = Places.findOne({ _id });
      if (!!placeDB && placeDB.private && placeDB.createdBy !== this.userId) {
        throw new Meteor.Error("405", "this_is_not_your_private_place");
      }
      if (newPlace.picture && Meteor.isServer) {
        newPlace.photo = await uploadPic(newPlace.picture);
        delete newPlace.picture;
      }
      Places.update({ _id }, { $set: newPlace });
      console.log(`Place updated: ${_id}`);
      addActivities({ 
        type: ACTIVITIES_TYPES.PLACE_UPDATED,
        objectId: _id,
        userId: this.userId,
        name: newPlace.name
      })
      return Places.findOne({ _id });
    } catch (error) {
      console.log(error);
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const removePlaceForFounders = new ValidatedMethod({
  name: "places.methods.remove_founders",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({ _id }) {
    try {
      if (!Roles.userIsInRole(this.userId, ROLES_ENUMS.FOUNDERS)) {
        throw new Meteor.Error("405", "you_cannot_do_that");
      }
      console.log(`Place removed: ${_id}`);
      const place = Places.findOne({ _id })
      const success =  Places.remove({ _id });
      addActivities({ 
        type: ACTIVITIES_TYPES.PLACE_REMOVED,
        objectId: _id,
        userId: this.userId,
        name: place.name
      })

      Meteor.users.update(
        {},
        {
          $pull: {
            "profile.favorites": _id,
          },
        },
        { multi: true }
      )
      return success
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const removePlacesWithSteps = new ValidatedMethod({
  name: "places.methods.remove_steps",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({ _id }) {
    try {
      if (!this.userId) {
        throw new Meteor.Error("405", "you_need_an_account");
      }
      const place = Places.findOne({ _id });
      const currentCateg =
        allCategories.find(({ name }) => name === place.category[0]) || {};
      const steps_needed = currentCateg.delete_steps;
      if (
        place.delete_steps &&
        place.delete_steps.find((i) => i === this.userId)
      ) {
        throw new Meteor.Error("405", "already_stepped_for_delete");
      } else if (
        place.createdBy === this.userId ||
        steps_needed === 1 ||
        (place.delete_steps && place.delete_steps.length == steps_needed - 1)
      ) {
        Places.remove({ _id });
        addActivities({ 
          type: ACTIVITIES_TYPES.PLACE_REMOVED,
          objectId: _id,
          userId: this.userId,
          name: place.name
        })
        Meteor.users.update(
          {},
          {
            $pull: {
              "profile.favorites": _id,
            },
          },
          { multi: true }
        )
        console.log(`Place removed: ${_id}`);
        return "deleted";
      } else {
        console.log(`Place signaled: ${_id}`);
        addActivities({ 
          type: ACTIVITIES_TYPES.PLACE_REPORTED,
          objectId: _id,
          userId: this.userId,
          name: place.name
        })
        return Places.update(
          { _id },
          { $addToSet: { delete_steps: this.userId } }
        );
      }
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const cancelPlaceSignals = new ValidatedMethod({
  name: "places.methods.cancel_signals",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  async run({ _id }) {
    try {
      if (!this.userId) {
        throw new Meteor.Error("405", "you_need_an_account");
      }
      console.log(`Place signaled canceled: ${_id}`);
      const success = Places.update({ _id }, { $unset: { delete_steps: 1 } });
      addActivities({ 
        type: ACTIVITIES_TYPES.PLACE_CANCELED_REPORTS,
        objectId: _id,
        userId: this.userId,
        name: Places.findOne({ _id }).name
      })
      return success
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});
