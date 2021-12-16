import React from "react";
import styled from "styled-components";
import { FaAlignJustify, FaGlobeAmericas } from "react-icons/fa";
import { useState, useEffect } from "react";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import "../styles/modalStyle.css";
import Confirm from "./EmailConfirm";
import SignUp from "./SignUp";
import { useSelector } from "react-redux";
import authService from "../services/authServices";
import { Link } from "react-router-dom";
import ForgotPass from "./ForgotPass";
import ChangePass from "./ChangePass";
import Toast from "./Toast";
import { useHistory } from "react-router-dom";

const Header = ({ color }) => {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const history2 = useHistory();

  const HeaderComp = ({ toogleSingInn }) => {
    const [showSignIn, popSignIn] = useState(false);
    const [showSignUp, popUpSignUp] = useState(false);
    const [showConfirm, popupConfirm] = useState(false);
    const [showButton, popButton] = useState(false);
    const [forgotPass, popForgotPass] = useState(false);
    const [changePass, popChangePass] = useState(false);
    const [showKYC, setShowKYC] = useState(false);
    const [kycUrl, setKycUrl] = useState("");
    const toogleChangePass = () => popChangePass(!changePass);
    const toogleForgotPass = () => popForgotPass(!forgotPass);
    const toogleButton = () => popButton(!showButton);
    const toogleSignIn = () => popSignIn(!showSignIn);
    const toogleSignUp = () => popUpSignUp(!showSignUp);
    const toogleConfirmModal = () => popupConfirm(!showConfirm);

    const handleLogout = () => {
      authService.logout();
      history.push("/");
    };

    const handleRealEstate = () => {
      history2.push("/RealEstates");
    };

    const handleOnSell = () => {
      if (!user._id) {
        return toogleSignIn();
      }
      if (user.KYC) {
        history.push("/MultiSellForm");
      } else {
        setShowKYC(true);
      }
    };
    useEffect(async () => {
      if (user._id && !user.KYC) {
        const response = await authService.verifyKyc({
          params: { userId: user._id },
        });
        console.log(response);
        const url = response.data.url;
        setKycUrl(url);
        console.log(url);
      }
    }, [user]);

    return (
      <>
        {showKYC && <Toast type="warning" message="Please complete your KYC" />}
        <nav
          className="customNav navbar navbar-expand-lg p-0"
          style={{ backgroundColor: color }}
        >
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarTogglerDemo03"
            aria-controls="navbarTogglerDemo03"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <a className="navbar-brand mt-2" href="#">
            <Logo href="/">
              <div>
                <img src="/images/logo.png" />
              </div>
              <div style={{ marginTop: 5, marginLeft: 15 }}>
                <img src="/images/name.png" />
              </div>
            </Logo>
          </a>

          <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul className="navbar-nav m-auto">
              <li className="nav-item mt-2 px-4 py-2">
                <a className="nav-link" href="#" style={{ color: "white" }}>
                  <b>Cars</b>
                </a>
              </li>
              <li className="nav-item mt-2 px-4 py-2">
                <a className="nav-link" href="#" style={{ color: "white" }}>
                  <b>Jets</b>
                </a>
              </li>
              <li className="nav-item mt-2 px-4 py-2">
                <a className="nav-link" href="#" style={{ color: "white" }}>
                  <b>Yachts</b>
                </a>
              </li>
              <li className="nav-item mt-2 px-4 py-2">
                <a className="nav-link" href="#" style={{ color: "white" }}>
                  <b>Others</b>
                </a>
              </li>
            </ul>
            <form
              className="form-inline my-2 my-lg-0"
              style={{ display: "flex", paddingTop: 5 }}
            >
              <button
                className="bg-transparent border-0"
                onClick={handleRealEstate}
                style={{
                  position: "absolute",
                  color: "white",
                  fontSize: "30px",
                  fontWeight: "bold",
                  left: "30%",
                }}
              >
                Real Estate
              </button>
              <Modal
                size=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showConfirm}
                onHide={toogleConfirmModal}
                centered
                contentClassName="confirm"
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
                  <Confirm
                    toogleConfirmModal={toogleConfirmModal}
                    toogleSignIn={toogleSignIn}
                  />
                </Modal.Body>
              </Modal>
              <Modal
                size=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={forgotPass}
                onHide={toogleForgotPass}
                centered
                contentClassName="forgotPass"
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
                size=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={changePass}
                onHide={toogleChangePass}
                centered
                contentClassName="forgotPass"
              >
                <Modal.Body>
                  <ChangePass toogleChangePass={toogleChangePass} />
                </Modal.Body>
              </Modal>

              <button
                className="bg-transparent border-0"
                onClick={handleOnSell}
                style={{
                  position: "absolute",
                  top: "25px",
                  right: "14%",
                  color: "white",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                Sell
              </button>
              {user._id && !user.KYC && (
                <div className="dropdown">
                  <button style={{ background: "transparent" }}>
                    <img src="/images/bell.png" style={{ maxHeight: "30px" }} />
                  </button>
                  <div className="dropdown-content">
                    <a href={kycUrl}>Please complete your KYC</a>
                  </div>
                </div>
              )}
              {user._id ? (
                <div className="dropdown">
                  <button
                    className="bg-light customButton border-0 mt-0"
                    style={{ fontSize: "16px" }}
                  >
                    {user.firstName} {user.lastName}
                  </button>
                  <div className="dropdown-content">
                    <a href="#">Profile</a>
                    <a href="#">My Ads</a>
                    <button className="logoutbtn" onClick={handleLogout}>
                      <a>Log Out</a>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-light customButton border-0 mt-0">
                  <Button
                    className="signIn-btn"
                    style={{
                      fontSize: 16,
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor: "transparent",
                      border: "0",
                    }}
                    variant="success"
                    onClick={toogleSignIn}
                  >
                    Sign In
                  </Button>
                  <label>|</label>
                  <Button
                    className="signUp-btn"
                    style={{
                      fontSize: 16,
                      color: "black",
                      fontWeight: "bold",
                      backgroundColor: "transparent",
                      border: "0",
                    }}
                    variant="success"
                    onClick={toogleSignUp}
                  >
                    Sign Up
                  </Button>
                </div>
              )}
              <Modal
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showSignIn}
                onHide={toogleSignIn}
                contentClassName="login"
              >
                <Modal.Body>
                  <Login
                    toogleSignUp={toogleSignUp}
                    toogleSignIn={toogleSignIn}
                    toogleButton={toogleButton}
                    toogleForgotPass={toogleForgotPass}
                  />
                </Modal.Body>
              </Modal>

              <Modal
                size=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={showSignUp}
                onHide={toogleSignUp}
                contentClassName="custom-modal-style"
              >
                <Modal.Body>
                  <SignUp
                    toogleSignUp={toogleSignUp}
                    toogleConfirmModal={toogleConfirmModal}
                    toogleSignIn={toogleSignIn}
                  />
                </Modal.Body>
              </Modal>
              <button
                className="bg-light customIcon mt-0 ml-2 iconsCubstom"
                type="submit"
                style={{ marginLeft: 5, height: "50px" }}
              >
                <div>
                  <FaGlobeAmericas />
                </div>
              </button>
            </form>
          </div>
        </nav>
      </>
    );
  };

  return (
    <Nav>
      <HeaderComp />
    </Nav>
  );
};

const Nav = styled.nav`
  position: absolute;
  z-index: 10;
  width: 100%;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: rgba(0, 0, 0, 0.5);
  //display: flex;
  // justify-content: space-between;
  // align-items: center;
  padding-right: 10px;
  z-index: 3;
  // flex-wrap: wrap;
`;

const Logo = styled.a`
  cursor: pointer;
  flex: 1;
  display: flex;
  position: relative;
  left: 30%;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export default Header;
