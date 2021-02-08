// import { Mongo } from "meteor/mongo";
// import SimpleSchema from "simpl-schema";
// import { preventClientModifications } from "../utils/preventClientModifications";

// const UserProfiles = new Mongo.Collection("user_profile");

// export const UserProfilesSchema = new SimpleSchema({
//   _id: SimpleSchema.RegEx.Id,
//   createdAt: {
//     type: Date,
//     optional: true,
//   },
//   updatedAt: {
//     type: Date,
//     optional: true,
//   },
//   userId: {
//     type: SimpleSchema.RegEx.Id,
//   },
//   favorites: {
//     type: Array,
//     defaultValue: [],
//   },
//   "favorites.$": {
//     type: SimpleSchema.RegEx.Id,
//   },
// });

// preventClientModifications(UserProfiles);
// UserProfiles.attachSchema(UserProfilesSchema);

// export default UserProfiles;

// Deny all client-side updates to user documents
Meteor.users.deny({
    update() { return true; }
});