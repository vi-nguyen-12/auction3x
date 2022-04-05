import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";

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

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      authService.getIncompleteProperty(params.userId).then((res) => {
        const property = res.data.filter((prop) => prop._id === params.id);
        console.log(property);
        setMake(property[0].details.make ? property[0].details.make : "");
        setModel(property[0].details.model ? property[0].details.model : "");
        setYear(property[0].details.year ? property[0].details.year : "");
        setMileage(
          property[0].details.mileage ? property[0].details.mileage : ""
        );
        setTransmission(
          property[0].details.transmission
            ? property[0].details.transmission
            : ""
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
        setReservedAmount(
          property[0].reservedAmount ? property[0].reservedAmount : ""
        );
        setDiscussedAmount(
          property[0].discussedAmount ? property[0].discussedAmount : ""
        );
      });
    }
  }, []);

  const saveInfo = () => {
    if (propId || params.id) {
      const datas = {
        id: propId ? propId : params.id,
        details: {
          make: make ? make : property.make,
          model: model ? model : property.model,
          year: year ? year : property.year,
          mileage: mileage ? mileage : property.mileage,
          transmission: transmission ? transmission : property.transmission,
          car_type: carType ? carType : property.car_type,
          power: power ? power : property.power,
          color: color ? color : property.color,
          VIN: vin ? vin : property.VIN,
          engine: engine ? engine : property.engine,
          fuel_type: fuelType ? fuelType : property.fuel_type,
          condition: condition ? condition : property.condition,
          price: price ? price : property.price,
          property_address: address ? address : property.property_address,
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
        make: make ? make : property.make,
        model: model ? model : property.model,
        year: year ? year : property.year,
        mileage: mileage ? mileage : property.mileage,
        transmission: transmission ? transmission : property.transmission,
        car_type: carType ? carType : property.car_type,
        power: power ? power : property.power,
        color: color ? color : property.color,
        VIN: vin ? vin : property.VIN,
        engine: engine ? engine : property.engine,
        fuel_type: fuelType ? fuelType : property.fuel_type,
        condition: condition ? condition : property.condition,
        price: price ? price : property.price,
        property_address: address ? address : property.property_address,
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
        ...ownership,
        step: parseInt(2),
      };
      delete datas.documents;
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
    } else if (
      make !== "" &&
      model !== "" &&
      year !== "" &&
      mileage !== "" &&
      transmission !== "" &&
      carType !== "" &&
      power !== "" &&
      color !== "" &&
      vin !== "" &&
      engine !== "" &&
      fuelType !== "" &&
      condition !== "" &&
      price !== "" &&
      address !== "" &&
      reservedAmount !== "" &&
      discussedAmount !== ""
    ) {
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
    } else {
      alert("Please fill in property details");
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
              {...register("make", { maxLength: 100 })}
              onChange={(e) => setMake(e.target.value)}
              defaultValue={property.make ? property.make : make}
            />
            <span style={{ color: "black" }}>Make</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("model", { maxLength: 100 })}
              onChange={(e) => setModel(e.target.value)}
              defaultValue={property.model ? property.model : model}
            />
            <span style={{ color: "black" }}>Model</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("year", { maxLength: 100 })}
              onChange={(e) => setYear(e.target.value)}
              defaultValue={property.year ? property.year : year}
            />
            <span style={{ color: "black" }}>Year</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("mileage", { maxLength: 100 })}
              onChange={(e) => setMileage(e.target.value)}
              defaultValue={property.mileage ? property.mileage : mileage}
            />
            <span style={{ color: "black" }}>Mileage</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("transmission", { maxLength: 100 })}
              onChange={(e) => setTransmission(e.target.value)}
              defaultValue={
                property.transmission ? property.transmission : transmission
              }
            />
            <span style={{ color: "black" }}>Transmission</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("carType", { maxLength: 100 })}
              onChange={(e) => setCarType(e.target.value)}
              defaultValue={property.car_type ? property.car_type : carType}
            />
            <span style={{ color: "black" }}>Car Type</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("power", { maxLength: 100 })}
              onChange={(e) => setPower(e.target.value)}
              defaultValue={property.power ? property.power : power}
            />
            <span style={{ color: "black" }}>Power</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("color", { maxLength: 100 })}
              onChange={(e) => setColor(e.target.value)}
              defaultValue={property.color ? property.color : color}
            />
            <span style={{ color: "black" }}>Color</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("vin", { maxLength: 100 })}
              onChange={(e) => setVin(e.target.value)}
              defaultValue={property.VIN ? property.VIN : vin}
            />
            <span style={{ color: "black" }}>VIN</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine", { maxLength: 100 })}
              onChange={(e) => setEngine(e.target.value)}
              defaultValue={property.engine ? property.engine : engine}
            />
            <span style={{ color: "black" }}>Engine</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("fuelType", { maxLength: 100 })}
              onChange={(e) => setFuelType(e.target.value)}
              defaultValue={property.fuel_type ? property.fuel_type : fuelType}
            />
            <span style={{ color: "black" }}>Fuel Type</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("condition", { maxLength: 100 })}
              onChange={(e) => setCondition(e.target.value)}
              defaultValue={property.condition ? property.condition : condition}
            />
            <span style={{ color: "black" }}>Condition</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("price", { maxLength: 100 })}
              onChange={(e) => setPrice(e.target.value)}
              defaultValue={property.price ? property.price : price}
            />
            <span style={{ color: "black" }}>Price</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("address", { maxLength: 100 })}
              onChange={(e) => setAddress(e.target.value)}
              defaultValue={
                property.property_address ? property.property_address : address
              }
            />
            <span style={{ color: "black" }}>Address</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="number"
              className="form-control"
              {...register("reservedAmount")}
              onChange={(e) => setReservedAmount(e.target.value)}
              defaultValue={reservedAmount}
            />
            <span style={{ color: "black" }}>Reserved Amount</span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              {...register("discussedAmount")}
              onChange={(e) => setDiscussedAmount(e.target.value)}
              defaultValue={discussedAmount}
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
