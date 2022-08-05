import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import NumberFormat from "react-number-format";
import authService from "../../../services/authServices";

function Jet({ property, setEdit, edit, setRefresh, refresh }) {
  const [other, setOther] = useState(false);
  const [isImported, setIsImported] = useState(
    property.details.imported_aircraft
  );

  const builder = [
    "AIRBUS",
    "BOEING",
    "EMBRAER",
    "BEECHCRAFT",
    "BOMBARDIER",
    "DASSAULT AVIATION",
    "BOMBURDIER",
    "CESSNA",
    "DASSAULT",
    "GULFSTREAM",
    "PIAGGIO",
    "PILATUS",
  ];

  const onSubmit = async (prop, step) => {
    if (step === 2) {
      let submitedData = {
        registration_mark: prop.details.registration_mark,
        aircraft_builder_name: prop.details.aircraft_builder_name,
        aircraft_model_designation: prop.details.aircraft_model_designation,
        aircraft_serial_no: prop.details.aircraft_serial_no,
        engine_builder_name: prop.details.engine_builder_name,
        engine_model_designation: prop.details.engine_model_designation,
        number_of_engines: parseInt(prop.details.number_of_engines),
        propeller_builder_name: prop.details.propeller_builder_name,
        year_built: parseInt(prop.details.year_built),
        propeller_model_designation: prop.details.propeller_model_designation,
        imported_aircraft: isImported,
        description: {
          summary: prop.details.description.summary,
          investment: prop.details.description.investment,
          location: prop.details.description.location,
          market: prop.details.description.market,
        },
        property_address: {
          formatted_street_address:
            prop.details.property_address.formatted_street_address,
          country: prop.details.property_address.country,
          state: prop.details.property_address.state,
          city: prop.details.property_address.city,
          zip_code: prop.details.property_address.zip_code,
          lat: prop.details.property_address.lat,
          lng: prop.details.property_address.lng,
        },
        reservedAmount: parseInt(prop.reservedAmount),
        discussedAmount: parseInt(prop.discussedAmount),
        step: 2,
      };
      await authService.editProp(submitedData, prop._id).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("Property updated successfully");
          setRefresh(!refresh);
        }
      });
    }
  };

  return (
    <>
      <Row className="mt-3">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Registration Mark
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.registration_mark}
            onChange={(e) =>
              (property.details.registration_mark = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={4}>
          <span style={{ fontWeight: "600", color: "black" }}>
            Aircraft Manufacturer
          </span>
          {other ? (
            <>
              <input
                type="text"
                placeholder="Enter Aircraft Manufacturer"
                className="form-control"
                style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
                defaultValue={property.details.aircraft_builder_name}
                onChange={(e) =>
                  (property.details.aircraft_builder_name = e.target.value)
                }
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
              value={property.details.aircraft_builder_name}
              onChange={(e) => {
                if (e.target.value !== "") {
                  if (e.target.value !== "Other") {
                    property.details.aircraft_builder_name = e.target.value;
                  } else {
                    e.target.value === "Other"
                      ? setOther(true)
                      : setOther(false);
                  }
                } else {
                  property.details.aircraft_builder_name =
                    property.details.aircraft_builder_name;
                }
              }}
              disabled={!edit.step2_1}
            >
              <option value=""></option>
              {builder.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
              <option value="Other">Other</option>
            </Form.Select>
          )}
        </Col>
        <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
          <span style={{ fontWeight: "600", color: "black" }}>
            Aircraft Model Designation{" "}
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.aircraft_model_designation}
            onChange={(e) =>
              (property.details.aircraft_model_designation = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
        <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
          <span style={{ fontWeight: "600", color: "black" }}>Year Built</span>
          <NumberFormat
            format="####"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            placeholder="YYYY"
            value={property.details.year_built}
            onValueChange={(values) => {
              const { value } = values;
              property.details.year_built = value;
            }}
            name="year"
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Aircraft Serial No.
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.aircraft_serial_no}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
            onChange={(e) =>
              (property.details.aircraft_serial_no = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={6}>
          <span style={{ fontWeight: "600", color: "black" }}>
            Engine Builder's Name
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.engine_builder_name}
            onChange={(e) =>
              (property.details.engine_builder_name = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
        <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
          <span style={{ fontWeight: "600", color: "black" }}>
            Engine Model Designation
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.engine_model_designation}
            onChange={(e) =>
              (property.details.engine_model_designation = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Number of Engines
          </span>
          <NumberFormat
            format="#"
            thousandSeparator={true}
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            allowNegative={false}
            value={property.details.number_of_engines}
            onValueChange={(values) => {
              const { value } = values;
              property.details.number_of_engines = value;
            }}
            name="number_of_engines"
            disabled={!edit.step2_1}
          />
        </Col>
        <Col className="mt-sm-3 mt-md-0">
          <span style={{ fontWeight: "600", color: "black" }}>
            Propeller Builder's Name
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.propeller_builder_name}
            onChange={(e) =>
              (property.details.propeller_builder_name = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
        <Col className="mt-sm-3 mt-md-0">
          <span style={{ fontWeight: "600", color: "black" }}>
            Propeller Model Designation{" "}
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.propeller_model_designation}
            onChange={(e) =>
              (property.details.propeller_model_designation = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={12} className="d-grid justify-content-center">
          <span style={{ fontWeight: "600", color: "black" }}>
            Is the aircraft an import?{" "}
          </span>
          <div className="form-check form-check-inline">
            <input
              checked={isImported === true ? true : false}
              type="radio"
              name="is_import"
              id="yes"
              value={true}
              onChange={(e) => setIsImported(true)}
              disabled={!edit.step2_1}
            />{" "}
            <label htmlFor="yes" style={{ fontWeight: "600", color: "black" }}>
              Yes &nbsp;
            </label>{" "}
            <input
              checked={isImported === false ? true : false}
              type="radio"
              name="is_import"
              id="no"
              value={false}
              onChange={(e) => setIsImported(false)}
              disabled={!edit.step2_1}
            />{" "}
            <label htmlFor="no" style={{ fontWeight: "600", color: "black" }}>
              No
            </label>
          </div>
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
          {edit.step2_1 ? (
            <Button onClick={() => onSubmit(property, 2)}>Save</Button>
          ) : null}
        </Col>
      </Row>
    </>
  );
}

export default Jet;
