import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import Austin from "../../images/Austin.jpg";
import Houston from "../../images/houstonPark.jpg";
import Dallas from "../../images/dallass.jpeg";
import SanAntonio from "../../images/sanAntonio.jpeg";

const FindInCountries = ({ windowSize }) => {
  const history = useHistory();
  return (
    <>
      <Container style={{ padding: windowSize > 400 && "0 30px" }} fluid>
        <Row
          style={{
            margin: "0",
            padding: "0 10px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Row>
            <Col md={10} className="m-auto pt-5 text-center">
              <h2
                style={{
                  color: "#282828",
                  fontSize: windowSize < 600 ? "24px" : "44px",
                  marginBottom: "50px",
                  fontWeight: "600",
                  fontFamily: "Josefin Slab",
                  fontStyle: "normal",
                }}
              >
                Find Properties In These Cities
              </h2>
            </Col>
          </Row>
          <Row className="mt-4 p-0">
            <Col md={4} style={{ padding: windowSize < 600 && "0" }}>
              <div className="circularCard">
                <img
                  onClick={() => history.push("/Auctions/Austin")}
                  height="400px"
                  src={Austin}
                  alt="Austin"
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/Auctions/Austin")}
                >
                  <h2>Austin</h2>
                  <p>12 Properties</p>
                </span>
              </div>
            </Col>
            <Col md={8} style={{ padding: windowSize < 600 && "0" }}>
              <div className="circularCard">
                <img
                  onClick={() => history.push("/Auctions/Houston")}
                  height="400px"
                  src={Houston}
                  alt=""
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/Auctions/Houston")}
                >
                  <h2>Houston</h2>
                  <p>23 Properties</p>
                </span>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={8} style={{ padding: windowSize < 600 && "0" }}>
              <div className="circularCard">
                <img
                  onClick={() => history.push("/Auctions/Dallas")}
                  height="400px"
                  src={Dallas}
                  alt=""
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/Auctions/Dallas")}
                >
                  <h2>Dallas</h2>
                  <p>18 Properties</p>
                </span>
              </div>
            </Col>
            <Col md={4} style={{ padding: windowSize < 600 && "0" }}>
              <div className="circularCard">
                <img
                  onClick={() => history.push("/Auctions/SanAntonio")}
                  height="400px"
                  src={SanAntonio}
                  alt=""
                />
                <span
                  style={{ cursor: "pointer" }}
                  onClick={() => history.push("/Auctions/SanAntonio")}
                >
                  <h2>San Antonio</h2>
                  <p>33 Properties</p>
                </span>
              </div>
            </Col>
          </Row>
        </Row>
      </Container>
    </>
  );
};

export default FindInCountries;
