import React from "react";
import { useForm } from "react-hook-form";
import authService from "../services/authServices";
import { useState } from "react";
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
      setAddress(results[0].formatted_address.split(",")[0]);

      let cities = results[0].address_components.filter((item) => {
        return item.types.includes("locality" || "sublocality");
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
    const addres = address + " " + data.address1;
    const datas = {
      street_address: addres,
      city: city,
      state: state,
      country: country,
      zipCode: zip,
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
    <div className="listDetail-content">
      <div className="sell-top">
        <div className="circle-1">
          <p className="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div className="line-1"></div>
        <div className="circle-2">
          <p className="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">05</p>
          <span className="spnn">Agreement</span>
        </div>
        {/* <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div> */}
      </div>
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
          <h6 style={{ fontWeight: "bolder", fontSize: "20px" }}>
            Search Property
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
                        ? { backgroundColor: "#fafafa", cursor: "pointer" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
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
