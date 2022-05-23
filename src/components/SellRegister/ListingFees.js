import React from "react";

const ListingFees = ({ toggleStep, step }) => (
  <form className="listingfee-content">
    <div className="sell-top">
      <div className="circle-1">
        <p>01</p>
        <span className="spnn">Select Catagory</span>
      </div>
      <div className="line-1"></div>
      <div className="circle-2">
        <p>02</p>
        <span className="spnn">Listing Details</span>
      </div>
      <div className="line-2"></div>
      <div className="circle-3">
        <p>03</p>
        <span className="spnn">Property Details</span>
      </div>
      <div className="line-3"></div>
      <div className="circle-4">
        <p>04</p>
        <span className="spnn">Upload Documents</span>
      </div>
      <div className="line-4"></div>
      <div className="circle-5">
        <p>05</p>
        <span className="spnn">Agreement</span>
      </div>
      {/* <div class="line"></div>
      <div class="circle">
        <p class="text">06</p>
        <span className="spnn">Agreement</span>
      </div> */}
    </div>
    <div className="fee-sell-bottom">
      <div className="fee-title">
        <h2>Listinng Fees</h2>
      </div>
      <div className="fee-table">
        <table>
          <tr
            style={{ color: "#6d6d6d", fontWeight: "bold", fontSize: "16px" }}
          >
            <td>Credit Card Type</td>
            <td>Expiration Date</td>
            <td>CVV</td>
          </tr>
          <tr>
            <td>
              <select
                style={{
                  border: "1px solid #b9b9b9",
                  borderRadius: "4px",
                  display: "block",
                  outline: "none",
                  padding: "6px",
                  fontSize: "16px",
                  width: "200px",
                  marginRight: "40px",
                  marginBottom: "30px",
                  color: "#6d6d6d",
                  fontWeight: "bold",
                }}
              >
                <option style={{ color: "#6d6d6d", fontWeight: "bold" }}>
                  Visa
                </option>
                <option style={{ color: "#6d6d6d", fontWeight: "bold" }}>
                  MasterCard
                </option>
                <option style={{ color: "#6d6d6d", fontWeight: "bold" }}>
                  American Express
                </option>
                <option style={{ color: "#6d6d6d", fontWeight: "bold" }}>
                  Discover
                </option>
              </select>
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #b9b9b9",
                  borderRadius: "4px",
                  display: "block",
                  width: "100px",
                  outline: "none",
                  padding: "6px",
                  fontSize: "16px",
                  marginRight: "40px",
                  marginBottom: "30px",
                  color: "#b77b50",
                  fontWeight: "bold",
                  colorPlaceholder: "#6d6d6d",
                }}
                type="month/year"
                name="Expiration Date"
                placeholder="01/22"
              />
            </td>
            <td>
              <input
                style={{
                  border: "1px solid #b9b9b9",
                  borderRadius: "4px",
                  display: "block",
                  width: "100px",
                  outline: "none",
                  padding: "6px",
                  fontSize: "16px",
                  marginRight: "0",
                  marginBottom: "30px",
                  color: "#b77b50",
                  fontWeight: "bold",
                  colorPlaceholder: "#6d6d6d",
                }}
                type="number"
                min="0"
                name="CVV"
                placeholder=" 323"
              />
            </td>
          </tr>
        </table>
        <div className="form-group">
          <label
            style={{ color: "#6d6d6d", fontWeight: "bold", fontSize: "16px" }}
          >
            Card Number
          </label>

          <input
            type="number"
            min="0"
            name="Card Number"
            style={{
              border: "1px solid #b9b9b9",
              borderRadius: "4px",
              display: "block",
              width: "100%",
              outline: "none",
              padding: "6px",
              fontSize: "16px",
              marginRight: "40px",
              marginBottom: "30px",
              paddingLeft: "10px",
              color: "#b77b50",
              fontWeight: "bold",
              colorPlaceholder: "#6d6d6d",
            }}
            placeholder="1234 5678 9012 3456"
          />
        </div>

        <div className="form-group">
          <label
            style={{ color: "#6d6d6d", fontWeight: "bold", fontSize: "16px" }}
          >
            Name On Card
          </label>

          <input
            type="text"
            name="Name On Card"
            style={{
              border: "1px solid #b9b9b9",
              borderRadius: "4px",
              display: "block",
              width: "100%",
              outline: "none",
              padding: "6px",
              fontSize: "16px",
              marginRight: "40px",
              marginBottom: "10px",
              paddingLeft: "10px",
              color: "#b77b50",
              fontWeight: "bold",
              colorPlaceholder: "#6d6d6d",
            }}
            placeholder="John Doe"
          />
        </div>
        <table>
          <tr>
            <td>
              <input type="checkbox" name="checkbox" />
              <span
                style={{
                  paddingLeft: "10px",
                  color: "#94a5b2",
                  fontSize: "13px",
                }}
              >
                I agree to the Terms and Conditions
              </span>
            </td>
            <td>
              <span style={{ paddingLeft: "45px", fontWeight: "bold" }}>
                Total Amount: $2,625
              </span>
            </td>
          </tr>
        </table>
      </div>
      <button className="pay-btn" type="submit">
        Pay Now
      </button>
      <div className="bottom-btn-listfee">
        <button className="pre-btn" onClick={() => toggleStep(step - 1)}>
          Previous
        </button>
        <button
          className="nxt-btn"
          onClick={() => {
            toggleStep(step + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  </form>
);
export default ListingFees;
