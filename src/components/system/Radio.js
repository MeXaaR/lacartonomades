import React from "react";
import styled from "styled-components";
import { COLORS } from "../../settings/theme";

const RadioContainer = styled.div`
  display: block;
  position: relative;
  padding-left: 40px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 16px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  /* Hide the browser's default radio button */
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }

  /* Create a custom radio button */
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 25px;
    width: 25px;
    background-color: #eee;
    border-radius: 50%;
  }

  /* On mouse-over, add a grey background color */
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }
  /* When the radio button is checked, add a blue background */
  & input:checked ~ .checkmark {
    background-color: ${COLORS.MAIN};
  }

  /* Create the indicator (the dot/circle - hidden when not checked) */
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }

  /* Show the indicator (dot/circle) when checked */
  & input:checked ~ .checkmark:after {
    display: block;
  }

  /* Style the indicator (dot/circle) */
  & .checkmark:after {
    top: 9px;
    left: 9px;
    width: 7px;
    height: 7px;
    border-radius: 50%;
    background: white;
  }
`;

const Radio = ({ className, checked, onChange, text, before, ...props }) => (
  <RadioContainer onClick={onChange}>
    {!!text && before && <div>{text}</div>}
    <input type="checkbox" checked={checked} {...props} onChange={() => null} />
    <span className="checkmark"></span>
    {!!text && !before && <div>{text}</div>}
  </RadioContainer>
);

export default Radio;
