import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompanyHeader from "./CompanyHeader";
import { useLocation } from "react-router-dom";
import contact from "../../../src/contactImg.png";

function PartnerWithUs() {
  const location = useLocation();
  return (
    <>
      <CompanyHeader location={location.pathname.split("/")[1]} />
      <Container style={{ margin: "0", padding: "0" }} fluid>
        <Row>
          <Col
            md={4}
            style={{
              backgroundColor: "#282828",
              backgroundImage: `url(${contact})`,
              objectFit: "cover",
              height: "70vh",
              backgroundRepeat: "no-repeat",
              display: "grid",
              alignContent: "center",
              color: "white",
              paddingLeft: "5vw",
            }}
          >
            <Row>
              <Col style={{ margin: "20px 0" }}>
                <h1 style={{ fontSize: "30px" }}>Contact Us</h1>
                <p>+1-234-567-8910</p>
                <p>+1-854-967-2310</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <h1 style={{ fontSize: "30px" }}>Email</h1>
                <p>info@auction3x.com</p>
                <p>support@auction3x.com</p>
              </Col>
            </Row>
          </Col>
          <Col
            style={{
              display: "grid",
              justifyContent: "center",
              padding: "50px 20px",
            }}
          >
            <h1 className="formTitle">Partner With Us</h1>
            <Row>
              <Col>
                <span>First Name</span>
                <input
                  placeholder="Enter First Name"
                  type="text"
                  className="form-control"
                />
              </Col>
              <Col>
                <span>Last Name</span>
                <input
                  placeholder="Enter Last Name"
                  type="text"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <span>Email</span>
                <input
                  placeholder="Enter Email"
                  type="text"
                  className="form-control"
                />
              </Col>
              <Col>
                <span>Phone</span>
                <input
                  placeholder="Enter Phone Number"
                  type="text"
                  className="form-control"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <span>Message</span>
                <textarea
                  placeholder="Enter Message"
                  className="form-control"
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PartnerWithUs;
