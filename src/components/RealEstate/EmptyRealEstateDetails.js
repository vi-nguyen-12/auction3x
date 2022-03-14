import React from "react";
import { useForm } from "react-hook-form";

function EmptyRealEstateDetails({
  property,
  toogleStep,
  step,
  tooglePropertyData,
}) {
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
      className="list-form"
    >
      <label
        style={{
          fontWeight: "bold",
          fontSize: "40px",
          display: "flex",
          justifyContent: "center",
          marginBottom: "40px",
          marginTop: "20px",
          color: "black",
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
            color: "black",
          }}
          defaultValue={property.street_address}
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
                defaultValue={property.state}
                type="text"
                name="state"
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
                defaultValue={property.city}
                type="text"
                name="city"
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
                defaultValue={property.zipCode}
                type="number"
                name="zipCode"
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
              Property Owner<span style={{ color: "#ff0000" }}>*</span>
            </td>
            <td style={{ paddingLeft: "30px" }}>
              Property Type<span style={{ color: "#ff0000" }}>*</span>
            </td>
          </tr>
        </tbody>
      </table>

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

      <table
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <tbody>
          <tr>
            <td>
              <div className="amount-input">
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
                color: "black",
              }}
            >
              Market Value<span style={{ color: "#ff0000" }}>*</span>
            </td>
          </tr>
        </tbody>
      </table>

      <table style={{ display: "inline" }}>
        <tbody>
          <tr>
            <td
              style={{
                width: "240px",
                position: "relative",
                left: "105px",
              }}
            >
              <div className="amount-input">
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
                />
              </div>
            </td>
            <td
              className="amount-input"
              style={{
                position: "absolute",
                right: "100px",
                width: "240px",
                fontSize: "17px",
              }}
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
                name="discussedAmount"
                {...register("discussedAmount", { required: false })}
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
              Reserved Amount<span style={{ color: "#ff0000" }}>*</span>
            </td>
            <td style={{ paddingLeft: "15px" }}>
              Discuss Amount<span style={{ color: "#ff0000" }}>*</span>
            </td>
          </tr>
        </tbody>
      </table>

      <div
        style={{
          width: "100%",
          height: "100px",
          display: "flex",
          justifyContent: "center",
          marginTop: "20px",
        }}
      >
        <textarea
          style={{
            width: "80%",
            height: "100%",
            resize: "none",
            fontSize: "17px",
            color: "black",
          }}
          name="description"
          className="form-control"
          placeholder="Property Description(Optional)"
        ></textarea>
      </div>

      {/* <div style={{ display: "flex", justifyContent: "center",}}>
        <textarea
          style={{
            width: "70%",
            height: "100px",
            border: "2px solid #dba076",
            borderRadius: "3px",
            paddingLeft: "10px",
            position: "absolute",
            bottom: "100px",
          }}
          placeholder="Property Description(Optional)"
        ></textarea>
      </div> */}
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

export default EmptyRealEstateDetails;
