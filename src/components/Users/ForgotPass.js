import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import { IoMdMail } from "react-icons/io";

function ForgotPass({ toggleForgotPass, setMessage }) {
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
    <form className="px-2 py-3" onSubmit={handleSubmit(onSubmit)}>
      <p className="text-center px-3">
        Please enter your email associated with your account to reset your
        password.
      </p>
      <div className="form-group mt-4 d-flex justify-content-between align-items-center">
        <input
          type="email"
          className="form-control custom-input px-2"
          placeholder="Email"
          style={{ height: "50px", fontSize: "20px" }}
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+$/i,
          })}
        />
        <div className="eyes_container" style={{ right: "7%" }}>
          <IoMdMail className="eye-icon" size={23} color="#7e7e7e" />
        </div>
      </div>
      <div className="form-group" style={{ display: "flex" }}>
        <button type="submit" className="login-modal-btn mt-3 fw-bold w-100">
          SEND
        </button>
      </div>
    </form>
  );
}

export default ForgotPass;
