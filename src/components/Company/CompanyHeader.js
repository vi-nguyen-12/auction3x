import React from "react";
import "../../styles/realEstate.css";
import partner from "../../../src/images/partner.png";
import contact from "../../../src/images/contact.png";
import about2 from "../../../src/images/about2.png";
import privacy from "../../../src/images/privacy.png";
import terms from "../../../src/images/terms.png";
import broker from "../../../src/images/broker.png";
import team from "../../../src/images/team.png";

function CompanyHeader({ location }) {
  return (
    <>
      {location === "AboutUs" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${about2})`,
          }}
        >
          <p>
            Know More About Us
            <span>{"Home > About Us"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : location === "contact" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${contact})`,
          }}
        >
          <p>
            Get In Touch
            <span>{"Home > Contact Us"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : location === "PrivacyPolicy" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${privacy})`,
          }}
        >
          <p>
            Privacy Policy
            <span>{"Home > Privacy Policy"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
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
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${terms})`,
          }}
        >
          <p>
            Terms & Conditions
            <span>{"Home > Terms & Conditions"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : location === "Partner" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${partner})`,
          }}
        >
          <p>
            PARTNER WITH US
            <span>{"Home > Partner With Us"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : location === "Broker" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${broker})`,
          }}
        >
          <p>
            Broker
            <span>{"Home > Broker"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : location === "Team" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${team})`,
          }}
        >
          <p>
            Our Team
            <span>{"Home > Our Team"}</span>
          </p>
          <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default CompanyHeader;
