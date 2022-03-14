import React from "react";
import { Table, Row, Col, Container } from "react-bootstrap";

function JetForm({ toogleStep, step }) {
  return (
    <div
      className="list-sell-bottom"
      style={{ justifyContent: "flex-start", display: "block" }}
    >
      <Container style={{ marginTop: "50px" }}>
        <Row style={{ marginTop: "50px" }}>
          <Col
            style={{
              borderBottom: "2px solid gray",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Aircraft Description
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>Registration Mark</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>Aircraft Builder's Name</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>
              Aircraft Model Designation
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>Aircraft Serial No.</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>Engine Builder's Name</span>
          </Col>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>Engine Model Designation</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>Number of Engines</span>
          </Col>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>Propeller Builder's Name</span>
          </Col>
          <Col>
            <input type="text" className="form-control" />
            <span style={{ fontWeight: "600" }}>
              Propeller Model Designation
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <span style={{ fontWeight: "600" }}>
              Is the aircraft an import?
            </span>
            <select className="form-control">
              <option>Yes</option>
              <option>No</option>
            </select>
          </Col>
          <Col>
            <span style={{ fontWeight: "600" }}>N</span>
            <input type="text" className="form-control" />
          </Col>
        </Row>
      </Container>

      <div
        className="bottom-btn"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <button
          className="pre-btn"
          onClick={() => {
            toogleStep(step - 1);
          }}
        >
          Previous
        </button>
        <button className="nxt-btn" type="submit">
          Next
        </button>
      </div>
    </div>
  );
}

export default JetForm;
