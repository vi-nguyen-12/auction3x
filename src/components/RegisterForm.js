import React from "react";
require("react-bootstrap/ModalHeader");

const RegisterForm = ({ onSubmit }) => {
  return (
    <div className="register">
      <div className="register__container">
        <div className="block" />
        <form onSubmit={onSubmit}>
          <div className="form-group mb-3">
              Username
            <input
              type="text"
              className="form-control"
              placeholder="Username"
            />
          </div>
          <div className="form-group mb-3">
            <input type="email" className="form-control" placeholder="Email" />
          </div>
          <div className="form-group mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
            />
          </div>
          <div className="form-group mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Confirm Password"
            />
          </div>
        </form>
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
      </div>
    </div>
  );
};

export default RegisterForm;
