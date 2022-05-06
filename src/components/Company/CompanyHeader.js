import React from "react";
import "../../styles/realEstate.css";

function CompanyHeader({ location }) {
  return (
    <h5 className="realHeader">
      {location === "AboutUs" ? (
        <p>About Us</p>
      ) : location === "ContantUs" ? (
        <p>Contact Us</p>
      ) : location === "PrivacyPolicy" ? (
        <p>Privacy Policy</p>
      ) : location === "FAQ" ? (
        <p>FAQ</p>
      ) : location === "TermsOfUse" ? (
        <p>TERMS OF USE</p>
      ) : location === "Partner" ? (
        <p>Partner With Us</p>
      ) : null}
    </h5>
  );
}

export default CompanyHeader;
