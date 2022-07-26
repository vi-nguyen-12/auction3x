import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import authService from "../../../services/authServices";
import { useSelector } from "react-redux";

function Messaging({ windowSize }) {
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [files, setFiles] = useState([]);
  const user = useSelector((state) => state.user);

  const getFiles = () => { };

  const send = async () => {
    const datas = {
      type: "from_user",
      userId: user._id,
      subject: subject,
      content: message,
    };

    await authService.sendEmails(datas).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <>
      <h1 style={{ margin: "50px" }}>Messaging</h1>
      <Container
        className="chatContainer"
        style={{ width: "100%", margin: "30px auto" }}
      >
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
              type="text"
              className="form-control"
              placeholder="Enter a subject"
              onChange={(e) => setSubject(e.target.value)}
              style={{ width: "100%", border: "none" }}
              required
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
              onChange={(e) => setMessage(e.target.value)}
              required
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
            <div className="refresh">
              <button
                variant="primary"
                style={{ fontWeight: "bold", padding: "1px 10px" }}
                onClick={() => send()}
                className="resetBtn"
              >
                Send
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Messaging;
