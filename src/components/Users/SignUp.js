import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import { Modal, Row, Col, Button } from "react-bootstrap";
import "../../styles/modal.css";
import CloseButton from "react-bootstrap/CloseButton";
import Loading from "../../components/Loading";

require("react-bootstrap/ModalHeader");

const User = ({ toggleSignUp, toggleSignIn, windowSize }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [terms, setTerms] = useState();
  const [file, setFile] = useState([]);
  const [privacy, setPrivacy] = useState();
  const [agent, setAgent] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [loader, setLoader] = useState(false);
  const toogleTerms = () => setShowTerms(!showTerms);
  const tooglePrivacy = () => setShowPrivacy(!showPrivacy);
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
        setFile([...file, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  useEffect(() => {
    authServices.getDocuments().then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        res.data.filter((doc) => {
          if (doc.officialName === "TC_user") {
            setTerms(doc.url);
          }
        });
      }
    });
  }, []);

  const handleDelete = (url) => () => {
    setFile(file.filter((document) => document.url !== url));
  };

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
    } else if (data.phone.length !== 10) {
      alert("Please enter a valid phone number!");
    } else {
      if (data.agentNumber !== "") {
        const datas = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone,
          userName: data.userName,
          country: data.country,
          city: data.city,
          agent: {
            licenseNumber: data.agentNumber,
            licenseDocument: { ...file },
          },
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
      } else {
        const datas = {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          phone: data.phone,
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
        style={{ paddingTop: "50px" }}
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
          <Col>
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
          <Col>
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
          <Col>
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
          <Col>
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
          <Col>
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
          <Col>
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
              <input
                type="number"
                min="0"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="phone"
                placeholder="Enter Phone"
                name="phone"
                {...register("phone")}
                required
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col>
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
          <Col>
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
          <Col>
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
          <h1>Are you an agent? (Optional) </h1>
          <Col>
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
          <Col>
            <div className="form-group">
              <label htmlFor="agentFile">Agent License/Certificate</label>
              <input
                type="file"
                className="form-control"
                id="agentFile"
                placeholder="Enter Agent License File"
                name="agentFile"
                {...register("agentFile", { onChange: onChange })}
                multiple
              />
            </div>
            {file.length > 0 && (
              <div>
                {file.map((file, index) => (
                  <ul key={index}>
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
          <span style={{ color: "#00a8ff", cursor: "pointer" }}>
            {" "}
            Privacy Policy
          </span>{" "}
          and
          <span
            onClick={() => toogleTerms()}
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
      <Modal size="xl" show={showTerms} onHide={toogleTerms} centered>
        <Modal.Body style={{ height: "90vh" }}>
          <div>
            <CloseButton className="modal-close" onClick={toogleTerms} />
          </div>
          <iframe title="terms" src={terms} width="100%" height="90%" />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default User;
