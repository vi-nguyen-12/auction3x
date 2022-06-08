import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoInformationCircleSharp } from "react-icons/io5";

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
  const [zip, setZip] = useState();
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
          ? propertyData.property_address.formatted_street_address
          : property.property_address
          ? property.property_address.formatted_street_address
          : ""
      );
      setCountry(
        propertyData.property_address
          ? propertyData.property_address.country
          : property.property_address
          ? property.property_address.country
          : ""
      );
      setState(
        propertyData.property_address
          ? propertyData.property_address.state
          : property.property_address
          ? property.property_address.state
          : ""
      );
      setCity(
        propertyData.property_address
          ? propertyData.property_address.city
          : property.property_address
          ? property.property_address.city
          : ""
      );
      setZip(
        propertyData.property_address
          ? propertyData.property_address.zip_code
          : property.property_address
          ? property.property_address.zip_code
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
          make: make ? make : propertyData.make,
          model: model ? model : propertyData.model,
          year: year ? year : propertyData.year,
          mileage: mileage ? mileage : propertyData.mileage,
          transmission: transmission ? transmission : propertyData.transmission,
          car_type: carType ? carType : propertyData.car_type,
          power: power ? power : propertyData.power,
          color: color ? color : propertyData.color,
          VIN: vin ? vin : propertyData.VIN,
          engine: engine ? engine : propertyData.engine,
          fuel_type: fuelType ? fuelType : propertyData.fuel_type,
          condition: condition ? condition : propertyData.condition,
          price: price ? price : propertyData.price,
          property_address: {
            formatted_street_address: address
              ? address
              : propertyData.property_address.formatted_street_address,
            country: country ? country : propertyData.property_address.country,
            state: state ? state : propertyData.property_address.state,
            city: city ? city : propertyData.property_address.city,
            zip_code: zip ? zip : propertyData.property_address.zip_code,
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
        }
      });
    } else {
      const datas = {
        make: make ? make : propertyData.make,
        model: model ? model : propertyData.model,
        year: year ? year : propertyData.year,
        mileage: mileage ? mileage : propertyData.mileage,
        transmission: transmission ? transmission : propertyData.transmission,
        car_type: carType ? carType : propertyData.car_type,
        power: power ? power : propertyData.power,
        color: color ? color : propertyData.color,
        VIN: vin ? vin : propertyData.VIN,
        engine: engine ? engine : propertyData.engine,
        fuel_type: fuelType ? fuelType : propertyData.fuel_type,
        condition: condition ? condition : propertyData.condition,
        price: price ? price : propertyData.price,
        property_address: {
          formatted_street_address: address
            ? address
            : propertyData.property_address.formatted_street_address,
          country: country ? country : propertyData.property_address.country,
          state: state ? state : propertyData.property_address.state,
          city: city ? city : propertyData.property_address.city,
          zip_code: zip ? zip : propertyData.property_address.zip_code,
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
          formatted_street_address: data.address
            ? data.address
            : address
            ? address
            : "",
          country: data.country ? data.country : country ? country : "",
          state: data.state ? data.state : state ? state : "",
          city: data.city ? data.city : city ? city : "",
          zip_code: data.zipCode ? data.zipCode : zip ? zip : "",
        },
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
      };
      togglePropertyData(submitedData);
      toggleStep(step + 1);
    }
  };

  return (
    <>
      <h3>Car Details</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="list-form">
        <div
          className="dropdown-icon"
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <IoInformationCircleSharp
            style={{ cursor: "pointer" }}
            color="blue"
            size={30}
          />
          <div className="dropdown-info">
            <p>
              We will be using these details to match you with the right buyer.
            </p>
          </div>
        </div>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <input
              type="number"
              className="form-control"
              defaultValue={year}
              {...register("year", { maxLength: 4 })}
              onChange={(e) => setYear(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Year</span>
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
          <Col xs={12} md={6}>
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
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
          <Col xs={12} md={6}>
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
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
          <Col xs={12} md={6}>
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
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
          <Col xs={12} md={6}>
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
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
          <Col xs={12} md={6}>
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
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
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
        <Row className="mt-3">
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
          <Col className="mt-sm-3 mt-md-0">
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
        </Row>
        <Row className="mt-3">
          <Col className="mt-sm-3 mt-md-0">
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
          <Col className="mt-sm-3 mt-md-0">
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
          <Col className="mt-sm-3 mt-md-0">
            <input
              type="number"
              className="form-control"
              defaultValue={zip}
              {...register("zipCode", { maxLength: 100 })}
              onChange={(e) => setZip(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>Zip Code</span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
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
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
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

        <Row className="mt-5">
          {/* <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center justify-content-md-end mt-2"
          >
            <Button className="save-btn" onClick={saveInfo}>
              Save
            </Button>
          </Col> */}
          <Col className="d-flex justify-content-center mt-2">
            <Button className="pre-btn" onClick={() => toggleStep(step - 2)}>
              Previous
            </Button>
            <Button
              onClick={saveInfo}
              className="nxt-btn"
              id="next"
              type="submit"
            >
              Next
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}

export default CarDetails;
