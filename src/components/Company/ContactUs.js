import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import contact from "../../../src/images/contactImg.png";
import CompanyHeader from "./CompanyHeader";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

function ContactUs({ windowSize }) {
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
      window.location.reload();
    }
  };

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
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <h1 className="formTitle">Get In Touch</h1>
              </Col>
            </Row>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col className="mb-2" md={6} xs={12}>
                  <span>First Name</span>
                  <input
                    placeholder="Enter First Name"
                    type="text"
                    className="form-control"
                    name="firstName"
                    {...register("firstName", { required: true })}
                  />
                </Col>
                <Col className="mb-2" md={6} xs={12}>
                  <span>Last Name</span>
                  <input
                    placeholder="Enter Last Name"
                    type="text"
                    className="form-control"
                    name="lastName"
                    {...register("lastName", { required: true })}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-2" md={6} xs={12}>
                  <span>Email</span>
                  <input
                    placeholder="Enter Email"
                    type="email"
                    className="form-control"
                    name="email"
                    {...register("email", { required: true })}
                  />
                </Col>
                <Col className="mb-2" md={6} xs={12}>
                  <span>Phone</span>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au"]}
                    disableDropdown={false}
                    country={"us"}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    inputStyle={{ width: "100%" }}
                    buttonStyle={{
                      borderRight: "none",
                    }}
                    {...register("phone", { required: true })}
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
                    {...register("message", { required: true })}
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "50px" }}>
                <Col>
                  <button type="submit" className="loginBtn">
                    Send
                  </button>
                </Col>
              </Row>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactUs;
