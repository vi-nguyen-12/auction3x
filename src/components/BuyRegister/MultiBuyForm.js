import React, { useState, useEffect } from "react";
import BuyAgreement from "./BuyAgreement";
import BuyAuthorized from "./BuyAuthorized";
import BuyQuestionair from "./BuyQuestionair";
import FundUpload from "./Fund Request/FundUpload";
import BuyerRegistStart from "./BuyerRegistStart";

const MultiBuyForm = ({
  windowSize,
  setMessage,
  auctionId,
  toggleDocu,
  setDocuUrl,
  showDocu,
}) => {
  const [step, setStep] = useState(1);
  const [client, setClient] = useState();
  const [document, setDocument] = useState();
  const [answers, setAnswers] = useState();
  const toggleDocument = (document) => {
    setDocument(document);
  };

  useEffect(() => {
    toggleDocument(document);
  }, [document]);

  if (step === 1) {
    return (
      <div className="buy-register-container">
        <BuyerRegistStart
          setStep={setStep}
          step={step}
          setMessage={setMessage}
          setClient={setClient}
          client={client}
        />
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
          setMessage={setMessage}
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
          setMessage={setMessage}
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
          windowSize={windowSize}
          setMessage={setMessage}
          auctionId={auctionId}
          toggleDocu={toggleDocu}
          setDocuUrl={setDocuUrl}
          client={client}
          showDocu={showDocu}
        />
      </div>
    );
  }
};

export default MultiBuyForm;
