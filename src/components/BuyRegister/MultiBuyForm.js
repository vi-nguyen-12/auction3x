import React, { useState, useEffect } from "react";
import BuyAgreement from "./BuyAgreement";
import BuyAuthorized from "./BuyAuthorized";
import BuyQuestionair from "./BuyQuestionair";
import FundUpload from "./Fund Request/FundUpload";

const MultiBuyForm = () => {
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

  const [questionID, setQuestionID] = useState();

  const toggleQuestionID = (questionID) => {
    setQuestionID(questionID);
  };
  const [answer, setAnswer] = useState();

  const toggleAnswer = (answer) => {
    setAnswer(answer);
  };

  if (step === 0) {
    return (
      <div className="buy-register-container">
        <BuyAgreement toggleStep={toggleStep} step={step} />
      </div>
    );
  } else if (step === 1) {
    return (
      <div className="buy-register-container">
        <FundUpload
          toggleStep={toggleStep}
          step={step}
          toggleDocument={toggleDocument}
          docu={document}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <BuyQuestionair
          toggleStep={toggleStep}
          step={step}
          toggleAnswer={toggleAnswer}
          toggleQuestionID={toggleQuestionID}
        />
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="buy-register-container">
        <BuyAuthorized
          toggleStep={toggleStep}
          step={step}
          answer={answer}
          questionID={questionID}
          document={document}
        />
      </div>
    );
  }
};

export default MultiBuyForm;
