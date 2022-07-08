import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import CompanyHeader from "./CompanyHeader";
import { useLocation } from "react-router-dom";
import contact from "../../../src/images/contactImg.png";
import { useForm } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import authService from "../../services/authServices";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

function PartnerWithUs({ windowSize }) {
  const location = useLocation();
  const [phone, setPhone] = useState();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    const datas = {
      type: "from_user",
      firstName: data.firstName,
      lastName: data.lastName,
      company: data.company,
      email: data.email,
      phone: phone,
      subject: data.subject,
      content: data.message,
    };
    await authService.sendEmails(datas).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(res.data.message);
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
            <Row className="mb-4">
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <h1
                  style={{ fontSize: windowSize < 600 && "2rem" }}
                  className="formTitle"
                >
                  Partner With Us
                </h1>
              </Col>
            </Row>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col className="mb-2" md={4} xs={12}>
                  <span>First Name</span>
                  <input
                    placeholder="Enter First Name"
                    type="text"
                    className="form-control"
                    {...register("firstName", { required: true })}
                  />
                </Col>
                <Col className="mb-2" md={4} xs={12}>
                  <span>Last Name</span>
                  <input
                    placeholder="Enter Last Name"
                    type="text"
                    className="form-control"
                    {...register("lastName", { required: true })}
                  />
                </Col>
                <Col className="mb-2" md={4} xs={12}>
                  <span>Company Name</span>
                  <input
                    placeholder="Enter Company Name"
                    type="text"
                    className="form-control"
                    {...register("company", { required: true })}
                  />
                </Col>
              </Row>
              <Row>
                <Col className="mb-2" md={6} xs={12}>
                  <span>Email</span>
                  <input
                    placeholder="Enter Email"
                    type="text"
                    className="form-control"
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
                    value={phone ? phone : null}
                    inputStyle={{ width: "100%" }}
                    buttonStyle={{
                      borderRight: "none",
                    }}
                    onChange={setPhone}
                  />
                </Col>
              </Row>{" "}
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

export default PartnerWithUs;
