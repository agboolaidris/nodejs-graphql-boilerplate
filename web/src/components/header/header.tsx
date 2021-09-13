import React from "react";
import { CgArrowRightR as ArrowLeft } from "react-icons/cg";

import { HeaderWrap } from "./header.style";
import { Col, Row } from "../../styles/style";
import User from "./user/user";
import Notification from "./notification/notification";

interface Props {
  openSidebar: boolean;
  openSidebarFunc: any;
}

function Header({ openSidebar, openSidebarFunc }: Props) {
  return (
    <HeaderWrap>
      <Row content="btw" items="center">
        <Col>
          <ArrowLeft
            className={openSidebar ? "inactive arrow" : "arrow"}
            onClick={() => openSidebarFunc()}
          />
        </Col>
        <Col
          style={{
            display: "flex",
            justifyItems: "space-around",
            alignContent: "center",
          }}
        >
          <Notification />
          <User />
        </Col>
      </Row>
    </HeaderWrap>
  );
}

export default Header;
