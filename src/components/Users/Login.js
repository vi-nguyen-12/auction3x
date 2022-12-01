import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import Loading from "../Loading";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../slice/userSlice";
import { useHistory, useLocation } from "react-router-dom";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import "../../styles/modal.css";
require("react-bootstrap/ModalHeader");

const Login = ({
  toggleSignUp,
  toggleSignIn,
  toggleButton,
  toggleForgotPass,
  toggleConfirmModal,
  setMessage,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [showLoading, setShowLoading] = useState(false);
  const [hidden, setHidden] = useState(true);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const getUser = async () => {
      try {
        setShowLoading(true);
        const response = await authServices.login(data);
        if (response.data.error) {
          if (response.data.error === "User has not been verified") {
            setMessage("");
            setMessage(response.data.error);
            toggleSignIn();
            setShowLoading(false);
            toggleConfirmModal();
          } else {
            setMessage("");
            setMessage(response.data.error);
            setShowLoading(false);
          }
        } else {
          dispatch(login(response.data.data));
          localStorage.setItem("token", response.data.data.token);
          toggleButton();
          toggleSignIn();
          // history.push(location.pathname);
          window.location.reload();
          window.setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
          setShowLoading(false);
        }
      } catch (error) {
        setMessage("");
        setMessage(error.message);
      }
    };
    getUser();
  };
  return (
    <>
      {showLoading && <Loading />}
      <form onSubmit={handleSubmit(onSubmit)} className="px-3">
        <div className="form-group mb-4 mt-3 position-relative w-100">
          <input
            type="text"
            style={{ height: "50px", fontSize: "20px" }}
            id="username"
            className="form-control custom-input px-1"
            // placeholder="Email or Username"
            {...register("userName", {
              required: true,
            })}
            required
          />
          <label htmlFor="username" className="input_label">
            Email/Username <span style={{ color: "red" }}> *</span>
          </label>
        </div>
        <div className="form-group mt-3 d-flex justify-content-between align-items-center position-relative">
          <input
            type={hidden ? "password" : "text"}
            style={{ height: "50px", fontSize: "20px" }}
            id="password"
            className="form-control custom-input px-1"
            // placeholder="Password"
            {...register("password", {
              required: true,
            })}
            required
          />
          <label htmlFor="password" className="input_label">
            Password <span style={{ color: "red" }}> *</span>
          </label>
          <div className="eyes_container" style={{right:"3%"}}>
            {hidden ? (
              <RiEyeCloseLine
                className="eye-icon"
                onClick={() => setHidden(false)}
                size={23}
              />
            ) : (
              <RiEyeLine
                className="eye-icon"
                onClick={() => setHidden(true)}
                size={23}
              />
            )}
          </div>
        </div>
        <div className="form-group d-flex justify-content-end mb-4">
          <Button
            onClick={() => {
              toggleForgotPass();
              toggleSignIn();
            }}
            className="nav-link-signup px-0"
          >
            Forgot password?
          </Button>
        </div>
        <Modal.Footer>
          <div className="col text-center mb-2">
            <button type="submit" className="loginBtn mb-3">
              Log In
            </button>
            <div className="d-flex justify-content-center align-items-center mt-3">
              <span style={{ fontSize: "1rem" }}>Don't have account yet?</span>
              <button
                type="button"
                onClick={() => {
                  toggleSignIn();
                  toggleSignUp();
                }}
                className="back-login-btn"
              >
                Sign Up
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </>
  );
};
export default Login;
