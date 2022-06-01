import React from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { FiSearch } from "react-icons/fi";
import { BsBellFill } from "react-icons/bs";
import { AiFillMessage } from "react-icons/ai";
import "../../styles/dashboard.css";

function DashHeader({ location, windowSize }) {
  return (
    <Container
      style={{
        width: "100vw",
        padding: windowSize < 800 && "0",
        margin: windowSize < 800 && "0",
      }}
    >
      {windowSize > 768 ? (
        <Row style={{ marginBottom: "30px" }}>
          <Col>
            <div className="searchBar">
              <input type="text" placeholder="Search Here" />
              <FiSearch color="black" size={25} />
            </div>
          </Col>
          <Col>
            <div className="search">
              <Button className="bell">
                <BsBellFill color="#737b8b" size={23} />
              </Button>
              <Button className="message">
                <AiFillMessage color="#737b8b" size={23} />
              </Button>
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row style={{ marginBottom: "30px", width: "100%" }}>
            <Col>
              <div className="search" style={{ justifyContent: "center" }}>
                <Button className="bell">
                  <BsBellFill color="#737b8b" size={23} />
                </Button>
                <Button className="message">
                  <AiFillMessage color="#737b8b" size={23} />
                </Button>
              </div>
            </Col>
          </Row>
          <Row style={{ marginBottom: "30px" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <div className="searchBar">
                <input type="text" placeholder="Search Here" />
                <FiSearch color="black" size={25} />
              </div>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
}

export default DashHeader;
