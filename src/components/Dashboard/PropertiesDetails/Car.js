import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import NumberFormat from "react-number-format";

function Car({ property, setEdit, edit }) {
  const [other, setOther] = useState(false);

  const carMake = [
    "FERRARI",
    "ASTON MARTIN",
    "ROLLS ROYCE",
    "BUGATTI",
    "PAGANI",
    "KOENIG",
    "LAMBORGHINI",
    "W MOTORS",
    "MERCEDES",
    "McLAREN",
    "ZENVO",
    "BENTLEY",
    "CZINGER",
    "MAZZANTI",
  ];

  return (
    <>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Year<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.year}
            thousandSeparator={true}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            allowNegative={false}
            format="####"
            className="form-control"
            disabled={!edit.step2_1}
            onValueChange={(values) => {
              const { value } = values;
              property.details.year = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Make<span style={{ color: "#ff0000" }}>*</span>
          </span>
          {other ? (
            <>
              <input
                type="text"
                className="form-control"
                style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
                placeholder="Enter Make"
                defaultValue={property.details.make}
                onChange={(e) => (property.details.make = e.target.value)}
                disabled={!edit.step2_1}
              />
              <span className="d-flex justify-content-end mt-1">
                <Button onClick={() => setOther(false)}>Back</Button>
              </span>
            </>
          ) : (
            <Form.Select
              className="form-control"
              style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
              value={property.details.make}
              onChange={(e) => {
                if (e.target.value !== "Other") {
                  property.details.make = e.target.value;
                } else {
                  e.target.value === "Other" ? setOther(true) : setOther(false);
                }
              }}
              disabled={!edit.step2_1}
            >
              <option value="">Make</option>
              {carMake.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
              <option value="Other">Other</option>
            </Form.Select>
          )}
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Model<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.model}
            onChange={(e) => (property.details.model = e.target.value)}
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            VIN<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.VIN}
            onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
            onChange={(e) => (property.details.VIN = e.target.value)}
            disabled={!edit.step2_1}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Gearbox<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <Form.Select
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            name="gearbox"
            defaultValue={property.details.gearbox}
            onChange={(e) => (property.details.gearbox = e.target.value)}
            disabled={!edit.step2_1}
          >
            <option value="">Select Gearbox Type</option>
            <option value="Automatic">Automatic</option>
            <option value="Manual">Manual</option>
          </Form.Select>
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Fuel Type<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <Form.Select
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            name="fuel"
            value={property.details.fuel_type}
            onChange={(e) => (property.details.fuel_type = e.target.value)}
            disabled={!edit.step2_1}
          >
            <option value="">Select Fuel Type</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Engine<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.engine}
            onChange={(e) => (property.details.engine = e.target.value)}
            disabled={!edit.step2_1}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Power (Horsepower)<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.power}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            onValueChange={(values) => {
              const { value } = values;
              property.details.power = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Market Evaluate Price<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.market_price}
            thousandSeparator={true}
            prefix="$"
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            onValueChange={(values) => {
              const { value } = values;
              property.details.market_price = value;
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Car Type <span style={{ color: "#ff0000" }}>*</span>
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.car_type}
            onChange={(e) => (property.details.car_type = e.target.value)}
            disabled={!edit.step2_1}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Condition<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <Form.Select
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            name="condition"
            defaultValue={property.details.condition}
            onChange={(e) => (property.details.condition = e.target.value)}
            disabled={!edit.step2_1}
          >
            <option value="">Select Condition</option>
            <option value="New">New</option>
            <option value="Used">Used</option>
          </Form.Select>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Mileage<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.mileage}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            onValueChange={(values) => {
              const { value } = values;
              property.details.mileage = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Color<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.color}
            onChange={(e) => (property.details.color = e.target.value)}
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Reserved Amount<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.reservedAmount}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            prefix={"$"}
            className="form-control"
            onValueChange={(values) => {
              const { value } = values;
              property.reservedAmount = value;
            }}
            disabled={!edit.step2_1}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Disscussed Amount<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.discussedAmount}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            prefix={"$"}
            className="form-control"
            onValueChange={(values) => {
              const { value } = values;
              property.discussedAmount = value;
            }}
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          <Button
            className="mx-3"
            onClick={() =>
              setEdit((prev) => ({ ...prev.step2_1, step2_1: !edit.step2_1 }))
            }
          >
            Edit
          </Button>
          {edit.step2_1 ? <Button>Save</Button> : null}
        </Col>
      </Row>
    </>
  );
}

export default Car;
