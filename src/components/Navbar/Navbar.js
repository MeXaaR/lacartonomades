import React from "react";
import { Link } from "react-router-dom";
import { useAppContext } from "/src/context/appContext";

import { BASELINE } from "/src/settings/identity";
import { LOGOS } from "/src/settings/theme";
import { StyledNavbar } from "./style";

const Navbar = () => {
  const [{ isMobile }] = useAppContext();

  return (
    <StyledNavbar className="navbar is-transparent " isMobile={isMobile}>
      <div className="navbar-brand">
        <Link to="/about" className="navbar-item">
          <img
            src={isMobile ? LOGOS.CORDOVA : LOGOS.DESKTOP}
            alt={BASELINE}
            width={isMobile ? 118 : 300}
            height="28"
          />
        </Link>
      </div>
      <div className="navbar-end">


              
        <div className="navbar-item">
          <Link to="/activities" className="navbar-link is-arrowless">
            <span className="icon is-large">
                <i className="mdi mdi-24px mdi-bell-ring"></i>
            </span>
          </Link>
          <Link to="/help" className="navbar-link is-arrowless">
            <span className="icon">
              <i className="mdi mdi-24px mdi-help"></i>
            </span>
          </Link>
          <Link to="/menu" className="navbar-link is-arrowless">
            <span className="icon">
              <i className="mdi mdi-24px mdi-menu"></i>
            </span>
          </Link>
        </div>
      </div>
    </StyledNavbar>
  );
};

export default Navbar;
