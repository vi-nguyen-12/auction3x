import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

function PropertyInfo() {
  return (
    <>
      <Row>
        <Col>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Property Summary <span style={{ color: "#ff0000" }}>*</span>
          </span>
          <textarea placeholder="Summary"></textarea>
        </Col>
      </Row>
    </>
  );
}

export default PropertyInfo;
