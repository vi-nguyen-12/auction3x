import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function YachtForm({ toogleStep, step, properties }) {
  const { register, handleSubmit } = useForm();

  // const toogleShowBroker = () =>  setShowBroker(!showBroker);
  // const toogleShowOwner = () =>  setShowOwner(!showOwner);

  const onSubmit = (data) => {
    console.log(data);
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
              color: "black"
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
              {...register("vessel_registration_number", { required: true })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>
              Vessel Registration Number  <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="date"
              className="form-control"
              {...register("vessel_manufacturing_date", { required: true })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>Vessel Manufacturing Date  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("property_address", { required: true })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>Property Address  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("manufacture_mark", { required: true })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>Manufacture Mark  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("manufacturer_name", { required: true })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>Manufacturer Name  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>

          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine_manufacture_name", {
                required: true,
              })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>Engine Manufacturer Name  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine_type", { required: true })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>Engine Type  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine_deck_type", {
                required: true,
              })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>Engine Deck Type  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("running_cost", { required: true })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>Running Cost  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("no_of_crew_required", { required: true })}
            />
            <span style={{
              fontWeight: "600",
              color: "black"
            }}>No. Crew Required  <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", height: "200px" }}>
          <Col>
            <textarea
              className="form-control"
              style={{ height: "100%" }}
              placeholder="Other information about the property"
              {...register("detain", { required: true })}
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
    </form >
  );
}

export default YachtForm;
