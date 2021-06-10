import { ValidatedMethod } from "meteor/mdg:validated-method";
import { updateActivities } from "../../activities/utils";
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
      console.log(`User account deleted: ${userId}`);
      return removed;
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});

export const changeUserName = new ValidatedMethod({
  name: "users.methods.changeUserName",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  run({ newUsername }) {
    try {
      console.log(`User account modified: ${this.userId} - ${newUsername}`);
      const success = Accounts.setUsername(this.userId, newUsername)
      updateActivities({ username: newUsername, userId: this.userId })
      return success
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});
export const changeEmail = new ValidatedMethod({
  name: "users.methods.changeEmail",
  validate: null,
  applyOptions: {
    noRetry: true,
  },
  run({ newEmail }) {
    try {
      console.log(`User account modified: ${this.userId} - ${newEmail}`);
      const user = Meteor.users.findOne({ _id: this.userId })

      if(user.emails && user.emails[0]){
        Accounts.removeEmail(this.userId, user.emails[0].address)
      } else if(newEmail){
        return Accounts.addEmail(this.userId, newEmail)
      }
    } catch (error) {
      throw new Meteor.Error(error.code, error.reason);
    }
  },
});
