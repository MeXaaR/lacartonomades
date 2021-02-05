import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleInput } from "/src/api/utils/hooks";
import { ModalFooter } from "../style";
import { useTranslation } from "react-i18next";
import { validateEmail } from "/src/functions";
import { useToggle } from "../../../api/utils/hooks";

const initialState = {
  password: "",
  check_password: "",
};
const ResetPassword = ({
  match: {
    params: { token },
  },
}) => {
  const [state, setState] = useState({ ...initialState });
  const [loading, toggleLoading] = useToggle(false);
  const [passwordsOk, togglePasswordsOk] = useState(false);
  const { t } = useTranslation();
  const handleChange = handleInput(({ value, name }) => {
    setState((state) => ({ ...state, [name]: value }));
  });
  const { password, check_password } = state;

  const login = (e) => {
    if (!passwordsOk) {
      msg.error("errors.password_dont_match");
      return;
    }
    if (e.preventDefault) {
      e.preventDefault();
    }
    toggleLoading();
    Accounts.resetPassword(token, password, (error) => {
      toggleLoading();
      if (error) {
        const errorMessage =
          t(`errors.${error.reason}`) === `errors.${error.reason}`
            ? error.reason
            : t(`errors.${error.reason}`);
        msg.error(errorMessage);
      } else {
        msg.info(t("reset_password.password_reset"));
      }
    });
  };

  useEffect(() => {
    togglePasswordsOk(password === check_password);
  }, [password, check_password]);
  return (
    <>
      <section className="modal-card-body">
        <form onSubmit={login}>
          <article className="message is-info">
            <div className="message-body">
              {t("reset_password.explanation")}
            </div>
          </article>

          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={handleChange}
                className={`input ${loading ? "is-loading" : null} ${
                  password && check_password && passwordsOk && "is-success"
                } ${password && check_password && !passwordsOk && "is-danger"}`}
                type="password"
                name="password"
                value={state.password}
                placeholder={t("user.new_password")}
              />
              <span className="icon is-small is-left">
                <i className="mdi mdi-lock"></i>
              </span>

              {password && check_password && passwordsOk && (
                <span className="icon is-small is-right is-success">
                  <i className="mdi mdi-check-bold"></i>
                </span>
              )}
              {password && check_password && !passwordsOk && (
                <span className="icon is-small is-right is-danger">
                  <i className="mdi mdi-alert"></i>
                </span>
              )}
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={handleChange}
                className={`input ${loading ? "is-loading" : null} ${
                  password && check_password && passwordsOk && "is-success"
                } ${password && check_password && !passwordsOk && "is-danger"}`}
                type="password"
                name="check_password"
                value={state.check_password}
                placeholder={t("user.check_password")}
              />
              <span className="icon is-small is-left">
                <i className="mdi mdi-lock"></i>
              </span>
              {password && check_password && passwordsOk && (
                <span className="icon is-small is-right is-success">
                  <i className="mdi mdi-check-bold"></i>
                </span>
              )}
              {password && check_password && !passwordsOk && (
                <span className="icon is-small is-right is-danger">
                  <i className="mdi mdi-alert"></i>
                </span>
              )}
            </div>
          </div>

          <button type="sumbit" className="hidden" />
        </form>
      </section>

      <ModalFooter className="modal-card-foot">
        <button
          onClick={login}
          className={`button is-success ${loading ? "is-loading" : null}`}
        >
          {t("buttons.validate")}
        </button>
        <Link to="/login">
          <button
            className={`button is-danger ${loading ? "is-loading" : null}`}
          >
            {t("buttons.cancel")}
          </button>
        </Link>
      </ModalFooter>
    </>
  );
};

export default ResetPassword;
