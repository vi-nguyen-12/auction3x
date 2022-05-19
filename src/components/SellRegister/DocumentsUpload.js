import React from "react";
import { Row, Container } from "react-bootstrap";
import "../../styles/sell-register.css";
import RealEstateDocus from "../RealEstate/RealEstateDocus";
import CarDocus from "../Cars/CarDocus";
import YachtDocus from "../Yachts/YachtDocus";
import JetDocus from "../Jets/JetDocus";
import SellHeader from "./SellHeader";

const DocumentsUpload = ({
  toogleStep,
  step,
  propertyType,
  toogleDocuments,
  ownership,
  propId,
  images,
  videos,
  propertyData,
  toogleSellStep,
  sellStep,
  getPropId,
  document,
}) => {
  return (
    <Container className="upload-box-docu">
      <SellHeader step={step} />
      {propertyType === "real-estate" ? (
        <RealEstateDocus
          toogleStep={toogleStep}
          step={step}
          toogleDocuments={toogleDocuments}
          toogleSellStep={toogleSellStep}
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
          toogleStep={toogleStep}
          step={step}
          toogleDocuments={toogleDocuments}
          toogleSellStep={toogleSellStep}
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
          toogleStep={toogleStep}
          step={step}
          toogleDocuments={toogleDocuments}
          toogleSellStep={toogleSellStep}
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
          toogleStep={toogleStep}
          step={step}
          toogleDocuments={toogleDocuments}
          toogleSellStep={toogleSellStep}
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
