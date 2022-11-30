import React from "react";
import CarDetails from "../Cars/CarDetails";
import JetDetails from "../Jets/JetDetails";
import RealEstateDetails from "../RealEstate/RealEstateDetails";
import YachtDetails from "../Yachts/YachtDetails";
import SellHeader from "./SellHeader";
import "../../styles/sell-register.css";

const PropertyDetails = ({
  toggleStep,
  step,
  setStep,
  property,
  togglePropertyData,
  propId,
  ownership,
  getPropId,
  toggleSellStep,
  propertyData,
  toggleSignIn,
  propertyTest,
  setPropertyTest,
  setOpenSummary,
  setOpenInvest,
  setOpenLocationInfo,
  setOpenMarketInfo,
  summary,
  invest,
  locationInfo,
  marketInfo,
  setMessage,
}) => {
  return (
    <div className="wrapper">
      <SellHeader step={step} />
      <div className="sell_top_line" />
      <div className="sell-bottom">
        {propertyTest.type === "car" ? (
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
            setOpenSummary={setOpenSummary}
            setOpenInvest={setOpenInvest}
            setOpenLocationInfo={setOpenLocationInfo}
            setOpenMarketInfo={setOpenMarketInfo}
            summary={summary}
            invest={invest}
            locationInfo={locationInfo}
            marketInfo={marketInfo}
            setMessage={setMessage}
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
            setOpenSummary={setOpenSummary}
            setOpenInvest={setOpenInvest}
            setOpenLocationInfo={setOpenLocationInfo}
            setOpenMarketInfo={setOpenMarketInfo}
            summary={summary}
            invest={invest}
            locationInfo={locationInfo}
            marketInfo={marketInfo}
            setMessage={setMessage}
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
            setOpenSummary={setOpenSummary}
            setOpenInvest={setOpenInvest}
            setOpenLocationInfo={setOpenLocationInfo}
            setOpenMarketInfo={setOpenMarketInfo}
            summary={summary}
            invest={invest}
            locationInfo={locationInfo}
            marketInfo={marketInfo}
            setMessage={setMessage}
          />
        ) : propertyTest.type === "real-estate" ? (
          <RealEstateDetails
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
            setOpenSummary={setOpenSummary}
            setOpenInvest={setOpenInvest}
            setOpenLocationInfo={setOpenLocationInfo}
            setOpenMarketInfo={setOpenMarketInfo}
            summary={summary}
            invest={invest}
            locationInfo={locationInfo}
            marketInfo={marketInfo}
            setMessage={setMessage}
          />
        ) : null}
      </div>
    </div>
  );
};
export default PropertyDetails;
