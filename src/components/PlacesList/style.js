import styled from "styled-components";
import { COLORS, ICONS } from "/src/settings/theme";
import { FONTS } from "../../settings/theme";

export const ListWrapper = styled.div`
  position: absolute;
  top: ${({ isMobile }) => (isMobile ? 0 : "52px")};
  bottom: 0;
  left: ${({ open, isMobile }) => (!open || isMobile ? 0 : "350px")};
  right: 0;
  background: ${COLORS.LIGHT_GREY};
  padding-top: 30px;
  padding-bottom: 70px;
  overflow-x: hidden;
  overflow-y: auto;
  h4 {
    text-align: center;
  }
  .box {
    margin-bottom: 0px;
    border-bottom: 1px solid ${COLORS.LIGHT_GREY};
    transition: all 300ms ease-in-out;
    * {
      transition: all 300ms ease-in-out;
    }
    a {
      display: flex;
      align-items: center;
      color: inherit;
      &::hover,
      &::visited {
        color: inherit;
      }
      .information {
        width: 100%;
        .name {
          font-family: ${FONTS.TITLES};
          font-weight: bold;
          color: ${COLORS.DARK_GREY};
          font-size: 14px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          & > span {
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
        }
        .category {
          font-weight: bold;
          color: ${COLORS.DARK_GREY};
          font-size: 12px;
          display: flex;
          align-items: center;
        }
        .address {
          color: ${COLORS.GREY};
          font-style: italic;
          font-size: 14px;
          font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", "Roboto",
            "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
            "Helvetica Neue", "Helvetica", "Arial", sans-serif;
        }
      }
      .description {
        margin-top: 7px;
        margin-bottom: 7px;
        font-size: 12px;
        text-align: justify;
      }
      .icon {
        margin-right: 8px;
      }
    }
  }
  .box:not(.active) {
    border-radius: 0px;
    .description {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
  .box.active {
    margin-top: 8px;
    margin-bottom: 8px;
  }
`;
