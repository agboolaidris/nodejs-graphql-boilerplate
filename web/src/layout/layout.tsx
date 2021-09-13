import React, { useState, ReactNode } from "react";
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
import { Col, Row, Wrapper } from "../styles/style";

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const [openSidebar, setopenSidebar] = useState(true);

  const handleOpenSidebar = () => {
    setopenSidebar(true);
  };
  const handleCloseSidebar = () => {
    setopenSidebar(false);
  };
  return (
    <Wrapper height="100vh">
      <Header openSidebar={openSidebar} openSidebarFunc={handleOpenSidebar} />
      <Row>
        <Col>
          <Sidebar
            openSidebar={openSidebar}
            open={handleOpenSidebar}
            close={handleCloseSidebar}
          />
        </Col>
        <Col width="full">{children}</Col>
      </Row>
    </Wrapper>
  );
}

export default Layout;
