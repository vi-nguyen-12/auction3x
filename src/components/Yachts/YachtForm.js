import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function YachtForm({ toogleStep, step, properties }) {
  const { register, handleSubmit } = useForm();
  const [property, setProperty] = useState({});
  const params = useParams();
  const incompleteProperty = useSelector((state) => state.incompProperty);

  useEffect(() => {
    if (params.id) {
      const prop = incompleteProperty.filter((item) => item._id === params.id);
      setProperty(prop[0]);
    }
  }, [incompleteProperty]);

  const onSubmit = (data) => {
    if (
      data.vessel_registration_number !== "" &&
      data.vessel_manufacturing_date !== "" &&
      data.manufacture_mark !== "" &&
      data.manufacturer_name !== "" &&
      data.engine_type !== "" &&
      data.engine_manufacture_name !== "" &&
      data.engine_deck_type !== "" &&
      data.running_cost !== "" &&
      data.no_of_crew_required !== "" &&
      data.property_address !== "" &&
      data.reservedAmount !== "" &&
      data.discussedAmount !== ""
    ) {
      const datas = {
        vessel_registration_number: data.vessel_registration_number,
        vessel_manufacturing_date: data.vessel_manufacturing_date,
        manufacture_mark: data.manufacture_mark,
        manufacturer_name: data.manufacturer_name,
        engine_type: data.engine_type,
        engine_manufacture_name: data.engine_manufacture_name,
        engine_deck_type: data.engine_deck_type,
        running_cost: data.running_cost,
        no_of_crew_required: data.no_of_crew_required,
        detain: data.detain,
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
        <Row style={{ marginTop: "10px" }}>
          <Col
            style={{
              borderBottom: "2px solid gray",
              fontWeight: "bold",
              fontSize: "20px",
              color: "black",
            }}
          >
            Yacht Information
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.vessel_registration_number : ""
              }
              {...register("vessel_registration_number")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Vessel Registration Number{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="date"
              className="form-control"
              defaultValue={
                property ? property.details.vessel_manufacturing_date : ""
              }
              {...register("vessel_manufacturing_date")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Vessel Manufacturing Date{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.property_address : ""}
              {...register("property_address")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Property Address <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.manufacture_mark : ""}
              {...register("manufacture_mark")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Manufacture Mark <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.manufacturer_name : ""}
              {...register("manufacturer_name")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Manufacturer Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>

          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.engine_manufacture_name : ""
              }
              {...register("engine_manufacture_name")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Manufacturer Name{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.engine_type : ""}
              {...register("engine_type")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.engine_deck_type : ""}
              {...register("engine_deck_type")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Deck Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property ? property.details.running_cost : ""}
              {...register("running_cost")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Running Cost <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={
                property ? property.details.no_of_crew_required : ""
              }
              {...register("no_of_crew_required")}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              No. Crew Required <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", height: "200px" }}>
          <Col>
            <textarea
              className="form-control"
              style={{ height: "100%" }}
              placeholder="Other information about the property"
              defaultValue={property ? property.details.detain : ""}
              {...register("detain")}
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

export default YachtForm;
