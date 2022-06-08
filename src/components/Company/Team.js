import React, { useState } from "react";
import CompanyHeader from "./CompanyHeader";
import { Row, Col, Container, Button } from "react-bootstrap";
import jay from "../../images/jay.jpg";
import TeamCard from "../Cards/TeamCard";
import team_member from "../Home/team_data";

function Team({ windowSize }) {
  const [list, setList] = useState(team_member);
  const onClick = (title) => () => {
    if (title === "All") {
      setList(team_member);
    }
    else {
      setList(team_member.filter(item => item.title === title));
    }
  }

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
              onClick={onClick("All")}
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
              onClick={onClick("Founder")}
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
              onClick={onClick("Operation")}
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
              onClick={onClick("Research")}
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
              onClick={onClick("Marketing")}
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
              onClick={onClick("Research")}
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
              onClick={onClick("Technology")}
            >
              Technology
            </Button>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
              }}
              onClick={onClick("Business")}
            >
              Business
            </Button>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
              }}
              onClick={onClick("Legal")}
            >
              Legal
            </Button>
          </Col>
        </Row>

        {/* ) : (
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
        )} */}
        <Row style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignContent: "center",
        }} >
          {list.map((member, index) => (
            <Col className="ceo-card" style={{ display: "flex", justifyContent: "center", margin: "20px" }} md={2} >
              <TeamCard
                name={member.name}
                location={member.location}
                img={member.img}
                linkedln={member.linkedin}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}

export default Team;