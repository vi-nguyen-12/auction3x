import { useEffect } from "react";
import { useLocation, useHistory } from "react-router-dom";
import authServices from "../../services/authServices";

function Confirm({ setMessage }) {
  const token = useLocation().search.split("=")[1];
  const history = useHistory();

  useEffect(() => {
    authServices
      .confirmEmail(token)
      .then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setMessage("");
          setMessage(res.data.message);
          history.push("/");
        }
      })
      .catch((err) => {
        setMessage("");
        setMessage(err.message);
      });
  }, []);

  return (
    <div>
      <div
        className="wrapper"
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
