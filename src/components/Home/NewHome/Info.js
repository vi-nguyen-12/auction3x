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
        "Buyers can rest assured that the purchase process will be smooth and timely. Avoid the back and forth of never-ending negotiations with our fixed closing auction date and published reserve price. All properties are sold as-is and will be supported through closing by us and our team of partners.",
      buttonText: "Start Now",
    },
    {
      logo: brokers,
      title: "Brokers",
      description:
        "Auction3 is a great partner to brokers and we are happy to work with you whether you are representing a buyer or seller. We always value the local insight and expertise provided by seasoned brokers.",
      buttonText: "Earn Now",
    },
    {
      logo: sellers,
      title: "sellers",
      description:
        "Sellers on Auction3 enjoy the benefits of a reduced timeline with the peace of mind that they will sell their assets on a set date and price floor.  We will support our sellers by bringing the market to them and our superior service extends throughout the closing process in coordination with our outstanding partners.",
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
                    <div className="info-texts mt-4">
                      <span className="info-subtitle mt-3">{item.title}</span>
                      <div style={{ height: "230px" }}>
                        <p className="info-descript mt-3 mb-0">{item.description}</p>
                      </div>
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
