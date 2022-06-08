import React from "react";
import RealEstateForm from "../RealEstate/RealEstateForm";
import CarForm from "../Cars/CarForm";
import JetForm from "../Jets/JetForm";
import YachtForm from "../Yachts/YachtForm";
import SellHeader from "./SellHeader";

const ListingDetails = ({
  toggleStep,
  step,
  properties,
  propertyType,
  property,
  windowSize,
}) => {
  return (
    <div className="wrapper">
      <SellHeader step={step} />
      {propertyType === "real-estate" ? (
        <RealEstateForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
          windowSize={windowSize}
        />
      ) : propertyType === "car" ? (
        <CarForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
          windowSize={windowSize}
        />
      ) : propertyType === "jet" ? (
        <JetForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
          windowSize={windowSize}
        />
      ) : propertyType === "yacht" ? (
        <YachtForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
          windowSize={windowSize}
        />
      ) : null}
    </div>
  );
};
export default ListingDetails;
