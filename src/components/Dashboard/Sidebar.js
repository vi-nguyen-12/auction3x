import React from "react";
import "../../styles/sidebar.css";
import SidebarMenu from "../Dashboard/SidebarMenu";
import SubMenu from "./SubMenu";

const Sidebar = ({ path, setLocation, windowSize }) => {
  return (
    <div className={windowSize < 1630 ? "sideBar small" : "sideBar"}>
      <ul className="sideBarList">
        {SidebarMenu.map((item, index) => {
          return (
            <SubMenu
              key={index}
              item={item}
              path={path}
              setLocation={setLocation}
              windowSize={windowSize}
            />
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
