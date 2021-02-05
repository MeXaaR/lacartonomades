import styled from "styled-components";
import { COLORS } from "/src/settings/theme";

export const ProfileWrapper = styled.section`
  .media {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    .subtitle {
      color: ${COLORS.GREY};
    }
    figure.image {
      cursor: pointer;
    }
  }
`;
export const AvatarWrapper = styled.section`
  margin-top: 0;
  img {
    cursor: pointer;
    opacity: 0.6;
    transform: scale(0.8);
    transition: all 0.3s ease-in-out;
    &:hover {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
