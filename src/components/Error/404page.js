import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import error from "../../../src/images/error.png";

function ErrorPage() {
  const history = useHistory();
  return (
    <Row
      style={{
        margin: "0",
        padding: "0",
        height: "100%",
      }}
    >
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
            fontSize: "10rem",
            alignContent: "center",
            width: "100%",
            height: "fit-content",
            position: "absolute",
            color: "white",
          }}
        >
          <span>404</span>
          <p
            style={{
              fontSize: "25px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            No Auctions Found!
          </p>
          <Button
            style={{
              background: "white",
              color: "#B77B50",
              fontWeight: "bold",
              border: "none",
              padding: "10px",
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

export default ErrorPage;
