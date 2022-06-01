import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { IoSend } from "react-icons/io5";
import { AiFillPlusCircle, AiFillSetting } from "react-icons/ai";

function Messaging({ windowSize }) {
  return (
    <Container className="chatContainer">
      <Row className="top-chat">
        <Col style={{ color: "black" }}>
          <span
            style={{
              fontWeight: "500",
              fontSize: "20px",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            {" "}
            # RM Agent | Agent Name
          </span>{" "}
        </Col>
        <Col
          xs={2}
          style={{
            color: "black",
            display: "flex",
            justifyContent: "flex-end",
          }}
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
          xs={windowSize > 800 ? 1 : 2}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <label htmlFor="upload">
            <AiFillPlusCircle size={40} color="#b77b50" />
          </label>
          <input type="file" id="upload" hidden />
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
            display: windowSize > 800 ? "flex" : "none",
            justifyContent: "center",
            alignItems: "center",
          }}
          xs={1}
        >
          <Button style={{ background: "transparent", border: "none" }}>
            <IoSend size={30} color="blue" />
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Messaging;
