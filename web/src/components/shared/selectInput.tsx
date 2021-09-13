import React, { useState } from "react";
import styled, { css } from "styled-components";
import { RiArrowDropDownLine } from "react-icons/ri";

interface Props {
  placeHolder: string;
  error?: string;
  onSelect: (e: string) => void;
  items: { name: string; value: string }[];
  label?: string;
}

const Wrapper = styled.div<{ open: Boolean; error?: Boolean }>`
  position: relative;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 19px;
  color: #000000;
  label {
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    line-height: 26px;
  }

  span {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    width: 100%;
    padding: 5px;
    cursor: pointer;
    opacity: 0.7;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    transition: all 0.3 ease-out;
    &:focus,
    &:hover {
      border: 2px solid #0b3ea1;
      border-radius: 5px;
    }

    ${({ error }) =>
      error &&
      css`
        border: 2px solid #ed680d;
      `}
  }
  ul {
    position: absolute;
    list-style: none;
    width: 100%;
    background-color: #e5e5e5;
    margin-top: 3px;
    border-radius: 5px;
    overflow: hidden;
    z-index: 10;
    height: 0;
    ${({ open }) =>
      open &&
      css`
        height: max-content;
      `}
    li {
      padding: 10px 20px 10px 5px;
      cursor: pointer;
      transition: all 0.3s ease-out;
      &:hover {
        background: #0b3ea1;
        color: #e5e5e5;
      }
    }
  }

  p {
    font-size: 10px;
    color: #ed680d;
  }
`;

function SelectInput(data: Props) {
  const { placeHolder, error, onSelect, items, label } = data;
  const [open, setopen] = useState(false);
  const [value, setvalue] = useState("");
  const handleChange = (value: string, name: string) => {
    setopen(!open);
    onSelect(value);
    setvalue(name);
  };

  return (
    <Wrapper
      open={open}
      tabIndex={1}
      onBlur={() => setopen(false)}
      error={!!error}
    >
      <label>{label}</label>
      <span onClick={() => setopen(!open)}>
        {value ? value : placeHolder} <RiArrowDropDownLine size="20" />
      </span>
      <ul>
        {items.map((item) => (
          <li
            onClick={() => handleChange(item.value, item.name)}
            key={item.value}
          >
            {item.name}
          </li>
        ))}
      </ul>
      <p>{error && error}</p>
    </Wrapper>
  );
}

export default SelectInput;
