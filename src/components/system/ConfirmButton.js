import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

const ConfirmButton = ({
  onAction,
  text,
  disabled,
  icon,
  onCancel,
  classes,
}) => {
  const [timesPressed, setTimePressed] = useState(0);
  const [timer, setTimer] = useState(-1);
  const { t } = useTranslation();

  const onPress = () => {
    setTimePressed(timesPressed + 1);
    setTimer(3);
  };

  const startInterval = (pressed, timerValue = 3) => {
    setTimeout(() => {
      if (pressed === timesPressed && timerValue !== 0) {
        setTimer(timerValue - 1);
      } else if (timerValue === 0) {
        setTimePressed(0);
        setTimer(-1);
        if (onCancel) {
          onCancel();
        }
      }
    }, 1000);
  };

  useEffect(() => {
    if (timesPressed === 2) {
      onAction();
      setTimePressed(0);
      setTimer(-1);
    } else if (timesPressed !== 0 && timer !== -1) {
      startInterval(timesPressed, timer);
    } else {
      setTimePressed(0);
      setTimer(-1);
    }
  }, [timesPressed, timer]);

  return (
    <button
      className={`button ${classes}`}
      onClick={onPress}
      disabled={disabled}
    >
      {icon && (
        <span className="icon">
          <i className={icon}></i>
        </span>
      )}
      <span>
        {timer === -1
          ? text
          : `${timer} | ${t("components.ConfirmButton.sure")}`}
      </span>
    </button>
  );
};

export default ConfirmButton;
