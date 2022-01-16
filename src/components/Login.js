import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Toast from "./Toast";
import authServices from "../services/authServices";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../slice/userSlice";
import { useHistory } from "react-router-dom";
import { addRegistProp } from "../slice/registPropertySlice";

require("react-bootstrap/ModalHeader");

const Login = ({
  toogleSignUp,
  toogleSignIn,
  toogleButton,
  toogleForgotPass,
  toogleConfirmModal,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showWarning, setShowWarning] = useState(false);
  //const [invPass, setInvPass] = useState(false);

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const getUser = async () => {
      try {
        const response = await authServices.login(data);
        if (response.data.message === "User has not been verified") {
          toogleSignIn();
          toogleConfirmModal();
        } else {
          console.log(response);
          if (!response.data.isActive) {
            setShowWarning(true);
          }
          dispatch(login(response.data.data));
          toogleButton();
          toogleSignIn();
          authServices.getRegistStatus().then((res) => {
            dispatch(addRegistProp(res.data));
          });
        }
      } catch (err) {
        if (err.response.status === 400) {
          alert("Invalid Password or Email");
        }
      }
      history.push("/");
      // window.location.reload();
      window.setTimeout(() => {
        window.scrollTo(0, 0);
      }, 0);
    };
    getUser();
  };
  return (
    <>
      {showWarning && (
        <Toast
          style={{ marginTop: "10px" }}
          type="warning"
          message="Warning! Your email verification process has not been done. We have sent the link"
        />
      )}
      <Modal.Header contentClassName="modal-head-login" closeButton>
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
              type="text"
              className="form-control"
              placeholder="Email"
              {...register("userName", {
                required: true,
              })}
              required
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
            required
          />
        </div>
        <div className="form-group" style={{ fontSize: "12px" }}>
          <button
            onClick={() => {
              toogleForgotPass();
              toogleSignIn();
            }}
            style={{ marginTop: "5px", marginBottom: "30px" }}
            className="nav-link-signup"
          >
            Forgot Password?
          </button>
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
            <div className="pb-2" style={{ position: "relative" }}>
              Not registered?
              <button
                onClick={() => {
                  toogleSignUp();
                  toogleSignIn();
                }}
                className="nav-link-signup"
              >
                Click Here to Sign Up!
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </>
  );
};
export default Login;
