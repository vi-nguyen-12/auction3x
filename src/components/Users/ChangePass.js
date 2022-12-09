import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import { useLocation, useHistory } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { GoCheck } from "react-icons/go";
import { RiEyeCloseLine, RiEyeLine } from "react-icons/ri";
import { ProgressBar } from "react-bootstrap";
import "../../styles/resetPass.css";

const ChangePass = ({ colorChange, toggleShow, setMessage, windowSize }) => {
  const [passMatch, setPassMatch] = useState(false);
  const [hidden, setHidden] = useState(true);
  const [passStrong, setPassStrong] = useState("");
  const [newPass, setNewPass] = useState();
  const { register, handleSubmit } = useForm();
  const token = useLocation().search.split("=")[1];
  const history = useHistory();
  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  var mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

  const handleCheckStrength = (e) => {
    const password = e.target.value;
    setNewPass(password);

    if (password.match(strongRegex)) {
      setPassStrong("strong");
    } else if (password.match(mediumRegex)) {
      setPassStrong("medium");
    } else {
      setPassStrong("weak");
    }
  };

  const handleCheckMatch = (e) => {
    const password = e.target.value;
    if (password === newPass) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  const onSubmit = (data) => {
    const datas = {
      password: data?.newPassword || newPass,
      token: token,
    };
    if (!passMatch) {
      setMessage("");
      setTimeout(() => {
        setMessage("Passwords do not match");
      }, 100);
    } else if (passStrong === "weak") {
      setMessage("");
      setTimeout(() => {
        setMessage("Password is too weak");
      }, 100);
    } else {
      authServices.resetPassword(datas).then((response) => {
        if (response.data.error) {
          setMessage("");
          setMessage(response.data.error);
        } else {
          setMessage("");
          setMessage("Successfully Change Password!");
          history.push("/");
          window.location.reload();
        }
      });
    }
  };

  useEffect(() => {
    colorChange("black");
    toggleShow(false);
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ padding: windowSize > 600 && "0 15%" }}
    >
      <div className="resetPass_Container py-4">
        <Row className="h-100 inputs_container">
          <Col
            md={windowSize < 1200 ? 12 : 5}
            xs={12}
            className="d-grid align-items-center"
            style={{ padding: windowSize > 1300 ? "0 3rem" : "0 1rem" }}
          >
            <div className="d-grid justify-content-center align-items-center">
              <h3 className="resetPass_Title mb-4">Change Password</h3>
              <span className="resetPass_Subtitle">
                Passwords must contain:
              </span>
              <ul className="resetPass_List mt-2">
                <div className="d-flex align-items-center my-2">
                  <GoCheck size={18} color="#6edc83" />
                  <li className="resetPass_ListItem mx-2">
                    At least 8 characters
                  </li>
                </div>
                <div className="d-flex align-items-center my-2">
                  <GoCheck size={18} color="#6edc83" />
                  <li className="resetPass_ListItem mx-2">
                    At least 1 upper case letter
                  </li>
                </div>
                <div className="d-flex align-items-center my-2">
                  <GoCheck size={18} color="#6edc83" />
                  <li className="resetPass_ListItem mx-2">
                    At least 1 lower case letter
                  </li>
                </div>
                <div className="d-flex align-items-center my-2">
                  <GoCheck size={18} color="#6edc83" />
                  <li className="resetPass_ListItem mx-2">At least 1 number</li>
                </div>
                <div className="d-flex align-items-center my-2">
                  <GoCheck size={18} color="#6edc83" />
                  <li className="resetPass_ListItem mx-2">
                    At least 1 special character
                  </li>
                </div>
              </ul>
            </div>
          </Col>
          <Col
            md={windowSize < 1200 ? 12 : 7}
            xs={12}
            className="d-grid align-items-center"
            style={{ padding: windowSize > 1300 ? "0 3rem" : "0 1rem" }}
          >
            <form className="resetPass_Form" onSubmit={handleSubmit(onSubmit)}>
              <div
                className="new_pass_container d-flex justify-content-between align-items-center"
                style={{
                  border: passStrong === "strong" && "1px solid #89e29a",
                }}
              >
                <input
                  type={!hidden ? "text" : "password"}
                  className="form-control my-3 resetPass_Input border-0"
                  placeholder="New Password"
                  {...register("newPassword ", { required: true })}
                  style={{
                    height: "50px",
                  }}
                  onChange={handleCheckStrength}
                  required
                />
                <div
                  style={{
                    cursor: "pointer",
                  }}
                  className="px-3"
                >
                  {hidden ? (
                    <RiEyeCloseLine
                      className="eye-icon"
                      onClick={() => setHidden(false)}
                      size={23}
                    />
                  ) : (
                    <RiEyeLine
                      className="eye-icon"
                      onClick={() => setHidden(true)}
                      size={23}
                    />
                  )}
                </div>
              </div>
              <div style={{ width: "150px" }} className="mt-2">
                <ProgressBar className="rounded-0" style={{ height: "0.3rem" }}>
                  <ProgressBar
                    animated
                    now={
                      passStrong === "strong"
                        ? 100
                        : passStrong === "medium"
                        ? 50
                        : 30
                    }
                    variant={
                      passStrong === "strong"
                        ? "success"
                        : passStrong === "medium"
                        ? "warning"
                        : "danger"
                    }
                  />
                </ProgressBar>
              </div>
              <div
                style={{ width: "150px" }}
                className="d-flex justify-content-end"
              >
                <small className="text-muted">
                  {passStrong === "strong"
                    ? "Strong"
                    : passStrong === "medium"
                    ? "Medium"
                    : "Weak"}
                </small>
              </div>
              <input
                type="password"
                className="form-control my-3 mb-4 resetPass_Input"
                placeholder="Confirm Password"
                {...register("confirmPassword", { required: true })}
                onChange={handleCheckMatch}
                style={{ border: passMatch && "1px solid #89e29a" }}
                required
              />
              <button className="general_btn w-100" type="submit">
                SUBMIT
              </button>
            </form>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default ChangePass;
