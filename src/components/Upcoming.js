import React from "react";
import { Row, Col } from "react-bootstrap";
import { UpcomingCard } from "./UpcomingCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

const Upcoming = (props) => {
  const property = useSelector((state) => state.property);
  return (
        <div className="mt-5">
          <Row>
            <Col md={10} className="m-auto pt-5">
              <img
                src="/images/Upcoming Auctions.png"
                alt=""
                style={{
                  marginBottom: "20px",
                  maxWidth: "250px",
                  maxHeight: "150px",
                }}
              />
            </Col>
          </Row>
          <Col md={12} className="m-auto pt-2">
            <Row>
              {property.map((item) => (
                <Col key={item._id} md={4} style={{ marginBottom: "30px" }}>
                  <UpcomingCard
                    url={item.property.images[0].url}
                    data={item.property.details}
                    id={item._id}
                    startRegister={item.registerStartDate}
                    endRegister={item.registerEndDate}
                    startingBid={item.startingBid}
                  />
                </Col>
              ))}
            </Row>
          </Col>
        </div>
  );
};

export { Upcoming };
