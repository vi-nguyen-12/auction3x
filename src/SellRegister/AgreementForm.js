import React from "react";
import { useForm } from "react-hook-form";
import "../styles/SellRegister.css";
import authService from "../services/authServices";
import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Agree = ({
  toogleStep,
  step,
  propertyData,
  images,
  videos,
  documents,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [url, setUrl] = useState();
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const history = useHistory();

  useEffect(async () => {
    await authService.getDocuSign().then((res) => {
      setUrl(res.data.redirectUrl);
      console.log(res.data.redirectUrl);
    });
  }, []);

  const onSubmit = async (data) => {
    authService
      .saveRealEstate({
        type: propertyData.type,
        street_address: propertyData.street_address,
        city: propertyData.city,
        state: propertyData.state,
        discussedAmount: propertyData.discussedAmount,
        reservedAmount: propertyData.reservedAmount,
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
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="agree-content">
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
        {/* <div style={{marginTop:"100px"}}>
          <iframe src={url} width="800px" height="580px"></iframe>
        </div> */}
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
