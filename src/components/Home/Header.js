import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
import { VscGlobe } from "react-icons/vsc";
import { IoWallet } from "react-icons/io5";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal, Table } from "react-bootstrap";
import "../../styles/modal.css";
import "../../styles/header.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import authService from "../../services/authServices";
import { logout } from "../../slice/userSlice";
import NumberFormat from "react-number-format";

const Header = ({
  change,
  color,
  headerWidth,
  positionLeft,
  toggleSignIn,
  toggleSignUp,
  windowSize,
}) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [kycUrl, setKycUrl] = useState("");
  const [colors, setColors] = useState("");
  const [open, setOpen] = useState(false);
  const [textColor, setTextColor] = useState("white");
  const [boxShadow, setBoxShadow] = useState("");
  const [transition, setTransition] = useState("");
  const [width, setWidth] = useState("100vw");
  const [left, setLeft] = useState("0");
  const [paddingRight, setPaddingRight] = useState("0");
  const [borderBottom, setBorderBottom] = useState("");
  const toggleOpen = () => setOpen(!open);
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
      return toggleSignIn();
    } else {
      if (!user.KYC) {
        alert("Please complete your Kyc");
      } else {
        history.push("/MultiSellForm");
      }
    }
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
          setTextColor("#151515");
          setBoxShadow("0 0 5px rgb(0 0 0 / 20%)");
          setTransition(
            "transform 120ms ease, background-color 250ms ease, color 250ms ease"
          );
          setWidth("100%");
          setPaddingRight("0");
        } else {
          setColors("");
          setTextColor("white");
          setBoxShadow("");
          setTransition("");
          setLeft("0");
          setPaddingRight("0");
        }
      };
    }
  }, [user]);

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
          backgroundColor: colors ? colors : color,
          width: headerWidth ? headerWidth : width,
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          display: "flex",
          alignContent: "center",
          height: "100%",
        }}
      >
        <div className="navbar-brand">
          <Logo style={{ left: positionLeft ? positionLeft : left }} href="/">
            <img
              src="/images/newName.png"
              width={windowSize > 800 ? 200 : 150}
              height={windowSize > 800 ? 50 : 40}
              alt=""
            />
          </Logo>
        </div>

        <Menu
          className="collapse navbar-collapse"
          id="navbarTogglerDemo03"
          style={{ paddingLeft: "8rem" }}
        >
          <div className="navbar-nav m-auto h-100">
            <div className="nav-item px-5">
              <button
                className="headerNav"
                style={{ color: textColor, borderBottom: borderBottom }}
                onClick={handleOnClick("realEstates")}
                id={colors === "white" ? "hover" : ""}
              >
                Real Estate
              </button>
            </div>
            <div className="nav-item px-5">
              <button
                style={{ color: textColor, borderBottom: borderBottom }}
                className="headerNav"
                onClick={handleOnClick("cars")}
                id={colors === "white" ? "hover" : ""}
              >
                Car
              </button>
            </div>
            <div className="nav-item px-5">
              <button
                style={{ color: textColor, borderBottom: borderBottom }}
                className="headerNav"
                onClick={handleOnClick("jets")}
                id={colors === "white" ? "hover" : ""}
              >
                Jet
              </button>
            </div>
            <div className="nav-item px-5">
              <button
                style={{ color: textColor, borderBottom: borderBottom }}
                className="headerNav"
                onClick={handleOnClick("yachts")}
                id={colors === "white" ? "hover" : ""}
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
        </Menu>
        {change === false ? (
          <>
            {/* {user._id ? (
              <Button onClick={toggleFundReq} className="fund-btn">
                Request Fund
              </Button>
            ) : null}
            <Modal
              backdrop="static"
              keyboard={false}
              size="lg"
              show={showFundReq}
              onHide={toggleFundReq}
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
                  onClick={toggleFundReq}
                />
              </div>
              <Modal.Body className="fund-modal">
                <MultiFundForm />
              </Modal.Body>
            </Modal> */}
            <div
              className="d-flex flex-row"
              style={{ alignItems: "center", height: "100%" }}
            >
              {windowSize > 800 ? (
                user._id ? (
                  <button
                    id={colors === "white" ? "hover" : ""}
                    style={{ color: textColor }}
                    className="headerNav"
                    onClick={handleSell}
                  >
                    Sell
                  </button>
                ) : (
                  <button
                    className="headerNav"
                    onClick={toggleSignIn}
                    style={{
                      backgroundColor: "transparent",
                      color: textColor,
                      marginRight: "30px",
                      fontSize: "20px",
                      fontWeight: "bold",
                      padding: "0 20px",
                      height: "60px",
                    }}
                    id={colors === "white" ? "hover" : ""}
                  >
                    Sell
                  </button>
                )
              ) : null}

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
                    {windowSize > 800 ? (
                      <button className="user mt-0">
                        Hello, {user.firstName}
                      </button>
                    ) : (
                      <button className="user mt-0">
                        {String(user.firstName[0]).toUpperCase()}
                        {String(user.lastName[0]).toUpperCase()}
                      </button>
                    )}
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
                  {windowSize > 800 ? (
                    <Button
                      className="headerNav"
                      style={{
                        backgroundColor: "transparent",
                        color: textColor,
                        borderRadius: "0",
                        height: "47px",
                      }}
                      id={colors === "white" ? "hover" : ""}
                      // id="dropdown-basic-button"
                      title={<IoWallet size={30} />}
                      onMouseEnter={() => setShowWallet(true)}
                      onMouseLeave={() => setShowWallet(false)}
                    >
                      <IoWallet size={20} />
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
                  ) : (
                    <div className="dropdown">
                      <Button
                        className="headerNav"
                        style={{
                          backgroundColor: "transparent",
                          color: textColor,
                          borderRadius: "0",
                          height: "47px",
                        }}
                        id={colors === "white" ? "hover" : ""}
                        // id="dropdown-basic-button"
                        title={<IoWallet size={30} />}
                        onMouseEnter={() => setShowWallet(true)}
                        onMouseLeave={() => setShowWallet(false)}
                      >
                        <IoWallet size={20} />
                      </Button>
                      <div className="dropdown-content">
                        <button className="fw-bold">
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
                        </button>
                      </div>
                    </div>
                  )}

                  <Button
                    className="headerNav"
                    style={{
                      backgroundColor: "transparent",
                      color: textColor,
                      borderRadius: "0",
                      height: "47px",
                    }}
                    id={colors === "white" ? "hover" : ""}
                    onClick={() => {
                      toggleOpen();
                    }}
                  >
                    <FaBars size={20} />
                  </Button>

                  <Button
                    className="headerNav"
                    id={colors === "white" ? "hover" : ""}
                    style={{
                      backgroundColor: "transparent",
                      color: textColor,
                      borderRadius: "0",
                      height: "47px",
                    }}
                  >
                    <VscGlobe size={25} />
                  </Button>
                </>
              ) : (
                <>
                  {windowSize > 800 ? (
                    <div
                      className="mt-0"
                      style={{
                        marginRight: windowSize > 800 ? "50px" : "10px",
                        display: "flex",
                        alignItems: "center",
                        fontSize: "20px",
                      }}
                    >
                      <Button
                        className="signIn-btn mt-0"
                        style={{ color: textColor }}
                        variant="success"
                        onClick={toggleSignIn}
                        id={colors === "white" ? "hover" : ""}
                      >
                        Sign In
                      </Button>
                      <label style={{ color: textColor }}>|</label>
                      <Button
                        id={colors === "white" ? "hover" : ""}
                        className="signUp-btn mt-0"
                        style={{ color: textColor }}
                        variant="success"
                        onClick={toggleSignUp}
                      >
                        Sign Up
                      </Button>
                    </div>
                  ) : (
                    <Button
                      id={colors === "white" ? "hover" : ""}
                      style={{ color: textColor }}
                      className="signIn-btn mt-0"
                      onClick={toggleSignIn}
                    >
                      Sign In
                    </Button>
                  )}
                  <Button
                    id={colors === "white" ? "hover" : ""}
                    className="headerNav mt-0"
                    style={{
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      backgroundColor: "transparent",
                      color: textColor,
                      borderRadius: "0",
                    }}
                    onClick={() => {
                      toggleOpen();
                    }}
                  >
                    <FaBars size={23} />
                  </Button>

                  <Button
                    id={colors === "white" ? "hover" : ""}
                    className="headerNav mt-0"
                    style={{
                      height: "47px",
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
                {windowSize > 800 ? (
                  <Button
                    id={colors === "white" ? "hover" : ""}
                    className="headerNav bg-transparent outline-none"
                    style={{
                      borderRadius: "0",
                      color: textColor,
                      height: "47px",
                    }}
                    onClick={handleSell}
                  >
                    Sell
                  </Button>
                ) : null}
                <div className="dropdown">
                  {windowSize > 800 ? (
                    <button className="user mt-0">
                      Hello, {user.firstName}
                    </button>
                  ) : (
                    <button className="user mt-0">
                      {String(user.firstName[0]).toUpperCase()}
                      {String(user.lastName[0]).toUpperCase()}
                    </button>
                  )}
                  <div className="dropdown-content ">
                    <button
                      className="fw-bold p-3"
                      onClick={handleOnClick("Dashboard")}
                    >
                      Dashboard
                    </button>
                    <button className="fw-bold p-3" onClick={handleLogout}>
                      Log Out
                    </button>
                  </div>
                </div>
                {windowSize > 800 ? (
                  <Button
                    className="headerNav"
                    style={{
                      backgroundColor: "transparent",
                      color: textColor,
                      borderRadius: "0",
                      height: "43px",
                    }}
                    id={colors === "white" ? "hover" : ""}
                    title={<IoWallet size={30} />}
                    onMouseEnter={() => setShowWallet(true)}
                    onMouseLeave={() => setShowWallet(false)}
                  >
                    <IoWallet size={20} />
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
                  </Button>
                ) : (
                  <div className="dropdown">
                    <Button
                      className="headerNav"
                      style={{
                        backgroundColor: "transparent",
                        color: textColor,
                        borderRadius: "0",
                        height: "47px",
                      }}
                      id={colors === "white" ? "hover" : ""}
                      // id="dropdown-basic-button"
                      title={<IoWallet size={30} />}
                      onMouseEnter={() => setShowWallet(true)}
                      onMouseLeave={() => setShowWallet(false)}
                    >
                      <IoWallet size={20} />
                    </Button>
                    <div className="dropdown-content">
                      <button className="fw-bold">
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
                      </button>
                    </div>
                  </div>
                )}
                <Button
                  id={colors === "white" ? "hover" : ""}
                  className="headerNav mt-0"
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    borderRadius: "0",
                    height: "57px",
                  }}
                  onClick={() => {
                    toggleOpen();
                  }}
                >
                  <FaBars size={20} />
                </Button>

                <Button
                  id={colors === "white" ? "hover" : ""}
                  className="headerNav mt-0"
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    borderRadius: "0",
                    height: "47px",
                  }}
                >
                  <VscGlobe size={25} />
                </Button>
              </>
            ) : (
              <>
                {windowSize > 800 ? (
                  <Button
                    id={colors === "white" ? "hover" : ""}
                    className="headerNav bg-transparent outline-none"
                    style={{
                      borderRadius: "0",
                      color: textColor,
                      marginRight: "15px",
                      height: "47px",
                    }}
                    onClick={handleSell}
                  >
                    Sell
                  </Button>
                ) : null}
                {windowSize > 800 ? (
                  <div
                    className="border-0 mt-0"
                    style={{
                      backgroundColor: "transparent",
                      marginRight: "0",
                    }}
                    id={colors === "white" ? "hover" : ""}
                  >
                    <Button
                      id={colors === "white" ? "hover" : ""}
                      className="signIn-btn"
                      style={{
                        fontSize: 18,
                        color: textColor,
                        fontWeight: "normal",
                        backgroundColor: "transparent",
                        border: "0",
                      }}
                      variant="success"
                      onClick={toggleSignIn}
                    >
                      Sign In
                    </Button>
                    <label style={{ color: textColor }}>|</label>
                    <Button
                      id={colors === "white" ? "hover" : ""}
                      className="signUp-btn"
                      style={{
                        fontSize: 18,
                        color: textColor,
                        fontWeight: "normal",
                        backgroundColor: "transparent",
                        border: "0",
                      }}
                      variant="success"
                      onClick={toggleSignUp}
                    >
                      Signup
                    </Button>
                  </div>
                ) : (
                  <Button
                    id={colors === "white" ? "hover" : ""}
                    style={{ color: textColor }}
                    className="signIn-btn mt-0"
                    onClick={toggleSignIn}
                  >
                    Sign In
                  </Button>
                )}
                <Button
                  id={colors === "white" ? "hover" : ""}
                  className="headerNav mt-0"
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    borderRadius: "0",
                    height: "47px",
                  }}
                  onClick={() => {
                    toggleOpen();
                  }}
                >
                  <FaBars size={20} />
                </Button>

                <Button
                  id={colors === "white" ? "hover" : ""}
                  className="headerNav mt-0"
                  style={{
                    backgroundColor: "transparent",
                    color: textColor,
                    borderRadius: "0",
                    height: "47px",
                    // paddingTop: "13px",
                  }}
                >
                  <VscGlobe size={25} />
                </Button>
              </>
            )}
          </div>
        )}

        <Modal show={open} onHide={toggleOpen} fullscreen>
          <Button
            className="close-button"
            onClick={() => {
              toggleOpen();
            }}
          >
            X
          </Button>
          <Modal.Body
            style={{
              backgroundColor: "#282828",
              padding: windowSize > 900 ? "100px" : "100px 10px",
            }}
          >
            <Table
              style={{
                color: "white",
                fontSize: windowSize > 900 ? "30px" : "14px",
              }}
              responsive="lg"
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
                        toggleOpen();
                        history.push("/realEstates");
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
                        toggleOpen();
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
                        toggleOpen();
                        history.push("/Partner");
                      }}
                    >
                      PARTNER
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
                        toggleOpen();
                        history.push("/cars");
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
                        toggleOpen();
                      }}
                    >
                      BUY
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
                        toggleOpen();
                        history.push("/PrivacyPolicy");
                      }}
                    >
                      PRIVACY POLICY
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
                        toggleOpen();
                        history.push("/yachts");
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
                        toggleOpen();
                        history.push("/MultiSellForm");
                      }}
                    >
                      SELLER
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
                        toggleOpen();
                        history.push("/TermsOfUse");
                      }}
                    >
                      TERMS & CONDITIONS
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
                        toggleOpen();
                        history.push("/jets");
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
                        toggleOpen();
                        history.push("/FAQ");
                      }}
                    >
                      FAQ
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
                        toggleOpen();
                        history.push("/AboutUs");
                      }}
                    >
                      ABOUT US
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
                        toggleOpen();
                        history.push("/Broker");
                      }}
                    >
                      BROKER
                    </button>
                  </td>
                  {/* <td>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                      }}
                      onClick={() => {
                        toggleOpen();
                        history.push("/AboutUs");
                      }}
                    >
                      TEAM
                    </button>
                  </td> */}
                </tr>
                <td>
                  <button
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "white",
                    }}
                    onClick={() => {
                      toggleOpen();
                      history.push("/Team");
                    }}
                  >
                    TEAM
                  </button>
                </td>
              </tbody>
            </Table>
          </Modal.Body>
        </Modal>
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
