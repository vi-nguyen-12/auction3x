import React from "react";

const ListingDetails = ({ toogleStep, step }) => (
  <form className="listDetail-content">
    <div className="sell-top">
      <div class="circle-1">
        <p class="text">01</p>
        <span className = "spnn">Select Catagory</span>
      </div>{" "}
      <div class="line-1"></div>
      <div class="circle-2">
        <p class="text">02</p>
        <span className = "spnn">Upload Documents</span>
      </div>{" "}
      <div class="line-2"></div>
      <div class="circle-3">
        <p class="text">03</p>
        <span className = "spnn">Approval</span>
      </div>{" "}
      <div class="line-3"></div>
      <div class="circle-4">
        <p class="text">04</p>
        <span className = "spnn">Agreement</span>
      </div>{" "}
      <div class="line-4"></div>
      <div class="circle-5">
        <p class="text">05</p>
        <span className = "spnn">Listing Fees</span>
      </div>{" "}
      <div class="line-5"></div>
      <div class="circle-6">
        <p class="text">06</p>
        <span className = "spnn">Listing Details</span>
      </div>{" "}
    </div>
    <div className="list-sell-bottom">
      <div className="listDetails-title">
        <h2>Listing Deatails</h2>
        <p>shdcb sdhb sdhc sdbchsdbch </p>
      </div>
      <form className="list-form">
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
          <input
            type="text"
            className="form-control"
            placeholder="Address"
            style={{ width: "500px", fontSize: "17px", fontWeight: "bold" }}
            //{...register("userName", { required: false, maxLength: 20 })}
            required
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
            //{...register("userName", { required: false, maxLength: 20 })}
            required
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
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              <input
                style={{ fontSize: "17px", fontWeight: "bold" }}
                type="text"
                name="firstName"
                className="form-control"
                placeholder="State"
                //{...register("firstName", { required: true })}
                required
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
                //{...register("lastName", { required: true })}
                required
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
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              <input
                style={{ fontSize: "17px", fontWeight: "bold" }}
                type="email"
                className="form-control"
                placeholder="Zip Code"
                //{...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                required
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
                type="number"
                className="form-control"
                placeholder="Country"
                // {...register("phone", {
                //   required: true,
                //   minLength: 6,
                //   maxLength: 12,
                // })}
                required
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

        <label
          style={{
            fontWeight: "bold",
            fontSize: "20px",
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          Property Details
        </label>

        <table
          style={{
            position: "relative",
            width: "100%",
            marginBottom: "10px",
          }}
        >
          <tr>
            <td style={{ width: "270px", position: "relative", left: "105px" }}>
              <select
                style={{ fontSize: "17px", fontWeight: "bold" }}
                type="text"
                name="firstName"
                className="form-control"
                placeholder="Property Type"
                //{...register("firstName", { required: true })}
                required
              >
                <option>Apartment</option>
                <option>House</option>
                <option>Villa</option>
                <option>Flat</option>
                <option>Shop</option>
                <option>Office</option>
                <option>Land</option>
                <option>Warehouse</option>
                <option>Other</option>
              </select>
            </td>
            <td
              style={{
                position: "absolute",
                right: "103px",
                width: "180px",
                fontSize: "17px",
              }}
            >
              <input
                style={{ fontSize: "17px", fontWeight: "bold" }}
                type="text"
                name="lastName"
                className="form-control"
                placeholder="$"
                //{...register("lastName", { required: true })}
                required
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
            <td>Property Type</td>
            <td style={{ paddingLeft: "43px" }}>Price</td>
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
            <td style={{ width: "240px", position: "relative", left: "105px" }}>
              <input
                style={{ fontSize: "17px", fontWeight: "bold" }}
                type="text"
                name="firstName"
                className="form-control"
                placeholder="sqft"
                //{...register("firstName", { required: true })}
                required
              />
            </td>
            <td
              style={{
                position: "absolute",
                left: "360px",
                width: "100px",
                fontSize: "17px",
              }}
            >
              <select
                style={{ fontSize: "17px", fontWeight: "bold" }}
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Bed"
                //{...register("lastName", { required: true })}
                required
              >
                <option>Bed</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
            </td>
            <td
              style={{
                position: "absolute",
                right: "100px",
                width: "100px",
                fontSize: "17px",
              }}
            >
              <select
                style={{ fontSize: "17px", fontWeight: "bold" }}
                type="text"
                name="lastName"
                className="form-control"
                placeholder="Bed"
                //{...register("lastName", { required: true })}
                required
              >
                <option>Bath</option>
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
              </select>
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
            <td>Property Size</td>
            <td style={{ paddingLeft: "15px" }}>Bedrooms</td>
            <td style={{ paddingRight: "85px" }}>Bathrooms</td>
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
      </form>
    </div>
    <div className="bottom-btn">
      <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
        Previous
      </button>
      <button
        className="nxt-btn"
        onClick={() => {
          toogleStep(step + 1);
        }}
      >
        Submit
      </button>
    </div>
  </form>
);
export default ListingDetails;