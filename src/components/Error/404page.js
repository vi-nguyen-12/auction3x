import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import error from "../../../src/images/error.png";
import ErrorIcon from "../../images/ErrorIcon.png";

function ErrorPage({ windowSize }) {
  const history = useHistory();
  return (
    <Row style={{ background: "#F5F9FF", padding: windowSize < 800 ? "1rem" : "3rem" }}>
      <Col
        className="d-grid justify-content-center align-items-center p-5"
        style={{ backgroundColor: "#e3eaf6" }}
        md={12}
      >
        <div className="d-grid justify-content-center align-items-center">
          <img
            src={ErrorIcon}
            alt="error"
            width={windowSize < 800 ? "200px" : ""}
          />
        </div>
        <div className="d-grid justify-content-center align-items-center my-5">
          <span
            style={{
              fontFamily: "Tzimmes",
              fontStyle: "normal",
              fontWeight: "700",
              fontSize: windowSize < 800 ? "1.5rem" : "48px",
              color: "#08080A",
              textAlign: "center",
            }}
          >
            No related auctions available at the moment.
          </span>
          <div className="d-grid justify-content-center align-items-center mt-5">
            <Button
              style={{
                fontFamily: "Interstate, sans-serif",
                fontStyle: "normal",
                fontWeight: "700",
                fontSize: windowSize < 800 ? "0.6rem" : "1.5rem",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textTransform: "uppercase",
                color: "#FFFFFF",
                backgroundColor: "#B77B50",
                borderRadius: "0",
                border: "none",
                padding: "1rem 2rem",
              }}
              onClick={() => {
                history.push("/");
              }}
            >
              Take Me Home
            </Button>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ErrorPage;
