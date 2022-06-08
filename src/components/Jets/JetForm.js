import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoInformationCircleSharp } from "react-icons/io5";

function JetForm({ toggleStep, step, properties, property }) {
  const { register, handleSubmit } = useForm();
  const [isImport, setIsImport] = useState();
  const [registration_mark, setRegistration_mark] = useState();
  const [aircraft_builder_name, setAircraft_builder_name] = useState();
  const [aircraft_model_designation, setAircraft_model_designation] =
    useState();
  const [aircraft_serial_no, setAircraft_serial_no] = useState();
  const [engine_builder_name, setEngine_builder_name] = useState();
  const [engine_model_designation, setEngine_model_designation] = useState();
  const [number_of_engines, setNumber_of_engines] = useState();
  const [propeller_builder_name, setPropeller_builder_name] = useState();
  const [propeller_model_designation, setPropeller_model_designation] =
    useState();
  const [number_of_aircraft, setNumber_of_aircraft] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [zip, setZip] = useState();

  const prop = useSelector((state) => state.incompProperty);
  const params = useParams();

  useEffect(() => {
    if (params.id && prop.length > 0) {
      const properti = prop.filter((item) => item._id === params.id);
      setRegistration_mark(
        properti[0].details.registration_mark
          ? properti[0].details.registration_mark
          : ""
      );
      setAircraft_builder_name(
        properti[0].details.aircraft_builder_name
          ? properti[0].details.aircraft_builder_name
          : ""
      );
      setAircraft_model_designation(
        properti[0].details.aircraft_model_designation
          ? properti[0].details.aircraft_model_designation
          : ""
      );
      setAircraft_serial_no(
        properti[0].details.aircraft_serial_no
          ? properti[0].details.aircraft_serial_no
          : ""
      );
      setEngine_builder_name(
        properti[0].details.engine_builder_name
          ? properti[0].details.engine_builder_name
          : ""
      );
      setEngine_model_designation(
        properti[0].details.engine_model_designation
          ? properti[0].details.engine_model_designation
          : ""
      );
      setNumber_of_engines(
        properti[0].details.number_of_engines
          ? properti[0].details.number_of_engines
          : ""
      );
      setPropeller_builder_name(
        properti[0].details.propeller_builder_name
          ? properti[0].details.propeller_builder_name
          : ""
      );
      setPropeller_model_designation(
        properti[0].details.propeller_model_designation
          ? properti[0].details.propeller_model_designation
          : ""
      );
      setNumber_of_aircraft(
        properti[0].details.number_of_aircraft
          ? properti[0].details.number_of_aircraft
          : ""
      );
      setAddress(
        properti[0].details.property_address
          ? properti[0].details.property_address.formatted_street_address
            ? properti[0].details.property_address.formatted_street_address
            : ""
          : ""
      );
      setCity(
        properti[0].details.property_address
          ? properti[0].details.property_address.city
            ? properti[0].details.property_address.city
            : ""
          : ""
      );
      setState(
        properti[0].details.property_address
          ? properti[0].details.property_address.state
            ? properti[0].details.property_address.state
            : ""
          : ""
      );
      setCountry(
        properti[0].details.property_address
          ? properti[0].details.property_address.country
            ? properti[0].details.property_address.country
            : ""
          : ""
      );
      setZip(
        properti[0].details.property_address
          ? properti[0].details.property_address.zip_code
            ? properti[0].details.property_address.zip_code
            : ""
          : ""
      );
      setIsImport(
        properti[0].details.imported_aircraft
          ? properti[0].details.imported_aircraft
          : ""
      );
    } else {
      setRegistration_mark(
        property.registration_mark ? property.registration_mark : ""
      );
      setAircraft_builder_name(
        property.aircraft_builder_name ? property.aircraft_builder_name : ""
      );
      setAircraft_model_designation(
        property.aircraft_model_designation
          ? property.aircraft_model_designation
          : ""
      );
      setAircraft_serial_no(
        property.aircraft_serial_no ? property.aircraft_serial_no : ""
      );
      setEngine_builder_name(
        property.engine_builder_name ? property.engine_builder_name : ""
      );
      setEngine_model_designation(
        property.engine_model_designation
          ? property.engine_model_designation
          : ""
      );
      setNumber_of_engines(
        property.number_of_engines ? property.number_of_engines : ""
      );
      setPropeller_builder_name(
        property.propeller_builder_name ? property.propeller_builder_name : ""
      );
      setPropeller_model_designation(
        property.propeller_model_designation
          ? property.propeller_model_designation
          : ""
      );
      setNumber_of_aircraft(
        property.number_of_aircraft ? property.number_of_aircraft : ""
      );
      setAddress(
        property.property_address
          ? property.property_address.formatted_address
            ? property.property_address.formatted_address
            : ""
          : ""
      );
      setCountry(
        property.property_address
          ? property.property_address.country
            ? property.property_address.country
            : ""
          : ""
      );
      setState(
        property.property_address
          ? property.property_address.state
            ? property.property_address.state
            : ""
          : ""
      );
      setCity(
        property.property_address
          ? property.property_address.city
            ? property.property_address.city
            : ""
          : ""
      );
      setZip(
        property.property_address
          ? property.property_address.zip_code
            ? property.property_address.zip_code
            : ""
          : ""
      );
      setIsImport(property.imported_aircraft ? property.imported_aircraft : "");
    }
  }, []);

  const onSubmit = (data) => {
    const datas = {
      registration_mark: data.registration_mark
        ? data.registration_mark
        : registration_mark,
      aircraft_builder_name: data.aircraft_builder_name
        ? data.aircraft_builder_name
        : aircraft_builder_name,
      aircraft_model_designation: data.aircraft_model_designation
        ? data.aircraft_model_designation
        : aircraft_model_designation,
      aircraft_serial_no: data.aircraft_serial_no
        ? data.aircraft_serial_no
        : aircraft_serial_no,
      engine_builder_name: data.engine_builder_name
        ? data.engine_builder_name
        : engine_builder_name,
      engine_model_designation: data.engine_model_designation
        ? data.engine_model_designation
        : engine_model_designation,
      number_of_engines: data.number_of_engines
        ? data.number_of_engines
        : number_of_engines,
      propeller_builder_name: data.propeller_builder_name
        ? data.propeller_builder_name
        : propeller_builder_name,
      propeller_model_designation: data.propeller_model_designation
        ? data.propeller_model_designation
        : propeller_model_designation,
      number_of_aircraft: data.number_of_aircraft
        ? data.number_of_aircraft
        : number_of_aircraft,
      imported_aircraft: isImport,
      property_address: {
        formatted_street_address: data.address
          ? data.address
          : address
          ? address
          : "",
        city: data.city ? data.city : city ? city : "",
        state: data.state ? data.state : state ? state : "",
        country: data.country ? data.country : country ? country : "",
        zip_code: data.zipCode ? data.zipCode : zip ? zip : "",
      },
    };
    properties(datas);
    toggleStep(step + 1);
  };

  return (
    <div className="sell-bottom">
      <h3> Aircraft Description</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="list-form">
        {" "}
        <div
          className="dropdown-icon"
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <IoInformationCircleSharp
            style={{ cursor: "pointer" }}
            color="blue"
            size={30}
          />
          <div className="dropdown-info">
            <p>
              We will be using these details to match you with the right buyer.
            </p>
          </div>
        </div>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={address}
              {...register("property_address")}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Property Address <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              defaultValue={country}
              {...register("country")}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              defaultValue={state}
              {...register("state")}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              defaultValue={city}
              {...register("city")}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              City <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              defaultValue={zip}
              {...register("zipCode")}
              onChange={(e) => setZip(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={registration_mark}
              {...register("registration_mark")}
              onChange={(e) => setRegistration_mark(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Registration Mark <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={aircraft_builder_name}
              {...register("aircraft_builder_name")}
              onChange={(e) => setAircraft_builder_name(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Builder's Name{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={aircraft_model_designation}
              {...register("aircraft_model_designation")}
              onChange={(e) => setAircraft_model_designation(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={aircraft_serial_no}
              {...register("aircraft_serial_no")}
              onChange={(e) => setAircraft_serial_no(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Serial No. <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="text"
              className="form-control"
              defaultValue={engine_builder_name}
              {...register("engine_builder_name")}
              onChange={(e) => setEngine_builder_name(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Engine Builder's Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>

          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              defaultValue={engine_model_designation}
              {...register("engine_model_designation")}
              onChange={(e) => setEngine_model_designation(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Engine Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={number_of_engines}
              {...register("number_of_engines")}
              onChange={(e) => setNumber_of_engines(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Number of Engines <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              defaultValue={propeller_builder_name}
              {...register("propeller_builder_name")}
              onChange={(e) => setPropeller_builder_name(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Propeller Builder's Name{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              defaultValue={propeller_model_designation}
              {...register("propeller_model_designation")}
              onChange={(e) => setPropeller_model_designation(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Propeller Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Is the aircraft an import?{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <select
              className="form-control"
              onChange={(e) => {
                setIsImport(e.target.value);
              }}
              value={isImport}
              required
            >
              <option value="">Select</option>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </Col>
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Number of Aircraft <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={number_of_aircraft}
              {...register("number_of_aircraft")}
              onChange={(e) => setNumber_of_aircraft(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
            Previous
          </Button>
          <Button type="submit" className="nxt-btn" id="next">
            Next
          </Button>
        </Row>
      </form>
    </div>
  );
}

export default JetForm;
