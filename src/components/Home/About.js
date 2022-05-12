import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import Login from "../Users/Login";
import ForgotPass from "../Users/ForgotPass";
import ChangePass from "../Users/ChangePass";
import ReconfirmEmail from "../Users/ReconfirmEmail";
import SignUp from "../Users/SignUp";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/About.css";

const About = () => {
  const user = useSelector((state) => state.user);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [showButton, popButton] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const toogleChangePass = () => popChangePass(!changePass);
  const toogleButton = () => popButton(!showButton);
  const toogleForgotPass = () => popForgotPass(!forgotPass);
  const toogleSignIn = () => popSignIn(!showSignIn);
  const toogleSignUp = () => popUpSignUp(!showSignUp);
  const toogleConfirmModal = () => popupConfirm(!showConfirm);

  const history = useHistory();

  return (
    <section className="real-estate-wrap">
      <Row className="banner-container">
        <Col

          style={{ padding: "0", margin: "0" }}
          className="banner-top-left"
        >
          <img src="./images/investors.PNG" style={{ width: "100%" }} alt="" />
        </Col>
        <Col className="banner-top-right">
          <h2>INVESTORS / BUYERS</h2>
          <p>
            AUCTION 3 positioned itself as the leading marketplace for
            professional real estate investors to auction platform for buying
            and selling their properties. It brings an opportunity for an
            investor to execute the transaction with greater eciency and higher
            prots.
          </p>

          <div className="button-container">
            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "auto" });
              }}
            >
              BUY
            </button>
            <div className="side-button">
              <button
                onClick={() => {
                  user._id ? history.push("/MultiSellForm") : toogleSignIn();
                }}
              >
                SELL
              </button>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="banner-container">
        <Col
          style={{ padding: "0", margin: "0" }}
          className="banner-top-left-2">
          <h2>BROKER</h2>
          <p>
            AUCTION 3 positioned itself as the leading marketplace for
            professional real estate investors to auction platform for buying
            and selling their properties. It brings an opportunity for an
            investor to execute the transaction with greater eciency and higher
            prots
          </p>
          <div className="button-container">
            <button
              onClick={() => {
                history.push("/Partner");
              }}
            >
              Partner with us
            </button>
          </div>
        </Col>
        <Col
          style={{ padding: "0", margin: "0" }}
          className="banner-top-left"
        >
          <img src="./images/broker.PNG" style={{ width: "100%" }} alt="" />
        </Col>
      </Row>
      {/* <Row className="bottom-container" style={{ padding: "50px" }}>
        <Col className="banner-left">
          <h2>Stay updated with Auction 3</h2>
          <p>
            Receive the beautifully curated selection of what's trending in
            luxury with inside stories and tips from our experts.
          </p>
        </Col>
        <Col className="banner-right">
          <div className="content-right">
            <input type="text" placeholder="Enter your email address" />
            <div style={{ display: "block", paddingTop: "20px" }}>
              <button>SUBSCRIBE</button>
            </div>
          </div>
        </Col>
      </Row> */}

      <Modal
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showConfirm}
        onHide={toogleConfirmModal}
        contentclassname="confirm"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{ color: "#D58F5C" }}
          >
            Confirm Email
          </Modal.Title>
          <Modal.Title
            className="pt-4"
            style={{
              fontSize: "12px",
              color: "#D58F5C",
              position: "absolute",
              marginright: "10px",
              marginTop: "8px",
            }}
          ></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReconfirmEmail
            toogleConfirmModal={toogleConfirmModal}
            toogleSignIn={toogleSignIn}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size="md"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={forgotPass}
        onHide={toogleForgotPass}
        contentclassname="forgotPass"
      >
        <Modal.Body contentclassname="forgotPass" className="forgot-modal">
          <ForgotPass
            toogleForgotPass={toogleForgotPass}
            toogleChangePass={toogleChangePass}
          />
        </Modal.Body>
      </Modal>
      <Modal
        size="md"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={forgotPass}
        onHide={toogleForgotPass}
        contentclassname="forgotPass"
      >
        <Modal.Header closeButton>
          <Modal.Title
            id="contained-modal-title-vcenter"
            style={{
              color: "#D58F5C",
              fontSize: "30px",
              fontWeight: "bold",
            }}
          >
            Forgot Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ForgotPass
            toogleForgotPass={toogleForgotPass}
            toogleChangePass={toogleChangePass}
          />
        </Modal.Body>
      </Modal>

      <Modal
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={changePass}
        onHide={toogleChangePass}
        contentclassname="forgotPass"
      >
        <Modal.Body>
          <ChangePass toogleChangePass={toogleChangePass} />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignIn}
        onHide={toogleSignIn}
        contentclassname="login"
      >
        <Modal.Body className="sign-In"></Modal.Body>
      </Modal>

      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignIn}
        onHide={toogleSignIn}
        contentclassname="login"
      >
        <Modal.Body>
          <Login
            toogleSignUp={toogleSignUp}
            toogleSignIn={toogleSignIn}
            toogleButton={toogleButton}
            toogleForgotPass={toogleForgotPass}
            toogleConfirmModal={toogleConfirmModal}
          />
        </Modal.Body>
      </Modal>

      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignUp}
        onHide={toogleSignUp}
        contentclassname="custom-modal-style"
      >
        <Modal.Body className="sign-Up"></Modal.Body>
      </Modal>

      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignUp}
        style={{ borderRadius: "30px" }}
        onHide={toogleSignUp}
        contentclassname="custom-modal-style"
      >
        <Modal.Body>
          <SignUp
            toogleSignUp={toogleSignUp}
            toogleConfirmModal={toogleConfirmModal}
            toogleSignIn={toogleSignIn}
          />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default About;
