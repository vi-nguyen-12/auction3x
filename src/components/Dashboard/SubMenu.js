import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import "../../styles/sidebar.css";

const SidebarLink = styled(Link)`
display: flex;
color: #a5a5a5;
justify-content: space-between;
align-items: center;
padding: 20px;
list-style: none;
height: 60px;
text-decoration: none;
font-size: 18px;
font-weight: 700;
&:hover {
  background-color: rgba(241, 243, 244, 1);;
  color:  #a5a5a5;
  cursor: pointer;
}
&:focus  {
  color:#b77b50;
  border-left: 3px solid #b77b50;
  // border-radius: 5px;
  font-weight: bold;
}
}
`;

const SidebarLabel = styled.button`
  padding: 10px;
  padding-left: 10%;
  display: flex;
  background: none;
  border: none;
  color: #96a0af;
  font-weight: 500;
  font-size: 18px;
  font-family: "Interstate", sans-serif;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &:hover {
    // border-left: 3px solid #b77b50;
    // color: #b77b50;
    cursor: pointer;
  }
  &:focus {
    border-left: 4px solid #b77b50;
    // color: #b77b50;
    cursor: pointer;
    font-weight: 900;
  }
`;

// const FirstLabel = styled.button`
// padding: 10px;
// padding-left: 15%;
// width: -webkit-fill-available;
// display: flex;
// background: none;
// border: none;
// font-weight: bold;
// font-size: 16px;
// &:hover {
//   border-left: 4px solid #b77b50;
//   color: #b77b50;
//   cursor: pointer;
//   }
// &:focus {
//     border-left: 4px solid #b77b50;
//     color: #b77b50;
//     cursor: pointer;
//   }
// `;

const DropdownLink = styled(Link)`
  background: white;
  height: 60px;
  padding-left: 1rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #96a0af;
  font-size: 18px;
  font-weight: 400;
`;

const SubMenu = ({ item, path, setLocation, windowSize }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  const [color] = useState("#b77b50");
  const handleOnclick = (path) => {
    setLocation(path);
    item.subNav && showSubnav();
  };

  return (
    <>
      <SidebarLink
        to={item.path}
        href={item.path}
        onClick={() => handleOnclick(item.path)}
      >
        <div className="d-flex">
          <div>{item.icon}</div>
          {windowSize > 1630 && <div className="mx-3">{item.name}</div>}
        </div>
        {windowSize > 1630 && (
          <div>
            {item.subNav && subnav
              ? item.iconOpened
              : item.subNav
              ? item.iconClosed
              : null}
          </div>
        )}
      </SidebarLink>
      {subnav && windowSize > 1630 ? (
        item.subNav.map((item, index) => {
          return (
            <DropdownLink
              to={item.path}
              key={index}
              onClick={() => setLocation(item.path)}
            >
              <SidebarLabel
                style={{
                  border: "none",
                  fontSize: "16px",
                  color: item.path === path ? color : "",
                }}
              >
                {item.name}
              </SidebarLabel>
            </DropdownLink>
          );
        })
      ) : (
        <div className={subnav ? "subnav show shadow-lg" : "subnav shadow-lg"}>
          {subnav &&
            item.subNav &&
            item.subNav.map((item, index) => {
              return (
                <DropdownLink
                  to={item.path}
                  key={index}
                  onClick={() => {
                    setLocation(item.path);
                    setSubnav(false);
                  }}
                >
                  <SidebarLabel
                    style={{
                      border: "none",
                      fontSize: "16px",
                      color: item.path === path ? color : "",
                    }}
                  >
                    {item.name}
                  </SidebarLabel>
                </DropdownLink>
              );
            })}
        </div>
      )}
    </>
  );
};

export default SubMenu;
