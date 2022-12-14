import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import authService from "../../services/authServices";
import { BsQuestionCircleFill } from "react-icons/bs";
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
  setMessage,
}) {
  const { handleSubmit, register } = useForm();
  const [make, setMake] = useState(propertyTest.details?.make || "");
  const [model, setModel] = useState(propertyTest.details?.model || "");
  const [year, setYear] = useState(propertyTest.details?.year || "");
  const [color, setColor] = useState(propertyTest.details?.color || "");
  const [vin, setVin] = useState(propertyTest.details?.VIN || "");
  const [mileage, setMileage] = useState(propertyTest.details?.mileage);
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
  const [otherType, setOtherType] = useState(false);

  const [reservedAmount, setReservedAmount] = useState(
    propertyTest?.reservedAmount || 0
  );
  const [discussedAmount, setDiscussedAmount] = useState(
    propertyTest?.discussedAmount || 0
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
    if (parseInt(reservedAmount) === 0 && parseInt(discussedAmount) === 0) {
      setMessage("");
      setTimeout(() => {
        setMessage("Please enter discussed amount or reserved amount");
      }, 100);
    } else if (parseInt(reservedAmount) < parseInt(discussedAmount)) {
      setMessage("");
      setTimeout(() => {
        setMessage(
          "Reserved amount should be greater than or equal to negotiable amount"
        );
      }, 100);
    } else {
      if (year > new Date().getFullYear()) {
        setMessage("");
        setTimeout(() => {
          setMessage("Built year must be less than or equal to current year.");
        }, 100);
      } else if (
        summary !== "<p><br></p>" &&
        summary !== "" &&
        summary !== undefined &&
        locationInfo !== "<p><br></p>" &&
        locationInfo !== "" &&
        locationInfo !== undefined &&
        marketInfo !== "<p><br></p>" &&
        marketInfo !== "" &&
        marketInfo !== undefined
      ) {
        const descriptions = {
          summary: summary ? summary : "",
          investment: invest ? invest : "",
          location: locationInfo ? locationInfo : "",
          market: marketInfo ? marketInfo : "",
        };

        (!invest || invest === "<p><br></p>") && delete descriptions.investment;

        const submitedData = {
          make,
          model,
          year: parseInt(year),
          mileage: parseInt(mileage),
          gearbox,
          car_type: carType,
          power,
          color,
          VIN: vin,
          engine,
          fuel_type: fuelType,
          condition,
          market_price: parseInt(price),
          description: descriptions,
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
                setMessage("");
                setMessage("Your session ended. Please log in! ");
                toggleSignIn(true);
              } else {
                setMessage("");
                setMessage(res.data.error);
              }
            } else {
              setPropertyTest(res.data);
              setStep(step + 1);
            }
          })
          .catch((error) => {
            setMessage("");
            setMessage(error.message);
          });
      } else {
        setMessage("");
        setTimeout(() => {
          setMessage(
            `Please fill out ${
              summary === "<p><br></p>" ||
              summary === "" ||
              summary === undefined
                ? "Property Summary"
                : locationInfo === "<p><br></p>" ||
                  locationInfo === "" ||
                  locationInfo === undefined
                ? "Location Information"
                : "Market Information"
            }`
          );
        }, 100);
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
          <p className="m-0">
            <span
              className="tooltip-left"
              data-tooltip="We will be using these details to match you with the right
              buyer."
            >
              <BsQuestionCircleFill
                style={{ cursor: "pointer" }}
                color="#bf9767"
                size={30}
              />
            </span>{" "}
          </p>
        </div>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <span style={{ fontWeight: "600" }}>
              Year<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              format="####"
              className="form-control custom-input"
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
            <span style={{ fontWeight: "600" }}>
              Make<span style={{ color: "#ff0000" }}>*</span>
            </span>
            {other ? (
              <>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter Make"
                  defaultValue={make}
                  {...register("make", { maxLength: 100 })}
                  onChange={(e) => setMake(e.target.value)}
                  required
                />
                <span className="d-flex justify-content-end mt-1">
                  <Button className="rounded-0" onClick={() => setOther(false)}>
                    Back
                  </Button>
                </span>
              </>
            ) : (
              <Form.Select
                className="form-control custom-input"
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
            <span style={{ fontWeight: "600" }}>
              Model<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={model}
              {...register("model", { maxLength: 100 })}
              onChange={(e) => setModel(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600" }}>
              Gearbox<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <Form.Select
              className="form-control custom-input"
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
            <span style={{ fontWeight: "600" }}>
              Mileage<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              className="form-control custom-input"
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
              className="form-control custom-input"
              defaultValue={mileage}
              {...register("mileage")}
              onChange={(e) => setMileage(e.target.value)}
              required
            /> */}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600" }}>
              Power (Horsepower)<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              className="form-control custom-input"
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
              className="form-control custom-input"
              defaultValue={power}
              {...register("power")}
              onChange={(e) => setPower(e.target.value)}
              required
            /> */}
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600" }}>Body Type</span>
            {otherType ? (
              <>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter Body Type"
                  defaultValue={carType}
                  {...register("carType", { maxLength: 100 })}
                  onChange={(e) => setCarType(e.target.value)}
                  required
                />
                <span className="d-flex justify-content-end mt-1">
                  <Button onClick={() => setOtherType(false)}>Back</Button>
                </span>
              </>
            ) : (
              <Form.Select
                className="form-control custom-input"
                value={carType}
                onChange={(e) => {
                  if (e.target.value === "Other") {
                    setOtherType(true);
                  } else {
                    setCarType(e.target.value);
                  }
                }}
                required
              >
                <option value="">Select Body Type</option>
                <option value="Coupe">Coupe</option>
                <option value="Convertible">Convertible</option>
                <option value="Hatchback">Hatchback</option>
                <option value="Sedan">Sedan</option>
                <option value="SUV">SUV</option>
                <option value="Van">Van</option>
                <option value="Wagon">Wagon</option>
                <option value="Other">Other</option>
              </Form.Select>
            )}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600" }}>
              VIN<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={vin}
              onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
              {...register("vin")}
              onChange={(e) => setVin(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600" }}>
              Color<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={color}
              {...register("color", { maxLength: 100 })}
              onChange={(e) => setColor(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600" }}>
              Fuel Type<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <Form.Select
              className="form-control custom-input"
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
            <span style={{ fontWeight: "600" }}>
              Engine<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={engine}
              {...register("engine", { maxLength: 100 })}
              onChange={(e) => setEngine(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600" }}>
              Approximate Market Price
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={price}
              className="form-control custom-input"
              onValueChange={(values) => {
                const { value } = values;
                setPrice(value);
              }}
              required
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600" }}>
              Condition<span style={{ color: "#ff0000" }}>*</span>
            </span>

            <Form.Select
              className="form-control custom-input"
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
          <Col md={6} xs={12} sm={12}>
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
                  <span style={{ fontWeight: "600" }}>
                    Address <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    {...getInputProps({
                      placeholder: "Search address",
                      className: "form-control custom-input",
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
          <Col md={6} xs={12} sm={12}>
            <span style={{ fontWeight: "600" }}>
              Country<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              value={country}
              {...register("country", { maxLength: 100 })}
              onChange={(e) => setCountry(e.target.value)}
              required
              // readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4} xs={12} sm={12}>
            <span style={{ fontWeight: "600" }}>
              State<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              value={state}
              {...register("state", { maxLength: 100 })}
              onChange={(e) => setState(e.target.value)}
              required
              // readOnly
            />
          </Col>
          <Col md={4} xs={12} sm={12}>
            <span style={{ fontWeight: "600" }}>
              City<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              value={city}
              {...register("city", { maxLength: 100 })}
              onChange={(e) => setCity(e.target.value)}
              required
              // readOnly
            />
          </Col>
          <Col md={4} xs={12} sm={12}>
            <span style={{ fontWeight: "600" }}>
              Zip Code<span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              value={zip}
              {...register("zipCode")}
              onChange={(e) => setZip(e.target.value)}
              required
              // readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mt-3 d-flex justify-content-center" md={3} xs={12}>
            <button
              onClick={() => setOpenSummary(true)}
              className="general_btn"
              type="button"
            >
              Property Summary <span style={{ color: "#ff0000" }}>*</span>
            </button>
          </Col>
          <Col className="mt-3 d-flex justify-content-center" md={3} xs={12}>
            <button
              onClick={() => setOpenLocationInfo(true)}
              className="general_btn"
              type="button"
            >
              Location Information<span style={{ color: "#ff0000" }}>*</span>
            </button>
          </Col>
          <Col className="mt-3 d-flex justify-content-center" md={3} xs={12}>
            <button
              onClick={() => setOpenMarketInfo(true)}
              className="general_btn"
              type="button"
            >
              Market Information <span style={{ color: "#ff0000" }}>*</span>
            </button>
          </Col>
          <Col className="mt-3 d-flex justify-content-center" md={3} xs={12}>
            <button
              onClick={() => setOpenInvest(true)}
              className="general_btn"
              type="button"
            >
              Investment Opportunity
            </button>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600" }} className="d-flex">
              Reserve Amount<span style={{ color: "#ff0000" }}>*</span>
              <p className="m-0 mx-2 mb-1">
                <span
                  className="tooltip-bottom"
                  data-tooltip="The minimum amount the seller will accept as the winning bid."
                >
                  <BsQuestionCircleFill
                    style={{ cursor: "pointer" }}
                    color="#bf9767"
                    size={23}
                  />
                </span>{" "}
              </p>
            </span>
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={reservedAmount}
              className="form-control custom-input"
              onValueChange={(values) => {
                const { value } = values;
                setReservedAmount(value);
              }}
              required
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600" }} className="d-flex">
              Negotiable Amount<span style={{ color: "#ff0000" }}>*</span>
              <p className="m-0 mx-2 mb-1">
                <span
                  className="tooltip-bottom"
                  data-tooltip="An amount less than the reserve price that the seller would be willing to engage in further discussion with the potential buyer."
                >
                  <BsQuestionCircleFill
                    style={{ cursor: "pointer" }}
                    color="#bf9767"
                    size={23}
                  />
                </span>{" "}
              </p>
            </span>
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={discussedAmount}
              className="form-control custom-input"
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
