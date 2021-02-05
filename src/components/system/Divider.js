import React from "react";
import styled from "styled-components";
import { COLORS } from "../../settings/theme";

const DividerWrapper = styled.div`
  height: 1px;
  width: 70%;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
  background-color: ${COLORS.MAIN};
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    background-color: ${COLORS.LIGHT};
    padding-left: 8px;
    padding-right: 8px;
    font-weight: bold;
    text-transform: uppercase;
  }
`;

const Divider = ({ text }) => (
  <DividerWrapper>
    <span>{text}</span>
  </DividerWrapper>
);

export default Divider;
