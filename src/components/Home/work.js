import React from "react";
import { Row, Col, Card, Container } from "react-bootstrap";
import "../../styles/work.css";

const Work = (props) => {
  return (
    <section
      style={{ padding: "0 50px", background: "#f8f8f8", height: "759px", marginTop: "50px" }}
    >
      <Row>
        <Col className="work-title">
          <div className="heading">How it Works?</div>
          <div className="content-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
            <br />
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            <br />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "100px" }}>
        <Col md={3} className="arrDiv">
          <Card className="work-box">
            <div className="numberBtn">1</div>
            <div className="card-content">
              <span>Lorem Ipsum</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Card>
        </Col>
        <Col className="arrDiv">
          <img
            src="images/downArr.png"
            alt="arrow"
            style={{ width: "150px", height: "20px" }}
          />
        </Col>
        <Col md={3} className="arrDiv">
          <Card className="work-box">
            <div className="numberBtn">2</div>
            <div className="card-content">
              <span>Lorem Ipsum</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Card>
        </Col>
        <Col className="arrDiv">
          <img
            src="images/upArr.png"
            alt="arrow"
            style={{ width: "150px", height: "20px" }}
          />
        </Col>
        <Col md={3} className="arrDiv">
          <Card className="work-box">
            <div className="numberBtn">3</div>
            <div className="card-content">
              <span>Lorem Ipsum</span>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </section>
    // <section className="work-wrapper">
    //   <Row className="row-custom">
    //     <div className="heading">How it Works?</div>
    //     <div className="content-1">
    //       Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    //       <br />
    //       sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //     </div>
    //   </Row>
    //   <div className="card-content">
    //     <Row md={5} className="row-custom">
    //       <Col>
    //         <Card style={{ width: "22rem" }} className="card-work">
    //           <div className="card-number">
    //             <h2>1</h2>
    //           </div>

    //           <Card.Body style={{ marginLeft: "1rem" }}>
    //             <Card.Title>Lorem Ipsum</Card.Title>
    //             <Card.Text>
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    //               do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col className="arrDiv" xs={1}>
    //         <img
    //           src="images/downArr.png"
    //           alt="arrow"
    //           style={{ width: "150px", height: "20px" }}
    //         />
    //       </Col>

    //       <Col xs>
    //         <Card style={{ width: "22rem" }} className="card-work">
    //           <div className="card-number">
    //             <h2>2</h2>
    //           </div>

    //           <Card.Body style={{ marginLeft: "1rem" }}>
    //             <Card.Title>Lorem Ipsum</Card.Title>
    //             <Card.Text>
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    //               do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>

    //       <Col className="arrDiv" xs={1}>
    //         <img
    //           src="images/upArr.png"
    //           alt="arrow"
    //           style={{ width: "150px", height: "20px" }}
    //         />
    //       </Col>

    //       <Col xs>
    //         <Card style={{ width: "22rem" }} className="card-work">
    //           <div className="card-number">
    //             <h2>3</h2>
    //           </div>

    //           <Card.Body style={{ marginLeft: "1rem" }}>
    //             <Card.Title>Lorem Ipsum</Card.Title>
    //             <Card.Text>
    //               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
    //               do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    //             </Card.Text>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>
    //   </div>
    // </section>
  );
};

export default Work;
