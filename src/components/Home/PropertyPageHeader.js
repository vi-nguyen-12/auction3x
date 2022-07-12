import React, { useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import "../../styles/realEstate.css";
import { MdOutlineMyLocation } from "react-icons/md";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";
import NumberFormat from "react-number-format";

function PropertyPageHeader({
  path,
  windowSize,
  setFilter,
  toggleImage,
  toggleImgCar,
  toggleImgJet,
  toggleImgYacht,
  toggleMap,
  resultLength,
  setLocation,
}) {
  const [auctionType, setAuctionType] = useState();
  const [propertyType, setPropertyType] = useState();
  const [realType, setRealType] = useState();
  const [minPrice, setMinPrice] = useState();
  const [maxPrice, setMaxPrice] = useState();
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();

  const [condition, setCondition] = useState();
  const [minMileage, setMinMileage] = useState();
  const [maxMileage, setMaxMileage] = useState();
  const [make, setMake] = useState();
  const [model, setModel] = useState();

  const [otherPrice, setOtherPrice] = useState({
    realEstate: false,
    car: false,
    jet: false,
    yacht: false,
    other: false,
  });
  const [otherMileage, setOtherMileage] = useState(false);
  const [otherYear, setOtherYear] = useState({
    realEstate: false,
    car: false,
    jet: false,
    yacht: false,
  });
  const [otherMakes, setOtherMakes] = useState({
    realEstate: false,
    car: false,
    jet: false,
    yacht: false,
  });
  const [otherLength, setOtherLength] = useState(false);

  const [minYear, setMinYear] = useState();
  const [maxYear, setMaxYear] = useState();

  const [minLength, setMinLength] = useState();
  const [maxLength, setMaxLength] = useState();

  // const carMake = [
  //   "FERRARI",
  //   "ASTON MARTIN",
  //   "ROLLS ROYCE",
  //   "BUGATTI",
  //   "PAGANI",
  //   "KOENIG",
  //   "LAMBORGHINI",
  //   "W MOTORS",
  //   "MERCEDES",
  //   "McLAREN",
  //   "ZENVO",
  //   "BENTLEY",
  //   "CZINGER",
  //   "MAZZANTI",
  //   "Other",
  // ];

  const JetBuilder = [
    "AIRBUS",
    "BOEING",
    "EMBRAER",
    "BEECHCRAFT",
    "BOMBARDIER",
    "DASSAULT AVIATION",
    "BOMBURDIER",
    "CESSNA",
    "DASSAULT",
    "GULFSTREAM",
    "PIAGGIO",
    "PILATUS",
  ];

  const yachtBuilder = [
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
  ];

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
    { value: "penhouse", name: "Penhouse" },
    { value: "condo", name: "Condo" },
    { value: "co_op", name: "Co-Op" },
    { value: "land", name: "Land" },
    { value: "castle", name: "Castle" },
    { value: "chateau", name: "Chateau" },
    { value: "farm_ranch", name: "Farm Ranch" },
    { value: "private_island", name: "Private Island" },
  ];

  const CarPrices = [
    { min_price: 1000000, max_price: 5000000 },
    { min_price: 5000000, max_price: 10000000 },
    { min_price: 10000000, max_price: 20000000 },
    { min_price: 20000000, max_price: 30000000 },
    { min_price: 30000000, max_price: 40000000 },
    { min_price: 40000000, max_price: 50000000 },
  ];

  const RealEstatePrice = [
    { min_price: 10000000, max_price: 20000000 },
    { min_price: 20000000, max_price: 30000000 },
    { min_price: 30000000, max_price: 40000000 },
    { min_price: 40000000, max_price: 50000000 },
    { min_price: 50000000, max_price: 60000000 },
    { min_price: 60000000, max_price: 70000000 },
  ];

  const mileage = [
    { min: 0, max: 10000 },
    { min: 10000, max: 30000 },
    { min: 30000, max: 50000 },
    { min: 50000, max: 70000 },
    { min: 70000, max: 100000 },
    { min: 100000, max: 200000 },
  ];

  const years = [
    { min: 2010, max: 2013 },
    { min: 2013, max: 2016 },
    { min: 2016, max: 2019 },
    { min: 2019, max: 2022 },
  ];

  const length = [
    { min: 200, max: 400 },
    { min: 400, max: 600 },
    { min: 600, max: 800 },
  ];

  const getFilter = (propType) => {
    if (propType === "real-estate") {
      setFilter({
        auctionType: auctionType,
        propType: propType,
        real_esstate_type: realType,
        min_price: minPrice,
        max_price: maxPrice,
        minYear: minYear,
        maxYear: maxYear,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    } else if (propType === "car") {
      setFilter({
        auctionType: auctionType,
        condition: condition,
        min_mileage: minMileage,
        max_mileage: maxMileage,
        min_price: minPrice,
        max_price: maxPrice,
        // make: make,
        // model: model,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    } else if (propType === "jet") {
      setFilter({
        auctionType: auctionType,
        minYear: minYear,
        maxYear: maxYear,
        min_price: minPrice,
        max_price: maxPrice,
        make: make,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    } else if (propType === "yacht") {
      setFilter({
        auctionType: auctionType,
        min_price: minPrice,
        max_price: maxPrice,
        make: make,
        min_length: minLength,
        max_length: maxLength,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    } else if (propType === "auctions") {
      setFilter({
        auctionType: auctionType,
        type: propertyType,
        min_price: minPrice,
        max_price: maxPrice,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    } else if (propType === "austin") {
      setFilter({
        auctionType: auctionType,
        type: propertyType,
        min_price: minPrice,
        max_price: maxPrice,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    } else if (propType === "houston") {
      setFilter({
        auctionType: auctionType,
        type: propertyType,
        min_price: minPrice,
        max_price: maxPrice,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    } else if (propType === "dallas") {
      setFilter({
        auctionType: auctionType,
        type: propertyType,
        min_price: minPrice,
        max_price: maxPrice,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    } else if (propType === "sanAntonio") {
      setFilter({
        auctionType: auctionType,
        type: propertyType,
        min_price: minPrice,
        max_price: maxPrice,
        country: country,
        state: state,
        city: city,
        zip: zip,
      });
    }
  };

  const handleChange = (address) => {
    setAddress(address);
    setLocation(address);
    if (address === "") {
      setCountry();
      setState();
      setCity();
      setZip();
    }
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
    });
  };

  return (
    <>
      {path === "/cars" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    setAuctionType({
                      car: e.target.value,
                    });
                  }}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setCondition(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Condition</option>
                  <option value="new">New</option>
                  <option value="used">Used</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.car,
                        car: true,
                      }));
                    } else {
                      const getPrice = CarPrices.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ car: getPrice[0].min_price });
                        setMaxPrice({ car: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {CarPrices.map((price, index) => (
                    <option
                      style={{ padding: "0 10px" }}
                      value={index}
                      key={index}
                    >
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.car === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.car : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ car: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.car : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ car: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.car,
                              car: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinMileage();
                      setMaxMileage();
                      setOtherMileage(true);
                    } else {
                      const getMileage = mileage.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getMileage.length > 0) {
                        setMinMileage(getMileage[0].min);
                        setMaxMileage(getMileage[0].max);
                      } else {
                        setMinMileage();
                        setMaxMileage();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Mileage</option>
                  {mileage.map((item, index) => (
                    <option value={index} key={index}>
                      {item.min.toLocaleString()} mil -{" "}
                      {item.max.toLocaleString()} mil
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherMileage === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Mileage Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          value={minMileage}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinMileage(value);
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          value={maxMileage}
                          placeholder="Max"
                          className="form-control"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxMileage(value);
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() => setOtherMileage(false)}
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("car")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex justify-content-center filterResult" md={3}>
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength?.car} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImgCar}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/jets" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setAuctionType({ jet: e.target.value })}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.jet,
                        jet: true,
                      }));
                    } else {
                      const getPrice = CarPrices.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ jet: getPrice[0].min_price });
                        setMaxPrice({ jet: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {CarPrices.map((price, index) => (
                    <option value={index} key={index}>
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.jet === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.jet : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ jet: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.jet : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ jet: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.jet,
                              jet: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinYear();
                      setMaxYear();
                      setOtherYear((prevState) => ({
                        ...prevState.jet,
                        jet: true,
                      }));
                    } else {
                      const getYears = years.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getYears.length > 0) {
                        setMinYear({ jet: getYears[0].min });
                        setMaxYear({ jet: getYears[0].max });
                      } else {
                        setMinYear();
                        setMaxYear();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option>Years</option>
                  {years.map((item, index) => (
                    <option key={index} value={index}>
                      {item.min} - {item.max}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherYear.jet === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Year Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          value={minYear?.jet}
                          className="form-control"
                          placeholder="Min Year"
                          format="####"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinYear({ jet: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          value={maxYear?.jet}
                          placeholder="Max Year"
                          format="####"
                          className="form-control"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxYear({ jet: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherYear((prevState) => ({
                              ...prevState.jet,
                              jet: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMake();
                      setOtherMakes((prevState) => ({
                        ...prevState.jet,
                        jet: true,
                      }));
                    } else {
                      setMake({ jet: e.target.value });
                    }
                  }}
                  className=" RealButton "
                >
                  <option>Makes</option>
                  {JetBuilder.map((item, index) => (
                    <option key={index} value={index}>
                      {item}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherMakes.jet === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Make</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <input
                          onChange={(e) => setMake({ jet: e.target.value })}
                          className="form-control"
                          placeholder="Makes"
                          type="text"
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherMakes((prevState) => ({
                              ...prevState.jet,
                              jet: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("jet")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength?.jet} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImgJet}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/yachts" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setAuctionType({ yacht: e.target.value })}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.yacht,
                        yacht: true,
                      }));
                    } else {
                      const getPrice = CarPrices.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ yacht: getPrice[0].min_price });
                        setMaxPrice({ yacht: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {CarPrices.map((price, index) => (
                    <option value={index} key={index}>
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.yacht === true && (
                  <div
                    style={{
                      zIndex: "999",
                      marginTop: "65px",
                      width: "400px",
                    }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.yacht : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ yacht: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.yacht : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ yacht: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.yacht,
                              yacht: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMake();
                      setOtherMakes((prevState) => ({
                        ...prevState.yacht,
                        yacht: true,
                      }));
                    } else {
                      setMake({ yacht: e.target.value });
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Makes</option>
                  {yachtBuilder.map((item, index) => (
                    <option key={index} value={index}>
                      {item}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherMakes.yacht === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Make</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <input
                          onChange={(e) => setMake({ yacht: e.target.value })}
                          className="form-control"
                          placeholder="Makes"
                          type="text"
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherMakes((prevState) => ({
                              ...prevState.yacht,
                              yacht: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinLength();
                      setMaxLength();
                      setOtherLength(true);
                    } else {
                      const getLength = length.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getLength.length > 0) {
                        setMinLength(getLength[0].min);
                        setMaxLength(getLength[0].max);
                      } else {
                        setMinLength();
                        setMaxLength();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Length</option>
                  {length.map((item, index) => (
                    <option key={index} value={index}>
                      {item.min} ft - {item.max} ft
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherLength === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Length Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <input
                          onChange={(e) => setMinLength(e.target.value)}
                          className="form-control"
                          placeholder="Min"
                          type="number"
                        />
                        -
                        <input
                          onChange={(e) => setMaxLength(e.target.value)}
                          className="form-control"
                          placeholder="Max"
                          type="number"
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() => setOtherLength(false)}
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("yacht")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength?.yacht} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImgYacht}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setAuctionType({ auctions: e.target.value })}
                  className="RealButton"
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setPropertyType(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Property Type</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="car">Car</option>
                  <option value="jet">Jet</option>
                  <option value="yacht">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.other,
                        other: true,
                      }));
                    } else {
                      const getPrice = CarPrices.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ auctions: getPrice[0].min_price });
                        setMaxPrice({ auctions: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {CarPrices.map((price, index) => (
                    <option value={index} key={index}>
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.other === true && (
                  <div
                    style={{
                      zIndex: "999",
                      marginTop: "65px",
                      width: "400px",
                    }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.auctions : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ auctions: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.auctions : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ auctions: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.other,
                              other: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("auctions")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row style={{ display: "flex", alignContent: "center" }}>
              <Col
                md={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength.auctions} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions/Austin" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setAuctionType({ auctions: e.target.value })}
                  className="RealButton"
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setPropertyType(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Property Type</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="car">Car</option>
                  <option value="jet">Jet</option>
                  <option value="yacht">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.other,
                        other: true,
                      }));
                    } else {
                      const getPrice = CarPrices.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ auctions: getPrice[0].min_price });
                        setMaxPrice({ auctions: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {CarPrices.map((price, index) => (
                    <option value={index} key={index}>
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.other === true && (
                  <div
                    style={{
                      zIndex: "999",
                      marginTop: "65px",
                      width: "400px",
                    }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.auctions : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ auctions: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.auctions : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ auctions: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.other,
                              other: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("austin")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row style={{ display: "flex", alignContent: "center" }}>
              <Col
                md={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength.auctions} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              {/* <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col> */}
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions/Houston" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setAuctionType({ auctions: e.target.value })}
                  className="RealButton"
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setPropertyType(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Property Type</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="car">Car</option>
                  <option value="jet">Jet</option>
                  <option value="yacht">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.other,
                        other: true,
                      }));
                    } else {
                      const getPrice = CarPrices.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ auctions: getPrice[0].min_price });
                        setMaxPrice({ auctions: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {CarPrices.map((price, index) => (
                    <option value={index} key={index}>
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.other === true && (
                  <div
                    style={{
                      zIndex: "999",
                      marginTop: "65px",
                      width: "400px",
                    }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.auctions : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ auctions: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.auctions : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ auctions: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.other,
                              other: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("houston")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row style={{ display: "flex", alignContent: "center" }}>
              <Col
                md={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength.auctions} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              {/* <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col> */}
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions/Dallas" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setAuctionType({ auctions: e.target.value })}
                  className="RealButton"
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setPropertyType(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Property Type</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="car">Car</option>
                  <option value="jet">Jet</option>
                  <option value="yacht">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.other,
                        other: true,
                      }));
                    } else {
                      const getPrice = CarPrices.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ auctions: getPrice[0].min_price });
                        setMaxPrice({ auctions: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {CarPrices.map((price, index) => (
                    <option value={index} key={index}>
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.other === true && (
                  <div
                    style={{
                      zIndex: "999",
                      marginTop: "65px",
                      width: "400px",
                    }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.auctions : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ auctions: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.auctions : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ auctions: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.other,
                              other: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("dallas")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row style={{ display: "flex", alignContent: "center" }}>
              <Col
                md={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength.auctions} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              {/* <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col> */}
            </Row>
          </Col>
        </Row>
      ) : path === "/Auctions/SanAntonio" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setAuctionType({ auctions: e.target.value })}
                  className="RealButton"
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setPropertyType(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Property Type</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="car">Car</option>
                  <option value="jet">Jet</option>
                  <option value="yacht">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.other,
                        other: true,
                      }));
                    } else {
                      const getPrice = CarPrices.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ auctions: getPrice[0].min_price });
                        setMaxPrice({ auctions: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {CarPrices.map((price, index) => (
                    <option value={index} key={index}>
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.other === true && (
                  <div
                    style={{
                      zIndex: "999",
                      marginTop: "65px",
                      width: "400px",
                    }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.auctions : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ auctions: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.auctions : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ auctions: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.other,
                              other: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("sanAntonio")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col md={3} className="filterResult">
            <Row style={{ display: "flex", alignContent: "center" }}>
              <Col
                md={5}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength.auctions} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              {/* <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col> */}
            </Row>
          </Col>
        </Row>
      ) : path === "/realEstates" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
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
                      <div className="w-100">
                        <input
                          {...getInputProps({
                            placeholder: "Country, State, City, Postal Code",
                            className: "searchBar",
                          })}
                          required
                        />
                        {suggestions && suggestions.length > 0 && (
                          <div
                            className="autocomplete-dropdown-container"
                            style={{ marginTop: "-10px", marginLeft: "-10px" }}
                          >
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    setAuctionType({
                      realEstate: e.target.value,
                    });
                  }}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinPrice();
                      setMaxPrice();
                      setOtherPrice((prevState) => ({
                        ...prevState.realEstate,
                        realEstate: true,
                      }));
                    } else {
                      const getPrice = RealEstatePrice.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getPrice.length > 0) {
                        setMinPrice({ realEstate: getPrice[0].min_price });
                        setMaxPrice({ realEstate: getPrice[0].max_price });
                      } else {
                        setMinPrice();
                        setMaxPrice();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option value="">Price</option>
                  {RealEstatePrice.map((price, index) => (
                    <option value={index} key={index}>
                      ${price.min_price.toLocaleString()} - $
                      {price.max_price.toLocaleString()}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherPrice.realEstate === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Price Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={minPrice ? minPrice.realEstate : ""}
                          className="form-control"
                          placeholder="Min"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinPrice({ realEstate: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          prefix="$"
                          value={maxPrice ? maxPrice.realEstate : ""}
                          className="form-control"
                          placeholder="Max"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxPrice({ realEstate: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherPrice((prevState) => ({
                              ...prevState.realEstate,
                              realEstate: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    if (e.target.value === "Other") {
                      setMinYear();
                      setMaxYear();
                      setOtherYear((prevState) => ({
                        ...prevState.realEstate,
                        realEstate: true,
                      }));
                    } else {
                      const getYears = years.filter(
                        (price, index) => index === parseInt(e.target.value)
                      );
                      if (getYears.length > 0) {
                        setMinYear({ realEstate: getYears[0].min_price });
                        setMaxYear({ realEstate: getYears[0].max_price });
                      } else {
                        setMinYear();
                        setMaxYear();
                      }
                    }
                  }}
                  className=" RealButton "
                >
                  <option>Years</option>
                  {years.map((item, index) => (
                    <option key={index} value={index}>
                      {item.min} - {item.max}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
                {otherYear.realEstate === true && (
                  <div
                    style={{ zIndex: "999", marginTop: "65px", width: "400px" }}
                    className="position-absolute bg-white rounded shadow-lg"
                  >
                    <Row className="d-grid mt-3">
                      <span>Year Range</span>
                      <Col className="d-flex justify-content-center align-items-center mt-4">
                        <NumberFormat
                          thousandSeparator={true}
                          value={minYear?.realEstate}
                          className="form-control"
                          placeholder="Min Year"
                          format="####"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMinYear({ realEstate: value });
                          }}
                          required
                        />
                        -
                        <NumberFormat
                          thousandSeparator={true}
                          value={maxYear?.realEstate}
                          placeholder="Max Year"
                          format="####"
                          className="form-control"
                          onValueChange={(values) => {
                            const { value } = values;
                            setMaxYear({ realEstate: value });
                          }}
                          required
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          backgroundColor: "#fcba7d",
                        }}
                        className="mt-5 p-2"
                      >
                        <Button
                          style={{
                            backgroundColor: "white",
                            color: "#fcba7d",
                            border: "none",
                            fontWeight: "700",
                          }}
                          onClick={() =>
                            setOtherYear((prevState) => ({
                              ...prevState.realEstate,
                              realEstate: false,
                            }))
                          }
                        >
                          Done
                        </Button>
                      </Col>
                    </Row>
                  </div>
                )}
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    setRealType(e.target.value);
                  }}
                  className=" RealButton "
                >
                  <option value="">Property Type</option>
                  {realEstateType.map((type, index) => (
                    <option key={index} value={type.value}>
                      {type.name}
                    </option>
                  ))}
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <button
                  onClick={() => getFilter("real-estate")}
                  className="galleryButton"
                >
                  Search
                </button>
              </Col>
            </Row>
          </Col>
          <Col className="d-flex justify-content-center filterResult" md={3}>
            <Row>
              <Col
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: ".9rem",
                }}
                className="resultText"
              >
                {resultLength?.realEstate} Results
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="mapButton" onClick={toggleMap}>
                  Map
                </button>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton" onClick={toggleImage}>
                  Gallery
                </button>
              </Col>
            </Row>
          </Col>
        </Row>
      ) : null}
    </>
  );
}

export default PropertyPageHeader;
