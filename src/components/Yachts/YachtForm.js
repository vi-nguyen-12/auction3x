import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function YachtForm({ toogleStep, step, properties, property }) {
  const { register, handleSubmit } = useForm();
  const [vessel_registration_number, setVessel_registration_number] =
    useState();
  const [vessel_manufacturing_date, setVessel_manufacturing_date] = useState();
  const [manufacture_mark, setManufacture_mark] = useState();
  const [manufacturer_name, setManufacturer_name] = useState();
  const [engine_type, setEngine_type] = useState();
  const [engine_deck_type, setEngine_deck_type] = useState();
  const [engine_manufacture_name, setEngine_manufacture_name] = useState();
  const [running_cost, setRunning_cost] = useState();
  const [no_of_crew_required, setNo_of_crew_required] = useState();
  const [property_address, setProperty_address] = useState();
  const [otherDetails, setOtherDetails] = useState();

  const params = useParams();
  const prop = useSelector((state) => state.incompProperty);

  useEffect(() => {
    if (params.id) {
      const property = prop.filter((item) => item._id === params.id);
      setVessel_registration_number(
        property[0].details.vessel_registration_number
          ? property[0].details.vessel_registration_number
          : undefined
      );
      setVessel_manufacturing_date(
        property[0].details.vessel_manufacturing_date
          ? property[0].details.vessel_manufacturing_date
          : undefined
      );
      setManufacture_mark(
        property[0].details.manufacture_mark
          ? property[0].details.manufacture_mark
          : undefined
      );
      setManufacturer_name(
        property[0].details.manufacturer_name
          ? property[0].details.manufacturer_name
          : undefined
      );
      setEngine_type(
        property[0].details.engine_type
          ? property[0].details.engine_type
          : undefined
      );
      setEngine_deck_type(
        property[0].details.engine_deck_type
          ? property[0].details.engine_deck_type
          : undefined
      );
      setEngine_manufacture_name(
        property[0].details.engine_manufacture_name
          ? property[0].details.engine_manufacture_name
          : undefined
      );
      setRunning_cost(
        property[0].details.running_cost
          ? property[0].details.running_cost
          : undefined
      );
      setNo_of_crew_required(
        property[0].details.no_of_crew_required
          ? property[0].details.no_of_crew_required
          : undefined
      );
      setProperty_address(
        property[0].details.property_address
          ? prop[0].details.property_address
          : undefined
      );
      setOtherDetails(
        property[0].details.otherDetails
          ? property[0].details.otherDetails
          : undefined
      );
    } else {
      setVessel_registration_number(
        property ? property.vessel_registration_number : undefined
      );
      setVessel_manufacturing_date(
        property ? property.vessel_manufacturing_date : undefined
      );
      setManufacture_mark(property ? property.manufacture_mark : undefined);
      setManufacturer_name(property ? property.manufacturer_name : undefined);
      setEngine_type(property ? property.engine_type : undefined);
      setEngine_deck_type(property ? property.engine_deck_type : undefined);
      setEngine_manufacture_name(
        property ? property.engine_manufacture_name : undefined
      );
      setRunning_cost(property ? property.running_cost : undefined);
      setNo_of_crew_required(
        property ? property.no_of_crew_required : undefined
      );
      setProperty_address(property ? property.property_address : undefined);
      setOtherDetails(property ? property.detain : undefined);
    }
  }, [prop]);

  const onSubmit = (data) => {
    if (
      vessel_registration_number !== undefined &&
      vessel_manufacturing_date !== undefined &&
      manufacture_mark !== undefined &&
      manufacturer_name !== undefined &&
      engine_type !== undefined &&
      engine_manufacture_name !== undefined &&
      engine_deck_type !== undefined &&
      running_cost !== undefined &&
      no_of_crew_required !== undefined &&
      property_address !== undefined
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
                vessel_registration_number ? vessel_registration_number : ""
              }
              {...register("vessel_registration_number")}
              onChange={(e) => setVessel_registration_number(e.target.value)}
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
                vessel_manufacturing_date ? vessel_manufacturing_date : ""
              }
              {...register("vessel_manufacturing_date")}
              onChange={(e) => setVessel_manufacturing_date(e.target.value)}
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
              defaultValue={property_address ? property_address : ""}
              {...register("property_address")}
              onChange={(e) => setProperty_address(e.target.value)}
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
              defaultValue={manufacture_mark ? manufacture_mark : ""}
              {...register("manufacture_mark")}
              onChange={(e) => setManufacture_mark(e.target.value)}
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
              defaultValue={manufacturer_name ? manufacturer_name : ""}
              {...register("manufacturer_name")}
              onChange={(e) => setManufacturer_name(e.target.value)}
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
                engine_manufacture_name ? engine_manufacture_name : ""
              }
              {...register("engine_manufacture_name")}
              onChange={(e) => setEngine_manufacture_name(e.target.value)}
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
              defaultValue={engine_type ? engine_type : ""}
              {...register("engine_type")}
              onChange={(e) => setEngine_type(e.target.value)}
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
              defaultValue={engine_deck_type ? engine_deck_type : ""}
              {...register("engine_deck_type")}
              onChange={(e) => setEngine_deck_type(e.target.value)}
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
              type="number"
              className="form-control"
              defaultValue={running_cost ? running_cost : ""}
              {...register("running_cost")}
              onChange={(e) => setRunning_cost(e.target.value)}
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
              type="number"
              className="form-control"
              defaultValue={no_of_crew_required ? no_of_crew_required : ""}
              {...register("no_of_crew_required")}
              onChange={(e) => setNo_of_crew_required(e.target.value)}
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
              defaultValue={otherDetails ? otherDetails : ""}
              {...register("detain")}
              onChange={(e) => setOtherDetails(e.target.value)}
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
