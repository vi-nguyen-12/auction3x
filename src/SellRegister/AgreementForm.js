import React from "react";
import { Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import "../styles/SellRegister.css";

const Agree = ({ toogleStep, step }) => (
  <form className="agree-content">
    <div className="sell-top">
    <div class="circle-1">
        <p class="text">01</p>
        <span className = "spnn">Select Catagory</span>
      </div>{" "}
      <div class="line-1"></div>
      <div class="circle-2">
        <p class="text">02</p>
        <span className = "spnn">Upload Documents</span>
      </div>{" "}
      <div class="line-2"></div>
      <div class="circle-3">
        <p class="text">03</p>
        <span className = "spnn">Approval</span>
      </div>{" "}
      <div class="line-3"></div>
      <div class="circle-3">
        <p class="text">04</p>
        <span className = "spnn">Agreement</span>
      </div>{" "}
      <div class="line"></div>
      <div class="circle">
        <p class="text">05</p>
        <span className = "spnn">Listing Fees</span>
      </div>{" "}
      <div class="line"></div>
      <div class="circle">
        <p class="text">06</p>
        <span className = "spnn">Listing Details</span>
      </div>{" "}
    </div>
    <div className="agree-sell-bottom">
      <div className="header">
        <top>SELLER AGREEMENT</top>
        <p>sdfjshd dsjfhasldj sdfhljdhf sdhlf</p>
      </div>
      <div className="bodi">
        <ul className = "dashed">
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
        <button
          className="nxt-btn"
          onClick={() => {
            toogleStep(step + 1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  </form>
);

export default Agree;