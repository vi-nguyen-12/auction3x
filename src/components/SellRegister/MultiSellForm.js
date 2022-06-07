import React, { useEffect, useState } from "react";
import AgreementForm from "./AgreementForm";
import SellWelcome from "./SellWelcome";
import UploadForm from "./UploadForm";
import "../../styles/sell-register.css";
import ListingDetails from "./ListingDetails";
import PropertyDetails from "./PropertyDetails";

import Ownership from "./Ownership";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { Container, Row } from "react-bootstrap";
import DocumentsUpload from "./DocumentsUpload";

const MultiSellForm = ({
  toggleShow,
  colorChange,
  bodyColorChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  windowSize,
}) => {
  const [step, setStep] = useState(0);
  const toggleStep = (step) => {
    setStep(step);
  };

  const params = useParams();

  const [propertyData, setPropertyData] = useState({});
  const togglePropertyData = (propertyData) => {
    setPropertyData(propertyData);
  };

  const [property, setProperty] = useState({});
  const properties = (property) => {
    setProperty(property);
  };

  const [documents, setDocuments] = useState([]);
  const toggleDocuments = (documents) => {
    setDocuments(documents);
  };

  const [images, setImages] = useState([]);
  const toggleImages = (images) => {
    setImages(images);
  };

  const [videos, setVideos] = useState([]);
  const toggleVideos = (videos) => {
    setVideos(videos);
  };

  const [propertyType, setPropertyType] = useState();
  const togglePropertyType = (prop) => {
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
  const toggleSellStep = (sellStep) => setSellStep(sellStep);
  useEffect(() => {
    setHeaderWidth("100vw");
    setPositionLeft("20%");
    setPadRight("3rem");
    colorChange("black");
    bodyColorChange("#ffefe3");
    toggleShow();
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
  return (
    <Container className="vh-100">
      <h1>Sell On Auction3</h1>
      {step === 0 ? (
        <SellWelcome
          togglePropertyType={togglePropertyType}
          toggleStep={toggleStep}
          windowSize={windowSize}
          step={step}
        />
      ) : step === 1 ? (
        <Ownership
          toggleStep={toggleStep}
          step={step}
          getOwnerShip={getOwnerShip}
          propertyType={propertyType}
          getPropId={getPropId}
          toggleSellStep={toggleSellStep}
          ownership={ownership}
          propId={propId}
        />
      ) : step === 2 ? (
        <ListingDetails
          properties={properties}
          toggleStep={(data) => toggleStep(data)}
          step={step}
          propertyType={propertyType}
          property={property}
        />
      ) : step === 3 ? (
        <PropertyDetails
          togglePropertyData={togglePropertyData}
          property={property}
          toggleStep={(data) => toggleStep(data)}
          step={step}
          propertyType={propertyType}
          propId={propId}
          ownership={ownership}
          getPropId={getPropId}
          toggleSellStep={toggleSellStep}
          propertyData={propertyData}
        />
      ) : step === 4 ? (
        <UploadForm
          toggleImages={toggleImages}
          toggleVideos={toggleVideos}
          toggleStep={(data) => toggleStep(data)}
          step={step}
          toggleSellStep={toggleSellStep}
          sellStep={sellStep}
          propertyData={propertyData}
          propId={propId}
          ownership={ownership}
          getPropId={getPropId}
          propertyType={propertyType}
          image={images}
          video={videos}
        />
      ) : step === 5 ? (
        <DocumentsUpload
          toggleStep={(data) => toggleStep(data)}
          step={step}
          propertyType={propertyType}
          toggleDocuments={toggleDocuments}
          ownership={ownership}
          propId={propId}
          images={images}
          videos={videos}
          propertyData={propertyData}
          toggleSellStep={toggleSellStep}
          sellStep={sellStep}
          getPropId={getPropId}
          document={documents}
        />
      ) : step === 6 ? (
        <AgreementForm
          propertyData={propertyData}
          toggleStep={(data) => toggleStep(data)}
          step={step}
          images={images}
          videos={videos}
          documents={documents}
          ownership={ownership}
          sellStep={sellStep}
          propId={propId}
          propertyType={propertyType}
        />
      ) : null}
    </Container>
  );
};

export default MultiSellForm;
