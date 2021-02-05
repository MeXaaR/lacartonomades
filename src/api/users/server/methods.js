import { ValidatedMethod } from "meteor/mdg:validated-method";
import Places from "../../spots/model";

export const removeAccount = new ValidatedMethod({
  name: "users.methods.removeAccount",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  run() {
    try {
      const userId = this.userId;
      const removed = Meteor.users.remove({
        _id: userId,
      });
      const places = Places.find(
        { createdBy: userId, private: true },
        { fields: { _id: 1 } }
      ).fetch();
      const privatesIds = Places.find({ createdBy: userId, private: true }).fetch().map(({ _id }) => _id)
      Places.remove({ createdBy: userId, private: true });
      privatesIds.forEach((id) => {
        Meteor.users.update(
          {},
          {
            $pull: {
              "profile.favorites": id,
            },
          },
          { multi: true }
        )
      })
      console.log(`User account deleted: ${userId}`);
      console.log(`Privates places deleted: ${places.length}`);
      return removed;
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});
