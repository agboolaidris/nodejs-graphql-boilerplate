import React from "react";
import styled from "styled-components";
import { VscThreeBars } from "react-icons/vsc";
import Profile from "./profile";

const Wrapper = styled.nav`
  width: 100%;
  height: 70px;
  background: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  .logo {
    width: 270px;
  }
  .bar {
    width: 40px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: #e5e5e5;
    }
  }
  & > div {
    display: flex;
    align-items: center;
  }

  @media only screen and (max-width: 700px) {
    .logo {
      width: max-content;
    }
  }
`;
interface Props {
  handleClick: () => void;
}

function Toolbar({ handleClick }: Props) {
  return (
    <Wrapper>
      <div>
        <div className="logo">The logo</div>
        <span className="bar" onClick={handleClick}>
          <VscThreeBars />
        </span>
      </div>
      <div>
        <Profile />
      </div>
    </Wrapper>
  );
}

export default Toolbar;
