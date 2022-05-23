import React, { useState, useEffect } from "react";
import FundAgreement from "./FundAgreement";
import FundDocuSign from "./FundDocuSign";
import FundUpload from "./FundUpload";

function MultiFundForm() {
  const [step, setStep] = useState(0);
  const toggleStep = (step) => {
    setStep(step);
  };
  const [document, setDocument] = useState();
  const toggleDocument = (document) => {
    setDocument(document);
  };

  useEffect(() => {
    toggleDocument(document);
  }, [document]);

  if (step === 0) {
    return (
      <div className="buy-register-container">
        <FundAgreement toggleStep={toggleStep} step={step} />
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="buy-register-container">
        <FundUpload
          toggleStep={toggleStep}
          step={step}
          toggleDocument={toggleDocument}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <FundDocuSign toggleStep={toggleStep} step={step} document={document} />
      </div>
    );
  }
}

export default MultiFundForm;
