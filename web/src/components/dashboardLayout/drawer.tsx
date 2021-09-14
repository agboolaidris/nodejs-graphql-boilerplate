import React, { ReactNode, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled, { css } from "styled-components";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { CgChevronDoubleRight } from "react-icons/cg";
import drawer from "../../fixtures/drawer";

const DropdownStyle = styled.li<{ open: Boolean }>`
  & > span {
    display: block;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    transition: all 0.3s ease-in-out;
    color: #ffffff;
    span {
      display: flex;
      align-items: center;
      svg {
        margin-right: 15px;
      }
    }
    & :hover {
      background: #073797;
    }
  }

  ul {
    padding-left: 20px;
    height: 0;
    height: 0;
    overflow: hidden;
    ${({ open }) =>
      open &&
      css`
        height: max-content;
      `}
    li {
      display: flex;
      align-items: center;
      padding: 20px;
      transition: all 0.3s ease-in-out;
      & :hover {
        background: #073797;
      }
    }
  }
`;

const Dropdown = ({
  name,
  icon,
  children,
}: {
  name: String;
  icon: ReactNode;
  children: any;
}) => {
  const route = useRouter();
  const [isOpen, setisOpen] = useState(false);
  return (
    <DropdownStyle open={isOpen}>
      <span onClick={() => setisOpen(!isOpen)}>
        <span>
          {icon} {name}
        </span>
        {isOpen ? (
          <RiArrowDropUpLine size="25" />
        ) : (
          <RiArrowDropDownLine size="25" />
        )}
      </span>
      <ul>
        {children.map((child, index) => {
          return (
            <Link href={child.path} key={index}>
              <a>
                <li
                  className={
                    child.path == route.pathname
                      ? "no-dropdown active"
                      : "no-dropdown"
                  }
                >
                  <CgChevronDoubleRight size="25" />
                  {child.name}
                </li>
              </a>
            </Link>
          );
        })}
      </ul>
    </DropdownStyle>
  );
};

const Wrapper = styled.div<{ open: Boolean }>`
  width: 270px;
  height: 100%;
  background: #0b3ea1;
  transition: all 0.3s ease-out;
  ${({ open }) =>
    open &&
    css`
      width: 0;
      overflow: hidden;
    `}
  a {
    text-decoration: none;
    color: #ffffff;
  }

  .active {
    background: #ed680d;
    transition: all 0.3s ease-out;
  }
  ul {
    list-style: none;

    .no-dropdown {
      display: flex;
      align-items: center;
      padding: 20px;
      svg {
        margin-right: 15px;
      }
      transition: all 0.3s ease-in-out;
      & :hover {
        background: #073797;
      }
    }
  }

  @media only screen and (max-width: 700px) {
    position: absolute;
    top: 0;
    transform: translateX(-1000%);
    transition: all 0.3s ease-out;
    ${({ open }) =>
      open &&
      css`
        transform: translateX(0);
        width: 270px;
      `}
  }
`;

function Drawer({ open }: { open: Boolean }) {
  const route = useRouter();
  return (
    <Wrapper open={open}>
      <ul>
        {drawer.map((item, index) => {
          if (item.children) {
            return (
              <Dropdown
                name={item.name}
                icon={item.icon}
                children={item.children}
                key={index}
              />
            );
          } else {
            return (
              <Link href={item.path} key={index}>
                <a>
                  <li
                    className={
                      item.path == route.pathname
                        ? "no-dropdown active"
                        : "no-dropdown"
                    }
                  >
                    {item.icon} {item.name}
                  </li>
                </a>
              </Link>
            );
          }
        })}
      </ul>
    </Wrapper>
  );
}

export default Drawer;
