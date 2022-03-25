import React, { useState, useEffect } from "react";
import BuyAgreement from "./BuyAgreement";
import BuyAuthorized from "./BuyAuthorized";
import BuyPayment from "./BuyPayment";

const MultiBuyForm = () => {
  const [step, setStep] = useState(0);

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

  if (step === 0) {
    return (
      <div className="buy-register-container">
        <BuyAgreement toogleStep={toogleStep} step={step} />
      </div>
    );
  } else if (step === 1) {
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
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <BuyAuthorized
          toogleStep={toogleStep}
          step={step}
          answer={answer}
          questionID={questionID}
        />
      </div>
    );
  }
};

export default MultiBuyForm;
