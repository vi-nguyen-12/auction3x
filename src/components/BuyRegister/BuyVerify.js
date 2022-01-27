import React from "react";
import { Modal } from "react-bootstrap";

const BuyVerify = ({ toogleStep, step }) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentclassname="custom-modal-title"
        >
          Document Under Verification
        </Modal.Title>
      </Modal.Header>
      <form>
        <p>
          {" "}
          Your document is under verification. Please wait for the verification
          to complete.{" "}
        </p>

        <div style={{ position: "sticky" }} className="bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" onClick={() => toogleStep(step + 1)}>
            Next
          </button>
        </div>
        <div className="buy-bottom">
          <div class="circle-1"></div> <div class="line-1"></div>
          <div class="circle-2"></div> <div class="line-2"></div>
          <div class="circle-3"></div> <div class="line"></div>
          <div class="circle"></div> <div class="line"></div>
          <div class="circle"></div>
        </div>
      </form>
    </>
  );
};

export default BuyVerify;
