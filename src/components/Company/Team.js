import React from "react";
import CompanyHeader from "./CompanyHeader";
import { Row, Col, Container, Button } from "react-bootstrap";

function Team() {
  return (
    <>
      <CompanyHeader location={"Team"} />
      <Container fluid style={{ padding: "50px 180px" }}>
        <Row>
          <Col>
            <p>
              Auction3™ is the vision of a motivated team with a wealth of
              experience across diverse sectors and geographies. The team is
              currently spread across USA, Canada, UK, Germany, Singapore and
              India with the vision to spread across 196 countries globally.
              <br />
              The team has extensive experience and expertise across Global
              Financial Services Eco-system, Technology, Education, Energy,
              Infrastructure, Media & Entertainment, Hospitality, Manufacturing,
              Corporate Planning, Business Strategy, Public Relations etc. with
              the sole aim of galvanizing a spirit of service and contribution
              towards building a cohesive and holistic business environment
              across Global markets.
            </p>
          </Col>
        </Row>
        <Row style={{ padding: "10px 330px" }}>
          <Col style={{ display: "flex", justifyContent: "right" }}>
            <Button
              style={{
                fontSize: "20px",
                padding: "5px 20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
              }}
            >
              All
            </Button>
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                fontSize: "20px",
                padding: "5px 20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
              }}
            >
              Founder
            </Button>
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                fontSize: "20px",
                padding: "5px 20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
              }}
            >
              Operation
            </Button>
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                fontSize: "20px",
                padding: "5px 20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
              }}
            >
              Marketing
            </Button>
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                fontSize: "20px",
                padding: "5px 20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
              }}
            >
              Research
            </Button>
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button
              style={{
                fontSize: "20px",
                padding: "5px 20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
              }}
            >
              Technology
            </Button>
          </Col>
        </Row>
        <Row style={{ padding: "10px 200px" }}>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <img alt="team" />
              <p style={{ fontSize: "20px", fontWeight: "bold" }}>Jay Patel</p>
              <p style={{ fontSize: "15px" }}>Founder</p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Team;
