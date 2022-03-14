import React from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";

function YachtDetails({ property, toogleStep, step, tooglePropertyData }) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
        type: "yacht",
        reservedAmount: data.reservedAmount,
        discussedAmount: data.discussedAmount,
      };
      tooglePropertyData(submitedData);
      toogleStep(step + 1);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="list-sell-bottom"
      style={{ justifyContent: "flex-start", display: "block" }}
    >
      <Container style={{ marginTop: "30px" }}>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
            //   defaultValue={property.ownerName}
            />
            <span style={{ fontWeight: "600" }}>Owner Name *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.ownerAddress}
            />
            <span style={{ fontWeight: "600" }}>Address *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
            //   defaultValue={ownerPhone}
            />
            <span style={{ fontWeight: "600" }}>Phone *</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
            //   defaultValue={ownerEmail}
            />
            <span style={{ fontWeight: "600" }}>Email *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col
            style={{
              borderBottom: "2px solid gray",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Broker Information
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.brokerName}
            />
            <span style={{ fontWeight: "600" }}>Broker Name</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.brokerAddress}
            />
            <span style={{ fontWeight: "600" }}>Address</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.brokerPhone}
            />
            <span style={{ fontWeight: "600" }}>Phone</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.brokerEmail}
            />
            <span style={{ fontWeight: "600" }}>Email</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col
            style={{
              borderBottom: "2px solid gray",
              fontWeight: "bold",
              fontSize: "18px",
            }}
          >
            Yacht Information
          </Col>
        </Row>
        <Row style={{ marginTop: "15px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.vRegistration}
            />
            <span style={{ fontWeight: "600" }}>
              Vessel Registration Number
            </span>
          </Col>
          <Col>
            <input
              type="date"
              className="form-control"
              defaultValue={property.vManuDate}
            />
            <span style={{ fontWeight: "600" }}>Vessel Manufacturing Date</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.manuMark}
            />
            <span style={{ fontWeight: "600" }}>Manufacture Mark</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.manuName}
            />
            <span style={{ fontWeight: "600" }}>Manufacturer Name</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.engineType}
            />
            <span style={{ fontWeight: "600" }}>Engine Type</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.engineManuName}
            />
            <span style={{ fontWeight: "600" }}>Engine Manufacturer Name</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.engineDeckType}
            />
            <span style={{ fontWeight: "600" }}>Engine Deck Type</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.runningCost}
            />
            <span style={{ fontWeight: "600" }}>Running Cost</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.crew}
            />
            <span style={{ fontWeight: "600" }}>No. Crew Required</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input type="number" className="form-control" />
            <span style={{ fontWeight: "600" }}>Reserved Amount</span>
          </Col>
          <Col>
            <input type="number" className="form-control" />
            <span style={{ fontWeight: "600" }}>Discussed Amount</span>
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
    </form>
  );
}

export default YachtDetails;
