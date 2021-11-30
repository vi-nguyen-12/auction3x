import React from "react";


const UploadForm = ({ toogleStep, step }) => {
  return (
    <form className="upload-box">
      <div className="sell-top">
        <div class="circle-1">
          <p class="text">01</p>
          <span className = "spnn">Select Catagory</span>
        </div>
        <div class="line-1"></div>
        <div class="circle-2">
          <p class="text">02</p>
          <span className = "spnn">Upload Documents</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">03</p>
          <span className = "spnn">Approval</span>
        </div>

        <div class="line"></div>
        <div class="circle">
          <p class="text">04</p>
          <span className = "spnn">Agreement</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">05</p>
          <span className = "spnn">Listing Fees</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className = "spnn">Listing Details</span>
        </div>
      </div>
      <div className="sell-bottom">
        <div className="listDetails-title">
          <h2 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
            UPLOAD DOCUMENTS
          </h2>
          <p>shdcb sdhb sdhc sdbchsdbch </p>
        </div>
        <div className="input-form-1">
          Choose the Image Files
          <input
            accept="image/*"
            type="file"
            id="files"
            name="files"
            multiple
          />
        </div>
        <div className="input-form-2">
          Choose the Videos Files
          <input
            accept="video/*"
            type="file"
            id="files"
            name="files"
            multiple
          />
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

export default UploadForm;