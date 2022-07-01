import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  Button,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
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
  const [auctionType, setAuctionType] = useState({});
  const [propType, setPropType] = useState();
  const [realType, setRealType] = useState();
  const [minPrice, setMinPrice] = useState({});
  const [maxPrice, setMaxPrice] = useState({});
  const [address, setAddress] = useState("");
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();

  const [condition, setCondition] = useState();
  const [minMileage, setMinMileage] = useState();
  const [maxMileage, setMaxMileage] = useState();
  const [make, setMake] = useState({});
  const [model, setModel] = useState();

  const [otherPrice, setOtherPrice] = useState({
    realEstate: false,
    car: false,
    jet: false,
    yacht: false,
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

  const [minYear, setMinYear] = useState({});
  const [maxYear, setMaxYear] = useState({});

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
    { value: "country house", name: "Country House" },
    { value: "finca", name: "Finca" },
    { value: "chalet", name: "Chalet" },
    { value: "townhouse", name: "Townhouse" },
    { value: "bungalow", name: "Bungalow" },
    { value: "apartment", name: "Apartment" },
    { value: "penhouse", name: "Penhouse" },
    { value: "condo", name: "Condo" },
    { value: "co op", name: "Co-Op" },
    { value: "land", name: "Land" },
    { value: "castle", name: "Castle" },
    { value: "chateau", name: "Chateau" },
    { value: "farm ranch", name: "Farm Ranch" },
    { value: "private island", name: "Private Island" },
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
        make: make,
        model: model,
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
        minLength: minLength,
        maxLength: maxLength,
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
  };

  const handleSelect = (address) => {
    geocodeByAddress(address).then((results) => {
      console.log(results);
      setAddress(results[0].formatted_address);
      setLocation(results[0].formatted_address)

      let cities = results[0].address_components.filter((item) => {
        return item.types.includes(
          "locality" || "sublocality" || "neighborhood"
        );
      });
      setCity(
        cities[0] ? cities[0].long_name : cities[0] ? cities[0].short_name : ""
      );

      let states = results[0].address_components.filter((item) => {
        return item.types[0] === "administrative_area_level_1";
      });
      setState(
        states[0] ? states[0].long_name : states[0] ? states[0].short_name : ""
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
        zipcodes[0]
          ? zipcodes[0].long_name
          : zipcodes[0]
            ? zipcodes[0].short_name
            : ""
      );
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
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
                    placeholder="Make, Model"
                    className="searchBar"
                    onChange={(e) => carSearch(e.target.value)}
                  />
                  {results.length > 0
                    ? results.map((item, index) => (
                        <Row
                          style={{
                            width: "300px",
                            height: "100px",
                            marginTop: "140px",
                            marginLeft: "20px",
                            padding: "10px",
                          }}
                          className="position-absolute bg-white rounded shadow-lg"
                          key={index}
                        >
                          <Col>{item}</Col>
                        </Row>
                      ))
                    : null} */}
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
                          placeholder="Max"
                          className="form-control"
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
                {resultLength.car} Results
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setAuctionType(e.target.value)}
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
                          value={minPrice}
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
                          value={maxPrice}
                          placeholder="Max"
                          className="form-control"
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
                          value={minYear}
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
                          value={maxYear}
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
                <button className="galleryButton">Search</button>
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
                {resultLength.jet} Results
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
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
                            value={minPrice}
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
                            value={maxPrice}
                            placeholder="Max"
                            className="form-control"
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
                  <option>Makes</option>
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
                <Form.Select className=" RealButton ">
                  <option value="">Length</option>
                  {length.map((item, index) => (
                    <option key={index} value={index}>
                      {item.min} ft - {item.max} ft
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9000+ results
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>More Filter</option>
                  <option href="#">Bedrooms</option>
                  <option href="#">Bathrooms</option>
                  <option href="#">Area</option>
                  <option href="#">Year Built</option>
                  <option href="#">Garage</option>
                </Form.Select>
              </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
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
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
              <Form.Select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Bedrooms</option>
                <option href="#">Bathrooms</option>
                <option href="#">Area</option>
                <option href="#">Year Built</option>
                <option href="#">Garage</option>
              </Form.Select>
            </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
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
      ) : path === "/Auctions/Houston" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
              <Form.Select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Bedrooms</option>
                <option href="#">Bathrooms</option>
                <option href="#">Area</option>
                <option href="#">Year Built</option>
                <option href="#">Garage</option>
              </Form.Select>
            </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
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
      ) : path === "/Auctions/Dallas" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
              <Form.Select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Bedrooms</option>
                <option href="#">Bathrooms</option>
                <option href="#">Area</option>
                <option href="#">Year Built</option>
                <option href="#">Garage</option>
              </Form.Select>
            </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
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
      ) : path === "/Auctions/SanAntonio" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
                  <input
                    type="text"
                    placeholder="Enter location to search"
                    className="searchBar"
                  />
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => setFilter(e.target.value)}
                  className=" RealButton "
                >
                  <option value="">Auction Type</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="completed">completed</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Property Type</option>
                  <option href="#">Real Estate</option>
                  <option href="#">Car</option>
                  <option href="#">Jet</option>
                  <option href="#">Yacht</option>
                </Form.Select>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select className=" RealButton ">
                  <option>Price</option>
                  <option href="#">$0 - $50,000</option>
                  <option href="#">$50,000 - $2,000,000</option>
                  <option href="#">$2,000,000 - $5,000,000</option>
                  <option href="#">$5,000,000 - $10,000,000</option>
                </Form.Select>
              </Col>
              {/* <Col className="d-flex justify-content-center">
              <Form.Select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Bedrooms</option>
                <option href="#">Bathrooms</option>
                <option href="#">Area</option>
                <option href="#">Year Built</option>
                <option href="#">Garage</option>
              </Form.Select>
            </Col> */}
              <Col className="d-flex justify-content-center">
                <button className="galleryButton">Search</button>
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
                9,000+ results
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
      ) : path === "/realEstates" ? (
        <Row className="realEstateFilter">
          <Col md={9}>
            <Row>
              <Col md={4} xs={12}>
                <div style={{ width: "100%" }} className=" RealButton ">
                  <MdOutlineMyLocation size={24} color="#A0A0A0" />
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
                </div>
              </Col>
              <Col className="d-flex justify-content-center">
                <Form.Select
                  onChange={(e) => {
                    setAuctionType({ realEstate: e.target.value });
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
                        setMinPrice((prevState) => ({
                          ...prevState.realEstate,
                          realEstate: getPrice[0].min_price,
                        }));
                        setMaxPrice((prevState) => ({
                          ...prevState.realEstate,
                          realEstate: getPrice[0].max_price,
                        }));
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
                          value={maxPrice ? maxPrice : ""}
                          placeholder="Max"
                          className="form-control"
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
                          value={minYear}
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
                          value={maxYear}
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
              {/* <Col className="d-flex justify-content-center">
                <Form.Select
                  style={{ width: "150px" }}
                  className=" RealButton "
                >
                  <option>More Filter</option>
                  <option href="#">Bedrooms</option>
                  <option href="#">Bathrooms</option>
                  <option href="#">Area</option>
                  <option href="#">Year Built</option>
                  <option href="#">Garage</option>
                </Form.Select>
              </Col> */}
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
                {resultLength.realEstate} Results
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
