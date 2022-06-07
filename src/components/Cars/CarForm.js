import React, { useState, useEffect } from "react";
import { Table, Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoInformationCircleSharp } from "react-icons/io5";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Overlay from "react-bootstrap/Overlay";

function CarForm({ toggleStep, step, properties, property }) {
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
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [zip, setZip] = useState();

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
          ? properti[0].details.property_address.formatted_street_address
            ? properti[0].details.property_address.formatted_street_address
            : property.property_address.formatted_street_address
            ? property.property_address.formatted_street_address
            : ""
          : ""
      );
      setCity(
        properti[0].details.property_address
          ? properti[0].details.property_address.city
            ? properti[0].details.property_address.city
            : property.property_address.city
            ? property.property_address.city
            : ""
          : ""
      );
      setState(
        properti[0].details.property_address
          ? properti[0].details.property_address.state
            ? properti[0].details.property_address.state
            : property.property_address.state
            ? property.property_address.state
            : ""
          : ""
      );
      setCountry(
        properti[0].details.property_address
          ? properti[0].details.property_address.country
            ? properti[0].details.property_address.country
            : property.property_address.country
            ? property.property_address.country
            : ""
          : ""
      );
      setZip(
        properti[0].details.property_address
          ? properti[0].details.property_address.zip
            ? properti[0].details.property_address.zip
            : property.property_address.zip
            ? property.property_address.zip
            : ""
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
      setAddress(
        property.property_address
          ? property.property_address.formatted_street_address
          : ""
      );
      setCountry(
        property.property_address
          ? property.property_address.country
            ? property.property_address.country
            : ""
          : ""
      );
      setState(
        property.property_address
          ? property.property_address.state
            ? property.property_address.state
            : ""
          : ""
      );
      setCity(
        property.property_address
          ? property.property_address.city
            ? property.property_address.city
            : ""
          : ""
      );
      setZip(
        property.property_address
          ? property.property_address.zip_code
            ? property.property_address.zip_code
            : ""
          : ""
      );
    }
  }, [prop]);

  const onSubmit = (data) => {
    const datas = {
      make: data.make ? data.make : make ? make : "",
      model: data.model ? data.model : model ? model : "",
      year: data.year ? data.year : year ? year : "",
      mileage: data.mileage ? data.mileage : mileage ? mileage : "",
      transmission: data.transmission
        ? data.transmission
        : transmission
        ? transmission
        : "",
      car_type: data.car_type ? data.car_type : carType ? carType : "",
      power: data.power ? data.power : power ? power : "",
      color: data.color ? data.color : color ? color : "",
      VIN: data.vin ? data.vin : vin ? vin : "",
      engine: data.engine ? data.engine : engine ? engine : "",
      fuel_type: data.fuelType ? data.fuelType : fuelType ? fuelType : "",
      condition: data.condition ? data.condition : condition ? condition : "",
      price: data.price ? data.price : price ? price : "",
      property_address: {
        formatted_street_address: data.address
          ? data.address
          : address
          ? address
          : "",
        city: data.city ? data.city : city ? city : "",
        state: data.state ? data.state : state ? state : "",
        country: data.country ? data.country : country ? country : "",
        zip_code: data.zipCode ? data.zipCode : zip ? zip : "",
      },
    };
    properties(datas);
    toggleStep(step + 1);
  };

  return (
    <div className="sell-bottom">
      <h3>Car Details</h3>
      <div style={{display:"flex", justifyContent:'flex-end', width:"100%"}}>
        <OverlayTrigger
          placement="bottom"
          flip={true}
          children={<Tooltip>Make</Tooltip>}
          overlay={
            <Tooltip id="button-tooltip-2">Check out this avatar</Tooltip>
          }
        >
          {({ ref, ...triggerHandler }) => (
            <Button
              variant="light"
              {...triggerHandler}
              className="d-inline-flex align-items-center"
            >
              <IoInformationCircleSharp />
            </Button>
          )}
        </OverlayTrigger>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="list-form">
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <label>Year</label>
            <input
              type="number"
              min="0"
              name="year"
              className="form-control"
              defaultValue={year}
              {...register("year", { required: false, maxLength: 4 })}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
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
        <Row className="mt-3">
          <Col xs={12} md={4}>
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
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
          <Col xs={12} md={4}>
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
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
          <Col xs={12} md={4}>
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
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
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
          <Col className="mt-sm-3 mt-md-0">
            <label>Country</label>
            <input
              type="text"
              name="country"
              className="form-control"
              defaultValue={country}
              {...register("country", { required: false })}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mt-sm-3 mt-md-0">
            <label>State</label>
            <input
              type="text"
              name="state"
              className="form-control"
              defaultValue={state}
              {...register("state", { required: false })}
              onChange={(e) => setState(e.target.value)}
              required
            />
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <label>City</label>
            <input
              type="text"
              name="city"
              className="form-control"
              defaultValue={city}
              {...register("city", { required: false })}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <label>Zip Code</label>
            <input
              type="text"
              name="zipCode"
              className="form-control"
              defaultValue={zip}
              {...register("zipCode", { required: false })}
              onChange={(e) => setZip(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-5 justify-content-center">
          <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
            Previous
          </Button>
          <Button type="submit" className="nxt-btn" id="next">
            Next
          </Button>
        </Row>
      </form>
    </div>
  );
}

export default CarForm;
