import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../services/authServices";

function JetDetails({
  property,
  toogleStep,
  step,
  tooglePropertyData,
  propertyData,
  ownership,
  getPropId,
  toogleSellStep,
  propId,
}) {
  const { register, handleSubmit, errors } = useForm();
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
  const [reservedAmount, setReservedAmount] = useState();
  const [discussedAmount, setDiscussedAmount] = useState();

  const params = useParams();
  const prop = useSelector((state) => state.incompProperty);

  const saveInfo = () => {
    if (propId || params.id) {
      const datas = {
        id: propId ? propId : params.id,
        details: {
          registration_mark: registration_mark
            ? registration_mark
            : property.registration_mark,
          aircraft_builder_name: aircraft_builder_name
            ? aircraft_builder_name
            : property.aircraft_builder_name,
          aircraft_model_designation: aircraft_model_designation
            ? aircraft_model_designation
            : property.aircraft_model_designation,
          aircraft_serial_no: aircraft_serial_no
            ? aircraft_serial_no
            : property.aircraft_serial_no,
          engine_builder_name: engine_builder_name
            ? engine_builder_name
            : property.engine_builder_name,
          engine_model_designation: engine_model_designation
            ? engine_model_designation
            : property.engine_model_designation,
          number_of_engines: number_of_engines
            ? number_of_engines
            : property.number_of_engines,
          propeller_builder_name: propeller_builder_name
            ? propeller_builder_name
            : property.propeller_builder_name,
          propeller_model_designation: propeller_model_designation
            ? propeller_model_designation
            : property.propeller_model_designation,
          number_of_aircraft: number_of_aircraft
            ? number_of_aircraft
            : property.number_of_aircraft,
          imported_aircraft: property.imported_aircraft
            ? property.imported_aircraft
            : isImport === "Yes"
            ? true
            : false,
          property_address: address ? address : property.property_address,
          reservedAmount: parseInt(reservedAmount),
          discussedAmount: parseInt(discussedAmount),
          step: parseInt(2),
        },
      };
      authService.saveInfo(datas).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          toogleSellStep(2);
          alert("Saved Successfully!");
        }
      });
    } else {
      const datas = {
        registration_mark: registration_mark
          ? registration_mark
          : property.registration_mark,
        aircraft_builder_name: aircraft_builder_name
          ? aircraft_builder_name
          : property.aircraft_builder_name,
        aircraft_model_designation: aircraft_model_designation
          ? aircraft_model_designation
          : property.aircraft_model_designation,
        aircraft_serial_no: aircraft_serial_no
          ? aircraft_serial_no
          : property.aircraft_serial_no,
        engine_builder_name: engine_builder_name
          ? engine_builder_name
          : property.engine_builder_name,
        engine_model_designation: engine_model_designation
          ? engine_model_designation
          : property.engine_model_designation,
        number_of_engines: number_of_engines
          ? number_of_engines
          : property.number_of_engines,
        propeller_builder_name: propeller_builder_name
          ? propeller_builder_name
          : property.propeller_builder_name,
        propeller_model_designation: propeller_model_designation
          ? propeller_model_designation
          : property.propeller_model_designation,
        number_of_aircraft: number_of_aircraft
          ? number_of_aircraft
          : property.number_of_aircraft,
        imported_aircraft: isImport ? isImport : property.imported_aircraft,
        property_address: address ? address : property.property_address,
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
        ...ownership,
        step: parseInt(2),
      };
      // delete datas.documents;
      authService.savePropInfo(datas).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          toogleSellStep(2);
          getPropId(res.data._id);
          alert("Saved Successfully!");
        }
      });
    }
  };

  useEffect(() => {
    if (params.id) {
      const properti = prop.filter((prop) => prop._id === params.id);
      setRegistration_mark(
        properti[0].details.registration_mark
          ? properti[0].details.registration_mark
          : propertyData.registration_mark
          ? propertyData.registration_mark
          : property.registration_mark
          ? property.registration_mark
          : ""
      );
      setAircraft_builder_name(
        properti[0].details.aircraft_builder_name
          ? properti[0].details.aircraft_builder_name
          : propertyData.aircraft_builder_name
          ? propertyData.aircraft_builder_name
          : property.aircraft_builder_name
          ? property.aircraft_builder_name
          : ""
      );
      setAircraft_model_designation(
        properti[0].details.aircraft_model_designation
          ? properti[0].details.aircraft_model_designation
          : propertyData.aircraft_model_designation
          ? propertyData.aircraft_model_designation
          : property.aircraft_model_designation
          ? property.aircraft_model_designation
          : ""
      );
      setAircraft_serial_no(
        properti[0].details.aircraft_serial_no
          ? properti[0].details.aircraft_serial_no
          : propertyData.aircraft_serial_no
          ? propertyData.aircraft_serial_no
          : property.aircraft_serial_no
          ? property.aircraft_serial_no
          : ""
      );
      setEngine_builder_name(
        properti[0].details.engine_builder_name
          ? properti[0].details.engine_builder_name
          : propertyData.engine_builder_name
          ? propertyData.engine_builder_name
          : property.engine_builder_name
          ? property.engine_builder_name
          : ""
      );
      setEngine_model_designation(
        properti[0].details.engine_model_designation
          ? properti[0].details.engine_model_designation
          : propertyData.engine_model_designation
          ? propertyData.engine_model_designation
          : property.engine_model_designation
          ? property.engine_model_designation
          : ""
      );
      setNumber_of_engines(
        properti[0].details.number_of_engines
          ? properti[0].details.number_of_engines
          : propertyData.number_of_engines
          ? propertyData.number_of_engines
          : property.number_of_engines
          ? property.number_of_engines
          : ""
      );
      setPropeller_builder_name(
        properti[0].details.propeller_builder_name
          ? properti[0].details.propeller_builder_name
          : propertyData.propeller_builder_name
          ? propertyData.propeller_builder_name
          : property.propeller_builder_name
          ? property.propeller_builder_name
          : ""
      );
      setPropeller_model_designation(
        properti[0].details.propeller_model_designation
          ? properti[0].details.propeller_model_designation
          : propertyData.propeller_model_designation
          ? propertyData.propeller_model_designation
          : property.propeller_model_designation
          ? property.propeller_model_designation
          : ""
      );
      setNumber_of_aircraft(
        properti[0].details.number_of_aircraft
          ? properti[0].details.number_of_aircraft
          : propertyData.number_of_aircraft
          ? propertyData.number_of_aircraft
          : property.number_of_aircraft
          ? property.number_of_aircraft
          : ""
      );
      setAddress(
        properti[0].details.property_address
          ? properti[0].details.property_address
          : propertyData.property_address
          ? propertyData.property_address
          : property.property_address
          ? property.property_address
          : ""
      );
      setReservedAmount(
        properti[0].reservedAmount
          ? properti[0].reservedAmount
          : propertyData.reservedAmount
          ? propertyData.reservedAmount
          : ""
      );
      setDiscussedAmount(
        properti[0].discussedAmount
          ? properti[0].discussedAmount
          : propertyData.discussedAmount
          ? propertyData.discussedAmount
          : ""
      );
      setIsImport(
        properti[0].details.imported_aircraft
          ? properti[0].details.imported_aircraft
          : propertyData.imported_aircraft
          ? propertyData.imported_aircraft
          : property.imported_aircraft
          ? property.imported_aircraft
          : ""
      );
    } else {
      setRegistration_mark(
        propertyData.registration_mark
          ? propertyData.registration_mark
          : property.registration_mark
          ? property.registration_mark
          : ""
      );
      setAircraft_builder_name(
        propertyData.aircraft_builder_name
          ? propertyData.aircraft_builder_name
          : property.aircraft_builder_name
          ? property.aircraft_builder_name
          : ""
      );
      setAircraft_model_designation(
        propertyData.aircraft_model_designation
          ? propertyData.aircraft_model_designation
          : property.aircraft_model_designation
          ? property.aircraft_model_designation
          : ""
      );
      setAircraft_serial_no(
        propertyData.aircraft_serial_no
          ? propertyData.aircraft_serial_no
          : property.aircraft_serial_no
          ? property.aircraft_serial_no
          : ""
      );
      setEngine_builder_name(
        propertyData.engine_builder_name
          ? propertyData.engine_builder_name
          : property.engine_builder_name
          ? property.engine_builder_name
          : ""
      );
      setEngine_model_designation(
        propertyData.engine_model_designation
          ? propertyData.engine_model_designation
          : property.engine_model_designation
          ? property.engine_model_designation
          : ""
      );
      setNumber_of_engines(
        propertyData.number_of_engines
          ? propertyData.number_of_engines
          : property.number_of_engines
          ? property.number_of_engines
          : ""
      );
      setPropeller_builder_name(
        propertyData.propeller_builder_name
          ? propertyData.propeller_builder_name
          : property.propeller_builder_name
          ? property.propeller_builder_name
          : ""
      );
      setPropeller_model_designation(
        propertyData.propeller_model_designation
          ? propertyData.propeller_model_designation
          : property.propeller_model_designation
          ? property.propeller_model_designation
          : ""
      );
      setNumber_of_aircraft(
        propertyData.number_of_aircraft
          ? propertyData.number_of_aircraft
          : property.number_of_aircraft
          ? property.number_of_aircraft
          : ""
      );
      setAddress(
        propertyData.property_address
          ? propertyData.property_address
          : property.property_address
          ? property.property_address
          : ""
      );
      setReservedAmount(propertyData ? propertyData.reservedAmount : "");
      setDiscussedAmount(propertyData ? propertyData.discussedAmount : "");
      setIsImport(
        propertyData.imported_aircraft
          ? propertyData.imported_aircraft
          : property.imported_aircraft
          ? property.imported_aircraft
          : ""
      );
    }
  }, []);

  console.log(isImport);

  const onSubmit = (data) => {
    if (parseInt(reservedAmount) <= parseInt(discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
        registration_mark: registration_mark
          ? registration_mark
          : property.registration_mark,
        aircraft_builder_name: aircraft_builder_name
          ? aircraft_builder_name
          : property.aircraft_builder_name,
        aircraft_model_designation: aircraft_model_designation
          ? aircraft_model_designation
          : property.aircraft_model_designation,
        aircraft_serial_no: aircraft_serial_no
          ? aircraft_serial_no
          : property.aircraft_serial_no,
        engine_builder_name: engine_builder_name
          ? engine_builder_name
          : property.engine_builder_name,
        engine_model_designation: engine_model_designation
          ? engine_model_designation
          : property.engine_model_designation,
        number_of_engines: number_of_engines
          ? number_of_engines
          : property.number_of_engines,
        propeller_builder_name: propeller_builder_name
          ? propeller_builder_name
          : property.propeller_builder_name,
        propeller_model_designation: propeller_model_designation
          ? propeller_model_designation
          : property.propeller_model_designation,
        number_of_aircraft: number_of_aircraft
          ? number_of_aircraft
          : property.number_of_aircraft,
        imported_aircraft: property.imported_aircraft
          ? property.imported_aircraft
          : isImport,
        property_address: address ? address : property.property_address,
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
      };
      tooglePropertyData(submitedData);
      toogleStep(step + 1);
    }
  };
  return (
    <>
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
                defaultValue={address}
                {...register("property_address")}
                onChange={(e) => setAddress(e.target.value)}
                required
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
          <Row style={{ marginTop: "20px" }}>
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
          <Row style={{ marginTop: "20px" }}>
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
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <input
                type="text"
                className="form-control"
                defaultValue={engine_builder_name}
                {...register("engine_builder_name")}
                onChange={(e) => setEngine_builder_name(e.target.value)}
                required
              />
              <span style={{ fontWeight: "600", color: "black" }}>
                Engine Builder's Name{" "}
                <span style={{ color: "#ff0000" }}>*</span>
              </span>
            </Col>
            <Col>
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
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <input
                type="number"
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
            <Col>
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
            <Col>
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
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <span style={{ fontWeight: "600", color: "black" }}>
                Is the aircraft an import?{" "}
                <span style={{ color: "#ff0000" }}>*</span>
              </span>
              <select
                className="form-control"
                value={isImport}
                onChange={(e) => {
                  setIsImport(e.target.value);
                }}
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
                className="form-control"
                defaultValue={number_of_aircraft}
                {...register("number_of_aircraft")}
                onChange={(e) => setNumber_of_aircraft(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "20px" }}>
            <Col>
              <span style={{ fontWeight: "600", color: "black" }}>
                Reserved Amount <span style={{ color: "#ff0000" }}>*</span>
              </span>
              <input
                type="number"
                className="form-control"
                defaultValue={reservedAmount}
                {...register("reservedAmount")}
                onChange={(e) => setReservedAmount(e.target.value)}
                required
              />
            </Col>
            <Col>
              <span style={{ fontWeight: "600", color: "black" }}>
                Discussed Amount <span style={{ color: "#ff0000" }}>*</span>
              </span>
              <input
                type="number"
                className="form-control"
                defaultValue={discussedAmount}
                {...register("discussedAmount")}
                onChange={(e) => setDiscussedAmount(e.target.value)}
                required
              />
            </Col>
          </Row>
        </Container>

        <div
          className="bottom-btn"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <div
            style={{
              position: "absolute",
              left: "50px",
            }}
          >
            <Button onClick={saveInfo}>Save</Button>
          </div>
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
    </>
  );
}

export default JetDetails;
