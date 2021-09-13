import React from "react";
import styled, { css } from "styled-components";

interface Props {
  name: string;
  placeHolder?: string;
  error?: string;
  onChange: (e: any) => void;
  value: string;
  type?: string;
  label?: string;
}

const Wrapper = styled.div<{ error?: Boolean }>`
  width: 100%;
  label {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 26px;
  }
  & > div {
    display: flex;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 5px;
    transition: all 0.3s ease-out;
    ${({ error }) =>
      error &&
      css`
        border: 2px solid #ed680d;
      `}
    &:focus-within,
    &:hover {
      border: 2px solid #0b3ea1;
    }
    input {
      width: 100%;
      border: none;
      outline: none;
      height: 35px;
      &::placeholder {
        opacity: 0.9;
      }
    }
  }
  span {
    font-size: 10px;
    color: #ed680d;
  }
`;

function InputText(data: Props) {
  const { name, label, placeHolder, error, onChange, value, type } = data;
  return (
    <Wrapper error={!!error}>
      <label>{label}</label>
      <div>
        <input
          type={type ? type : "text"}
          name={name}
          placeholder={placeHolder && placeHolder}
          onChange={onChange}
          value={value}
        />
      </div>

      <span>{error && error}</span>
    </Wrapper>
  );
}

export default InputText;
