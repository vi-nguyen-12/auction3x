import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/sell-register.css";

function SellHeader({ step }) {
  return (
    <Row className="sell-top">
      <Col className="sell-top-col">
        <div className="circle-1">01</div>
        <span className="spnn">Select Category</span>
      </Col>
      <Col className="sell-top-col-line">
        <div className={step >= 2 ? "line-1" : "line"}></div>
      </Col>
      <Col className="sell-top-col">
        {" "}
        <div className={step >= 2 ? "circle-1" : "circle"}>02</div>
        <span className="spnn">Listing Details</span>
      </Col>
      <Col className="sell-top-col-line">
        <div className={step >= 3 ? "line-1" : "line"}></div>
      </Col>
      <Col className="sell-top-col">
        {" "}
        <div className={step >= 3 ? "circle-1" : "circle"}>03</div>
        <span className="spnn">Property Details</span>
      </Col>
      <Col className="sell-top-col-line">
        <div className={step >= 4 ? "line-1" : "line"}></div>
      </Col>
      <Col className="sell-top-col">
        {" "}
        <div className={step >= 4 ? "circle-1" : "circle"}>04</div>
        <span className="spnn">Upload Documents</span>
      </Col>
      <Col className="sell-top-col-line">
        <div className={step >= 6 ? "line-1" : "line"}></div>
      </Col>
      <Col className="sell-top-col">
        {" "}
        <div className={step >= 6 ? "circle-1" : "circle"}>05</div>
        <span className="spnn">Agreement</span>
      </Col>
    </Row>
  );
}
export default SellHeader;
