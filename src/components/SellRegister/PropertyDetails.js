import React from "react";
import RealEstateDetails from "../RealEstate/RealEstateDetails";
import EmptyRealEstateDetails from "../RealEstate/EmptyRealEstateDetails";
import CarDetails from "../Cars/CarDetails";
import JetDetails from "../Jets/JetDetails";
import YachtDetails from "../Yachts/YachtDetails";
import SellHeader from "./SellHeader";
import "../../styles/sell-register.css";

const PropertyDetails = ({
  toogleStep,
  step,
  property,
  tooglePropertyData,
  propertyType,
  propId,
  ownership,
  getPropId,
  toogleSellStep,
  propertyData,
}) => {
  return (
    <div className="listDetail-content">
      <SellHeader step={step} />
      <div className="list-sell-bottom">
        {propertyType === "real-estate" ? (
          property.address &&
          property.structure &&
          property.market_assessments ? (
            <RealEstateDetails
              toogleStep={toogleStep}
              step={step}
              property={property}
              propertyData={propertyData}
              tooglePropertyData={tooglePropertyData}
              propId={propId}
              ownership={ownership}
              getPropId={getPropId}
              toogleSellStep={toogleSellStep}
            />
          ) : (
            <EmptyRealEstateDetails
              toogleStep={toogleStep}
              step={step}
              property={property}
              propertyData={propertyData}
              tooglePropertyData={tooglePropertyData}
              propId={propId}
              ownership={ownership}
              getPropId={getPropId}
              toogleSellStep={toogleSellStep}
            />
          )
        ) : propertyType === "car" ? (
          <CarDetails
            toogleStep={toogleStep}
            step={step}
            property={property}
            propertyData={propertyData}
            tooglePropertyData={tooglePropertyData}
            propId={propId}
            ownership={ownership}
            getPropId={getPropId}
            toogleSellStep={toogleSellStep}
          />
        ) : propertyType === "jet" ? (
          <JetDetails
            toogleStep={toogleStep}
            step={step}
            property={property}
            propertyData={propertyData}
            tooglePropertyData={tooglePropertyData}
            propId={propId}
            ownership={ownership}
            getPropId={getPropId}
            toogleSellStep={toogleSellStep}
          />
        ) : propertyType === "yacht" ? (
          <YachtDetails
            toogleStep={toogleStep}
            step={step}
            property={property}
            propertyData={propertyData}
            tooglePropertyData={tooglePropertyData}
            propId={propId}
            ownership={ownership}
            getPropId={getPropId}
            toogleSellStep={toogleSellStep}
          />
        ) : null}
      </div>
    </div>
  );
};
export default PropertyDetails;
