import styled, { css } from "styled-components";

interface AProps {
  active?: boolean;
}
export const A = styled.a<AProps>`
  display: flex;
  align-items: center;
  margin-top: 10px;
  text-decoration: none;
  padding: 5px 0;
  cursor: pointer;
  color: ${({ theme }) => theme.color.neutral["100"]};
  transition: all 0.5s ease-in-out;

  & > div {
    width: 100%;
    display: flex;
    align-items: center;

    span {
      margin-left: 20px;
    }
    svg {
      font-size: 25px;
    }
  }
  &:hover {
    background-color: ${({ theme }) => theme.color.secondary["900"]};
    border-radius: 4px;
  }

  ${({ active }) =>
    active &&
    css`
      border-radius: 4px;
      background-color: ${({ theme }) => theme.color.secondary["900"]};
    `}
`;

export const Menuwrap = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
`;

export const SubMenu = styled.div`
  margin-left: 10%;
  width: 90%;
  & > a {
    display: flex;
    align-items: center;
    margin-top: 10px;
    text-decoration: none;
    opacity: 1;
    transition: all 0.5s ease-in;

    & > div {
      width: 100%;
      display: flex;
      align-items: center;

      span {
        margin-left: 20px;
      }
      svg {
        font-size: 25px;
      }
    }
  }
`;

interface MenuProps {
  active: boolean;
}

export const MenuLinkWrap = styled.div<MenuProps>`
  ${SubMenu} {
    max-height: 400px;
    overflow: hidden;
    transition: max-height 2s ease-out;
  }

  ${({ active }) =>
    !active &&
    css`
      ${SubMenu} {
        max-height: 0;
        transition: max-height 0.7s ease-out;
        overflow: hidden;
      }
    `}
`;
