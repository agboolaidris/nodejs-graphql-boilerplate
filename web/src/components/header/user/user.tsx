import Link from "next/link";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { Dropdown, Tittle, UserWrap } from "./user.style";

function User() {
  const [drop, setdrop] = useState(false);
  const handleDrop = () => {
    if (drop) {
      setdrop(false);
    } else {
      setdrop(true);
    }
  };
  return (
    <UserWrap>
      <Tittle onClick={handleDrop}>Idris</Tittle>
      <Dropdown active={drop}>
        <Link href="">
          <a onClick={() => setdrop(false)}>
            <FaHome />
            <span>View Profile</span>
          </a>
        </Link>
        <Link href="">
          <a onClick={() => setdrop(false)}>
            <FaHome />
            <span>Home</span>
          </a>
        </Link>{" "}
        <Link href="">
          <a onClick={() => setdrop(false)}>
            <FaHome />
            <span>Home</span>
          </a>
        </Link>{" "}
        <Link href="">
          <a onClick={() => setdrop(false)}>
            <FaHome />
            <span>Home</span>
          </a>
        </Link>
      </Dropdown>
    </UserWrap>
  );
}

export default User;
