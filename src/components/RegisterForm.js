import React from "react";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Buyer from "./User";
import Seller from "./Seller";
import Broker from "./Broker";
import { FaCreativeCommonsPd } from "react-icons/fa";
import "../styles/radioStyle.css";
require("react-bootstrap/ModalHeader");

const RegisterForm = ({ RegistermodalClose, ConfirmmodalOpen }) => {
  const [formType, setFormType] = useState("buyer");

  return (
    <>
      <Form>
        <div className="circle mb-2" style={{ display: "flex" }}>
          {" "}
          Register as:
          <div style={{ paddingLeft: "20px", fontWeight: "bold" }}>
            <input
              style={{ backgroundColor: "#D58F5C" }}
              onClick={() => {
                setFormType("buyer");
              }}
              checked={formType === "buyer"}
              type="radio"
            />
            <label
              style={{ paddingLeft: "5px", fontWeight: "bold" }}
              htmlFor="buyer"
            >
              {" "}
              Buyer
            </label>
          </div>
          <div
            className="circle"
            style={{ paddingLeft: "20px", fontWeight: "bold" }}
          >
            <input
              onClick={() => {
                setFormType("seller");
              }}
              checked={formType === "seller"}
              type="radio"
            />
            <label
              style={{ paddingLeft: "5px", fontWeight: "bold" }}
              htmlFor="seller"
            >
              {" "}
              Seller
            </label>
          </div>
          <div className="circle" style={{ paddingLeft: "20px" }}>
            <input
              style={{ paddingRight: "20px", backgroundColor: "#D58F5C" }}
              onClick={() => {
                setFormType("broker");
              }}
              checked={formType === "broker"}
              type="radio"
            />
          </div>
          <label
            style={{ paddingLeft: "5px", fontWeight: "bold" }}
            htmlFor="broker"
          >
            {" "}
            Broker
          </label>
        </div>
      </Form>
      {formType === "buyer" && (
        <Buyer
          RegistermodalClose={RegistermodalClose}
          ConfirmmodalOpen={ConfirmmodalOpen}
        />
      )}
      {formType === "seller" && (
        <Seller
          RegistermodalClose={RegistermodalClose}
          ConfirmmodalOpen={ConfirmmodalOpen}
        />
      )}
      {formType === "broker" && (
        <Broker
          RegistermodalClose={RegistermodalClose}
          ConfirmmodalOpen={ConfirmmodalOpen}
        />
      )}
    </>
  );
};

export default RegisterForm;