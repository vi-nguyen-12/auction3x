import React from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";

function RealEstateDetails({ property, toogleStep, step, tooglePropertyData }) {
  console.log(property);
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
        type: "real-estate",
        street_address: data.street_address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        discussedAmount: data.discussedAmount,
        reservedAmount: data.reservedAmount,
        fields: {
          beds_count: data.bedrooms,
          baths: data.bathrooms,
          rooms_count: data.rooms_count,
          total_value: data.total_value,
        },
      };

      tooglePropertyData(submitedData);
      toogleStep(step + 1);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className="list-form1"
    >
      <label
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
          marginTop: "20px",
        }}
      >
        Property Details
      </label>

      {property.address ? (
        <>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              style={{
                width: "300px",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "15px",
                color: "black",
              }}
              defaultValue={property.address.formatted_street_address}
              {...register("street_address", { required: false })}
            />
          </div>
          <label
            style={{
              position: "relative",
              fontSize: "13px",
              bottom: "15px",
              left: "200px",
              color: "black",
            }}
          >
            Street Address
          </label>

          <table
            style={{
              marginBottom: "10px",
            }}
          >
            <tbody>
              <tr style={{ marginBottom: "30px" }}>
                <td style={{ position: "relative", left: "199px" }}>
                  <input
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      width: "100px",
                      color: "black",
                    }}
                    type="text"
                    name="state"
                    defaultValue={property.address.state}
                    {...register("state", { required: false })}
                  ></input>
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "290px",
                    fontSize: "17px",
                  }}
                >
                  <input
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      width: "100px",
                      color: "black",
                    }}
                    type="text"
                    name="city"
                    defaultValue={property.address.city}
                    {...register("city", { required: false })}
                  />
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "199px",
                    fontSize: "17px",
                  }}
                >
                  <input
                    style={{
                      fontSize: "15px",
                      fontWeight: "bold",
                      width: "80px",
                      color: "black",
                    }}
                    type="number"
                    name="zipCode"
                    defaultValue={property.address.zip_code}
                    {...register("zipCode", { required: false })}
                  />
                </td>
              </tr>
              <tr
                style={{
                  position: "relative",
                  left: "200px",
                  fontSize: "13px",
                  bottom: "5px",
                  color: "black",
                }}
              >
                <td>State</td>
                <td style={{ paddingLeft: "10px" }}>City</td>
                <td style={{ paddingLeft: "87px" }}>Zip Code</td>
              </tr>
            </tbody>
          </table>
        </>
      ) : null}

      {property.owner && property.parcel ? (
        <>
          <table
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "20px",
              marginTop: "40px",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    width: "270px",
                    position: "relative",
                    left: "105px",
                  }}
                >
                  <input
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    type="text"
                    name="ownerName"
                    className="form-control"
                    defaultValue={property.owner.name}
                    {...register("ownerName", { required: false })}
                  ></input>
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "103px",
                    width: "190px",
                    fontSize: "17px",
                  }}
                >
                  <input
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    type="text"
                    name="propertyType"
                    className="form-control"
                    defaultValue={property.parcel.standardized_land_use_type}
                    {...register("propertyType", { required: false })}
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
                  Property Owner
                  <span style={{ color: "#ff0000" }}>*</span>
                </td>
                <td style={{ paddingLeft: "30px" }}>
                  Property Type
                  <span style={{ color: "#ff0000" }}>*</span>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : null}

      {property.structure ? (
        <>
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
                    width: "130px",
                    position: "relative",
                    left: "105px",
                  }}
                >
                  <input
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    type="number"
                    name="rooms_count"
                    className="form-control"
                    defaultValue={property.structure.rooms_count}
                    {...register("rooms_count", { required: false })}
                  />
                </td>
                <td
                  style={{
                    position: "absolute",
                    left: "245px",
                    width: "130px",
                    fontSize: "17px",
                  }}
                >
                  <input
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    type="number"
                    name="sqft"
                    className="form-control"
                    defaultValue={
                      property.structure.total_area_sq_ft
                        ? property.structure.total_area_sq_ft
                        : ""
                    }
                    {...register("sqft", { required: false })}
                  />
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "215px",
                    width: "100px",
                    fontSize: "17px",
                  }}
                >
                  <input
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    type="number"
                    name="beds"
                    className="form-control"
                    defaultValue={property.structure.beds_count}
                    {...register("bedrooms", { required: false })}
                  />
                </td>

                <td
                  style={{
                    position: "absolute",
                    right: "105px",
                    width: "100px",
                    fontSize: "17px",
                  }}
                >
                  <input
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    type="number"
                    name="baths"
                    className="form-control"
                    defaultValue={property.structure.baths}
                    {...register("bathrooms", { required: false })}
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
                  Total Rooms<span style={{ color: "#ff0000" }}>*</span>
                </td>
                <td style={{ paddingLeft: "10px" }}>
                  Property Size(sqft)
                  <span style={{ color: "#ff0000" }}>*</span>
                </td>
                <td style={{ margin: "auto" }}>
                  Bedrooms<span style={{ color: "#ff0000" }}>*</span>
                </td>
                <td style={{ paddingRight: "170px", paddingLeft: "35px" }}>
                  Bathrooms<span style={{ color: "#ff0000" }}>*</span>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : null}

      {property.market_assessments ? (
        <>
          <table
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <tbody style={{ display: "inline" }}>
              <tr>
                <td className="amount-input">
                  <span className="prefix">$</span>
                  <input
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      color: "black",
                    }}
                    type="number"
                    name="total_value"
                    className="sell-amount"
                    defaultValue={
                      property.market_assessments[0].total_value
                        ? property.market_assessments[0].total_value
                        : ""
                    }
                    // {...register("total_value", { required: false })}
                  />
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    position: "relative",
                    fontSize: "13px",
                    color: "black",
                  }}
                >
                  Market Value
                  <span style={{ color: "#ff0000" }}>*</span>
                </td>
              </tr>
            </tbody>
          </table>
        </>
      ) : null}

      <table>
        <tbody>
          <tr>
            <td
              className="amount-input-2"
              // style={{
              //   width: "240px",
              //   // position: "relative",
              //   // left: "105px",
              // }}
            >
              <span className="prefix">$</span>
              <input
                className="sell-amount"
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  color: "black",
                }}
                type="number"
                name="reservedAmount"
                {...register("reservedAmount", { required: false })}
                required
              />
            </td>

            <td className="amount-input-3">
              <span className="prefix">$</span>
              <input
                className="sell-amount"
                style={{
                  fontSize: "17px",
                  fontWeight: "bold",
                  color: "black",
                }}
                type="number"
                name="discussedAmount"
                {...register("discussedAmount", { required: false })}
                required
              />
            </td>
          </tr>
          <tr style={{ display: "flex", color: "black" }}>
            <td style={{ display: "flex", marginLeft: "140px" }}>
              Reserved Amount<span style={{ color: "#ff0000" }}>*</span>
            </td>
            <td style={{ display: "block", marginLeft: "85px" }}>
              Discuss Amount<span style={{ color: "#ff0000" }}>*</span>
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
            position: "absolute",
            bottom: "15%",
            color: "black",
          }}
          placeholder="Property Description(Optional)"
        ></textarea>
      </div>
      <div className="bottom-btn" style={{ width: "100%" }}>
        <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
          Previous
        </button>
        <button className="nxt-btn" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}

export default RealEstateDetails;