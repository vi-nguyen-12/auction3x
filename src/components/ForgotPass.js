import react from "react";
import Toast from "./Toast";
import { useForm } from "react-hook-form";
import authServices from "../services/authServices";

function ForgotPass({ toogleForgotPass, toogleChangePass }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //authServices.verify(data);
    authServices.forgotPassword(data).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        alert("Password reset link has been sent to your email");
        toogleForgotPass();
      }
    });
  };
  return (
    // reset password



    <form style={{ height: "300px", padding: "50px 20px" }} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label style={{ fontSize: "25px" }}>
          Please enter the account email
        </label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          style={{ height: "50px", fontSize: "20px" }}
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
          style={{
            width: "100px",
            color: "white",
            fontWeight: "bold",
            fontSize: "15px",
          }}
        >
          SEND
        </button>
      </div>
    </form>

  );
}

export default ForgotPass;
