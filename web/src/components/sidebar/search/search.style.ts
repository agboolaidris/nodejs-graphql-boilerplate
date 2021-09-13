import styled from "styled-components";

export const SearchWrap = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.color.neutral["100"]};
  margin: 15px 0 0;
  border-radius: 5px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.5s ease-out;

  &:focus-within {
    border: 2px solid ${({ theme }) => theme.color.secondary["900"]};
  }
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    background-color: transparent;
    padding: 5px;
  }
  & > svg {
    display: block;
    margin: 0 0.2em;
    font-size: 20px;
  }
`;
