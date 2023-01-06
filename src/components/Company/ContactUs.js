import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
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
  }, [setMessage]);

  const onSubmit = async (data) => {
    if (data.email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      const datas = {
        type: "from_user",
        name: data.name,
        email: data.email,
        phone: phone,
        title: data.who,
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
          setTimeout(() => {
            window.location.reload();
          }, 200);
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
                <Col className="mb-2" md={12}>
                  <span>Name</span>
                  <input
                    placeholder="Enter Name"
                    type="text"
                    className="form-control custom-input"
                    name="firstName"
                    {...register("name", { required: true })}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-2" md={12}>
                  <span>Email</span>
                  <input
                    placeholder="Enter Email"
                    type="email"
                    className="form-control custom-input"
                    name="email"
                    {...register("email", { required: true })}
                    required
                  />
                </Col>
                <Col className="my-2" md={12}>
                  <span>Phone</span>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au", "in"]}
                    disableDropdown={false}
                    country={"us"}
                    value={phone ? phone : null}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    inputStyle={{
                      width: "100%",
                      border: "0",
                      borderBottom: "1px solid #ececec",
                      borderRadius: "0",
                    }}
                    buttonStyle={{
                      border: "none",
                      borderRadius: "0",
                    }}
                    onChange={setPhone}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-2" md={12}>
                  <span>Which Best Describes You?</span>
                  <Form.Select
                    name="subject"
                    {...register("who")}
                    className="form-control custom-input"
                  >
                    <option value="buyer">Buyer</option>
                    <option value="seller">Seller</option>
                    <option value="broker">Broker/Agent</option>
                    <option value="intermediary">
                      Intermediary(Other, Etc)
                    </option>
                    <option value="other">Other</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row>
                <Col className="mb-2">
                  <span>Subject</span>
                  <input
                    placeholder="Subject"
                    type="text"
                    className="form-control custom-input"
                    name="subject"
                    {...register("subject", { required: true })}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <span>Message</span>
                  <textarea
                    placeholder="Enter Message"
                    className="form-control custom-input"
                    name="message"
                    {...register("message", { required: true })}
                    required
                  />
                </Col>
              </Row>
              <Row style={{ marginTop: "50px" }}>
                <Col className="d-flex justify-content-end">
                  <button type="submit" className="general_btn px-3 py-2">
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
