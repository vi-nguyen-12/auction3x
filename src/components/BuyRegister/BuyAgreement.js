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
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{
            color: "#D58F5C",
            fontSize: "40px",
            fontWeight: "bold",
            marginTop: "-20px",
          }}
          contentclassname="custom-modal-title"
        >
          Buyer Agreement
        </Modal.Title>
      </Modal.Header>
      <form>
        <div className="term">
          <ul>
            <h3 style={{ fontWeight: "bold", color: "black" }}>
              1. Terms and Conditions
            </h3>
            <li className="buyer-agree">
              {" "}
              1.1. The following terms and conditions apply to the use of the
              Auction 10X platform and the services provided by the Auction 10X
              team.
            </li>
            <li className="buyer-agree">
              1.2. The Auction 10X platform is a platform for the sale of
              properties.
            </li>
            <li className="buyer-agree">
              1.3. The Auction 10X team is a team of professional real estate
              investors and brokers.
            </li>
            <li className="buyer-agree">
              1.4. The Auction 10X team is not a real estate broker.
            </li>
            <li className="buyer-agree">
              1.5. The Auction 10X team is not a real estate investor.
            </li>
            <li className="buyer-agree">
              1.6. The Auction 10X team is not a real estate agent.
            </li>
            <li className="buyer-agree">
              1.7. The Auction 10X team is not a real estate developer.
            </li>
            <li className="buyer-agree">
              1.8. The Auction 10X team is not a real estate developer.
            </li>
            <li className="buyer-agree">
              1.9. The Auction 10X team is not a real estate developer.
            </li>
          </ul>
          <input
            style={{ marginRight: "10px" }}
            type="checkbox"
            onChange={toogleAgree}
          />
          <label style={{ color: "black" }}>
            I agree to the terms and conditions
          </label>
        </div>
      </form>
      <Modal.Footer
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
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
