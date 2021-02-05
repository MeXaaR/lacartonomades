import styled from "styled-components";

export const StyledNavbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 8px rgba(10, 10, 10, 0.05);
  height: 52px;
  ${({ isMobile }) => (!isMobile ? "z-index: 150;" : "")}
  .navbar-end {
    display: flex;
    justify-content: flex-end;
  }
  .navbar-dropdown {
    background-color: #fff;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    border-top: 2px solid #dbdbdb;
    box-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
    display: block;
    font-size: 0.875rem;
    min-width: 230px;
    position: absolute;
    top: 100%;
    z-index: 3;
    left: auto;
    right: 0;
  }
  .navbar-divider {
    display: block;
  }
`;
