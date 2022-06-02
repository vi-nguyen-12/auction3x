import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import authServices from "../../services/authServices";
import { Modal, Row, Col, Button } from "react-bootstrap";
import "../../styles/modal.css";
import CloseButton from "react-bootstrap/CloseButton";

require("react-bootstrap/ModalHeader");

const User = ({ toggleSignUp, toggleSignIn, windowSize }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [terms, setTerms] = useState();
  const [privacy, setPrivacy] = useState();
  const [agent, setAgent] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const toogleTerms = () => setShowTerms(!showTerms);
  const tooglePrivacy = () => setShowPrivacy(!showPrivacy);
  const toggleAgent = () => setAgent(!agent);
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

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

  const onSubmit = (data) => {
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
    } else if (data.phone.length !== 10) {
      alert("Please enter a valid phone number!");
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
  };

  return (
    <>
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
              <label htmlFor="phone">Phone</label>
              <input
                type="number"
                min="0"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="phone"
                placeholder="Enter Phone"
                name="phone"
                {...register("phone")}
              />
            </div>
          </Col>
        </Row>
        <Row style={{ margin: "20px 0" }}>
          <Col>
            <div className="form-group">
              <label htmlFor="country">Country</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="country"
                placeholder="Enter Country"
                name="country"
                {...register("country")}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label htmlFor="state">State</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="state"
                placeholder="Enter State"
                name="state"
                {...register("state")}
              />
            </div>
          </Col>
          <Col>
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input
                type="text"
                style={{ height: "47px", borderRadius: "8px" }}
                className="form-control"
                id="city"
                placeholder="Enter City"
                name="city"
                {...register("city")}
              />
            </div>
          </Col>
        </Row>

        <Row style={{ margin: "20px 0" }}>
          <Col style={{ display: "flex", justifyContent: "space-evenly" }}>
            <Button>Individual</Button>
            <Button onClick={toggleAgent}>Agent</Button>
          </Col>
        </Row>

        {agent === true && (
          <Row style={{ margin: "20px 0" }}>
            <Col>
              <div className="form-group">
                <label htmlFor="agentNumber">
                  Agent License Number <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  type="text"
                  style={{ height: "47px", borderRadius: "8px" }}
                  className="form-control"
                  id="agentNumber"
                  placeholder="Enter Agent License Number"
                  name="agentNumber"
                  {...register("agentNumber")}
                  required
                />
              </div>
            </Col>
            <Col>
              <div className="form-group">
                <label htmlFor="agentFile">
                  Agent License File <span style={{ color: "red" }}> *</span>
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="agentFile"
                  placeholder="Enter Agent License File"
                  name="agentFile"
                  {...register("agentFile")}
                  required
                />
              </div>
            </Col>
          </Row>
        )}

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
