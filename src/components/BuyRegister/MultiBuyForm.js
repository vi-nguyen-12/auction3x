import React, { useState } from "react";
import BuyAgreement from "./BuyAgreement";
import BuyUpload from "./BuyUpload";
import BuyVerify from "./BuyVerify";
import BuyAuthorized from "./BuyAuthorized";
import BuyPayment from "./BuyPayment";
import BuyConfirm from "./BuyConfirm";

const MultiBuyForm = () => {
  const [step, setStep] = useState(0);
  const toogleStep = (step) => {
    setStep(step);
  };

  if (step === 0) {
    return (
      <div className="buy-register-container">
        <BuyAgreement toogleStep={toogleStep} step={step} />
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="buy-register-container">
        <BuyUpload toogleStep={toogleStep} step={step} />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <BuyVerify toogleStep={toogleStep} step={step} />
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="buy-register-container">
        <BuyAuthorized toogleStep={toogleStep} step={step} />
      </div>
    );
  } else if (step === 4) {
    return (
      <div className="buy-register-container">
        <BuyPayment toogleStep={toogleStep} step={step} />
      </div>
    );
  } else if (step === 5) {
    return (
      <div className="buy-register-container">
        <BuyConfirm toogleStep={toogleStep} step={step} />
      </div>
    );
  }
};

export default MultiBuyForm;
