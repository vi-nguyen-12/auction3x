import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import RealEstate from "./PropertiesDetails/RealEstate";
import Car from "./PropertiesDetails/Car";
import Yacht from "./PropertiesDetails/Yacht";
import Jet from "./PropertiesDetails/Jet";
import authService from "../../services/authServices";

function PropertyDetails({ property }) {
  console.log(property);

  const [edit, setEdit] = useState({
    step1: false,
    step2: false,
    step2_1: false,
    step2_2: false,
    step3: false,
    step4: false,
  });

  const [phone, setPhone] = useState(
    property.details.broker_name ? "" : property.details.phone
  );
  const [address, setAddress] = useState(
    property.details?.property_address.formatted_street_address || ""
  );
  const [city, setCity] = useState(
    property.details?.property_address?.city || ""
  );
  const [state, setState] = useState(
    property.details?.property_address?.state || ""
  );
  const [zip, setZip] = useState(
    property.details?.property_address?.zip_code || ""
  );
  const [country, setCountry] = useState(
    property.details?.property_address?.country || ""
  );

  const [ownerName, setOwnerName] = useState(property.details.owner_name || "");
  const [ownerAddress, setOwnerAddress] = useState(
    property.details.address || ""
  );
  const [ownerEmail, setOwnerEmail] = useState(
    property.details?.broker_name ? "" : property.details?.email
  );
  const [ownerPhone, setOwnerPhone] = useState(
    property.details.broker_name ? "" : property.details.phone
  );
  const [brokerName, setBrokerName] = useState(
    property.details?.broker_name ? property.details?.broker_name : ""
  );
  const [brokerEmail, setBrokerEmail] = useState(
    property.details.broker_name ? property.details.email : ""
  );
  const [brokerPhone, setBrokerPhone] = useState(
    property.details.broker_name ? property.details.phone : ""
  );

  const [brokerId, setBrokerId] = useState(property.details.broker_id || "");

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleOwnerChange = (address) => {
    setOwnerAddress(address);
  };

  const getOwnerAddress = (address) => {
    geocodeByAddress(address)
      .then((results) => {
        setOwnerAddress(results[0].formatted_address);
      })
      .catch((error) => {
        console.log(error);
      });
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

  const onSubmit = async (prop, step) => {
    if (step === 1) {
      let submitedData;
      if (brokerName !== "") {
        submitedData = {
          type: property.type,
          details: {
            owner_name: prop.details.owner_name,
            broker_name: prop.details.broker_name,
            broker_id: prop.details.broker_id,
            phone: phone,
            email: prop.details.email,
            address: address,
            // broker_documents: listingAgreements,
          },
          step: 1,
        };
      } else {
        submitedData = {
          type: property.type,
          details: {
            owner_name: prop.details.owner_name,
            phone: phone,
            email: prop.details.email,
            address: address,
          },
          step: 1,
        };
      }
      await authService.editProp(submitedData, prop._id).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          window.location.reload();
        }
      });
    }
  };

  return (
    <Container className="mb-4">
      <Row>
        <Col
          style={{
            color: "#376ebc",
            fontSize: "20px",
            borderBottom: "1px solid black",
          }}
        >
          Ownership
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Owner Name</span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
            defaultValue={ownerName}
            onChange={(e) => (property.details.owner_name = e.target.value)}
            disabled={!edit.step1}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Owner Phone</span>
          <PhoneInput
            disableCountryCode={false}
            onlyCountries={["ca", "us", "gb", "au"]}
            disableD={!edit.step1}
            ropdown={false}
            style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
            country={"us"}
            dropdownStyle={{ paddingLeft: "0!important" }}
            value={phone}
            inputStyle={{ width: "100%" }}
            buttonStyle={{
              borderRight: "none",
            }}
            onChange={setPhone}
            disabled={!edit.step1}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Owner Email</span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
            defaultValue={ownerEmail}
            onChange={(e) => (property.details.email = e.target.value)}
            disabled={!edit.step1}
          />
        </Col>
      </Row>
      {property.details.broker_name && (
        <>
          <Row className="mt-3">
            <Col>
              <span style={{ fontWeight: "600", color: "black" }}>
                Broker Name
              </span>
              <input
                type="text"
                className="form-control"
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                defaultValue={brokerName}
                onChange={(e) =>
                  (property.details.broker_name = e.target.value)
                }
                disabled={!edit.step1}
              />
            </Col>
            <Col>
              <span style={{ fontWeight: "600", color: "black" }}>
                Broker Phone
              </span>
              <PhoneInput
                disableCountryCode={false}
                onlyCountries={["ca", "us", "gb", "au"]}
                disableD={!edit.step1}
                ropdown={false}
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                country={"us"}
                dropdownStyle={{ paddingLeft: "0!important" }}
                value={
                  property.details.broker_name ? property.details.phone : ""
                }
                inputStyle={{ width: "100%" }}
                buttonStyle={{
                  borderRight: "none",
                }}
                onChange={setPhone}
                disabled={!edit.step1}
              />
            </Col>
            <Col>
              <span style={{ fontWeight: "600", color: "black" }}>
                Broker Email
              </span>
              <input
                type="text"
                className="form-control"
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                defaultValue={brokerEmail}
                onChange={(e) => (property.details.email = e.target.value)}
                disabled={!edit.step1}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <span style={{ fontWeight: "600", color: "black" }}>
                Broker ID
              </span>
              <input
                type="text"
                className="form-control"
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                defaultValue={brokerId}
                onChange={(e) => (property.details.broker_id = e.target.value)}
                disabled={!edit.step1}
              />
            </Col>
            <Col>
              <span style={{ fontWeight: "600", color: "black" }}>
                Listing Agreements
              </span>
              <input
                type="file"
                className="form-control"
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                // defaultValue={listingAgreements}
                // onChange={(e) => setListingAgreements(e.target.value)}
                disabled={!edit.step1}
              />
            </Col>
          </Row>
        </>
      )}
      <Row className="mt-3">
        <Col>
          <PlacesAutocomplete
            value={ownerAddress}
            onChange={handleOwnerChange}
            onSelect={getOwnerAddress}
          >
            {({
              getInputProps,
              suggestions,
              getSuggestionItemProps,
              loading,
            }) => (
              <div>
                <span style={{ fontWeight: "600", color: "black" }}>
                  Address
                </span>
                <input
                  {...getInputProps({
                    placeholder: "Search address",
                    className: "form-control",
                  })}
                  style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                  disabled={!edit.step1}
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
        <Col className="d-flex justify-content-end">
          <Button
            className="mx-3"
            onClick={() =>
              setEdit((prev) => ({ ...prev.step1, step1: !edit.step1 }))
            }
          >
            Edit
          </Button>
          {edit.step1 ? (
            <Button onClick={() => onSubmit(property, 1)}>Save</Button>
          ) : null}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col
          style={{
            color: "#376ebc",
            fontSize: "20px",
            borderBottom: "1px solid black",
          }}
        >
          Property Address
        </Col>
      </Row>
      <Row className="mt-2">
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
                  Address
                </span>
                <input
                  {...getInputProps({
                    placeholder: "Search address",
                    className: "form-control",
                  })}
                  style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
                  disabled={!edit.step2}
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
          <span style={{ fontWeight: "600", color: "black" }}>Country</span>
          <input
            type="text"
            className="form-control"
            value={country}
            style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
            onChange={(e) => setCountry(e.target.value)}
            disabled={!edit.step2}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>State</span>
          <input
            type="text"
            className="form-control"
            value={state}
            style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
            onChange={(e) => setState(e.target.value)}
            disabled={!edit.step2}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>City</span>
          <input
            type="text"
            className="form-control"
            value={city}
            style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
            onChange={(e) => setCity(e.target.value)}
            disabled={!edit.step2}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Zip</span>
          <input
            type="text"
            className="form-control"
            value={zip}
            style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
            onChange={(e) => setZip(e.target.value)}
            disabled={!edit.step2}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          <Button
            className="mx-3"
            onClick={() =>
              setEdit((prev) => ({ ...prev.step2, step2: !edit.step2 }))
            }
          >
            Edit
          </Button>
          {edit.step2 ? <Button>Save</Button> : null}
        </Col>
      </Row>
      <Row className="mt-4">
        <Col
          style={{
            color: "#376ebc",
            fontSize: "20px",
            borderBottom: "1px solid black",
          }}
        >
          Property Details
        </Col>
      </Row>
      {property.type === "real-estate" ? (
        <RealEstate property={property} setEdit={setEdit} edit={edit} />
      ) : property.type === "car" ? (
        <Car property={property} setEdit={setEdit} edit={edit} />
      ) : property.type === "jet" ? (
        <Jet property={property} setEdit={setEdit} edit={edit} />
      ) : property.type === "yacht" ? (
        <Yacht property={property} setEdit={setEdit} edit={edit} />
      ) : null}

      <Row className="mt-4">
        <Col
          style={{
            color: "#376ebc",
            fontSize: "20px",
            borderBottom: "1px solid black",
          }}
        >
          Descriptions
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Investment Opportunity
          </span>
          <textarea
            type="text"
            className="form-control"
            style={{ border: edit.step2_2 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details?.description.investment}
            onChange={(e) =>
              (property.details.description.investment = e.target.value)
            }
            disabled={!edit.step2_2}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Location Highlight
          </span>
          <textarea
            type="text"
            className="form-control"
            style={{ border: edit.step2_2 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details?.description.location}
            onChange={(e) =>
              (property.details.description.location = e.target.value)
            }
            disabled={!edit.step2_2}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Market Overview
          </span>
          <textarea
            type="text"
            className="form-control"
            style={{ border: edit.step2_2 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details?.description.market}
            onChange={(e) =>
              (property.details.description.market = e.target.value)
            }
            disabled={!edit.step2_2}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Executive Summary
          </span>
          <textarea
            className="form-control"
            style={{ border: edit.step2_2 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details?.description.summary}
            onChange={(e) =>
              (property.details.description.summary = e.target.value)
            }
            disabled={!edit.step2_2}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          <Button
            className="mx-3"
            onClick={() =>
              setEdit((prev) => ({ ...prev.step2_2, step2_2: !edit.step2_2 }))
            }
          >
            Edit
          </Button>
          {edit.step2_2 ? <Button>Save</Button> : null}
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyDetails;
