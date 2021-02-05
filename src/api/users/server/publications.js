Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ "user._id": this.userId });
  } else {
    this.ready();
  }
});

Meteor.publish("users.current.profile", function () {
  if (this.userId) {
    return Meteor.users.find(
      { _id: this.userId },
      { limit: 1, sort: { _id: 1 } }
    );
  } else {
    this.ready();
  }
});

Meteor.publish("users.publications.on_a_place", function ({ placeId }) {
  return Meteor.users.find(
    { "profile.presentInPlace": placeId },
    {
      limit: 1000,
      sort: { username: 1 },
      fields: { "profile.avatar": 1, username: 1 },
    }
  );
});

Meteor.publish("places.presences.count", function () {
  Counts.publish(
    this,
    "places.presences.count",
    Meteor.users.find(
      { "profile.presentInPlace": { $exists: true } },
      { limit: 100000, sort: { userId: 1 } }
    )
  );
});
