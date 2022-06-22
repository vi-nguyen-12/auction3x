import React from "react";
import RealEstateDetails from "../RealEstate/RealEstateDetails";
import EmptyRealEstateDetails from "../RealEstate/EmptyRealEstateDetails";
import CarDetails from "../Cars/CarDetails";
import JetDetails from "../Jets/JetDetails";
import YachtDetails from "../Yachts/YachtDetails";
import SellHeader from "./SellHeader";
import "../../styles/sell-register.css";

const PropertyDetails = ({
  toggleStep,
  step,
  setStep,
  property,
  togglePropertyData,
  propertyType,
  propId,
  ownership,
  getPropId,
  toggleSellStep,
  propertyData,
  toggleSignIn,
  propertyTest,
  setPropertyTest,
}) => {
  return (
    <div className="wrapper">
      <SellHeader step={step} />
      <div className="sell-bottom">
        {propertyTest.type === "real-estate" ? (
          property.address &&
          property.structure &&
          property.market_assessments ? (
            <RealEstateDetails
              toggleStep={toggleStep}
              step={step}
              property={property}
              propertyData={propertyData}
              togglePropertyData={togglePropertyData}
              propId={propId}
              ownership={ownership}
              getPropId={getPropId}
              toggleSellStep={toggleSellStep}
            />
          ) : (
            <EmptyRealEstateDetails
              toggleStep={toggleStep}
              step={step}
              setStep={setStep}
              property={property}
              propertyData={propertyData}
              togglePropertyData={togglePropertyData}
              propId={propId}
              ownership={ownership}
              getPropId={getPropId}
              toggleSellStep={toggleSellStep}
              propertyTest={propertyTest}
              setPropertyTest={setPropertyTest}
            />
          )
        ) : propertyTest.type === "car" ? (
          <CarDetails
            toggleStep={toggleStep}
            step={step}
            setStep={setStep}
            property={property}
            propertyData={propertyData}
            togglePropertyData={togglePropertyData}
            propId={propId}
            ownership={ownership}
            getPropId={getPropId}
            toggleSellStep={toggleSellStep}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
            toggleSignIn={toggleSignIn}
          />
        ) : propertyTest.type === "jet" ? (
          <JetDetails
            toggleStep={toggleStep}
            step={step}
            setStep={setStep}
            property={property}
            propertyData={propertyData}
            togglePropertyData={togglePropertyData}
            propId={propId}
            ownership={ownership}
            getPropId={getPropId}
            toggleSellStep={toggleSellStep}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
            toggleSignIn={toggleSignIn}
          />
        ) : propertyTest.type === "yacht" ? (
          <YachtDetails
            toggleStep={toggleStep}
            step={step}
            setStep={setStep}
            property={property}
            propertyData={propertyData}
            togglePropertyData={togglePropertyData}
            propId={propId}
            ownership={ownership}
            getPropId={getPropId}
            toggleSellStep={toggleSellStep}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
            toggleSignIn={toggleSignIn}
          />
        ) : null}
      </div>
    </div>
  );
};
export default PropertyDetails;
