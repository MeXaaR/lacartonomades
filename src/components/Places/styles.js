import { animated } from "react-spring";
import styled, { css } from "styled-components";
import { COLORS, FONTS } from "../../settings/theme";

export const DrawerWrapper = styled(animated.div)`
  flex-grow: 1;
  margin: 0 auto;
  width: auto;
  position: fixed;
  z-index: 140;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: ${({ isMobile, isTablet }) =>
    isMobile || isTablet ? COLORS.LIGHT : COLORS.LIGHT_GREY};
  right: 0;
  bottom: 0;
  ${({ isMobile, isTablet, menuOpened }) =>
    isTablet && menuOpened
      ? css`
          left: 350px;
        `
      : isMobile
      ? css`
          left: 0;
        `
      : ""}
  ${({ isTablet, isMobile }) =>
    !isTablet && !isMobile
      ? css`
          height: 100%;
        `
      : null}
  max-height: ${({ isMobile }) => (isMobile ? "100%" : "calc(100% - 52px)")};
  min-width: ${({ isMobile, isTablet, menuOpened }) =>
    isTablet && menuOpened
      ? "calc(100% - 350px)"
      : isMobile || (isTablet && !menuOpened)
      ? "100%"
      : "470px"};
  max-width: ${({ isMobile, isTablet, menuOpened }) =>
    isTablet && menuOpened
      ? "calc(100% - 350px)"
      : isMobile || (isTablet && !menuOpened)
      ? "100%"
      : "470px"};
  transition: width 0.3s ease-in-out;
  ${({ isTablet, isMobile }) =>
    !isMobile && !isTablet
      ? css`
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2),
            0 -1px 2px rgba(0, 0, 0, 0.2);
        `
      : ""}

  ${({ isMobile, isTablet }) =>
    !isMobile && !isTablet
      ? "overflow: auto;"
      : css`
          .wrapper {
            overflow: auto;
          }
        `}
`;

export const Description = styled.div`
  padding: 1rem 1rem ${({ mobile }) => (mobile ? 0.5 : 1)}rem;
  background-color: ${COLORS.LIGHT};
  ${({ mobile, fullOpened, empty }) =>
  empty ? css`
      min-height: 200px;
      ` 
      :
    !fullOpened &&
    mobile &&
    css`
      p {
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        display: -webkit-box;
      }
    `}
  * {
    color: ${({ color_text }) => color_text || COLORS.DARK_GREY};
  }
  .title {
    font-family: ${FONTS.TITLES};
    color: ${({ color }) => color || COLORS.DARK_GREY};
    * {
      color: ${({ color }) => color || COLORS.DARK_GREY};
    }
    .icon {
      margin-right: 8px;
    }
    ${({ mobile }) => mobile && css``}
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  p {
    text-align: justify;
    font-size: 14px;
  }
`;

export const ErrorSignal = styled.div`
  padding-top: 15px;
  padding-bottom: 15px;

  .icon {
    opacity: 0.5;
    &.has-text-danger {
      opacity: 1;
    }
  }
  i.mdi.mdi-alert-octagon {
    font-size: 2.3rem;
  }
  .is-one-quarter-mobile {
    text-align: center;
  }
`;

export const Footer = styled.div`
  ${({ list }) =>
    list &&
    css`
      margin: 20px -20px;
    `}
  padding: 1rem;
  background-color: ${({ color }) => color};
  ${({ mobile }) =>
    mobile &&
    css`
      a {
        padding: 3px;
        .text {
          font-size: 12px;
        }
      }
    `}
  ${({ fullOpened, mobile }) =>
    !fullOpened &&
    !mobile &&
    css`
      box-shadow: 0px -5px 10px 1px rgba(255, 255, 255, 0.75);
    `}
  *,
  *:hover {
    color: ${({ color_text }) => color_text};
  }
  a {
    text-align: center;
  }
  .column {
    justify-content: center;
  }
`;

export const BottomLine = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  position: relative;
  .category {
    font-weight: bold;
  }
  .more_info {
    font-weight: bold;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    ${({ fullOpened }) =>
      fullOpened &&
      css`
        position: absolute;
        right: 15px;
        bottom: -26px;
        color: ${({ color_text }) => color_text};
        background-color: ${({ color }) => color};
      `}
  }
`;

export const Information = styled.div`
  ${({ list }) =>
    list &&
    css`
      margin: -20px;
    `}
  padding: 1rem 1rem ${({ mobile }) => (mobile ? 1 : 0)}rem 1rem;
  ${({ isMobile, isTablet }) =>
    !isMobile && !isTablet
      ? css`
          overflow: auto;
          flex: inherit;
        `
      : ""}

  ${({ mobile, list }) =>
    mobile &&
    !list &&
    css`
      background-color: ${COLORS.LIGHT_GREY};
    `}
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
  &::-webkit-scrollbar {
    display: none;
  }
  *:not(i) {
    color: ${COLORS.DARK_GREY};
  }
  .address-title {
    display:flex;
    justify-content: space-between;
    align-items: center;
  }

  .private-label {
    display: flex;
    align-items: center;
    span {
      margin-left: 5px;
    }
  }

  .title {
    text-transform: uppercase;
    margin-bottom: 5px;
    margin-top: 10px;
    text-align: left;
  }
  .description {
    background-color: ${COLORS.LIGHT};
    text-align: justify;
    ${({ mobile, list, color, color_text }) =>
      !mobile &&
      !list &&
      css`
        background-color: ${color};
        color: ${color_text};
        padding: 1rem;
        margin: -1rem -1rem 1.5rem -1rem;
      `}

  .address {
    color: ${COLORS.GREY};
    font-style: italic;
    font-size: 14px;
  }
  p {
    text-align: justify;
    margin-top: 9px;
  }
  img {
    ${({ list }) =>
      list
        ? css`
            max-width: 100vw;
            max-height: 400px;
          `
        : css`
            width: 100vw;
          `}
  }
`;

export const LastUpdate = styled.p`
  padding: 1rem 1rem 2rem;
  color: ${COLORS.GREY};
  text-align: center !important;
  font-size: 12px;
`;

export const Divider = styled.div`
  background-color: transparent !important;
  background-image: linear-gradient(
    to right,
    #6b7e9b 33%,
    rgba(255, 255, 255, 0) 0
  );
  background-position: bottom;
  background-size: 6px 2px;
  background-repeat: repeat-x;
  margin-top: 1rem;
  height: 1px;
  overflow: hidden;
  margin-bottom: 0.3rem;
`;

export const LoaderStyled = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 10;
  .mainLoader {
    position: fixed;
  }
  .loader-wrapper {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 30px;
  }
  .loader-svg {
    margin: auto;
  }
  .subtitle {
    text-transform: uppercase;
  }

  .sk-grid {
    width: 90px;
    height: 90px;
    margin-bottom: 15px;
  }

  @keyframes sk-grid {
    0%,
    70%,
    100% {
      transform: scale3D(1, 1, 1);
    }
    50% {
      transform: scale3D(0.1, 0.1, 1);
    }
  }
`;

export const Cube = styled.div`
  width: 20%;
  height: 20%;
  float: left;
  animation: sk-grid 1.5s infinite ease-in-out;
  animation-delay: ${({ time }) => time};
  background-image: url("/logo-192.png");
  background-repeat: no-repeat;
  background-attachment: inherit;
  background-position: ${({ position }) => position};
  background-size: 90px;
`;
