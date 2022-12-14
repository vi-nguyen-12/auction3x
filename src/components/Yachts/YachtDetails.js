import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import authService from "../../services/authServices";
import { BsQuestionCircleFill } from "react-icons/bs";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import NumberFormat from "react-number-format";

function YachtDetails({
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
  const [changeDate, setChangeDate] = useState(false);
  const [vessel_registration_number, setVessel_registration_number] = useState(
    propertyTest.details?.vessel_registration_number || ""
  );
  const [vessel_manufacturing_date, setVessel_manufacturing_date] = useState(
    propertyTest.details?.vessel_manufacturing_date || ""
  );
  const [manufacture_mark, setManufacture_mark] = useState(
    propertyTest.details?.manufacture_mark || ""
  );
  const [manufacturer_name, setManufacturer_name] = useState(
    propertyTest.details?.manufacturer_name || ""
  );
  const [engine_type, setEngine_type] = useState(
    propertyTest.details?.engine_type || ""
  );
  const [engine_deck_type, setEngine_deck_type] = useState(
    propertyTest.details?.engine_deck_type || ""
  );
  const [engine_manufacture_name, setEngine_manufacture_name] = useState(
    propertyTest.details?.engine_manufacture_name || ""
  );
  const [running_cost, setRunning_cost] = useState(
    propertyTest.details?.running_cost || ""
  );
  const [no_of_crew_required, setNo_of_crew_required] = useState(
    propertyTest.details?.no_of_crew_required || ""
  );
  const [length, setLength] = useState(propertyTest.details?.length || "");
  const [address, setAddress] = useState(
    propertyTest.details?.property_address?.formatted_street_address || ""
  );
  const [country, setCountry] = useState(
    propertyTest.details?.property_address?.country || ""
  );
  const [state, setState] = useState(
    propertyTest.details?.property_address?.state || ""
  );
  const [city, setCity] = useState(
    propertyTest.details?.property_address?.city || ""
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
  const [other, setOther] = useState(
    propertyTest.details?.property_address?.others || ""
  );
  const [otherDetails, setOtherDetails] = useState(
    propertyTest.details?.others || ""
  );
  const [reservedAmount, setReservedAmount] = useState(
    propertyTest?.reservedAmount || 0
  );
  const [discussedAmount, setDiscussedAmount] = useState(
    propertyTest?.discussedAmount || 0
  );

  const manufacturer = [
    "AMELS",
    "BENETTI",
    "FEADSHIP",
    "FINCANTIERI YACHTS",
    "HEESEN YACHTS",
    "LURSSEN",
    "NOBISKRUG",
    "OCEANCO",
    "PERINI NAVI",
    "ROYAL HUISMAN",
    "SUNSEEKER",
    "MANGUSTA",
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

  const fixDate = (date) => {
    const newDate = new Date(date).setDate(
      new Date(date).getDate() + 1 <= 31 ? new Date(date).getDate() + 1 : 1
    );
    const dates = new Date(newDate).setMonth(
      new Date(newDate).getDate() === 1
        ? new Date(newDate).getMonth() + 1
        : new Date(newDate).getMonth()
    );
    setVessel_manufacturing_date(new Date(dates).toISOString());
  };

  const onSubmit = (data) => {
    if (parseInt(reservedAmount) === 0 && parseInt(discussedAmount) === 0) {
      setMessage("");
      setTimeout(() => {
        setMessage("Please enter discussed amount or reserved amount");
      }, 100);
    } else if (parseInt(data.reservedAmount) < parseInt(data.discussedAmount)) {
      setMessage("");
      setTimeout(() => {
        setMessage(
          "Reserved amount should be greater than or equal to discussed amount"
        );
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
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
        vessel_registration_number,
        vessel_manufacturing_date,
        manufacture_mark,
        manufacturer_name,
        engine_type,
        length: parseInt(length),
        engine_manufacture_name,
        engine_deck_type,
        running_cost: parseInt(running_cost),
        no_of_crew_required: parseInt(no_of_crew_required),
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
        step: 2,
      };
      if (otherDetails?.length > 0) {
        submitedData.others = otherDetails;
      }
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
            summary === "<p><br></p>" || summary === "" || summary === undefined
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
  };

  return (
    <>
      <h3>Yacht Details</h3>
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
          <Col>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Vessel Registration Number{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={vessel_registration_number}
              onInput={(e) => {
                e.target.value = e.target.value.toUpperCase();
              }}
              {...register("vessel_registration_number")}
              onChange={(e) => setVessel_registration_number(e.target.value)}
              required
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Vessel Manufacturing Date{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            {!changeDate ? (
              <div className="d-flex">
                <input
                  type="text"
                  defaultValue={new Date(
                    vessel_manufacturing_date
                  ).toLocaleDateString()}
                  className="form-control custom-input"
                  disabled
                />
                <button
                  type="button"
                  onClick={() => {
                    setVessel_manufacturing_date();
                    setChangeDate(true);
                  }}
                  className="general_btn py-2 px-3"
                >
                  Change
                </button>
              </div>
            ) : (
              <div className="d-flex">
                <input
                  type="date"
                  className="form-control custom-input"
                  defaultValue={new Date(
                    vessel_manufacturing_date
                  ).toLocaleDateString()}
                  {...register("vessel_manufacturing_date")}
                  onChange={(e) => fixDate(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => {
                    setChangeDate(false);
                  }}
                  className="general_btn py-2 px-3"
                >
                  Cancel
                </button>
              </div>
            )}
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
                  <span style={{ fontWeight: "600", color: "black" }}>
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
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={country}
              {...register("country")}
              onChange={(e) => setCountry(e.target.value)}
              required
              // readOnly
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col md={4} xs={12} sm={12}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={state}
              {...register("state")}
              onChange={(e) => setState(e.target.value)}
              required
              // readOnly
            />
          </Col>
          <Col md={4} xs={12} sm={12}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
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
              maxLength="5"
              onChange={(e) => setZip(e.target.value)}
              required
              // readOnly
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={4}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Manufacture Mark <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={manufacture_mark}
              {...register("manufacture_mark")}
              onChange={(e) => setManufacture_mark(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={4}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Manufacturer Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
            {other ? (
              <>
                <input
                  type="text"
                  className="form-control custom-input"
                  placeholder="Enter Manufacturer Name"
                  defaultValue={manufacturer_name}
                  {...register("manufacturer_name")}
                  onChange={(e) => setManufacturer_name(e.target.value)}
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
                value={manufacturer_name}
                {...register("manufacturer_name", { maxLength: 100 })}
                onChange={(e) => {
                  setManufacturer_name(e.target.value);
                  e.target.value === "Other" ? setOther(true) : setOther(false);
                }}
              >
                <option value="">Manufacturer</option>
                {manufacturer.map((item, index) => (
                  <option key={index} value={item}>
                    {item}
                  </option>
                ))}
              </Form.Select>
            )}
          </Col>

          <Col xs={12} md={4}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Manufacturer Name{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={engine_manufacture_name}
              {...register("engine_manufacture_name")}
              onChange={(e) => setEngine_manufacture_name(e.target.value)}
              required
            />
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={engine_type}
              {...register("engine_type")}
              onChange={(e) => setEngine_type(e.target.value)}
              required
            />
          </Col>
          <Col>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Vessel Length(ft) <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              className="form-control custom-input"
              thousandSeparator={true}
              allowNegative={false}
              value={length}
              onValueChange={(values) => {
                const { value } = values;
                setLength(value);
              }}
              required
            />
            {/* <input
              type="number"
              min="0"
              className="form-control custom-input"
              defaultValue={length}
              {...register("length")}
              onChange={(e) => setLength(e.target.value)}
              required
            /> */}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Deck Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={engine_deck_type}
              {...register("engine_deck_type")}
              onChange={(e) => setEngine_deck_type(e.target.value)}
              required
            />
          </Col>
          <Col xs={12} md={4}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Running Cost <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              allowNegative={false}
              prefix="$"
              value={running_cost}
              className="form-control custom-input"
              onValueChange={(values) => {
                const { value } = values;
                setRunning_cost(value);
              }}
            />
          </Col>
          <Col xs={12} md={4}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              No. Crew Required <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              allowNegative={false}
              value={no_of_crew_required}
              className="form-control custom-input"
              onValueChange={(values) => {
                const { value } = values;
                setNo_of_crew_required(value);
              }}
              required
            />
            {/* <input
              type="number"
              min="0"
              className="form-control custom-input"
              defaultValue={no_of_crew_required}
              {...register("no_of_crew_required")}
              onChange={(e) => setNo_of_crew_required(e.target.value)}
              required
            /> */}
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
        {/* <Row style={{ marginTop: "30px", height: "100px" }}>
          <Col>
            <textarea
              className="form-control custom-input"
              style={{ height: "100%" }}
              defaultValue={otherDetails}
              placeholder="Other information about the property"
              {...register("detain")}
              onChange={(e) => setOtherDetails(e.target.value)}
            />
          </Col>
        </Row> */}
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
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
              className="form-control custom-input"
              onValueChange={(values) => {
                const { value } = values;
                setReservedAmount(value);
              }}
            />
          </Col>
          <Col xs={12} md={6}>
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
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
              className="form-control custom-input"
              onValueChange={(values) => {
                const { value } = values;
                setDiscussedAmount(value);
              }}
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

export default YachtDetails;
