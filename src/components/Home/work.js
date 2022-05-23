import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import "../../styles/work.css";

const Work = () => {
  return (
    <section
      style={{
        padding: "0 50px",
        background: "#f8f8f8",
        height: "759px",
        marginTop: "50px",
      }}
    >
      <Row>
        <Col className="work-title">
          <div className="heading">How it Works?</div>
          <div className="content-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "100px" }}>
        <Col md={3} className="arrDiv">
          <Card className="work-box">
            <div className="numberBtn">1</div>
            <div className="card-content">
              <span>Lorem Ipsum</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Card>
        </Col>
        <Col className="arrDivs">
          <img
            src="images/downArr.png"
            alt="arrow"
            style={{ width: "100%", height: "20px" }}
          />
        </Col>
        <Col md={3} className="arrDiv">
          <Card className="work-box">
            <div className="numberBtn">2</div>
            <div className="card-content">
              <span>Lorem Ipsum</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Card>
        </Col>
        <Col className="arrDivs">
          <img
            src="images/upArr.png"
            alt="arrow"
            style={{ width: "100%", height: "20px" }}
          />
        </Col>
        <Col md={3} className="arrDiv">
          <Card className="work-box">
            <div className="numberBtn">3</div>
            <div className="card-content">
              <span>Lorem Ipsum</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Work;
