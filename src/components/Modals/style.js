import styled from "styled-components";
import { COLORS } from "/src/settings/theme";
import { animated } from "react-spring";
import { FONTS } from "../../settings/theme";

export const ModalHeader = styled.header`
  border-radius: 0px;
  p {
    color: ${COLORS.LIGHT};
  }
  background-color: ${COLORS.MAIN};
  button::after,
  button::before {
    background-color: ${COLORS.LIGHT};
  }
  button {
    position: absolute;
  }
  .modal-card-title {
    text-transform: uppercase;
    font-family: ${FONTS.TITLES};
  }
`;
export const ModalFooter = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .is-right {
    margin-left: auto;
  }
`;
export const ModalBody = styled(animated.div)`
  background-color: #fff;
  min-width: ${({ isMobile }) => (isMobile ? "100%" : "300px")};
  min-height: ${({ isMobile }) => (isMobile ? "100%" : "300px")};
  background: #fff;
  .modal-card-body {
    margin-bottom: 0px;
    margin-top: 0px;
  }
  ${({ isMobile }) => (isMobile ? "max-height: 100vh;" : "border-radius: 8px;")}
  .links-wrapper {
    text-align: right;
  }
  .modal-card-foot {
    padding: ${({ isMobile }) => (isMobile ? 10 : 15)}px;
  }
`;

export const ModalStyled = styled(animated.div)`
  z-index: 440;
  .modal-background {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const NewPlaceForm = styled.div`
  padding-bottom: 70px;
  .button-wrap {
    position: relative;
    input[type="file"] {
      position: absolute;
      z-index: -1;
      top: 10px;
      left: 8px;
      font-size: 17px;
      color: #b8b8b8;
    }
  }
  img {
    width: 100%;
  }
  .map-cover-wrapper {
    position: relative;
    .map-cover {
      width: 100%;
      background: rgba(255,255,255, 0.4);
      position: absolute;
      height: 300px;
      top: 0;
      z-index: 5;
    }
  }
`;

export const UpdateTime = styled.h5`
  color: ${COLORS.GREY};
  font-size: 14px;
  display: flex;
  align-items: center;
  .icon {
    margin-right: 5px;
  }
`;
export const UpdateWrapper = styled.section`
  .feature,
  .correction {
    text-indent: 5px;
    .icon {
      margin-right: 5px;
    }
  }
`;
export const HelpWrapper = styled.section`
  .title {
    display: flex;
    align-items: center;
    font-family: ${FONTS.TITLES};
    .button {
      margin-right: 15px;
    }
  }
  p {
    text-align: justify;
  }
`;
export const AboutWrapper = styled.section`
  margin-top: 0;
  .activity {
    .icon-text {
      span:not(.icon) {
        font-size: 0.9rem;
      }
      small{
        font-size: 0.9rem;
      }
    }
  }
  .media + .media {
    margin-top: 0.5rem;
    padding-top: 0.5rem;
  }
  p,
  ul {
    text-align: justify;
    color: grey;
    margin-bottom: 10px;
  }
  li {
    margin-left: 20px;
    list-style-type: disc;
  }
  .title {
    font-family: ${FONTS.TITLES};
    color: ${COLORS.MAIN};
  }
  .subtitle {
    font-family: ${FONTS.TITLES};
    color: ${COLORS.MAIN};
  }
  .column.is-full {
    text-align: justify;
  }
  .column.is-half {
    .box {
      display: flex;
      align-items: center;
      flex-direction: column;
      justify-content: space-between;
      height: 100%;
      text-align: center;
    }
  }
  .telegram {
    margin: auto;
  }
  .title.is-5.margin-top {
    margin-top: 2rem;
  }
  .myserver {
    max-width: 50%;
    margin: auto;
  }
`;

export const DeletionStepsWrapper = styled.section`
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
export const Field = styled.div`
  display: flex;
  justify-content: space-between !important;
  align-items: center;
  width: 100%;
  margin: 8px 0px;
  .name {
    width: 100%;
    font-weight: ${({ small }) => (small ? "normal" : "bold")};
  }
`;
