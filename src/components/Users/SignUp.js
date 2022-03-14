import React from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import { Modal, Table } from "react-bootstrap";
import "../../styles/modalStyle.css";

require("react-bootstrap/ModalHeader");

const User = ({ toogleSignUp, toogleSignIn, toogleConfirmModal }) => {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
    } else {
      const datas = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        phone: data.phone,
        userName: data.userName,
        country: data.country,
        city: data.city,
      };
      authServices.register(datas).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          toogleSignUp();
          alert("Please check your email to verify your account");
          // toogleConfirmModal();
        }
      });
    }
  };
  return (
    <>
      <Modal.Header contentclassname="modal-head-signup" closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "35px", fontWeight: "bold" }}
          contentclassname="custom-modal-title"
        >
          REGISTER ON AUCTION10X
          <div style={{ display: "flex", marginBottom: "30px" }}>
            <button
              style={{ fontSize: "20px" }}
              className="signup-link"
              onClick={() => {
                toogleSignIn();
                toogleSignUp();
              }}
            >
              Already Registered? Sign In
            </button>
          </div>
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
        <Table borderless style={{ marginBottom: "13px" }}>
          <tbody>
            <tr>
              <td style={{ width: "50%", paddingRight: "20px" }}>
                <label style={{ fontSize: "20px" }}>First Name*</label>
                <input
                  type="text"
                  name="firstName"
                  className="form-control"
                  placeholder="First Name"
                  {...register("firstName", { required: true })}
                  required
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>
              <td style={{ width: "50%" }}>
                <label style={{ fontSize: "20px" }}>Last Name*</label>
                <input
                  type="text"
                  name="lastName"
                  className="form-control"
                  placeholder="Last Name"
                  {...register("lastName", { required: true })}
                  required
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ width: "50%", paddingRight: "20px" }}>
                <label style={{ fontSize: "20px" }}>Email*</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Email"
                  {...register("email", {
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  required
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>
              <td style={{}}>
                <label style={{ fontSize: "20px" }}>Mobile No.*</label>
                <input
                  type="number"
                  className="form-control"
                  placeholder="Phone Number"
                  {...register("phone", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                  required
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>
            </tr>

            <tr className="form-group mb-2 ">
              <td colSpan={2}>
                <label style={{ fontSize: "20px" }}>Username</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Username"
                  {...register("userName", { required: false, maxLength: 20 })}
                  required
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>
            </tr>
            <tr>
              <td style={{ width: "50%", paddingRight: "20px" }}>
                <label style={{ fontSize: "20px" }}>Password*</label>
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
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>
              <td style={{}}>
                <label style={{ fontSize: "20px" }}>Confirm Password*</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Confirm Password"
                  {...register("confirmPassword", {
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>
            </tr>

            <tr>
              <td style={{ width: "50%", paddingRight: "20px" }}>
                <label style={{ fontSize: "20px" }}>Country*</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Country"
                  {...register("country", { required: true, maxLength: 20 })}
                  required
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>

              <td style={{}}>
                <label style={{ fontSize: "20px" }}>City*</label>
                <input
                  type="text"
                  className="form-control color-black"
                  placeholder="City"
                  {...register("city", { required: true, maxLength: 20 })}
                  required
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>
            </tr>
          </tbody>
        </Table>
        <label style={{ fontSize: "15px", marginBottom: "20px" }}>
          By signing up you will agree to our Privacy Policy and Terms &
          Conditions
        </label>
        <button
          type="submit"
          className="registerBtn"
          style={{
            width: "100%",
            color: "white",
            fontWeight: "bold",
            fontSize: "35px",
            borderRadius: "10px",
          }}
        >
          REGISTER
        </button>
      </form>
    </>
  );
};
export default User;
