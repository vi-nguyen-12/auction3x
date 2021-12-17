import React from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import "../../styles/Buyer.css";

const BuyAgreement = ({ toogleStep, step }) => {
  const [agreement, setAgreement] = useState(false);
  const toogleAgree = () => {
    setAgreement(!agreement);
  };
  const handleNext = () => {
    if (agreement === true) {
      toogleStep(step + 1);
    }
    else{
      alert("Please Read the agreement and check the box to continue");
    }
  }
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
            <input type="checkbox" onChange={toogleAgree} />
            Agree
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer style={{display:"flex", justifyContent:"center"}}>
      <div style={{ position: "sticky" }} className="bottom-btn">
            <button className="pre-btn" onClick={() => toogleStep(step-1)}>
              Previous
            </button>
            <button className="nxt-btn" onClick={() => handleNext()}>
              Next
            </button>
          </div>
      </Modal.Footer>
    </>
  );
};

export default BuyAgreement;
