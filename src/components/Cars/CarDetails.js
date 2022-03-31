import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";
import authService from "../../services/authServices";

function CarDetails({
  property,
  toogleStep,
  step,
  tooglePropertyData,
  toogleSellStep,
  getPropId,
  propId,
  ownership,
}) {
  const { handleSubmit, register } = useForm();
  const [make, setMake] = useState();
  const [model, setModel] = useState();
  const [year, setYear] = useState();
  const [color, setColor] = useState();
  const [vin, setVin] = useState();
  const [mileage, setMileage] = useState();
  const [engine, setEngine] = useState();
  const [transmission, setTransmission] = useState();
  const [power, setPower] = useState();
  const [carType, setCarType] = useState();
  const [fuelType, setFuelType] = useState();
  const [condition, setCondition] = useState();
  const [price, setPrice] = useState();
  const [address, setAddress] = useState();
  const [reservedAmount, setReservedAmount] = useState();
  const [discussedAmount, setDiscussedAmount] = useState();

  const saveInfo = () => {
    if (propId) {
      const datas = {
        id: propId,
        details: {
          make: make,
          model: model,
          year: year,
          mileage: mileage,
          transmission: transmission,
          car_type: carType,
          power: power,
          color: color,
          VIN: vin,
          engine: engine,
          fuel_type: fuelType,
          condition: condition,
          price: price,
          property_address: address,
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
        make: make,
        model: model,
        year: year,
        mileage: mileage,
        transmission: transmission,
        car_type: carType,
        power: power,
        color: color,
        VIN: vin,
        engine: engine,
        fuel_type: fuelType,
        condition: condition,
        price: price,
        property_address: address,
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
        ...ownership,
        documents: ownership.listing_agreement,
        step: parseInt(2),
      };
      delete datas.listing_agreement;
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

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
        make: make,
        model: model,
        year: year,
        mileage: mileage,
        transmission: transmission,
        car_type: carType,
        power: power,
        color: color,
        VIN: vin,
        engine: engine,
        fuel_type: fuelType,
        condition: condition,
        price: price,
        property_address: address ? address : data.address,
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
      };
      tooglePropertyData(submitedData);
      toogleStep(step + 1);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="list-sell-bottom"
      style={{
        justifyContent: "flex-start",
        display: "block",
        marginTop: "20px",
      }}
    >
      <Container style={{ marginTop: "40px" }}>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("make", { required: true, maxLength: 100 })}
              onChange={(e) => setMake(e.target.value)}
              defaultValue={property.make}
            />
            <span style={{ color: "black" }}>Make</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("model", { required: true, maxLength: 100 })}
              onChange={(e) => setModel(e.target.value)}
              defaultValue={property.model}
            />
            <span style={{ color: "black" }}>Model</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("year", { required: true, maxLength: 100 })}
              onChange={(e) => setYear(e.target.value)}
              defaultValue={property.year}
            />
            <span style={{ color: "black" }}>Year</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("mileage", { required: true, maxLength: 100 })}
              onChange={(e) => setMileage(e.target.value)}
              defaultValue={property.mileage}
            />
            <span style={{ color: "black" }}>Mileage</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("transmission", { required: true, maxLength: 100 })}
              onChange={(e) => setTransmission(e.target.value)}
              defaultValue={property.transmission}
            />
            <span style={{ color: "black" }}>Transmission</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("carType", { required: true, maxLength: 100 })}
              onChange={(e) => setCarType(e.target.value)}
              defaultValue={property.car_type}
            />
            <span style={{ color: "black" }}>Car Type</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("power", { required: true, maxLength: 100 })}
              onChange={(e) => setPower(e.target.value)}
              defaultValue={property.power}
            />
            <span style={{ color: "black" }}>Power</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("color", { required: true, maxLength: 100 })}
              onChange={(e) => setColor(e.target.value)}
              defaultValue={property.color}
            />
            <span style={{ color: "black" }}>Color</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("vin", { required: true, maxLength: 100 })}
              onChange={(e) => setVin(e.target.value)}
              defaultValue={property.VIN}
            />
            <span style={{ color: "black" }}>VIN</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine", { required: true, maxLength: 100 })}
              onChange={(e) => setEngine(e.target.value)}
              defaultValue={property.engine}
            />
            <span style={{ color: "black" }}>Engine</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("fuelType", { required: true, maxLength: 100 })}
              onChange={(e) => setFuelType(e.target.value)}
              defaultValue={property.fuel_type}
            />
            <span style={{ color: "black" }}>Fuel Type</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("condition", { required: true, maxLength: 100 })}
              onChange={(e) => setCondition(e.target.value)}
              defaultValue={property.condition}
            />
            <span style={{ color: "black" }}>Condition</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("price", { required: true, maxLength: 100 })}
              onChange={(e) => setPrice(e.target.value)}
              defaultValue={property.price}
            />
            <span style={{ color: "black" }}>Price</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("address", { required: true, maxLength: 100 })}
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={property.property_address}
            />
            <span style={{ color: "black" }}>Address</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="number"
              className="form-control"
              {...register("reservedAmount", { required: true })}
              onChange={(e) => setReservedAmount(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Reserved Amount</span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              {...register("discussedAmount", { required: true })}
              onChange={(e) => setDiscussedAmount(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Discussed Amount</span>
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

export default CarDetails;
