import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import contact from "../../../src/images/contactImg.png";
import CompanyHeader from "./CompanyHeader";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import PhoneInput from "react-phone-input-2";
import styled from "styled-components";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import parse from "html-react-parser";

const Content = styled.div`
  * {
    margin: 0;
  }
`;

function ContactUs({ windowSize, setMessage }) {
  const location = useLocation();
  const { register, handleSubmit } = useForm();
  const [phone, setPhone] = useState();
  const [text, setText] = useState("");

  useEffect(() => {
    authService.getPageContent("contact_us").then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setText(res.data[0]?.htmlText || "");
      }
    });
  }, []);

  const onSubmit = async (data) => {
    const datas = {
      type: "from_user",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      phone: phone,
      subject: data.subject,
      content: data.message,
      autoReply: "contact_us_reply",
    };
    await authService.sendEmails(datas).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setMessage("");
        setMessage(res.data.message);
        window.location.reload();
      }
    });
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
                <Content>{parse(text)}</Content>
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
                    value={phone ? phone : null}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    inputStyle={{ width: "100%" }}
                    buttonStyle={{
                      borderRight: "none",
                    }}
                    onChange={setPhone}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-2">
                  <span>Subject</span>
                  <input
                    placeholder="Subject"
                    type="text"
                    className="form-control"
                    name="subject"
                    {...register("subject", { required: true })}
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
