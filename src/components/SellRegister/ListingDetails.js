import React from "react";
import RealEstateForm from "../RealEstate/RealEstateForm";
import CarForm from "../Cars/CarForm";
import JetForm from "../Jets/JetForm";
import YachtForm from "../Yachts/YachtForm";
import SellHeader from "./SellHeader";

const ListingDetails = ({
  toggleStep,
  step,
  setStep,
  properties,
  propertyType,
  property,
  windowSize,
  propertyTest,
  setPropertyTest,
}) => {
  return (
    <div className="wrapper">
      <SellHeader step={step} />
      <RealEstateForm />

      {/* {propertyTest.type === "real-estate" ? (
        <RealEstateForm
          toggleStep={toggleStep}
          step={step}
          setStep={setStep}
          properties={properties}
          property={property}
          windowSize={windowSize}
          propertyTest
          setPropertyTest
        />
      ) : propertyTest.typetyType === "car" ? (
        <CarForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
          windowSize={windowSize}
        />
      ) : propertyTest.type === "jet" ? (
        <JetForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
          windowSize={windowSize}
        />
      ) : propertyTest.type === "yacht" ? (
        <YachtForm
          toggleStep={toggleStep}
          step={step}
          properties={properties}
          property={property}
          windowSize={windowSize}
        />
      ) : null} */}
    </div>
  );
};
export default ListingDetails;
