import React, { useState, useEffect } from "react";
import authService from "../../services/authServices";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";
import "../../styles/broker.css";

function Broker({ colorChange }) {
  const { id } = useParams();
  const [broker, setBroker] = useState([]);

  useEffect(() => {
    colorChange("black");
    authService.getBrokers("?isBroker=true").then((res) => {
      if (res.data.error) {
        console.log(res.data.error);
        alert(res.data.error);
      } else {
        setBroker(res.data.filter((item) => item._id === id));
      }
    });
  }, []);

  console.log(broker);

  return (
    <>
      <Row className="broker_container">
        <Col md={8}>
          <Row className="d-flex justify-content-evenly align-items-center profile_info_container">
            <Col
              md={6}
              xs={12}
              className="m-0 p-0 d-flex justify-content-start"
            >
              <section
                className="profile_pic"
                style={{
                  background: `url(${broker[0]?.profileImage})`,
                }}
              ></section>
            </Col>
            <Col md={6} xs={12} className="m-0 p-0">
              <section className="profile_info_section">
                <div className="profile_info_top my-2 pb-3">
                  <span className="stars">
                    {" "}
                    * * * * *
                    <span className="star_count"> 4.5 • 1662 Reviews </span>
                  </span>
                  <h1 className="profile_name">
                    {" "}
                    {broker[0]?.firstName[0].toUpperCase() +
                      broker[0]?.firstName.slice(1)}{" "}
                    {broker[0]?.lastName[0].toUpperCase() +
                      broker[0]?.lastName.slice(1)}{" "}
                  </h1>
                </div>
                <div className="profile_info_mid my-3 pb-3">
                  <span className="profile_info_mid_item">
                    <p>
                      Broker License:{" "}
                      <span className="profile_info_mid_item_value">
                        {broker[0]?.agent.licenseNumber}
                      </span>
                    </p>
                  </span>
                  <span className="profile_info_mid_item">
                    <p>
                      Other License:{" "}
                      <span className="profile_info_mid_item_value">
                        JYFU5646
                      </span>
                    </p>
                  </span>
                  <span className="profile_info_mid_item">
                    <p>
                      Member Since:{" "}
                      <span className="profile_info_mid_item_value">
                        12/23/2012
                      </span>
                    </p>
                  </span>
                </div>
                <div className="profile_info_bottom my-2">
                  <div className="profile_info_bottom_item">
                    <button className="general_btn p-2 px-3">Send Email</button>
                    <button className="general_btn p-2 px-3 ms-2">
                      Website
                    </button>
                  </div>
                  <span className="mt-2">199 sales in the last 12 months</span>
                </div>
              </section>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col md={12} className="p-0">
              <section className="profile_about">
                <div className="profile_about_header">
                  <button className="general_btn py-3 px-3">About Me</button>
                </div>
                <div className="profile_about_section mt-3">
                  {/* {parse(broker[0]?.description)} */}
                </div>
              </section>
            </Col>
          </Row>
        </Col>
        <Col md={4}>
          <form className="form_container">
            <div className="form_header">
              <span>Enquire Now</span>
            </div>
            <div className="form_body">
              <Row>
                <Col md={6}>
                  <span>First Name</span>
                  <input type="text" name="firstName" id="firstName" />
                </Col>
                <Col md={6}>
                  <span>Last Name</span>
                  <input type="text" name="lastName" id="lastName" />
                </Col>
              </Row>
              <Row>
                <Col md={6}>
                  <span>Email</span>
                  <input type="email" name="email" id="email" />
                </Col>
                <Col md={6}>
                  <span>Phone</span>
                  <input type="text" name="phone" id="phone" />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <span>Message</span>
                  <textarea
                    name="message"
                    id="message"
                    cols="30"
                    rows="10"
                  ></textarea>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <button className="btn btn-primary">Submit</button>
                </Col>
              </Row>
            </div>
          </form>
        </Col>
      </Row>
      {/* <div className="first_row_container">
        <div className="grid_item_1">
          <section
            className="profile_pic"
            style={{
              background: `url(${broker[0]?.profileImage})`,
            }}
          ></section>
          <section className="profile_info_container">
            <div className="profile_info_top">
              <span className="stars"> * * * * * </span>
              <h1 className="profile_name"> {broker[0]?.name} </h1>
            </div>
            <div className="profile_info_mid">
              <span>Agent License: {broker[0]?.agentLicense}</span>
              <span>Other License: {broker[0]?.otherLicense}</span>
              <span>Member Since: {broker[0]?.memberSince}</span>
            </div>
            <div className="profile_info_bottom">
              <button className="btn btn-primary">Send Email</button>
              <button className="btn btn-primary">Website</button>
            </div>
          </section>
        </div>
        <div className="grid_item_2">
          <form className="form_container">
            <div className="form_header">
              <head>Enquire Now</head>
            </div>
            <div className="form_body">
              <div className="form_group">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" />
              </div>
              <div className="form_group">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" />
              </div>
              <div className="form_group">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" />
              </div>
              <div className="form_group">
                <label htmlFor="phone">Phone</label>
                <input type="text" name="phone" id="phone" />
              </div>
              <div className="form_group">
                <label htmlFor="message">Message</label>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="10"
                ></textarea>
              </div>
              <div className="form_group">
                <button className="btn btn-primary">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <div className="grid_item_3">
          <section className="button_section">
            <button className="btn btn-primary">About Me</button>
          </section>
          <section className="info_section">
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              tincidunt, nisl eget aliquam tincidunt, nisl eros aliquam nisl,
              nec aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              aliquam tincidunt, nisl eros aliquam nisl, nec aliquam nisl nisl
              sit amet nisl. Sed tincidunt, nisl eget aliquam tincidunt, nisl
              eros aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed
              tincidunt, nisl eget aliquam tincidunt, nisl eros aliquam nisl,
              nec aliquam nisl nisl sit amet nisl. Sed tincidunt, nisl eget
              aliquam tincidunt, nisl eros aliquam nisl, nec aliquam nisl nisl
              sit amet nisl.
            </p>
          </section>
        </div>
      </div>
      <div className="second_row_container"></div> */}
    </>
  );
}

export default Broker;
