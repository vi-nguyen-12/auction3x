import React from "react";

const DocumentVerification = ({ toogleStep, step }) => {
  return (
    <form className="verification-box">
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
        </div>
      </div>
      <div className="sell-bottom">
        <div className="title mt-3">
          <h3 style = {{color:"#6d6d6d", fontWeight:"bold"}}>DOCUMENT UNDER VERIFICATION</h3>
          <p style = {{color:"#6d6d6d"}}>sdfshdfh auihdasd auhdha auhda</p>
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
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default DocumentVerification;