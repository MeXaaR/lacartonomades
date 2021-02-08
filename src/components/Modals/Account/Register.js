import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleInput, useToggle } from "/src/api/utils/hooks";
import { ModalFooter } from "../style";
import { useTranslation } from "react-i18next";
import { validateEmail } from "/src/functions";

const initialState = {
  username: "",
  email: "",
  password: "",
};

const Register = () => {
  const [state, setState] = useState({ ...initialState });
  const [emailOk, toggleEmailOk] = useState(false);
  const [loading, toggleLoading] = useToggle(false);
  const [error, setError] = useState(null);
  const { t } = useTranslation();
  const handleChange = handleInput(({ value, name }) => {
    setState((state) => ({ ...state, [name]: value }));
  });
  const register = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (state.email && !emailOk) {
      setError({
        reason: t("login_form.email_not_valid"),
      });
      return;
    } else if(!state.username){
      setError({
        reason: t("login_form.username_mandatory"),
      });
      return

    }
    toggleLoading();
    Accounts.createUser({ ...state }, (error) => {
      toggleLoading();
      if (error) {
        if(error.reason === "Username already exists."){
          setError({
            reason: t(`errors.Uusername_exists`),
          });
          return
        }
        console.log(t(`errors.${error.reason}`))
        const errorMessage =
          t(`errors.${error.reason}`) === `errors.${error.reason}`
            ? error.reason
            : t(`errors.${error.reason}`);
        setError({
          reason: errorMessage,
        });
      } else {
        msg.info(t("login_form.welcome_onboard"));
      }
    });
  };
  useEffect(() => {
    const isEmailOk = validateEmail(state.email);
    if (state.email && isEmailOk) {
      toggleEmailOk(true);
    } else if (state.email && !isEmailOk) {
      toggleEmailOk(false);
    }
  }, [state.email]);

  const closeError = () => {
    setError(null);
  };

  return (
    <>
      <section className="modal-card-body">
        <article className="message is-info">
          <div className="message-body">
            {t("login_form.no_email_creation_account")}
          </div>
        </article>
        <form onSubmit={register}>
          <div className="field">
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={handleChange}
                className={`input ${loading ? "is-loading" : null}`}
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
            <div className="control has-icons-left has-icons-right">
              <input
                onChange={handleChange}
                className={`input ${
                  !emailOk && state.email ? " is-danger" : ""
                } ${emailOk ? " is-success" : ""} ${
                  loading ? "is-loading" : null
                }`}
                value={state.email}
                type="email"
                name="email"
                placeholder={t("user.email")}
              />
              <span className="icon is-small is-left">
                <i className="mdi mdi-email"></i>
              </span>
            </div>
          </div>

          <div className="field">
            <div className="control has-icons-left">
              <input
                onChange={handleChange}
                className={`input ${loading ? "is-loading" : null}`}
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
          <button type="sumbit" className="hidden" />
        </form>
        {error && (
          <div className="notification is-danger is-light">
            <button onClick={closeError} className="delete"></button>
            {error.reason}
          </div>
        )}
        <div className="links-wrapper">
          <br />
          <Link to="/login" className="button is-small is-info">
            {t("login_form.go_to_login")}
          </Link>
          <br />
          <br />
          <Link to="/lost-password" className="button is-small is-info">
            {t("login_form.go_to_lost-password")}
          </Link>
        </div>
      </section>

      <ModalFooter className="modal-card-foot">
        <button
          type="submit"
          onClick={register}
          className={`button is-success ${loading ? "is-loading" : null}`}
        >
          {t("buttons.register")}
        </button>
      </ModalFooter>
    </>
  );
};

export default Register;
