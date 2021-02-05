import { Meteor } from "meteor/meteor";
import React from "react";
import { hydrate } from "react-dom";
// import "bulma/css/bulma.min.css";

import "/src/api/utils/i18n";
import "/src/api/index_client";

import App from "/src/startup/App";

Meteor.startup(() => {
  const target = document.getElementById("app");
  hydrate(<App />, target);
});
