import { Button } from "react-bootstrap";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import "../../styles/DashBoardStyle.css";

function DashHeader({ location }) {
  return (
    <div className="DashHeader">
      <h2>{location}</h2>
      <div className="search">
        <div className="searchBar">
          <input type="text" placeholder="Search Here" />
          <FiSearch />
        </div>
        <Button className="bell">
          <BsBellFill color="#737b8b" size={23} />
        </Button>
        <Button className="message">
          <AiFillMessage color="#737b8b" size={23} />
        </Button>
      </div>
    </div>
  );
}

export default DashHeader;
