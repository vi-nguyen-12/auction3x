import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import '../../styles/sideBarStyle.css';

const SidebarLink = styled(Link)`
  display: flex;
  color: #96a0af;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 70px;
  text-decoration: none;
  font-size: 18px;
`;

const SidebarLabel = styled.button`
  padding: 10px;
  padding-left: 15%;
  width: -webkit-fill-available;
  display: flex;
  background: none;
  border: none;
  color: #96a0af;
  font-weight: bold;
  font-size: 16px;
  &:hover {
    border-left: 4px solid #b77b50;
    color: #b77b50;
    cursor: pointer;
    }
  &:focus {
      border-left: 4px solid #b77b50;
      color: #b77b50;
      cursor: pointer;
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
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #96a0af;
  font-size: 18px;
`;

const SubMenu = ({ item, path }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);
  console.log(path);
  console.log(item.path);
  return (
    <>
      <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
        {/* {path === '/Dashboard' && item.path === ("Dashboard") ? (
          <FirstLabel> {item.icon} <span style={{ padding: "15px" }} /> {item.name}</FirstLabel>
        ) : (
          null
        )} */}
        < SidebarLabel className='firstLabel' id={window.location.pathname == path ? "active" : ""} > {item.icon} < span style={{ padding: "15px" }} /> {item.name}</SidebarLabel>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
              ? item.iconClosed
              : null}
        </div>
      </SidebarLink>
      {
        subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              <SidebarLabel style={{ fontWeight: "400", border: "none", fontSize: "16px" }}>{item.name}</SidebarLabel>
            </DropdownLink>
          );
        })
      }
    </>
  )
}

export default SubMenu;