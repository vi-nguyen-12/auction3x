import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Toast from "../Toast";
import authServices from "../../services/authServices";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { login } from "../../slice/userSlice";
import { useHistory, useLocation } from "react-router-dom";

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
  const location = useLocation();
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
        console.log(response);
        if (
          response.data.error === "Invalid email or password" ||
          response.data.error === "Email is not found"
        ) {
          alert(response.data.error);
        } else if (response.data.error === "User has not been verified") {
          alert(response.data.error);
          toogleSignIn();
          toogleConfirmModal();
        } else {
          dispatch(login(response.data.data));

          document.cookie = `auth_token=${response.data.data.token};path=/`;
          toogleButton();
          toogleSignIn();
          history.push(location.pathname);
          window.location.reload();
          window.setTimeout(() => {
            window.scrollTo(0, 0);
          }, 0);
        }
      } catch (error) {
        console.log(error);
      }
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
      <Modal.Header contentclassname="modal-head-login" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "35px", fontWeight: "bold" }}
          contentclassname="custom-modal-title"
        >
          LOGIN NOW
        </Modal.Title>
      </Modal.Header>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <div className="form-group mb-4 mt-3">
          <label style={{ fontSize: "35px", color: "black" }} htmlFor="exampleInputEmail1">
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
          <label style={{ fontSize: "35px", color: "black" }} htmlFor="exampleInputPassword1">
            Password
          </label>
          <input
            type="password"
            style={{ height: "50px", fontSize: "20px" }}
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
        <div className="form-group">
          <button
            onClick={() => {
              toogleForgotPass();
              toogleSignIn();
            }}
            style={{ marginTop: "5px", marginBottom: "30px", fontSize: "20px" }}
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
                fontSize: "35px",
              }}
            >
              LOGIN
            </button>
            <div
              className="pb-2"
              style={{ position: "relative", fontSize: "15px", color: "black" }}
            >
              Not registered?
              <button
                onClick={() => {
                  toogleSignUp();
                  toogleSignIn();
                }}
                className="nav-link-signup"
                style={{ fontSize: "15px" }}
              >
                Click Here to Sign Up!
              </button>
            </div>
          </div>
        </Modal.Footer>
      </form>
      {/* </div> */}
    </>
  );
};
export default Login;
