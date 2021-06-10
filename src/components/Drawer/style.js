import styled, { css } from "styled-components";
import { COLORS } from "/src/settings/theme";
import { animated } from "react-spring";
import allCategories, { SPECIAL_CATEGORIES } from "../../settings/categories";

export const RoundedButton = styled.button`
  border-radius: 50%;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  height: 50px;
  width: 50px;

  &.menu-button {
    position: absolute;
    top: 10px;
    z-index: 1;
    right: 15px;
    transition: all 0.2s ease-in-out;
    align-items: center;
  }

  &.white * {
    color: ${COLORS.MAIN} !important;
  }
  &.colored {
    background-color: ${COLORS.MAIN};
    color: ${COLORS.LIGHT};
    border-color: ${COLORS.MAIN};
  }

  &.is-focused,
  &:focus {
    border-color: transparent;
  }
  &.is-focused:not(:active),
  &:focus:not(:active) {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  }
`;

export const ActionButtonsWrapper = styled.div`
  position: absolute;
  top: ${({ isMobile }) => (isMobile ? "10px" : "60px")};
  z-index: 10;
  left: ${({ menuOpened, isMobile, isTablet }) =>
    menuOpened && !isMobile && !isTablet
      ? 390
      : isTablet && menuOpened
      ? 360
      : 10}px;
  display: flex;
  justify-content: ${({ isMobile }) =>
    isMobile ? "space-between" : "flex-start"};
  transition: all 0.2s ease-in-out;
  align-items: center;
  .buttons:not(:last-child),
  .buttons:last-child {
    margin-bottom: 0;
    margin-left: 8px;
  }
`;

export const SearchWithMobileStyle = styled(animated.div)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  .modal-background {
    background-color: rgba(0, 0, 0, 0.5);
  }
  .field {
    margin-top: 15px;
    margin-left: 15px;
    margin-right: 15px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
    .input.is-focused,
    .input:focus {
      border-color: transparent;
    }
    .input,
    .input.is-focused:not(:active),
    .input:focus:not(:active) {
      box-shadow: none;
    }
    .icon.is-small {
      color: ${COLORS.MAIN};
    }
  }
`;

export const SearchWithStyle = styled.div`
  .field {
    padding: 10px;
    background-color: ${COLORS.SECONDARY};
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);

    width: ${({ isTablet, list }) =>
      isTablet || list ? "100%" : "calc(100% + 25px)"};
    ${({ list }) =>
      list &&
      css`
        margin-bottom: 10px;
        .control.has-icons-left.has-icons-right {
          width: 100%;
        }
      `}
    .input.is-focused,
    .input:focus {
      border-color: transparent;
    }
    .input,
    .input.is-focused:not(:active),
    .input:focus:not(:active) {
      box-shadow: none;
    }
    .input {
      padding-left: 60px;
    }
    .icon.is-small {
      color: ${COLORS.MAIN};
      &.is-left {
        color: ${COLORS.LIGHT};
        background-color: ${COLORS.MENUS.MENU_ICONS.BACKGROUND};
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
    }
  }
`;
export const ResultsBox = styled.div`
  position: ${({ isMobile }) => (isMobile ? "fixed" : "absolute")};
  margin: auto;
  left: ${({ isMobile }) => (isMobile ? "0px" : "10px")};
  ${({ isMobile }) =>
    isMobile
      ? css`
          right: 0px;

          margin-left: 15px;
          margin-right: 15px;
        `
      : ""};
  width: ${({ isMobile }) => (isMobile ? "auto" : "calc(100% + 7px)")};
  z-index: 2;
  ul li a {
    display: flex;
    align-items: center;
    padding: 0px;
    .information {
      .name {
        font-weight: bold;
        color: ${COLORS.MAIN};
        font-size: 14px;
      }
      .address {
        color: ${COLORS.GREY};
        font-style: italic;
        font-size: 14px;
      }
    }
    .icon {
      margin-right: 8px;
    }
  }
`;
export const SmallDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${COLORS.LIGHT_GREY};
`;
export const DrawerWrapper = styled(animated.aside)`
  position: fixed;
  z-index: 140;
  background-color: ${COLORS.LIGHT_GREY};
  top: ${({ isMobile }) => (isMobile ? 0 : 52)}px;
  bottom: 0;
  min-width: ${({ isMobile }) => (isMobile ? "100%" : "350px")};
  max-width: ${({ isMobile }) => (isMobile ? "100%" : "350px")};
  ${({ open }) =>
    open &&
    `
  box-shadow: 5px 0 15px rgba(0, 0, 0, 0.2), -1px 0 2px rgba(0, 0, 0, 0.2);
  `}
`;

export const MenuIcons = styled.div`
  min-height: 100%;
  height: auto;
  background-color: ${COLORS.MENUS.MENU_ICONS.BACKGROUND};
  color: ${COLORS.MENUS.MENU_ICONS.COLOR};
  a {
    color: ${COLORS.MENUS.MENU_ICONS.COLOR};
  }
  .all {
    font-size: 14px;
  }
  .tooltip-category {
    height: 50px;
    display: flex;
    align-items: center;
    font-weight: bold;
  }
  .menu-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    li {
      cursor: pointer;
      width: 3.5rem;
      height: 3.5rem;
      line-height: 3.5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: all 0.3s ease-in-out;
    }
    li.active.all {
      background-color: ${COLORS.MAIN};
    }
    ${allCategories.map(
      (category) => `
        
        li.active.${category.name} {
          background-color: ${category.color};
        }
    `
    )}
    li.active.${SPECIAL_CATEGORIES.FAVORITES.NAME} {
      background-color: ${SPECIAL_CATEGORIES.FAVORITES.COLOR};
    }
    li.active.${SPECIAL_CATEGORIES.PRESENCES.NAME} {
      background-color: ${SPECIAL_CATEGORIES.PRESENCES.COLOR};
    }
    li.all:not(.active) {
      transform: rotate(-45deg);
    }
  }
`;
export const MenuDetails = styled.div`
  flex-grow: 1;
  button {
    position: fixed;
    top: 15px;
    right: 10px;
    color: ${COLORS.MENUS.MENU_DETAILS.COLOR} !important;
    &::before,
    &::after {
      background-color: ${COLORS.MENUS.MENU_DETAILS.COLOR} !important;
    }
  }
  h3 {
    color: ${COLORS.MENUS.MENU_DETAILS.COLOR};
    text-align: center;
    margin: 20px;
    ${({ isMobile }) => !isMobile && "margin-top: 10px;"}
    font-weight: bold;
    letter-spacing: 1px;
  }
  ul {
    background-color: ${COLORS.MENUS.MENU_DETAILS.BACKGROUND};
    color: ${COLORS.MENUS.MENU_DETAILS.COLOR};
    border-radius: 8px;
    margin: 5px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .menu-item {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    &:hover {
      color: ${COLORS.MENUS.MENU_DETAILS.HOVER};
    }
  }
`;

export const SingleCategoryLineStyle = styled.li`
  justify-content: space-between !important;
  .name-wrapper {
    display: flex;
    align-items: center;
  }
`;
export const MenusWrapper = styled.div`
  height: ${({ isMobile, listMode }) =>
    isMobile || listMode ? "100%" : "calc(100% - 60px)"};
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
  align-items: flex-start;
  justify-content: space-between;
`;

export const MobileNav = styled.nav`
  padding: 1rem;
  background-color: ${COLORS.MAIN};
  a {
    text-align: center;
    color: ${COLORS.LIGHT};
    padding: 3px;
  }
`;
