import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/sell-register.css";

function SellHeader({ step }) {
  return (
    <Row className="sell-top">
      <Col xs={1} className="sell-top-col">
        <div className={step >= 1 ? "circle-active" : "circle"}>01</div>
        <div className="step-title">Ownership</div>
      </Col>
      <Col xs={1} className="sell-top-col-line">
        <div className={step >= 2 ? "line-1" : "line"}></div>
      </Col>
      <Col xs={1} className="sell-top-col">
        {" "}
        <div className={step >= 2 ? "circle-active" : "circle"}>02</div>
        <div className="step-title">Details</div>
      </Col>
      <Col xs={1} className="sell-top-col-line">
        <div className={step >= 3 ? "line-1" : "line"}></div>
      </Col>
      <Col xs={1} className="sell-top-col">
        {" "}
        <div className={step >= 3 ? "circle-active" : "circle"}>03</div>
        <div className="step-title">Multimedia</div>
      </Col>
      <Col xs={1} className="sell-top-col-line">
        <div className={step >= 4 ? "line-1" : "line"}></div>
      </Col>
      <Col xs={1} className="sell-top-col">
        {" "}
        <div className={step >= 4 ? "circle-active" : "circle"}>04</div>
        <div className="step-title">Documents</div>
      </Col>
      <Col xs={1} className="sell-top-col-line">
        <div className={step >= 5 ? "line-1" : "line"}></div>
      </Col>
      <Col xs={1} className="sell-top-col">
        {" "}
        <div className={step >= 5 ? "circle-active" : "circle"}>05</div>
        <div className="step-title">Agreement</div>
      </Col>
    </Row>
  );
}
export default SellHeader;
