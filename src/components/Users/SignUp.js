import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import { Modal, Row, Col, Button } from "react-bootstrap";
import "../../styles/modal.css";
import CloseButton from "react-bootstrap/CloseButton";
import Loading from "../../components/Loading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";
import parse from "html-react-parser";

require("react-bootstrap/ModalHeader");

const User = ({ toggleSignUp, toggleSignIn, windowSize }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [terms, setTerms] = useState("");
  const [files, setFiles] = useState([]);
  const [privacy, setPrivacy] = useState("");
  const [agent, setAgent] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [loader, setLoader] = useState(false);
  const [phone, setPhone] = useState();
  const toggleTerms = () => setShowTerms(!showTerms);
  const togglePrivacy = () => setShowPrivacy(!showPrivacy);
  const toggleAgent = () => setAgent(!agent);
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
        alert(response.data.error);
      } else {
        setFiles([...files, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  useEffect(() => {
    let params = new URLSearchParams();
    params.append("officialName", "TC_user");
    params.append("officialName", "privacy_policy");
    authServices
      .getDocuments(params)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          console.log(res.data);
          for (let doc of res.data) {
            if (doc.officialName === "TC_user") {
              console.log(doc.official);
              setTerms(doc.htmlText);
            }
            if (doc.officialName === "privacy_policy") {
              console.log(doc.htmlText);
              setPrivacy(doc.htmlText);
            }
          }
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const handleDelete = (url) => () => {
    setFiles(files.filter((document) => document.url !== url));
  };

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
    } else {
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
            alert(response.data.error);
          } else {
            toggleSignUp();
            alert("Please check your email to verify your account");
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
            alert(response.data.error);
          } else {
            toggleSignUp();
            alert("Please check your email to verify your account");
            // toggleConfirmModal();
          }
        });
      }
    }
  };

  return (
    <>
      {loader ? <Loading /> : null}
      <Modal.Header
        style={{ paddingTop: "20px" }}
        contentclassname="modal-head-signup"
        closeButton
      >
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{
            color: "#D58F5C",
            fontSize: windowSize > 800 ? "35px" : "23px",
            fontWeight: "bold",
            padding: "0",
            lineHeight: "1",
          }}
          contentclassname="custom-modal-title"
        >
          REGISTER ON AUCTION3
          <div>
            <Button
              className="signup-link"
              onClick={() => {
                toggleSignIn();
                toggleSignUp();
              }}
            >
              Already Registered? Sign In
            </Button>
          </div>
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row style={{ margin: "20px 0" }}>
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
                onChange={setPhone}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col md={4} xs={12}>
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
          <Col md={4} xs={12}>
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
          </Col>
          <Col md={4} xs={12}>
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
            Are you an agent? (Optional){" "}
          </h1>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="agentNumber">Agent License Number</label>
              <input
                type="text"
                className="form-control"
                id="agentNumber"
                placeholder="Enter Agent License Number"
                name="agentNumber"
                {...register("agentNumber")}
              />
            </div>
          </Col>
          <Col className="mb-2" md={6} xs={12}>
            <div className="form-group">
              <label htmlFor="agentFile">Agent License/Certificate</label>
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
        <button type="submit" className="signUpBtn">
          REGISTER
        </button>
      </form>
      <Modal size="xl" show={showTerms} onHide={toggleTerms} centered>
        <Modal.Header closeButton>
          <Modal.Title> User Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body>{parse(terms)}</Modal.Body>
      </Modal>

      <Modal size="xl" show={showPrivacy} onHide={togglePrivacy} centered>
        <Modal.Header closeButton>
          <Modal.Title>Privacy Policy</Modal.Title>
        </Modal.Header>
        <Modal.Body>{parse(privacy)}</Modal.Body>
      </Modal>
    </>
  );
};
export default User;
