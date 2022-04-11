import React, { useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { MdAssignmentTurnedIn } from "react-icons/md";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

const Docusign = () => {
  const search = useLocation().search;
  const state = new URLSearchParams(search).get("state");
  const event = new URLSearchParams(search).get("event");

  const { envelopeId } = useParams();
  const handleOnClick = () => {
    window.close();
  };
  useEffect(() => {
    const postStatusDocusign = async () => {
      await axios
        .get(
          `https://auction10x-be.azurewebsites.net/api/docusign/callback/${envelopeId}?state=${state}&event=${event}`
        )
        .then((response) => {});
    };
    postStatusDocusign();
  });
  return (
    <>
      {event === "signing_complete" || event === "viewing_complete" ? (
        <Container
          style={{ height: "100vh", width: "100vw", padding: "100px" }}
        >
          <Row>
            <Col
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
              }}
            >
              <MdAssignmentTurnedIn size={500} color="green" />
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                display: "grid",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h1 style={{ margin: "0" }}>
                Docusign has been successfully completed.
              </h1>
              <div
                style={{
                  display: "grid",
                  width: "100%",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <span
                  style={{ width: "499px", fontWeight: "500", color: "blue" }}
                >
                  You may now close this tab and return to complete your
                  property registeration process. Please click the button below
                  to close this tab.
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col
              style={{
                display: "flex",
                width: "100%",
                justifyContent: "center",
                textAlign: "center",
                marginTop: "50px",
              }}
            >
              <Button onClick={handleOnClick}>Close Tab</Button>
            </Col>
          </Row>
        </Container>
      ) : (
        <h1>Docusign is {event}</h1>
      )}
    </>
  );
};
export default Docusign;
