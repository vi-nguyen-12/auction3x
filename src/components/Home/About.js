import React, { useState } from "react";
import { Row, Col, Modal } from "react-bootstrap";
import Login from "../Users/Login";
import ForgotPass from "../Users/ForgotPass";
import ChangePass from "../Users/ChangePass";
import ReconfirmEmail from "../Users/ReconfirmEmail";
import SignUp from "../Users/SignUp";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/about.css";

const About = () => {
  const user = useSelector((state) => state.user);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [showButton, popButton] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const toggleChangePass = () => popChangePass(!changePass);
  const toggleButton = () => popButton(!showButton);
  const toggleForgotPass = () => popForgotPass(!forgotPass);
  const toggleSignIn = () => popSignIn(!showSignIn);
  const toggleSignUp = () => popUpSignUp(!showSignUp);
  const toggleConfirmModal = () => popupConfirm(!showConfirm);

  const history = useHistory();

  return (
    <section className="about-wrap">
      <Row className="banner-container">
        <Col md={4} className="banner-top-left">
          <img src="./images/investors.PNG" height={450} alt="" />
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
                history.push("/Auctions");
              }}
            >
              BUY
            </button>
            <button
              onClick={() => {
                user._id ? history.push("/MultiSellForm") : toggleSignIn();
              }}
            >
              SELL
            </button>
          </div>
        </Col>
      </Row>
      <Row className="banner-container">
        <Col className="banner-top-left-2">
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
        <Col className="banner-top-left">
          <img src="./images/broker.PNG" height={450} alt="" />
        </Col>
      </Row>
      <Row className="banner-container-1">
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
      </Row>

      <Modal
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showConfirm}
        onHide={toggleConfirmModal}
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
            toggleConfirmModal={toggleConfirmModal}
            toggleSignIn={toggleSignIn}
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
        onHide={toggleForgotPass}
        contentclassname="forgotPass"
      >
        <Modal.Body contentclassname="forgotPass" className="forgot-modal">
          <ForgotPass
            toggleForgotPass={toggleForgotPass}
            toggleChangePass={toggleChangePass}
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
        onHide={toggleForgotPass}
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
            toggleForgotPass={toggleForgotPass}
            toggleChangePass={toggleChangePass}
          />
        </Modal.Body>
      </Modal>

      <Modal
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={changePass}
        onHide={toggleChangePass}
        contentclassname="forgotPass"
      >
        <Modal.Body>
          <ChangePass toggleChangePass={toggleChangePass} />
        </Modal.Body>
      </Modal>
      <Modal
        size="lg"
        backdrop="static"
        keyboard={false}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={showSignIn}
        onHide={toggleSignIn}
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
        onHide={toggleSignIn}
        contentclassname="login"
      >
        <Modal.Body>
          <Login
            toggleSignUp={toggleSignUp}
            toggleSignIn={toggleSignIn}
            toggleButton={toggleButton}
            toggleForgotPass={toggleForgotPass}
            toggleConfirmModal={toggleConfirmModal}
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
        onHide={toggleSignUp}
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
        onHide={toggleSignUp}
        contentclassname="custom-modal-style"
      >
        <Modal.Body>
          <SignUp
            toggleSignUp={toggleSignUp}
            toggleConfirmModal={toggleConfirmModal}
            toggleSignIn={toggleSignIn}
          />
        </Modal.Body>
      </Modal>
    </section>
  );
};

export default About;
