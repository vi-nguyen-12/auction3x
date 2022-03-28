import React from "react";
import RealEstateDetails from "../RealEstate/RealEstateDetails";
import EmptyRealEstateDetails from "../RealEstate/EmptyRealEstateDetails";
import CarDetails from "../Cars/CarDetails";
import JetDetails from "../Jets/JetDetails";
import YachtDetails from "../Yachts/YachtDetails";
import "../../styles/SellRegister.css";

const PropertyDetails = ({
  toogleStep,
  step,
  property,
  tooglePropertyData,
  propertyType,
  propId,
  ownership,
}) => {
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
        <div className="line-2"></div>
        <div className="circle-3">
          <p className="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">04</p>
          <span className="spnn">Upload Pictures/Videos</span>
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
        {propertyType === "real-estate" ? (
          property.address &&
          property.structure &&
          property.market_assessments ? (
            <RealEstateDetails
              toogleStep={toogleStep}
              step={step}
              property={property}
              tooglePropertyData={tooglePropertyData}
              propId={propId}
              ownership={ownership}
              propertyType={propertyType}
            />
          ) : (
            <EmptyRealEstateDetails
              toogleStep={toogleStep}
              step={step}
              property={property}
              tooglePropertyData={tooglePropertyData}
              propId={propId}
              ownership={ownership}
              propertyType={propertyType}
            />
          )
        ) : propertyType === "car" ? (
          <CarDetails
            toogleStep={toogleStep}
            step={step}
            property={property}
            tooglePropertyData={tooglePropertyData}
            propId={propId}
            ownership={ownership}
            propertyType={propertyType}
          />
        ) : propertyType === "jet" ? (
          <JetDetails
            toogleStep={toogleStep}
            step={step}
            property={property}
            tooglePropertyData={tooglePropertyData}
            propId={propId}
            ownership={ownership}
            propertyType={propertyType}
          />
        ) : propertyType === "yacht" ? (
          <YachtDetails
            toogleStep={toogleStep}
            step={step}
            property={property}
            tooglePropertyData={tooglePropertyData}
            propId={propId}
            ownership={ownership}
            propertyType={propertyType}
          />
        ) : null}
      </div>
    </div>
  );
};
export default PropertyDetails;
