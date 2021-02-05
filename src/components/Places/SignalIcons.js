import React from "react";
import { ErrorSignal } from "./styles";

const SignalIcon = ({ delete_steps = 3, currentSteps = 0, display }) => (
  <ErrorSignal className="columns is-centered is-mobile is-multiline">
    {(!!currentSteps || display) &&
      new Array(delete_steps).fill(0).map((_, i) => (
        <div className="column is-one-quarter-mobile" key={i}>
          <span
            className={`icon is-large ${
              i + 1 <= currentSteps.length ? "has-text-danger" : ""
            }`}
          >
            <i className="mdi mdi-alert-octagon"></i>
          </span>
        </div>
      ))}
  </ErrorSignal>
);

export default SignalIcon;
