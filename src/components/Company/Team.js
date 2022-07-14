import React, { useState, useEffect } from "react";
import CompanyHeader from "./CompanyHeader";
import { Row, Col, Container, Button } from "react-bootstrap";
import jay from "../../images/jay.jpg";
import TeamCard from "../Cards/TeamCard";
import team_member from "../Home/team_data";
import authService from "../../services/authServices";

function Team({ windowSize }) {
  const [team, setTeam] = useState([]);
  const [list, setList] = useState([]);

  useEffect(() => {
    authService.getTeam().then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        console.log(res.data);
        setTeam(res.data);
        setList(res.data);
      }
    });
  }, []);

  const onClick = (title) => () => {
    if (title === "All") {
      setList(team);
    } else {
      setList(team.filter((item) => item.department === title));
    }
  };

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
            justifyContent: "center",
            // alignContent: "center",
          }}
        >
          <Col style={{ flex: "0" }}>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
                width: "130px",
                margin: windowSize < 800 && "10px 0",
              }}
              onClick={onClick("All")}
            >
              All
            </Button>
          </Col>
          <Col style={{ flex: "0" }}>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
                width: "130px",
                margin: windowSize < 800 && "10px 0",
              }}
              onClick={onClick("founder")}
            >
              Founder
            </Button>
          </Col>
          <Col style={{ flex: "0" }}>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
                width: "130px",
                margin: windowSize < 800 && "10px 0",
              }}
              onClick={onClick("operation")}
            >
              Operation
            </Button>
          </Col>
          <Col style={{ flex: "0" }}>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
                width: "130px",
                margin: windowSize < 800 && "10px 0",
              }}
              onClick={onClick("marketing")}
            >
              Marketing
            </Button>
          </Col>
          <Col style={{ flex: "0" }}>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
                width: "130px",
                margin: windowSize < 800 && "10px 0",
              }}
              onClick={onClick("research")}
            >
              Research
            </Button>
          </Col>
          <Col style={{ flex: "0" }}>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
                width: "130px",
                margin: windowSize < 800 && "10px 0",
              }}
              onClick={onClick("technology")}
            >
              Technology
            </Button>
          </Col>
          <Col style={{ flex: "0" }}>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
                width: "130px",
                margin: windowSize < 800 && "10px 0",
              }}
              onClick={onClick("business")}
            >
              Business
            </Button>
          </Col>
          <Col style={{ flex: "0" }}>
            <Button
              style={{
                fontSize: "20px",
                background: "none",
                color: "#706666",
                fontWeight: "bold",
                border: "1px solid #e2e2e2 ",
                width: "130px",
                margin: windowSize < 800 && "10px 0",
              }}
              onClick={onClick("legal")}
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
        <Row
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            alignContent: "center",
          }}
        >
          {list.length > 0 &&
            list.map((member, index) => (
              <Col
                key={index}
                className="ceo-card"
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "20px",
                }}
                md={2}
              >
                <TeamCard
                  firstName={member.firstName}
                  lastName={member.lastName}
                  location={member.location}
                  img={member.profileImage}
                  linkedln={member.linkedln}
                />
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
}

export default Team;
