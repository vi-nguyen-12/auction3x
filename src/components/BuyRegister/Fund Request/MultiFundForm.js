import React, { useState, useEffect } from "react";
import FundAgreement from "./FundAgreement";
import FundDocuSign from "./FundDocuSign";
import FundUpload from "./FundUpload";

function MultiFundForm() {
  const [step, setStep] = useState(0);
  const toogleStep = (step) => {
    setStep(step);
  };
  const [document, setDocument] = useState();
  const toogleDocument = (document) => {
    setDocument(document);
  };

  useEffect(() => {
    toogleDocument(document);
  }, [document]);

  console.log(document);
  if (step === 0) {
    return (
      <div className="buy-register-container">
        <FundAgreement toogleStep={toogleStep} step={step} />
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="buy-register-container">
        <FundUpload
          toogleStep={toogleStep}
          step={step}
          toogleDocument={toogleDocument}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <FundDocuSign toogleStep={toogleStep} step={step} document={document} />
      </div>
    );
  }
}

export default MultiFundForm;
