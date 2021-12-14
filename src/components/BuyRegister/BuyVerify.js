import React from "react";
import { Modal } from "react-bootstrap";

const BuyVerify = ({ toogleStep, step }) => {
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>
          <h3> Document Under Verification </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          {" "}
          Your document is under verification. Please wait for the verification
          to complete.{" "}
        </p>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default BuyVerify;
