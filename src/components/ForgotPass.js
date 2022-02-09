import react from "react";
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
    <>
      <div>
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
      </div>
    </>
  );
}

export default ForgotPass;
