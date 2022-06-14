import React, { useState } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import Loading from "../Loading";
import { Modal, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../slice/userSlice";
import { useHistory, useLocation } from "react-router-dom";
import "../../styles/modal.css";
require("react-bootstrap/ModalHeader");

const Login = ({
  toggleSignUp,
  toggleSignIn,
  toggleButton,
  toggleForgotPass,
  toggleConfirmModal,
}) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const [showLoading, setShowLoading] = useState(false);

  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const getUser = async () => {
      try {
        setShowLoading(true);
        const response = await authServices.login(data);
        if (response.data.error) {
          alert(response.data.error);
          setShowLoading(false);
        } else if (response.data.error === "User has not been verified") {
          alert(response.data.error);
          toggleSignIn();
          toggleConfirmModal();
        } else {
          dispatch(login(response.data.data));
          localStorage.setItem("token", response.data.data.token);
          toggleButton();
          toggleSignIn();
          history.push(location.pathname);
          window.setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
          setShowLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  };
  return (
    <>
      {showLoading && <Loading />}

      <Modal.Header contentclassname="modal-head-login" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "35px", fontWeight: "bold" }}
          contentclassname="custom-modal-title"
        >
          LOGIN NOW
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group mb-4 mt-3">
          <label
            style={{ fontSize: "35px", color: "black" }}
            htmlFor="exampleInputEmail1"
          >
            Username or Email
          </label>
          <input
            type="text"
            style={{ height: "50px", fontSize: "20px" }}
            className="form-control"
            placeholder="Username or Email"
            {...register("userName", {
              required: true,
            })}
            required
          />
        </div>
        <div className="form-group mt-3">
          <label
            style={{ fontSize: "35px", color: "black" }}
            htmlFor="exampleInputPassword1"
          >
            Password
          </label>
          <input
            type="password"
            style={{ height: "50px", fontSize: "20px" }}
            className="form-control"
            placeholder="Password"
            {...register("password", {
              required: true,
              // minLength: 6,
              // maxLength: 12,
            })}
            required
          />
        </div>
        <div className="form-group">
          <Button
            onClick={() => {
              toggleForgotPass();
              toggleSignIn();
            }}
            style={{ marginTop: "5px", marginBottom: "30px", fontSize: "20px" }}
            className="nav-link-signup"
          >
            Forgot Password?
          </Button>
        </div>
        <Modal.Footer>
          <div className="col text-center mb-2">
            <button type="submit" className="loginBtn mb-3">
              LOGIN
            </button>
            <div
              className="pb-2"
              style={{ position: "relative", fontSize: "15px", color: "black" }}
            >
              Not registered?
              <Button
                onClick={() => {
                  toggleSignUp();
                  toggleSignIn();
                }}
                className="nav-link-signup"
                style={{ fontSize: "15px" }}
              >
                Click Here to Sign Up!
              </Button>
            </div>
          </div>
        </Modal.Footer>
      </form>
    </>
  );
};
export default Login;
