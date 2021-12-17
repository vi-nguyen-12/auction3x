import React from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import "../styles/SellRegister.css";

const PropertyDetails = ({
  toogleStep,
  step,
  property,
  tooglePropertyData,
}) => {
  console.log(property);
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
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
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="listDetail-content">
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
        <div class="line-2"></div>
        <div class="circle-3">
          <p class="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">04</p>
          <span className="spnn">Upload Pictures/Videos</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">05</p>
          <span className="spnn">Listing Fees</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div>
      </div>
      <div className="list-sell-bottom">
        <div className="listDetails-title">
          <h2>Listing Deatails</h2>
          <p>shdcb sdhb sdhc sdbchsdbch </p>
        </div>
        <form className="list-form">
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

          <div style={{ display: "flex", justifyContent: "center" }}>
            <input
              style={{
                width: "300px",
                marginBottom: "10px",
                fontWeight: "bold",
                fontSize: "15px",
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
            }}
          >
            Street Address
          </label>

          <table
            style={{
              marginBottom: "10px",
            }}
          >
            <tr style={{ marginBottom: "30px" }}>
              <td style={{ position: "relative", left: "199px" }}>
                <input
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                    width: "100px",
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
              }}
            >
              <td>State</td>
              <td style={{ paddingLeft: "10px" }}>City</td>
              <td style={{ paddingLeft: "87px" }}>Zip Code</td>
            </tr>
          </table>

          <table
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "20px",
              marginTop: "40px",
            }}
          >
            <tr>
              <td
                style={{ width: "270px", position: "relative", left: "105px" }}
              >
                <input
                  style={{ fontSize: "17px", fontWeight: "bold" }}
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
                  style={{ fontSize: "17px", fontWeight: "bold" }}
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
              }}
            >
              <td>Property Owner</td>
              <td style={{ paddingLeft: "30px" }}>Property Type</td>
            </tr>
          </table>

          <table
            style={{
              position: "relative",
              width: "100%",
              marginBottom: "10px",
            }}
          >
            <tr>
              <td
                style={{ width: "130px", position: "relative", left: "105px" }}
              >
                <input
                  style={{ fontSize: "17px", fontWeight: "bold" }}
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
                  style={{ fontSize: "17px", fontWeight: "bold" }}
                  type="number"
                  name="sqft"
                  className="form-control"
                  defaultValue={property.structure.total_area_sq_ft}
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
                  style={{ fontSize: "17px", fontWeight: "bold" }}
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
                  style={{ fontSize: "17px", fontWeight: "bold" }}
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
              }}
            >
              <td>Total Rooms</td>
              <td style={{ paddingLeft: "10px" }}>Property Size(sqft)</td>
              <td style={{ margin: "auto" }}>Bedrooms</td>
              <td style={{ paddingRight: "170px", paddingLeft: "35px" }}>
                Bathrooms
              </td>
            </tr>
          </table>

          <table
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div style={{ display: "inline" }}>
              <tr>
                <td>
                  <div className="amount-input">
                    <span className="prefix">$</span>
                    <input
                      style={{
                        fontSize: "17px",
                        fontWeight: "bold",
                      }}
                      type="number"
                      name="total_value"
                      className="sell-amount"
                      defaultValue={property.assessments[0].total_value}
                      // {...register("total_value", { required: false })}
                    />
                  </div>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    position: "relative",
                    fontSize: "13px",
                  }}
                >
                  {" "}
                  House Amount
                </td>
              </tr>
            </div>
          </table>

          <table style={{ display: "inline" }}>
            <tr>
              <td
                style={{ width: "240px", position: "relative", left: "105px" }}
              >
                <div className="amount-input">
                  <span className="prefix">$</span>
                  <input
                    className="sell-amount"
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                    type="number"
                    name="reservedAmount"
                    {...register("reservedAmount", { required: false })}
                  />
                </div>
              </td>
              <td
                style={{
                  position: "absolute",
                  right: "100px",
                  width: "240px",
                  fontSize: "17px",
                }}
              >
                <div className="amount-input">
                  <span className="prefix">$</span>
                  <input
                    className="sell-amount"
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                    }}
                    type="number"
                    name="discussedAmount"
                    {...register("discussedAmount", { required: false })}
                  />
                </div>
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
              <td>Reserved Amount</td>
              <td style={{ paddingLeft: "15px" }}>Discuss Amount</td>
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
                position: "absolute",
                bottom: "10px",
              }}
              placeholder="Property Description"
            ></textarea>
          </div>
        </form>
      </div>
      <div className="bottom-btn">
        <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
          Previous
        </button>
        <button className="nxt-btn" type="submit">
          Next
        </button>
      </div>
    </form>
  );
};
export default PropertyDetails;
