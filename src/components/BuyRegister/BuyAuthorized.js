import React from "react";
import { Modal } from "react-bootstrap";

const BuyAuthoried = (toogleStep, step) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>
          <h3> Congrat! YOur Docs are Verified</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p> You Docs are Verified</p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default BuyAuthoried;
