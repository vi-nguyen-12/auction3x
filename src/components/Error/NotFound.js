import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import error from "../../../src/images/error.png";

function NotFound({ windowSize }) {
  const history = useHistory();
  return (
    <Row style={{ margin: "0", padding: "0", height: "100vh" }}>
      <Col
        style={{
          backgroundColor: "#282828",
          margin: "0",
          padding: "0",
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
        md={12}
      >
        <img
          src={error}
          alt="error"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        />
        <div
          style={{
            display: "grid",
            justifyContent: "center",
            justifyItems: "center",
            fontSize: windowSize < 800 ? "5rem" : "10rem",
            alignContent: "center",
            width: "100%",
            height: "fit-content",
            position: "absolute",
            color: "white",
          }}
        >
          <span>ERROR!</span>
          <p
            style={{
              fontSize: windowSize < 800 ? "1rem" : "3rem",
              display: "flex",
              justifyContent: "center",
            }}
          >
            The Page you are looking for is not found!
          </p>
          <Button
            style={{
              background: "white",
              color: "#B77B50",
              fontWeight: "bold",
              border: "none",
              padding: "10px",
              width: "fit-content",
            }}
            onClick={() => {
              history.push("/");
            }}
          >
            Take Me Home
          </Button>
        </div>
      </Col>
    </Row>
  );
}

export default NotFound;
