import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";
import { Container, Row, Col } from "react-bootstrap";

function RealEstateForm({ toogleStep, step, properties }) {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const [address, setAddress] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");

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

  const onSubmit = (data) => {
    const addres = address + " " + data.address1;
    const datas = {
      street_address: addres,
      city: city ? city : data.city,
      state: state ? state : data.state,
      country: country ? country : data.country,
      zipCode: zip ? zip : data.zipCode,
    };

    authService.realEstate(datas).then((res) => {
      if (res.data.length !== 0) {
        properties(res.data);
        toogleStep(step + 1);
      } else if (res.data.length === 0) {
        alert(
          "Could not find property information! Please fill out the property details."
        );
        properties(datas);
        toogleStep(step + 1);
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
                    <span style={{ fontWeight: "600" }}>Street Address *</span>
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
              />
              <span style={{ fontWeight: "600" }}>Address Line 2 *</span>
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
              />
              <span style={{ fontWeight: "600" }}>City *</span>
            </Col>
            <Col>
              <input
                className="form-control"
                type="text"
                name="state"
                placeholder="State"
                defaultValue={state}
                {...register("state", { required: false })}
              />
              <span style={{ fontWeight: "600" }}>State *</span>
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
              />
              <span style={{ fontWeight: "600" }}>Country *</span>
            </Col>
            <Col>
              <input
                className="form-control"
                type="text"
                name="zip"
                placeholder="Zip Code"
                defaultValue={zip}
                {...register("zipCode", { required: false })}
              />
              <span style={{ fontWeight: "600" }}>Zip Code *</span>
            </Col>
          </Row>
        </Container>

        {/* <div
          className="form-group mb-2"
          style={{
            marginTop: "80px",
            display: "flex",
            justifyContent: "center",
            position: "relative",
            paddingLeft: "10px",
          }}
        >
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
                  style={{
                    width: "500px",
                    fontSize: "17px",
                  }}
                  {...getInputProps({
                    placeholder: "Search address",
                    className: "form-control",
                  })}
                  required
                />
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
        </div>
        <label
          style={{
            position: "relative",
            left: "110px",
            bottom: "10px",
            fontSize: "13px",
            marginBottom: "10px",
            color: "black",
          }}
        >
          Address Line 1<span style={{ color: "#ff0000" }}>*</span>
        </label>

        <div
          className="form-group mb-2"
          style={{
            display: "flex",
            justifyContent: "center",
            position: "relative",
            paddingLeft: "10px",
          }}
        >
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            style={{ width: "500px", fontSize: "17px" }}
            {...register("address1", { required: false, maxLength: 100 })}
          />
        </div>
        <label
          style={{
            position: "relative",
            left: "110px",
            bottom: "10px",
            fontSize: "13px",
            marginBottom: "10px",
            color: "black",
          }}
        >
          Address Line 2<span style={{ color: "#ff0000" }}>*</span>
        </label>

        <table
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <tbody>
            <tr>
              <td
                style={{
                  width: "240px",
                  position: "relative",
                  left: "105px",
                }}
              >
                <input
                  style={{ fontSize: "17px" }}
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="State"
                  defaultValue={state}
                  {...register("state", { required: false })}
                />
              </td>
              <td
                style={{
                  position: "absolute",
                  right: "100px",
                  width: "240px",
                  fontSize: "17px",
                }}
              >
                <input
                  style={{ fontSize: "17px" }}
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="City"
                  defaultValue={city}
                  {...register("city", { required: false })}
                />
              </td>
            </tr>
            <tr
              style={{
                position: "relative",
                left: "109px",
                fontSize: "13px",
                bottom: "5px",
                color: "black",
              }}
            >
              <td>
                State / Province<span style={{ color: "#ff0000" }}>*</span>
              </td>
              <td style={{ paddingLeft: "15px" }}>
                City / District<span style={{ color: "#ff0000" }}>*</span>
              </td>
            </tr>
          </tbody>
        </table>

        <table style={{ marginBottom: "30px" }}>
          <tbody>
            <tr>
              <td
                style={{
                  width: "240px",
                  position: "relative",
                  left: "105px",
                }}
              >
                <input
                  style={{ fontSize: "17px" }}
                  type="text"
                  className="form-control"
                  placeholder="Zip Code"
                  defaultValue={zip}
                  {...register("zipCode", { required: false })}
                />
              </td>
              <td
                style={{
                  position: "absolute",
                  right: "100px",
                  width: "240px",
                  fontSize: "17px",
                }}
              >
                <input
                  style={{ fontSize: "17px" }}
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  defaultValue={country}
                  {...register("country", {
                    required: false,
                    maxLength: 100,
                  })}
                />
              </td>
            </tr>
            <tr
              style={{
                position: "relative",
                left: "109px",
                fontSize: "13px",
                bottom: "5px",
                color: "black",
              }}
            >
              <td>
                Postal Code<span style={{ color: "#ff0000" }}>*</span>
              </td>
              <td style={{ paddingLeft: "15px" }}>
                Country<span style={{ color: "#ff0000" }}>*</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <textarea
            style={{
              width: "70%",
              height: "100px",
              border: "2px solid #dba076",
              borderRadius: "3px",
              paddingLeft: "10px",
            }}
            placeholder="Property Description(Optional)"
          ></textarea>
        </div> */}
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
