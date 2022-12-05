import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Button, Form } from "react-bootstrap";
import authService from "../../services/authServices";
import { BsQuestionCircleFill } from "react-icons/bs";
import NumberFormat from "react-number-format";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

function RealEstateDetails({
  step,
  setStep,
  property_address,
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
  const [ownerName, setOwnerName] = useState(
    propertyTest.details?.owner?.name || ""
  );
  const [bathrooms, setBathrooms] = useState(
    propertyTest.details?.structure?.baths_count || ""
  );
  const [bedrooms, setBedrooms] = useState(
    propertyTest.details?.structure?.beds_count || ""
  );
  const [propType, setPropType] = useState(
    propertyTest.details?.real_estate_type || ""
  );
  const [totalValue, setTotalValue] = useState(
    propertyTest.details?.market_assessments?.slice(-1)[0]["total_value"] || ""
  );
  const [year, setYear] = useState(propertyTest.details?.year_built || "");
  const [lotSize, setLotSize] = useState(
    propertyTest.details?.parcel?.lot_size || ""
  );
  const [garage, setGarage] = useState(
    propertyTest.details?.type_of_garage || ""
  );
  const [story, setStory] = useState(
    propertyTest.details?.number_of_stories || ""
  );

  const [sqft, setSqft] = useState(
    propertyTest.details?.parcel?.area_sq_ft || ""
  );
  const [reservedAmount, setReservedAmount] = useState(
    propertyTest.reservedAmount || ""
  );
  const [discussedAmount, setDiscussedAmount] = useState(
    propertyTest.discussedAmount || ""
  );
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

  const realEstateType = [
    { value: "villa", name: "Villa" },
    { value: "house", name: "House" },
    { value: "estate", name: "Estate" },
    { value: "country_house", name: "Country House" },
    { value: "finca", name: "Finca" },
    { value: "chalet", name: "Chalet" },
    { value: "townhouse", name: "Townhouse" },
    { value: "bungalow", name: "Bungalow" },
    { value: "apartment", name: "Apartment" },
    { value: "penthouse", name: "Penthouse" },
    { value: "condo", name: "Condo" },
    { value: "co_op", name: "Co-Op" },
    // { value: "land", name: "Land" },
    { value: "castle", name: "Castle" },
    { value: "chateau", name: "Chateau" },
    { value: "farm_ranch", name: "Farm Ranch" },
    { value: "private_island", name: "Private Island" },
  ];

  console.log(summary);

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) < parseInt(data.discussedAmount)) {
      setMessage("");
      setTimeout(() => {
        setMessage(
          "Reserved amount should be greater than or eequal to discussed amount"
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
          street_address: address,
          city,
          state,
          country,
          zip_code: zip,
          lat,
          lng,
          real_estate_type: propType,
          year_built: parseInt(year),
          owner_name: ownerName,
          baths_count: parseInt(bathrooms),
          beds_count: parseInt(bedrooms),
          total_value: parseInt(totalValue),
          area_sq_ft: parseInt(sqft),
          lot_size: parseInt(lotSize),
          type_of_garage: garage,
          number_of_stories: parseInt(story),
          description: descriptions,
          reservedAmount: parseInt(reservedAmount),
          discussedAmount: parseInt(discussedAmount),
          step: 2,
        };
        authService
          .editRealEstate(propertyTest._id, submitedData)
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
      <h3>Property Details</h3>
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
                    Street Address <span style={{ color: "#ff0000" }}>*</span>
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
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600", color: "black" }}>
              City <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              name="city"
              value={city}
              {...register("city")}
              onChange={(e) => setCity(e.target.value)}
              required
              // readOnly
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              name="state"
              value={state}
              {...register("state")}
              onChange={(e) => setState(e.target.value)}
              required
              // readOnly
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              name="country"
              value={country}
              {...register("country")}
              onChange={(e) => setCountry(e.target.value)}
              required
              // readOnly
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              name="zipCode"
              value={zip}
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
              Owner/Entity Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={ownerName}
              {...register("ownerName")}
              name="ownerName"
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Property Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <Form.Select
              className="form-control custom-input"
              value={propType}
              onChange={(e) => setPropType(e.target.value)}
              required
            >
              <option value="">Select</option>
              {realEstateType.map((item, index) => (
                <option value={item.value} key={index}>
                  {item.name}
                </option>
              ))}
            </Form.Select>
            {/* <select
              type="text"
              className="form-control custom-input"
              value={propType}
              {...register("propertyType")}
              onChange={(e) => setPropType(e.target.value)}
              name="propertyType"
              required
            >
              <option value="house">House</option>
              <option value="villa">Villa</option>
              <option value="estate">Estate</option>
              <option value="country_house">Country House</option>
              <option value="finca">Finca</option>
              <option value="chalet">Chalet</option>
              <option value="townhouse">Townhouse</option>
              <option value="bungalow">Bungalow</option>
              <option value="apartment">Apartment</option>
              <option value="penthouse">Penthouse</option>
              <option value="condo">Condo</option>
              <option value="co_op">Co-op</option>
              <option value="land">Land</option>
              <option value="castle">Castle</option>
              <option value="chateau">Chateau</option>
              <option value="farm_ranch">Farm Ranch</option>
              <option value="private_island">Private Island</option>
            </select> */}
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Year Built <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              format="####"
              className="form-control custom-input"
              placeholder="YYYY"
              defaultValue={year}
              onValueChange={(values) => {
                const { value } = values;
                setYear(value);
              }}
              name="year"
              required
            />
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Lot Size (Acre) <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              className="form-control custom-input"
              value={lotSize}
              allowNegative={false}
              onValueChange={(values) => {
                const { value } = values;
                setLotSize(value);
              }}
              name="lotSize"
              required
            />
            {/* <input
              type="number"
              className="form-control custom-input"
              min="0"
              step="any"
              defaultValue={lotSize}
              {...register("lotSize")}
              onChange={(e) => setLotSize(e.target.value)}
              name="lotSize"
              required
            /> */}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <span style={{ fontWeight: "600", color: "black" }}>
              Garage(s) <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <input
              type="text"
              className="form-control custom-input"
              defaultValue={garage}
              {...register("garage")}
              onChange={(e) => setGarage(e.target.value)}
              name="garage"
              required
            />
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Story(s) <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              className="form-control custom-input"
              thousandSeparator={true}
              value={story}
              allowNegative={false}
              onValueChange={(values) => {
                const { value } = values;
                setStory(value);
              }}
              name="story"
              required
            />
            {/* <input
              type="number"
              min="0"
              className="form-control custom-input"
              defaultValue={story}
              {...register("story")}
              onChange={(e) => setStory(e.target.value)}
              name="story"
              required
            /> */}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Bedrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              format="###"
              className="form-control custom-input"
              thousandSeparator={true}
              value={bedrooms}
              allowNegative={false}
              onValueChange={(values) => {
                const { value } = values;
                setBedrooms(value);
              }}
              name="bedrooms"
              required
            />
            {/* <input
              type="number"
              min="0"
              className="form-control custom-input"
              defaultValue={bedrooms}
              {...register("bedrooms")}
              onChange={(e) => setBedrooms(e.target.value)}
              name="bedrooms"
              required
            /> */}
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Bathrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              format="###"
              className="form-control custom-input"
              thousandSeparator={true}
              value={bathrooms}
              allowNegative={false}
              onValueChange={(values) => {
                const { value } = values;
                setBathrooms(value);
              }}
              name="bathrooms"
              required
            />
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <span style={{ fontWeight: "600", color: "black" }}>
              Total Market Value <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={totalValue}
              allowNegative={false}
              className="form-control custom-input"
              onValueChange={(values) => {
                const { value } = values;
                setTotalValue(value);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <span style={{ fontWeight: "600", color: "black" }}>
              Sqft <span style={{ color: "#ff0000" }}>*</span>
            </span>
            <NumberFormat
              thousandSeparator={true}
              className="form-control custom-input"
              value={sqft}
              allowNegative={false}
              onValueChange={(values) => {
                const { value } = values;
                setSqft(value);
              }}
              name="sqft"
              required
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
            <Button className="pre-btn" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
            <Button
              // onClick={saveInfo}
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

export default RealEstateDetails;
