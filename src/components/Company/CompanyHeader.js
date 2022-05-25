import React from "react";
import "../../styles/realEstate.css";
import partner from "../../../src/partner.png";
import contact from "../../../src/contact.png";
import about from "../../../src/about.png";
import privacy from "../../../src/privacy.png";
import terms from "../../../src/terms.png";
import broker from "../../../src/broker.png";
import team from "../../../src/team.png";

function CompanyHeader({ location }) {
  return (
    <>
      {location === "AboutUs" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${about})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
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
          style={{
            backgroundImage: `url(${contact})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
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
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${privacy})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <p>
            Privacy Policy
            <span>{"Home > Privacy Policy"}</span>
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
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <p>
            Terms & Conditions
            <span>{"Home > Terms & Conditions"}</span>
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
      ) : location === "Partner" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${partner})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
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
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${broker})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <p>
            Broker
            <span>{"Home > Broker"}</span>
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
      ) : location === "Team" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${team})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "cover",
          }}
        >
          <p>
            Our Team
            <span>{"Home > Our Team"}</span>
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
      ) : null}
    </>
  );
}

export default CompanyHeader;
