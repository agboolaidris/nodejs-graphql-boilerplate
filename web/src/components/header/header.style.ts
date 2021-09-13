import styled from "styled-components";

export const HeaderWrap = styled.nav`
  width: 100%;
  height: 70px;
  background-color: ${({ theme }) => theme.color.neutral["100"]};
  padding: 30px 20px;

  .arrow {
    font-size: 25px;
    cursor: pointer;
    color: ${({ theme }) => theme.color.primary["900"]};
  }
  .inactive {
    display: none;
  }
`;
