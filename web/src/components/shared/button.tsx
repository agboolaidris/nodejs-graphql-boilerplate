import React, { ReactNode } from "react";
import styled, { css } from "styled-components";
import Load from "react-loading";

interface Props {
  type?: "submit";
  style?: "primary" | "success" | "warning";
  isloading?: boolean;
  children: ReactNode;
}

const ButtonWrapper = styled.button<{
  type?: "submit";
  style?: "primary" | "success" | "warning";
}>`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #e5e5e5;
  height: 40px;
  border: none;
  outline: none;
  border-radius: 5px;

  &:hover {
    opacity: 0.8;
    transform: scale(0.99);
  }
  ${({ style }) =>
    style == "primary" &&
    css`
      background: #0b3ea1;
      color: #f5f5f5;
    `}
`;

function Button(data: Props) {
  const { children, style, type, isloading } = data;
  return (
    <ButtonWrapper style={style} type={type} disabled={isloading}>
      {isloading ? <Load type="bars" /> : <span>{children}</span>}
    </ButtonWrapper>
  );
}

export default Button;
