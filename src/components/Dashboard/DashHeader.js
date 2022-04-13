import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import "../../styles/dashBoardStyle.css";

function DashHeader({ location }) {
  return (
    <Container>
      <Row>
        <Col>
          <h2>{location}</h2>
        </Col>
        <Col>
          <div className="search">
            <div className="searchBar">
              <input type="text" placeholder="Search Here" />
              <FiSearch color="black" size={25} />
            </div>
            <Button className="bell">
              <BsBellFill color="#737b8b" size={23} />
            </Button>
            <Button className="message">
              <AiFillMessage color="#737b8b" size={23} />
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default DashHeader;
