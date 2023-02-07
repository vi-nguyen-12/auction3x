import React, { useEffect, useState, useMemo } from "react";
import { Row, Col, Container, Button, Modal, Form } from "react-bootstrap";
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
import { BsQuestionCircleFill } from "react-icons/bs";

function Ownership({
  toggleStep,
  step,
  setStep,
  ownership,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
  setMessage,
  windowSize,
}) {
  const user = useSelector((state) => state.user);
  const [ownershipType, setOwnershipType] = useState(
    propertyTest.details?.ownership_type?.name || ""
  );
  const [otherOwnershipType, setOtherOwnershipType] = useState(
    propertyTest.details?.ownership_type?.name || ""
  );
  const [otherOwnershipName, setOtherOwnershipName] = useState(
    propertyTest.details?.ownership_type?.secondary_owner ||
    propertyTest.details?.ownership_type?.corporate_name ||
    propertyTest.details?.ownership_type?.trust_name ||
    ""
  );
  const [addNewRow, setAddNewRow] = useState(false);
  const [newBroker, setNewBroker] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [newlicense, setNewLicense] = useState({
    number: "",
    state: "",
    expired_date: "",
  });
  const [addBroker, setAddBroker] = useState(false);
  const [addLicense, setAddlicense] = useState(false);
  const toggleAddBroker = () => setAddBroker(!addBroker);
  const toggleAddLicense = () => setAddlicense(!addLicense);
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
    propertyTest.details?.broker_licenses
      ? propertyTest.details?.broker_licenses[0]?.number
      : ""
  );
  const [phone, setPhone] = useState(propertyTest.details?.phone || user.phone);
  const [email, setEmail] = useState(propertyTest.details?.email || user.email);
  const [address, setAddress] = useState(propertyTest.details?.address || "");

  const [listingAgreements, setListingAgreements] = useState(
    propertyTest.details?.broker_documents?.filter(
      (item) => item.officialName === "listing_agreement"
    ) || []
  );

  const [licenseExpireDate, setLicenseExpireDate] = useState(
    propertyTest.details?.broker_licenses
      ? propertyTest.details?.broker_licenses[0]?.expired_date
      : user.agent?.licenseExpireDate
  );
  const [licenseState, setLicenseState] = useState(
    propertyTest.details?.broker_licenses
      ? propertyTest.details?.broker_licenses[0]?.state
      : user.agent?.licenseState
  );
  const [changeDate, setChangeDate] = useState(false);
  const [changeLicense, setChangeLicense] = useState(false);
  const [brokerLicenses, setBrokerLicenses] = useState(
    propertyTest.details?.broker_licenses || [
      {
        number: brokerId
          ? brokerId
          : propertyTest.details?.broker_licenses
            ? propertyTest.details?.broker_licenses[0]?.number
            : user.agent?.licenseNumber,
        state: licenseState
          ? licenseState
          : propertyTest.details?.broker_licenses
            ? propertyTest.details?.broker_licenses[0]?.state
            : user.agent?.licenseState,
        expired_date: licenseExpireDate
          ? licenseExpireDate
          : propertyTest.details?.broker_licenses
            ? propertyTest.details?.broker_licenses[0]?.expired_date
            : user.agent?.licenseExpireDate,
      },
    ]
  );
  const [coBroker, setCoBroker] = useState([{
        name: propertyTest.details.broker_name,
        email: propertyTest.details.email,
        phone: propertyTest.details.phone,
      }]);

  const [attorney, setAttorney] = useState(
    propertyTest.details?.broker_documents?.filter(
      (item) => item.officialName === "power_of_attorney"
    ) || []
  );

  const fixDate = (date, param) => {
    const newDate = new Date(date).setDate(
      new Date(date).getDate() + 1 <= 31 ? new Date(date).getDate() + 1 : 1
    );
    const dates = new Date(newDate).setMonth(
      new Date(newDate).getDate() === 1
        ? new Date(newDate).getMonth() + 1
        : new Date(newDate).getMonth()
    );
    if (param !== "return") {
      setLicenseExpireDate(new Date(dates).toISOString());
    } else {
      return new Date(dates).toISOString();
    }
  };

  const addBrokerHandler = () => {
    setCoBroker([
      ...coBroker,
      {
        name: newBroker.name,
        email: newBroker.email,
        phone: newBroker.phone,
      },
    ]);
    setNewBroker({ name: "", email: "", phone: "" });
    setAddNewRow(false);
  };
  
  const addLicenseHandler = () => {
    setBrokerLicenses([
      ...brokerLicenses,
      {
        number: newlicense.number,
        state: newlicense.state,
        expired_date: newlicense.expired_date,
      },
    ]);
    setNewLicense({ number: "", state: "", expired_date: "" });
    setAddNewRow(false);
    
  }
  const handleOnChange = (e) => {
    setNewBroker({ ...newBroker, [e.target.name]: e.target.value });

  };

  const handleOnChangeLicense = (e) => {
    setNewLicense({ ...newlicense, [e.target.name]: e.target.value });
  };

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
      setOwnerName(
        user.firstName[0].toUpperCase() +
        user.firstName.slice(1) +
        " " +
        user.lastName[0].toUpperCase() +
        user.lastName.slice(1)
      );
    } else if (!propertyTest.details && isOwner === false) {
      setOwnerName("");
      setBrokerName(
        user.firstName[0].toUpperCase() +
        user.firstName.slice(1) +
        " " +
        user.lastName[0].toUpperCase() +
        user.lastName.slice(1)
      );
    }
  }, [isOwner]);

  // if brokerId, licenseState and licenseExpireDate are change, then replace index 0 in brokerLicenses
  useEffect(() => {
    if (changeLicense) {
      setBrokerLicenses([
        {
          number: brokerId,
          state: licenseState,
          expired_date: licenseExpireDate,
        },
        ...brokerLicenses.slice(1),
      ]);
    }
  }, [brokerId, licenseState, licenseExpireDate, changeLicense]);

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
            owner_email: ownerEmail ? ownerEmail : null,
            owner_phone: ownerPhone ? ownerPhone : null,
            phone: phone,
            email: email,
            address: address,
            broker_documents: [...listingAgreements, ...attorney],
            broker_licenses: brokerLicenses,
            co_broker: coBroker,
            ownership_type: {
              name: otherOwnershipType ? otherOwnershipType : ownershipType,
              secondary_owner:
                ownershipType === "joint" ? otherOwnershipName : null,
              corporate_name:
                ownershipType === "corporate" ? otherOwnershipName : null,
              trust_name: ownershipType === "trust" ? otherOwnershipName : null,
            },
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
            ownership_type: {
              name: otherOwnershipType ? otherOwnershipType : ownershipType,
              secondary_owner:
                ownershipType === "joint" ? otherOwnershipName : null,
              corporate_name:
                ownershipType === "corporate" ? otherOwnershipName : null,
              trust_name: ownershipType === "trust" ? otherOwnershipName : null,
            },
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
      // submitedData.details.broker_id === null &&
      //   delete submitedData.details.broker_id;
      submitedData?.details?.broker_documents?.length === 0 &&
        delete submitedData.details.broker_documents;
      submitedData.details.ownership_type.secondary_owner === null &&
        delete submitedData.details.ownership_type.secondary_owner;
      submitedData.details.ownership_type.corporate_name === null &&
        delete submitedData.details.ownership_type.corporate_name;
      submitedData.details.ownership_type.trust_name === null &&
        delete submitedData.details.ownership_type.trust_name;

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
      <div className="sell_top_line" />
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
            {user.agent?.licenseNumber === undefined ? (
              <Button
                className="submitBtn border-0 mx-2"
                style={{
                  background: !isOwner ? "#d68e5a" : "#edb48b",
                }}
                onClick={() => {
                  setMessage("");
                  setTimeout(() => {
                    setMessage(
                      "If you want to register to sell as broker, please update profile as broker"
                    );
                  }, 100);
                }}
              >
                Broker
              </Button>
            ) : (
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
            )}
          </div>
          {isOwner ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Row
                  className="mt-5"
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
                </Row>
                <Row className="mt-3 d-flex justify-content-center">
                  <Col xs={12} md={6} lg={6}>
                    <span style={{ fontWeight: "600", color: "black" }}>
                      Ownership Type <span style={{ color: "#ff0000" }}>*</span>
                    </span>
                    {ownershipType === "Other" || otherOwnershipType !== "" ? (
                      <div className="d-flex justify-content-between align-items-end">
                        <input
                          type="text"
                          name="ownershipType"
                          className="form-control custom-input px-1"
                          value={otherOwnershipType}
                          onChange={(e) =>
                            setOtherOwnershipType(e.target.value)
                          }
                          required
                        />
                        <button
                          type="button"
                          className="general_btn py-2 px-3"
                          onClick={() => {
                            setOwnershipType("");
                            setOtherOwnershipType("");
                          }}
                        >
                          Back
                        </button>
                      </div>
                    ) : (
                      <Form.Select
                        className="form-control custom-input"
                        value={ownershipType}
                        onChange={(e) => setOwnershipType(e.target.value)}
                        required
                      >
                        <option value="">Select Ownership Type</option>
                        <option value="individual">Individual</option>
                        <option value="joint">Joint</option>
                        <option value="corporate">Corporate</option>
                        <option value="trust">Trust</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                    )}
                  </Col>
                  <Col xs={12} md={6} lg={6}>
                    <span style={{ fontWeight: "600" }}>
                      Primary Owner/Entity Name{" "}
                      <span style={{ color: "#ff0000" }}>*</span>
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input"
                      disabled={true}
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
                {(ownershipType === "joint" ||
                  ownershipType === "corporate" ||
                  ownershipType === "trust") && (
                    <Row className="mt-3 d-flex justify-content-start">
                      <Col xs={12} md={6} lg={6}>
                        <span style={{ fontWeight: "600" }}>
                          {ownershipType === "joint"
                            ? "Secondary Owner/Entity"
                            : ownershipType === "corporate"
                              ? "Corporate Name"
                              : ownershipType === "trust"
                                ? "Trust Name"
                                : ""}{" "}
                          <span style={{ color: "#ff0000" }}>*</span>
                        </span>
                        <input
                          type="text"
                          className="form-control custom-input"
                          value={otherOwnershipName}
                          onChange={(e) => setOtherOwnershipName(e.target.value)}
                          required
                        />
                      </Col>
                    </Row>
                  )}
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
                              className: "form-control custom-input px-2",
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
                  <Col xs={12} md={6} className="position-relative">
                    <span style={{ fontWeight: "600", color: "black" }}>
                      Phone <span style={{ color: "#ff0000" }}>*</span>
                    </span>
                    <PhoneInput
                      disableCountryCode={false}
                      onlyCountries={["ca", "us", "gb", "au", "in"]}
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
                      inputStyle={{
                        width: "100%",
                        border: "0",
                        borderBottom: "1px solid #ececec",
                        borderRadius: "0",
                      }}
                      buttonStyle={{
                        border: "none",
                        borderRadius: "0",
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
                      className="form-control custom-input"
                      disabled={true}
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
              <Row>
                <Col className="d-flex justify-content-end align-items-center mt-1">
                  <button
                    type="button"
                    onClick={toggleAddBroker}
                    className="general_btn py-2 px-3"
                  >
                    + Add Broker
                  </button>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6} lg={6}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Ownership Type <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  {ownershipType === "Other" ? (
                    <div className="d-flex justify-content-between align-items-end">
                      <input
                        type="text"
                        name="ownershipType"
                        className="form-control custom-input px-1"
                        onChange={(e) => setOwnershipType(e.target.value)}
                      />
                      <button
                        type="button"
                        className="general_btn py-2 px-3"
                        onClick={() => setOwnershipType("")}
                      >
                        Back
                      </button>
                    </div>
                  ) : (
                    <Form.Select
                      className="form-control custom-input"
                      onChange={(e) => setOwnershipType(e.target.value)}
                    // required
                    >
                      <option value="">Select Ownership Type</option>
                      <option value="Individual">Individual</option>
                      <option value="Joint">Joint</option>
                      <option value="Corporate">Corporate</option>
                      <option value="Trust">Trust</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  )}
                </Col>
                <Col xs={12} md={6} lg={6}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Primary Owner/Entity Name{" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="text"
                    className="form-control custom-input"
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
                <Col xs={12} md={6} lg={6}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Owner Email <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="email"
                    className="form-control custom-input"
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
                <Col xs={12} md={6} lg={6}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Owner Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au", "in"]}
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
                    inputStyle={{
                      width: "100%",
                      border: "0",
                      borderBottom: "1px solid #ececec",
                      borderRadius: "0",
                    }}
                    buttonStyle={{
                      border: "none",
                      borderRadius: "0",
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
                    // disabled={true}
                    type="text"
                    className="form-control custom-input"
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
                  <div className="d-flex justify-content-between">
                    {changeLicense ? (
                      <input
                        type="text"
                        className="form-control custom-input"
                        onInput={(e) => {
                          e.target.value = e.target.value.toUpperCase();
                        }}
                        defaultValue={""}
                        onChange={(e) => setBrokerId(e.target.value)}
                        required
                      />
                    ) : (
                      <select
                        value={brokerId}
                        onChange={(e) => setBrokerId(e.target.value)}
                        className="form-control custom-input"
                        required
                        disabled
                      >
                        {brokerLicenses.map((license, i) => (
                          <option key={i} value={license.number}>
                            {license.number}
                          </option>
                        ))}
                      </select>
                    )}
                    <Button
                      variant="primary"
                      onClick={() => setChangeLicense(!changeLicense)}
                      className={`bg-${changeLicense ? "danger" : "success"
                        } border-0 rounded-0 ms-2`}
                    >
                      {changeLicense ? "Cancel" : "New"}
                    </Button>
                  </div>
                  {/* <input
                    type="text"
                    className="form-control custom-input"
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
                  /> */}
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
                  <span
                    style={{ fontWeight: "600", color: "black" }}
                    className="d-flex"
                  >
                    Listing Agreement(.pdf){" "}
                    <span style={{ color: "#ff0000" }}>*</span>
                    <p className="m-0 mx-2 mb-1">
                      <span
                        className="tooltip-bottom"
                        data-tooltip="Employment agreement between owner and broker authorizing the broker to act as listing agent and to find a buyer on seller’s terms."
                      >
                        <BsQuestionCircleFill
                          style={{ cursor: "pointer" }}
                          color="#bf9767"
                          size={23}
                        />
                      </span>{" "}
                    </p>
                  </span>
                  <input
                    type="file"
                    id="docu"
                    accept=".pdf"
                    className="form-control custom-input"
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
                    className="form-control custom-input"
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
                <Col
                  style={{
                    borderBottom: "2px solid gray",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "black",
                    display: "flex",
                    justifyContent: "center",
                  }}
                />
              </Row>
              <Col className="d-flex justify-content-end align-items-center mt-1">
                <button
                  type="button"
                  onClick={toggleAddLicense}
                  className="general_btn py-2 px-3"
                >
                  + Add license
                </button>
              </Col>
              <Row className="mt-3">
                <Col md={6} xs={12}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker License state
                  </span>
                  <input
                    value={licenseState}
                    onChange={(e) => setLicenseState(e.target.value)}
                    type="text"
                    className="form-control custom-input"
                  />
                </Col>
                <Col md={6} xs={12}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker License Expiration Date
                  </span>
                  <div className="d-flex justify-content-between">
                    {!changeDate ? (
                      <input
                        type="text"
                        className="form-control custom-input"
                        value={new Date(licenseExpireDate).toLocaleDateString()}
                        disabled
                      />
                    ) : (
                      <input
                        type="date"
                        className="form-control custom-input"
                        onChange={(e) => fixDate(e.target.value)}
                      />
                    )}
                    <Button
                      variant="primary"
                      onClick={() => setChangeDate(!changeDate)}
                      className={`bg-${changeDate ? "danger" : "success"
                        } border-0 rounded-0 ms-2`}
                    >
                      {changeDate ? "Cancel" : "Change"}
                    </Button>
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
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au", "in"]}
                    disableDropdown={false}
                    country={"us"}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    value={
                      phone ? phone : ownership ? ownership.details.phone : null
                    }
                    inputStyle={{
                      width: "100%",
                      border: "0",
                      borderBottom: "1px solid #ececec",
                      borderRadius: "0",
                    }}
                    buttonStyle={{
                      border: "none",
                      borderRadius: "0",
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
                    disabled={true}
                    type="email"
                    className="form-control custom-input"
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
      <Modal size="lg" show={addBroker} onHide={toggleAddBroker} centered>
        <Modal.Header className="login-modal-header" closeButton>
          <Modal.Title
            className="auction-modal-title px-3"
            style={{ fontSize: windowSize < 800 && "1.5rem" }}
          >
            Add Secondary Broker
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-4">
          <Row className="ps-3">
            <Col xs={12} md={6}>
              {coBroker?.map((broker, index) => (
                <Row key={index}>
                  <Col>
                    <Row>
                      <Col>
                        <ul className="list-unstyled">
                          {index === 0 ? (
                            <>
                              <li>
                                <strong>Name:</strong> {broker.name}
                              </li>
                              <li>
                                <strong>Email:</strong> {broker.email}
                              </li>
                              <li>
                                <strong>Exp. Date:</strong>{" "}
                                {new Date(
                                  broker.expired_date
                                ).toLocaleDateString()}
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <strong>Name:</strong> {broker.name}
                              </li>
                              <li>
                                <strong>Email:</strong> {broker.email}
                              </li>
                              <li>
                                <strong>Phone:</strong> {broker.phone}
                              </li>
                            </>
                          )}
                          <li>
                            {index === 0 ? (
                              <div className="d-flex justify-content-start">
                                <strong>Primary Broker:</strong>
                                <input
                                  type="checkbox"
                                  className="ms-4"
                                  checked
                                  readOnly
                                />
                              </div>
                            ) : (
                              <div className="d-flex justify-content-start">
                                <strong>Secondary Broker:</strong>
                                <input
                                  type="checkbox"
                                  className="ms-4"
                                  checked={broker.secondaryBroker}
                                  onChange={(e) => {
                                    let temp = [...coBroker];
                                    temp.map(
                                      (item) => (item.secondaryBroker = false)
                                    );
                                    temp[index].secondaryBroker =
                                      e.target.checked;
                                      setCoBroker(temp);
                                  }}
                                />
                              </div>
                            )}
                          </li>
                          {index > 0 && (
                            <li>
                              <Button
                                variant="danger"
                                size="sm"
                                className="rounded-0"
                                onClick={() => {
                                  let temp = [...brokerLicenses];
                                  temp.splice(index, 1);
                                  setCoBroker(temp);
                                }}
                              >
                                Delete
                              </Button>
                            </li>
                          )}
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col xs={12} md={6}>
              {addNewRow ? (
                <Row>
                  <Col xs={12}>
                    <span style={{ fontWeight: "600", color: "black" }}>
                      Name
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input"
                      name="name"
                      onChange={handleOnChange}
                      required
                    />
                  </Col>
                  <Col xs={12} className="mt-sm-3 mt-md-0">
                    <span style={{ fontWeight: "600", color: "black" }}>
                      Email
                    </span>
                    <input
                      type="email"
                      className="form-control custom-input"
                      name="email"
                      onChange={handleOnChange}
                      required
                    />
                  </Col>
                  <Col xs={12} className="mt-sm-3 mt-md-0">
                    <span style={{ fontWeight: "600", color: "black" }}>
                      Phone
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input"
                      name="phone"
                      onChange={handleOnChange}
                      required
                    />
                    {/* <PhoneInput
                      onlyCountries={["us", "ca", "gb", "au", "in"]}
                      country={"us"}
                      name="phone"
                      inputStyle={{
                        width: "100%",
                        border: "0",
                        borderBottom: "1px solid #ececec",
                        borderRadius: "0",
                      }}
                      buttonStyle={{
                        border: "none",
                        borderRadius: "0",
                      }}
                      onChange={handleOnChange}
                      required
                    /> */}
                  </Col>
                  <Col
                    md={12}
                    className="d-flex justify-content-end align-items-end mt-3"
                  >
                    <button
                      className="btn bg-success text-white rounded-0"
                      onClick={addBrokerHandler}
                    >
                      Submit
                    </button>
                  </Col>
                </Row>
              ) : (
                <Row className="mt-3">
                  <Col className="d-flex justify-content-end align-items-center">
                    <button
                      className="btn btn-primary rounded-0"
                      onClick={() => setAddNewRow(true)}
                    >
                      + Add New Broker
                    </button>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={addLicense} onHide={toggleAddLicense} centered>
        <Modal.Header className="login-modal-header" closeButton>
          <Modal.Title
            className="auction-modal-title px-3"
            style={{ fontSize: windowSize < 800 && "1.5rem" }}
          >
            Add New License
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-4">
          <Row className="ps-3">
            <Col xs={12} md={6}>
              {brokerLicenses?.map((broker, index) => (
                <Row key={index}>
                  <Col>
                    <Row>
                      <Col>
                        <ul className="list-unstyled">
                          {index === 0 ? (
                            <>
                              <li>
                                <strong>License:</strong> {broker.number}
                              </li>
                              <li>
                                <strong>State:</strong> {broker.state}
                              </li>
                              <li>
                                <strong>Exp. Date:</strong>{" "}
                                {new Date(
                                  broker.expired_date
                                ).toLocaleDateString()}
                              </li>
                            </>
                          ) : (
                            <>
                              <li>
                                <strong>License:</strong> {broker.number}
                              </li>
                              <li>
                                <strong>State:</strong> {broker.state}
                              </li>
                              <li>
                                <strong>Exp. Date:</strong> {broker.expired_date}
                              </li>
                            </>
                          )}
                          
                          {index > 0 && (
                            <li>
                              <Button
                                variant="danger"
                                size="sm"
                                className="rounded-0"
                                onClick={() => {
                                  let temp = [...brokerLicenses];
                                  temp.splice(index, 1);
                                  setBrokerLicenses(temp);
                                }}
                              >
                                Delete
                              </Button>
                            </li>
                          )}
                        </ul>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ))}
            </Col>
            <Col xs={12} md={6}>
              {addNewRow ? (
                <Row>
                  <Col xs={12}>
                    <span style={{ fontWeight: "600", color: "black" }}>
                    License:
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input"
                      name="number"
                      onChange={handleOnChangeLicense}
                      required
                    />
                  </Col>
                  <Col xs={12} className="mt-sm-3 mt-md-0">
                    <span style={{ fontWeight: "600", color: "black" }}>
                    State:
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input"
                      name="state"
                      onChange={handleOnChangeLicense}
                      required
                    />
                  </Col>
                  <Col xs={12} className="mt-sm-3 mt-md-0">
                    <span style={{ fontWeight: "600", color: "black" }}>
                    Exp. Date:
                    </span>
                    <input
                      type="text"
                      className="form-control custom-input"
                      name="expired_date"
                      onChange={handleOnChangeLicense}
                      required
                    />
                    {/* <PhoneInput
                      onlyCountries={["us", "ca", "gb", "au", "in"]}
                      country={"us"}
                      name="phone"
                      inputStyle={{
                        width: "100%",
                        border: "0",
                        borderBottom: "1px solid #ececec",
                        borderRadius: "0",
                      }}
                      buttonStyle={{
                        border: "none",
                        borderRadius: "0",
                      }}
                      onChange={handleOnChange}
                      required
                    /> */}
                  </Col>
                  <Col
                    md={12}
                    className="d-flex justify-content-end align-items-end mt-3"
                  >
                    <button
                      className="btn bg-success text-white rounded-0"
                      onClick={addLicenseHandler}
                    >
                      Submit
                    </button>
                  </Col>
                </Row>
              ) : (
                <Row className="mt-3">
                  <Col className="d-flex justify-content-end align-items-center">
                    <button
                      className="btn btn-primary rounded-0"
                      onClick={() => setAddNewRow(true)}
                    >
                      + Add new License
                    </button>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Ownership;
