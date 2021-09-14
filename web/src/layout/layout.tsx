import React, { useState, ReactNode } from "react";
import styled from "styled-components";
import Drawer from "../components/dashboardLayout/drawer";
import Toolbar from "../components/dashboardLayout/toolbar";

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  .row {
    display: flex;
    height: calc(100vh - 70px);
    overflow: hidden;
    position: relative;
    .main {
      padding: 15px;
      max-width: 100%;
      overflow-y: auto;
    }
  }
`;

interface Props {
  children: ReactNode;
}

function Layout({ children }: Props) {
  const [open, setopen] = useState(false);

  return (
    <Wrapper>
      <Toolbar handleClick={() => setopen(!open)} />
      <div className="row">
        <div>
          <Drawer open={open} />
        </div>
        <div className="main">{children}</div>
      </div>
    </Wrapper>
  );
}

export default Layout;
