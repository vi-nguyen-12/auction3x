import React, { useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";

function JetForm({ toogleStep, step, properties }) {
  const { register, handleSubmit, errors } = useForm();
  const [isImport, setIsImport] = useState();

  const onSubmit = (data) => {
    const datas = {
      registration_mark: data.registration_mark,
      aircraft_builder_name: data.aircraft_builder_name,
      aircraft_model_designation: data.aircraft_model_designation,
      aircraft_serial_no: data.aircraft_serial_no,
      engine_builder_name: data.engine_builder_name,
      engine_model_designation: data.engine_model_designation,
      number_of_engines: data.number_of_engines,
      propeller_builder_name: data.propeller_builder_name,
      propeller_model_designation: data.propeller_model_designation,
      number_of_aircraft: data.number_of_aircraft,
      imported_aircraft: isImport === "Yes" ? true : false,
      property_address: data.property_address,
    };
    properties(datas);
    toogleStep(step + 1);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
            <input
              type="text"
              className="form-control"
              {...register("property_address", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Property Address *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("registration_mark", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Registration Mark *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("aircraft_builder_name", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Aircraft Builder's Name *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("aircraft_model_designation", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>
              Aircraft Model Designation *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("aircraft_serial_no", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Aircraft Serial No. *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine_builder_name", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Engine Builder's Name *</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine_model_designation", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>
              Engine Model Designation *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("number_of_engines", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Number of Engines *</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("propeller_builder_name", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>
              Propeller Builder's Name *
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("propeller_model_designation", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>
              Propeller Model Designation *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <span style={{ fontWeight: "600" }}>
              Is the aircraft an import? *
            </span>
            <select
              className="form-control"
              onChange={(e) => {
                setIsImport(e.target.value);
              }}
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Col>
          <Col>
            <span style={{ fontWeight: "600" }}>Number of Aircraft *</span>
            <input
              type="text"
              className="form-control"
              {...register("number_of_aircraft", { required: true })}
            />
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

export default JetForm;
