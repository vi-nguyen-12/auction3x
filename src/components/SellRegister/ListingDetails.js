import React from "react";
import RealEstateForm from "../RealEstate/RealEstateForm";
import CarForm from "../Cars/CarForm";
import JetForm from "../Jets/JetForm";
import YachtForm from "../Yachts/YachtForm";

const ListingDetails = ({ toogleStep, step, properties, propertyType }) => {
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
      {propertyType === "real-estate" ? (
        <RealEstateForm
          toogleStep={toogleStep}
          step={step}
          properties={properties}
        />
      ) : propertyType === "car" ? (
        <CarForm toogleStep={toogleStep} step={step} properties={properties} />
      ) : propertyType === "jet" ? (
        <JetForm toogleStep={toogleStep} step={step} properties={properties} />
      ) : propertyType === "yacht" ? (
        <YachtForm
          toogleStep={toogleStep}
          step={step}
          properties={properties}
        />
      ) : null}
    </div>
  );
};
export default ListingDetails;
