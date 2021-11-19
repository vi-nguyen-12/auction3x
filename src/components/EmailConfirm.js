import react from "react";
import Toast from "./Toast";
import { useForm } from "react-hook-form";
import authServices from "../services/authServices";

function Confirm({ConfirmmodalClose, FormmodalOpen}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    authServices.verify(data);
    console.log(data)
    ConfirmmodalClose();
    FormmodalOpen();
  };
  return (
    // Email code confirmation modal
    <>
      <Toast
        type="warning"
        message="Warning! Your email verification process has not been done. We have sent the link"
      />
      <div>
        <div className="form-group mb-2">
          <h2>Confirm your email</h2>
          <p>Please enter the code sent to your email</p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  pattern: /^\S+@\S+$/i,
                })}
              />
            </div>
            <div className="form-group">
              <label>Code</label>
              <input
                type="text"
                className="form-control"
                name="code"
                {...register("token", {required: true})}
              />
            </div>
            <div
              className="form-group"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <button type="submit" className="btn btn-primary mt-3">
                Confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Confirm;
