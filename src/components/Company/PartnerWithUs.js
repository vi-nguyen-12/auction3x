import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompanyHeader from "./CompanyHeader";
import { useLocation } from "react-router-dom";
import contact from "../../../src/images/contactImg.png";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

function PartnerWithUs({ windowSize }) {
  const location = useLocation();
  const [phone, setPhone] = useState();
  const { register, handleSubmit } = useForm();
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
              backgroundSize: "cover",
              backgroundPosition: "center",
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
            md={8}
            style={{ padding: windowSize > 800 ? "150px 100px" : "30px" }}
          >
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h1 className="formTitle">Partner With Us</h1>
              </Col>
            </Row>
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
                <PhoneInput
                  disableCountryCode={false}
                  onlyCountries={["ca", "us", "gb", "au"]}
                  disableDropdown={false}
                  country={"us"}
                  dropdownStyle={{ paddingLeft: "0!important" }}
                  value={phone}
                  inputStyle={{ width: "100%" }}
                  buttonStyle={{
                    border: "2px solid #d58f5c",
                    borderRight: "none",
                  }}
                  onChange={setPhone}
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
            <Row style={{ marginTop: "50px" }}>
              <Col>
                <button className="loginBtn">Send</button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default PartnerWithUs;
