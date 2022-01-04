import React from "react";
import { Row, Col } from "react-bootstrap";
import { CardComp } from "./Card";
import { useSelector } from "react-redux";
import authService from "../services/authServices";

const Featured = (props) => {
  const property = useSelector((state) => state.property);
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
          {property.slice(0, 2).map((item) => (
            <Col key={item._id} md={6}>
              <CardComp
                url={item.images[0].url}
                data={item.details}
                id={item._id}
                auctionStartDate = {item.auctionDetails.auctionStartDate}
                auctionEndDate = {item.auctionDetails.auctionEndDate}
                startingBid = {item.auctionDetails.startingBid}
                auctionId = {item.auctionDetails._id}
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
