import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoInformationCircleSharp } from "react-icons/io5";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import NumberFormat from "react-number-format";

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
  const [price, setPrice] = useState(parseInt().toLocaleString());
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [state, setState] = useState();
  const [country, setCountry] = useState();
  const [zip, setZip] = useState();
  const [other, setOther] = useState(false);
  const [reservedAmount, setReservedAmount] = useState();
  const [discussedAmount, setDiscussedAmount] = useState();

  const params = useParams();
  const prop = useSelector((state) => state.incompProperty);

  const carMake = [
    "FERRARI",
    "ASTON MARTIN",
    "ROLLS ROYCE",
    "BUGATTI",
    "PAGANI",
    "KOENIG",
    "LAMBORGHINI",
    "W MOTORS",
    "MERCEDES",
    "McLAREN",
    "ZENVO",
    "BENTLEY",
    "CZINGER",
    "MAZZANTI",
    "Other",
  ];

  useEffect(() => {
    if (params.id && prop.length > 0) {
      const properti = prop.filter((prop) => prop._id === params.id);
      console.log(properti);
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
              : propertyData.property_address
              ? propertyData.property_address.formatted_street_address
              : "",
            country: country
              ? country
              : propertyData.property_address
              ? propertyData.property_address.country
              : "",
            state: state
              ? state
              : propertyData.property_address
              ? propertyData.property_address.state
              : "",
            city: city
              ? city
              : propertyData.property_address
              ? propertyData.property_address.city
              : "",
            zip_code: zip
              ? zip
              : propertyData.property_address
              ? propertyData.property_address.zip_code
              : "",
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
      authService.postPropInfo(datas).then((res) => {
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

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      setAddress(results[0].formatted_address.split(",")[0]);

      let cities = results[0].address_components.filter((item) => {
        return item.types.includes(
          "locality" || "sublocality" || "neighborhood"
        );
      });
      setCity(cities[0].long_name ? cities[0].long_name : cities[0].short_name);

      let states = results[0].address_components.filter((item) => {
        return item.types[0] === "administrative_area_level_1";
      });
      setState(
        states[0].long_name ? states[0].long_name : states[0].short_name
      );

      let countries = results[0].address_components.filter((item) => {
        return item.types[0] === "country";
      });
      setCountry(
        countries[0].long_name
          ? countries[0].long_name
          : countries[0].short_name
      );

      let zipcodes = results[0].address_components.filter((item) => {
        return item.types[0] === "postal_code";
      });
      setZip(
        zipcodes[0].long_name ? zipcodes[0].long_name : zipcodes[0].short_name
      );
    });
  };

  console.log(make);

  return (
    <>
      <h3>Car Details</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="list-form">
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <div
            className="dropdown-icon"
            style={{
              width: "fit-content",
            }}
          >
            <IoInformationCircleSharp
              style={{ cursor: "pointer" }}
              color="blue"
              size={30}
            />
            <div className="dropdown-info">
              <p>
                We will be using these details to match you with the right
                buyer.
              </p>
            </div>
          </div>
        </div>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <NumberFormat
              format="####"
              className="form-control"
              placeholder="YYYY"
              value={year}
              onValueChange={(values) => {
                const { value } = values;
                setYear(value);
              }}
              name="year"
              required
            />
            <span style={{ color: "black" }}>
              Year<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            {other ? (
              <input
                type="text"
                className="form-control"
                defaultValue={make}
                {...register("make", { maxLength: 100 })}
                onChange={(e) => setMake(e.target.value)}
                required
              />
            ) : (
              <Form.Select
                value={make}
                {...register("make", { maxLength: 100 })}
                onChange={(e) => {
                  setMake(e.target.value);
                  e.target.value === "Other" ? setOther(true) : setOther(false);
                }}
              >
                <option value="">Make</option>
                {carMake.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            )}
            <span style={{ color: "black" }}>
              Make<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
            <span style={{ color: "black" }}>
              Model<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <Form.Select
              className="form-control"
              name="gearbox"
              value={transmission}
              {...register("transmission", { maxLength: 100 })}
              onChange={(e) => setTransmission(e.target.value)}
            >
              <option value="">Select Gearbox Type</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </Form.Select>
            <span style={{ color: "black" }}>
              Gearbox<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              className="form-control"
              defaultValue={mileage}
              {...register("mileage")}
              onChange={(e) => setMileage(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>
              Mileage<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="text"
              className="form-control"
              defaultValue={power}
              {...register("power")}
              onChange={(e) => setPower(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>
              Power<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
            <span style={{ color: "black" }}>
              Car Type<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="text"
              className="form-control"
              defaultValue={vin}
              {...register("vin")}
              onChange={(e) => setVin(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>
              VIN<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
            <span style={{ color: "black" }}>
              Color<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <Form.Select
              className="form-control"
              name="fuel"
              value={fuelType}
              {...register("fuelType", { maxLength: 100 })}
              onChange={(e) => setFuelType(e.target.value)}
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </Form.Select>
            <span style={{ color: "black" }}>
              Fuel Type<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
            <span style={{ color: "black" }}>
              Engine<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={price}
              className="form-control"
              onValueChange={(values) => {
                const { value } = values;
                setPrice(value);
              }}
              required
            />
            <span style={{ color: "black" }}>
              Approximate Market Price
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
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
            <span style={{ color: "black" }}>
              Condition<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <PlacesAutocomplete
              value={address}
              onChange={handleChange}
              onSelect={handleSelect}
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div>
                  <input
                    {...getInputProps({
                      placeholder: "Search address",
                      className: "form-control",
                    })}
                    required
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Location <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  {suggestions && suggestions.length > 0 && (
                    <div className="autocomplete-dropdown-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion, index) => {
                        const className = suggestion.active
                          ? "suggestion-item--active"
                          : "suggestion-item";
                        // inline style for demonstration purpose
                        const style = suggestion.active
                          ? {
                              backgroundColor: "#fafafa",
                              cursor: "pointer",
                              color: "black",
                            }
                          : {
                              backgroundColor: "#ffffff",
                              cursor: "pointer",
                              color: "black",
                            };
                        return (
                          <div
                            key={index}
                            {...getSuggestionItemProps(suggestion, {
                              className,
                              style,
                            })}
                          >
                            <span>{suggestion.description}</span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              )}
            </PlacesAutocomplete>
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
            <span style={{ color: "black" }}>
              Country<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
            <span style={{ color: "black" }}>
              State<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
            <span style={{ color: "black" }}>
              City<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              defaultValue={zip}
              {...register("zipCode")}
              onChange={(e) => setZip(e.target.value)}
              required
            />
            <span style={{ color: "black" }}>
              Zip Code<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={reservedAmount}
              className="form-control"
              onValueChange={(values) => {
                const { value } = values;
                setReservedAmount(value);
              }}
              required
            />
            <span style={{ color: "black" }}>
              Reserved Amount<span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={discussedAmount}
              className="form-control"
              onValueChange={(values) => {
                const { value } = values;
                setDiscussedAmount(value);
              }}
              required
            />
            <span style={{ color: "black" }}>
              Discussed Amount<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
