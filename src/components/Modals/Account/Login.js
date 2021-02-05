import React, { useState } from "react";
import { Link } from "react-router-dom";
import { handleInput } from "/src/api/utils/hooks";
import { ModalFooter } from "../style";
import { useTranslation } from "react-i18next";

const initialState = {
  username: "",
  password: "",
};
const Login = () => {
  const [state, setState] = useState({ ...initialState });
  const { t } = useTranslation();
  const handleChange = handleInput(({ value, name }) => {
    setState((state) => ({ ...state, [name]: value }));
  });

  const login = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    Meteor.loginWithPassword(state.username, state.password, (error) => {
      if (error) {
        const errorMessage =
          t(`errors.${error.reason}`) === `errors.${error.reason}`
            ? error.reason
            : t(`errors.${error.reason}`);
        msg.error(errorMessage);
      } else {
        msg.info(t("login_form.welcome_onboard"));
      }
    });
  };

  return (
    <>
      <section className="modal-card-body">
        <form onSubmit={login}>
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={handleChange}
                className="input"
                value={state.username}
                name="username"
                placeholder={t("user.username")}
              />
              <span className="icon is-small is-left">
                <i className="mdi mdi-account"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input
                onChange={handleChange}
                className="input"
                type="password"
                name="password"
                value={state.password}
                placeholder={t("user.password")}
              />
              <span className="icon is-small is-left">
                <i className="mdi mdi-lock"></i>
              </span>
            </div>
          </div>
          <div className="links-wrapper">
            <br />
            <Link to="/register" className="button is-small is-info">
              {t("login_form.go_to_register")}
            </Link>
            <br />
            <br />
            <Link to="/lost-password" className="button is-small is-info">
              {t("login_form.go_to_lost-password")}
            </Link>
          </div>
          <button type="sumbit" className="hidden" />
        </form>
      </section>

      <ModalFooter className="modal-card-foot">
        <button onClick={login} className="button is-success">
          {t("buttons.validate")}
        </button>
      </ModalFooter>
    </>
  );
};

export default Login;
