import "./01012021-20-18";
import "./10012021-15-10";

Meteor.startup(function () {
  Migrations.migrateTo("latest");
});
