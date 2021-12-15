import React from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../../styles/Buyer.css";

const BuyAgreement = ({ toogleStep, step }) => {
  return (
    <>
      <Modal.Header contentClassName="modal-head-login" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassName="custom-modal-title"
        >
          Auction Register Agreement
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
          </div>
          <div style={{ position: "sticky" }} className="bottom-btn">
            <button className="pre-btn" onClick={"null"}>
              Previous
            </button>
            <button className="nxt-btn" onClick={() => toogleStep(step + 1)}>
              Next
            </button>
          </div>
          <div className="buy-bottom">
            <div class="circle-1"></div> <div class="line"></div>
            <div class="circle"></div> <div class="line"></div>
            <div class="circle"></div> <div class="line"></div>
            <div class="circle"></div> <div class="line"></div>
            <div class="circle"></div>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

export default BuyAgreement;
