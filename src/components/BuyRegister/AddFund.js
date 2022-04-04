import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import "../../styles/Buyer.css";

function AddFund() {
  const [other, setOther] = useState(false);
  const [self, setSelf] = useState(false);
  const toogleSelf = () => setSelf(!self);
  const toogleOther = () => setOther(!other);
  return (
    <Container className="fund-container">
      <h1>Add Fund</h1>
      <Row>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setOther(false);
              toogleSelf();
            }}
            variant="primary"
          >
            Self
          </Button>
        </Col>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button
            onClick={() => {
              setSelf(false);
              toogleOther();
            }}
            variant="primary"
          >
            Other
          </Button>
        </Col>
      </Row>

      {other === true ? (
        <>
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
                <label>Proof Of Fund</label>
                <input
                  type="file"
                  name="form"
                  className="form-control"
                  placeholder="Form"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" className="btn-block">
                Submit
              </Button>
            </Col>
          </Row>
        </>
      ) : null}

      {self === true ? (
        <Row>
          <Row>
            <Col>
              <label>Proof Of Fund</label>
              <input
                type="file"
                name="form"
                className="form-control"
                placeholder="Form"
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
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" className="btn-block">
              Submit
            </Button>
          </Col>
        </Row>
      ) : null}
    </Container>
  );
}

export default AddFund;
