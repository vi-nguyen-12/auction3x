import React, { useState, useEffect } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/footer.css";

const Footer = ({ toggleSignIn, windowSize }) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  return (
    <footer>
      <div className="footer-wrap">
        <Card className="card-footer">
          <Row
            className="row-1"
            style={{ padding: windowSize < 600 && "4rem 1rem" }}
          >
            <Col
              style={{
                display: "grid",
                justifyContent: "center",
                // padding: "0 50px",
              }}
            >
              <div className="img-flex">
                {/* <img src="/Vector.png" alt="" /> */}
                <img
                  src="/images/newName.png"
                  style={{ height: windowSize < 800 && "4rem" }}
                  className="auction-img"
                  alt=""
                />
              </div>
              <p
                style={{
                  display: "grid",
                  justifyContent: "center",
                  padding: windowSize > 500 ? "0 50px" : "0 3px",
                  marginTop: "1rem",
                }}
                className="auction-content"
              >
                AUCTION 3 is an innovative online bidding platform that
                specialized in the expediting sale of real estate through
                auction and brings the exciting real estate opportunities to
                both buyers and sellers with true value for money.
              </p>
            </Col>
            <Col>
              <h5
                style={{
                  paddingLeft: windowSize < 800 && "1.3rem",
                  fontSize: windowSize < 800 && "1.4rem",
                }}
                className="footer-title"
              >
                Quick Links
              </h5>
              <ul style={{ paddingLeft: windowSize < 800 && "1.4rem" }}>
                <li className="list-unstyled">
                  <a href="#!">Buy</a>
                </li>
                <li className="list-unstyled">
                  <a
                    onClick={() => {
                      if (user._id) {
                        history.push("/MultiSellForm");
                        window.location.reload();
                      } else {
                        toggleSignIn();
                      }
                    }}
                  >
                    Sell
                  </a>
                </li>
                <li className="list-unstyled">
                  <a href="/AboutUs">About Us</a>
                </li>
                <li className="list-unstyled">
                  <a href="/Team">Team</a>
                </li>
                <li className="list-unstyled">
                  <a href="/FAQ">FAQ</a>
                </li>
                <li className="list-unstyled">
                  <a href="/contact">Contact Us</a>
                </li>
              </ul>
            </Col>

            <Col>
              <h5
                style={{
                  paddingLeft: windowSize < 800 && "1.3rem",
                  fontSize: windowSize < 800 && "1.4rem",
                }}
                className="footer-title"
              >
                Categories
              </h5>
              <ul style={{ paddingLeft: windowSize < 800 && "1.4rem" }}>
                <li className="list-unstyled">
                  <a href="/realEstates">Real Estate</a>
                </li>
                <li className="list-unstyled">
                  <a href="/cars">Cars</a>
                </li>
                <li className="list-unstyled">
                  <a href="/yachts">Yachts</a>
                </li>
                <li className="list-unstyled">
                  <a href="/jets">Jets</a>
                </li>
                {/* <li className="list-unstyled">
                            <a href="#!">Jewels</a>
                        </li> */}
              </ul>
            </Col>
            <Col>
              <h5
                style={{
                  paddingLeft: windowSize < 800 && "1.3rem",
                  fontSize: windowSize < 800 && "1.4rem",
                }}
                className="footer-title"
              >
                Others
              </h5>
              <ul style={{ paddingLeft: windowSize < 800 && "1.4rem" }}>
                <li className="list-unstyled">
                  {/* <a href="#!">List with us</a> */}
                </li>
                <li className="list-unstyled">
                  <a href="/Broker">Broker</a>
                </li>
                <li className="list-unstyled">
                  <a href="/Partner">Partner</a>
                </li>
                <li className="list-unstyled">
                  <a href="/PrivacyPolicy">Privacy Policy</a>
                </li>
                <li className="list-unstyled">
                  <a href="/TermsOfUse">Terms &amp; Conditions</a>
                </li>
              </ul>
            </Col>
          </Row>
          <div className="auction-reserved">
            © 2022 AUCTION3. All Rights Reserved
          </div>
        </Card>
      </div>
    </footer>
  );
};

export default Footer;
