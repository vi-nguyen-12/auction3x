import React from "react";
import "../../styles/sideBarStyle.css";
import { useSelector } from "react-redux";
import SidebarMenu from "../Dashboard/SidebarMenu";
import SubMenu from "./SubMenu";

const Sidebar = () => {
  const user = useSelector((state) => state.user);
  return (
    <div className="sideBar">
      {/* <h1>
                Hello, {user.firstName} {" "} {user.lastName}
            </h1> */}
      <ul className="sideBarList">
        {SidebarMenu.map((item, index) => {
          return <SubMenu key={index} item={item} />;
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
