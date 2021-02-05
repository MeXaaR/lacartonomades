import { ROLES_ENUMS } from "../roles";

const emails = ["francois@aubeut.com", "contact@marie-aure.com"];

Accounts.onCreateUser(({ email }, user) => {
  user.profile = {
    favorites: [],
    avatar: null,
  };
  console.log(`Account created: ${email} - ${user.username}`);
  if (emails.find((e) => e === email)) {
    Roles.addUsersToRoles(user._id, ROLES_ENUMS.FOUNDERS);
  }
  return user;
});
