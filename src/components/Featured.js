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
        <Col md={10} className="m-auto">
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
          {property.slice(0,2).map((item) => (
            <Col key={item._id} md={6}>
              <CardComp url={item.images[0].url} data={item.details} id = {item._id} />
            </Col>
          ))}
        </Row>
      </Col>
    </div>
  );
};

export { Featured };
