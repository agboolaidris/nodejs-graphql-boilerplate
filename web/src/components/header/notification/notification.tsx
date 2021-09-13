import Link from "next/link";
import React, { useState } from "react";
import { FaHome } from "react-icons/fa";
import { DropBody, Dropdown, Tittle, UserWrap } from "./notification.style";

function Notification() {
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
      <Tittle onClick={handleDrop}>
        <span>30</span>
        Notification
      </Tittle>
      <Dropdown active={drop}>
        <div className="header">
          <span className="notif">Notification</span>
          <span className="mark">Mark all as read</span>
        </div>

        <DropBody>
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
          </Link>
          <Link href="">
            <a onClick={() => setdrop(false)}>
              <FaHome />
              <span>Home</span>
            </a>
          </Link>
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
          </Link>
          <Link href="">
            <a onClick={() => setdrop(false)}>
              <FaHome />
              <span>Home</span>
            </a>
          </Link>
        </DropBody>
        <div className="footer">Hello</div>
      </Dropdown>
    </UserWrap>
  );
}

export default Notification;
