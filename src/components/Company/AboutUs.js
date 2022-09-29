import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompanyHeader from "./CompanyHeader";
import { useLocation } from "react-router-dom";
import Info from "../Home/NewHome/Info";
import How from "../Home/NewHome/How";
import "../../styles/aboutUs.css";

function AboutUs({ toggleSignIn, windowSize, setMessage }) {
  const location = useLocation();
  return (
    <>
      <CompanyHeader location={location.pathname.split("/")[1]} />
      <Row style={{ padding: windowSize < 800 ? "2rem 1rem" : "3rem" }}>
        <Col md={12}>
          <h1 className="section-title m-0">Who are we?</h1>
        </Col>
        <Col md={12} className="px-4">
          <p className="p-0 m-0 aboutus-p">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum
            dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
            ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
            officia deserunt mollit anim id est laborum.
          </p>
        </Col>
      </Row>
      <Row style={{ padding: windowSize < 800 ? "2rem 1rem" : "3rem" }}>
        <Col>
          <Row className="aboutus-our-section">
            <Col md={6} xs={12} className="my-5">
              <span>Our Mission</span>
              <p className="p-0 m-0 aboutus-p-our">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Col>
            <Col md={6} xs={12} className="my-5">
              <span>Our Vision</span>
              <p className="p-0 m-0 aboutus-p-our">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
      <Info toggleSignIn={toggleSignIn} windowSize={windowSize} />
      <How windowSize={windowSize} />
    </>
  );
}

export default AboutUs;
