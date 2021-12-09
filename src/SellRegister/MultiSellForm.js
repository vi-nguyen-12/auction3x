import React, { useEffect, useState } from "react";
import AgreementForm from "./AgreementForm";
import SellWelcome from "./SellWelcome";
import UploadForm from "./UploadForm";
import ListingFees from "./ListingFees";
import "../styles/SellRegister.css";
import ListingDetails from "./ListingDetails";
import SellRegisterHeader from "./SellRegisterHeader";
import PropertyDetails from "./PropertyDetails";
import DocumentsUpload from "./DocumentsUpload";

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

  const [documents, setDocuments] = useState([]);
  const toogleDocuments = (documents) => {
    setDocuments(documents);
  };

  const [images, setImages] = useState([]);
  const toogleImages = (images) => {
    setImages(images);
  };

  const [videos, setVideos] = useState([]);
  const toogleVideos = (videos) => {
    setVideos(videos);
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
          toogleImages={toogleImages}
          toogleVideos={toogleVideos}
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
        <DocumentsUpload
          propertyData={propertyData}
          toogleStep={(data) => toogleStep(data)}
          step={step}
          toogleDocuments={toogleDocuments}
        />
      </div>
    );
  } else if (step === 5) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <ListingFees toogleStep={toogleStep} step={step} test="test" />
      </div>
    );
  } else if (step === 6) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <AgreementForm
          propertyData={propertyData}
          toogleStep={(data) => toogleStep(data)}
          step={step}
          images={images}
          videos={videos}
          documents={documents}
        />
      </div>
    );
  }
};

export default MultiSellForm;
