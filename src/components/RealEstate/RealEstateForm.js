import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { Row, Col, Button } from "react-bootstrap";
import RealEstateDetails from "./RealEstateDetails";
import SellHeader from "../SellRegister/SellHeader";
function RealEstateForm({
  step,
  setStep,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
}) {
  const [subStep, setSubStep] = useState(`${step}.1`);
  const { register, handleSubmit } = useForm();

  const [address, setAddress] = useState(
    propertyTest.details?.property_address?.formatted_street_address || ""
  );
  const [address1, setAddress1] = useState("");
  const [state, setState] = useState(
    propertyTest.details?.property_address?.state || ""
  );
  const [city, setCity] = useState(
    propertyTest.details?.property_address?.city || ""
  );
  const [country, setCountry] = useState(
    propertyTest.details?.property_address?.country || ""
  );
  const [zip, setZip] = useState(
    propertyTest.details?.property_address?.zip_code || ""
  );

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      console.log(results);
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
      console.log(zipcodes);
      setZip(
        zipcodes[0].long_name ? zipcodes[0].long_name : zipcodes[0].short_name
      );
    });
  };

  const onSubmit = (data) => {
    setSubStep(`${step}.2`);
  };

  if (subStep === `${step}.1`) {
    return (
      <div className="wrapper">
        <SellHeader step={step} />
        <div className="sell-bottom">
          <h3>Search Property</h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            className="list-form"
          >
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
                        Street Address{" "}
                        <span style={{ color: "#ff0000" }}>*</span>
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
            </Row>
            <Row className="mt-3">
              <Col>
                <input
                  className="form-control"
                  type="text"
                  name="address1"
                  placeholder="Address"
                  onChange={(e) => setAddress1(e.target.value)}
                />
                <span style={{ fontWeight: "600", color: "black" }}>
                  Address Line 2
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <input
                  className="form-control"
                  type="text"
                  name="city"
                  placeholder="City"
                  defaultValue={city}
                  {...register("city", { required: false })}
                  required
                />
                <span style={{ fontWeight: "600", color: "black" }}>
                  City <span style={{ color: "#ff0000" }}>*</span>
                </span>
              </Col>
              <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                <input
                  className="form-control"
                  type="text"
                  name="state"
                  placeholder="State"
                  defaultValue={state}
                  {...register("state", { required: false })}
                  required
                />
                <span style={{ fontWeight: "600", color: "black" }}>
                  State <span style={{ color: "#ff0000" }}>*</span>
                </span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col xs={12} md={6}>
                <input
                  className="form-control"
                  type="text"
                  name="country"
                  placeholder="Country"
                  defaultValue={country}
                  {...register("country", {
                    required: false,
                    maxLength: 100,
                  })}
                  required
                />
                <span style={{ fontWeight: "600", color: "black" }}>
                  Country <span style={{ color: "#ff0000" }}>*</span>
                </span>
              </Col>
              <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                <input
                  className="form-control"
                  type="text"
                  name="zip"
                  placeholder="Zip Code"
                  defaultValue={zip}
                  {...register("zipCode", { required: false })}
                  required
                />
                <span style={{ fontWeight: "600", color: "black" }}>
                  Zip Code <span style={{ color: "#ff0000" }}>*</span>
                </span>
              </Col>
            </Row>
            <Row className="mt-5 justify-content-center">
              <Button
                className="pre-btn"
                onClick={() => {
                  setStep(step - 1);
                }}
              >
                Previous
              </Button>
              <Button type="submit" className="nxt-btn" id="next">
                Next
              </Button>
            </Row>
          </form>
        </div>
      </div>
    );
  }
  if (subStep === `${step}.2`) {
    console.log("rers");
    return (
      <div className="wrapper">
        <RealEstateDetails
          step={step}
          setStep={setStep}
          property_address={{ address, city, state, country, zip }}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
          toggleSignIn={toggleSignIn}
        />
      </div>
    );
  }
}

export default RealEstateForm;
