import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../../styles/work.css";

const Work = ({ windowSize }) => {
  return (
    <section
      style={{
        padding: windowSize < 600 ? "50px 20px" : "150px 50px",
        // paddingBottom: "150px",
        background: "#f8f8f8",
        marginTop: "50px",
      }}
    >
      <Row>
        <Col className="work-title">
          <div className="heading">How it Works?</div>
          {/* <div className="content-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br />
          </div> */}
        </Col>
      </Row>
      <Row style={{ marginTop: "100px" }}>
        <Col md={3} className="arrDiv">
          <Card className="work-box">
            <div className="numberBtn">1</div>
            <div className="card-content">
              <span>Register as Buyer or Seller</span>
              <p>
                The first step is to get you registered as an accredited
                participant in the community.
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
              <span>List your assets for auction</span>
              <p>
                Set up an auction for your approved assets with a reserve price,
                date, and length of auction.
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
              <span>Watch our community work!</span>
              <p>
                The active participation of our community will help you achieve
                your liquidation or acquisition goals in a trusted auction
                format.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
  );
};

export default Work;
