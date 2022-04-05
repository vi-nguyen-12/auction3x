import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function JetForm({ toogleStep, step, properties }) {
  const { register, handleSubmit } = useForm();
  const [isImport, setIsImport] = useState();
  const [property, setProperty] = useState();
  const incompleteProperty = useSelector((state) => state.incompProperty);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      const prop = incompleteProperty.filter((item) => item._id === params.id);
      setProperty(prop[0]);
    }
  }, []);

  const onSubmit = (data) => {
    if (
      data.registration_mark !== "" &&
      data.aircraft_builder_name !== "" &&
      data.aircraft_model_designation !== "" &&
      data.aircraft_serial_no !== "" &&
      data.engine_builder_name !== "" &&
      data.engine_model_designation !== "" &&
      data.number_of_engines !== "" &&
      data.propeller_builder_name !== "" &&
      data.propeller_model_designation !== "" &&
      data.number_of_aircraft !== "" &&
      isImport !== null &&
      data.property_address !== ""
    ) {
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
        imported_aircraft: isImport,
        property_address: data.property_address,
      };
      properties(datas);
      toogleStep(step + 1);
    } else {
      alert("Please fill all the required fields");
    }
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
              color: "black",
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
              defaultValue={property ? property.details.property_address : ""}
              {...register("property_address")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Property Address <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.registration_mark : ""}
              {...register("registration_mark")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Registration Mark <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.aircraft_builder_name : ""
              }
              {...register("aircraft_builder_name")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Builder's Name{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.aircraft_model_designation : ""
              }
              {...register("aircraft_model_designation")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.aircraft_serial_no : ""}
              {...register("aircraft_serial_no")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Serial No. <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.engine_builder_name : ""
              }
              {...register("engine_builder_name")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Engine Builder's Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.engine_model_designation : ""
              }
              {...register("engine_model_designation")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Engine Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.number_of_engines : ""}
              {...register("number_of_engines")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Number of Engines <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.propeller_builder_name : ""
              }
              {...register("propeller_builder_name")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Propeller Builder's Name{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.propeller_model_designation : ""
              }
              {...register("propeller_model_designation")}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Propeller Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Is the aircraft an import?{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <select
              className="form-control"
              onChange={(e) => {
                setIsImport(e.target.value === "Yes" ? true : false);
              }}
              defaultValue={
                property
                  ? property.details.imported_aircraft === true
                    ? "Yes"
                    : "No"
                  : null
              }
            >
              <option value="">Select</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </Col>
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Number of Aircraft <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.number_of_aircraft : ""}
              {...register("number_of_aircraft")}
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
