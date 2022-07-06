import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";

import PhoneInput from "react-phone-input-2";
import SellHeader from "./SellHeader";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import { scryRenderedComponentsWithType } from "react-dom/test-utils";
import { Autocomplete } from "@react-google-maps/api";

function Ownership({
  toggleStep,
  step,
  setStep,
  ownership,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
}) {
  const { register, handleSubmit } = useForm();
  const [isOwner, setIsOwner] = useState(
    propertyTest.details?.broker_name ? false : true
  );
  const [ownerName, setOwnerName] = useState(
    propertyTest.details?.owner_name || ""
  );
  const [brokerName, setBrokerName] = useState(
    propertyTest.details?.broker_name || ""
  );
  const [brokerId, setBrokerId] = useState(
    propertyTest.details?.broker_id || ""
  );
  const [phone, setPhone] = useState(propertyTest.details?.phone || "");
  const [email, setEmail] = useState(propertyTest.details?.email || "");
  const [address, setAddress] = useState(propertyTest.details?.address || "");
  const [city, setCity] = useState(propertyTest.details?.address?.city || "");
  const [state, setState] = useState(
    propertyTest.details?.address?.state || ""
  );
  const [zip, setZip] = useState(propertyTest.details?.address?.zip_code || "");
  const [country, setCountry] = useState(
    propertyTest.details?.address?.country || ""
  );

  const [listingAgreements, setListingAgreements] = useState(
    propertyTest.details?.broker_documents || []
  );

  const getFile = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((res) => {
      setListingAgreements((prev) =>
        res.data.map((doc) => ({ ...doc, officialName: "listing_agreement" }))
      );
    });
  };

  const onSubmit = (data) => {
    if (ownerName === "" || phone === "" || email === "" || address === "") {
      alert("Please enter ownership information");
    } else {
      let submitedData;
      if (data.brokerName !== "") {
        submitedData = {
          type: propertyTest.type,
          details: {
            owner_name: ownerName,
            broker_name: brokerName ? brokerName : null,
            broker_id: brokerId ? brokerId : null,
            phone: phone,
            email: email,
            address: address,
            broker_documents: listingAgreements,
          },
          step: 1,
        };
      } else {
        submitedData = {
          type: propertyTest.type,
          details: {
            owner_name: ownerName,
            phone: phone,
            email: email,
            address: address,
          },
          step: 1,
        };
      }
      if (propertyTest._id) {
        if (propertyTest.type === "real-estate") {
          authService
            .editRealEstate(propertyTest._id, submitedData)
            .then((res) => {
              console.log(res.data);
              if (res.data.error) {
                if (res.data.error === "Invalid Token") {
                  toggleSignIn(true);
                } else alert(res.data.error);
              } else {
                setPropertyTest(res.data);
                setStep(2);
              }
            });
        } else {
          authService
            .editProperty(propertyTest._id, submitedData)
            .then((res) => {
              console.log(res.data);
              if (res.data.error) {
                if (res.data.error === "Invalid Token") {
                  toggleSignIn(true);
                } else alert(res.data.error);
              } else {
                setPropertyTest(res.data);
                setStep(2);
              }
            });
        }
      } else {
        authService.createProperty(submitedData).then((res) => {
          if (res.data.error) {
            if (res.data.error === "Invalid Token") {
              toggleSignIn(true);
            } else alert(res.data.error);
          } else {
            setPropertyTest(res.data);
            setStep(2);
          }
        });
      }
    }
  };

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      setAddress(results[0].formatted_address);

      let cities = results[0].address_components.filter((item) => {
        return item.types.includes(
          "locality" || "sublocality" || "neighborhood"
        );
      });
      setCity(cities[0] ? cities[0]?.long_name : cities[0]?.short_name);

      let states = results[0].address_components.filter((item) => {
        return item.types[0] === "administrative_area_level_1";
      });
      setState(states[0] ? states[0].long_name : states[0]?.short_name);

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
      setZip(zipcodes[0] ? zipcodes[0]?.long_name : zipcodes[0]?.short_name);
    });
  };

  return (
    <div className="wrapper">
      <SellHeader step={step} />
      <div className="sell-bottom">
        <Container>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Button
              className="submitBtn"
              style={{
                border: "none",
                color: isOwner ? "black" : "white",
                fontWeight: "bold",
                background: !isOwner && "rgb(233 184 135)",
              }}
              onClick={() => {
                setIsOwner(true);
              }}
            >
              Owner
            </Button>
            <Button
              className="submitBtn"
              style={{
                margin: "0px 10px",
                border: "none",
                color: !isOwner ? "black" : "white",
                fontWeight: "bold",
                background: isOwner && "rgb(233 184 135)",
              }}
              onClick={() => {
                setIsOwner(false);
              }}
            >
              Broker
            </Button>
          </div>
          {isOwner ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Row className="mt-5">
                  <h5
                    style={{
                      borderBottom: "2px solid gray",
                      fontWeight: "bold",
                      fontSize: "18px",
                      color: "black",
                      textAlign: "center",
                    }}
                  >
                    Owner Information
                  </h5>
                </Row>
                <Row className="mt-3 d-flex justify-content-center">
                  <Col>
                    <span style={{ fontWeight: "600" }}>
                      Owner/Entity Name{" "}
                      <span style={{ color: "#ff0000" }}>*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      defaultValue={
                        ownerName
                          ? ownerName
                          : ownership
                          ? ownership.details.owner_name
                          : ""
                      }
                      onChange={(e) => setOwnerName(e.target.value)}
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
                </Row>
                <Row className="mt-3">
                  <Col xs={12} md={6}>
                    <span style={{ fontWeight: "600", color: "black" }}>
                      Phone <span style={{ color: "#ff0000" }}>*</span>
                    </span>
                    <PhoneInput
                      disableCountryCode={false}
                      onlyCountries={["ca", "us", "gb", "au"]}
                      disableDropdown={false}
                      country={"us"}
                      dropdownStyle={{ paddingLeft: "0!important" }}
                      value={
                        phone
                          ? phone
                          : ownership
                          ? ownership.details.phone
                          : null
                      }
                      inputStyle={{ width: "100%" }}
                      buttonStyle={{
                        borderRight: "none",
                      }}
                      onChange={setPhone}
                    />
                  </Col>
                  <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                    <span style={{ fontWeight: "600", color: "black" }}>
                      Email <span style={{ color: "#ff0000" }}>*</span>
                    </span>
                    <input
                      type="email"
                      className="form-control"
                      defaultValue={
                        email ? email : ownership ? ownership.details.email : ""
                      }
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </Col>
                </Row>
              </Row>
              <Row className="mt-5">
                <Col className="d-flex justify-content-center mt-2">
                  <Button
                    className="pre-btn"
                    onClick={() => window.location.reload()}
                  >
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
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row className="mt-5">
                <Col
                  style={{
                    borderBottom: "2px solid gray",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Broker Information
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={4}>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      ownerName
                        ? ownerName
                        : ownership
                        ? ownership.details.owner_name
                        : ""
                    }
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Owner/Entity Name{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
                <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      brokerName
                        ? brokerName
                        : ownership
                        ? ownership.details.broker_name
                        : ""
                    }
                    {...register("brokerName", { required: false })}
                    onChange={(e) => setBrokerName(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker Name <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
                <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      brokerId
                        ? brokerId
                        : ownership
                        ? ownership.details.broker_id
                        : ""
                    }
                    {...register("brokerId", { required: false })}
                    onChange={(e) => setBrokerId(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker License Number{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <input
                    type="file"
                    accept=".pdf"
                    className="form-control"
                    // defaultValue={listingAgreements}
                    {...register("file", { onChange: getFile })}
                    multiple
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Listing Agreement(.pdf){" "}
                    <span style={{ color: "#ff0000" }}>*</span>
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
                          Address <span style={{ color: "#ff0000" }}>*</span>
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
                <Col xs={12} md={6}>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au"]}
                    disableDropdown={false}
                    country={"us"}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    value={
                      phone ? phone : ownership ? ownership.details.phone : null
                    }
                    inputStyle={{ width: "100%" }}
                    buttonStyle={{
                      borderRight: "none",
                    }}
                    onChange={setPhone}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
                <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={
                      email ? email : ownership ? ownership.details.email : ""
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Email <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
              </Row>

              <Row className="mt-5">
                <Col className="d-flex justify-content-center mt-2">
                  <Button
                    className="pre-btn"
                    onClick={() => window.location.reload()}
                  >
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
          )}
        </Container>
      </div>
    </div>
  );
}

export default Ownership;
