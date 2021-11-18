import React from "react";
require("react-bootstrap/ModalHeader");


const Form = ({ onSubmit }) => {
  return (
    <div className="register">
      <div className="register__container">
        <div className="block" />
        <form onSubmit={onSubmit}>
          <div className="form-group mb-4">
            <label htmlFor="exampleInputEmail1">Username or Email</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter email"
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
          <div className="form-group mb-4 mt-2 pl-3" style = {{fontSize: "12px"}}>
            <label>
              Forgot Password?
            </label>
          </div>
          <div className="col text-center mb-2">
            <button
              type="submit"
              className="submitBtn"
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
        </form>
      </div>
    </div>
  );
};
export default Form;
