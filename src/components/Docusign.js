import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { HiOutlineDocumentCheck } from "react-icons/hi2";
import axios from "axios";

const apiUrl =
  process.env.REACT_APP_NODE_ENV === "production"
    ? process.env.REACT_APP_PROD_API_URL
    : process.env.REACT_APP_NODE_ENV === "test"
    ? process.env.REACT_APP_TEST_API_URL
    : process.env.REACT_APP_DEV_API_URL;

const Docusign = ({ toggleDocu, showDocu, setMessage, colorChange }) => {
  const search = useLocation().search;
  const state = new URLSearchParams(search).get("state");
  const event = new URLSearchParams(search).get("event");

  const { envelopeId } = useParams();
  useEffect(() => {
    colorChange("black");
    const postStatusDocusign = async () => {
      await axios
        .get(
          `${apiUrl}/api/docusign/callback/${envelopeId}?state=${state}&event=${event}`
        )
        .then((response) => {
          if (
            response.data === "signing_complete" ||
            response.data === "viewing_complete"
          ) {
            setMessage("");
            setTimeout(() => {
              setMessage(
                "Thanks for signing selling agreement with us. This tab will close in 10 seconds and back to main page to continue process!"
              );
            }, 100);
            window.close();
          }
        });
    };
    postStatusDocusign();
    // const frame = document.getElementById("the_frame");
    // frame.parentNode.removeChild(frame);
  }, []);
  return (
    <Row className="vh-100" style={{ padding: "10rem 8%" }}>
      <Col
        className="d-flex justify-content-center align-items-center"
        style={{ backgroundColor: "#1b4da0" }}
      >
        <div className="d-grid justify-content-center align-items-center">
          <div
            className="d-flex justify-content-center align-items-center mb-5"
            style={{
              width: "auto",
              height: "auto",
              borderRadius: "50%",
              border: "2px solid #ffffff",
              margin: "auto",
              padding: "0.5rem",
            }}
          >
            <HiOutlineDocumentCheck size={100} color="#ffffff" />
          </div>
          <div className="d-grid justify-content-center align-items-center mt-5">
            <span className="text-white text-center docusign-text my-3">
              Docusign completed, you may now close this tab to submit your
              property registration.
            </span>
            <button
              type="button"
              style={{
                width: "fit-content",
                padding: " 0.6rem 2rem",
                backgroundColor: " #ffc324",
                border: "none",
                fontWeight: "bold",
                color: "#3c3113",
                margin: "auto",
              }}
              onClick={() => window.close()}
            >
              CLOSE TAB
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};
export default Docusign;
