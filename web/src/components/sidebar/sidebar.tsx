import React, { useState } from "react";
import { CgArrowLeftR as ArrowLeft } from "react-icons/cg";

import { SidebarWrap, TopSection } from "./sidebar.style";
import { Menuwrap } from "./menu/menu.style";

import Submenu from "./menu/menu";
import Search from "./search/search";
import Footer from "./footer/footer";

import fixture from "./fixture";

interface Props {
  openSidebar: boolean;
  open: any;
  close: any;
}

function Sidebar({ openSidebar, open, close }: Props) {
  return (
    <SidebarWrap active={openSidebar}>
      <TopSection>
        <span className="logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfSSHTUipLZyChUXfOq6mkoKYvT0h3Ms8krw&usqp=CAU"
            alt=""
          />
        </span>
        <ArrowLeft className="inactive" onClick={() => close()} />
      </TopSection>
      <Search onFocus={() => open()} />
      <span className="divider"></span>
      <Menuwrap>
        {fixture.map((menu, index) => (
          <Submenu
            key={index}
            name={menu.name}
            Icon={menu.Icon}
            path={menu.path}
            submenu={menu.submenu && menu.submenu}
            onClick={() => open()}
            sidebarActive={openSidebar}
          />
        ))}
      </Menuwrap>
      <Footer />
    </SidebarWrap>
  );
}

export default Sidebar;
