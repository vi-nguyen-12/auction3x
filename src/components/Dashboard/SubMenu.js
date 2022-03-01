import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarLink = styled(Link)`
  display: flex;
  color: #96a0af;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 18px;
  &:hover {
    background: white;
    border-left: 4px solid #b77b50;
    cursor: pointer;
  }
  &:focus {
    background: white;
    border-left: 4px solid #b77b50;
    cursor: pointer;
  }
`;

const SidebarLabel = styled.span`
  margin-left: 16px;
  color: #96a0af;
  &:hover {
    color: #b77b50;
    cursor: pointer;
    }
`;

const DropdownLink = styled(Link)`
  background: white;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: #96a0af;
  font-size: 18px;
  &:hover {
    background: white;
    border-left: 4px solid #b77b50;
    cursor: pointer;
  }
  &:focus {
    background: white;
    border-left: 4px solid #b77b50;
    cursor: pointer;
    }

`;

const SubMenu = ({ item }) => {
    const [color, setColor] = useState('#96a0af');
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    const toogleColor = () => setColor(color === '#96a0af' ? '#b77b50' : '#96a0af');

    return (
        <>
            <SidebarLink to={item.path} onClick={item.subNav && showSubnav}>
                <div>
                    {item.icon}
                    <SidebarLabel onClick={toogleColor}>{item.name}</SidebarLabel>
                </div>
                <div>
                    {item.subNav && subnav
                        ? item.iconOpened
                        : item.subNav
                            ? item.iconClosed
                            : null}
                </div>
            </SidebarLink>
            {subnav &&
                item.subNav.map((item, index) => {
                    return (
                        <DropdownLink to={item.path} key={index}>
                            {item.icon}
                            <SidebarLabel>{item.name}</SidebarLabel>
                        </DropdownLink>
                    );
                })}
        </>
    )
}

export default SubMenu;