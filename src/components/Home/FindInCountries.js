import React from "react";
import { Row, Col, Container } from "react-bootstrap";

const FindInCountries = (props) => {
  return (
    <>
      <Container
        fluid>
        <Row style={{
          background: "#f8f8f8",
          margin: "0",
          padding: "0",
          padding: "0 50px",
        }}>
          <Row>
            <Col md={10} className="m-auto pt-5 text-center">
              <h2 style={{ color: "black", fontSize: "22px" }}>
                Find Properties In These Countries
              </h2>
            </Col>
          </Row>
          <Row>
            <Col className="circularCard" md={4}>
              <img
                height={350}
                src="/images/historic-featured.jpg"
                alt=""
              />
              <span>
                <h2>U.S.A</h2>
                <p>12 Properties</p>
              </span>
            </Col>
            <Col className="circularCard" md={8}>
              <img
                height={350}
                src="/images/australia.jpg"
                alt=""
              />
              <span>
                <h2>AUSTRALIA</h2>
                <p>23 Properties</p>
              </span>
            </Col>
          </Row>
          <Row>
            <Col className="circularCard" md={8}>
              <img height={350} src="/images/canada.webp" alt="" />
              <span>
                <h2>CANADA</h2>
                <p>18 Properties</p>
              </span>
            </Col>
            <Col className="circularCard" md={4}>
              <img height={350} src="/images/london-england.jpg" alt="" />
              <span>
                <h2>ENGLAND</h2>
                <p>33 Properties</p>
              </span>
            </Col>
          </Row>
        </Row>
      </Container>

      {/* <div className="mt-5 pt-5" style={{ background: "#f8f8f8", height:"95rem" }}>
 <Col md={10} className="m-auto pt-5">
        <Row>
          <Col md={4}>
            <div className="circularCard">
              <img
                src="/images/feature.png"
                style={{ height: 400 }}
                alt=""
                className="img-fluid"
              />
            </div>
          </Col>
          <Col md={8}>
            <div className="circularCard">
              <img
                src="/images/Masterfully-Conceptual-Design-of-Emirates-Hills-Luxury-Mansion-in-Dubai-1 1.png"
                style={{ height: 400 }}
                alt=""
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Col>
      <Col md={10} className="m-auto pt-5">
        <Row>
          <Col md={8}>
            <div className="circularCard">
              <img
                src="https://images.unsplash.com/photo-1467803738586-46b7eb7b16a1?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTN8fGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                style={{ height: 400 }}
                className="img-fluid"
                alt=""
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="circularCard">
              <img
                src="https://images.unsplash.com/photo-1464938050520-ef2270bb8ce8?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fGJ1aWxkaW5nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                style={{ height: 400 }}
                className="img-fluid"
                alt=""
              />
            </div>
          </Col>
        </Row>
      </Col>
 </div> */}
    </>
  );
};

export default FindInCountries;
