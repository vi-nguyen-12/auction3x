import React, { useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";

import authService from "../../services/authServices";
import { IoInformationCircleSharp } from "react-icons/io5";
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

  const [reservedAmount, setReservedAmount] = useState(
    propertyTest.reservedAmount || ""
  );
  const [discussedAmount, setDiscussedAmount] = useState(
    propertyTest.discussedAmount || ""
  );
  const [other, setOther] = useState(false);

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
    "Other",
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
    if (reservedAmount > 0 && discussedAmount > 0) {
      if (parseInt(reservedAmount) <= parseInt(discussedAmount)) {
        alert("Reserved amount should be greater than discussed amount");
      } else {
        if (year_built > new Date().getFullYear()) {
          alert("Built year must be less than or equal to current year.");
        } else {
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
            description: {
              summary: summary?.jet ? summary.jet : summary,
              investment: invest?.jet ? invest?.jet : invest,
              location: locationInfo?.jet ? locationInfo?.jet : locationInfo,
              market: marketInfo?.jet ? marketInfo?.jet : marketInfo,
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
    } else {
      alert("Please fill out discussed amount and reserved amount");
    }
  };

  return (
    <>
      <h3>AirCraft Details</h3>
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
            <span style={{ fontWeight: "600", color: "black" }}>
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              value={country}
              // {...register("country")}
              // onChange={(e) => setCountry(e.target.value)}
              required
              readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              value={state}
              {...register("state")}
              onChange={(e) => setState(e.target.value)}
              required
              readOnly
            />
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              City <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={city}
              {...register("city")}
              onChange={(e) => setCity(e.target.value)}
              required
              readOnly
            />
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={zip}
              {...register("zipCode")}
              onChange={(e) => setZip(e.target.value)}
              required
              readOnly
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
              className="form-control"
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
              <input
                type="text"
                className="form-control"
                defaultValue={aircraft_builder_name}
                {...register("aircraft_builder_name")}
                onChange={(e) => setAircraft_builder_name(e.target.value)}
                required
              />
            ) : (
              <Form.Select
                value={aircraft_builder_name}
                {...register("aircraft_builder_name", { maxLength: 100 })}
                onChange={(e) => {
                  setAircraft_builder_name(e.target.value);
                  e.target.value === "Other" ? setOther(true) : setOther(false);
                }}
              >
                <option value="">Manufacturer</option>
                {builder.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            )}
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Aircraft Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
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
              className="form-control"
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
              className="form-control"
              defaultValue={aircraft_serial_no}
              {...register("aircraft_serial_no")}
              onChange={(e) => setAircraft_serial_no(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Engine Builder's Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={engine_builder_name}
              {...register("engine_builder_name")}
              onChange={(e) => setEngine_builder_name(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Engine Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={engine_model_designation}
              {...register("engine_model_designation")}
              onChange={(e) => setEngine_model_designation(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Number of Engines <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={number_of_engines}
              {...register("number_of_engines")}
              onChange={(e) => setNumber_of_engines(e.target.value)}
              required
            />
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Propeller Builder's Name{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={propeller_builder_name}
              {...register("propeller_builder_name")}
              onChange={(e) => setPropeller_builder_name(e.target.value)}
              required
            />
          </Col>
          <Col className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Propeller Model Designation{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
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
                value={true}
                onChange={(e) => setIsImport(true)}
                required
              />{" "}
              Yes &nbsp;
              <input
                checked={isImport === false ? true : false}
                type="radio"
                name="is_import"
                value={false}
                onChange={(e) => setIsImport(false)}
                required
              />{" "}
              No &nbsp;
            </div>
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
            <span style={{ fontWeight: "600", color: "black" }}>
              Reserved Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={reservedAmount}
              allowNegative={false}
              className="form-control"
              onValueChange={(values) => {
                const { value } = values;
                setReservedAmount(value);
              }}
              required
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Discussed Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={discussedAmount}
              allowNegative={false}
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
