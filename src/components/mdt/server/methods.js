import { MongoInternals, Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { ROLES_ENUMS } from "/src/api/users/roles";

export const collections = {};
const publications = [];

Meteor.startup(async () => {
  const internals = await MongoInternals.defaultRemoteCollectionDriver();
  const { db } = internals.mongo;
  const collectionsData = await db.listCollections();
  collectionsData.each((n, collection) => {
    if (collection) {
      collections[`${collection.name}`] = internals.open(collection.name);
    }
  });
});
export const checkFounders = (userId) => {
  if (!Roles.userIsInRole(userId, ROLES_ENUMS.FOUNDERS)) {
    throw new Meteor.Error("405", "You are not allowed");
  }
};
Meteor.methods({
  "MDT.getMethods": ({ search = "" }) => {
    checkFounders(Meteor.userId());
    const methodsArray = [];
    const methodsKeys = Object.keys(Meteor.server.method_handlers);

    methodsKeys.forEach((key) => {
      if (key[0] !== "/" && key.search("MDT.") === -1) {
        if ((search && key.search(search) !== -1) || !search) {
          methodsArray.push(key);
        }
      }
    });
    return methodsArray;
  },
  "MDT.getCollections": () => {
    checkFounders(Meteor.userId());

    return collections;
  },
  "MDT.updateItem": ({ key, value, collection, itemId }) => {
    try {
      checkFounders(Meteor.userId());
      return collections[collection].update(
        { _id: itemId },
        { $set: { [key]: value } }
      );
    } catch ({ err }) {
      throw new Meteor.Error(err && err.code, err && err.errmsg);
    }
  },
  "MDT.deleteItem": ({ itemId, collection }) => {
    try {
      checkFounders(Meteor.userId());
      return collections[collection].remove({ _id: itemId });
    } catch ({ err }) {
      throw new Meteor.Error(err && err.code, err && err.errmsg);
    }
  },
  "MDT.duplicateItem": ({ itemId, collection }) => {
    try {
      checkFounders(Meteor.userId());
      const item = collections[collection].findOne({ _id: itemId });
      delete item._id;
      return collections[collection].insert({
        _id: new Mongo.ObjectID()._str,
        ...item,
      });
    } catch ({ err }) {
      throw new Meteor.Error(err && err.code, err && err.errmsg);
    }
  },
  "MDT.usersToImpersonate": ({ search }) => {
    checkFounders(Meteor.userId());
    const regex = new RegExp(search, "i");
    const fieldsToSearch = ["_id", "emails.address", "username"];
    const searchQuery = fieldsToSearch.map((field) => ({
      [field]: { $regex: regex },
    }));
    const query = {
      $or: searchQuery,
    };

    return Meteor.users.find(query, { limit: 5, sort: { _id: 1 } }).fetch();
  },
});

Accounts.registerLoginHandler("MDT.impersonateUser", ({ userId }) => ({
  userId,
}));

// Methods Meteor
// default_server.publish_handlers: get all publications
// default_server.method_handlers: get all methods
