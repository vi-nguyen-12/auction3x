import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import RealEstate from "../../../images/RealEstate.png";
import Car from "../../../images/Car.png";
import Jet from "../../../images/jet.png";
import Yacht from "../../../images/yacht.png";
import { useHistory } from "react-router-dom";
import "../../../styles/primeCategory.css";

function PrimeCate() {
  const history = useHistory();

  const properties = [
    {
      name: "Real Estate",
      image: RealEstate,
      path: "/realEstates",
    },
    {
      name: "Cars",
      image: Car,
      path: "/cars",
    },
    {
      name: "Jets",
      image: Jet,
      path: "/jets",
    },
    {
      name: "Yachts",
      image: Yacht,
      path: "/yachts",
    },
  ];

  return (
    <Row className="p-5">
      <Row>
        <Col>
          <h1 className="section-title">Prime Categories</h1>
        </Col>
      </Row>
      <Row className="mt-5">
        {properties.map((item, index) => (
          <Col
            key={index}
            md={3}
            className="p-0 m-0 d-flex justify-content-center"
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
                  <p className="prime-cate-subtitle">8,245 LISTINGS</p>
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
