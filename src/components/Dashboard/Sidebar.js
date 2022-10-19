import React from "react";
import "../../styles/sidebar.css";
import SidebarMenu from "../Dashboard/SidebarMenu";
import SubMenu from "./SubMenu";

const Sidebar = ({ path, setLocation }) => {
  return (
    <div className="sideBar">
      <ul className="sideBarList">
        {SidebarMenu.map((item, index) => {
          return (
            <SubMenu
              key={index}
              item={item}
              path={path}
              setLocation={setLocation}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
