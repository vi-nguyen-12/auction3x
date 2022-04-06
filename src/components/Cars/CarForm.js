import React, { useState, useEffect } from "react";
import { Table, Row, Col, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CarForm({ toogleStep, step, properties }) {
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
    if (params.id) {
      const property = prop.filter((item) => item._id === params.id);
      setMake(property[0].details.make ? property[0].details.make : "");
      setModel(property[0].details.model ? property[0].details.model : "");
      setYear(property[0].details.year ? property[0].details.year : "");
      setMileage(
        property[0].details.mileage ? property[0].details.mileage : ""
      );
      setTransmission(
        property[0].details.transmission ? property[0].details.transmission : ""
      );
      setCarType(
        property[0].details.car_type ? property[0].details.car_type : ""
      );
      setPower(property[0].details.power ? property[0].details.power : "");
      setColor(property[0].details.color ? property[0].details.color : "");
      setVin(property[0].details.VIN ? property[0].details.VIN : "");
      setEngine(property[0].details.engine ? property[0].details.engine : "");
      setFuelType(
        property[0].details.fuel_type ? property[0].details.fuel_type : ""
      );
      setCondition(
        property[0].details.condition ? property[0].details.condition : ""
      );
      setPrice(property[0].details.price ? property[0].details.price : "");
      setAddress(
        property[0].details.property_address
          ? property[0].details.property_address
          : ""
      );
    }
  }, [prop]);

  const onSubmit = (data) => {
    if (
      year !== "" &&
      make !== "" &&
      model !== "" &&
      vin !== "" &&
      mileage !== "" &&
      price !== "" &&
      address !== "" &&
      color !== "" &&
      transmission !== "" &&
      carType !== "" &&
      power !== "" &&
      engine !== "" &&
      condition !== "" &&
      fuelType !== ""
    ) {
      const datas = {
        make: data.make,
        model: data.model,
        year: data.year,
        mileage: data.mileage,
        transmission: data.transmission,
        car_type: data.carType,
        power: data.power,
        color: data.color,
        VIN: data.vin,
        engine: data.engine,
        fuel_type: data.fuelType,
        condition: data.condition,
        price: data.price,
        property_address: data.address,
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
              name="year"
              className="form-control"
              defaultValue={year ? year : ""}
              {...register("year", { required: false })}
            />
          </Col>
          <Col>
            <label>Make</label>
            <input
              type="text"
              name="make"
              className="form-control"
              defaultValue={make ? make : ""}
              {...register("make", { required: false })}
            />
          </Col>
          <Col>
            <label>Model</label>
            <input
              type="text"
              name="model"
              className="form-control"
              defaultValue={model ? model : ""}
              {...register("model", { required: false })}
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
              defaultValue={vin ? vin : ""}
              {...register("vin", { required: false })}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <label>Mileage</label>
            <input
              type="number"
              name="mileage"
              className="form-control"
              defaultValue={mileage ? mileage : ""}
              {...register("mileage", { required: false })}
            />
          </Col>
          <Col>
            <label>Transmission</label>
            <input
              type="text"
              name="transmission"
              className="form-control"
              defaultValue={transmission ? transmission : ""}
              {...register("transmission", { required: false })}
            />
          </Col>
          <Col>
            <label>Car Type</label>
            <input
              type="text"
              name="carType"
              className="form-control"
              defaultValue={carType ? carType : ""}
              {...register("carType", { required: false })}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <label>Power</label>
            <input
              type="number"
              name="power"
              className="form-control"
              defaultValue={power ? power : ""}
              {...register("power", { required: false })}
            />
          </Col>
          <Col>
            <label>Engine</label>
            <input
              type="text"
              name="engine"
              className="form-control"
              defaultValue={engine ? engine : ""}
              {...register("engine", { required: false })}
            />
          </Col>
          <Col>
            <label>Fuel Type</label>
            <input
              type="text"
              name="fuelType"
              className="form-control"
              defaultValue={fuelType ? fuelType : ""}
              {...register("fuelType", { required: false })}
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
              defaultValue={color ? color : ""}
              {...register("color", { required: false })}
            />
          </Col>
          <Col>
            <label>Condition</label>
            <input
              type="text"
              name="condition"
              className="form-control"
              defaultValue={condition ? condition : ""}
              {...register("condition", { required: false })}
            />
          </Col>
          <Col>
            <label>Price</label>
            <input
              type="number"
              name="price"
              className="form-control"
              defaultValue={price ? price : ""}
              {...register("price", { required: false })}
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
              defaultValue={address ? address : ""}
              {...register("address", { required: false })}
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
