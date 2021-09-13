import React, { ReactNode } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { MenuLinkWrap, SubMenu, A } from "./menu.style";
import { useState } from "react";

interface Props {
  name: String;
  Icon: ReactNode;
  path: string;
  submenu?: any;
  onClick: () => void;
  sidebarActive: any;
}

function Submenu({ name, Icon, path, submenu, onClick, sidebarActive }: Props) {
  const [active, setactive] = useState(false);
  const route = useRouter();
  const pathname = route.pathname;
  const parentActive = submenu
    ? submenu.find(({ path }) => path === pathname)
    : false;

  const handleActive = () => {
    onClick();
    if (!sidebarActive) return;
    if (active) {
      setactive(false);
    } else {
      setactive(true);
    }
  };
  return (
    <>
      {submenu && submenu.length > 0 ? (
        <MenuLinkWrap active={active}>
          <A onClick={handleActive} active={active ? false : parentActive}>
            <div>
              {Icon}
              <span className="inactive"> {name}</span>
            </div>
            {active ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
          </A>

          <SubMenu className="inactive">
            {submenu.map(({ name, Icon, path }: Props, index) => (
              <Link href={path}>
                <A key={index} active={pathname === path}>
                  <div>
                    {Icon}
                    <span>{name}</span>
                  </div>
                </A>
              </Link>
            ))}
          </SubMenu>
        </MenuLinkWrap>
      ) : (
        <MenuLinkWrap active={active}>
          <Link href={path}>
            <A onClick={onClick} active={pathname === path}>
              <div>
                <AiOutlineDashboard />
                <span className="inactive"> Dashboard</span>
              </div>
            </A>
          </Link>
        </MenuLinkWrap>
      )}
    </>
  );
}

export default Submenu;
