import React from "react";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useHistory } from "react-router-dom";

function ReconfirmEmail({ toggleConfirmModal, toggleSignIn }) {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    authService.resendConfirmEmail(data).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(res.data.message);
        history.push("/");
      }
    });
  };
  return (
    <>
      <div className="form-group mb-2 p-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <p style={{ justifyContent: "left" }}>
              Please enter the account email
            </p>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              style={{ height: "45px" }}
              {...register("email", {
                required: true,
                pattern: /^\S+@\S+$/i,
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
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReconfirmEmail;
