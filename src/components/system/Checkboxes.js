import React from "react";
import Checkbox from "./Checkbox";
import styled from "styled-components";
import { useTranslation } from "react-i18next";

const SingleBox = styled.div`
  padding: 8px;
  span {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

const Checkboxes = ({
  loading,
  onChange,
  label,
  options,
  name,
  value = [],
  ...props
}) => {
  const { t } = useTranslation();
  const handleUpdate = (target, option) => {
    const { checked } = target;
    let newValue = [...value];
    if (checked) {
      newValue.push(option);
    } else {
      newValue = value.filter((val) => val !== option);
    }
    onChange({ name, value: newValue });
  };
  return (
    <div className="field">
      <div className={`control ${loading ? "is-loading" : ""}`}>
        {!!label && <label className="label">{label} - (multi)</label>}
        {options.map((option) => {
          const isObject = typeof option !== "string";
          return (
            <SingleBox
              className="checkbox"
              key={isObject ? option.value : option}
            >
              <Checkbox
                checked={
                  !!value.find(
                    (val) => val === (isObject ? option.value : option)
                  )
                }
                onChange={(e) =>
                  handleUpdate(e, isObject ? option.value : option)
                }
                name={option}
                text={isObject ? <span>{t(option.value)}</span> : t(option)}
              />
            </SingleBox>
          );
        })}
      </div>
    </div>
  );
};

export default Checkboxes;
