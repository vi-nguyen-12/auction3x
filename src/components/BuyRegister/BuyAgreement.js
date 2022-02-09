import React from "react";
import { Modal } from "react-bootstrap";
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
    } else {
      alert("Please Read the agreement and check the box to continue");
    }
  };
  return (
    <>
      <Modal.Header contentclassname="modal-head-login" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentclassname="custom-modal-title"
        >
          Auction Register Agreement
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="term">
            <ul>
              <h3>1. Terms and Conditions</h3>
              <li>
                {" "}
                1.1. The following terms and conditions apply to the use of the
                Auction 10X platform and the services provided by the Auction
                10X team.
              </li>
              <li>
                1.2. The Auction 10X platform is a platform for the sale of
                properties.
              </li>
              <li>
                1.3. The Auction 10X team is a team of professional real estate
                investors and brokers.
              </li>
              <li>1.4. The Auction 10X team is not a real estate broker.</li>
              <li>1.5. The Auction 10X team is not a real estate investor.</li>
              <li>1.6. The Auction 10X team is not a real estate agent.</li>
              <li>1.7. The Auction 10X team is not a real estate developer.</li>
              <li>1.8. The Auction 10X team is not a real estate developer.</li>
              <li>1.9. The Auction 10X team is not a real estate developer.</li>
            </ul>
            <input
              style={{ marginRight: "10px" }}
              type="checkbox"
              onChange={toogleAgree}
            />
            <label>I agree to the terms and conditions</label>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ position: "sticky" }} className="bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
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
