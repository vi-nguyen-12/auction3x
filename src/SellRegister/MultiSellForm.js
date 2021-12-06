import React, { useEffect, useState } from "react";
import AgreementForm from "./AgreementForm";
import SellWelcome from "./SellWelcome";
import UploadForm from "./UploadForm";
import ListingFees from "./ListingFees";
import "../styles/SellRegister.css";
import ListingDetails from "./ListingDetails";
import SellRegisterHeader from "./SellRegisterHeader";
import PropertyDetails from "./PropertyDetails";

const MultiSellForm = () => {
  const [step, setStep] = useState(0);
  const toogleStep = (step) => {
    setStep(step);
  };

  const [propertyData, setPropertyData] = useState({});
  const tooglePropertyData = (propertyData) => {
    setPropertyData(propertyData);
  };

  const [property, setProperty] = useState({});

  const properties = (data) => {
    setProperty(data);
  };

  const [file, setFile] = useState(null);
  const toogleFile = (file) => {
    setFile(file);
  };

  if (step === 0) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <SellWelcome toogleStep={toogleStep} step={step} test="test" />
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />

        <ListingDetails
          properties={properties}
          toogleStep={(data) => toogleStep(data)}
          step={step}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <PropertyDetails
          tooglePropertyData={tooglePropertyData}
          property={property}
          toogleStep={(data) => toogleStep(data)}
          step={step}
        />
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <UploadForm
          toogleFile={toogleFile}
          toogleStep={(data) => toogleStep(data)}
          step={step}
        />
      </div>
    );
  } else if (step === 4) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <AgreementForm
          file={file}
          propertyData={propertyData}
          toogleStep={(data) => toogleStep(data)}
          step={step}
        />
      </div>
    );
  }
};

export default MultiSellForm;
