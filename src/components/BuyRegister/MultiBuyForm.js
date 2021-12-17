import React, { useState } from "react";
import BuyAgreement from "./BuyAgreement";
import BuyUpload from "./BuyUpload";
import BuyVerify from "./BuyVerify";
import BuyAuthorized from "./BuyAuthorized";
import BuyPayment from "./BuyPayment";
import BuyConfirm from "./BuyConfirm";
import { Modal } from "react-bootstrap";

const MultiBuyForm = () => {
  const [step, setStep] = useState(0);
  const [document1, setDocument1] = useState([]);
  const toogleDocument1 = (document1) => {
    setDocument1(document1);
  };

  const [document2, setDocument2] = useState([]);
  const toogleDocument2 = (document2) => {
    setDocument2(document2);
  };

  const [document3, setDocument3] = useState([]);
  const toogleDocument3 = (document3) => {
    setDocument3(document3);
  };

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
        <BuyUpload
          toogleStep={toogleStep}
          step={step}
          toogleDocument1={toogleDocument1}
          toogleDocument2={toogleDocument2}
          toogleDocument3={toogleDocument3}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <BuyPayment toogleStep={toogleStep} step={step} />
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="buy-register-container">
        <BuyAuthorized
          toogleStep={toogleStep}
          step={step}
          document1={document1}
          document2={document2}
          document3={document3}
        />
      </div>
    );
    // } else if (step === 5) {
    //   return (
    //     <div className="buy-register-container">
    //       <BuyConfirm toogleStep={toogleStep} step={step} />
    //     </div>
    //   );
  }
};

export default MultiBuyForm;
