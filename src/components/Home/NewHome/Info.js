import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import brokers from "../../../images/brokers.png";
import investor from "../../../images/investor.png";
import sellers from "../../../images/sellers.png";
import { BsArrowRight } from "react-icons/bs";
import "../../../styles/info.css";

function Info() {
  const info = [
    {
      logo: investor,
      title: "Investors / Buyers",
      description:
        "AUCTION3 positioned itself as the leading marketplace for professional real estate investors to auction platform for buying and selling their properties. It brings an opportunity for an investor to execute the transaction with greater eciency and higher prots.",
      buttonText: "Start Now",
    },
    {
      logo: brokers,
      title: "Brokers",
      description:
        "AUCTION3 positioned itself as the leading marketplace for professional real estate investors to auction platform for buying and selling their properties. It brings an opportunity for an investor to execute the transaction with greater eciency and higher prots",
      buttonText: "Earn Now",
    },
    {
      logo: sellers,
      title: "sellers",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      buttonText: "Sell Now",
    },
  ];
  return (
    <Row className="p-5">
      <Row>
        <Col className="info-container mb-5">
          <Row className="d-flex justify-content-center align-items-center">
            <Col className="d-flex justify-content-start align-items-center p-0 mt-5">
              <span className="info-title">Who we work with!</span>
            </Col>
          </Row>
          <Row className="mt-5 d-flex justify-content-center align-items-center">
            {info.map((item, index) => (
              <Col
                key={index}
                className="d-grid justify-content-center align-items-center mt-2 p-0"
              >
                <div className="info-card-container">
                  <div className="info-card">
                    <div className="info-logo">
                      <img src={item.logo} alt="" />
                    </div>
                    <div className="info-texts mt-5">
                      <span className="info-subtitle mt-3">{item.title}</span>
                      <p className="info-descript mt-3">{item.description}</p>
                      <Button className="info-button mt-3">
                        {item.buttonText}
                        <BsArrowRight className="mx-2" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Row>
  );
}

export default Info;
