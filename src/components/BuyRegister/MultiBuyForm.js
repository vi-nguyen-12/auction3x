import React, { useState, useEffect } from "react";
import BuyAgreement from "./BuyAgreement";
import BuyAuthorized from "./BuyAuthorized";
import BuyQuestionair from "./BuyQuestionair";
import FundUpload from "./Fund Request/FundUpload";

const MultiBuyForm = () => {
  const [step, setStep] = useState(1);

  const [document, setDocument] = useState();
  const toggleDocument = (document) => {
    setDocument(document);
  };

  useEffect(() => {
    toggleDocument(document);
  }, [document]);

  const [answers, setAnswers] = useState();

  if (step === 1) {
    return (
      <div className="buy-register-container">
        <BuyAgreement setStep={setStep} step={step} />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <FundUpload
          setStep={setStep}
          step={step}
          toggleDocument={toggleDocument}
          docu={document}
        />
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="buy-register-container">
        <BuyQuestionair
          setStep={setStep}
          step={step}
          setAnswers={setAnswers}
          answers={answers}
        />
      </div>
    );
  } else if (step === 4) {
    return (
      <div className="buy-register-container">
        <BuyAuthorized
          setStep={setStep}
          step={step}
          answers={answers}
          document={document}
        />
      </div>
    );
  }
};

export default MultiBuyForm;
