import React from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import { Modal, Table, Row, Col } from "react-bootstrap";
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
    } else if (data.phone.length !== 10) {
      alert("Please enter a valid phone number!");
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
          <div>
            <button
              style={{ marginTop: "35px" }}
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
        <Row style={{ margin: "30px 0" }}>
          <Col>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="firstName"
                placeholder="Enter First Name"
                name="firstName"
                {...register("firstName")}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="lastName"
                placeholder="Enter Last Name"
                name="lastName"
                {...register("lastName")}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "30px 0" }}>
          <Col>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="userName"
                placeholder="Enter User Name"
                name="userName"
                {...register("userName")}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                {...register("email")}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "30px 0" }}>
          <Col>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="password"
                placeholder="Enter Password"
                name="password"
                {...register("password")}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
                {...register("confirmPassword")}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "30px 0" }}>
          <Col>
            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="phone"
                placeholder="Enter Phone"
                name="phone"
                {...register("phone")}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "30px 0" }}>
          <Col>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="country"
                placeholder="Enter Country"
                name="country"
                {...register("country")}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="state"
                placeholder="Enter State"
                name="state"
                {...register("state")}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="city"
                placeholder="Enter City"
                name="city"
                {...register("city")}
              />
            </div>
          </Col>
        </Row>
        {/* <Table borderless style={{ marginBottom: "13px" }}>
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

              <td>
                <label style={{ fontSize: "20px" }}>State*</label>
                <input
                  type="text"
                  className="form-control color-black"
                  placeholder="State"
                  {...register("state", { maxLength: 20 })}
                  required
                  style={{
                    height: "50px",
                    fontSize: "15px",
                    borderRadius: "8px",
                  }}
                />
              </td>

              <td>
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
        </Table> */}
        <label
          style={{ fontSize: "15px", marginBottom: "20px", color: "black" }}
        >
          By signing up you will agree to our Privacy Policy and Terms &
          Conditions
        </label>
        <button
          type="submit"
          className="signUpBtn"
        >
          REGISTER
        </button>
      </form>
    </>
  );
};
export default User;
