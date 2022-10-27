import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import authService from "../../services/authServices";
import { IoInformationCircleSharp } from "react-icons/io5";
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
    propertyTest.reservedAmount || ""
  );
  const [discussedAmount, setDiscussedAmount] = useState(
    propertyTest.discussedAmount || ""
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
    const newDate = new Date(date);
    const day = newDate.getDate() + 1;
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    setVessel_manufacturing_date(`${month}/${day}/${year}`);
  };

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) < parseInt(data.discussedAmount)) {
      setMessage("");
      setTimeout(() => {
        setMessage(
          "Reserved amount should be greater than or equal to discussed amount"
        );
      }, 100);
    } else {
      if (!summary && !invest && !locationInfo && !marketInfo) {
        setMessage("");
        setTimeout(() => {
          setMessage(
            "Please enter summary, investment, location, and market information"
          );
        }, 100);
      } else {
        const descriptions = {
          summary: summary ? summary : "",
          investment: invest ? invest : "",
          location: locationInfo ? locationInfo : "",
          market: marketInfo ? marketInfo : "",
        };

        !invest && delete descriptions.investment;

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
      }
    }
  };

  return (
    <>
      <h3>Yacht Details</h3>
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
              className="form-control"
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
            <input
              type="date"
              className="form-control"
              defaultValue={vessel_manufacturing_date}
              {...register("vessel_manufacturing_date")}
              onChange={(e) => fixDate(e.target.value)}
              required
            />
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
          <Col>
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
              className="form-control"
              defaultValue={country}
              {...register("country")}
              onChange={(e) => setCountry(e.target.value)}
              required
              readOnly
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
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={state}
              {...register("state")}
              onChange={(e) => setState(e.target.value)}
              required
              readOnly
            />
          </Col>
          <Col>
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
              className="form-control"
              defaultValue={city}
              {...register("city")}
              onChange={(e) => setCity(e.target.value)}
              required
              readOnly
            />
          </Col>
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control"
              defaultValue={zip}
              {...register("zipCode")}
              maxLength="5"
              onChange={(e) => setZip(e.target.value)}
              required
              readOnly
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
              className="form-control"
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
                  className="form-control"
                  placeholder="Enter Manufacturer Name"
                  defaultValue={manufacturer_name}
                  {...register("manufacturer_name")}
                  onChange={(e) => setManufacturer_name(e.target.value)}
                  required
                />
                <span className="d-flex justify-content-end mt-1">
                  <Button onClick={() => setOther(false)}>Back</Button>
                </span>
              </>
            ) : (
              <Form.Select
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
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
              className="form-control"
              onValueChange={(values) => {
                const { value } = values;
                setNo_of_crew_required(value);
              }}
              required
            />
            {/* <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={no_of_crew_required}
              {...register("no_of_crew_required")}
              onChange={(e) => setNo_of_crew_required(e.target.value)}
              required
            /> */}
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
        {/* <Row style={{ marginTop: "30px", height: "100px" }}>
          <Col>
            <textarea
              className="form-control"
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
              <div
                className="dropdown-icon mx-2"
                style={{
                  width: "fit-content",
                }}
              >
                <IoInformationCircleSharp
                  style={{ cursor: "pointer" }}
                  color="blue"
                  size={25}
                />
                {/* <div className="dropdown-info">
                  <p>
                    We will be using these details to match you with the right
                    buyer.
                  </p>
                </div> */}
              </div>
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
              <div
                className="dropdown-icon mx-2"
                style={{
                  width: "fit-content",
                }}
              >
                <IoInformationCircleSharp
                  style={{ cursor: "pointer" }}
                  color="blue"
                  size={25}
                />
                {/* <div className="dropdown-info">
                  <p>
                    We will be using these details to match you with the right
                    buyer.
                  </p>
                </div> */}
              </div>
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
