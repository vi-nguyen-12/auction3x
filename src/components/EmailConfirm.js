import react, { useEffect } from "react";
import Toast from "./Toast";
import { useForm } from "react-hook-form";
import { useLocation, useHistory } from "react-router-dom";
import authServices from "../services/authServices";

function Confirm({ colorChange }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const token = useLocation().search.split("=")[1];
  const history = useHistory();

  useEffect(async () => {
    colorChange("black");
    authServices.confirmEmail(token).then((res) => {
      console.log(res);
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(res.data.message);
        history.push("/");
      }
    });
  }, []);

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
          <>Email Confirm!</>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
