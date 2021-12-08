import React from "react";
import { Row, Col } from "react-bootstrap";
import { CardComp } from "./Card";

const Featured = (props) => {
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
      <Col md={10} className="m-auto pt-2">
        <Row>
          {[1, 2].map((card) => (
            <Col key={card} md={6}>
              <CardComp />
            </Col>
          ))}
        </Row>
      </Col>
    </div>
  );
};

export { Featured };
