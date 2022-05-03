import React from "react";
import styled from "styled-components";
import { FaBars, FaGlobeAmericas } from "react-icons/fa";
import { VscGlobe } from "react-icons/vsc";
import { IoWallet } from "react-icons/io5";
import { useState, useEffect } from "react";
import Login from "../Users/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Table } from "react-bootstrap";
import "../../styles/modalStyle.css";
import "../../styles/Header.css";
import ReconfirmEmail from "../Users/ReconfirmEmail";
import SignUp from "../Users/SignUp";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authService from "../../services/authServices";
import ForgotPass from "../Users/ForgotPass";
import ChangePass from "../Users/ChangePass";
import { logout } from "../../slice/userSlice";
import NumberFormat from "react-number-format";
// import MultiFundForm from "../BuyRegister/Fund Request/MultiFundForm";
// import CloseButton from "react-bootstrap/CloseButton";

const Header = ({ change, color, headerWidth }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // const { id } = useParams();
  // const properties = useSelector((state) => state.auction);
  // const propId = properties.find((item) => item._id === id);
  // console.log(propId);

  const history = useHistory();
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  // const [showFundReq, popFundReq] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [kycUrl, setKycUrl] = useState("");
  const [colors, setColors] = useState("");
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [open, setOpen] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [boxShadow, setBoxShadow] = useState("");
  const [transition, setTransition] = useState("");
  const [width, setWidth] = useState("90vw");
  const [left, setLeft] = useState("0");
  const [paddingRight, setPaddingRight] = useState("0");
  const [borderBottom, setBorderBottom] = useState("");
  const toogleOpen = () => setOpen(!open);
  const toogleChangePass = () => popChangePass(!changePass);
  const toogleForgotPass = () => popForgotPass(!forgotPass);
  const toogleButton = () => popButton(!showButton);
  const toogleSignIn = () => popSignIn(!showSignIn);
  const toogleSignUp = () => popUpSignUp(!showSignUp);
  const toogleConfirmModal = () => popupConfirm(!showConfirm);
  // const toogleFundReq = () => popFundReq(!showFundReq);
  const [showWallet, setShowWallet] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(logout());
    history.push("/");
    window.location.reload();
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

    if (window.onscroll !== undefined) {
      window.onscroll = function () {
        if (window.scrollY > 1) {
          setColors("white");
          setTextColor("black");
          setBoxShadow("0 0 5px rgb(0 0 0 / 20%)");
          setTransition(
            "transform 120ms ease, background-color 250ms ease, color 250ms ease"
          );
          setWidth("100%");
          setLeft("20%");
          setPaddingRight("3rem");
        } else {
          setColors("");
          setTextColor("white");
          setBoxShadow("");
          setTransition("");
          setWidth("90vw");
          setLeft("0");
          setPaddingRight("0");
        }
      };
    }
  }, [user]);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [handleWindowResize]);

  return (
    <Nav
      style={{
        position: "fixed",
        top: 0,
        zIndex: 100,
        boxShadow: boxShadow,
        transition: transition,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "60px",
      }}
    >
      <nav
        className="navbar navbar-expand-lg"
        style={{
          padding: "0",
          backgroundColor: colors ? colors : color,
          width: headerWidth ? headerWidth : width,
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          paddingRight: paddingRight,
          height: "100%",
        }}
      >
        <div className="navbar-brand">
          <Logo style={{ left: left }} href="/">
            <img src="/images/newName.png" width={200} height={50} alt="" />
          </Logo>
        </div>

        <Menu className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <div className="navbar-nav m-auto">
            <div className="nav-item px-4">
              <button
                className="headerNav"
                style={{ color: textColor, borderBottom: borderBottom }}
                onClick={handleOnClick("realEstates")}
              >
                Real Estate
              </button>
            </div>
            <div className="nav-item px-4">
              <button
                style={{ color: textColor }}
                className="headerNav"
                onClick={handleOnClick("cars")}
              >
                Car
              </button>
            </div>
            <div className="nav-item px-4">
              <button
                style={{ color: textColor }}
                className="headerNav"
                onClick={handleOnClick("jets")}
              >
                Jet
              </button>
            </div>
            <div className="nav-item px-4">
              <button
                style={{ color: textColor }}
                className="headerNav"
                onClick={handleOnClick("yachts")}
              >
                Yacht
              </button>
            </div>
            {/* <div className="nav-item mt-2 px-4 py-2">
              <button className="headerNav" onClick={handleOnClick("others")}>
                Others
              </button>
            </div> */}
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
                            history.push("/realEstates");
                          }}
                        >
                          REAL ESTATE
                        </button>
                      </td>
                      <td>
                        <button
                          className="headerNav"
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
                        {/* <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                            if (user._id) {
                              history.push("/Dashboard/Auctions/BidAuctions");
                            }
                          }}
                        >
                          MANAGED BID
                        </button> */}
                      </td>
                      <td>
                        {/* <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          BROKER
                        </button> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: textColor,
                          }}
                          onClick={() => {
                            toogleOpen();
                            history.push("/cars");
                          }}
                        >
                          CAR
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
                            if (user._id) {
                              history.push("/dashboard");
                            } else {
                              toogleSignIn();
                            }
                          }}
                        >
                          DASHBOARD
                        </button>
                      </td>
                      <td>
                        {/* <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          BUYER
                        </button> */}
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
                            history.push("/yachts");
                          }}
                        >
                          YACHT
                        </button>
                      </td>
                      <td>
                        {/* <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          SELLER
                        </button> */}
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
                            history.push("/jets");
                          }}
                        >
                          JET
                        </button>
                      </td>
                      <td>
                        {/* <button
                          style={{
                            backgroundColor: "transparent",
                            border: "none",
                            color: "white",
                          }}
                          onClick={() => {
                            toogleOpen();
                          }}
                        >
                          CAREER
                        </button> */}
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {/* <button
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
                        </button> */}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Modal.Body>
            </Modal>
          </form>
        </Menu>
        {change === false ? (
          <>
            {/* {user._id ? (
              <Button onClick={toogleFundReq} className="fund-btn">
                Request Fund
              </Button>
            ) : null}
            <Modal
              backdrop="static"
              keyboard={false}
              size="lg"
              show={showFundReq}
              onHide={toogleFundReq}
              centered
            >
              <div>
                <CloseButton
                  style={{
                    position: "absolute",
                    right: "25px",
                    top: "25px",
                    width: "25px",
                    height: "25px",
                    zIndex: "999",
                    backgroundColor: "white",
                    boxShadow: "none",
                  }}
                  onClick={toogleFundReq}
                />
              </div>
              <Modal.Body className="fund-modal">
                <MultiFundForm />
              </Modal.Body>
            </Modal> */}
            <div className="d-flex flex-row ">
              {user._id ? (
                <button
                  style={{ color: textColor }}
                  className="headerNav"
                  onClick={handleSell}
                >
                  Sell
                </button>
              ) : (
                <button
                  className="headerNav"
                  onClick={toogleSignIn}
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    marginRight: "30px",
                    fontSize: "20px",
                    fontWeight: "bold",
                    padding: "0 20px",
                  }}
                >
                  Sell
                </button>
              )}

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
                      className="headerNav mt-0"
                      style={{
                        backgroundImage: "none",
                        backgroundColor: "transparent",
                        marginRight: "15px",
                        padding: "8px 20px",
                        color: textColor,
                      }}
                    >
                      Hello, {user.firstName}
                    </button>
                    <div className="dropdown-content">
                      <button
                        className="fw-bold p-3"
                        onClick={handleOnClick("Dashboard")}
                      >
                        DashBoard
                      </button>
                      {/* <button
                        className="fw-bold p-3"
                        onClick={handleOnClick("ads")}
                      >
                        My Ads
                      </button> */}
                      <button className="fw-bold p-3" onClick={handleLogout}>
                        Log Out
                      </button>
                    </div>
                  </div>
                  <Button
                    className="headerNav"
                    style={{
                      marginRight: "15px",
                      backgroundColor: "transparent",
                      color: textColor,
                      borderRadius: "0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    id="dropdown-basic-button"
                    title={<IoWallet size={30} />}
                    onMouseEnter={() => setShowWallet(true)}
                    onMouseLeave={() => setShowWallet(false)}
                  >
                    {/* <Dropdown.Item href="#"> */}
                    <IoWallet size={30} />
                    <NumberFormat
                      style={{
                        fontSize: "16px",
                        marginLeft: "10px",
                        fontWeight: "bold",
                      }}
                      value={user.wallet}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    {/* </Dropdown.Item> */}
                  </Button>
                  <Button
                    className="headerNav"
                    style={{
                      backgroundColor: "transparent",
                      color: textColor,
                      borderRadius: "0",
                      marginRight: "10px",
                    }}
                    onClick={() => {
                      toogleOpen();
                    }}
                  >
                    <FaBars size={20} />
                  </Button>

                  <Button
                    className="headerNav"
                    style={{
                      backgroundColor: "transparent",
                      color: textColor,
                      borderRadius: "0",
                    }}
                  >
                    <VscGlobe size={25} />
                  </Button>
                </>
              ) : (
                <>
                  <div
                    className="mt-0"
                    style={{
                      marginRight: "50px",
                      display: "flex",
                      alignItems: "center",
                      fontSize: "20px",
                    }}
                  >
                    <Button
                      className="signIn-btn"
                      style={{ color: textColor }}
                      variant="success"
                      onClick={toogleSignIn}
                    >
                      Sign In
                    </Button>
                    <label style={{ color: textColor }}>|</label>
                    <Button
                      className="signUp-btn"
                      style={{ color: textColor }}
                      variant="success"
                      onClick={toogleSignUp}
                    >
                      Sign Up
                    </Button>
                  </div>
                  <Button
                    className="headerNav mt-0"
                    style={{
                      color: textColor,
                      backgroundColor: "transparent",
                      borderColor: "transparent",
                      marginRight: "10px",
                      borderRadius: "0",
                    }}
                    onClick={() => {
                      toogleOpen();
                    }}
                  >
                    <FaBars size={23} />
                  </Button>

                  <Button
                    className="headerNav mt-0"
                    style={{
                      height: "60px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      color: textColor,
                      borderRadius: "0",
                    }}
                  >
                    <VscGlobe size={29} />
                  </Button>
                </>
              )}
            </div>
          </>
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
                <Button
                  className="sell_btn bg-transparent border-0 outline-none"
                  onClick={handleSell}
                  style={{
                    color: "white",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  Sell
                </Button>
                <div className="dropdown">
                  <button
                    className="customButton border-0 mt-0"
                    style={{
                      fontSize: "16px",
                      backgroundImage: "none",
                      backgroundColor: "#fcba7d",
                      marginRight: "50px",
                      padding: "8px 20px",
                    }}
                  >
                    Hello, {user.firstName}
                  </button>
                  <div className="dropdown-content ">
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("Dashboard")}
                    >
                      Dashboard
                    </button>
                    {/* <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("ads")}
                    >
                      My Ads
                    </button> */}
                    <button className="fw-bold p-3" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                </div>
                <Button
                  style={{
                    marginRight: "15px",
                    backgroundColor: "#fcba7d",
                    color: "black",
                    borderColor: "transparent",
                    padding: "8px 20px",
                  }}
                  id="dropdown-basic-button"
                  title={<IoWallet size={30} />}
                  onMouseEnter={() => setShowWallet(true)}
                  onMouseLeave={() => setShowWallet(false)}
                >
                  {/* <Dropdown.Item href="#"> */}
                  <IoWallet size={30} />
                  <NumberFormat
                    style={{
                      fontSize: "16px",
                      marginLeft: "10px",
                      fontWeight: "bold",
                    }}
                    value={user.wallet}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                  {/* </Dropdown.Item> */}
                </Button>
                <Button
                  className="headerNav mt-0"
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderRadius: "0",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    toogleOpen();
                  }}
                >
                  <FaBars size={20} />
                </Button>

                <Button
                  className="headerNav mt-0"
                  style={{
                    backgroundColor: "transparent",
                    color: "black",
                    borderRadius: "0",
                  }}
                >
                  <VscGlobe size={25} />
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
                      color: textColor,
                      fontWeight: "bold",
                      backgroundColor: "transparent",
                      border: "0",
                    }}
                    variant="success"
                    onClick={toogleSignIn}
                  >
                    Login
                  </Button>
                  <label style={{ color: textColor }}>|</label>
                  <Button
                    className="signUp-btn"
                    style={{
                      fontSize: 18,
                      color: textColor,
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
                  className="headerNav mt-0"
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    borderRadius: "0",
                    marginRight: "10px",
                  }}
                  onClick={() => {
                    toogleOpen();
                  }}
                >
                  <FaBars size={20} />
                </Button>

                <Button
                  className="headerNav mt-0"
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    borderRadius: "0",
                  }}
                >
                  <VscGlobe size={25} />
                </Button>
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
  background-color: transparent;
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

  @media (max-width: 768px) {
    text-align: center;
  }
`;

export default Header;
