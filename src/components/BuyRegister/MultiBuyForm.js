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

  const [document4, setDocument4] = useState([]);
  const toogleDocument4 = (document4) => {
    setDocument4(document4);
  };

  const toogleStep = (step) => {
    setStep(step);
  };

  const [question1ID, setQuestion1ID] = useState();
  const [question2ID, setQuestion2ID] = useState();
  const [question3ID, setQuestion3ID] = useState();
  const [question4ID, setQuestion4ID] = useState();
  const [question5ID, setQuestion5ID] = useState();

  const toogleQuestion1ID = (question1ID) => {
    setQuestion1ID(question1ID);
  };

  const toogleQuestion2ID = (question2ID) => {
    setQuestion2ID(question2ID);
  };

  const toogleQuestion3ID = (question3ID) => {
    setQuestion3ID(question3ID);
  };

  const toogleQuestion4ID = (question4ID) => {
    setQuestion4ID(question4ID);
  };

  const toogleQuestion5ID = (question5ID) => {
    setQuestion5ID(question5ID);
  };

  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();
  const [answer5, setAnswer5] = useState();

  const toogleAnswer1 = (answer1) => {
    setAnswer1(answer1);
  };

  const toogleAnswer2 = (answer2) => {
    setAnswer2(answer2);
  };

  const toogleAnswer3 = (answer3) => {
    setAnswer3(answer3);
  };

  const toogleAnswer4 = (answer4) => {
    setAnswer4(answer4);
  };

  const toogleAnswer5 = (answer5) => {
    setAnswer5(answer5);
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
          toogleDocument4={toogleDocument4}
        />
      </div>
    );
  } else if (step === 2) {
    return (
      <div className="buy-register-container">
        <BuyPayment
          toogleStep={toogleStep}
          step={step}
          toogleAnswer1={toogleAnswer1}
          toogleAnswer2={toogleAnswer2}
          toogleAnswer3={toogleAnswer3}
          toogleAnswer4={toogleAnswer4}
          toogleAnswer5={toogleAnswer5}
          toogleQuestion1ID={toogleQuestion1ID}
          toogleQuestion2ID={toogleQuestion2ID}
          toogleQuestion3ID={toogleQuestion3ID}
          toogleQuestion4ID={toogleQuestion4ID}
          toogleQuestion5ID={toogleQuestion5ID}
        />
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
          document4={document4}
          answer1={answer1}
          answer2={answer2}
          answer3={answer3}
          answer4={answer4}
          answer5={answer5}
          question1ID={question1ID}
          question2ID={question2ID}
          question3ID={question3ID}
          question4ID={question4ID}
          question5ID={question5ID}
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
