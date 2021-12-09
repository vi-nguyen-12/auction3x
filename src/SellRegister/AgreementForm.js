import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../styles/SellRegister.css";
import authService from "../services/authServices";
import { createSerializableStateInvariantMiddleware } from "@reduxjs/toolkit";
import { Redirect } from "react-router-dom";

const Agree = ({
  toogleStep,
  step,
  propertyData,
  images,
  videos,
  documents,
}) => {
  const [redirect, setRedirect] = React.useState(false);
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  if (redirect === true) {
    return <Redirect to="/" />;
  }

  const onSubmit = (data) => {
    if (images) {
      authService
        .saveImages(images)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (videos) {
      authService
        .saveVideos(videos)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            setRedirect(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (documents) {
      authService
        .savedDocuments(documents)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="agree-content">
      <div className="sell-top">
        <div class="circle-1">
          <p class="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div class="line-1"></div>
        <div class="circle-2">
          <p class="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div class="line-2"></div>
        <div class="circle-3">
          <p class="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div class="line-2"></div>
        <div class="circle-3">
          <p class="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div class="line-3"></div>
        <div class="circle-4">
          <p class="text">05</p>
          <span className="spnn">Listing Fees</span>
        </div>
        <div class="line-4"></div>
        <div class="circle-5">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div>
      </div>
      <div className="agree-sell-bottom">
        <div className="header">
          <top>SELLER AGREEMENT</top>
          <p>sdfjshd dsjfhasldj sdfhljdhf sdhlf</p>
        </div>
        <div className="bodi">
          <ul className="dashed">
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
            <li>sdhfsdufh sdufhasufha isudhfasdufh asdufh</li>
          </ul>
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
