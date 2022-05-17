import React from "react";
import "../../styles/realEstate.css";

function CompanyHeader({ location }) {
  return (
    <h5 className="realHeader">
      {location === "AboutUs" ? (
        <p>ABOUT US</p>
      ) : location === "contact" ? (
        <p>CONTACT US</p>
      ) : location === "PrivacyPolicy" ? (
        <p>PRIVACY POLICY</p>
      ) : location === "FAQ" ? (
        <p>FAQ</p>
      ) : location === "TermsOfUse" ? (
        <p>TERMS OF USE</p>
      ) : location === "Partner" ? (
        <p>PARTNER WITH US</p>
      ) : location === "Broker" ? (
        <p>BROKER</p>
      ) : location === "Team" ? (
        <p>TEAM</p>
      ) : null}
    </h5>
  );
}

export default CompanyHeader;
