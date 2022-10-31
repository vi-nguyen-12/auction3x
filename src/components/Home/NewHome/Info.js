import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import brokers from "../../../images/brokers.png";
import investor from "../../../images/investor.png";
import sellers from "../../../images/sellers.png";
import { BsArrowRight } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../../styles/info.css";

function Info({ windowSize, toggleSignIn }) {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const handleOnClick = (item) => () => {
    if (item.buttonText === "Sell Now") {
      if (!user._id) {
        return toggleSignIn();
      } else {
        history.push("/multiSellForm");
      }
    } else if (item.buttonText === "Start Now") {
      history.push("/Auctions");
    }
  };

  const info = [
    {
      logo: investor,
      title: "Buyers",
      description:
        "AUCTION3 positioned itself as the leading marketplace for professional real estate investors to auction platform for buying and selling their properties. It brings an opportunity for an investor to execute the transaction with greater eciency and higher prots.",
      buttonText: "Start Now",
    },
    {
      logo: brokers,
      title: "Brokers",
      description:
        "AUCTION3 positioned itself as the leading marketplace for professional real estate investors to auction platform for buying and selling their properties. It brings an opportunity for an investor to execute the transaction with greater eciency and higher prots.",
      buttonText: "Earn Now",
    },
    {
      logo: sellers,
      title: "sellers",
      description:
        "AUCTION3 positioned itself as the leading marketplace for professional real estate investors to auction platform for buying and selling their properties. It brings an opportunity for an investor to execute the transaction with greater eciency and higher prots.",
      buttonText: "Sell Now",
    },
  ];
  return (
    <Row
      style={{
        padding: windowSize < 800 ? "3rem 0.6rem" : "3rem",
        marginTop: windowSize < 800 && "5rem",
      }}
    >
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
                md={windowSize < 1285 ? 12 : 4}
                xs={12}
                className="d-grid justify-content-center align-items-center mt-2"
                style={{ padding: windowSize < 800 && "0" }}
              >
                <div className="info-card-container">
                  <div className="info-card">
                    <div className="info-logo">
                      <img src={item.logo} alt="" loading="lazy" />
                    </div>
                    <div className="info-texts mt-5">
                      <span className="info-subtitle mt-3">{item.title}</span>
                      <p className="info-descript mt-3">{item.description}</p>
                      <Button
                        onClick={handleOnClick(item)}
                        className="info-button mt-3"
                      >
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
