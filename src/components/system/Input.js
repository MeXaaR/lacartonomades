import React from "react";
import { useTranslation } from "react-i18next";

const Input = ({ loading, onChange, label, name, icon, private, ...props }) => {
  const handleUpdate = ({ target: { value, files } }) => {
    onChange({ name, value, files });
  };
  const { t } = useTranslation();
  return (
    <div className="field">
      {!!label && <label className="label">{label}</label>}
      <div
        className={`control ${loading ? "is-loading" : ""} ${
          icon ? "has-icons-left" : ""
        }`}
      >
        <input
          {...props}
          autoComplete="false"
          className="input"
          readOnly={loading}
          onChange={handleUpdate}
        />
        {icon && (
          <span className="icon is-small is-left">
            <i className={icon}></i>
          </span>
        )}
      </div>
      {private && <p className="help">{t("place_form.private")}</p>}
    </div>
  );
};

export default Input;
