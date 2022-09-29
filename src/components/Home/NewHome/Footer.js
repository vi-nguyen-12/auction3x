import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import authService from "../../../services/authServices";
import "../../../styles/newFooter.css";

function Footer({ windowSize, setMessage }) {
  const [email, setEmail] = React.useState();

  const subscribe = async () => {
    if (email?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      await authService.subscribe(email).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setMessage("");
          setMessage(
            "Thank you for subscribing, we will be sending you the best deals!"
          );
        }
      });
    } else {
      setMessage("");
      setTimeout(() => {
        setMessage("Please enter a valid email address");
      }, 100);
    }
  };

  return (
    <Row>
      <Col className="footer-container p-0">
        <Row className="d-flex justify-content-center align-items-center top-row">
          <Col
            className="d-flex align-items-center"
            style={{ padding: windowSize < 800 ? "3rem 0.6rem" : "3rem" }}
          >
            <Row className="subscript-container py-5 px-4">
              <Col
                md={6}
                xs={12}
                className="d-grid justify-content-center align-items-center"
              >
                <span className="subscript-title">
                  Stay updated with Auction3
                </span>
                <p className="subscript-descript mt-3">
                  Receive the beautifully curated selection of what's trending
                  in luxury with inside stories and tips from our experts.
                </p>
                <p className="small-box"></p>
              </Col>
              <Col md={6} xs={12} className="subscript-box">
                <input
                  className="subscript-input"
                  type="email"
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email Address"
                />
                <Button
                  className="subscript-btn mt-2"
                  onClick={(e) => subscribe(e.target.value)}
                >
                  Subscribe
                </Button>
                <label className="mt-1 subscript-text">
                  BY SHARING YOUR EMAIL, YOU AGREE TO OUR{" "}
                  <a
                    href="/TermsOfUse"
                    style={{ cursor: "pointer" }}
                    className="px-1"
                  >
                    {" "}
                    TERMS OF USE
                  </a>{" "}
                  AND{" "}
                  <a
                    href="/PrivacyPolicy"
                    style={{ cursor: "pointer", paddingLeft: "0.25rem" }}
                  >
                    PRIVACY POLICY
                  </a>
                  .
                </label>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-between align-items-start bottom-row px-5"
          style={{ paddingBottom: windowSize < 800 && "4rem" }}
        >
          <Col md={6} className="mt-2 p-0 footer-icon-box">
            <img
              src="/images/newName.png"
              alt=""
              width={windowSize < 768 ? "250px" : "300px"}
              height="auto"
            />
            <p className="footer-texts mt-3 px-4">
              AUCTION3 is an innovative online bidding platform that specialized
              in the expediting sale of real estate through auction and brings
              the exciting real estate opportunities to both buyers and sellers
              with true value for money.
            </p>
          </Col>
          <Col
            md={6}
            className="d-flex justify-content-end align-items-center mt-2 p-0"
          >
            <Row>
              <Col>
                <ul className="footer-list mt-4">
                  <li className="footer-list-item-title">Quick Links</li>
                  <li href="/AboutUs" className="footer-list-item mt-5">
                    <a className="footer-list-item" href="/AboutUs">
                      About Us
                    </a>
                    {/* About Us */}
                  </li>
                  <li className="footer-list-item mt-3">
                    <a className="footer-list-item" href="/Team">
                      Team
                    </a>
                  </li>
                  <li className="footer-list-item mt-3">
                    <a className="footer-list-item" href="/FAQ">
                      FAQ
                    </a>
                  </li>
                  <li className="footer-list-item mt-3">
                    <a className="footer-list-item" href="/contact">
                      Contact Us
                    </a>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul className="footer-list mt-4">
                  <li className="footer-list-item-title">Categories</li>
                  <li className="footer-list-item mt-5">
                    <a className="footer-list-item" href="/realEstates">
                      Real Estate
                    </a>
                  </li>
                  <li className="footer-list-item mt-3">
                    <a className="footer-list-item" href="/cars">
                      Cars
                    </a>
                  </li>
                  <li className="footer-list-item mt-3">
                    <a className="footer-list-item" href="/jets">
                      Jets
                    </a>
                  </li>
                  <li className="footer-list-item mt-3">
                    <a className="footer-list-item" href="/yachts">
                      Yachts
                    </a>
                  </li>
                </ul>
              </Col>
              <Col>
                <ul className="footer-list mt-4">
                  <li className="footer-list-item-title">Others</li>
                  <li className="footer-list-item mt-5">
                    <a className="footer-list-item" href="/Partner">
                      Partner
                    </a>
                  </li>
                  <li className="footer-list-item mt-3">
                    <a className="footer-list-item" href="/PrivacyPolicy">
                      Privacy Policy
                    </a>
                  </li>
                  <li className="footer-list-item mt-3">
                    <a className="footer-list-item" href="/TermsOfUse">
                      Terms &amp; Conditions
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center align-items-center footer-copyRight-container">
          <Col className="d-grid justify-content-center mt-2 p-0 footer-copyRight">
            © 2022 AUCTION3. All Rights Reserved
          </Col>
        </Row>
      </Col>
    </Row>
  );
}

export default Footer;
