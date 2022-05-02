import React, { useState, useEffect } from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CarForm({ toogleStep, step, properties, property }) {
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

  const params = useParams();
  const prop = useSelector((state) => state.incompProperty);

  useEffect(() => {
    if (params.id && prop.length > 0) {
      const properti = prop.filter((item) => item._id === params.id);
      setMake(
        properti[0].details.make
          ? properti[0].details.make
          : property.make
            ? property.make
            : ""
      );
      setModel(
        properti[0].details.model
          ? properti[0].details.model
          : property.model
            ? property.model
            : ""
      );
      setYear(
        properti[0].details.year
          ? properti[0].details.year
          : property.year
            ? property.year
            : ""
      );
      setMileage(
        properti[0].details.mileage
          ? properti[0].details.mileage
          : property.mileage
            ? property.mileage
            : ""
      );
      setTransmission(
        properti[0].details.transmission
          ? properti[0].details.transmission
          : property.transmission
            ? property.transmission
            : ""
      );
      setCarType(
        properti[0].details.car_type
          ? properti[0].details.car_type
          : property.car_type
            ? property.car_type
            : ""
      );
      setPower(
        properti[0].details.power
          ? properti[0].details.power
          : property.power
            ? property.power
            : ""
      );
      setColor(
        properti[0].details.color
          ? properti[0].details.color
          : property.color
            ? property.color
            : ""
      );
      setVin(
        properti[0].details.VIN
          ? properti[0].details.VIN
          : property.VIN
            ? property.VIN
            : ""
      );
      setEngine(
        properti[0].details.engine
          ? properti[0].details.engine
          : property.engine
            ? property.engine
            : ""
      );
      setFuelType(
        properti[0].details.fuel_type
          ? properti[0].details.fuel_type
          : property.fuel_type
            ? property.fuel_type
            : ""
      );
      setCondition(
        properti[0].details.condition
          ? properti[0].details.condition
          : property.condition
            ? property.condition
            : ""
      );
      setPrice(
        properti[0].details.price
          ? properti[0].details.price
          : property.price
            ? property.price
            : ""
      );
      setAddress(
        properti[0].details.property_address
          ? properti[0].details.property_address
          : property.property_address
            ? property.property_address
            : ""
      );
    } else {
      setMake(property.make ? property.make : "");
      setModel(property.model ? property.model : "");
      setYear(property.year ? property.year : "");
      setMileage(property.mileage ? property.mileage : "");
      setTransmission(property.transmission ? property.transmission : "");
      setCarType(property.car_type ? property.car_type : "");
      setPower(property.power ? property.power : "");
      setColor(property.color ? property.color : "");
      setVin(property.VIN ? property.VIN : "");
      setEngine(property.engine ? property.engine : "");
      setFuelType(property.fuel_type ? property.fuel_type : "");
      setCondition(property.condition ? property.condition : "");
      setPrice(property.price ? property.price : "");
      setAddress(property.property_address ? property.property_address : "");
    }
  }, [prop]);

  const onSubmit = (data) => {
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
    };
    properties(datas);
    toogleStep(step + 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="list-sell-bottom"
      style={{
        justifyContent: "flex-start",
        display: "block",
        overflowY: "auto",
      }}
    >
      <Container style={{ marginTop: "50px" }}>
        <Row style={{ marginTop: "20px" }}>
          <Col
            style={{
              borderBottom: "2px solid gray",
              fontWeight: "bold",
              fontSize: "20px",
              color: "black",
            }}
          >
            <h3>Car Details</h3>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <label>Year</label>
            <input
              type="number"
              min="0"
              name="year"
              className="form-control"
              defaultValue={year}
              {...register("year", { required: false })}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label>Make</label>
            <input
              type="text"
              name="make"
              className="form-control"
              defaultValue={make}
              {...register("make", { required: false })}
              onChange={(e) => setMake(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label>Model</label>
            <input
              type="text"
              name="model"
              className="form-control"
              defaultValue={model}
              {...register("model", { required: false })}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <label>VIN</label>
            <input
              type="text"
              name="vin"
              className="form-control"
              defaultValue={vin}
              {...register("vin", { required: false })}
              onChange={(e) => setVin(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <label>Mileage</label>
            <input
              type="number"
              min="0"
              name="mileage"
              className="form-control"
              defaultValue={mileage}
              {...register("mileage", { required: false })}
              onChange={(e) => setMileage(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label>Transmission</label>
            <input
              type="text"
              name="transmission"
              className="form-control"
              defaultValue={transmission}
              {...register("transmission", { required: false })}
              onChange={(e) => setTransmission(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label>Car Type</label>
            <input
              type="text"
              name="carType"
              className="form-control"
              defaultValue={carType}
              {...register("carType", { required: false })}
              onChange={(e) => setCarType(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <label>Power</label>
            <input
              type="number"
              min="0"
              name="power"
              className="form-control"
              defaultValue={power}
              {...register("power", { required: false })}
              onChange={(e) => setPower(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label>Engine</label>
            <input
              type="text"
              name="engine"
              className="form-control"
              defaultValue={engine}
              {...register("engine", { required: false })}
              onChange={(e) => setEngine(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label>Fuel Type</label>
            <input
              type="text"
              name="fuelType"
              className="form-control"
              defaultValue={fuelType}
              {...register("fuelType", { required: false })}
              onChange={(e) => setFuelType(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <label>Color</label>
            <input
              type="text"
              name="color"
              className="form-control"
              defaultValue={color}
              {...register("color", { required: false })}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label>Condition</label>
            <input
              type="text"
              name="condition"
              className="form-control"
              defaultValue={condition}
              {...register("condition", { required: false })}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
          </Col>
          <Col>
            <label>Approximate Market Price</label>
            <input
              type="number"
              min="0"
              name="price"
              className="form-control"
              defaultValue={price}
              {...register("price", { required: false })}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <label>Address</label>
            <input
              type="text"
              name="address"
              className="form-control"
              defaultValue={address}
              {...register("address", { required: false })}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Col>
        </Row>
      </Container>

      {/* <Table bordered striped hover>
        <tbody>
          <tr>
            <td style={{ color: "black" }}>Make</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={make ? make : ""}
                {...register("make", { required: false })}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Model</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={model ? model : ""}
                {...register("model", { required: false })}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Year</td>
            <td>
              <input
                type="number"
                className="form-control"
                defaultValue={year ? year : ""}
                {...register("year", { required: false })}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Mileage</td>
            <td>
              <input
                type="number"
                className="form-control"
                defaultValue={mileage ? mileage : ""}
                {...register("mileage", { required: false })}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Transmission</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={transmission ? transmission : ""}
                {...register("transmission")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Car Type</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={carType ? carType : ""}
                {...register("carType")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Power</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={power ? power : ""}
                {...register("power")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Color</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={color ? color : ""}
                {...register("color")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>VIN</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={vin ? vin : ""}
                {...register("vin")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Engine</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={engine ? engine : ""}
                {...register("engine")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Fuel Type</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={fuelType ? fuelType : ""}
                {...register("fuelType")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Condition</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={condition ? condition : ""}
                {...register("condition")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Price</td>
            <td>
              <input
                type="number"
                className="form-control"
                defaultValue={price ? price : ""}
                {...register("price")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Address</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={address ? address : ""}
                {...register("address")}
              />
            </td>
          </tr>
        </tbody>
      </Table> */}
      <div
        className="bottom-btn"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          bottom: "0",
          marginTop: "50px",
        }}
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

export default CarForm;
