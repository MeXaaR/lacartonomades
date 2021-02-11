import { Mongo } from "meteor/mongo";
import SimpleSchema from "simpl-schema";
import { preventClientModifications } from "../utils/preventClientModifications";

const Activities = new Mongo.Collection("activities");

const dontUpdate = function () {
  if (this.isInsert) {
    return this.value;
  } else if (this.isUpsert) {
    return { $setOnInsert: this.value };
  } else {
    this.unset(); // Prevent update
  }
};
export const ActivitiesSchema = {
  _id: SimpleSchema.RegEx.Id,
  type: {
    type: String,
  },
  objectId: {
    type: SimpleSchema.RegEx.Id,
    optional: true
  },
  name: {
      type: SimpleSchema.RegEx.Id,
      optional: true
    },
    createdBy: {
        type: SimpleSchema.RegEx.Id,
    },
  createdByUsername: {
    type: String,
    autoValue: function () {
        const user = Meteor.users.findOne({ _id: this.field("createdBy").value })
      return this.value ? this.value : user ? user.username : ""
    },
  },
  createdByAvatar: {
    type: String,
    autoValue: function () {
        const user = Meteor.users.findOne({ _id: this.field("createdBy").value })
      return this.value ? this.value : user && user.profile.avatar ? user.profile.avatar : "/logo-192.png"
    },
  },
  createdAt: {
    type: Date,
    autoValue: function () {
      if (this.isInsert) {
        return new Date();
      } else if (this.isUpsert) {
        return { $setOnInsert: new Date() };
      } else {
        this.unset(); // Prevent user from supplying their own value
      }
    },
  },
};


Activities.attachSchema(ActivitiesSchema);


preventClientModifications(Activities);

export default Activities;