import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import authService from "../../services/authServices";

import { IoInformationCircleSharp } from "react-icons/io5";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import NumberFormat from "react-number-format";

function CarDetails({
  step,
  setStep,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
  setOpenSummary,
  setOpenInvest,
  setOpenLocationInfo,
  setOpenMarketInfo,
  summary,
  invest,
  locationInfo,
  marketInfo,
}) {
  const { handleSubmit, register } = useForm();
  const [make, setMake] = useState(propertyTest.details?.make || "");
  const [model, setModel] = useState(propertyTest.details?.model || "");
  const [year, setYear] = useState(propertyTest.details?.year || "");
  const [color, setColor] = useState(propertyTest.details?.color || "");
  const [vin, setVin] = useState(propertyTest.details?.VIN || "");
  const [mileage, setMileage] = useState(propertyTest.details?.mileage || "");
  const [engine, setEngine] = useState(propertyTest.details?.engine || "");
  const [gearbox, setGearbox] = useState(propertyTest.details?.gearbox || "");
  const [power, setPower] = useState(propertyTest.details?.power || "");
  const [carType, setCarType] = useState(propertyTest.details?.car_type || "");
  const [fuelType, setFuelType] = useState(
    propertyTest.details?.fuel_type || ""
  );
  const [condition, setCondition] = useState(
    propertyTest.details?.condition || ""
  );
  const [price, setPrice] = useState(propertyTest.details?.market_price || "");
  const [address, setAddress] = useState(
    propertyTest.details?.property_address?.formatted_street_address || ""
  );
  const [city, setCity] = useState(
    propertyTest.details?.property_address?.city || ""
  );
  const [state, setState] = useState(
    propertyTest.details?.property_address?.state || ""
  );
  const [country, setCountry] = useState(
    propertyTest.details?.property_address?.country || ""
  );
  const [zip, setZip] = useState(
    propertyTest.details?.property_address?.zip_code || ""
  );
  const [lat, setLat] = useState(
    propertyTest.details?.property_address?.lat || ""
  );
  const [lng, setLng] = useState(
    propertyTest.details?.property_address?.lng || ""
  );
  const [other, setOther] = useState(false);
  const [reservedAmount, setReservedAmount] = useState(
    propertyTest.reservedAmount || ""
  );
  const [discussedAmount, setDiscussedAmount] = useState(
    propertyTest.discussedAmount || ""
  );

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
  ];

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      setAddress(() => {
        return results[0]?.formatted_address.split(",")[0] || "";
      });

      let cities = results[0].address_components.filter((item) => {
        return item.types.includes(
          "locality" || "sublocality" || "neighborhood"
        );
      });
      setCity(() => {
        return cities[0]?.long_name || "";
      });

      let states = results[0].address_components.filter((item) => {
        return item.types[0] === "administrative_area_level_1";
      });
      setState(states[0]?.long_name || "");

      let countries = results[0].address_components.filter((item) => {
        return item.types[0] === "country";
      });
      setCountry(countries[0]?.long_name || "");

      let zipcodes = results[0].address_components.filter((item) => {
        return item.types[0] === "postal_code";
      });
      setZip(() => {
        return zipcodes[0]?.long_name || "";
      });

      setLat(() => {
        return results[0]?.geometry.location.lat() || "";
      });
      setLng(() => {
        return results[0]?.geometry.location.lng() || "";
      });
    });
  };

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      if (year > new Date().getFullYear()) {
        alert("Built year must be less than or equal to current year.");
      } else {
        const submitedData = {
          make,
          model,
          year,
          mileage: parseInt(mileage),
          gearbox,
          car_type: carType,
          power,
          color,
          VIN: vin,
          engine,
          fuel_type: fuelType,
          condition,
          market_price: price,
          description: {
            summary: summary?.car ? summary.car : summary,
            investment: invest?.car ? invest?.car : invest,
            location: locationInfo?.car ? locationInfo?.car : locationInfo,
            market: marketInfo?.car ? marketInfo?.car : marketInfo,
          },
          property_address: {
            formatted_street_address: address,
            country,
            state,
            city,
            zip_code: zip,
            lat,
            lng,
          },
          reservedAmount: parseInt(reservedAmount),
          discussedAmount: parseInt(discussedAmount),
          step: 2,
        };

        authService
          .editProperty(propertyTest._id, submitedData)
          .then((res) => {
            if (res.data.error) {
              if (res.data.error === "Invalid Token") {
                alert("Your session ended. Please log in! ");
                toggleSignIn(true);
              } else alert(res.data.error);
            } else {
              setPropertyTest(res.data);
              setStep(step + 1);
            }
          })
          .catch((error) => {
            alert(error);
          });
      }
    }
  };

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
            <span style={{ color: "black" }}>
              Year<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              Make<span style={{ color: "#ff0000" }}>*</span>
            </span>
            {other ? (
              <>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Make"
                  defaultValue={make}
                  {...register("make", { maxLength: 100 })}
                  onChange={(e) => setMake(e.target.value)}
                  required
                />
                <span className="d-flex justify-content-end mt-1">
                  <Button onClick={() => setOther(false)}>Back</Button>
                </span>
              </>
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
                <option value="Other">Other</option>
              </Form.Select>
            )}
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              Model<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={model}
              {...register("model", { maxLength: 100 })}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ color: "black" }}>
              Gearbox<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <Form.Select
              className="form-control"
              name="gearbox"
              defaultValue={gearbox}
              {...register("gearbox", { maxLength: 100 })}
              onChange={(e) => setGearbox(e.target.value)}
              required
            >
              <option value="">Select Gearbox Type</option>
              <option value="Automatic">Automatic</option>
              <option value="Manual">Manual</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              Mileage<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              className="form-control"
              thousandSeparator={true}
              value={mileage}
              allowNegative={false}
              onValueChange={(values) => {
                const { value } = values;
                setMileage(value);
              }}
              name="mileage"
              required
            />
            {/* <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={mileage}
              {...register("mileage")}
              onChange={(e) => setMileage(e.target.value)}
              required
            /> */}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ color: "black" }}>
              Power (Horsepower)<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              className="form-control"
              allowNegative={false}
              value={power}
              onValueChange={(values) => {
                const { value } = values;
                setPower(value);
              }}
              name="power"
              required
            />
            {/* <input
              type="text"
              className="form-control"
              defaultValue={power}
              {...register("power")}
              onChange={(e) => setPower(e.target.value)}
              required
            /> */}
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>Car Type</span>
            <input
              type="text"
              className="form-control"
              defaultValue={carType}
              {...register("carType", { maxLength: 100 })}
              onChange={(e) => setCarType(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ color: "black" }}>
              VIN<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={vin}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              {...register("vin")}
              onChange={(e) => setVin(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              Color<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={color}
              {...register("color", { maxLength: 100 })}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ color: "black" }}>
              Fuel Type<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              Engine<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={engine}
              {...register("engine", { maxLength: 100 })}
              onChange={(e) => setEngine(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ color: "black" }}>
              Approximate Market Price
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
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
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              Condition<span style={{ color: "#ff0000" }}>*</span>
            </span>

            <Form.Select
              value={condition}
              {...register("condition", { maxLength: 100 })}
              onChange={(e) => setCondition(e.target.value)}
              required
            >
              {" "}
              <option value="">Select Condition</option>
              <option value="used">Used</option>
              <option value="new">New</option>
            </Form.Select>
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
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Address <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    {...getInputProps({
                      placeholder: "Search address",
                      className: "form-control",
                    })}
                    required
                  />

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
            <span style={{ color: "black" }}>
              Country<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              value={country}
              {...register("country", { maxLength: 100 })}
              // onChange={(e) => setCountry(e.target.value)}
              required
              readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              State<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              value={state}
              {...register("state", { maxLength: 100 })}
              // onChange={(e) => setState(e.target.value)}
              required
              readOnly
            />
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              City<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              value={city}
              {...register("city", { maxLength: 100 })}
              // onChange={(e) => setCity(e.target.value)}
              required
              readOnly
            />
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              Zip Code<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              value={zip}
              {...register("zipCode")}
              // onChange={(e) => setZip(e.target.value)}
              required
              readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mt-3 d-flex justify-content-center" md={3} xs={12}>
            <Button onClick={() => setOpenSummary(true)}>
              Property Summary <span style={{ color: "#ff0000" }}>*</span>
            </Button>
          </Col>
          <Col className="mt-3 d-flex justify-content-center" md={3} xs={12}>
            <Button onClick={() => setOpenInvest(true)}>
              Investment Opportunity <span style={{ color: "#ff0000" }}>*</span>
            </Button>
          </Col>
          <Col className="mt-3 d-flex justify-content-center" md={3} xs={12}>
            <Button onClick={() => setOpenLocationInfo(true)}>
              Location Information<span style={{ color: "#ff0000" }}>*</span>
            </Button>
          </Col>
          <Col className="mt-3 d-flex justify-content-center" md={3} xs={12}>
            <Button onClick={() => setOpenMarketInfo(true)}>
              Market Information <span style={{ color: "#ff0000" }}>*</span>
            </Button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ color: "black" }}>
              Reserved Amount<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ color: "black" }}>
              Discussed Amount<span style={{ color: "#ff0000" }}>*</span>
            </span>
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
          </Col>
        </Row>

        <Row className="mt-5">
          <Col className="d-flex justify-content-center mt-2">
            <Button className="pre-btn" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
            <Button className="nxt-btn" id="next" type="submit">
              Next
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}

export default CarDetails;
