import React from "react";
import { useForm } from "react-hook-form";
import "../../styles/SellRegister.css";
import authService from "../../services/authServices";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { SiDocusign } from "react-icons/si";

const Agree = ({
  toogleStep,
  step,
  propertyData,
  images,
  videos,
  documents,
  ownership,
}) => {
  const details = { ...propertyData.details };
  const ownerDetails = { ...ownership.details };
  console.log(details);
  window.scrollTo(0, 0);
  const [agree, setAgree] = useState(false);
  const [envelopeId, setEnvelopeId] = useState();
  const [loader, setLoader] = useState(false);
  const toggle = () => {
    setAgree(!agree);
  };
  const { handleSubmit } = useForm();

  const history = useHistory();

  const handleSignDocusign = async () => {
    setLoader(true);
    await authService.getDocuSign(envelopeId).then((res) => {
      setLoader(false);
      setEnvelopeId(res.data.envelopeId);
      if (
        res.data.status !== "signing_complete" &&
        res.data.status !== "viewing_complete"
      ) {
        window.open(res.data.redirectUrl);
      }
    });
  };

  const onSubmit = async (data) => {
    if (!agree) {
      alert("You must agree to the terms and conditions");
    } else {
      setLoader(true);
      await authService.getDocuSignStatus(envelopeId).then((res) => {
        setLoader(false);
        if (
          res.data.status !== "signing_complete" &&
          res.data.status !== "viewing_complete"
        ) {
          alert("Please sign the docusign before proceeding ");
        } else {
          if (propertyData.type === "real-estate") {
            authService
              .saveRealEstate({
                type: propertyData.type,
                street_address: propertyData.street_address,
                city: propertyData.city,
                state: propertyData.state,
                discussedAmount: parseFloat(propertyData.discussedAmount),
                reservedAmount: parseFloat(propertyData.reservedAmount),
                docusignId: res.data._id,
                images,
                videos,
                documents,
                details: {
                  ...details,
                  ...ownerDetails,
                },
              })
              .then((res) => {
                if (res.data.error) {
                  alert(res.data.error);
                } else {
                  alert("Successfully create a property to sell");
                  history.push("/");
                  window.scrollTo(0, 0);
                }
              });
          } else {
            if (propertyData.type === "car") {
              authService
                .sellProperty({
                  type: propertyData.type,
                  images,
                  videos,
                  documents,
                  reservedAmount: parseInt(propertyData.reservedAmount),
                  discussedAmount: parseInt(propertyData.discussedAmount),
                  docusignId: res.data._id,
                  details: {
                    ...details,
                    ...ownerDetails,
                  },
                })
                .then((res) => {
                  if (res.data.error) {
                    alert(res.data.error);
                  } else {
                    alert("Successfully create a property to sell");
                    history.push("/");
                    window.scrollTo(0, 0);
                  }
                });
            } else {
              if (propertyData.type === "yacht") {
                authService
                  .sellProperty({
                    type: propertyData.type,
                    images,
                    videos,
                    documents,
                    reservedAmount: parseInt(propertyData.reservedAmount),
                    discussedAmount: parseInt(propertyData.discussedAmount),
                    docusignId: res.data._id,
                    details: {
                      ...details,
                      ...ownerDetails,
                    },
                  })
                  .then((res) => {
                    if (res.data.error) {
                      alert(res.data.error);
                    } else {
                      alert("Successfully create a property to sell");
                      history.push("/");
                      window.scrollTo(0, 0);
                    }
                  });
              } else if (propertyData.type === "jet") {
                authService
                  .sellProperty({
                    type: propertyData.type,
                    images,
                    videos,
                    documents,
                    reservedAmount: parseInt(propertyData.reservedAmount),
                    discussedAmount: parseInt(propertyData.discussedAmount),
                    docusignId: res.data._id,
                    details: {
                      ...details,
                      ...ownerDetails,
                    },
                  })
                  .then((res) => {
                    if (res.data.error) {
                      alert(res.data.error);
                    } else {
                      alert("Successfully create a property to sell");
                      history.push("/");
                      window.scrollTo(0, 0);
                    }
                  });
              }
            }
          }
        }
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className="agree-content"
    >
      <div className="sell-top">
        <div className="circle-1">
          <p className="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div className="line-1"></div>
        <div className="circle-2">
          <p className="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div className="line-2"></div>
        <div className="circle-3">
          <p className="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div className="line-2"></div>
        <div className="circle-3">
          <p className="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div className="line-3"></div>
        <div className="circle-4">
          <p className="text">05</p>
          <span className="spnn">Agreement</span>
        </div>
        {/* <div class="line-4"></div>
        <div class="circle-5">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div> */}
      </div>
      <div className="agree-sell-bottom">
        <div className="header">
          <h2 style={{ color: "black", fontWeight: "bold" }}>
            SELLER AGREEMENT
          </h2>
          {/* <p>sdfjshd dsjfhasldj sdfhljdhf sdhlf</p> */}
        </div>
        {loader ? (
          <div className="loader">
            <div className="spinning" />
          </div>
        ) : null}
        <div style={{ marginTop: "200px" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignDocusign}
          >
            Sign DocuSign <SiDocusign />
          </button>
        </div>
        <div
          style={{
            height: "fit-content",
            position: "absolute",
            bottom: "200px",
            color: "black",
          }}
        >
          <input
            style={{ marginRight: "10px" }}
            type="checkbox"
            onChange={toggle}
          />
          <label>I agree to the terms and conditions</label>
        </div>
        <div className="agree-bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Agree;
