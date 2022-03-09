import React from "react";
import "../../styles/sideBarStyle.css";
import { useSelector } from "react-redux";
import SidebarMenu from "../Dashboard/SidebarMenu";
import SubMenu from "./SubMenu";

const Sidebar = ({ path }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="sideBar">
      {/* <h1>
                Hello, {user.firstName} {" "} {user.lastName}
            </h1> */}
      <ul className="sideBarList">
        {SidebarMenu.map((item, index) => {
          return <SubMenu className="row" id={window.location.pathname == item.path ? "active" : ""} key={index} item={item} path={path} />;
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
