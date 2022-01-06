import React from "react";
import { Row, Col } from "react-bootstrap";
import { CardComp } from "./Card";
import { useSelector } from "react-redux";
import authService from "../services/authServices";
import { useState, useEffect } from "react";
import { propertySlice } from "../slice/propertySlice";

const Featured = (props) => {
  const auction = useSelector((state) => state.auction);
  return (
        <div className="background">
          <Row>
            <Col md={12} className="m-auto">
              <img
                src="/images/f_name.png"
                alt=""
                style={{
                  marginBottom: "0px",
                  maxWidth: "250px",
                  maxHeight: "150px",
                }}
              />
            </Col>
          </Row>
          <Col md={10} className="m-auto">
            <Row>
              {auction.slice(0, 2).map((item) => (
                <Col key={item._id} md={6}>
                  <CardComp
                    url={item.property.images[0].url}
                    data={item.property.details}
                    id={item._id}
                    auctionStartDate={item.auctionStartDate}
                    auctionEndDate={item.auctionEndDate}
                    startingBid={item.startingBid}
                    auctionId={item._id}
                  />
                </Col>
              ))}
            </Row>
            {/* <Row>
                {auctions.map((item) => (
                  <Col md={6}>
                    <CardComp
                      auctionstart={item.auctionStartDate}
                      auctionEnd={item.auctionEndDate}
                      auctionRegist={item.registerStartDate}
                      auctionRegistEnd={item.registerEndDate}
                      auctionPropdata={item.property}
                      startingBid={item.startingBid}
                    />
                  </Col>
                ))}
              </Row> */}
          </Col>
        </div>
  );
};

export { Featured };
