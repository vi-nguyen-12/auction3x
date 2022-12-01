import React from "react";
import "../../styles/sell-register.css";

function SellHeader({ step }) {
  return (
    <div className="stepper-wrapper" id={step > 1 ? "completed" : "incomplete"}>
      <div
        className={`
        stepper-item
        ${parseInt(step) - 1 > 1 ? "done" : ""}
        ${step === 1 ? "active" : "inactive"}
        ${parseInt(step) - 1 === 1 ? "completed" : ""}
        `}
      >
        <div className="step-counter">1</div>
        <div className="step-name">Ownership</div>
      </div>
      <div
        className={`
        stepper-item
        ${parseInt(step) - 2 > 1 ? "done" : ""}
        ${step === 2 ? "active" : "inactive"}
        ${parseInt(step) - 2 === 1 ? "completed" : ""}
        `}
      >
        <div className="step-counter">2</div>
        <div className="step-name">Details</div>
      </div>
      <div
        className={`
        stepper-item
        ${parseInt(step) - 3 > 1 ? "done" : ""}
        ${step === 3 ? "active" : "inactive"}
        ${parseInt(step) - 3 === 1 ? "completed" : ""}
        `}
      >
        <div className="step-counter">3</div>
        <div className="step-name">Multimedia</div>
      </div>
      <div
        className={`
        stepper-item
        ${parseInt(step) - 4 > 1 ? "done" : ""}
        ${step === 4 ? "active" : "inactive"}
        ${parseInt(step) - 4 === 1 ? "completed" : ""}
        `}
      >
        <div className="step-counter">4</div>
        <div className="step-name">Documents</div>
      </div>
      <div
        className={`
        stepper-item
        ${parseInt(step) - 5 > 1 ? "done" : ""}
        ${step === 5 ? "active" : "inactive"}
        ${parseInt(step) - 5 === 1 ? "completed" : ""}
        `}
      >
        <div className="step-counter">5</div>
        <div className="step-name">Agreement</div>
      </div>
    </div>
  );
}
export default SellHeader;
