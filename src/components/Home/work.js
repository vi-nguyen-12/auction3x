import React from "react";
import { Row, Col, Card } from "react-bootstrap";
import "../../styles/work.css";

const Work = (props) => {
  return (
    <section className="work-wrapper">
      <Row className="row-custom">
        <div className="heading">How it Works?</div>
        <div className="content-1">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit,
          <br />
          sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </div>
      </Row>
      <div className="card-content">
        <Row className="row-custom">
          <Col>
            <Card style={{ width: "22rem" }} className="card-work">
              <div className="card-number">
                <h2>1</h2>
              </div>

              <Card.Body style={{ marginLeft: "1rem" }}>
                <Card.Title>Lorem Ipsum</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={1}>
            <img
              src="images/downArr.png"
              alt="arrow"
              style={{ width: "150px", height: "20px" }}
            />
          </Col>

          <Col>
            <Card style={{ width: "22rem" }} className="card-work">
              <div className="card-number">
                <h2>2</h2>
              </div>

              <Card.Body style={{ marginLeft: "1rem" }}>
                <Card.Title>Lorem Ipsum</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col xs={1}>
            <img
              src="images/upArr.png"
              alt="arrow"
              style={{ width: "150px", height: "20px" }}
            />
          </Col>

          <Col>
            <Card style={{ width: "22rem" }} className="card-work">
              <div className="card-number">
                <h2>3</h2>
              </div>

              <Card.Body style={{ marginLeft: "1rem" }}>
                <Card.Title>Lorem Ipsum</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </section>
  );
};

export default Work;
