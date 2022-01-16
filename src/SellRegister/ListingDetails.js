import React from "react";
import { useForm } from "react-hook-form";
import authService from "../services/authServices";
import { useState, useEffect } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
} from "react-places-autocomplete";

const ListingDetails = ({ toogleStep, step, properties }) => {
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
        return item.types[0] === "locality";
      });
      setCity(cities[0].long_name);

      let states = results[0].address_components.filter((item) => {
        return item.types[0] === "administrative_area_level_1";
      });
      setState(states[0].long_name);

      let countries = results[0].address_components.filter((item) => {
        return item.types[0] === "country";
      });
      setCountry(countries[0].long_name);

      let zipcodes = results[0].address_components.filter((item) => {
        return item.types[0] === "postal_code";
      });
      setZip(zipcodes[0].long_name);
    });
  };

  const onSubmit = (data) => {
    const datas = {
      street_address: address,
      city: city,
      state: state,
      country: country,
      zipCode: zip,
    };
    authService.realEstate(datas).then((res) => {
      properties(res.data);
      toogleStep(step + 1);
    });
  };

  return (
    <div className="listDetail-content">
      <div className="sell-top">
        <div class="circle-1">
          <p class="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div class="line-1"></div>
        <div class="circle-2">
          <p class="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">05</p>
          <span className="spnn">Agreement</span>
        </div>
        {/* <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div> */}
      </div>
      <div className="list-sell-bottom">
        <div className="listDetails-title">
          <h2>Listing Deatails</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="list-form">
          <h6 style={{ fontWeight: "bolder", fontSize: "20px" }}>
            Property Information
          </h6>

          <div
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
                    style={{ width: "500px", fontSize: "17px", fontWeight: "bold" }}
                    {...getInputProps({
                      placeholder: "Search address",
                      className: "form-control",
                    })}
                  />
                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion) => {
                      const className = suggestion.active
                        ? "suggestion-item--active"
                        : "suggestion-item";
                      // inline style for demonstration purpose
                      const style = suggestion.active
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
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
            {/* <input
              type="text"
              className="form-control"
              placeholder="Address"
              style={{ width: "500px", fontSize: "17px", fontWeight: "bold" }}
              {...register("street_address", {
                required: false,
                maxLength: 100,
              })}
              required
            /> */}
          </div>
          <label
            style={{
              position: "relative",
              left: "110px",
              bottom: "10px",
              fontSize: "13px",
              marginBottom: "10px",
            }}
          >
            Address Line 1
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
              style={{ width: "500px", fontSize: "17px", fontWeight: "bold" }}
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
            }}
          >
            Address Line 2
          </label>

          <table
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <tr>
              <td
                style={{ width: "240px", position: "relative", left: "105px" }}
              >
                <input
                  style={{ fontSize: "17px", fontWeight: "bold" }}
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="State"
                  value={state}
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
                  style={{ fontSize: "17px", fontWeight: "bold" }}
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="City"
                  value={city}
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
              }}
            >
              <td>State / Province</td>
              <td style={{ paddingLeft: "15px" }}>City / District</td>
            </tr>
          </table>

          <table style={{ marginBottom: "30px" }}>
            <tr>
              <td
                style={{ width: "240px", position: "relative", left: "105px" }}
              >
                <input
                  style={{ fontSize: "17px", fontWeight: "bold" }}
                  type="number"
                  className="form-control"
                  placeholder="Zip Code"
                  value={zip}
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
                  style={{ fontSize: "17px", fontWeight: "bold" }}
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  value={country}
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
              }}
            >
              <td>Postal Code</td>
              <td style={{ paddingLeft: "15px" }}>Country</td>
            </tr>
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
              placeholder="Property Description"
            ></textarea>
          </div>
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
    </div>
  );
};
export default ListingDetails;
