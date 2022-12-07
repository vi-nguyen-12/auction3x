import React from "react";
import { Row, Col } from "react-bootstrap";
import RealEstate from "../../../images/RealEstate.png";
import Car from "../../../images/Car.png";
import Jet from "../../../images/jet.png";
import Yacht from "../../../images/yacht.png";
import { useHistory } from "react-router-dom";
import "../../../styles/primeCategory.css";

function PrimeCate({ windowSize, auctions }) {
  const history = useHistory();
  const properties = [
    {
      name: "Real Estate",
      image: RealEstate,
      path: "/realEstates",
      lists: auctions.filter(
        (auction) => auction.property.type === "real-estate"
      ).length,
    },
    {
      name: "Cars",
      image: Car,
      path: "/cars",
      lists: auctions.filter((auction) => auction.property.type === "car")
        .length,
    },
    {
      name: "Jets",
      image: Jet,
      path: "/jets",
      lists: auctions.filter((auction) => auction.property.type === "jet")
        .length,
    },
    {
      name: "Yachts",
      image: Yacht,
      path: "/yachts",
      lists: auctions.filter((auction) => auction.property.type === "yacht")
        .length,
    },
  ];

  return (
    <Row style={{ padding: windowSize < 800 ? "3rem 0.6rem" : "3rem" }}>
      <Row>
        <Col>
          <h1 className="section-title">Prime Categories</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        {properties.map((item, index) => (
          <Col
            key={index}
            md={windowSize < 1200 ? 6 : 3}
            className="m-0 py-2 d-flex justify-content-center"
          >
            <div
              className="prime-cate-card"
              onClick={() => history.push(item.path)}
            >
              <div
                className="prime-cate-card-img"
                style={{ background: `url(${item.image})` }}
              />
              <div className="prime-cate-info-container">
                <div className="prime-cate-info">
                  <span className="prime-cate-title">{item.name}</span>
                  <p className="prime-cate-subtitle m-0 p-0">
                    {item.lists} LISTINGS
                  </p>
                </div>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Row>
  );
}

export default PrimeCate;
