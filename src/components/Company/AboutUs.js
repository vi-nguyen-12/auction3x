import React from "react";
import { Row, Col } from "react-bootstrap";
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
          <h1 className="section-title m-0">Who we are?</h1>
        </Col>
        <Col md={12} className="px-3">
          <p className="p-0 m-0 aboutus-p">
            Auction3 is the premier global exchange for luxury assets including
            real estate, yachts, airplanes, and cars. Join us in the thrill of
            the auction setting, stay for the community and the amazing
            opportunity to acquire unique, prestigious assets.
          </p>
        </Col>
      </Row>
      <Row style={{ padding: windowSize < 800 ? "2rem 1rem" : "3rem" }}>
        <Col>
          <Row
            className="aboutus-our-section"
            style={{ padding: windowSize < 800 && "1rem 2rem" }}
          >
            <Col md={6} xs={12} className="my-5">
              <span>Our Mission</span>
              <p className="p-0 m-0 aboutus-p-our">
                Auction3 unites accredited buyers and sellers to exchange truly
                prestigious assets including real estate, yachts, aircraft, and
                vehicles.
              </p>
            </Col>
            <Col md={6} xs={12} className="my-5">
              <span>Our Vision</span>
              <p className="p-0 m-0 aboutus-p-our">
                We will create a tremendous community of high-net-worth
                individuals to generate the most active marketplace for
                incredibly unique, valuable assets throughout the world.
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
