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
}) => {
  return (
    <div className="listDetail-content">
      <SellHeader step={step} />
      {propertyType === "real-estate" ? (
        <RealEstateForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
        />
      ) : propertyType === "car" ? (
        <CarForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
        />
      ) : propertyType === "jet" ? (
        <JetForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
        />
      ) : propertyType === "yacht" ? (
        <YachtForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
        />
      ) : null}
    </div>
  );
};
export default ListingDetails;
