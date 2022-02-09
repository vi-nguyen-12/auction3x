import React, { useState, useEffect } from "react";
import BuyAgreement from "./BuyAgreement";
import BuyUpload from "./BuyUpload";
import BuyAuthorized from "./BuyAuthorized";
import BuyPayment from "./BuyPayment";

const MultiBuyForm = () => {
  const [step, setStep] = useState(0);
  const [document, setDocument] = useState();
  const toogleDocument = (document) => {
    setDocument(document);
  };

  const toogleStep = (step) => {
    setStep(step);
  };

  const [questionID, setQuestionID] = useState();

  const toogleQuestionID = (questionID) => {
    setQuestionID(questionID);
  };
  const [answer, setAnswer] = useState();

  const toogleAnswer = (answer) => {
    setAnswer(answer);
  };

  useEffect(() => {
    toogleDocument(document);
  }, [document]);

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
          toogleDocument={toogleDocument}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <BuyPayment
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
          document={document}
          answer={answer}
          questionID={questionID}
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
