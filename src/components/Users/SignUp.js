import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import { Modal, Row, Col, Button } from "react-bootstrap";
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
  const [files, setFiles] = useState([]);
  const [privacy, setPrivacy] = useState("");
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState();
  const toggleTerms = () => setShowTerms(!showTerms);
  const togglePrivacy = () => setShowPrivacy(!showPrivacy);

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
    if (data.password !== data.confirmPassword) {
      setMessage("");
      setTimeout(() => {
        setMessage("Passwords do not match");
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
      {/* <div>
        <Button
          className="signup-link"
          onClick={() => {
            toggleSignIn();
            toggleSignUp();
          }}
        >
          Already Registered? Sign In
        </Button>
      </div> */}
      <form onSubmit={handleSubmit(onSubmit)} className="pb-3">
        <Row>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="firstName">
                First Name <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="firstName"
                placeholder="Enter First Name"
                name="firstName"
                {...register("firstName")}
                required
              />
            </div>
          </Col>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="lastName">
                Last Name
                <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="lastName"
                placeholder="Enter Last Name"
                name="lastName"
                {...register("lastName")}
                required
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="userName">
                User Name <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="userName"
                placeholder="Enter User Name"
                name="userName"
                {...register("userName")}
                required
              />
            </div>
          </Col>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="email">
                Email <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="email"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="email"
                placeholder="Enter Email"
                name="email"
                {...register("email")}
                required
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="password">
                Password <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="password"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="password"
                placeholder="Enter Password"
                name="password"
                {...register("password")}
                required
              />
            </div>
          </Col>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="confirmPassword">
                Confirm Password <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="password"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="confirmPassword"
                placeholder="Confirm Password"
                name="confirmPassword"
                {...register("confirmPassword")}
                required
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col>
            <div className="form-group">
              <label htmlFor="phone">
                Phone <span style={{ color: "red" }}> *</span>
              </label>
              <PhoneInput
                disableCountryCode={false}
                onlyCountries={["ca", "us", "gb", "au"]}
                disableDropdown={false}
                country={"us"}
                dropdownStyle={{ paddingLeft: "0!important" }}
                value={phone ? phone : null}
                inputStyle={{ width: "100%" }}
                buttonStyle={{
                  borderRight: "none",
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
        <Row style={{ margin: "20px 0" }}>
          <Col md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="country">
                Country <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="country"
                placeholder="Enter Country"
                name="country"
                {...register("country")}
                required
              />
            </div>
          </Col>
          {/* <Col md={4} xs={12}>
            <div className="form-group">
              <label htmlFor="state">
                State <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="state"
                placeholder="Enter State"
                name="state"
                {...register("state")}
                required
              />
            </div>
          </Col> */}
          <Col md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="city">
                City <span style={{ color: "red" }}> *</span>
              </label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="city"
                placeholder="Enter City"
                name="city"
                {...register("city")}
                required
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "50px 0" }}>
          <h1 style={{ fontSize: "1.3rem", paddingTop: "0" }}>
            Are you a Broker? (Optional){" "}
          </h1>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="agentNumber">Broker License Number</label>
              <input
                type="text"
                className="form-control"
                id="agentNumber"
                placeholder="Enter Agent License Number"
                name="agentNumber"
                onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
                {...register("agentNumber")}
              />
            </div>
          </Col>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="agentFile">Broker License/Certificate</label>
              <input
                type="file"
                className="form-control"
                id="agentFile"
                placeholder="Enter Agent License Files"
                name="agentFile"
                {...register("agentFile", { onChange: onChange })}
                multiple
              />
            </div>
            {files.length > 0 && (
              <div>
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
