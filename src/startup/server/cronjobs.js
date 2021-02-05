SyncedCron.config({
  log: false,
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
SyncedCron.start();
