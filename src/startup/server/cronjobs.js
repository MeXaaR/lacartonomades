import Activities from "../../api/activities/model";

SyncedCron.config({
  log: Meteor.isDevelopment,
  collectionName: "cronHistory",
  utc: false,
});

SyncedCron.add({
  name: "Remove all passed presence",
  schedule: function (parser) {
    // parser is a later.parse object
    return parser.text("every 30 minutes");
  },
  job: function () {
    const date = new Date().valueOf();
    const userUnMarked = [];

    const usersWithPresence = Meteor.users
      .find(
        { "profile.presentInPlace": { $exists: true } },
        { "profile.presenceUntil": { $lte: date } },
        { fields: { profile: 1, username: 1 } }
      )
      .fetch();
    usersWithPresence.forEach(
      ({ _id, username, profile: { presenceUntil } }) => {
        if (date > presenceUntil) {
          userUnMarked.push(_id);
          console.log(`Auto removed presence for ${username}`);
          Meteor.users.update(
            { _id },
            {
              $unset: {
                "profile.presentInPlace": "",
                "profile.presenceUntil": "",
              },
            }
          );
        }
      }
    );
    return userUnMarked;
  },
});
SyncedCron.add({
  name: "Remove activities after 30",
  schedule: function (parser) {
    // parser is a later.parse object
    return parser.text("every 24 hours");
  },
  job: function () {
    const activitiesToRemove = Activities.find({}, { sort: { createdAt: -1 }, skip: 30 })

    return activitiesToRemove.forEach(({ _id }) => Activities.remove({ _id }));
  },
});
SyncedCron.start();
