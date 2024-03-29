import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { IoSend } from "react-icons/io5";
import { AiFillPlusCircle, AiFillSetting } from "react-icons/ai";

function Messaging() {
  return (
    <Container className="chatContainer">
      <Row className="top-chat">
        <Col sm={8} style={{ color: "black" }}>
          <span style={{ fontWeight: "500", fontSize: "23px" }}>
            {" "}
            # RM Agent{" "}
          </span>{" "}
          | Agent Name
        </Col>
        <Col
          md={4}
          style={{ color: "black", display: "flex", justifyContent: "end" }}
        >
          <AiFillSetting size={30} />
        </Col>
      </Row>
      <Row>
        <div>
          <div className="client-message">
            This is my preference
            <br />
            {/* <img src="../images/chat-message.png" style={{ size: "50px" }} /> */}
          </div>
          <div className="user-message">
            Yogie Ismanda UI Kit + Minor revisi ini ya pak..
            <br /> - We would like to have Pageviews, click, conversion and
            total revenue up in the right corner of the graph. And maybe design
            them so the look more like buttons that you can turn on/off?
            <br /> - Latest clicks/conversions. Where you currently have the
            logo for merchant, we should instead have a logo that represent the
            referring traffic sources (ex. Google or Facebook). So we’re
            actually missing a column that should say “Source”. And there should
            be no icon for the merchants.
          </div>
        </div>
      </Row>
      <Row className="chat-message">
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <AiFillPlusCircle size={40} color="#b77b50" />
        </Col>
        <Col xs={10}>
          <input
            type="text"
            className="text-box"
            placeholder="Type your message here"
          />
        </Col>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={1}
        >
          <Button>
            <IoSend  />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Messaging;
