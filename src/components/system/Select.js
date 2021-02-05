import React from "react";

const Select = ({
  value,
  name,
  onChange,
  icon,
  options,
  label,
  noSelection,
}) => {
  const handleUpdate = ({ target: { value } }) => {
    onChange({ name, value });
  };

  return (
    <div className="field">
      <label className="label">{label}</label>
      <div className={`control ${!!value && !!icon && "has-icons-left"}`}>
        <div className="select is-fullwidth">
          <select value={value || "none"} onChange={handleUpdate} name={name}>
            {!!noSelection && (
              <option value="none" disabled>
                {noSelection}
              </option>
            )}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        {!!value && (
          <div className="icon is-small is-left">
            <i className={icon}></i>
          </div>
        )}
      </div>
    </div>
  );
};

export default Select;
