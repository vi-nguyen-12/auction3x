import React from "react";
import ReactDOM from "react-dom";
// create step bar

const Sell = ({ toogleStep, step }) => {
  console.log(step, "step2");
  return (
    <form className="box-content">
      <div className="sell-top">
        <div class="circle-1">
          <p class="text">01</p>
          <span className = "spnn">Select Catagory</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">02</p>
          <span className = "spnn">Upload Documents</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">03</p>
          <span className = "spnn">Approval</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">04</p>
          <span className = "spnn">Agreement</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">05</p>
          <span className = "spnn">Listing Fees</span>
        </div>{" "}
        <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className = "spnn">Listing Details</span>
        </div>{" "}
      </div>
      <div className="sell-bottom">
        <div className="title mt-3">
          <h3 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
            SELECT WHAT YOU WANT TO SELL
          </h3>
          <p style={{ color: "#6d6d6d" }}>sdfshdfh auihdasd auhdha auhda</p>
        </div>
        <div className="sell-form">
          <tr>
            <td className="choice-table-1">
              <div className="sell-1">
                <input type="radio" name="sell" />
                <label>Real Estate</label>
              </div>

              <div className="sell-1">
                <input type="radio" name="sell" value=" 1" />
                <label>Yachts</label>
              </div>

              <div className="sell-1">
                <input type="radio" name="sell" value="1" />
                <label>Jewels</label>
              </div>
            </td>

            <td className="choice-table-2">
              <div className="sell-2">
                <input type="radio" name="sell" value="1" />
                <label>Cars</label>
              </div>
              <div className="sell-2">
                <input type="radio" name="sell" value="1" />
                <label>Jets</label>
              </div>
              <div className="sell-2">
                <input type="radio" name="sell" value="1" />
                <label>Motorcycles</label>
              </div>
            </td>

            <td className="choice-table-3">
              <div className="sell-3">
                <input type="radio" name="sell" value="1" />
                <label>Collectible</label>
              </div>
              <div className="sell-3">
                <input type="radio" name="sell" value="1" />
                <label>Helicopters</label>
              </div>
              <div className="sell-3">
                <input type="radio" name="sell" value="1" />
                <label>Watches</label>
              </div>
            </td>
          </tr>
        </div>

        <div className="bottom-btn">
          <button className="pre-btn" onClick={null}>
            Previous
          </button>
          <span> </span>
          <button
            className="nxt-btn"
            onClick={() => {
              toogleStep(step + 1);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default Sell;