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
}) => {
  return (
    <Container className="wrapper">
      <SellHeader step={step} />
      {propertyType === "real-estate" ? (
        <RealEstateDocus
          toggleStep={toggleStep}
          step={step}
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
        />
      ) : propertyType === "car" ? (
        <CarDocus
          toggleStep={toggleStep}
          step={step}
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
        />
      ) : propertyType === "jet" ? (
        <JetDocus
          toggleStep={toggleStep}
          step={step}
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
        />
      ) : propertyType === "yacht" ? (
        <YachtDocus
          toggleStep={toggleStep}
          step={step}
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
        />
      ) : null}
    </Container>
  );
};

export default DocumentsUpload;
