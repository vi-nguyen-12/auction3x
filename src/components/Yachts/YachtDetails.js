import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../services/authServices";

function YachtDetails({
  property,
  propertyData,
  toogleStep,
  step,
  tooglePropertyData,
  toogleSellStep,
  getPropId,
  propId,
  ownership,
}) {
  const { register, handleSubmit, errors } = useForm();
  const prop = useSelector((state) => state.incompProperty);
  const params = useParams();
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
  const [reservedAmount, setReservedAmount] = useState();
  const [discussedAmount, setDiscussedAmount] = useState();

  useEffect(() => {
    if (params.id) {
      const properti = prop.filter((item) => item._id === params.id);
      setVessel_registration_number(
        properti[0].details.vessel_registration_number
          ? properti[0].details.vessel_registration_number
          : propertyData.vessel_registration_number
          ? propertyData.vessel_registration_number
          : property.vessel_registration_number
          ? property.vessel_registration_number
          : ""
      );
      setVessel_manufacturing_date(
        properti[0].details.vessel_manufacturing_date
          ? properti[0].details.vessel_manufacturing_date
          : propertyData.vessel_manufacturing_date
          ? propertyData.vessel_manufacturing_date
          : property.vessel_manufacturing_date
          ? property.vessel_manufacturing_date
          : ""
      );
      setManufacture_mark(
        properti[0].details.manufacture_mark
          ? properti[0].details.manufacture_mark
          : propertyData.manufacture_mark
          ? propertyData.manufacture_mark
          : property.manufacture_mark
          ? property.manufacture_mark
          : ""
      );
      setManufacturer_name(
        properti[0].details.manufacturer_name
          ? properti[0].details.manufacturer_name
          : propertyData.manufacturer_name
          ? propertyData.manufacturer_name
          : property.manufacturer_name
          ? property.manufacturer_name
          : ""
      );
      setEngine_type(
        properti[0].details.engine_type
          ? properti[0].details.engine_type
          : propertyData.engine_type
          ? propertyData.engine_type
          : property.engine_type
          ? property.engine_type
          : ""
      );
      setEngine_deck_type(
        properti[0].details.engine_deck_type
          ? properti[0].details.engine_deck_type
          : propertyData.engine_deck_type
          ? propertyData.engine_deck_type
          : property.engine_deck_type
          ? property.engine_deck_type
          : ""
      );
      setEngine_manufacture_name(
        properti[0].details.engine_manufacture_name
          ? properti[0].details.engine_manufacture_name
          : propertyData.engine_manufacture_name
          ? propertyData.engine_manufacture_name
          : property.engine_manufacture_name
          ? property.engine_manufacture_name
          : ""
      );
      setRunning_cost(
        properti[0].details.running_cost
          ? properti[0].details.running_cost
          : propertyData.running_cost
          ? propertyData.running_cost
          : property.running_cost
          ? property.running_cost
          : ""
      );
      setNo_of_crew_required(
        properti[0].details.no_of_crew_required
          ? properti[0].details.no_of_crew_required
          : propertyData.no_of_crew_required
          ? propertyData.no_of_crew_required
          : property.no_of_crew_required
          ? property.no_of_crew_required
          : ""
      );
      setProperty_address(
        properti[0].details.property_address
          ? properti[0].details.property_address
          : propertyData.property_address
          ? propertyData.property_address
          : property.property_address
          ? property.property_address
          : ""
      );
      setOtherDetails(
        properti[0].details.otherDetails
          ? properti[0].details.otherDetails
          : propertyData.otherDetails
          ? propertyData.otherDetails
          : property.otherDetails
          ? property.otherDetails
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
    } else {
      setVessel_registration_number(
        propertyData.vessel_registration_number
          ? propertyData.vessel_registration_number
          : property.vessel_registration_number
          ? property.vessel_registration_number
          : ""
      );
      setVessel_manufacturing_date(
        propertyData.vessel_manufacturing_date
          ? propertyData.vessel_manufacturing_date
          : property.vessel_manufacturing_date
          ? property.vessel_manufacturing_date
          : ""
      );
      setManufacture_mark(
        propertyData.manufacture_mark
          ? propertyData.manufacture_mark
          : property.manufacture_mark
          ? property.manufacture_mark
          : ""
      );
      setManufacturer_name(
        propertyData.manufacturer_name
          ? propertyData.manufacturer_name
          : property.manufacturer_name
          ? property.manufacturer_name
          : ""
      );
      setEngine_type(
        propertyData.engine_type
          ? propertyData.engine_type
          : property.engine_type
          ? property.engine_type
          : ""
      );
      setEngine_deck_type(
        propertyData.engine_deck_type
          ? propertyData.engine_deck_type
          : property.engine_deck_type
          ? property.engine_deck_type
          : ""
      );
      setEngine_manufacture_name(
        propertyData.engine_manufacture_name
          ? propertyData.engine_manufacture_name
          : property.engine_manufacture_name
          ? property.engine_manufacture_name
          : ""
      );
      setRunning_cost(
        propertyData.running_cost
          ? propertyData.running_cost
          : property.running_cost
          ? property.running_cost
          : ""
      );
      setNo_of_crew_required(
        propertyData.no_of_crew_required
          ? propertyData.no_of_crew_required
          : property.no_of_crew_required
          ? property.no_of_crew_required
          : ""
      );
      setProperty_address(
        propertyData.property_address
          ? propertyData.property_address
          : property.property_address
          ? property.property_address
          : ""
      );
      setOtherDetails(
        propertyData.others
          ? propertyData.others
          : property.detain
          ? property.detain
          : ""
      );
    }
  }, [params.id, prop]);

  const saveInfo = () => {
    if (propId || params.id) {
      if (otherDetails) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            reservedAmount: parseInt(reservedAmount),
            discussedAmount: parseInt(discussedAmount),
            vessel_registration_number: property.vessel_registration_number
              ? property.vessel_registration_number
              : vessel_registration_number,
            vessel_manufacturing_date: property.vessel_manufacturing_date
              ? property.vessel_manufacturing_date
              : vessel_manufacturing_date,
            manufacture_mark: property.manufacture_mark
              ? property.manufacture_mark
              : manufacture_mark,
            manufacturer_name: property.manufacturer_name
              ? property.manufacturer_name
              : manufacturer_name,
            engine_type: property.engine_type
              ? property.engine_type
              : engine_type,
            engine_manufacture_name: property.engine_manufacture_name
              ? property.engine_manufacture_name
              : engine_manufacture_name,
            engine_deck_type: property.engine_deck_type
              ? property.engine_deck_type
              : engine_deck_type,
            running_cost: property.running_cost
              ? property.running_cost
              : running_cost,
            no_of_crew_required: property.no_of_crew_required
              ? property.no_of_crew_required
              : no_of_crew_required,
            property_address: property.property_address
              ? property.property_address
              : property_address,
            others: property.detain ? property.detain : otherDetails,
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
          id: propId ? propId : params.id,
          details: {
            reservedAmount: parseInt(reservedAmount),
            discussedAmount: parseInt(discussedAmount),
            vessel_registration_number: property.vessel_registration_number
              ? property.vessel_registration_number
              : vessel_registration_number,
            vessel_manufacturing_date: property.vessel_manufacturing_date
              ? property.vessel_manufacturing_date
              : vessel_manufacturing_date,
            manufacture_mark: property.manufacture_mark
              ? property.manufacture_mark
              : manufacture_mark,
            manufacturer_name: property.manufacturer_name
              ? property.manufacturer_name
              : manufacturer_name,
            engine_type: property.engine_type
              ? property.engine_type
              : engine_type,
            engine_manufacture_name: property.engine_manufacture_name
              ? property.engine_manufacture_name
              : engine_manufacture_name,
            engine_deck_type: property.engine_deck_type
              ? property.engine_deck_type
              : engine_deck_type,
            running_cost: property.running_cost
              ? property.running_cost
              : running_cost,
            no_of_crew_required: property.no_of_crew_required
              ? property.no_of_crew_required
              : no_of_crew_required,
            property_address: property.property_address
              ? property.property_address
              : property_address,
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
      }
    } else {
      if (otherDetails) {
        const datas = {
          reservedAmount: parseInt(reservedAmount),
          discussedAmount: parseInt(discussedAmount),
          vessel_registration_number: property.vessel_registration_number
            ? property.vessel_registration_number
            : vessel_registration_number,
          vessel_manufacturing_date: property.vessel_manufacturing_date
            ? property.vessel_manufacturing_date
            : vessel_manufacturing_date,
          manufacture_mark: property.manufacture_mark
            ? property.manufacture_mark
            : manufacture_mark,
          manufacturer_name: property.manufacturer_name
            ? property.manufacturer_name
            : manufacturer_name,
          engine_type: property.engine_type
            ? property.engine_type
            : engine_type,
          engine_manufacture_name: property.engine_manufacture_name
            ? property.engine_manufacture_name
            : engine_manufacture_name,
          engine_deck_type: property.engine_deck_type
            ? property.engine_deck_type
            : engine_deck_type,
          running_cost: property.running_cost
            ? property.running_cost
            : running_cost,
          no_of_crew_required: property.no_of_crew_required
            ? property.no_of_crew_required
            : no_of_crew_required,
          property_address: property.property_address
            ? property.property_address
            : property_address,
          others: property.detain ? property.detain : otherDetails,
          ...ownership,
          step: parseInt(2),
        };
        authService.savePropInfo(datas).then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            toogleSellStep(2);
            getPropId(res.data._id);
            alert("Saved Successfully!");
          }
        });
      } else {
        const datas = {
          reservedAmount: parseInt(reservedAmount),
          discussedAmount: parseInt(discussedAmount),
          vessel_registration_number: property.vessel_registration_number
            ? property.vessel_registration_number
            : vessel_registration_number,
          vessel_manufacturing_date: property.vessel_manufacturing_date
            ? property.vessel_manufacturing_date
            : vessel_manufacturing_date,
          manufacture_mark: property.manufacture_mark
            ? property.manufacture_mark
            : manufacture_mark,
          manufacturer_name: property.manufacturer_name
            ? property.manufacturer_name
            : manufacturer_name,
          engine_type: property.engine_type
            ? property.engine_type
            : engine_type,
          engine_manufacture_name: property.engine_manufacture_name
            ? property.engine_manufacture_name
            : engine_manufacture_name,
          engine_deck_type: property.engine_deck_type
            ? property.engine_deck_type
            : engine_deck_type,
          running_cost: property.running_cost
            ? property.running_cost
            : running_cost,
          no_of_crew_required: property.no_of_crew_required
            ? property.no_of_crew_required
            : no_of_crew_required,
          property_address: property.property_address
            ? property.property_address
            : property_address,
          others: property.detain ? property.detain : otherDetails,
          ...ownership,
          step: parseInt(2),
        };
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
    }
  };

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      if (otherDetails) {
        const submitedData = {
          reservedAmount: data.reservedAmount
            ? parseInt(data.reservedAmount)
            : parseInt(reservedAmount),
          discussedAmount: data.discussedAmount
            ? parseInt(data.discussedAmount)
            : parseInt(discussedAmount),
          vessel_registration_number: data.vessel_registration_number
            ? data.vessel_registration_number
            : vessel_registration_number,
          vessel_manufacturing_date: data.vessel_manufacturing_date
            ? data.vessel_manufacturing_date
            : vessel_manufacturing_date,
          manufacture_mark: data.manufacture_mark
            ? data.manufacture_mark
            : manufacture_mark,
          manufacturer_name: data.manufacturer_name
            ? data.manufacturer_name
            : manufacturer_name,
          engine_type: data.engine_type ? data.engine_type : engine_type,
          engine_manufacture_name: data.engine_manufacture_name
            ? data.engine_manufacture_name
            : engine_manufacture_name,
          engine_deck_type: data.engine_deck_type
            ? data.engine_deck_type
            : engine_deck_type,
          running_cost: data.running_cost ? data.running_cost : running_cost,
          no_of_crew_required: data.no_of_crew_required
            ? data.no_of_crew_required
            : no_of_crew_required,
          property_address: data.property_address
            ? data.property_address
            : property_address,
          others: data.detain
            ? data.detain
            : otherDetails
            ? otherDetails
            : null,
        };
        tooglePropertyData(submitedData);
        toogleStep(step + 1);
      } else {
        const submitedData = {
          reservedAmount: data.reservedAmount
            ? parseInt(data.reservedAmount)
            : parseInt(reservedAmount),
          discussedAmount: data.discussedAmount
            ? parseInt(data.discussedAmount)
            : parseInt(discussedAmount),
          vessel_registration_number: data.vessel_registration_number
            ? data.vessel_registration_number
            : vessel_registration_number,
          vessel_manufacturing_date: data.vessel_manufacturing_date
            ? data.vessel_manufacturing_date
            : vessel_manufacturing_date,
          manufacture_mark: data.manufacture_mark
            ? data.manufacture_mark
            : manufacture_mark,
          manufacturer_name: data.manufacturer_name
            ? data.manufacturer_name
            : manufacturer_name,
          engine_type: data.engine_type ? data.engine_type : engine_type,
          engine_manufacture_name: data.engine_manufacture_name
            ? data.engine_manufacture_name
            : engine_manufacture_name,
          engine_deck_type: data.engine_deck_type
            ? data.engine_deck_type
            : engine_deck_type,
          running_cost: data.running_cost ? data.running_cost : running_cost,
          no_of_crew_required: data.no_of_crew_required
            ? data.no_of_crew_required
            : no_of_crew_required,
          property_address: data.property_address
            ? data.property_address
            : property_address,
        };
        tooglePropertyData(submitedData);
        toogleStep(step + 1);
      }
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="list-sell-bottom"
      style={{ justifyContent: "flex-start", display: "block" }}
    >
      <Container style={{ marginTop: "10px" }}>
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
              defaultValue={vessel_registration_number}
              {...register("vessel_registration_number")}
              onChange={(e) => setVessel_registration_number(e.target.value)}
              required
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
              defaultValue={vessel_manufacturing_date}
              {...register("vessel_manufacturing_date")}
              onChange={(e) => setVessel_manufacturing_date(e.target.value)}
              required
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
              defaultValue={property_address}
              {...register("property_address")}
              onChange={(e) => setProperty_address(e.target.value)}
              required
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
              defaultValue={manufacture_mark}
              {...register("manufacture_mark")}
              onChange={(e) => setManufacture_mark(e.target.value)}
              required
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
              defaultValue={manufacturer_name}
              {...register("manufacturer_name")}
              onChange={(e) => setManufacturer_name(e.target.value)}
              required
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
              defaultValue={engine_manufacture_name}
              {...register("engine_manufacture_name")}
              onChange={(e) => setEngine_manufacture_name(e.target.value)}
              required
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
              defaultValue={engine_type}
              {...register("engine_type")}
              onChange={(e) => setEngine_type(e.target.value)}
              required
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
              defaultValue={engine_deck_type}
              {...register("engine_deck_type")}
              onChange={(e) => setEngine_deck_type(e.target.value)}
              required
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
              defaultValue={running_cost}
              {...register("running_cost")}
              onChange={(e) => setRunning_cost(e.target.value)}
              required
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
              defaultValue={no_of_crew_required}
              {...register("no_of_crew_required")}
              onChange={(e) => setNo_of_crew_required(e.target.value)}
              required
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
              defaultValue={otherDetails}
              placeholder="Other information about the property"
              {...register("detain")}
              onChange={(e) => setOtherDetails(e.target.value)}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="number"
              className="form-control"
              defaultValue={reservedAmount}
              {...register("reservedAmount")}
              onChange={(e) => setReservedAmount(parseInt(e.target.value))}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Reserved Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              defaultValue={discussedAmount}
              {...register("discussedAmount")}
              onChange={(e) => setDiscussedAmount(parseInt(e.target.value))}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Discussed Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
      </Container>
      <div className="bottom-btn">
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
  );
}

export default YachtDetails;
