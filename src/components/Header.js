import React from "react";
import styled from "styled-components";
import { FaBars, FaGlobeAmericas } from "react-icons/fa";
import { useState, useEffect } from "react";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Table } from "react-bootstrap";
import "../styles/modalStyle.css";
import "../styles/Header.css";
import ReconfirmEmail from "./ReconfirmEmail";
import SignUp from "./SignUp";
import { useSelector, useDispatch } from "react-redux";
import authService from "../services/authServices";
import ForgotPass from "./ForgotPass";
import ChangePass from "./ChangePass";
import { useHistory } from "react-router-dom";
import { logout } from "../slice/userSlice";

const Header = ({ color, change }) => {
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
  const [open, setOpen] = useState(false);
  const toogleOpen = () => setOpen(!open);
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
        window.location.reload();
      }
    });
  };

  const handleOnClick = (page) => () => {
    history.push(`/${page}`);
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

  useEffect(() => {
    const getKYCstatus = async () => {
      if (user._id && !user.KYC) {
        const response = await authService.verifyKyc({
          params: { userId: user._id },
        });
        const url = response.data.url;
        setKycUrl(url);
      }
    };
    getKYCstatus();
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
        className="navbar navbar-expand-lg p-0 pe-4"
        style={{ backgroundColor: color }}
      >
        <div className="navbar-brand mt-2">
          <Logo href="/">
            <div>
              <img src="/images/logo.png" alt="" />
            </div>
            <div style={{ marginTop: 5, marginLeft: 15 }}>
              <img src="/images/name.png" alt="" />
            </div>
          </Logo>
        </div>

        <Menu className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="navbar-nav m-auto">
            <div className="nav-item mt-2 px-4 py-2">
              <button
                className="headerNav"
                onClick={handleOnClick("realEstates")}
              >
                Real Estates
              </button>
            </div>
            <div className="nav-item mt-2 px-4 py-2">
              <button className="headerNav" onClick={handleOnClick("cars")}>
                Cars
              </button>
            </div>
            <div className="nav-item mt-2 px-4 py-2">
              <button className="headerNav" onClick={handleOnClick("jets")}>
                Jets
              </button>
            </div>
            <div className="nav-item mt-2 px-4 py-2">
              <button className="headerNav" onClick={handleOnClick("yachts")}>
                Yachts
              </button>
            </div>
            <div className="nav-item mt-2 px-4 py-2">
              <button className="headerNav" onClick={handleOnClick("others")}>
                Others
              </button>
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
              <Modal.Body
                size="md"
                backdrop="static"
                keyboard={false}
                show={forgotPass}
                onHide={toogleForgotPass}
                contentclassname="forgotPass"
                className="forgot-modal"
              >
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
              <Modal.Body
                show={showSignIn}
                onHide={toogleSignIn}
                backdrop="static"
                keyboard={false}
                className="sign-In"
              ></Modal.Body>
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
              <Modal.Body
                backdrop="static"
                keyboard={false}
                show={showSignUp}
                onHide={toogleSignUp}
                className="sign-Up"
              ></Modal.Body>
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
              <Modal.Body>
                <SignUp
                  toogleSignUp={toogleSignUp}
                  toogleConfirmModal={toogleConfirmModal}
                  toogleSignIn={toogleSignIn}
                />
              </Modal.Body>
            </Modal>

            <Modal show={open} onHide={toogleOpen} fullscreen>
              <Button
                className="close-button"
                onClick={() => {
                  toogleOpen();
                }}
              >
                X
              </Button>
              <Modal.Body
                style={{ backgroundColor: "#282828", padding: "150px" }}
              >
                <Table
                  style={{ color: "white", fontSize: "30px" }}
                  responsive
                  borderless
                >
                  <tbody>
                    <tr>
                      <td>
                        {" "}
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          REAL ESTATE
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          MANAGED BID
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          BROKERS
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          CARS
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                            handleSell();
                          }}
                        >
                          SELL
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          BUYERS
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          YACHTS
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          DASHBOARD
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          SELLERS
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          JETS
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          CAREERS
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          JEWELS
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          ABOUT US
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          JOURNOULS
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {" "}
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          OTHERS
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
        {change === false ? (
          <div className="d-flex flex-row ">
            <Button
              className="sell_btn bg-transparent border-0"
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
                    <img
                      src="/images/bell.png"
                      style={{ maxHeight: "30px" }}
                      alt=""
                    />
                  </button>
                  <div className="dropdown-content">
                    <a href={kycUrl}>Please complete your KYC</a>
                  </div>
                </div>
              </>
            )}
            {user._id ? (
              <>
                <div className="dropdown">
                  <button
                    className="customButton border-0 mt-0"
                    style={{
                      fontSize: "16px",
                      backgroundImage: "none",
                      backgroundColor: "#fcba7d",
                      marginRight: "50px",
                    }}
                  >
                    Hello, {user.firstName}
                  </button>
                  <div className="dropdown-content ">
                    {windowSize < 992 && (
                      <>
                        <button
                          className="headerNav fw-bold p-3"
                          onClick={handleOnClick("realEstates")}
                        >
                          Real Estates
                        </button>
                        <button
                          className="headerNav fw-bold p-3"
                          onClick={handleOnClick("cars")}
                        >
                          Cars
                        </button>
                        <button
                          className="headerNav fw-bold p-3"
                          onClick={handleOnClick("jets")}
                        >
                          Jets
                        </button>
                        <button
                          className="headerNav fw-bold p-3"
                          onClick={handleOnClick("yachts")}
                        >
                          Yatches
                        </button>
                      </>
                    )}
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("Dashboard")}
                    >
                      My DashBoard
                    </button>
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("ads")}
                    >
                      My Ads
                    </button>
                    <button className="fw-bold p-3" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                </div>
                <Button
                  style={{
                    backgroundColor: "#fcba7d",
                    color: "black",
                    borderColor: "transparent",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    toogleOpen();
                  }}
                >
                  <FaBars size={20} />
                </Button>

                <Button
                  style={{
                    backgroundColor: "#fcba7d",
                    color: "black",
                    borderColor: "transparent",
                  }}
                >
                  <FaGlobeAmericas size={25} />
                </Button>
              </>
            ) : (
              <>
                <div
                  className="bg-light customButton border-0 mt-0"
                  style={{
                    marginRight: "50px",
                  }}
                >
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
                <Button
                  style={{
                    backgroundImage:
                      "linear-gradient(#d58f5c, #ffc195, #dd9c6d, #edb48b)",
                    color: "black",
                    borderColor: "transparent",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    toogleOpen();
                  }}
                >
                  <FaBars size={20} />
                </Button>

                <Button
                  style={{
                    backgroundImage:
                      "linear-gradient(#d58f5c, #ffc195, #dd9c6d, #edb48b)",
                    color: "black",
                    borderColor: "transparent",
                  }}
                >
                  <FaGlobeAmericas size={25} />
                </Button>
              </>
            )}
          </div>
        ) : (
          <div className="d-flex flex-row ">
            {user._id && !user.KYC && (
              <>
                <div className="dropdown">
                  <button style={{ background: "transparent" }}>
                    <img
                      src="/images/bell.png"
                      style={{ maxHeight: "30px" }}
                      alt=""
                    />
                  </button>
                  <div className="dropdown-content">
                    <a href={kycUrl}>Please complete your KYC</a>
                  </div>
                </div>
              </>
            )}
            {user._id ? (
              <>
                <div className="dropdown">
                  <button
                    className="customButton border-0 mt-0"
                    style={{
                      fontSize: "16px",
                      backgroundImage: "none",
                      backgroundColor: "#fcba7d",
                      marginRight: "50px",
                    }}
                  >
                    Hello, {user.firstName}
                  </button>
                  <div className="dropdown-content ">
                    {windowSize < 992 && (
                      <>
                        <button
                          className="headerNav fw-bold p-3"
                          onClick={handleOnClick("realEstates")}
                        >
                          Real Estates
                        </button>
                        <button
                          className="headerNav fw-bold p-3"
                          onClick={handleOnClick("cars")}
                        >
                          Cars
                        </button>
                        <button
                          className="headerNav fw-bold p-3"
                          onClick={handleOnClick("jets")}
                        >
                          Jets
                        </button>
                        <button
                          className="headerNav fw-bold p-3"
                          onClick={handleOnClick("yachts")}
                        >
                          Yatches
                        </button>
                      </>
                    )}
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("Dashboard")}
                    >
                      My Dashboard
                    </button>
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("ads")}
                    >
                      My Ads
                    </button>
                    <button className="fw-bold p-3" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                </div>
                <Button
                  style={{
                    backgroundColor: "#fcba7d",
                    color: "black",
                    borderColor: "transparent",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    toogleOpen();
                  }}
                >
                  <FaBars size={20} />
                </Button>

                <Button
                  style={{
                    backgroundColor: "#fcba7d",
                    color: "black",
                    borderColor: "transparent",
                  }}
                >
                  <FaGlobeAmericas size={25} />
                </Button>
              </>
            ) : (
              <>
                <div
                  className="border-0 mt-0"
                  style={{
                    backgroundColor: "transparent",
                    marginRight: "50px",
                  }}
                >
                  <Button
                    className="signIn-btn"
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "transparent",
                      border: "0",
                    }}
                    variant="success"
                    onClick={toogleSignIn}
                  >
                    Login
                  </Button>
                  <label style={{ color: "white" }}>|</label>
                  <Button
                    className="signUp-btn"
                    style={{
                      fontSize: 18,
                      color: "white",
                      fontWeight: "bold",
                      backgroundColor: "transparent",
                      border: "0",
                    }}
                    variant="success"
                    onClick={toogleSignUp}
                  >
                    Signup
                  </Button>
                </div>
                <Button
                  style={{
                    backgroundColor: "#fcba7d",
                    color: "black",
                    borderColor: "transparent",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    toogleOpen();
                  }}
                >
                  <FaBars size={20} />
                </Button>

                <Button
                  style={{
                    backgroundColor: "#fcba7d",
                    color: "black",
                    borderColor: "transparent",
                  }}
                >
                  <FaGlobeAmericas size={25} />
                </Button>
                {/* <Button
                  className="bg-transparent border-0"
                  onClick={handleSell}
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Sell
                </Button> */}
              </>
            )}
          </div>
        )}
      </nav>
    </Nav>
  );
};

const Nav = styled.nav`
  position: absolute;
  z-index: 999;
  width: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 3;
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
