import React, { useState } from "react";
import styled, { css } from "styled-components";
import { RiArrowDropDownLine, RiLogoutCircleRLine } from "react-icons/ri";
import Link from "next/link";
const Wrapper = styled.div<{ open: Boolean }>`
  position: relative;
  & > span {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 13px;
    cursor: pointer;
    &:hover {
      opacity: 0.5;
    }
    .avater {
      width: 30px;
      height: 30px;
      overflow: hidden;
      background-color: #e5e5e5;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-right: 10px;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }

  .dropdown {
    position: absolute;
    right: 0;
    top: 50px;
    background: #0b3ea1;
    height: 0;
    transition: all 0.4s ease-out;
    overflow: hidden;
    width: 166px;
    box-shadow: 0px 10px 50px rgba(60, 60, 60, 0.1);
    border-radius: 10px;
    z-index: 30;

    a {
      color: #f9f9f9;
      text-decoration: none;
      display: block;
    }
    .avater {
      width: 20px;
      height: 20px;
      overflow: hidden;
      background-color: #e5e5e5;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      margin-right: 10px;
      img {
        width: 20px;
        height: 20px;
      }
    }
    li {
      padding: 20px;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: all 0.3s ease-out;

      svg {
        margin-right: 10px;
      }

      &:hover {
        background: #ed680d;
      }
    }
  }

  ${({ open }) =>
    open &&
    css`
      .dropdown {
        height: max-content;
      }
    `}
`;

function Profile() {
  const [isOpen, setisOpen] = useState(false);
  return (
    <Wrapper open={isOpen}>
      <span onClick={() => setisOpen(!isOpen)}>
        <div className="avater">
          <img src="/idris.png" />
        </div>
        Idris Agboola <RiArrowDropDownLine size="20" />
      </span>

      <div className="dropdown">
        <Link href="/###">
          <a onClick={() => setisOpen(!isOpen)}>
            <li>
              <div className="avater">
                <img src="/idris.png" />
              </div>
              My Account
            </li>
          </a>
        </Link>

        <Link href="/##">
          <a onClick={() => setisOpen(!isOpen)}>
            <li>
              <RiLogoutCircleRLine size="20" />
              Logout
            </li>
          </a>
        </Link>
      </div>
    </Wrapper>
  );
}

export default Profile;
