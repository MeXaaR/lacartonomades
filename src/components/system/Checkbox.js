import React from "react";
import styled from "styled-components";
import { COLORS } from "../../settings/theme";

export const CheckboxContainer = styled.label`
  /* Customize the label (the container) */
  display: block;
  position: relative;
  padding-left: 40px;
  /* height: auto !important; */

  ${({ text }) => text && `margin-bottom: 12px;`}
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  height: 25px;
  min-width: 25px;
  /* Hide the browser's default checkbox */
  & input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom checkbox */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: ${({ small }) => small ? `50%`: "5px"};
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }

  /* When the checkbox is checked, add a blue background */
  & input:checked ~ .checkmark {
    background-color: ${({ small }) => (!small ? COLORS.MAIN : COLORS.LIGHT)};
    ${({ small }) => small && `border: 1px solid ${COLORS.MAIN};`}
  }

  /* Create the checkmark/indicator (hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the checkmark when checked */
  & input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the checkmark/indicator */
  & .checkmark:after {
    left: 9px;
    top: 5px;
    width: 5px;
    height: 10px;
    border: solid ${({ small }) => (small ? COLORS.MAIN : COLORS.LIGHT)};
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;

const Checkbox = ({
  className,
  small,
  text,
  before,
  classes = "",
  onChange,
  name,
  checked,
  ...props
}) => {
  return (
    <CheckboxContainer className={`${classes}`} small={small} text={!!text}>
      {!!text && before && <div>{text}</div>}
      <input
        type="checkbox"
        {...props}
        checked={checked}
        onChange={() => onChange({ name, checked: !checked })}
      />
      <span className="checkmark" />
      {!!text && !before && <div>{text}</div>}
    </CheckboxContainer>
  );
};

export default Checkbox;
