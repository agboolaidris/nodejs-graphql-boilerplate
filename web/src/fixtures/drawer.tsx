import { RiDashboardLine } from "react-icons/ri";
export default [
  {
    name: "Dashboard",
    icon: <RiDashboardLine />,
    path: "/",
  },
  {
    name: "Dashboard",
    icon: <RiDashboardLine />,
    path: "/#",
  },
  {
    name: "Dashboard",
    icon: <RiDashboardLine />,
    children: [
      {
        name: "Dashboard",
        path: "/##",
      },
      {
        name: "Dashboard",
        path: "/###",
      },
    ],
  },
];
