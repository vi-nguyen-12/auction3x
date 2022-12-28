import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { BsQuestionCircleFill } from "react-icons/bs";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import NumberFormat from "react-number-format";

function JetDetails({
  toggleStep,
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
  const { register, handleSubmit } = useForm();
  const [isImport, setIsImport] = useState(
    propertyTest.details?.imported_aircraft || false
  );
  const [registration_mark, setRegistration_mark] = useState(
    propertyTest.details?.registration_mark || ""
  );
  const [aircraft_builder_name, setAircraft_builder_name] = useState(
    propertyTest.details?.aircraft_builder_name || ""
  );
  const [aircraft_model_designation, setAircraft_model_designation] = useState(
    propertyTest.details?.aircraft_model_designation || ""
  );
  const [aircraft_serial_no, setAircraft_serial_no] = useState(
    propertyTest.details?.aircraft_serial_no || ""
  );
  const [engine_builder_name, setEngine_builder_name] = useState(
    propertyTest.details?.engine_builder_name || ""
  );
  const [engine_model_designation, setEngine_model_designation] = useState(
    propertyTest.details?.engine_model_designation || ""
  );
  const [number_of_engines, setNumber_of_engines] = useState(
    propertyTest.details?.number_of_engines || ""
  );
  const [propeller_builder_name, setPropeller_builder_name] = useState(
    propertyTest.details?.registration_mark || ""
  );
  const [year_built, setYear] = useState(
    propertyTest.details?.year_built || ""
  );
  const [propeller_model_designation, setPropeller_model_designation] =
    useState(propertyTest.details?.propeller_builder_name || "");

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
  const [currency, setCurrency] = useState(propertyTest?.currency || "USD");

  const [reservedAmount, setReservedAmount] = useState(
    propertyTest?.reservedAmount || 0
  );
  const [discussedAmount, setDiscussedAmount] = useState(
    propertyTest?.discussedAmount || 0
  );

  const [other, setOther] = useState(false);
  const [empty, setEmpty] = useState(false);

  const builder = [
    "AIRBUS",
    "BOEING",
    "EMBRAER",
    "BEECHCRAFT",
    "BOMBARDIER",
    "DASSAULT AVIATION",
    "BOMBURDIER",
    "CESSNA",
    "DASSAULT",
    "GULFSTREAM",
    "PIAGGIO",
    "PILATUS",
  ];

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      let countries = results[0].address_components.filter((item) => {
        return item.types[0] === "country";
      });

      if (countries[0]?.long_name === "India") {
        setAddress(() => {
          return results[0]?.formatted_address.split(",", 3).toString() || "";
        });
      } else {
        setAddress(() => {
          return results[0]?.formatted_address.split(",")[0] || "";
        });
      }

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
          "Reserved amount should be greater than or equal to discussed amount"
        );
      }, 100);
    } else {
      if (year_built > new Date().getFullYear()) {
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
          registration_mark,
          aircraft_builder_name,
          aircraft_model_designation,
          aircraft_serial_no,
          engine_builder_name,
          engine_model_designation,
          number_of_engines,
          propeller_builder_name,
          year_built,
          propeller_model_designation,
          imported_aircraft: isImport,
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
          currency,
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
      <h3>AirCraft Details</h3>
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
            <span style={{ fontWeight: "600", color: "black" }}>
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              value={country}
              {...register("country")}
              onChange={(e) => setCountry(e.target.value)}
              required
              // readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4} xs={12} sm={12}>
            <span style={{ fontWeight: "600", color: "black" }}>
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              value={state}
              {...register("state")}
              onChange={(e) => setState(e.target.value)}
              required
              // readOnly
            />
          </Col>
          <Col md={4} xs={12} sm={12}>
            <span style={{ fontWeight: "600", color: "black" }}>
              City <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={city}
              {...register("city")}
              onChange={(e) => setCity(e.target.value)}
              required
              // readOnly
            />
          </Col>
          <Col md={4} xs={12} sm={12}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={zip}
              {...register("zipCode")}
              onChange={(e) => setZip(e.target.value)}
              required
              // readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Registration Mark <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={registration_mark}
              {...register("registration_mark")}
              onChange={(e) => setRegistration_mark(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Manufacturer <span style={{ color: "#ff0000" }}>*</span>
            </span>
            {other ? (
              <>
                <input
                  type="text"
                  placeholder="Enter Aircraft Manufacturer"
                  className="form-control custom-input"
                  defaultValue={aircraft_builder_name}
                  {...register("aircraft_builder_name")}
                  onChange={(e) => setAircraft_builder_name(e.target.value)}
                  required
                />
                <span className="d-flex justify-content-end mt-1">
                  <Button onClick={() => setOther(false)}>Back</Button>
                </span>
              </>
            ) : (
              <Form.Select
                className="form-control custom-input"
                value={aircraft_builder_name}
                {...register("aircraft_builder_name", { maxLength: 100 })}
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setAircraft_builder_name(e.target.value);
                    e.target.value === "Other"
                      ? setOther(true)
                      : setOther(false);
                  } else {
                    setEmpty(true);
                  }
                }}
              >
                <option value=""></option>
                {builder.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
                <option value="Other">Other</option>
              </Form.Select>
            )}
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Model <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={aircraft_model_designation}
              {...register("aircraft_model_designation")}
              onChange={(e) => setAircraft_model_designation(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Year Built <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              format="####"
              className="form-control custom-input"
              placeholder="YYYY"
              value={year_built}
              onValueChange={(values) => {
                const { value } = values;
                setYear(value);
              }}
              name="year"
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Serial No. <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={aircraft_serial_no}
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              {...register("aircraft_serial_no")}
              onChange={(e) => setAircraft_serial_no(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Engine Manufacturer <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={engine_builder_name}
              {...register("engine_builder_name")}
              onChange={(e) => setEngine_builder_name(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Engine Model <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={engine_model_designation}
              {...register("engine_model_designation")}
              onChange={(e) => setEngine_model_designation(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={4}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Currency <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <select
              className="form-control custom-input"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              name="currency"
              required
            >
              <option value="USD">USD</option>
              <option value="INR">INR</option>
            </select>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col lg={4} md={6} xs={12} sm={6}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Number of Engines <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              format="#"
              thousandSeparator={true}
              className="form-control custom-input"
              allowNegative={false}
              value={number_of_engines}
              onValueChange={(values) => {
                const { value } = values;
                setNumber_of_engines(value);
              }}
              name="number_of_engines"
              required
            />
            {/* <input
              type="number"
              min="0"
              className="form-control custom-input"
              defaultValue={number_of_engines}
              {...register("number_of_engines")}
              onChange={(e) => setNumber_of_engines(e.target.value)}
              required
            /> */}
          </Col>
          <Col lg={4} md={6} xs={12} sm={6}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Propeller Manufacturer <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={propeller_builder_name}
              {...register("propeller_builder_name")}
              onChange={(e) => setPropeller_builder_name(e.target.value)}
              required
            />
          </Col>
          <Col lg={4} md={6} xs={12} sm={6}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Propeller Model <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={propeller_model_designation}
              {...register("propeller_model_designation")}
              onChange={(e) => setPropeller_model_designation(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={12} className="d-grid justify-content-center">
            <span style={{ fontWeight: "600", color: "black" }}>
              Is the aircraft an import?{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <div className="form-check form-check-inline">
              <input
                checked={isImport === true ? true : false}
                type="radio"
                name="is_import"
                id="yes"
                value={true}
                onChange={(e) => setIsImport(true)}
                required
              />{" "}
              <label
                htmlFor="yes"
                style={{ fontWeight: "600", color: "black" }}
              >
                Yes &nbsp;
              </label>{" "}
              <input
                checked={isImport === false ? true : false}
                type="radio"
                name="is_import"
                id="no"
                value={false}
                onChange={(e) => setIsImport(false)}
                required
              />{" "}
              <label htmlFor="no" style={{ fontWeight: "600", color: "black" }}>
                No
              </label>
            </div>
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
            <span
              style={{ fontWeight: "600", color: "black" }}
              className="d-flex"
            >
              Reserve Amount <span style={{ color: "#ff0000" }}>*</span>
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
              allowNegative={false}
              className="form-control custom-input"
              onValueChange={(values) => {
                const { value } = values;
                setReservedAmount(value);
              }}
              required
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span
              style={{ fontWeight: "600", color: "black" }}
              className="d-flex"
            >
              Negotiable Amount <span style={{ color: "#ff0000" }}>*</span>
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
              allowNegative={false}
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
            <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
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

export default JetDetails;
