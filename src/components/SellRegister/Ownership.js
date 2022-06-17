import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { set, useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import SellHeader from "./SellHeader";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import { Autocomplete } from "@react-google-maps/api";

function Ownership({
  toggleStep,
  step,
  getOwnerShip,
  propertyType,
  getPropId,
  toggleSellStep,
  propId,
  ownership,
}) {
  const { register, handleSubmit } = useForm();
  const [showOwner, setShowOwner] = useState("none");
  const [showBroker, setShowBroker] = useState("none");
  const [ownerName, setOwnerName] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [listAgree, setListAgree] = useState([]);
  const [select, setSelect] = useState("");

  const params = useParams();

  const getFile = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((res) => {
      setListAgree(res.data);
    });
  };

  const listing_agreement = listAgree.map((document) => {
    return { ...document, officialName: "listing_agreement" };
  });

  const saveInfo = async () => {
    if (propertyType === "real-estate") {
      if (propId || params.id) {
        const datas = {
          id: propId ? propId : params.id,
          changes: {
            type: propertyType,
            details: {
              owner_name: ownerName,
              broker_name: brokerName ? brokerName : null,
              broker_id: brokerId ? brokerId : null,
              phone: phone,
              email: email,
              address: address,
            },
            documents: listing_agreement ? listing_agreement : null,
            step: parseInt(1),
          },
        };
        await authService.putRealEstateInfo(datas).then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            toggleSellStep(1);
          }
        });
      } else {
        const datas = {
          type: propertyType,
          details: {
            owner_name: ownerName,
            broker_name: brokerName ? brokerName : null,
            broker_id: brokerId ? brokerId : null,
            phone: phone,
            email: email,
            address: address,
          },
          documents: listing_agreement ? listing_agreement : null,
          step: parseInt(1),
        };
        await authService.postRealEstateInfo(datas).then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            getPropId(res.data._id);
            toggleSellStep(1);
          }
        });
      }
    } else {
      if (propId || params.id) {
        const datas = {
          id: propId ? propId : params.id,
          changes: {
            type: propertyType,
            details: {
              owner_name: ownerName,
              broker_name: brokerName ? brokerName : null,
              broker_id: brokerId ? brokerId : null,
              phone: phone,
              email: email,
              address: address,
            },
            documents: listing_agreement ? listing_agreement : null,
            step: parseInt(1),
          },
        };
        await authService.putPropInfo(datas).then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            toggleSellStep(1);
          }
        });
      } else {
        const data = {
          type: propertyType,
          details: {
            owner_name: ownerName,
            broker_name: brokerName ? brokerName : null,
            broker_id: brokerId ? brokerId : null,
            phone: phone,
            email: email,
            address: address,
          },
          documents: listing_agreement ? listing_agreement : null,
          step: parseInt(1),
        };
        authService.postPropInfo(data).then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            getPropId(res.data._id);
            toggleSellStep(1);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (params.step) {
      authService.getIncompleteProperty(params.userId).then((res) => {
        const property = res.data.filter((prop) => prop._id === params.id);
        if (property[0].details.broker_id) {
          setShowBroker("block");
          setShowOwner("none");
          setBrokerName(property[0].details.broker_name);
          setBrokerId(property[0].details.broker_id);
          setOwnerName(property[0].details.owner_name);
          setPhone(property[0].details.phone);
          setEmail(property[0].details.email);
          setAddress(property[0].details.address);
        } else if (!property[0].details.broker_id) {
          setShowOwner("block");
          setShowBroker("none");
          setOwnerName(property[0].details.owner_name);
          setPhone(property[0].details.phone);
          setEmail(property[0].details.email);
          setAddress(property[0].details.address);
        }
      });
    }

    if (ownership) {
      if (ownership.details.broker_id) {
        setShowBroker("block");
        setOwnerName(ownership.details.owner_name);
        setPhone(ownership.details.phone);
        setEmail(ownership.details.email);
        setAddress(ownership.details.address);
        setBrokerName(
          ownership.details.broker_name ? ownership.details.broker_name : null
        );
        setBrokerId(
          ownership.details.broker_id ? ownership.details.broker_id : null
        );
      } else {
        setShowOwner("block");
        setOwnerName(ownership.details.owner_name);
        setPhone(ownership.details.phone);
        setEmail(ownership.details.email);
        setAddress(ownership.details.address);
      }
    }
  }, [params.step]);

  const onSubmit = (data) => {
    if (ownerName === "" || phone === "" || email === "" || address === "") {
      alert("Please enter ownership information");
    } else if (data.brokerName !== "") {
      const datas = {
        type: propertyType,
        details: {
          owner_name: ownerName,
          broker_name: brokerName ? brokerName : null,
          broker_id: brokerId ? brokerId : null,
          phone: phone,
          email: email,
          address: address,
        },
        documents: listing_agreement ? listing_agreement : null,
        step: parseInt(1),
      };
      getOwnerShip(datas);
      toggleStep(step + 1);
    } else {
      if (data.brokerName === "") {
        const datas = {
          type: propertyType,
          details: {
            owner_name: ownerName,
            phone: phone,
            email: email,
            address: address,
          },
          step: parseInt(1),
        };
        getOwnerShip(datas);
        toggleStep(step + 1);
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
                color: select === "1" ? "white" : "black",
                fontWeight: "bold",
                background: select === "1" && "rgb(233 184 135)",
              }}
              onClick={() => {
                setShowBroker("none");
                setShowOwner("block");
                setSelect("1");
              }}
            >
              Owner
            </Button>
            <Button
              className="submitBtn"
              style={{
                margin: "0px 10px",
                border: "none",
                color: select === "2" ? "white" : "black",
                fontWeight: "bold",
                background: select === "2" && "rgb(233 184 135)",
              }}
              onClick={() => {
                setShowOwner("none");
                setShowBroker("block");
                setSelect("2");
              }}
            >
              Broker
            </Button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            style={{ display: showOwner }}
          >
            <Row>
              <Row className="mt-5">
                <h5
                  style={{
                    borderBottom: "2px solid gray",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  Owner Information
                </h5>
              </Row>
              <Row className="mt-3 d-flex justify-content-center">
                <Col>
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
                  <span style={{ fontWeight: "600" }}>
                    Owner/Entity Name{" "}
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
                  {/* <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      address
                        ? address
                        : ownership
                        ? ownership.details.address
                        : ""
                    }
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Address <span style={{ color: "#ff0000" }}>*</span>{" "}
                  </span> */}
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
                      border: "2px solid #d58f5c",
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
                <Button
                  className="pre-btn"
                  onClick={() => toggleStep(step - 1)}
                >
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

          <form
            style={{ display: showBroker }}
            onSubmit={handleSubmit(onSubmit)}
          >
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
                  Owner/Entity Name <span style={{ color: "#ff0000" }}>*</span>
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
                    border: "2px solid #d58f5c",
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
                <Button
                  className="pre-btn"
                  onClick={() => window.location.reload()}
                >
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
        </Container>
      </div>
    </div>
  );
}

export default Ownership;
