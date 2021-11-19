import React from "react";
import { Form } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Buyer from "./User";
import authServices from "../services/authServices";
require("react-bootstrap/ModalHeader");

const Broker=({RegistermodalClose, ConfirmmodalOpen})=> {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    authServices.register(data)
    RegistermodalClose();
    ConfirmmodalOpen();
  };
  //const onSubmit = (data) => console.log(data);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table style={{ marginBottom: "8px" }}>
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

      <table style={{ marginBottom: "8px" }}>
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
        <label>Broker Id</label>
        <input
          type="text"
          className="form-control"
          placeholder="Option"
          {...register("extraOption", { required: false, maxLength: 20 })}
        />
      </div>

      <table style={{ marginBottom: "8px" }}>
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
      <div className="form-group mb-2">
        <label>Company Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Option"
          {...register("extraOption", { required: false, maxLength: 20 })}
        />
      </div>
      <label style = {{fontSize: "12px"}}>By signing up you will agree to our Privacy Policy and Terms & Conditions</label>
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
  );
}

export default Broker