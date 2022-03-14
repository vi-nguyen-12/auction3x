import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function YachtForm({ toogleStep, step, properties }) {
  const { register, handleSubmit, errors } = useForm();

  // const toogleShowBroker = () =>  setShowBroker(!showBroker);
  // const toogleShowOwner = () =>  setShowOwner(!showOwner);

  const onSubmit = (data) => {
    const datas = {
      ownerName: data.ownerName,
      ownerEmail: data.ownerEmail,
      ownerPhone: data.ownerPhone,
      ownerAddress: data.ownerAddress,
      brokerName: data.brokerName,
      brokerEmail: data.brokerEmail,
      brokerPhone: data.brokerPhone,
      brokerAddress: data.brokerAddress,
      vRegistration: data.vRegistration,
      vRegistrationDate: data.vRegistrationDate,
      manuMark: data.manuMark,
      manuName: data.manuName,
      engineType: data.engineType,
      engineManuName: data.engineManuName,
      engineDeckType: data.engineDeckType,
      runningCost: data.runningCost,
      crew: data.crew,
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
            <span style={{ fontWeight: "600" }}>
              Vessel Registration Number
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
            <span style={{ fontWeight: "600" }}>Vessel Manufacturing Date</span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("manufacture_mark", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Manufacture Mark</span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("manuName", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Manufacturer Name</span>
          </Col>

          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine_manufacture_name", {
                required: true,
              })}
            />
            <span style={{ fontWeight: "600" }}>Engine Manufacturer Name</span>
          </Col>
        </Row>

        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engineType", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Engine Type</span>
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
            <span style={{ fontWeight: "600" }}>Engine Deck Type</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("running_cost", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>Running Cost</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("no_of_crew_required", { required: true })}
            />
            <span style={{ fontWeight: "600" }}>No. Crew Required</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", height:"200px" }}>
          <Col>
            <textarea
              className="form-control"
              style={{ height: "100%" }}
              placeholder="Other information about the property"
              {...register("description", { required: true })}
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
