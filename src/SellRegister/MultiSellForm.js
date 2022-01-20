import React, { useEffect, useState } from "react";
import AgreementForm from "./AgreementForm";
import SellWelcome from "./SellWelcome";
import UploadForm from "./UploadForm";
import ListingFees from "./ListingFees";
import "../styles/SellRegister.css";
import ListingDetails from "./ListingDetails";
import PropertyDetails from "./PropertyDetails";
import DocumentsUpload from "./DocumentsUpload";

const MultiSellForm = ({ colorChange }) => {

  useEffect(() => {
  colorChange("black");
  }, []);
  
  const [step, setStep] = useState(0);
  const toogleStep = (step) => {
    setStep(step);
  };

  const [propertyData, setPropertyData] = useState({});
  const tooglePropertyData = (propertyData) => {
    setPropertyData(propertyData);
  };

  console.log(propertyData);

  const [property, setProperty] = useState({});
  const properties = (property) => {
    setProperty(property);
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
        <SellWelcome toogleStep={toogleStep} step={step} test="test" />
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>

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

        <DocumentsUpload
          propertyData={propertyData}
          toogleStep={(data) => toogleStep(data)}
          step={step}
          toogleDocuments={toogleDocuments}
        />
      </div>
    );
    // } else if (step === 5) {
    //   return (
    //     <div className="sell-register-container">
    //       <h1>Sell On Auction10X</h1>

    //       <ListingFees toogleStep={toogleStep} step={step} test="test" />
    //     </div>
    //   );
  } else if (step === 5) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>

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
