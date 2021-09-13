import styled, { css } from "styled-components";

export const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 30px 0;
  .logo {
    display: block;
    width: 40px;
    height: 40px;
    overflow: hidden;
    img {
      max-width: 100%;
      max-height: 100%;
      border-radius: 50%;
    }
  }
  svg {
    font-size: 25px;
    cursor: pointer;
    color: ${({ theme }) => theme.color.neutral["400"]};
  }
`;

interface Props {
  active: boolean;
}

export const SidebarWrap = styled.div<Props>`
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.color.primary["900"]};
  padding: 0 20px;
  transition: width 0.5s ease-in;

  .inactive {
    transition: opacity 0.5s ease-out;
    opacity: 1;
    position: relative;
  }

  .divider {
    display: block;
    width: 100%;
    height: 1px;
    margin: 15px 0;
    background-color: ${({ theme }) => theme.color.secondary["900"]};
    border-radius: 1px;
  }
  ${({ active }) =>
    !active &&
    css`
      width: 80px;
      overflow-x: hidden;
      .inactive {
        position: absolute;
        transition: opacity 0.5s ease-out;
        opacity: 0;
        width: 0;
        height: 0;
        overflow: hidden;
      }
    `}
`;
