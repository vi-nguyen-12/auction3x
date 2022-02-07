import React from "react";
import styled from "styled-components";
import { FaAlignJustify, FaGlobeAmericas } from "react-icons/fa";
import { useState, useEffect } from "react";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import "../styles/modalStyle.css";
import ReconfirmEmail from "./ReconfirmEmail";
import SignUp from "./SignUp";
import { useSelector, useDispatch } from "react-redux";
import authService from "../services/authServices";
import { Link } from "react-router-dom";
import ForgotPass from "./ForgotPass";
import ChangePass from "./ChangePass";
import Toast from "./Toast";
import { useHistory } from "react-router-dom";
import { logout } from "../slice/userSlice";

const Header = ({ color }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [kycUrl, setKycUrl] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const toogleChangePass = () => popChangePass(!changePass);
  const toogleForgotPass = () => popForgotPass(!forgotPass);
  const toogleButton = () => popButton(!showButton);
  const toogleSignIn = () => popSignIn(!showSignIn);
  const toogleSignUp = () => popUpSignUp(!showSignUp);
  const toogleConfirmModal = () => popupConfirm(!showConfirm);

  const handleLogout = async () => {
    await authService.logout().then((res) => {
      if (res.data.message === "User logged out") {
        dispatch(logout());
        history.push("/");
      }
    });
  };

  const handleOnClick = (page) => () => {
    history.push(`${page}`);
  };

  const handleSell = () => {
    if (!user._id) {
      return toogleSignIn();
    } else {
      if (!user.KYC) {
        alert("Please complete your Kyc");
      } else {
        history.push("/MultiSellForm");
      }
    }
  };

  const handleWindowResize = () => {
    setWindowSize(window.innerWidth);
  };

  useEffect(async () => {
    if (user._id && !user.KYC) {
      const response = await authService.verifyKyc({
        params: { userId: user._id },
      });
      const url = response.data.url;
      setKycUrl(url);
    }
  }, [user]);
  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <Nav>
      <nav
        className="customNav navbar navbar-expand-lg p-0"
        style={{ backgroundColor: color }}
      >
        <div className="navbar-brand mt-2">
          <Logo href="/">
            <div>
              <img src="/images/logo.png" />
            </div>
            <div style={{ marginTop: 5, marginLeft: 15 }}>
              <img src="/images/name.png" />
            </div>
          </Logo>
        </div>

        <Menu className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="navbar-nav m-auto">
            <div className="nav-item mt-2 px-4 py-2">
              <button onClick={handleOnClick("realEstates")}>
                Real Estates
              </button>
            </div>
            <div className="nav-item mt-2 px-4 py-2">
              <button onClick={handleOnClick("cars")}>Cars</button>
            </div>
            <div className="nav-item mt-2 px-4 py-2">
              <button onClick={handleOnClick("jets")}>Jets</button>
            </div>
            <div className="nav-item mt-2 px-4 py-2">
              <button onClick={handleOnClick("yachts")}>Yachts</button>
            </div>
            <div className="nav-item mt-2 px-4 py-2">
              <button onClick={handleOnClick("others")}>Others</button>
            </div>
          </div>
          <form
            className="form-inline my-2 my-lg-0"
            style={{ display: "flex", paddingTop: 5 }}
          >
            <Modal
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showConfirm}
              onHide={toogleConfirmModal}
              centered
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
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={forgotPass}
              onHide={toogleForgotPass}
              centered
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
              centered
              contentclassname="forgotPass"
            >
              <Modal.Body>
                <ChangePass toogleChangePass={toogleChangePass} />
              </Modal.Body>
            </Modal>

            <Modal
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
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showSignUp}
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
            {/* <button
                className="bg-light customIcon mt-0 ml-2 iconsCubstom"
                type="submit"
                style={{ marginLeft: 5, height: "50px" }}
              >
                <div>
                  <FaGlobeAmericas />
                </div>
              </button> */}
          </form>
        </Menu>
        <div className="d-flex flex-row ">
          <Button
            className="bg-transparent border-0"
            onClick={handleSell}
            style={{
              color: "white",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Sell
          </Button>
          {user._id && !user.KYC && (
            <>
              <div className="dropdown">
                <button style={{ background: "transparent" }}>
                  <img src="/images/bell.png" style={{ maxHeight: "30px" }} />
                </button>
                <div className="dropdown-content">
                  <a href={kycUrl}>Please complete your KYC</a>
                </div>
              </div>
            </>
          )}
          {user._id ? (
            <div className="dropdown">
              <button
                className="bg-light customButton border-0 mt-0"
                style={{ fontSize: "16px" }}
              >
                {user.firstName} {user.lastName}
              </button>
              <div className="dropdown-content ">
                {windowSize < 992 && (
                  <>
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("realEstates")}
                    >
                      Real Estates
                    </button>
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("cars")}
                    >
                      Cars
                    </button>
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("jets")}
                    >
                      Jets
                    </button>
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("yachts")}
                    >
                      Yatches
                    </button>
                  </>
                )}
                <button
                  className="fw-bold p-3"
                  onClick={handleOnClick("profile")}
                >
                  Profile
                </button>
                <button className="fw-bold p-3" onClick={handleOnClick("ads")}>
                  My Ads
                </button>
                <button className="fw-bold p-3" onClick={handleLogout}>
                  Log Out
                </button>
              </div>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </nav>
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

const Menu = styled.div`
  display: flex;
  button {
    color: white;
    font-size: 20px;
    font-weight: bold;
    background-color: transparent;
    border: none;
  }
`;
// const RightMenu = styled.div`
//   display: flex;
// `;
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
