import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../styles/Buyer.css";

function AddFund() {
  const [other, setOther] = useState(false);
  const toogleOther = () => setOther(!other);
  return (
    <Container className="fund-container">
      <h1>Add Fund</h1>
      <Row>
        <Col>
          <label>Name of Proof of Fund</label>
          <input
            type="text"
            name="fund"
            className="form-control"
            placeholder="Name"
            required
          />
        </Col>
        <Col>
          <label>Fund Amount</label>
          <input
            type="number"
            name="fund"
            className="form-control"
            placeholder="Amount"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <label>Provider</label>
          <input
            type="text"
            name="provider"
            className="form-control"
            placeholder="Provider"
            required
          />
        </Col>
        <Col>
          <label>Validity Date</label>
          <input
            type="date"
            name="validity"
            className="form-control"
            placeholder="Validity Date"
            required
          />
        </Col>
      </Row>
      <Row>
        <label>Declaration</label>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="primary">Self</Button>
        </Col>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={toogleOther} variant="primary">
            Other
          </Button>
        </Col>
      </Row>
      {other === true ? (
        <Row>
          <Col>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
              />
            </div>
            <div>
              <label>Declaration Form</label>
              <input
                type="file"
                name="form"
                className="form-control"
                placeholder="Form"
              />
            </div>
          </Col>
        </Row>
      ) : null}
      <Row>
        <Col>
          <label>Proof of Fund</label>
          <input
            type="file"
            name="fund"
            className="form-control"
            placeholder="Fund"
            required
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="primary" className="btn-block">
            Submit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default AddFund;
