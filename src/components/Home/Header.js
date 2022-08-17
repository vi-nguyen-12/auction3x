import React from "react";
import styled from "styled-components";
import { FaBars } from "react-icons/fa";
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
import { BsFillHouseFill } from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoIosBoat } from "react-icons/io";
import { AiFillDollarCircle } from "react-icons/ai";
import { FaGlobeAmericas } from "react-icons/fa";

const Header = ({
  change,
  color,
  headerWidth,
  toggleSignIn,
  toggleSignUp,
  windowSize,
  wallet,
  subWallet,
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

  const [showSubWallet, setShowSubWallet] = useState({
    RealEstate: false,
    Car: false,
    Jet: false,
    Yacht: false,
  });

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(logout());
    history.push("/");
    window.location.reload();
  };

  const handleOnClick = (page) => () => {
    history.push(`/${page}`);
    window.location.reload();
  };

  const handleSell = () => {
    if (!user._id) {
      return toggleSignIn();
    } else {
      if (!user.KYC) {
        alert("Please complete your Kyc");
      } else {
        if (history.location.pathname === "/multiSellForm") {
          window.location.reload();
        } else {
          history.push("/multiSellForm");
        }
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
          setColors("#181c35");
          setTextColor("white");
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
        width: "100vw",
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
          justifyContent: "space-between",
          padding: windowSize > 600 && "0 50px",
        }}
      >
        <div className="navbar-brand">
          <Logo href="/">
            <img
              src="/images/newName.png"
              width={windowSize > 800 ? 200 : 150}
              height={windowSize > 800 ? 50 : 40}
              alt=""
            />
          </Logo>
        </div>

        {windowSize > 1048 && (
          <Menu
            className="collapse navbar-collapse"
            id="navbarTogglerDemo03"
            style={{ paddingLeft: windowSize > 1445 && "8rem" }}
          >
            <div className="navbar-nav m-auto h-100">
              <div
                className="nav-item"
                style={{ padding: windowSize > 1305 ? "0 3rem" : "0 1rem" }}
              >
                <button
                  className="headerNav"
                  style={{ color: textColor, borderBottom: borderBottom }}
                  onClick={handleOnClick("realEstates")}
                  id={colors === "white" ? "hover" : ""}
                >
                  Real Estate
                </button>
              </div>
              <div
                className="nav-item"
                style={{ padding: windowSize > 1305 ? "0 3rem" : "0 1rem" }}
              >
                <button
                  style={{ color: textColor, borderBottom: borderBottom }}
                  className="headerNav"
                  onClick={handleOnClick("cars")}
                  id={colors === "white" ? "hover" : ""}
                >
                  Car
                </button>
              </div>
              <div
                className="nav-item"
                style={{ padding: windowSize > 1305 ? "0 3rem" : "0 1rem" }}
              >
                <button
                  style={{ color: textColor, borderBottom: borderBottom }}
                  className="headerNav"
                  onClick={handleOnClick("jets")}
                  id={colors === "white" ? "hover" : ""}
                >
                  Jet
                </button>
              </div>
              <div
                className="nav-item"
                style={{ padding: windowSize > 1305 ? "0 3rem" : "0 1rem" }}
              >
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
        )}
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
              style={{
                alignItems: "center",
                height: "100%",
                justifyContent: "flex-end",
              }}
            >
              {windowSize > 800 ? (
                user._id ? (
                  <button
                    id={colors === "white" ? "hover" : ""}
                    style={{ color: textColor, marginRight: "1rem" }}
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
                      <button
                        className="user mt-0"
                        style={{ padding: windowSize < 600 && "7px" }}
                      >
                        {String(user.firstName[0]).toUpperCase()}
                        {String(user.lastName[0]).toUpperCase()}
                      </button>
                    )}
                    <div className="dropdown-content">
                      <div className="dropdown-content-items">
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
                  </div>
                  <div className="dropdown">
                    <button
                      className="headerButton"
                      id={colors === "white" ? "hover" : ""}
                      style={{ padding: windowSize < 600 && "8px" }}
                      // id="dropdown-basic-button"
                      title={<IoWallet size={30} />}
                      onMouseEnter={() => setShowWallet(true)}
                      onMouseLeave={() => setShowWallet(true)}
                    >
                      <IoWallet size={23} />
                    </button>
                    <div className="dropdown-content">
                      <div
                        className="dropdown-content-items"
                        style={{
                          marginLeft: "-80px",
                          width: "200px",
                          padding: "10px",
                        }}
                      >
                        <div className="d-flex justify-content-start align-items-center">
                          <div
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#e9bc4d",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "10px",
                            }}
                          >
                            <BsFillHouseFill size={20} color="white" />
                          </div>
                          <div className="d-grid justify-content-start">
                            <span style={{ padding: "0", display: "flex" }}>
                              Real Estate
                            </span>
                            <NumberFormat
                              style={{
                                padding: "0",
                                color: "#b6b7b8",
                                display: "flex",
                                cursor: "pointer",
                              }}
                              value={
                                subWallet.RealEstate.filter(
                                  (item) =>
                                    item.auctionId ===
                                    history.location.pathname.slice(17)
                                )[0]?.availableFund || wallet.RealEstate
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                              onClick={() => {
                                setShowSubWallet((prev) => ({
                                  ...prev.RealEstate,
                                  RealEstate: !prev.RealEstate,
                                }));
                              }}
                            />
                            {showSubWallet.RealEstate === true &&
                              subWallet.RealEstate.map((item, index) => (
                                <span className="p-0" key={index}>
                                  <NumberFormat
                                    thousandSeparator={true}
                                    value={item.availableFund}
                                    displayType={"text"}
                                    prefix={
                                      item.auctionId ===
                                      history.location.pathname.slice(17)
                                        ? "* $"
                                        : "- $"
                                    }
                                    style={{
                                      padding: "0",
                                      display: "flex",
                                      fontSize: "12px",
                                    }}
                                  />
                                </span>
                              ))}
                          </div>
                        </div>

                        <div className="d-flex justify-content-start align-items-center mt-2">
                          <div
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#e9bc4d",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "10px",
                            }}
                          >
                            <IoCarSportSharp size={20} color="white" />
                          </div>
                          <div className="d-grid justify-content-start">
                            <span style={{ padding: "0", display: "flex" }}>
                              Car
                            </span>
                            <NumberFormat
                              style={{
                                padding: "0",
                                color: "#b6b7b8",
                                display: "flex",
                                cursor: "pointer",
                              }}
                              value={
                                subWallet.Car.filter(
                                  (item) =>
                                    item.auctionId ===
                                    history.location.pathname.slice(17)
                                )[0]?.availableFund || wallet.Car
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                              onClick={() => {
                                setShowSubWallet((prev) => ({
                                  ...prev.Car,
                                  Car: !prev.Car,
                                }));
                              }}
                            />
                            {showSubWallet.Car === true &&
                              subWallet.Car.map((item, index) => (
                                <span className="p-0" key={index}>
                                  <NumberFormat
                                    thousandSeparator={true}
                                    value={item.availableFund}
                                    displayType={"text"}
                                    prefix={
                                      item.auctionId ===
                                      history.location.pathname.slice(17)
                                        ? "* $"
                                        : "- $"
                                    }
                                    style={{
                                      padding: "0",
                                      display: "flex",
                                      fontSize: "12px",
                                    }}
                                  />
                                </span>
                              ))}
                          </div>
                        </div>

                        <div className="d-flex justify-content-start align-items-center mt-2">
                          <div
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#e9bc4d",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "10px",
                            }}
                          >
                            <IoAirplaneSharp size={20} color="white" />
                          </div>
                          <div className="d-grid justify-content-start">
                            <span style={{ padding: "0", display: "flex" }}>
                              Jet
                            </span>
                            <NumberFormat
                              style={{
                                padding: "0",
                                color: "#b6b7b8",
                                display: "flex",
                                cursor: "pointer",
                              }}
                              value={
                                subWallet.Jet.filter(
                                  (item) =>
                                    item.auctionId ===
                                    history.location.pathname.slice(17)
                                )[0]?.availableFund || wallet.Jet
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                              onClick={() => {
                                setShowSubWallet((prev) => ({
                                  ...prev.Jet,
                                  Jet: !prev.Jet,
                                }));
                              }}
                            />
                            {showSubWallet.Jet === true &&
                              subWallet.Jet.map((item, index) => (
                                <span className="p-0" key={index}>
                                  <NumberFormat
                                    thousandSeparator={true}
                                    value={item.availableFund}
                                    displayType={"text"}
                                    prefix={
                                      item.auctionId ===
                                      history.location.pathname.slice(17)
                                        ? "* $"
                                        : "- $"
                                    }
                                    style={{
                                      padding: "0",
                                      display: "flex",
                                      fontSize: "12px",
                                    }}
                                  />
                                </span>
                              ))}
                          </div>
                        </div>

                        <div className="d-flex justify-content-start align-items-center mt-2">
                          <div
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#e9bc4d",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "10px",
                            }}
                          >
                            <IoIosBoat size={20} color="white" />
                          </div>
                          <div className="d-grid justify-content-start">
                            <span style={{ padding: "0", display: "flex" }}>
                              Yacht
                            </span>
                            <NumberFormat
                              style={{
                                padding: "0",
                                color: "#b6b7b8",
                                display: "flex",
                                cursor: "pointer",
                              }}
                              value={
                                subWallet.Yacht.filter(
                                  (item) =>
                                    item.auctionId ===
                                    history.location.pathname.slice(17)
                                )[0]?.availableFund || wallet.Yacht
                              }
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                              onClick={() => {
                                setShowSubWallet((prev) => ({
                                  ...prev.Yacht,
                                  Yacht: !prev.Yacht,
                                }));
                              }}
                            />
                            {showSubWallet.Yacht === true &&
                              subWallet.Yacht.map((item, index) => (
                                <span className="p-0" key={index}>
                                  <NumberFormat
                                    thousandSeparator={true}
                                    value={item.availableFund}
                                    displayType={"text"}
                                    prefix={
                                      item.auctionId ===
                                      history.location.pathname.slice(17)
                                        ? "* $"
                                        : "- $"
                                    }
                                    style={{
                                      padding: "0",
                                      display: "flex",
                                      fontSize: "12px",
                                    }}
                                  />
                                </span>
                              ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    className="headerButton"
                    id={colors === "white" ? "hover" : ""}
                    style={{ padding: windowSize < 600 && "8px" }}
                    onClick={() => {
                      toggleOpen();
                    }}
                  >
                    <FaBars size={windowSize <= 1536 ? 20 : 23} />
                  </Button>
                  <div className="dropdown">
                    <Button
                      className="headerButton"
                      id={colors === "white" ? "hover" : ""}
                      style={{
                        marginRight: windowSize < 600 && "0.5rem",
                        padding: windowSize < 600 && "8px",
                      }}
                    >
                      <FaGlobeAmericas size={windowSize <= 1536 ? 20 : 23} />
                    </Button>
                    <div className="dropdown-content">
                      <div
                        className="dropdown-content-items"
                        style={{
                          marginLeft: "-50px",
                          // width: "130px",
                        }}
                      >
                        <Button className="d-flex justify-content-start align-items-center">
                          <div
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#e9bc4d",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "10px",
                            }}
                          >
                            <AiFillDollarCircle size={20} color="white" />
                          </div>
                          <div className="d-grid justify-content-start">
                            <span style={{ padding: "0", display: "flex" }}>
                              USA
                            </span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {windowSize > 800 ? (
                    <div
                      className="mt-0"
                      style={{
                        // marginRight: windowSize > 800 ? "50px" : "10px",
                        display: "flex",
                        alignItems: "center",
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
                      className="signIn-btn mt-0 bg-transparent"
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
                      lineHeight: "normal",
                      borderRadius: "0",
                    }}
                    onClick={() => {
                      toggleOpen();
                    }}
                  >
                    <FaBars size={windowSize <= 1536 ? 20 : 23} />
                  </Button>

                  <div className="dropdown">
                    <Button
                      id={colors === "white" ? "hover" : ""}
                      className="headerNav mt-0"
                      style={{
                        height: "47px",
                        display: "flex",
                        alignItems: "center",
                        backgroundColor: "transparent",
                        lineHeight: "normal",
                        color: textColor,
                        borderRadius: "0",
                      }}
                    >
                      <FaGlobeAmericas size={windowSize <= 1536 ? 20 : 23} />
                    </Button>
                    <div className="dropdown-content">
                      <div
                        className="dropdown-content-items"
                        style={{
                          marginLeft: "-50px",
                          marginTop: "-8px",
                          // width: "130px",
                        }}
                      >
                        <Button className="d-flex justify-content-start align-items-center">
                          <div
                            style={{
                              borderRadius: "50%",
                              backgroundColor: "#e9bc4d",
                              width: "40px",
                              height: "40px",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginRight: "10px",
                            }}
                          >
                            <AiFillDollarCircle size={20} color="white" />
                          </div>
                          <div className="d-grid justify-content-start">
                            <span style={{ padding: "0", display: "flex" }}>
                              USA
                            </span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <div
            className="d-flex flex-row"
            style={{ height: "100%", alignItems: "center" }}
          >
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
                      marginRight: "1rem",
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
                    <button
                      className="user mt-0"
                      style={{ padding: windowSize < 600 && "7px" }}
                    >
                      {String(user.firstName[0]).toUpperCase()}
                      {String(user.lastName[0]).toUpperCase()}
                    </button>
                  )}
                  <div className="dropdown-content">
                    <div className="dropdown-content-items">
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
                </div>

                <div className="dropdown">
                  <button
                    className="headerButton"
                    id={colors === "white" ? "hover" : ""}
                    style={{ padding: windowSize < 600 && "8px" }}
                    // id="dropdown-basic-button"
                    title={<IoWallet size={30} />}
                    onMouseEnter={() => setShowWallet(true)}
                    onMouseLeave={() => setShowWallet(false)}
                  >
                    <IoWallet size={23} />
                  </button>
                  <div className="dropdown-content">
                    <div
                      className="dropdown-content-items"
                      style={{
                        marginLeft: "-80px",
                        width: "200px",
                        padding: "10px",
                      }}
                    >
                      <div className="d-flex justify-content-start align-items-center">
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#e9bc4d",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <BsFillHouseFill size={20} color="white" />
                        </div>
                        <div className="d-grid justify-content-start">
                          <span style={{ padding: "0", display: "flex" }}>
                            Real Estate
                          </span>
                          <NumberFormat
                            style={{
                              padding: "0",
                              color: "#b6b7b8",
                              display: "flex",
                              cursor: "pointer",
                            }}
                            value={
                              subWallet.RealEstate.filter(
                                (item) =>
                                  item.auctionId ===
                                  history.location.pathname.slice(17)
                              )[0]?.availableFund || wallet.RealEstate
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            onClick={() => {
                              setShowSubWallet((prev) => ({
                                ...prev.RealEstate,
                                RealEstate: !prev.RealEstate,
                              }));
                            }}
                          />
                          {showSubWallet.RealEstate === true &&
                            subWallet.RealEstate.map((item, index) => (
                              <span className="p-0" key={index}>
                                <NumberFormat
                                  thousandSeparator={true}
                                  value={item.availableFund}
                                  displayType={"text"}
                                  prefix={
                                    item.auctionId ===
                                    history.location.pathname.slice(17)
                                      ? "* $"
                                      : "- $"
                                  }
                                  style={{
                                    padding: "0",
                                    display: "flex",
                                    fontSize: "12px",
                                  }}
                                />
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="d-flex justify-content-start align-items-center mt-2">
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#e9bc4d",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <IoCarSportSharp size={20} color="white" />
                        </div>
                        <div className="d-grid justify-content-start">
                          <span style={{ padding: "0", display: "flex" }}>
                            Car
                          </span>
                          <NumberFormat
                            style={{
                              padding: "0",
                              color: "#b6b7b8",
                              display: "flex",
                              cursor: "pointer",
                            }}
                            value={
                              subWallet.Car.filter(
                                (item) =>
                                  item.auctionId ===
                                  history.location.pathname.slice(17)
                              )[0]?.availableFund || wallet.Car
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            onClick={() => {
                              setShowSubWallet((prev) => ({
                                ...prev.Car,
                                Car: !prev.Car,
                              }));
                            }}
                          />
                          {showSubWallet.Car === true &&
                            subWallet.Car.map((item, index) => (
                              <span className="p-0" key={index}>
                                <NumberFormat
                                  thousandSeparator={true}
                                  value={item.availableFund}
                                  displayType={"text"}
                                  prefix={
                                    item.auctionId ===
                                    history.location.pathname.slice(17)
                                      ? "* $"
                                      : "- $"
                                  }
                                  style={{
                                    padding: "0",
                                    display: "flex",
                                    fontSize: "12px",
                                  }}
                                />
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="d-flex justify-content-start align-items-center mt-2">
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#e9bc4d",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <IoAirplaneSharp size={20} color="white" />
                        </div>
                        <div className="d-grid justify-content-start">
                          <span style={{ padding: "0", display: "flex" }}>
                            Jet
                          </span>
                          <NumberFormat
                            style={{
                              padding: "0",
                              color: "#b6b7b8",
                              display: "flex",
                              cursor: "pointer",
                            }}
                            value={
                              subWallet.Jet.filter(
                                (item) =>
                                  item.auctionId ===
                                  history.location.pathname.slice(17)
                              )[0]?.availableFund || wallet.Jet
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            onClick={() => {
                              setShowSubWallet((prev) => ({
                                ...prev.Jet,
                                Jet: !prev.Jet,
                              }));
                            }}
                          />
                          {showSubWallet.Jet === true &&
                            subWallet.Jet.map((item, index) => (
                              <span className="p-0" key={index}>
                                <NumberFormat
                                  thousandSeparator={true}
                                  value={item.availableFund}
                                  displayType={"text"}
                                  prefix={
                                    item.auctionId ===
                                    history.location.pathname.slice(17)
                                      ? "* $"
                                      : "- $"
                                  }
                                  style={{
                                    padding: "0",
                                    display: "flex",
                                    fontSize: "12px",
                                  }}
                                />
                              </span>
                            ))}
                        </div>
                      </div>

                      <div className="d-flex justify-content-start align-items-center mt-2">
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#e9bc4d",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <IoIosBoat size={20} color="white" />
                        </div>
                        <div className="d-grid justify-content-start">
                          <span style={{ padding: "0", display: "flex" }}>
                            Yacht
                          </span>
                          <NumberFormat
                            style={{
                              padding: "0",
                              color: "#b6b7b8",
                              display: "flex",
                              cursor: "pointer",
                            }}
                            value={
                              subWallet.Yacht.filter(
                                (item) =>
                                  item.auctionId ===
                                  history.location.pathname.slice(17)
                              )[0]?.availableFund || wallet.Yacht
                            }
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            onClick={() => {
                              setShowSubWallet((prev) => ({
                                ...prev.Yacht,
                                Yacht: !prev.Yacht,
                              }));
                            }}
                          />
                          {showSubWallet.Yacht === true &&
                            subWallet.Yacht.map((item, index) => (
                              <span className="p-0" key={index}>
                                <NumberFormat
                                  thousandSeparator={true}
                                  value={item.availableFund}
                                  displayType={"text"}
                                  prefix={
                                    item.auctionId ===
                                    history.location.pathname.slice(17)
                                      ? "* $"
                                      : "- $"
                                  }
                                  style={{
                                    padding: "0",
                                    display: "flex",
                                    fontSize: "12px",
                                  }}
                                />
                              </span>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  id={colors === "white" ? "hover" : ""}
                  className="headerButton"
                  style={{ padding: windowSize < 600 && "8px" }}
                  onClick={() => {
                    toggleOpen();
                  }}
                >
                  <FaBars size={windowSize <= 1536 ? 20 : 23} />
                </Button>

                <div className="dropdown">
                  <Button
                    id={colors === "white" ? "hover" : ""}
                    className="headerButton"
                    style={{
                      marginRight: windowSize < 600 && "0.5rem",
                      padding: windowSize < 600 && "8px",
                    }}
                  >
                    <FaGlobeAmericas size={windowSize <= 1536 ? 20 : 23} />
                  </Button>
                  <div className="dropdown-content">
                    <div
                      className="dropdown-content-items"
                      style={{
                        marginLeft: "-50px",
                        // width: "130px",
                      }}
                    >
                      <Button className="d-flex justify-content-start align-items-center">
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#e9bc4d",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <AiFillDollarCircle size={20} color="white" />
                        </div>
                        <div className="d-grid justify-content-start">
                          <span style={{ padding: "0", display: "flex" }}>
                            USA
                          </span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
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
                        color: textColor,
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
                        color: textColor,
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
                    className="signIn-btn mt-0 bg-transparent"
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
                    lineHeight: "normal",
                    height: "47px",
                    display: "flex",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    toggleOpen();
                  }}
                >
                  <FaBars size={windowSize <= 1536 ? 20 : 23} />
                </Button>

                <div className="dropdown">
                  <Button
                    id={colors === "white" ? "hover" : ""}
                    className="headerNav mt-0"
                    style={{
                      backgroundColor: "transparent",
                      lineHeight: "normal",
                      color: textColor,
                      borderRadius: "0",
                      height: "47px",
                      display: "flex",
                      alignItems: "center",
                      // paddingTop: "13px",
                    }}
                  >
                    <FaGlobeAmericas size={windowSize <= 1536 ? 20 : 23} />
                  </Button>
                  <div className="dropdown-content">
                    <div
                      className="dropdown-content-items"
                      style={{
                        marginLeft: "-50px",
                        marginTop: "-8px",
                        // width: "130px",
                      }}
                    >
                      <Button className="d-flex justify-content-start align-items-center">
                        <div
                          style={{
                            borderRadius: "50%",
                            backgroundColor: "#e9bc4d",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginRight: "10px",
                          }}
                        >
                          <AiFillDollarCircle size={20} color="white" />
                        </div>
                        <div className="d-grid justify-content-start">
                          <span style={{ padding: "0", display: "flex" }}>
                            USA
                          </span>
                        </div>
                      </Button>
                    </div>
                  </div>
                </div>
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
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                      }}
                      onClick={() => {
                        toggleOpen();
                        history.push("/Auctions");
                      }}
                    >
                      BUY
                    </button>
                  </td>
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
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
                  {/* <td style={{ padding: "0.5rem 0" }}>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                      }}
                      onClick={() => {
                        toggleOpen();
                        history.push("/multiSellForm");
                      }}
                    >
                      SELLER
                    </button>
                  </td> */}
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
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
                  <td style={{ padding: "0.5rem 0" }}>
                    <button
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "white",
                      }}
                      onClick={() => {
                        toggleOpen();
                        history.push("/contact");
                      }}
                    >
                      CONTACT US
                    </button>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.5rem 0" }}>
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
                  {/* <td style={{ padding: "0.5rem 0" }}>
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
                  </td> */}
                  {/* <td style={{padding:"0.5rem 0"}}>
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
  background: rgb(0, 0, 0, 0.4);
`;

const Menu = styled.div`
  display: flex;
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
