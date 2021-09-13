import styled, { css } from "styled-components";

export const UserWrap = styled.div`
  //width: 100px;
  position: relative;
`;

export const Tittle = styled.div`
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.5s ease-out;
  cursor: pointer;
  position: relative;
  span {
    width: 26px;
    height: 26px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 10%;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 26px;
    background-color: ${({ theme }) => theme.color.secondary["900"]};
    color: ${({ theme }) => theme.color.neutral["100"]};
  }
`;

interface DropdownProps {
  active: boolean;
}
export const Dropdown = styled.div<DropdownProps>`
  position: absolute;
  right: 0;
  max-height: 0;
  margin-top: 2px;
  width: 300px;
  overflow: hidden;
  background-color: ${({ theme }) => theme.color.neutral["100"]};
  border-radius: 4px;
  transition: all 0.5s ease-in;
  ${({ active }) =>
    active &&
    css`
      max-height: 300px;
      transition: all 0.5s ease-in;
      overflow: hidden;
    `}

  .header {
    padding: 10px;
    display: flex;
    justify-content: space-between;
    .mark {
      color: ${({ theme }) => theme.color.secondary["900"]};
      font-size: 12px;
      cursor: pointer;
    }
  }
`;

export const DropBody = styled.div`
  height: 200px;
  overflow: auto;

  a {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px;
    text-decoration: none;
    color: ${({ theme }) => theme.color.primary["900"]};
    transition: all 0.5s ease-out;
    &:first-child {
      margin-top: 6px;
    }
    &:last-child {
      margin-bottom: 6px;
    }
    span {
      margin-left: 5px;
      font-weight: normal;
      font-size: 12px;
    }
    &:hover {
      background-color: ${({ theme }) => theme.color.secondary["900"]};
      color: ${({ theme }) => theme.color.neutral["100"]};
    }
  }
`;
