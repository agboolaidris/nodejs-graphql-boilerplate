import styled from "styled-components";

export const FooterWrap = styled.div`
  margin: 15px 0 0;
  padding-bottom: 30px;

  & > div {
    display: flex;
    .imgBox {
      width: 40px;
      height: 40px;
      img {
        max-height: 100%;
        max-width: 100%;
        border-radius: 50%;
        border: 2px solid ${({ theme }) => theme.color.secondary["900"]};
      }
    }
    .userInfo {
      margin-left: 1em;
      color: ${({ theme }) => theme.color.neutral["100"]};
      h5 {
        font-size: 15px;
      }
      span {
        font-size: 10px;
      }
    }
  }
`;
