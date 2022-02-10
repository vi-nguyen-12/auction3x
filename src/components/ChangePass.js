import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import authServices from "../services/authServices";
import { useLocation, useHistory } from "react-router-dom";
require("react-bootstrap/ModalHeader");

const ChangePass = ({ toogleChangePass, colorChange }) => {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();
  const token = useLocation().search.split("=")[1];
  const history = useHistory();

  useEffect(() => {
    colorChange("black");
  }, []);

  const onSubmit = (data) => {
    const datas = {
      password: data.newPassword,
      token: token,
    };
    if (data.newPassword !== data.confirmPassword) {
      alert("Passwords do not match");
    } else {
      authServices.resetPassword(datas).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          history.push("/");
        }
      });
    }
  };
  return (
    <div>
      <div
        className="listDetail-content"
        style={{
          display: "grid",
          justifyContent: "center",
          height: "50vh",
          alignItems: "center",
          marginTop: "200px",
        }}
      >
        <div className="form-group mb-2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            <div className="form-group">
              <p style={{ justifyContent: "left", margin: "0" }}>
                Please enter the new password
              </p>
              <input
                type="password"
                className="form-control"
                placeholder="New Password"
                style={{ height: "40px", width: "300px" }}
                {...register("newPassword", {
                  required: true,
                })}
              />
            </div>
            <div className="form-group">
              <p
                style={{
                  justifyContent: "left",
                  margin: "0",
                  marginTop: "20px",
                }}
              >
                Please confirm the password
              </p>
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
                style={{ height: "40px" }}
                {...register("confirmPassword", {
                  required: true,
                })}
              />
            </div>
            <div
              className="form-group"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button
                type="submit"
                className="customButton mt-4"
                style={{ width: "80px", fontSize: "15px" }}
              >
                Change
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ChangePass;
