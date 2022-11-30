import React from "react";
import { Row, Col } from "react-bootstrap";
import "../../styles/sell-register.css";

function SellHeader({ step }) {
  return (
    <div className="stepper-wrapper">
      <div
        className={
          step > 1
            ? "stepper-item completed"
            : step === 1
            ? "stepper-item active"
            : "stepper-item"
        }
      >
        <div className="step-counter">1</div>
        <div className="step-name">Ownership</div>
      </div>
      <div
        className={
          step > 2
            ? "stepper-item completed"
            : step === 2
            ? "stepper-item active"
            : "stepper-item"
        }
      >
        <div className="step-counter">2</div>
        <div className="step-name">Details</div>
      </div>
      <div
        className={
          step > 3
            ? "stepper-item completed"
            : step === 3
            ? "stepper-item active"
            : "stepper-item"
        }
      >
        <div className="step-counter">3</div>
        <div className="step-name">Multimedia</div>
      </div>
      <div
        className={
          step > 4
            ? "stepper-item completed"
            : step === 4
            ? "stepper-item active"
            : "stepper-item"
        }
      >
        <div className="step-counter">4</div>
        <div className="step-name">Documents</div>
      </div>
      <div
        className={
          step > 5
            ? "stepper-item completed"
            : step === 5
            ? "stepper-item active"
            : "stepper-item"
        }
      >
        <div className="step-counter">5</div>
        <div className="step-name">Agreement</div>
      </div>
    </div>
  );
}
export default SellHeader;
