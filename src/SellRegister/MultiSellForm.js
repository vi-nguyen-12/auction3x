import React, { useEffect, useState } from "react";
import AgreementForm from "./AgreementForm";
import SellWelcome from "./SellWelcome";
import UploadForm from "./UploadForm";
import DocumentVerification from "./DocumentVerification";
import VerifiedDocs from "./VerifiedDocs";
import ListingFees from "./ListingFees";
import "../styles/SellRegister.css";
import ListingDetails from "./ListingDetails";
import SellRegisterHeader from "./SellRegisterHeader";

const MultiSellForm = () => {
  const [step, setStep] = useState(0);
  const toogleStep = (stepp) => setStep(stepp);

  if (step === 0) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <SellWelcome toogleStep={(data) => toogleStep(data)} step={step} />
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />

        <UploadForm toogleStep={(data) => toogleStep(data)} step={step} />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <DocumentVerification
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
        <VerifiedDocs toogleStep={(data) => toogleStep(data)} step={step} />
      </div>
    );
  } else if (step === 4) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <AgreementForm toogleStep={(data) => toogleStep(data)} step={step} />
      </div>
    );
  } else if (step === 5) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <ListingFees toogleStep={(data) => toogleStep(data)} step={step} />
      </div>
    );
  } else if (step === 6) {
    return (
      <div className="sell-register-container">
        <h1>Sell On Auction10X</h1>
        <SellRegisterHeader />
        <ListingDetails toogleStep={(data) => toogleStep(data)} step={step} />
      </div>
    );
  }
};

export default MultiSellForm;