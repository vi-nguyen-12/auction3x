import React from "react";
import { useForm } from "react-hook-form";
import "../styles/SellRegister.css";
import authService from "../services/authServices";
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
}) => {
  window.scrollTo(0, 0);
  const [agree, setAgree] = useState(false);
  const [envelopeId, setEnvelopeId] = useState();
  const [docId, setDocId] = useState();
  const [loader, setLoader] = useState(false);
  const toogleAgree = () => {
    setAgree(!agree);
  };

  const [url, setUrl] = useState();
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const history = useHistory();

  useEffect(async () => {
    setLoader(true);
    await authService.getDocuSign().then((res) => {
      setUrl(res.data.redirectUrl);
      setEnvelopeId(res.data.envelopeId);
    });
  }, []);

  useEffect(async () => {
    await authService.getDocuSignStatus(envelopeId).then((res) => {
      setDocId(res.data._id);
      if (envelopeId) {
        setLoader(false);
      }
    });
  }, [envelopeId]);

  const onSubmit = async (data) => {
    if (agree === true) {
      authService
        .saveRealEstate({
          type: propertyData.type,
          street_address: propertyData.street_address,
          city: propertyData.city,
          state: propertyData.state,
          discussedAmount: parseFloat(propertyData.discussedAmount),
          reservedAmount: parseFloat(propertyData.reservedAmount),
          docusignId: docId,
          images,
          videos,
          documents,
        })
        .then((res) => {
          if (res.status === 200) {
            history.push("/");
            window.scrollTo(0, 0);
          }
        });
    } else {
      alert("You must agree to the terms and conditions");
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
          <h2>SELLER AGREEMENT</h2>
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
            onClick={() => window.open(url)}
          >
            Sign DocuSign <SiDocusign />
          </button>
        </div>
        <div
          style={{
            height: "fit-content",
            position: "absolute",
            bottom: "200px",
          }}
        >
          <input
            style={{ marginRight: "10px" }}
            type="checkbox"
            onChange={toogleAgree}
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
