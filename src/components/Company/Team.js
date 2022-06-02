import React from "react";
import CompanyHeader from "./CompanyHeader";
import { Row, Col, Container, Button } from "react-bootstrap";
import jay from "../../images/jay.jpg";
import TeamCard from "../Cards/TeamCard";

function Team({ windowSize }) {
  return (
    <>
      <CompanyHeader location={"Team"} />
      <Container fluid>
        <Row style={{ padding: windowSize > 800 ? "50px 180px" : "50px 10px" }}>
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
        {windowSize > 800 ? (
          <Row
            style={{
              display: "flex",
              justifyContent: "space-evenly",
              alignContent: "center",
            }}
          >
            <Col
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
              }}
            >
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                All
              </Button>
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                Founder
              </Button>
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                Operation
              </Button>
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                Marketing
              </Button>
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                Research
              </Button>
              <Button
                style={{
                  fontSize: "20px",
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
        ) : (
          <Row style={{ padding: "20px 10px" }}>
            <Col
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignContent: "center",
              }}
            >
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                All
              </Button>
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                Founder
              </Button>
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                Operation
              </Button>
              <Button
                style={{
                  fontSize: "20px",
                  background: "none",
                  color: "#706666",
                  fontWeight: "bold",
                  border: "1px solid #e2e2e2 ",
                }}
              >
                Marketing
              </Button>
            </Col>
          </Row>
        )}
        <Row >
          <Col className="ceo-card">
            <TeamCard
              name="Jay Patel"
              location="Sugar Land, Tx, USA"
              img={jay}
              linkedln="https://www.linkedin.com/in/wickrema-singhe-66a784/"
            />
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Team;