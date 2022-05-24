import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import contact from "../../../src/contactImg.png";
import CompanyHeader from "./CompanyHeader";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import authService from "../../services/authServices";

function ContactUs() {
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const submitContact = await authService.submitContact(data);
    if (submitContact.data.error) {
      alert(submitContact.data.error);
    } else {
      alert(
        "Your message has been sent successfully. We will get back to you soon."
      );
    }
  };

  return (
    <>
      <CompanyHeader location={location.pathname.split("/")[1]} />
      <Container fluid>
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
          <Col md={8} style={{ padding: "150px 100px" }}>
            <Row>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <h1 className="formTitle">Get In Touch</h1>
              </Col>
            </Row>
            <Row>
              <Col>
                <span>First Name</span>
                <input
                  placeholder="Enter First Name"
                  type="text"
                  className="form-control"
                  name="firstName"
                />
              </Col>
              <Col>
                <span>Last Name</span>
                <input
                  placeholder="Enter Last Name"
                  type="text"
                  className="form-control"
                  name="lastName"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <span>Email</span>
                <input
                  placeholder="Enter Email"
                  type="email"
                  className="form-control"
                  name="email"
                />
              </Col>
              <Col>
                <span>Phone</span>
                <input
                  placeholder="Enter Phone Number"
                  type="text"
                  className="form-control"
                  name="phone"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <span>Message</span>
                <textarea
                  placeholder="Enter Message"
                  className="form-control"
                  name="message"
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

export default ContactUs;
