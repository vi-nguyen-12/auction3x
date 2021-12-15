import React from "react";
import { Modal } from "react-bootstrap";

const BuyAuthoried = ({ toogleStep, step }) => {
  return (
    <>
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassName="custom-modal-title"
        >
          Payment
        </Modal.Title>
      </Modal.Header>
      <form>
        <p>
          {" "}
          To Proceed with auction you need to pay $100 as deposit and it is
          completely refundable
        </p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
          facilisis, erat a euismod aliquam, nisi nunc pretium nunc, eget
          efficitur erat nunc eget nunc.
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
          <div class="circle-3"></div> <div class="line-3"></div>
          <div class="circle-4"></div> <div class="line-4"></div>
          <div class="circle-5"></div>
        </div>
      </form>
    </>
  );
};

export default BuyAuthoried;
