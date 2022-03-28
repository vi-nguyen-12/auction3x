import React from "react";
import { Row, Container } from "react-bootstrap";
import "../../styles/SellRegister.css";
import RealEstateDocus from "../RealEstate/RealEstateDocus";
import CarDocus from "../Cars/CarDocus";
import YachtDocus from "../Yachts/YachtDocus";
import JetDocus from "../Jets/JetDocus";

const DocumentsUpload = ({
  toogleStep,
  step,
  propertyType,
  toogleDocuments,
  ownership,
}) => {
  return (
    <Container className="upload-box-docu">
      <Row className="sell-top">
        <div className="circle-1">
          <p className="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div className="line-1"></div>
        <div className="circle-2">
          <p className="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div className="line-2"></div>
        <div className="circle-3">
          <p className="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div className="line-3"></div>
        <div className="circle-4">
          <p className="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">05</p>
          <span className="spnn">Agreement</span>
        </div>
        {/* <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div> */}
      </Row>
      {propertyType === "real-estate" ? (
        <RealEstateDocus
          toogleStep={toogleStep}
          step={step}
          toogleDocuments={toogleDocuments}
          ownership={ownership}
        />
      ) : propertyType === "car" ? (
        <CarDocus
          toogleStep={toogleStep}
          step={step}
          toogleDocuments={toogleDocuments}
          ownership={ownership}
        />
      ) : propertyType === "jet" ? (
        <JetDocus
          toogleStep={toogleStep}
          step={step}
          toogleDocuments={toogleDocuments}
          ownership={ownership}
        />
      ) : propertyType === "yacht" ? (
        <YachtDocus
          toogleStep={toogleStep}
          step={step}
          toogleDocuments={toogleDocuments}
          ownership={ownership}
        />
      ) : null}
    </Container>
  );
};

export default DocumentsUpload;
