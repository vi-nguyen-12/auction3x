import React from "react";
import "../../styles/realEstate.css";
import partner from "../../../src/partner.png";
import contact from "../../../src/contact.png";
import about from "../../../src/about.png";

function CompanyHeader({ location }) {
  return (
    <>
      {location === "AboutUs" ? (
        <div
          className="companyHeader"
          style={{ backgroundImage: `url(${about})` }}
        >
          <p>
            Know More About Us
            <span>{"Home > About Us"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span
              style={{
                fontSize: "35px",
                width: "50%",
                color: "white",
                textAlign: "center",
              }}
            >
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : location === "contact" ? (
        <div
          className="companyHeader"
          style={{ backgroundImage: `url(${contact})` }}
        >
          <p>
            Get In Touch
            <span>{"Home > Contact Us"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span
              style={{
                fontSize: "35px",
                width: "50%",
                color: "white",
                textAlign: "center",
              }}
            >
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : location === "PrivacyPolicy" ? (
        <p>PRIVACY POLICY</p>
      ) : location === "FAQ" ? (
        <div className="companyHeader">
          <p>
            Have a Question?
            <span>{"Home > FAQ"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span
              style={{
                fontSize: "35px",
                width: "100%",
                color: "white",
                textAlign: "center",
              }}
            >
              {"Look Here"}
            </span>
          </div>
        </div>
      ) : location === "TermsOfUse" ? (
        <p>TERMS OF USE</p>
      ) : location === "Partner" ? (
        <div
          className="companyHeader"
          style={{ backgroundImage: `url(${partner})` }}
        >
          <p>
            PARTNER WITH US
            <span>{"Home > Partner With Us"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span
              style={{
                fontSize: "35px",
                width: "50%",
                color: "white",
                textAlign: "center",
              }}
            >
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : location === "Broker" ? (
        <p>BROKER</p>
      ) : location === "Team" ? (
        <p>TEAM</p>
      ) : null}
    </>
  );
}

export default CompanyHeader;
