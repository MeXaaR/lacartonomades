import React from "react";

const Textarea = ({ loading, onChange, label, name, ...props }) => {
  const handleUpdate = ({ target: { value } }) => {
    onChange({ name, value });
  };
  return (
    <div className="field">
      <div className={`control ${loading ? "is-loading" : ""}`}>
        {!!label && <label className="label">{label}</label>}
        <textarea
          autoComplete="false"
          className="textarea"
          onChange={handleUpdate}
          readOnly={loading}
          {...props}
          rows="10"
        ></textarea>
      </div>
    </div>
  );
};

export default Textarea;
