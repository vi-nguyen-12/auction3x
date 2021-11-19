import React, {useState, useEffect} from "react";
import Toast from "./Toast"
import axios from "axios"
require("react-bootstrap/ModalHeader");


const Form = () => {
  const [showWarning, setShowWarning]=useState(false);
  const onSubmit=(data)=>{
    const getUser=async()=>{
      const user=await axios.post("http://localhost:5000/api/user/login",{data})
      console.log(user)
      if(!user.isActive){
        setShowWarning(true)
      }
    }
    getUser();
  }
  return (
    <>
    {showWarning &&<Toast type="warning" message="Warning! Your email verification process has not been done. We have sent the link"/>}
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
    </>
  );
};
export default Form;
