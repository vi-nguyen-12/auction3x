import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CarDetails({
  property,
  toggleStep,
  step,
  togglePropertyData,
  toggleSellStep,
  getPropId,
  propId,
  ownership,
  propertyData,
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
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [reservedAmount, setReservedAmount] = useState();
  const [discussedAmount, setDiscussedAmount] = useState();

  const params = useParams();
  const prop = useSelector((state) => state.incompProperty);

  useEffect(() => {
    if (params.id && prop.length > 0) {
      const properti = prop.filter((prop) => prop._id === params.id);
      setMake(
        properti[0].details.make
          ? properti[0].details.make
          : propertyData.make
          ? propertyData.make
          : property.make
          ? property.make
          : ""
      );
      setModel(
        properti[0].details.model
          ? properti[0].details.model
          : propertyData.model
          ? propertyData.model
          : property.model
          ? property.model
          : ""
      );
      setYear(
        properti[0].details.year
          ? properti[0].details.year
          : propertyData.year
          ? propertyData.year
          : property.year
          ? property.year
          : ""
      );
      setMileage(
        properti[0].details.mileage
          ? properti[0].details.mileage
          : propertyData.mileage
          ? propertyData.mileage
          : property.mileage
          ? property.mileage
          : ""
      );
      setTransmission(
        properti[0].details.transmission
          ? properti[0].details.transmission
          : propertyData.transmission
          ? propertyData.transmission
          : property.transmission
          ? property.transmission
          : ""
      );
      setCarType(
        properti[0].details.car_type
          ? properti[0].details.car_type
          : propertyData.car_type
          ? propertyData.car_type
          : property.car_type
          ? property.car_type
          : ""
      );
      setPower(
        properti[0].details.power
          ? properti[0].details.power
          : propertyData.power
          ? propertyData.power
          : property.power
          ? property.power
          : ""
      );
      setColor(
        properti[0].details.color
          ? properti[0].details.color
          : propertyData.color
          ? propertyData.color
          : property.color
          ? property.color
          : ""
      );
      setVin(
        properti[0].details.VIN
          ? properti[0].details.VIN
          : propertyData.VIN
          ? propertyData.VIN
          : property.VIN
          ? property.VIN
          : ""
      );
      setEngine(
        properti[0].details.engine
          ? properti[0].details.engine
          : propertyData.engine
          ? propertyData.engine
          : property.engine
          ? property.engine
          : ""
      );
      setFuelType(
        properti[0].details.fuel_type
          ? properti[0].details.fuel_type
          : propertyData.fuel_type
          ? propertyData.fuel_type
          : property.fuel_type
          ? property.fuel_type
          : ""
      );
      setCondition(
        properti[0].details.condition
          ? properti[0].details.condition
          : propertyData.condition
          ? propertyData.condition
          : property.condition
          ? property.condition
          : ""
      );
      setPrice(
        properti[0].details.price
          ? properti[0].details.price
          : propertyData.price
          ? propertyData.price
          : property.price
          ? property.price
          : ""
      );
      setAddress(
        properti[0].details.property_address
          ? properti[0].details.property_address
          : propertyData.property_address
          ? propertyData.property_address
          : property.property_address
          ? property.property_address
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
      setAddress(
        propertyData.property_address
          ? propertyData.property_address.formatted_address
          : property.property_address.formatted_address
          ? property.property_address.formatted_address
          : ""
      );
      setCountry(
        propertyData.property_address
          ? propertyData.property_address.country
          : property.property_address.country
          ? property.property_address.country
          : ""
      );
      setState(
        propertyData.property_address
          ? propertyData.property_address.state
          : property.property_address.state
          ? property.property_address.state
          : ""
      );
      setCity(
        propertyData.property_address
          ? propertyData.property_address.city
          : property.property_address.city
          ? property.property_address.city
          : ""
      );
      setPrice(
        propertyData.price
          ? propertyData.price
          : property.price
          ? property.price
          : ""
      );
      setCondition(
        propertyData.condition
          ? propertyData.condition
          : property.condition
          ? property.condition
          : ""
      );
      setFuelType(
        propertyData.fuel_type
          ? propertyData.fuel_type
          : property.fuel_type
          ? property.fuel_type
          : ""
      );
      setEngine(
        propertyData.engine
          ? propertyData.engine
          : property.engine
          ? property.engine
          : ""
      );
      setVin(
        propertyData.VIN ? propertyData.VIN : property.VIN ? property.VIN : ""
      );
      setColor(
        propertyData.color
          ? propertyData.color
          : property.color
          ? property.color
          : ""
      );
      setPower(
        propertyData.power
          ? propertyData.power
          : property.power
          ? property.power
          : ""
      );
      setCarType(
        propertyData.car_type
          ? propertyData.car_type
          : property.car_type
          ? property.car_type
          : ""
      );
      setTransmission(
        propertyData.transmission
          ? propertyData.transmission
          : property.transmission
          ? property.transmission
          : ""
      );
      setMileage(
        propertyData.mileage
          ? propertyData.mileage
          : property.mileage
          ? property.mileage
          : ""
      );
      setYear(
        propertyData.year
          ? propertyData.year
          : property.year
          ? property.year
          : ""
      );
      setModel(
        propertyData.model
          ? propertyData.model
          : property.model
          ? property.model
          : ""
      );
      setMake(
        propertyData.make
          ? propertyData.make
          : property.make
          ? property.make
          : ""
      );
      setReservedAmount(propertyData ? propertyData.reservedAmount : "");
      setDiscussedAmount(propertyData ? propertyData.discussedAmount : "");
    }
  }, [prop]);

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
          property_address: {
            formatted_address: address
              ? address
              : property.property_address.formatted_address,
            country: country ? country : property.property_address.country,
            state: state ? state : property.property_address.state,
            city: city ? city : property.property_address.city,
          },
          reservedAmount: parseInt(reservedAmount),
          discussedAmount: parseInt(discussedAmount),
          step: parseInt(2),
        },
      };
      authService.saveInfo(datas).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          toggleSellStep(2);
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
        property_address: {
          formatted_address: address
            ? address
            : property.property_address.formatted_address,
          country: country ? country : property.property_address.country,
          state: state ? state : property.property_address.state,
          city: city ? city : property.property_address.city,
        },
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
        ...ownership,
        step: parseInt(2),
      };
      authService.savePropInfo(datas).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          toggleSellStep(2);
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
        make: data.make ? data.make : make ? make : "",
        model: data.model ? data.model : model ? model : "",
        year: data.year ? data.year : year ? year : "",
        mileage: data.mileage ? data.mileage : mileage ? mileage : "",
        transmission: data.transmission
          ? data.transmission
          : transmission
          ? transmission
          : "",
        car_type: data.carType ? data.carType : carType ? carType : "",
        power: data.power ? data.power : power ? power : "",
        color: data.color ? data.color : color ? color : "",
        VIN: data.vin ? data.vin : vin ? vin : "",
        engine: data.engine ? data.engine : engine ? engine : "",
        fuel_type: data.fuelType ? data.fuelType : fuelType ? fuelType : "",
        condition: data.condition ? data.condition : condition ? condition : "",
        price: data.price ? data.price : price ? price : "",
        property_address: {
          formatted_address: data.address
            ? data.address
            : address
            ? address
            : "",
          country: data.country ? data.country : country ? country : "",
          state: data.state ? data.state : state ? state : "",
          city: data.city ? data.city : city ? city : "",
        },
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
      };
      togglePropertyData(submitedData);
      toggleStep(step + 1);
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
          <Col
            style={{
              borderBottom: "2px solid gray",
              fontWeight: "bold",
              fontSize: "20px",
              color: "black",
            }}
          >
            <h3>Confirm Car Details</h3>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={year}
              {...register("year", { maxLength: 100 })}
              onChange={(e) => setYear(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Year</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={make}
              {...register("make", { maxLength: 100 })}
              onChange={(e) => setMake(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Make</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={model}
              {...register("model", { maxLength: 100 })}
              onChange={(e) => setModel(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Model</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={transmission}
              {...register("transmission", { maxLength: 100 })}
              onChange={(e) => setTransmission(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Transmission</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={mileage}
              {...register("mileage", { maxLength: 100 })}
              onChange={(e) => setMileage(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Mileage</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={power}
              {...register("power", { maxLength: 100 })}
              onChange={(e) => setPower(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Power</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={carType}
              {...register("carType", { maxLength: 100 })}
              onChange={(e) => setCarType(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Car Type</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={vin}
              {...register("vin", { maxLength: 100 })}
              onChange={(e) => setVin(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>VIN</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={color}
              {...register("color", { maxLength: 100 })}
              onChange={(e) => setColor(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Color</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={fuelType}
              {...register("fuelType", { maxLength: 100 })}
              onChange={(e) => setFuelType(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Fuel Type</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={engine}
              {...register("engine", { maxLength: 100 })}
              onChange={(e) => setEngine(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Engine</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={price}
              {...register("price", { maxLength: 100 })}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Approximate Market Price</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={condition}
              {...register("condition", { maxLength: 100 })}
              onChange={(e) => setCondition(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Condition</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={address}
              {...register("address", { maxLength: 100 })}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Address</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={country}
              {...register("country", { maxLength: 100 })}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Country</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={state}
              {...register("state", { maxLength: 100 })}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>State</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={city}
              {...register("city", { maxLength: 100 })}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>City</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={reservedAmount}
              {...register("reservedAmount")}
              onChange={(e) => setReservedAmount(parseInt(e.target.value))}
              required
            />
            <span style={{ color: "black" }}>Reserved Amount</span>
          </Col>
          <Col>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={discussedAmount}
              {...register("discussedAmount")}
              onChange={(e) => setDiscussedAmount(parseInt(e.target.value))}
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
        <Button
          className="pre-btn"
          onClick={() => {
            toggleStep(step - 1);
          }}
        >
          Previous
        </Button>
        <button className="nxt-btn" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}

export default CarDetails;
