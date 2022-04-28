import React, { useEffect, useState } from "react";
import AgreementForm from "./AgreementForm";
import SellWelcome from "./SellWelcome";
import UploadForm from "./UploadForm";
import "../../styles/SellRegister.css";
import ListingDetails from "./ListingDetails";
import PropertyDetails from "./PropertyDetails";
import DocumentsUpload from "./DocumentsUpload";
import Ownership from "./Ownership";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";

const MultiSellForm = ({ toogleShow, colorChange, bodyColorChange }) => {
  const [step, setStep] = useState(0);
  const toogleStep = (step) => {
    setStep(step);
  };

  const params = useParams();

  const [propertyData, setPropertyData] = useState({});
  const tooglePropertyData = (propertyData) => {
    setPropertyData(propertyData);
  };

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

  const [propertyType, setPropertyType] = useState();
  const tooglePropertyType = (prop) => {
    setPropertyType(prop);
  };

  const [ownership, setOwnership] = useState();
  const getOwnerShip = (ownership) => {
    setOwnership(ownership);
  };

  const [propId, setPropId] = useState();
  const getPropId = (propId) => {
    setPropId(propId);
  };

  const [sellStep, setSellStep] = useState(0);
  const toogleSellStep = (sellStep) => setSellStep(sellStep);

  useEffect(() => {
    colorChange("black");
    bodyColorChange("#ffefe3");
    toogleShow();
    if (params.step) {
      setStep(parseInt(params.step) + 1);
    }
    if (params.id) {
      authService.getIncompleteProperty(params.userId).then((res) => {
        const property = res.data.filter((prop) => prop._id === params.id);
        setPropertyType(property[0].type);
      });
    }
  }, [params.step]);

  if (step === 0) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction3</h1>
        <SellWelcome
          tooglePropertyType={tooglePropertyType}
          toogleStep={toogleStep}
          step={step}
        />
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction3</h1>
        <Ownership
          toogleStep={toogleStep}
          step={step}
          getOwnerShip={getOwnerShip}
          propertyType={propertyType}
          getPropId={getPropId}
          toogleSellStep={toogleSellStep}
          ownership={ownership}
          propId={propId}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction3</h1>

        <ListingDetails
          properties={properties}
          toogleStep={(data) => toogleStep(data)}
          step={step}
          propertyType={propertyType}
          property={property}
        />
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction3</h1>

        <PropertyDetails
          tooglePropertyData={tooglePropertyData}
          property={property}
          toogleStep={(data) => toogleStep(data)}
          step={step}
          propertyType={propertyType}
          propId={propId}
          ownership={ownership}
          getPropId={getPropId}
          toogleSellStep={toogleSellStep}
          propertyData={propertyData}
        />
      </div>
    );
  } else if (step === 4) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction3</h1>
        <UploadForm
          toogleImages={toogleImages}
          toogleVideos={toogleVideos}
          toogleStep={(data) => toogleStep(data)}
          step={step}
          toogleSellStep={toogleSellStep}
          sellStep={sellStep}
          propertyData={propertyData}
          propId={propId}
          ownership={ownership}
          getPropId={getPropId}
          propertyType={propertyType}
          image={images}
          video={videos}
        />
      </div>
    );
  } else if (step === 5) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction3</h1>
        <DocumentsUpload
          toogleStep={(data) => toogleStep(data)}
          step={step}
          toogleDocuments={toogleDocuments}
          propertyType={propertyType}
          toogleSellStep={toogleSellStep}
          sellStep={sellStep}
          propertyData={propertyData}
          propId={propId}
          ownership={ownership}
          images={images}
          videos={videos}
          getPropId={getPropId}
          document={documents}
        />
      </div>
    );
    // } else if (step === 5) {
    //   return (
    //     <div className="sell-register-container">
    //       <h1>Sell On Auction3</h1>

    //       <ListingFees toogleStep={toogleStep} step={step} test="test" />
    //     </div>
    //   );
  } else if (step === 6) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction3</h1>

        <AgreementForm
          propertyData={propertyData}
          toogleStep={(data) => toogleStep(data)}
          step={step}
          images={images}
          videos={videos}
          documents={documents}
          ownership={ownership}
          sellStep={sellStep}
          propId={propId}
          propertyType={propertyType}
        />
      </div>
    );
  }
};

export default MultiSellForm;
