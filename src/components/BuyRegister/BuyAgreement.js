import React from "react";
import { Modal } from "react-bootstrap";

const BuyAgreement = (toogleStep, step) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>
          <h3> Auction Register Agreement</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
        <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
        <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
        <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
        <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
        <div className="agree-bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" type="submit">
            Submit
          </button>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default BuyAgreement;
