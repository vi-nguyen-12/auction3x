import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { IoSend } from "react-icons/io5";
import { AiFillPlusCircle, AiFillSetting } from "react-icons/ai";

function Messaging({ windowSize }) {
  return (
    <>
      <h1 style={{ margin: "50px" }}>Message</h1>
      <Container className="chatContainer" style={{ width: "90vw", margin:"30px auto" }}>
        <Row
          className="d-flex justify-content-center mt-3"
          style={{ alignItems: "center" }}
        >
          <Col
            md={2}
            lg={2}
            className="d-flex"
            style={{
              justifyContent: windowSize > 767 ? "flex-end" : "flex-start",
            }}
          >
            To :
          </Col>
          <Col md={7} lg={6} className="d-flex">
            <select className="form-control">
              <option>Select a user</option>
              <option>User 1</option>
              <option>User 2</option>
              <option>User 3</option>
            </select>
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-center mt-3"
          style={{ alignItems: "center" }}
        >
          <Col
            md={2}
            lg={2}
            className="d-flex"
            style={{
              justifyContent: windowSize > 767 ? "flex-end" : "flex-start",
            }}
          >
            Subject :
          </Col>
          <Col md={7} lg={6} className="d-flex">
            <input
              className="form-control"
              type="text"
              placeholder="Enter a subject"
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3">
          <Col
            md={2}
            lg={2}
            className="d-flex"
            style={{
              justifyContent: windowSize > 767 ? "flex-end" : "flex-start",
            }}
          >
            Message :
          </Col>
          <Col md={7} lg={6} className="d-flex">
            <textarea
              className="form-control"
              rows="5"
              placeholder="Enter a message"
            ></textarea>
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-center mt-3"
          style={{ alignItems: "center" }}
        >
          <Col
            md={2}
            lg={2}
            className="d-flex"
            style={{
              justifyContent: windowSize > 767 ? "flex-end" : "flex-start",
            }}
          >
            Attachment :
          </Col>
          <Col md={7} lg={6} className="d-flex">
            <input className="form-control" type="file" />
          </Col>
        </Row>
        <Row
          className="d-flex justify-content-center mt-3"
          style={{ alignItems: "center" }}
        >
          <Col className="d-flex" style={{ justifyContent: "center" }}>
            <Button
              variant="primary"
              style={{ fontWeight: "bold", padding: "10px 20px" }}
              className="mr-2"
            >
              Send
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Messaging;
