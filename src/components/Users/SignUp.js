import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ProgressBar } from "react-bootstrap";
import authServices from "../../services/authServices";
import { Modal, Row, Col, Button } from "react-bootstrap";
import { IoIosCloseCircle } from "react-icons/io";
import { IoCheckmarkCircleSharp } from "react-icons/io5";
import "../../styles/modal.css";
import Loading from "../../components/Loading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import parse from "html-react-parser";
import CloseButton from "react-bootstrap/CloseButton";
require("react-bootstrap/ModalHeader");

const User = ({ toggleSignUp, toggleSignIn, windowSize, setMessage }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [terms, setTerms] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [passMatch, setPassMatch] = useState(false);
  const [passStrong, setPassStrong] = useState("");
  const [files, setFiles] = useState([]);
  const [privacy, setPrivacy] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState();
  const [expireDate, setExpireDate] = useState();
  const toggleTerms = () => setShowTerms(!showTerms);
  const togglePrivacy = () => setShowPrivacy(!showPrivacy);

  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  var mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

  const handleCheckStrength = (e) => {
    const password = e.target.value;
    setPass(password);

    if (password.match(strongRegex)) {
      setPassStrong("strong");
    } else if (password.match(mediumRegex)) {
      setPassStrong("medium");
    } else {
      setPassStrong("weak");
    }
  };

  const fixDate = (date) => {
    const newDate = new Date(date).setDate(
      new Date(date).getDate() + 1 <= 31 ? new Date(date).getDate() + 1 : 1
    );
    const dates = new Date(newDate).setMonth(
      new Date(newDate).getDate() === 1
        ? new Date(newDate).getMonth() + 1
        : new Date(newDate).getMonth()
    );
    setExpireDate(new Date(dates)?.toISOString() || "");
  };

  const handleCheckMatch = (e) => {
    const password = e.target.value;
    setConfirmPass(password);
    if (password === pass) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const onChange = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authServices.saveDocuments(formData).then((response) => {
      if (response.data.error) {
        setMessage("");
        setMessage(response.data.error);
        setLoader(false);
      } else {
        setFiles([...files, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  useEffect(() => {
    let params = new URLSearchParams();
    params.append("name", "TC_user");
    params.append("name", "privacy_policy");
    authServices
      .getPageContents(params)
      .then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          for (let item of res.data) {
            if (item.name === "TC_user") {
              setTerms(item.htmlText);
            }
            if (item.name === "privacy_policy") {
              setPrivacy(item.htmlText);
            }
          }
        }
      })
      .catch((error) => {
        setMessage("");
        setMessage(error.message);
      });
  }, []);

  const handleDelete = (url) => () => {
    setFiles(files.filter((document) => document.url !== url));
  };

  const onSubmit = (data) => {
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
    } else if (data.email?.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      if (data.agentNumber !== "") {
        const datas = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone ? data.phone : phone,
          userName: data.userName,
          country: data.country,
          city: data.city,
          agent: {
            licenseNumber: data.agentNumber,
            licenseDocument: files,
            licenseExpireDate: expireDate,
            licenseState: data.licenseState,
          },
        };
        authServices.register(datas).then((response) => {
          if (response.data.error) {
            setMessage("");
            setMessage(response.data.error);
          } else {
            setMessage("");
            toggleSignUp();
            setTimeout(() => {
              setMessage("Please check your email to verify your account");
            }, 100);
          }
        });
      } else {
        const datas = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone ? data.phone : phone,
          userName: data.userName,
          country: data.country,
          city: data.city,
        };
        authServices.register(datas).then((response) => {
          if (response.data.error) {
            setMessage("");
            setMessage(response.data.error);
          } else {
            setMessage("");
            toggleSignUp();
            setTimeout(() => {
              setMessage("Please check your email to verify your account");
            }, 100);
            // toggleConfirmModal();
          }
        });
      }
    } else {
      setMessage("");
      setTimeout(() => {
        setMessage("Please enter a valid email address");
      }, 100);
    }
  };

  return (
    <>
      {loader ? <Loading /> : null}
      <form onSubmit={handleSubmit(onSubmit)} className="pb-3">
        <Row>
          <Col md={6} xs={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <input
                type="text"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="firstName"
                name="firstName"
                {...register("firstName")}
                required
              />
              <label htmlFor="firstName" className="input_label">
                First Name <span style={{ color: "red" }}> *</span>
              </label>
            </div>
          </Col>
          <Col md={6} xs={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <input
                type="text"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="lastName"
                name="lastName"
                {...register("lastName")}
                required
              />
              <label htmlFor="lastName" className="input_label">
                Last Name
                <span style={{ color: "red" }}> *</span>
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6} xs={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <input
                type="text"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="userName"
                name="userName"
                {...register("userName")}
                required
              />
              <label htmlFor="userName" className="input_label">
                Username <span style={{ color: "red" }}> *</span>
              </label>
            </div>
          </Col>
          <Col md={6} xs={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <input
                type="email"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="email"
                name="email"
                {...register("email")}
                required
              />
              <label htmlFor="email" className="input_label">
                Email <span style={{ color: "red" }}> *</span>
              </label>
            </div>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <input
                type="password"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="password"
                name="password"
                {...register("password")}
                onChange={handleCheckStrength}
                required
              />
              <label htmlFor="password" className="input_label">
                Password <span style={{ color: "red" }}> *</span>
              </label>
              {/* <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <p className="m-0">
                  <span
                    className="tooltip-left"
                    data-tooltip="
                    * Password must be at least 8 characters long
                    * Password must contain at least one uppercase letter
                    * Password must contain at least one lowercase letter
                    * Password must contain at least one number
                    * Password must contain at least one special character
                    "
                  >
                    <BsQuestionCircleFill
                      style={{ cursor: "pointer" }}
                      color="#bf9767"
                      size={30}
                    />
                  </span>{" "}
                </p>
              </div> */}
            </div>
          </Col>
          <Col md={12} className="d-grid align-items-center">
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
          </Col>
          <Col md={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <input
                type="password"
                style={{
                  height: "47px",
                }}
                className="form-control custom-input"
                id="confirmPassword"
                name="confirmPassword"
                {...register("confirmPassword")}
                onChange={handleCheckMatch}
                required
              />
              <label htmlFor="confirmPassword" className="input_label">
                Confirm Password <span style={{ color: "red" }}> *</span>
              </label>
              {confirmPass && (
                <div
                  className="position-absolute"
                  style={{ right: "5px", top: "10px" }}
                >
                  {passMatch ? (
                    <IoCheckmarkCircleSharp color="#6ac259" size={20} />
                  ) : (
                    <IoIosCloseCircle color="red" size={20} />
                  )}
                </div>
              )}
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col>
            <div className="form-group position-relative w-100">
              <label htmlFor="phone" className="px-1 mb-2">
                Phone <span style={{ color: "red" }}> *</span>
              </label>
              <PhoneInput
                disableCountryCode={false}
                onlyCountries={["us", "ca", "gb", "au", "in"]}
                disableDropdown={false}
                country={"us"}
                dropdownStyle={{ paddingLeft: "0!important" }}
                value={phone ? phone : null}
                inputStyle={{
                  width: "100%",
                  border: "0",
                  borderBottom: "1px solid #ececec",
                  borderRadius: "0",
                  height: "40px",
                }}
                buttonStyle={{
                  border: "0",
                  borderRadius: "0",
                }}
                inputProps={{
                  name: "phone",
                  required: true,
                }}
                onChange={setPhone}
              />
            </div>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col md={6} xs={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <input
                type="text"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="country"
                name="country"
                {...register("country")}
                required
              />
              <label htmlFor="country" className="input_label">
                Country <span style={{ color: "red" }}> *</span>
              </label>
            </div>
          </Col>
          <Col md={6} xs={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <input
                type="text"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="city"
                name="city"
                {...register("city")}
                required
              />
              <label htmlFor="city" className="input_label">
                City <span style={{ color: "red" }}> *</span>
              </label>
            </div>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col>
            <h1 style={{ fontSize: "1.3rem", paddingTop: "0" }}>
              Are you a Broker? (Optional){" "}
            </h1>
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={6} xs={12} className="d-flex align-items-end">
            <div className="form-group position-relative w-100">
              <label htmlFor="agentNumber">Broker License Number</label>
              <input
                type="text"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="agentNumber"
                name="agentNumber"
                placeholder=""
                onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                {...register("agentNumber")}
                // required
              />
            </div>
          </Col>
          <Col md={6} xs={12} className="d-flex align-items-center mt-3">
            <div className="form-group position-relative w-100">
              <label htmlFor="agentFile">Broker License/Certificate</label>
              <input
                type="file"
                className="form-control custom-input"
                id="agentFile"
                name="agentFile"
                {...register("agentFile", { onChange: onChange })}
                multiple
              />
            </div>
          </Col>
          {files.length > 0 && (
            <div className="d-flex justify-content-end">
              {files.map((file, index) => (
                <ul style={{ paddingLeft: "0.5rem" }} key={index}>
                  <li style={{ fontSize: "18px", listStyle: "none" }}>
                    {file.name}{" "}
                    <span>
                      <Button
                        onClick={handleDelete(file.url)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "red",
                          margin: "0",
                        }}
                      >
                        X
                      </Button>
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </Row>

        <Row className="mt-2 mb-5">
          <Col md={6} xs={12} className="d-flex align-items-end mt-3">
            <div className="form-group position-relative w-100">
              <label htmlFor="licenseState">Broker License State/Country</label>
              <input
                type="text"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="licenseState"
                name="licenseState"
                {...register("licenseState")}
              />
            </div>
          </Col>
          <Col md={6} xs={12} className="mt-3">
            <div className="form-group position-relative w-100">
              <label htmlFor="expireDate">License Expiration Date</label>
              <input
                type="date"
                style={{ height: "47px" }}
                className="form-control custom-input"
                id="expireDate"
                name="expireDate"
                onChange={(e) => fixDate(e.target.value)}
              />
            </div>
          </Col>
        </Row>

        <label
          style={{ fontSize: "15px", marginBottom: "20px", color: "black" }}
        >
          By signing up you will agree to our
          <span
            onClick={() => togglePrivacy()}
            style={{ color: "#00a8ff", cursor: "pointer" }}
          >
            {" "}
            Privacy Policy
          </span>{" "}
          and
          <span
            onClick={() => toggleTerms()}
            style={{ color: "#00a8ff", cursor: "pointer" }}
          >
            {" "}
            Terms & Conditions
          </span>
        </label>
        <button
          type="submit"
          className="login-modal-btn w-100"
          style={{ fontSize: "1.4rem" }}
        >
          REGISTER
        </button>
        <div className="d-flex justify-content-center align-items-center mt-3">
          <span style={{ fontSize: "1rem" }}>Already have an account?</span>
          <button
            type="button"
            onClick={() => {
              toggleSignUp();
              toggleSignIn();
            }}
            className="back-login-btn"
          >
            Log in
          </button>
        </div>
      </form>
      <Modal size="xl" show={showTerms} onHide={toggleTerms} centered>
        <Modal.Header className="login-modal-header">
          <Modal.Title className="auction-modal-title px-3">
            User Terms & Conditions
          </Modal.Title>
        </Modal.Header>
        <div
          style={{
            position: "absolute",
            top: windowSize < 600 ? "0" : "25px",
            right: windowSize < 600 ? "0" : "25px",
            zIndex: "999",
          }}
        >
          <CloseButton
            className="modal-close"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              toggleTerms();
            }}
          />
        </div>
        <Modal.Body unselectable="on" className="unselectable">
          {parse(terms)}
        </Modal.Body>
      </Modal>

      <Modal size="xl" show={showPrivacy} onHide={togglePrivacy} centered>
        <Modal.Header className="login-modal-header">
          <Modal.Title className="auction-modal-title px-3">
            Privacy Policy
          </Modal.Title>
        </Modal.Header>
        <div
          style={{
            position: "absolute",
            top: windowSize < 600 ? "0" : "25px",
            right: windowSize < 600 ? "0" : "25px",
            zIndex: "999",
          }}
        >
          <CloseButton
            className="modal-close"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              togglePrivacy();
            }}
          />
        </div>
        <Modal.Body unselectable="on" className="unselectable">
          {parse(privacy)}
        </Modal.Body>
      </Modal>
    </>
  );
};
export default User;
