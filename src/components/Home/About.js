import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import authService from "../../services/authServices";
import "../../styles/about.css";

const About = ({ toggleSignIn, windowSize }) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();

  const [email, setEmail] = useState();

  const subscribe = async () => {
    await authService.subscribe(email).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(
          "Thank you for subscribing, we will be sending you the best deals!"
        );
      }
    });
  };

  return (
    <section className="about-wrap">
      <Row className="banner-container">
        <Col md={4} className="banner-top-left">
          <img src="./images/investors.PNG" height={450} alt="" />
        </Col>
        <Col className="banner-top-right">
          <h2>INVESTORS / BUYERS</h2>
          <p>
            AUCTION 3X positioned itself as the leading marketplace for
            professional real estate investors to auction platform for buying
            and selling their properties. It brings an opportunity for an
            investor to execute the transaction with greater eciency and higher
            prots.
          </p>

          <div className="button-container">
            <button
              onClick={() => {
                history.push("/Auctions");
              }}
            >
              BUY
            </button>
            <button
              onClick={() => {
                user._id ? history.push("/multiSellForm") : toggleSignIn();
              }}
            >
              SELL
            </button>
          </div>
        </Col>
      </Row>
      <Row className="banner-container">
        <Col className="banner-top-left-2">
          <h2>BROKER</h2>
          <p>
            AUCTION 3X positioned itself as the leading marketplace for
            professional real estate investors to auction platform for buying
            and selling their properties. It brings an opportunity for an
            investor to execute the transaction with greater eciency and higher
            prots
          </p>
          <div className="button-container">
            <button
              onClick={() => {
                history.push("/Partner");
              }}
              style={{ width: "200px" }}
            >
              Partner with us
            </button>
          </div>
        </Col>
        <Col className="banner-top-left">
          <img src="./images/broker.PNG" height={450} alt="" />
        </Col>
      </Row>
      <Row className="banner-container-1">
        <Col className="banner-left">
          <h2
            style={{
              fontSize: "45px",
              fontWeight: "600",
              fontFamily: "Josefin Slab",
              fontStyle: "normal",
            }}
          >
            Stay updated with Auction 3X
          </h2>
          <p style={{ padding: windowSize < 600 && "0" }}>
            Receive the beautifully curated selection of what's trending in
            luxury with inside stories and tips from our experts.
          </p>
        </Col>
        <Col className="banner-right">
          <div
            className="content-right"
            style={{ padding: windowSize < 600 && "0" }}
          >
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Enter your email address"
            />
            <div style={{ display: "block", paddingTop: "20px" }}>
              <button onClick={() => subscribe()}>SUBSCRIBE</button>
            </div>
          </div>
        </Col>
      </Row>
    </section>
  );
};

export default About;
