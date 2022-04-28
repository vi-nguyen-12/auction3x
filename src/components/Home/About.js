import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/About.css";

const About = () => {
  return (
    // <div className="banner-section">
    <>
      <Row className="banner-container">
        <Col
          xs={12}
          md={6}
          style={{ padding: "0", margin: "0" }}
          className="banner-top-left"
        >
          {/* <div className="content-top-left"> */}
          <img src="./images/investors.PNG" style={{ width: "100%" }} alt="" />
          {/* </div> */}
        </Col>
        <Col xs={12} md={6} className="banner-top-right">
          <h2>INVESTORS / BUYERS</h2>
          <p>
            AUCTION 3 positioned itself as the leading marketplace for
            professional real estate investors to auction platform for buying
            and selling their properties. It brings an opportunity for an
            investor to execute the transaction with greater eciency and higher
            prots.
          </p>

          <div className="button-container">
            <button>BUY</button>
            <div className="side-button">
              <button>SELL</button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="banner-container">
        <Col xs={12} md={6} className="banner-top-left-2">
          {/* <div className="content-left"> */}
          <h2>BROKER</h2>

          <p>
            AUCTION 3 positioned itself as the leading marketplace for
            professional real estate investors to auction platform for buying
            and selling their properties. It brings an opportunity for an
            investor to execute the transaction with greater eciency and higher
            prots
          </p>
          <div className="button-container">
            <button>Partner with us</button>
          </div>
          {/* </div> */}
        </Col>
        <Col
          xs={12}
          md={6}
          style={{ padding: "0", margin: "0" }}
          className="banner-top-left"
        >
          <img src="./images/broker.PNG" style={{ width: "100%" }} alt="" />
          {/* <img src="./images/broker.PNG" className="investor" alt="" /> */}
        </Col>
      </Row>
      <Row className="bottom-container" style={{ padding: "50px" }}>
        <Col className="banner-left">
          {/* <div className="content-left"> */}
          <h2>Stay updated with Auction 3</h2>
          <p>
            Receive the beautifully curated selection of what's trending in
            luxury with inside stories and tips from our experts.
          </p>
          {/* </div> */}
        </Col>
        <Col className="banner-right">
          <div className="content-right">
            <input type="text" placeholder="Enter your email address" />
            <div style={{ display: "block", paddingTop: "20px" }}>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </Col>
      </Row>
    </>
    // </div>
  );
};

export default About;
