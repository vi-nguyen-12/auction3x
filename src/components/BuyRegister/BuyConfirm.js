import React from "react";
import { Modal } from "react-bootstrap";

const BuyConfirm = (toogleStep, step) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>
          <h3> Enter your Bid</h3>
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

export default BuyConfirm;
