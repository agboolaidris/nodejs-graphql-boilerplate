import styled, { css } from "styled-components";

interface WrapProps {
  height?: string;
}
export const Wrapper = styled.div<WrapProps>`
  width: 100%;
  height: ${({ height }) => (height ? height : "max-content")};
`;

interface RowProp {
  width?: string;
  content?: "end" | "center" | "btw" | "around" | "evenly";
  items?: "end" | "center";
}
export const Row = styled.div<RowProp>`
  display: flex;
  height: 100%;
  ${({ content }) =>
    content == "center" &&
    css`
      justify-content: center;
    `};

  ${({ content }) =>
    content == "end" &&
    css`
      justify-content: flex-end;
    `};
  ${({ content }) =>
    content == "btw" &&
    css`
      justify-content: space-between;
    `};
  ${({ content }) =>
    content == "around" &&
    css`
      justify-content: space-around;
    `};

  ${({ content }) =>
    content == "evenly" &&
    css`
      justify-content: space-evenly;
    `};
  ${({ items }) =>
    items == "end" &&
    css`
      align-items: flex-end;
    `};
  ${({ items }) =>
    items == "center" &&
    css`
      align-items: center;
    `};
`;

interface ColProp {
  width?: string;
}

export const Col = styled.div<ColProp>`
  width: ${({ width }) => (width ? width : "max-content")};
  ${({ width }) =>
    width === "full" &&
    css`
      width: 100%;
    `}
`;
export const Container = styled.div`
  width: 100%;
  max-width: 1400px;
`;
