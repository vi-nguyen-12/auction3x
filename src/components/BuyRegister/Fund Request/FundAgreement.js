import React, { useState, useEffect } from "react";

function FundAgreement({ toggleStep, step }) {
  const [agree, setAgree] = useState(false);
  const toggleAgree = () => {
    setAgree(!agree);
  };

  const handleNext = () => {
    if (agree === true) {
      toggleStep(step + 1);
    } else {
      alert("Please Read the agreement and check the box to continue");
    }
  };

  return (
    <>
      <div className="term">
        <ul>
          <h3 style={{ fontWeight: "bold", color: "black" }}>
            1. Terms and Conditions
          </h3>
          <li className="buyer-agree">
            {" "}
            1.1. The following terms and conditions apply to the use of the
            Auction3 platform and the services provided by the Auction3 team.
          </li>
          <li className="buyer-agree">
            1.2. The Auction3 platform is a platform for the sale of properties.
          </li>
          <li className="buyer-agree">
            1.3. The Auction3 team is a team of professional real estate
            investors and brokers.
          </li>
          <li className="buyer-agree">
            1.4. The Auction3 team is not a real estate broker.
          </li>
          <li className="buyer-agree">
            1.5. The Auction3 team is not a real estate investor.
          </li>
          <li className="buyer-agree">
            1.6. The Auction3 team is not a real estate agent.
          </li>
          <li className="buyer-agree">
            1.7. The Auction3 team is not a real estate developer.
          </li>
          <li className="buyer-agree">
            1.8. The Auction3 team is not a real estate developer.
          </li>
          <li className="buyer-agree">
            1.9. The Auction3 team is not a real estate developer.
          </li>
        </ul>
        <input
          style={{ marginRight: "10px" }}
          type="checkbox"
          onChange={toggleAgree}
        />
        <label style={{ color: "black" }}>
          I agree to the terms and conditions
        </label>
      </div>
      <div
        style={{ position: "sticky", marginTop: "40px" }}
        className="bottom-btn"
      >
        <button className="pre-btn" onClick={() => toggleStep(step - 1)}>
          Previous
        </button>
        <button className="nxt-btn" onClick={() => handleNext()}>
          Next
        </button>
      </div>
    </>
  );
}

export default FundAgreement;
