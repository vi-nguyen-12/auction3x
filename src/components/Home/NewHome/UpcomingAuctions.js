import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import NewCards from "../../Cards/NewCards";
import "../../../styles/feature.css";

function UpcomingAuctions({
  toggleSignIn,
  upcomingAuctions,
  windowSize,
  loader,
}) {
  return (
    <Row
      id="feature"
      style={{ padding: windowSize < 800 ? "3rem 0.6rem" : "3rem" }}
    >
      <Row>
        <Col>
          <h1 className="section-title">Upcoming Auctions</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button className="view-btn">View All</Button>
          <BsArrowRight size={28} color="#4F4F59" />
        </Col>
      </Row>
      <Row className="mt-5">
        {upcomingAuctions.length > 0 ? (
          upcomingAuctions.slice(0, 3).map((item, index) => (
            <Col
              key={index}
              md={windowSize > 1400 ? 4 : 6}
              className="py-2 d-flex justify-content-center"
            >
              {/* <NewCards
              toggleSignIn={toggleSignIn}
              windowSize={windowSize}
              data={item}
              type={item.property.type}
            /> */}
              <NewCards
                toggleSignIn={toggleSignIn}
                windowSize={windowSize}
                data={item}
                type={item.property.type}
              />
            </Col>
          ))
        ) : !loader ? (
          <Col>
            <div className="no-feature-container">
              <span className="no-feature-text">
                No upcoming auctions available at the moment.
              </span>
            </div>
          </Col>
        ) : (
          <Row style={{ height: "100vh" }}></Row>
        )}
      </Row>
    </Row>
  );
}

export default UpcomingAuctions;
