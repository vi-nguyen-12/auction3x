import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";

function ForgotPass({ toggleForgotPass, toggleChangePass, setMessage }) {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    //authServices.verify(data);
    authServices.forgotPassword(data).then((response) => {
      if (response.data.error) {
        setMessage("");
        setMessage(response.data.error);
      } else {
        setMessage("");
        setTimeout(() => {
          setMessage("Password reset link has been sent to your email");
        }, 100);
        toggleForgotPass();
      }
    });
  };
  return (
    // reset password
    <form style={{ padding: "50px 20px" }} onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label style={{ fontSize: "25px", color: "black" }}>
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
      <div className="form-group" style={{ display: "flex" }}>
        <button type="submit" className="login-modal-btn mt-3 fw-bold w-100">
          CONTINUE
        </button>
      </div>
    </form>
  );
}

export default ForgotPass;
