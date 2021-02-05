import React from "react";
import Radio, { RadioContainer } from "./Radio";
import styled, { css } from "styled-components";
import { useTranslation } from "react-i18next";
import Checkbox from "./Checkbox";
import { COLORS } from "../../settings/theme";

const SingleRadio = styled.div`
  padding: 8px 8px 8px 0px;
  ${RadioContainer} {
    margin-left: 8px;
    margin-right: 8px;

    ${({ fade }) =>
      fade &&
      css`
        & input:not(:checked) ~ .checkmark {
          background-color: ${COLORS.MAIN};
          opacity: 0.2;
        }
      `}
  }
  span {
    margin-left: 8px;
    margin-right: 8px;
  }
`;

const Radios = ({
  loading,
  onChange,
  label,
  options,
  name,
  value,
  fade,
  ...props
}) => {
  const { t } = useTranslation();
  const handleUpdate = (e, option) => {
    onChange({ name, value: option });
  };
  return (
    <div className="field">
      <div className={`control ${loading ? "is-loading" : ""}`}>
        {!!label && <label className="label">{label}</label>}
        {options.map((option) => (
          <SingleRadio className="radio" key={option} fade={fade}>
            <Checkbox
              key={option}
              checked={value === option}
              text={t(option)}
              onChange={(e) => handleUpdate(e, option)}
            />
          </SingleRadio>
        ))}
      </div>
    </div>
  );
};

export default Radios;
