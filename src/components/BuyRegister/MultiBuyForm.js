import React, { useState, useEffect } from "react";
import BuyAgreement from "./BuyAgreement";
import BuyAuthorized from "./BuyAuthorized";
import BuyQuestionair from "./BuyQuestionair";
import FundUpload from "./Fund Request/FundUpload";

const MultiBuyForm = () => {
  const [step, setStep] = useState(0);

  const toogleStep = (step) => {
    setStep(step);
  };

  const [document, setDocument] = useState();
  const toogleDocument = (document) => {
    setDocument(document);
  };
  console.log(document);

  useEffect(() => {
    toogleDocument(document);
  }, [document]);

  const [questionID, setQuestionID] = useState();

  const toogleQuestionID = (questionID) => {
    setQuestionID(questionID);
  };
  const [answer, setAnswer] = useState();

  const toogleAnswer = (answer) => {
    setAnswer(answer);
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
        <FundUpload
          toogleStep={toogleStep}
          step={step}
          toogleDocument={toogleDocument}
          docu = {document}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <BuyQuestionair
          toogleStep={toogleStep}
          step={step}
          toogleAnswer={toogleAnswer}
          toogleQuestionID={toogleQuestionID}
        />
      </div>
    );
  } else if (step === 3) {
    return (
      <div className="buy-register-container">
        <BuyAuthorized
          toogleStep={toogleStep}
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
