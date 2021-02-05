import React from "react";
import { Link } from "react-router-dom";
import { RoundedButton } from "./style";

const MenuButton = () => (
  <RoundedButton
    className="button is-medium white menu-button"
    style={{ alignSelf: "flex-end" }}
  >
    <Link to={"/menu"}>
      <span className="icon is-large">
        <i className="mdi mdi-menu"></i>
      </span>
    </Link>
  </RoundedButton>
);

export default MenuButton;
