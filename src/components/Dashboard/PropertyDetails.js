import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import PhoneInput from "react-phone-input-2";
import RealEstate from "./PropertiesDetails/RealEstate";
import Car from "./PropertiesDetails/Car";
import Yacht from "./PropertiesDetails/Yacht";
import Jet from "./PropertiesDetails/Jet";
import authService from "../../services/authServices";
import Loading from "../Loading";
import { MdClose } from "react-icons/md";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
];

function PropertyDetails({ property, setRefresh, refresh, setMessage }) {
  const [edit, setEdit] = useState({
    step1: false,
    step2: false,
    step2_1: false,
    step2_2: false,
    step3: false,
    step4: false,
  });

  const [listingAgreement, setListingAgreement] = useState(
    property.details.broker_documents
  );
  const [loader, setLoader] = useState(false);

  const [phone, setPhone] = useState(property.details.phone);
  const [address, setAddress] = useState(
    property.details?.property_address.formatted_street_address || ""
  );
  const [lat, setLat] = useState(property.details?.property_address?.lat || "");
  const [lng, setLng] = useState(property.details?.property_address?.lng || "");
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

  const [ownerName] = useState(property.details.owner_name || "");
  const [ownerAddress, setOwnerAddress] = useState(
    property.details.address || ""
  );
  const [ownerEmail] = useState(
    property.details?.broker_name ? "" : property.details?.email
  );
  const [brokerName] = useState(
    property.details?.broker_name ? property.details?.broker_name : ""
  );
  const [brokerEmail] = useState(
    property.details.broker_name ? property.details.email : ""
  );
  const [brokerId] = useState(property.details.broker_id || "");
  const [location, setLocation] = useState(
    property.details?.description.location || ""
  );
  const [market, setMarket] = useState(
    property.details?.description.market || ""
  );
  const [summary, setSummary] = useState(
    property.details?.description.summary || ""
  );
  const [investment, setInvestment] = useState(
    property.details?.description.investment || ""
  );

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

  const handleDelete = (url) => () => {
    setListingAgreement(
      listingAgreement.filter((document) => document.url !== url)
    );
  };

  const onChange = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }

    await authService.saveDocuments(formData).then((response) => {
      if (response.data.error) {
        setMessage("");
        setMessage(response.data.error);
      } else {
        setListingAgreement([...listingAgreement, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
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
            broker_documents: listingAgreement,
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
          setMessage("");
          setMessage(res.data.error);
        } else {
          setMessage("");
          setMessage("Property updated successfully");
          window.location.reload();
        }
      });
    }
    if (step === 2 && summary !== "" && market !== "" && location !== "") {
      let submitedData;
      if (prop.type === "real-estate") {
        submitedData = {
          street_address: address,
          city,
          state,
          country,
          zip_code: zip,
          lat,
          lng,
          real_estate_type: prop.details.real_estate_type,
          year_built: parseInt(prop.details.year_built),
          owner_name: prop.details.owner_name,
          baths_count: parseInt(prop.details.structure.baths_count),
          beds_count: parseInt(prop.details.structure.beds_count),
          total_value: parseInt(prop.details.market_assessments[0].total_value),
          area_sq_ft: parseInt(prop.details.parcel.area_sq_ft),
          lot_size: parseInt(prop.details.parcel.lot_size),
          type_of_garage: prop.details.type_of_garage,
          number_of_stories: parseInt(prop.details.number_of_stories),
          description: {
            summary: summary ? summary : prop.details.description.summary,
            investment: investment
              ? investment
              : prop.details.description.investment,
            location: location ? location : prop.details.description.location,
            market: market ? market : prop.details.description.market,
          },
          reservedAmount: parseInt(prop.reservedAmount),
          discussedAmount: parseInt(prop.discussedAmount),
          step: 2,
        };
      } else if (prop.type === "car") {
        submitedData = {
          make: prop.details.make,
          model: prop.details.model,
          year: parseInt(prop.details.year),
          mileage: parseInt(prop.details.mileage),
          gearbox: prop.details.gearbox,
          car_type: prop.details.car_type,
          power: prop.details.power,
          color: prop.details.color,
          VIN: prop.details.VIN,
          engine: prop.details.engine,
          fuel_type: prop.details.fuel_type,
          condition: prop.details.condition,
          market_price: parseInt(prop.details.market_price),
          description: {
            summary: summary ? summary : prop.details.description.summary,
            investment: investment
              ? investment
              : prop.details.description.investment,
            location: location ? location : prop.details.description.location,
            market: market ? market : prop.details.description.market,
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
          reservedAmount: parseInt(prop.reservedAmount),
          discussedAmount: parseInt(prop.discussedAmount),
          step: 2,
        };
      } else if (prop.type === "jet") {
        submitedData = {
          registration_mark: prop.details.registration_mark,
          aircraft_builder_name: prop.details.aircraft_builder_name,
          aircraft_model_designation: prop.details.aircraft_model_designation,
          aircraft_serial_no: prop.details.aircraft_serial_no,
          engine_builder_name: prop.details.engine_builder_name,
          engine_model_designation: prop.details.engine_model_designation,
          number_of_engines: parseInt(prop.details.number_of_engines),
          propeller_builder_name: prop.details.propeller_builder_name,
          year_built: parseInt(prop.details.year_built),
          propeller_model_designation: prop.details.propeller_model_designation,
          imported_aircraft: prop.details.imported_aircraft,
          description: {
            summary: summary ? summary : prop.details.description.summary,
            investment: investment
              ? investment
              : prop.details.description.investment,
            location: location ? location : prop.details.description.location,
            market: market ? market : prop.details.description.market,
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
          reservedAmount: parseInt(prop.reservedAmount),
          discussedAmount: parseInt(prop.discussedAmount),
          step: 2,
        };
      } else if (prop.type === "yacht") {
        submitedData = {
          reservedAmount: parseInt(prop.reservedAmount),
          discussedAmount: parseInt(prop.discussedAmount),
          vessel_registration_number: prop.details.vessel_registration_number,
          vessel_manufacturing_date: prop.details.vessel_manufacturing_date,
          manufacture_mark: prop.details.manufacture_mark,
          manufacturer_name: prop.details.manufacturer_name,
          engine_type: prop.details.engine_type,
          length: parseInt(prop.details.length),
          engine_manufacture_name: prop.details.engine_manufacture_name,
          engine_deck_type: prop.details.engine_deck_type,
          running_cost: parseInt(prop.details.running_cost),
          no_of_crew_required: parseInt(prop.details.no_of_crew_required),
          description: {
            summary: summary ? summary : prop.details.description.summary,
            investment: investment
              ? investment
              : prop.details.description.investment,
            location: location ? location : prop.details.description.location,
            market: market ? market : prop.details.description.market,
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
          step: 2,
        };
      }
      if (prop.type === "real-estate") {
        await authService.editRealEstate(prop._id, submitedData).then((res) => {
          if (res.data.error) {
            setMessage("");
            setMessage(res.data.error);
          } else {
            setMessage("");
            setMessage("Property updated successfully");
            setRefresh(!refresh);
            // window.location.reload();
          }
        });
      } else {
        await authService.editProp(submitedData, prop._id).then((res) => {
          if (res.data.error) {
            setMessage("");
            setMessage(res.data.error);
          } else {
            setMessage("");
            setMessage("Property updated successfully");
            setRefresh(!refresh);
            // window.location.reload();
          }
        });
      }
    } else {
      setMessage("");
      setTimeout(() => {
        setMessage("Please fill all required fields");
      }, 100);
    }
  };

  return (
    <Container className="mb-4">
      {loader && <Loading />}
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
        <Col xs={12} md={property.details.broker_name ? 12 : 4}>
          <span style={{ fontWeight: "600", color: "black" }}>Owner Name</span>
          <input
            type="text"
            className="form-control custom-input"
            style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
            defaultValue={ownerName}
            onChange={(e) => (property.details.owner_name = e.target.value)}
            disabled={!edit.step1}
          />
        </Col>
        {!property.details.broker_name && (
          <>
            <Col xs={12} md={4}>
              <span style={{ fontWeight: "600", color: "black" }}>
                Owner Phone
              </span>
              <PhoneInput
                disableCountryCode={false}
                onlyCountries={["ca", "us", "gb", "au"]}
                disableD={!edit.step1}
                ropdown={false}
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                country={"us"}
                dropdownStyle={{ paddingLeft: "0!important" }}
                value={property.details.broker_name ? "" : phone}
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
                disabled={!edit.step1}
              />
            </Col>
            <Col xs={12} md={4}>
              <span style={{ fontWeight: "600", color: "black" }}>
                Owner Email
              </span>
              <input
                type="text"
                className="form-control custom-input"
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                defaultValue={ownerEmail}
                onChange={(e) => (property.details.email = e.target.value)}
                disabled={!edit.step1}
              />
            </Col>
          </>
        )}
      </Row>
      {property.details.broker_name && (
        <>
          <Row className="mt-3">
            <Col xs={12} md={4}>
              <span style={{ fontWeight: "600", color: "black" }}>
                Broker Name
              </span>
              <input
                type="text"
                className="form-control custom-input"
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                defaultValue={brokerName}
                onChange={(e) =>
                  (property.details.broker_name = e.target.value)
                }
                disabled={!edit.step1}
              />
            </Col>
            <Col xs={12} md={4}>
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
                inputStyle={{
                  width: "100%",
                  border: "0",
                  borderBottom: "1px solid #ececec",
                  borderRadius: "0",
                }}
                buttonStyle={{
                  borderRadius: "none",
                }}
                onChange={setPhone}
                disabled={!edit.step1}
              />
            </Col>
            <Col xs={12} md={4}>
              <span style={{ fontWeight: "600", color: "black" }}>
                Broker Email
              </span>
              <input
                type="text"
                className="form-control custom-input"
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                defaultValue={brokerEmail}
                onChange={(e) => (property.details.email = e.target.value)}
                disabled={!edit.step1}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col xs={12} md={6}>
              <span style={{ fontWeight: "600", color: "black" }}>
                Broker ID
              </span>
              <input
                type="text"
                className="form-control custom-input"
                style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                defaultValue={brokerId}
                onChange={(e) => (property.details.broker_id = e.target.value)}
                disabled={!edit.step1}
              />
            </Col>
            <Col xs={12} md={6}>
              <Row>
                <span style={{ fontWeight: "600", color: "black" }}>
                  Listing Agreements
                </span>
                <Col md={2} xs={12}>
                  <input
                    type="file"
                    id="docu"
                    className="form-control custom-input"
                    style={{ border: edit.step1 ? "1px solid #2ecc71" : "" }}
                    onChange={onChange}
                    hidden
                    multiple
                    disabled={!edit.step1}
                  />
                  <div className="d-flex">
                    <label htmlFor="docu" className="btn btn-primary rounded-0">
                      Upload
                    </label>
                  </div>
                </Col>
                <Col md={10} xs={12} className="pl-2">
                  <div className="d-grid">
                    {listingAgreement.map((doc, index) => (
                      <span key={index}>
                        {doc.name}
                        <Button
                          className="bg-transparent border-0"
                          onClick={handleDelete(doc.url)}
                          disabled={!edit.step1}
                        >
                          <MdClose fontSize="1.5em" color="red" />
                        </Button>
                      </span>
                    ))}
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </>
      )}
      <Row className="mt-3">
        <Col xs={12}>
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
      {/* <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          <Button
            className="mx-3"
            onClick={() =>
              setEdit((prev) => ({ ...prev.step1, step1: !edit.step1 }))
            }
            disabled={
              property.auctionDetails?.auctionStartDate ||
              property.isApproved === "success"
            }
          >
            Edit
          </Button>
          {edit.step1 ? (
            <Button onClick={() => onSubmit(property, 1)}>Save</Button>
          ) : null}
        </Col>
      </Row> */}
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
        <Col xs={12} md={6}>
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
        <Col xs={12} md={6}>
          <span style={{ fontWeight: "600", color: "black" }}>Country</span>
          <input
            type="text"
            className="form-control custom-input"
            value={country}
            style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
            onChange={(e) => setCountry(e.target.value)}
            disabled={!edit.step2}
          />
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={4}>
          <span style={{ fontWeight: "600", color: "black" }}>State</span>
          <input
            type="text"
            className="form-control custom-input"
            value={state}
            style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
            onChange={(e) => setState(e.target.value)}
            disabled={!edit.step2}
          />
        </Col>
        <Col xs={12} md={4}>
          <span style={{ fontWeight: "600", color: "black" }}>City</span>
          <input
            type="text"
            className="form-control custom-input"
            value={city}
            style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
            onChange={(e) => setCity(e.target.value)}
            disabled={!edit.step2}
          />
        </Col>
        <Col xs={12} md={4}>
          <span style={{ fontWeight: "600", color: "black" }}>Zip</span>
          <input
            type="text"
            className="form-control custom-input"
            value={zip}
            style={{ border: edit.step2 ? "1px solid #2ecc71" : "" }}
            onChange={(e) => setZip(e.target.value)}
            disabled={!edit.step2}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          {edit.step2 ? (
            <Button className="rounded-0" onClick={() => onSubmit(property, 2)}>
              Save
            </Button>
          ) : null}
          <Button
            className={
              edit.step2 ? "mx-3 btn btn-danger rounded-0" : "mx-3 rounded-0"
            }
            onClick={() =>
              setEdit((prev) => ({ ...prev.step2, step2: !edit.step2 }))
            }
            disabled={
              property.auctionDetails?.auctionStartDate ||
              property.isApproved === "success"
            }
          >
            Edit
          </Button>
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
        <Col xs={12} className="mt-2">
          <span style={{ fontWeight: "600", color: "black" }}>
            Location Highlight
          </span>
          <ReactQuill
            theme="snow"
            style={{ border: edit.step2_2 ? "1px solid #2ecc71" : "" }}
            modules={modules}
            formats={formats}
            value={location}
            onChange={(e) => setLocation(e)}
            readOnly={!edit.step2_2}
          ></ReactQuill>
        </Col>
        <Col xs={12} className="mt-2">
          <span style={{ fontWeight: "600", color: "black" }}>
            Market Overview
          </span>
          <ReactQuill
            theme="snow"
            style={{ border: edit.step2_2 ? "1px solid #2ecc71" : "" }}
            modules={modules}
            formats={formats}
            value={market}
            onChange={(e) => setMarket(e)}
            readOnly={!edit.step2_2}
          ></ReactQuill>
        </Col>
        <Col xs={12} className="mt-2">
          <span style={{ fontWeight: "600", color: "black" }}>
            Executive Summary
          </span>
          <ReactQuill
            theme="snow"
            style={{ border: edit.step2_2 ? "1px solid #2ecc71" : "" }}
            modules={modules}
            formats={formats}
            value={summary}
            onChange={(e) => setSummary(e)}
            readOnly={!edit.step2_2}
          ></ReactQuill>
        </Col>
        <Col xs={12} className="mt-2">
          <span style={{ fontWeight: "600", color: "black" }}>
            Investment Opportunity
          </span>
          <ReactQuill
            theme="snow"
            style={{ border: edit.step2_2 ? "1px solid #2ecc71" : "" }}
            modules={modules}
            formats={formats}
            value={investment}
            onChange={(e) => setInvestment(e)}
            readOnly={!edit.step2_2}
          ></ReactQuill>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          {edit.step2_2 ? (
            <Button className="rounded-0" onClick={() => onSubmit(property, 2)}>
              Save
            </Button>
          ) : null}
          <Button
            className={
              edit.step2_2 ? "mx-3 btn btn-danger rounded-0" : "mx-3 rounded-0"
            }
            onClick={() =>
              setEdit((prev) => ({ ...prev.step2_2, step2_2: !edit.step2_2 }))
            }
            disabled={
              property.auctionDetails?.auctionStartDate ||
              property.isApproved === "success"
            }
          >
            Edit
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default PropertyDetails;
