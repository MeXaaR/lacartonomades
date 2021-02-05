import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { handleInput } from "/src/api/utils/hooks";
import { ModalFooter } from "../style";
import { useTranslation } from "react-i18next";
import { validateEmail } from "/src/functions";
import { useToggle } from "../../../api/utils/hooks";

const initialState = {
  email: "",
  password: "",
};
const LostPassword = () => {
  const [state, setState] = useState({ ...initialState });
  const [loading, toggleLoading] = useToggle(false);
  const [emailOk, toggleEmailOk] = useState(false);
  const { t } = useTranslation();
  const handleChange = handleInput(({ value, name }) => {
    setState((state) => ({ ...state, [name]: value }));
  });

  const login = (e) => {
    if (e.preventDefault) {
      e.preventDefault();
    }
    toggleLoading();
    Accounts.forgotPassword({ email: state.email }, (error) => {
      toggleLoading();
      if (error) {
        const errorMessage =
          t(`errors.${error.reason}`) === `errors.${error.reason}`
            ? error.reason
            : t(`errors.${error.reason}`);
        msg.error(errorMessage);
      } else {
        msg.info(t("lost_password.email_sent"));
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

  return (
    <>
      <section className="modal-card-body">
        <form onSubmit={login}>
          <article className="message is-info">
            <div className="message-body">{t("lost_password.explanation")}</div>
          </article>

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

export default LostPassword;
