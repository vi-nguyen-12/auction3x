import React from "react";
import { Row, Col } from "react-bootstrap";

function Car() {
  return (
    <Row>
      <Col>
        <span style={{ fontWeight: "600", color: "black" }}>
          Year<span style={{ color: "#ff0000" }}>*</span>
        </span>
        <input type="text" className="form-control" defaultValue={""} />
      </Col>
      <Col>
        <span style={{ fontWeight: "600", color: "black" }}>
          Make<span style={{ color: "#ff0000" }}>*</span>
        </span>
        <input type="text" className="form-control" defaultValue={""} />
      </Col>
      <Col>
        <span style={{ fontWeight: "600", color: "black" }}>
          Model<span style={{ color: "#ff0000" }}>*</span>
        </span>
        <input type="text" className="form-control" defaultValue={""} />
      </Col>
    </Row>
  );
}

export default Car;
