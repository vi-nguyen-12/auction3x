import React from "react";
import { Container, Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import authServices from "../services/authServices";
import { Button, Modal } from "react-bootstrap";
import "../styles/modalStyle.css";
require("react-bootstrap/ModalHeader");

const User=({RegistermodalClose, ConfirmmodalOpen})=> {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    authServices.register(data);
    RegistermodalClose();
    ConfirmmodalOpen();
  };
  return (
    <>
    <Modal.Header contentClassName = "modal-head-signup" closeButton>
    <Modal.Title
      id="contained-modal-title-vcenter"
      style={{ color: "#D58F5C", fontSize: "25px", fontWeight: "bold" }}
      contentClassName="custom-modal-title"
    >
      REGISTER ON AUCTION10X
      <div className = "signup-div">
      <a className = "signup-link">Already Registered? Sign In</a>
    </div>
    </Modal.Title>

  </Modal.Header>
    <form onSubmit={handleSubmit(onSubmit)}>
      <table style={{ marginBottom: "13px" }}>
        <tr>
          <td>First Name</td>
          <td style={{ paddingLeft: "50px" }}>Last Name</td>
        </tr>
        <tr>
          <td style={{ width: "200px" }}>
            <input
              type="text"
              name="firstName"
              className="form-control"
              placeholder="First Name"
              {...register("firstName", { required: true })}
            />
          </td>
          <td style={{ position: "absolute", right: "15px", width: "220px" }}>
            <input
              type="text"
              name="lastName"
              className="form-control"
              placeholder="Last Name"
              {...register("lastName", { required: true })}
            />
          </td>
        </tr>
      </table>

      <table style={{ marginBottom: "13px" }}>
        <tr>
          <td>Email</td>
          <td style={{ paddingLeft: "50px" }}>Mobile No.</td>
        </tr>
        <tr>
          <td style={{ width: "200px" }}>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
          </td>
          <td style={{ position: "absolute", right: "15px", width: "220px" }}>
            <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              {...register("phone", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />
          </td>
        </tr>
      </table>
      <div className="form-group mb-2">
        <label>Username</label>
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          {...register("userName", { required: false, maxLength: 20 })}
        />
      </div>

      <table style={{ marginBottom: "10px" }}>
        <tr>
          <td>Password</td>
          <td style={{ paddingLeft: "50px" }}>Confirm Password</td>
        </tr>
        <tr>
          <td style={{ width: "200px" }}>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 12,
              })}
            />
          </td>
          <td style={{ position: "absolute", right: "15px", width: "220px" }}>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
            />
          </td>
        </tr>
      </table>

      <table>
      <tr>
          <td>Country</td>
          <td style={{ paddingLeft: "50px" }}>City</td>
        </tr>
        <tr>
          <td style={{ width: "200px" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Country"
              {...register("country", { required: true, maxLength: 20 })}
            />
          </td>

          <td style={{ position: "absolute", right: "15px", width: "220px" }}>
            <input
              type="text"
              className="form-control color-black"
              placeholder="City"
              {...register("city", { required: true, maxLength: 20 })}
            />
          </td>
        </tr>
      </table>
      <label style = {{fontSize: "12px", marginBottom:"20px"}}>By signing up you will agree to our Privacy Policy and Terms & Conditions</label>
      <button
        type="submit"
        className="registerBtn"
        style={{
          width: "100%",
          color: "white",
          fontWeight: "bold",
          fontSize: "15px",
        }}
      >
        Register
      </button>
    </form>
    </>
  );
}
export default User