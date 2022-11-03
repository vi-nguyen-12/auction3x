import React from "react";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useHistory } from "react-router-dom";

function ReconfirmEmail({ setMessage }) {
  const { register, handleSubmit } = useForm();
  const history = useHistory();

  const onSubmit = (data) => {
    authService.resendConfirmEmail(data).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setMessage("");
        setMessage(res.data.message);
        history.push("/");
      }
    });
  };
  return (
    <>
      <div className="form-group p-4">
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
            style={{ display: "flex", justifyContent: "flex-end" }}
          >
            <button type="submit" className="login-modal-btn mt-3 w-100">
              SEND
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ReconfirmEmail;
