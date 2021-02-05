Meteor.startup(() => {
  const methodsKeys = [
    "places.methods.get_around",
    "places.methods.getOne",
    "users.methods.updateUserLanguage"
  ];

  const methodsKeysOneSecond = [
    "places.methods.send_email",
    "places.methods.create",
    "places.methods.update",
    "places.methods.remove_founders",
    "places.methods.remove_steps",
    "places.methods.cancel_signals",
    "users.methods.addFavorites",
    "users.methods.removeFavorites",
    "users.methods.chooseNewAvatar",
    "users.methods.setPresence",
    "users.methods.removePresence"
  ];

  DDPRateLimiter.addRule(
    {
      name(name) {
        return methodsKeys.find((m) => m === name);
      },
      connectionId() {
        return true;
      },
    },
    1,
    300
  );
  DDPRateLimiter.addRule(
    {
      name(name) {
        return methodsKeysOneSecond.find((m) => m === name);
      },
      connectionId() {
        return true;
      },
    },
    1,
    1000
  );
});
