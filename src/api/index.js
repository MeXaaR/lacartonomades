import "./users/methods";
import "./users/model";
import "./users/server/accounts";
import "./users/server/publications";
import "./users/server/methods";

import "./spots/model";
import "./spots/methods";
import "./spots/server/methods";
import "./spots/server/publications";

import "./migrations/server/index";
import "./emails/index";

import "./utils/rate-limiter";

if (Meteor.isDevelopment) {
  import "./spots/server/fakeData";
}
