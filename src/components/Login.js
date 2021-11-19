import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Toast from "./Toast";
import axios from "axios";
import authServices from "../services/authServices";
import { Button, Modal } from "react-bootstrap";
require("react-bootstrap/ModalHeader");

const Login = ({toogleSignUp,modalClose}) => {
  const [showWarning, setShowWarning] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const getUser = async () => {
      const user = await authServices.login(data);
      console.log(user);
      if (!user.isActive) {
        setShowWarning(true);
      }
    };
    getUser();
  };
  return (
<>
      {showWarning && (
        <Toast style={{ marginTop: "10px" }}
          type="warning"
          message="Warning! Your email verification process has not been done. We have sent the link"
        />
      )}
      <Modal.Header contentClassName = "modal-head-login" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassName="custom-modal-title"
        >
          LOGIN NOW
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4 mt-3">
          <label htmlFor="exampleInputEmail1">Username or Email</label>
          <div className="input-group">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
              })}
            />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
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
        </div>
        <div className="form-group mb-4 mt-2 pl-3" style={{ fontSize: "12px" }}>
          <label>Forgot Password?</label>
        </div>
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
            <div className = "pb-2" style = {{position:"relative"}}>Not registered?<a onClick={()=>{
              toogleSignUp()
              modalClose()
              }} className="nav-link-signup"> Click Here to Sign Up! </a></div>
          </div>
          
        </Modal.Footer>
      </form>
      </>

  );
};
export default Login;
