import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";

function RealEstateForm({ toogleStep, step, properties, property }) {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const params = useParams();

  const [address, setAddress] = useState();
  const [address1, setAddress1] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [country, setCountry] = useState();
  const [zip, setZip] = useState();

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
      setZip(
        zipcodes[0].long_name ? zipcodes[0].long_name : zipcodes[0].short_name
      );
    });
  };

  useEffect(() => {
    if (params.id) {
      authService.getIncompleteProperty(params.userId).then((res) => {
        const properti = res.data.filter((prop) => prop._id === params.id);
        setAddress(
          properti[0].details.property_address.formatted_street_address
            ? properti[0].details.property_address.formatted_street_address
            : property.street_address
            ? property.street_address
            : ""
        );
        setCity(
          properti[0].details.property_address.city
            ? properti[0].details.property_address.city
            : property.city
            ? property.city
            : ""
        );
        setState(
          properti[0].details.property_address.state
            ? properti[0].details.property_address.state
            : property.state
            ? property.state
            : ""
        );
        setCountry(
          properti[0].details.property_address.country
            ? properti[0].details.property_address.country
            : property.country
            ? property.country
            : ""
        );
        setZip(
          properti[0].details.property_address.zip_code
            ? properti[0].details.property_address.zip_code
            : property.zip_code
            ? property.zip_code
            : ""
        );
      });
    } else {
      setAddress(property.street_address ? property.street_address : "");
      setCity(property.city ? property.city : "");
      setState(property.state ? property.state : "");
      setCountry(property.country ? property.country : "");
      setZip(property.zip_code ? property.zip_code : "");
    }
  }, [params.id]);

  const onSubmit = (data) => {
    const addres = address1 ? address + ", " + address1 : address;
    const datas = {
      street_address: addres,
      city: city ? city : data.city,
      state: state ? state : data.state,
      country: country ? country : data.country,
      zip_code: zip ? zip : data.zipCode,
    };

    authService.realEstate(datas).then((res) => {
      if (res.data.length !== 0) {
        properties(
          res.data.name !== "Error"
            ? res.data
            : res.data.name === "Error"
            ? datas
            : ""
        );
        toogleStep(step + 1);
      } else if (res.data.length === 0) {
        alert(
          "Could not find property information! Please fill out the property details."
        );
      }
    });
  };
  return (
    <div className="list-sell-bottom">
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="list-form"
      >
        <h6 style={{ fontWeight: "bolder", fontSize: "20px", color: "black" }}>
          Search Property
        </h6>

        <Container>
          <Row>
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
                      Street Address <span style={{ color: "#ff0000" }}>*</span>
                    </span>
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
                  </div>
                )}
              </PlacesAutocomplete>
            </Col>
          </Row>
          <Row style={{ marginTop: "10px" }}>
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
          <Row style={{ marginTop: "10px" }}>
            <Col>
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
            <Col>
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
          <Row style={{ marginTop: "10px" }}>
            <Col>
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
            <Col>
              <input
                className="form-control"
                type="number"
                name="zip"
                placeholder="Zip Code"
                defaultValue={zip}
                {...register("zipCode", { required: false, maxLength: 10 })}
                required
              />
              <span style={{ fontWeight: "600", color: "black" }}>
                Zip Code <span style={{ color: "#ff0000" }}>*</span>
              </span>
            </Col>
          </Row>
        </Container>
        <div
          className="bottom-btn"
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <button
            className="pre-btn"
            onClick={() => {
              toogleStep(step - 1);
            }}
          >
            Previous
          </button>
          <button className="nxt-btn" type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
}

export default RealEstateForm;
