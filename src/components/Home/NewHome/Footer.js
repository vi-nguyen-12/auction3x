import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import "../../../styles/newFooter.css";

function Footer({ windowSize }) {
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
                  placeholder="Email Address"
                />
                <Button className="subscript-btn mt-2">Subscribe</Button>
                <span className="mt-1 subscript-text">
                  BY SHARING YOUR EMAIL, YOU AGREE TO OUR TERMS OF USE AND
                  PRIVACY.
                </span>
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
                  <li className="footer-list-item mt-5">About Us</li>
                  <li className="footer-list-item mt-3">Team</li>
                  <li className="footer-list-item mt-3">FAQ</li>
                  <li className="footer-list-item mt-3">Contact Us</li>
                </ul>
              </Col>
              <Col>
                <ul className="footer-list mt-4">
                  <li className="footer-list-item-title">Categories</li>
                  <li className="footer-list-item mt-5">Real Estate</li>
                  <li className="footer-list-item mt-3">Cars</li>
                  <li className="footer-list-item mt-3">Jets</li>
                  <li className="footer-list-item mt-3">Yachts</li>
                </ul>
              </Col>
              <Col>
                <ul className="footer-list mt-4">
                  <li className="footer-list-item-title">Others</li>
                  <li className="footer-list-item mt-5">Partner</li>
                  <li className="footer-list-item mt-3">Privacy Policy</li>
                  <li className="footer-list-item mt-3">Terms & Conditions</li>
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
