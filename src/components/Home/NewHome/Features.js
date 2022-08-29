import React, { useState, useEffect } from "react";
import { Row, Col, Button } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import Cards from "../../Cards/Cards";
import NewCards from "../../Cards/NewCards";
import "../../../styles/feature.css";

function Features({ toggleSignIn, featureAuctions, windowSize }) {
  return (
    <Row className="p-5">
      <Row>
        <Col>
          <h1 className="section-title">Featured Listings</h1>
        </Col>
        <Col className="d-flex justify-content-end align-items-center">
          <Button className="view-btn">View All</Button>
          <BsArrowRight size={28} color="#4F4F59" />
        </Col>
      </Row>
      <Row className="mt-5">
        {featureAuctions.length > 0 ? (
          featureAuctions.slice(0, 3).map((item, index) => (
            <Col
              key={index}
              md={4}
              className="p-0 m-0 d-flex justify-content-center"
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
        ) : (
          <Col>
            <h1>No Featured Auctions</h1>
          </Col>
        )}
      </Row>
    </Row>
  );
}

export default Features;
