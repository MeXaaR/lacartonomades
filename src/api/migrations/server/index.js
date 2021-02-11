import "./01012021-20-18";
import "./10012021-15-10";
import "./11022021-13-41"

Meteor.startup(function () {
  Migrations.migrateTo("latest");
});
