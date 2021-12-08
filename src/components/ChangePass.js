import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Toast from "./Toast";
import authServices from "../services/authServices";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";
require("react-bootstrap/ModalHeader");

const ChangePass = ({ toogleChangePass }) => {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.newPassword !== data.confirmPassword) {
      alert("Password not match");
    } 
    else {
      toogleChangePass();
    }
  };
  return (
    <>
      <Modal.Header contentClassName="modal-head-login" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassName="custom-modal-title"
        >
          Change Password
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4 mt-3">
          <label htmlFor="exampleInputEmail1">New Password</label>
          <div className="input-group">
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              {...register("newPassword", {
                required: true,
              })}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Confirm Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            {...register("confirmPassword", {
              required: true,
            })}
            required
          />
        </div>
        <div className="form-group" style={{ fontSize: "12px" }}></div>
        <Modal.Footer>
          <div className="col text-center mb-2">
            <button
              type="submit"
              className="submitBtn mb-3"
              style={{
                width: "100%",
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Submit
            </button>
          </div>
        </Modal.Footer>
      </form>
    </>
  );
};
export default ChangePass;
