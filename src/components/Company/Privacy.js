import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import CompanyHeader from "./CompanyHeader";
import authService from "../../services/authServices";

function Privacy({ windowSize }) {
  const location = useLocation();
  const [privacy, setPrivacy] = useState();

  useEffect(() => {
    authService.getDocuments().then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        res.data.filter((doc) => {
          if (doc.officialName === "privacy_policy") {
            setPrivacy(doc.url);
          }
        });
      }
    });
  }, []);
  return (
    <>
      <CompanyHeader location={location.pathname.split("/")[1]} />
      <Container
        style={{ padding: windowSize < 600 ? "40px 10px" : "50px" }}
        fluid
      >
        <Row style={{ height: "80vh" }}>
          <Col>
            <iframe src={privacy} width="100%" height="100%" />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Privacy;
