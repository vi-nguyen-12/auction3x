import React from "react";
import { Container } from "react-bootstrap";
import "../../styles/sell-register.css";
import RealEstateDocus from "../RealEstate/RealEstateDocus";
import CarDocus from "../Cars/CarDocus";
import YachtDocus from "../Yachts/YachtDocus";
import JetDocus from "../Jets/JetDocus";
import SellHeader from "./SellHeader";

const DocumentsUpload = ({
  toggleStep,
  step,
  setStep,
  propertyType,
  toggleDocuments,
  ownership,
  propId,
  images,
  videos,
  propertyData,
  toggleSellStep,
  sellStep,
  getPropId,
  document,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
}) => {
  return (
    <Container className="wrapper">
      <SellHeader step={step} />
      {propertyTest.type === "real-estate" ? (
        <RealEstateDocus
          toggleStep={toggleStep}
          step={step}
          setStep={setStep}
          toggleDocuments={toggleDocuments}
          toggleSellStep={toggleSellStep}
          sellStep={sellStep}
          propertyData={propertyData}
          propId={propId}
          ownership={ownership}
          images={images}
          videos={videos}
          getPropId={getPropId}
          document={document}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
          toggleSignIn={toggleSignIn}
        />
      ) : propertyTest.type === "car" ? (
        <CarDocus
          toggleStep={toggleStep}
          step={step}
          setStep={setStep}
          toggleDocuments={toggleDocuments}
          toggleSellStep={toggleSellStep}
          sellStep={sellStep}
          propertyData={propertyData}
          propId={propId}
          ownership={ownership}
          images={images}
          videos={videos}
          getPropId={getPropId}
          document={document}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
          toggleSignIn={toggleSignIn}
        />
      ) : propertyTest.type === "jet" ? (
        <JetDocus
          toggleStep={toggleStep}
          step={step}
          setStep={setStep}
          toggleDocuments={toggleDocuments}
          toggleSellStep={toggleSellStep}
          sellStep={sellStep}
          propertyData={propertyData}
          propId={propId}
          ownership={ownership}
          images={images}
          videos={videos}
          getPropId={getPropId}
          document={document}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
          toggleSignIn={toggleSignIn}
        />
      ) : propertyTest.type === "yacht" ? (
        <YachtDocus
          toggleStep={toggleStep}
          step={step}
          setStep={setStep}
          toggleDocuments={toggleDocuments}
          toggleSellStep={toggleSellStep}
          sellStep={sellStep}
          propertyData={propertyData}
          propId={propId}
          ownership={ownership}
          images={images}
          videos={videos}
          getPropId={getPropId}
          document={document}
          propertyTest={propertyTest}
          setPropertyTest={setPropertyTest}
          toggleSignIn={toggleSignIn}
        />
      ) : null}
    </Container>
  );
};

export default DocumentsUpload;
