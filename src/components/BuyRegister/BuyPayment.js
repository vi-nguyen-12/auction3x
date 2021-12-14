import React from "react";
import { Modal } from "react-bootstrap";

const BuyAuthoried = (toogleStep, step) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>
          <h3> Payment</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> You Docs are Verified</p>
        <button className="nxt-btn" type="submit">
          Submit
        </button>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default BuyAuthoried;
