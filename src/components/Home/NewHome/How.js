import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import monitor from "../../../images/monitor.png";
import checkList from "../../../images/checkList.png";
import handshake from "../../../images/handshake.png";
import ArrowRight from "../../../images/ArrowRight.png";
import "../../../styles/how.css";

function How({ windowSize }) {
  return (
    <Row style={{ padding: windowSize < 800 ? "3rem 0.6rem" : "3rem" }}>
      <Row className="px-2">
        <Col className="how-container p-5">
          <Row className="d-flex justify-content-center align-items-center">
            <Col className="d-flex justify-content-center align-items-center mt-5 p-0">
              <span className="how-title">How it works?</span>
            </Col>
          </Row>
          <Row
            className="mt-5 d-flex justify-content-between align-items-center"
            style={{ padding: windowSize > 1470 && "0 3rem" }}
          >
            <Col
              md={
                windowSize < 1450 && windowSize > 960
                  ? 6
                  : windowSize < 960
                  ? 12
                  : 3
              }
              xs={12}
              className="d-grid justify-content-center mt-2 p-0"
            >
              <div className="how-logo">
                <img src={checkList} alt="" />
              </div>
              <div className="how-texts mt-4">
                <span className="how-subtitle mt-3">
                  Register as Buyer or Seller
                </span>
                <p className="how-descript mt-3">
                  The first step is to get you registered as an accredited
                  participant in the community.
                </p>
              </div>
            </Col>

            <Col
              style={{ display: windowSize < 1450 && "none" }}
              className="rightArrow mt-2 p-0"
            >
              <img src={ArrowRight} alt="" />
            </Col>

            <Col
              md={
                windowSize < 1450 && windowSize > 960
                  ? 6
                  : windowSize < 960
                  ? 12
                  : 3
              }
              xs={12}
              className="d-grid justify-content-center mt-2 p-0"
            >
              <div className="how-logo">
                <img src={monitor} alt="" />
              </div>
              <div className="how-texts mt-4">
                <span className="how-subtitle mt-3">
                  List your assets for auction
                </span>
                <p className="how-descript mt-3">
                  Set up an auction for your approved assets with a reserve
                  price, date, and length of auction.
                </p>
              </div>
            </Col>

            <Col
              style={{ display: windowSize < 1450 && "none" }}
              className="rightArrow mt-2 p-0"
            >
              <img src={ArrowRight} alt="" />
            </Col>

            <Col
              md={
                windowSize < 1450 && windowSize > 960
                  ? 6
                  : windowSize < 960
                  ? 12
                  : 3
              }
              xs={12}
              className="d-grid justify-content-center mt-2 p-0"
            >
              <div className="how-logo">
                <img src={handshake} alt="" />
              </div>
              <div className="how-texts mt-4">
                <span className="how-subtitle mt-3">
                  Watch our community work!
                </span>
                <p className="how-descript mt-3">
                  The active participation of our community will help you
                  achieve your liquidation or acquisition goals in a trusted
                  auction format.
                </p>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default How;
