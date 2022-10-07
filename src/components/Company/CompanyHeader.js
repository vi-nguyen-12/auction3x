import React from "react";
import "../../styles/headers.css";
import partner from "../../images/partner.png";
import contact from "../../images/contact.png";
import about2 from "../../images/about2.png";
import privacy from "../../images/privacy.png";
import terms from "../../images/terms.png";
import broker from "../../images/broker.png";
import team from "../../images/team.png";
import RealEstatePageBg from "../../images/RealEstatePageBg.png";
import { FiSearch } from "react-icons/fi";

function CompanyHeader({ location, setQuery, faqs }) {
  return (
    <>
      {location === "AboutUs" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${about2})`,
          }}
        >
          <span>
            Know More About Us
            {/* <span>{"Home > About Us"}</span> */}
          </span>
          {/* <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div> */}
        </div>
      ) : location === "contact" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${contact})`,
          }}
        >
          <span>
            Get In Touch
            {/* <span>{"Home > Contact Us"}</span> */}
          </span>
          {/* <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div> */}
        </div>
      ) : location === "PrivacyPolicy" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${privacy})`,
          }}
        >
          <span>
            Privacy Policy
            {/* <span>{"Home > Privacy Policy"}</span> */}
          </span>
          {/* <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div> */}
        </div>
      ) : location === "FAQ" ? (
        <div
          className="companyHeader align-items-end"
          style={{ background: `url(${RealEstatePageBg})` }}
        >
          <span>
            Have a Question?
            {/* <span>{"Home > FAQ"}</span> */}
          </span>
          <div className="d-grid justify-content-center">
            {/* <p
              style={{
                fontSize: "25px",
                fontWeight: "bold",
                width: "100%",
                color: "white",
                textAlign: "center",
                height: "fit-content",
                marginBottom: "-80px",
              }}
            >
              {"Search Here"}
            </p> */}
            <div className="faqSearch">
              <input
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setQuery(
                      faqs.filter((faq) =>
                        faq.question
                          .toLowerCase()
                          .includes(e.target.value.toLowerCase())
                      )
                    );
                  } else {
                    setQuery([]);
                  }
                }}
                type="text"
                placeholder="Enter Your Question"
              />
              <FiSearch color="black" size={25} />
              {/* <Button>Search</Button> */}
            </div>
          </div>
        </div>
      ) : location === "TermsOfUse" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${terms})`,
          }}
        >
          <span>
            Terms & Conditions
            {/* <span>{"Home > Terms & Conditions"}</span> */}
          </span>
          {/* <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div> */}
        </div>
      ) : location === "Partner" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${partner})`,
          }}
        >
          <span>
            PARTNER WITH US
            {/* <span>{"Home > Partner With Us"}</span> */}
          </span>
          {/* <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div> */}
        </div>
      ) : location === "Broker" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${broker})`,
          }}
        >
          <span>
            Broker
            {/* <span>{"Home > Broker"}</span> */}
          </span>
          {/* <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div> */}
        </div>
      ) : location === "Team" ? (
        <div
          className="companyHeader"
          style={{
            backgroundImage: `url(${team})`,
          }}
        >
          <span>
            Our Team
            {/* <span>{"Home > Our Team"}</span> */}
          </span>
          {/* <div
            style={{ width: "100%", display: "flex", justifyContent: "center" }}
          >
            <span className="descript">
              {
                "Have a little somthing. somthing you wanna talk to us about? Send us email, or fill out that form below."
              }
            </span>
          </div> */}
        </div>
      ) : null}
    </>
  );
}

export default CompanyHeader;
