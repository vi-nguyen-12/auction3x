import React, { useEffect, useState } from "react";
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
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";

function Ownership({
  toggleStep,
  step,
  setStep,
  ownership,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
  setMessage,
}) {
  const user = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [isOwner, setIsOwner] = useState(
    propertyTest.details?.broker_name ? false : true
  );
  const [ownerName, setOwnerName] = useState(
    propertyTest.details?.owner_name || ""
  );
  const [ownerEmail, setOwnerEmail] = useState(
    propertyTest.details?.owner_email || ""
  );
  const [ownerPhone, setOwnerPhone] = useState(
    propertyTest.details?.owner_phone || ""
  );
  const [brokerName, setBrokerName] = useState(
    propertyTest.details?.broker_name || ""
  );
  const [brokerId, setBrokerId] = useState(
    propertyTest.details?.broker_id || ""
  );
  const [phone, setPhone] = useState(propertyTest.details?.phone || user.phone);
  const [email, setEmail] = useState(propertyTest.details?.email || user.email);
  const [address, setAddress] = useState(propertyTest.details?.address || "");

  const [listingAgreements, setListingAgreements] = useState(
    propertyTest.details?.broker_documents?.filter(
      (item) => item.officialName === "listing_agreement"
    ) || []
  );

  const [attorney, setAttorney] = useState(
    propertyTest.details?.broker_documents?.filter(
      (item) => item.officialName === "power_of_attorney"
    ) || []
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

  const getAttorneyFile = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((res) => {
      setAttorney((prev) =>
        res.data.map((doc) => ({ ...doc, officialName: "power_of_attorney" }))
      );
    });
  };

  const handleDelete = (url) => () => {
    setListingAgreements(
      listingAgreements.filter((document) => document.url !== url)
    );
  };

  const handleDeleteAttorney = (url) => () => {
    setAttorney(attorney.filter((document) => document.url !== url));
  };

  useEffect(() => {
    if (!propertyTest.details && isOwner === true) {
      setBrokerName("");
      setOwnerName(user.firstName + " " + user.lastName);
    } else if (!propertyTest.details && isOwner === false) {
      setOwnerName("");
      setBrokerName(user.firstName + " " + user.lastName);
    }
  }, [isOwner]);

  const onSubmit = (data) => {
    if (ownerName === "" || phone === "" || email === "" || address === "") {
      setMessage("");
      setTimeout(() => {
        setMessage("Please enter ownership information");
      }, 100);
    } else {
      let submitedData;
      if (data.brokerName !== "") {
        submitedData = {
          type: propertyTest.type,
          details: {
            owner_name: ownerName,
            broker_name: brokerName ? brokerName : null,
            broker_id: brokerId ? brokerId : null,
            owner_email: ownerEmail ? ownerEmail : null,
            owner_phone: ownerPhone ? ownerPhone : null,
            phone: phone,
            email: email,
            address: address,
            broker_documents: [...listingAgreements, ...attorney],
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
      submitedData.details.owner_phone === null &&
        delete submitedData.details.owner_phone;
      submitedData.details.owner_email === null &&
        delete submitedData.details.owner_email;
      submitedData.details.broker_name === null &&
        delete submitedData.details.broker_name;
      submitedData.details.broker_id === null &&
        delete submitedData.details.broker_id;
      submitedData?.details?.broker_documents?.length === 0 &&
        delete submitedData.details.broker_documents;
      if (propertyTest._id) {
        if (propertyTest.type === "real-estate") {
          authService
            .editRealEstate(propertyTest._id, submitedData)
            .then((res) => {
              if (res.data.error) {
                if (res.data.error === "Invalid Token") {
                  toggleSignIn(true);
                } else {
                  setMessage("");
                  setMessage(res.data.error);
                }
              } else {
                setPropertyTest(res.data);
                setStep(2);
              }
            });
        } else {
          authService
            .editProperty(propertyTest._id, submitedData)
            .then((res) => {
              if (res.data.error) {
                if (res.data.error === "Invalid Token") {
                  toggleSignIn(true);
                } else {
                  setMessage("");
                  setMessage(res.data.error);
                }
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
            } else {
              setMessage("");
              setMessage(res.data.error);
            }
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
              className="submitBtn border-0"
              style={{
                background: isOwner ? "#d68e5a" : "#edb48b",
              }}
              onClick={() => {
                setIsOwner(true);
              }}
            >
              Owner
            </Button>
            <Button
              className="submitBtn border-0 mx-2"
              style={{
                background: !isOwner ? "#d68e5a" : "#edb48b",
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
                      value={
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
                      required
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
                      required
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
                <Col xs={12} md={5} lg={4}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Owner/Entity Name{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={
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
                <Col xs={12} md={5} lg={4}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Owner Email <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      ownerEmail
                        ? ownerEmail
                        : ownership
                        ? ownership.details.owner_email
                        : ""
                    }
                    onChange={(e) => setOwnerEmail(e.target.value)}
                    required
                  />
                </Col>
                <Col xs={12} md={5} lg={4}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Owner Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au"]}
                    disableDropdown={false}
                    country={"us"}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    value={
                      ownerPhone
                        ? ownerPhone
                        : ownership
                        ? ownership.details.owner_phone
                        : null
                    }
                    inputStyle={{ width: "100%" }}
                    buttonStyle={{
                      borderRight: "none",
                    }}
                    onChange={setOwnerPhone}
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker Name <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="text"
                    className="form-control"
                    value={
                      brokerName
                        ? brokerName
                        : ownership
                        ? ownership.details.broker_name
                        : ""
                    }
                    {...register("brokerName", { required: false })}
                    onChange={(e) => setBrokerName(e.target.value)}
                    required
                  />
                </Col>
                <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker License Number{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </span>
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
                    onInput={(e) => {
                      e.target.value = e.target.value.toUpperCase();
                    }}
                    {...register("brokerId", { required: false })}
                    onChange={(e) => setBrokerId(e.target.value)}
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Listing Agreement(.pdf){" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="file"
                    id="docu"
                    accept=".pdf"
                    className="form-control"
                    onChange={getFile}
                    hidden
                    multiple
                  />
                  <div className="d-flex">
                    <label htmlFor="docu" className="btn btn-primary rounded-0">
                      Upload
                    </label>
                  </div>
                  <div className="d-grid">
                    {listingAgreements.map((doc, index) => (
                      <span key={index}>
                        {doc.name}
                        <Button
                          className="bg-transparent border-0"
                          onClick={handleDelete(doc.url)}
                        >
                          <MdClose fontSize="1.5em" color="red" />
                        </Button>
                      </span>
                    ))}
                  </div>
                </Col>
                <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Power of Attorney(.pdf){" "}
                  </span>
                  <input
                    type="file"
                    id="docus"
                    accept=".pdf"
                    className="form-control"
                    onChange={getAttorneyFile}
                    hidden
                    multiple
                  />
                  <div className="d-flex">
                    <label
                      htmlFor="docus"
                      className="btn btn-primary rounded-0"
                    >
                      Upload
                    </label>
                  </div>
                  <div className="d-grid">
                    {attorney.map((doc, index) => (
                      <span key={index}>
                        {doc.name}
                        <Button
                          className="bg-transparent border-0"
                          onClick={handleDeleteAttorney(doc.url)}
                        >
                          <MdClose fontSize="1.5em" color="red" />
                        </Button>
                      </span>
                    ))}
                  </div>
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
                    Broker Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
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
                    required
                  />
                </Col>
                <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker Email <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={
                      email ? email : ownership ? ownership.details.email : ""
                    }
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
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
