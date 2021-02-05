import Dexie from "dexie";
import * as commonFields from "../settings/categories/commons";

const initializeDb = () => {
  const newDb = new Dexie(Meteor.settings.public.LOCALSTORAGE_DB_SPOTS_PLACES);
  newDb.version(1).stores({
    places: `++_id,name,[latitude+longitude],updatedAt,*category,[category+latitude],private`,
  });
  newDb
    .open()
    .then(function (db) {
      console.log("Found database: " + db.name);
      console.log("Database version: " + db.verno);
      db.tables.forEach(function (table) {
        console.log("Found table: " + table.name);
      });
    })
    .catch("NoSuchDatabaseError", function (e) {
      // Database with that name did not exist
      console.error("Database not found");
    })
    .catch(function (e) {
      console.error("Oh uh: " + e);
    });
  return newDb;
};

export const localDB = initializeDb();
