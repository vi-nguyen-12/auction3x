import React, { useEffect, useState } from "react";
import AgreementForm from "./AgreementForm";
import SellWelcome from "./SellWelcome";
import UploadForm from "./UploadForm";
import "../../styles/sell-register.css";
import PropertyDetails from "./PropertyDetails";

import Ownership from "./Ownership";
import authService from "../../services/authServices";
import { useParams, useHistory } from "react-router-dom";
import { Container } from "react-bootstrap";
import DocumentsUpload from "./DocumentsUpload";
import RealEstateForm from "../RealEstate/RealEstateForm";

const MultiSellForm = ({
  toggleShow,
  colorChange,
  bodyColorChange,
  setHeaderWidth,
  setPositionLeft,
  setPadRight,
  windowSize,
  toggleSignIn,
}) => {
  const [step, setStep] = useState(0);
  const toggleStep = (step) => {
    setStep(step);
  };

  const params = useParams();
  const history = useHistory();
  const [propertyTest, setPropertyTest] = useState({});
  const [property, setProperty] = useState({});
  const [propertyData, setPropertyData] = useState({});
  const togglePropertyData = (propertyData) => {
    setPropertyData(propertyData);
  };
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
    console.log(params.id);
    if (params.id) {
      authService
        .getProperty(params.id)
        .then((response) => {
          setPropertyTest(response.data);
          setStep(response.data.step);
        })
        .catch((error) => {
          if (error.message === "jwt expired") {
            history.push("/");
          }
        });
    }
  }, []);
  console.log(step);
  console.log(propertyTest);
  return (
    <Container className="vh-100">
      <h1 className="fs-1">Sell On Auction3</h1>
      {step === 0 ? (
        <SellWelcome
          togglePropertyType={togglePropertyType}
          toggleStep={toggleStep}
          windowSize={windowSize}
          step={step}
          setStep={setStep}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
          toggleSignIn={toggleSignIn}
        />
      ) : step === 1 ? (
        <Ownership
          toggleStep={toggleStep}
          step={step}
          setStep={setStep}
          getOwnerShip={getOwnerShip}
          propertyType={propertyType}
          getPropId={getPropId}
          toggleSellStep={toggleSellStep}
          ownership={ownership}
          propId={propId}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
          toggleSignIn={toggleSignIn}
        />
      ) : step === 2 ? (
        propertyTest.type === "real-estate" ? (
          <RealEstateForm
            properties={properties}
            toggleStep={(data) => toggleStep(data)}
            step={step}
            setStep={setStep}
            propertyType={propertyType}
            property={property}
            windowSize={windowSize}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
            toggleSignIn={toggleSignIn}
          />
        ) : (
          <PropertyDetails
            togglePropertyData={togglePropertyData}
            property={property}
            toggleStep={(data) => toggleStep(data)}
            step={step}
            setStep={setStep}
            propertyType={propertyType}
            propId={propId}
            ownership={ownership}
            getPropId={getPropId}
            toggleSellStep={toggleSellStep}
            propertyData={propertyData}
            propertyTest={propertyTest}
            setPropertyTest={setPropertyTest}
            toggleSignIn={toggleSignIn}
          />
        )
      ) : step === 3 ? (
        <UploadForm
          toggleImages={toggleImages}
          toggleVideos={toggleVideos}
          toggleStep={(data) => toggleStep(data)}
          step={step}
          setStep={setStep}
          toggleSellStep={toggleSellStep}
          sellStep={sellStep}
          propertyData={propertyData}
          propId={propId}
          ownership={ownership}
          getPropId={getPropId}
          propertyType={propertyType}
          image={images}
          video={videos}
          toggleSignIn={toggleSignIn}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
        />
      ) : step === 4 ? (
        <DocumentsUpload
          toggleStep={(data) => toggleStep(data)}
          step={step}
          setStep={setStep}
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
          toggleSignIn={toggleSignIn}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
        />
      ) : step === 5 ? (
        <AgreementForm
          propertyData={propertyData}
          toggleStep={(data) => toggleStep(data)}
          step={step}
          setStep={setStep}
          images={images}
          videos={videos}
          documents={documents}
          ownership={ownership}
          sellStep={sellStep}
          propId={propId}
          propertyType={propertyType}
          toggleSignIn={toggleSignIn}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
        />
      ) : null}
    </Container>
  );
};

export default MultiSellForm;
