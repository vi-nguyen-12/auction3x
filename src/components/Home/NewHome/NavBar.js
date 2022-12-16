import React, { useState } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../slice/userSlice";
import wallets from "../../../images/wallet.png";
import { IoIosArrowDown } from "react-icons/io";
import NumberFormat from "react-number-format";
import { BsFillHouseFill } from "react-icons/bs";
import { IoCarSportSharp } from "react-icons/io5";
import { IoAirplaneSharp } from "react-icons/io5";
import { IoIosBoat } from "react-icons/io";
import { HiUser } from "react-icons/hi";
import { RiDashboardFill } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import "../../../styles/nav.css";

function NavBar({
  color,
  toggleSignIn,
  toggleSignUp,
  windowSize,
  wallet,
  subWallet,
  bodyColorChange,
  setExpendedMenuId,
  setMessage,
}) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const dispatch = useDispatch();

  const [dropdown, setDropdown] = useState(false);
  const [showWallet, setShowWallet] = useState(false);
  const [showSubWallet, setShowSubWallet] = useState({
    RealEstate: false,
    Car: false,
    Jet: false,
    Yacht: false,
  });

  const handleOnClick = (page) => () => {
    bodyColorChange("#F5F9FF");
    history.push(`/${page}`);
    // window.location.reload();
  };

  const handleLogout = async () => {
    localStorage.removeItem("token");
    dispatch(logout());
    history.push("/");
    window.location.reload();
  };

  const handleSell = () => {
    if (!user._id) {
      return toggleSignIn();
    } else {
      if (!user.KYC) {
        setMessage("");
        setTimeout(() => {
          setMessage("Please complete your Kyc");
        }, 100);
      } else {
        if (history.location.pathname === "/multiSellForm") {
          window.location.reload();
        } else {
          history.push("/multiSellForm");
          window.location.reload();
        }
      }
    }
  };

  const handleLogoClick = () => {
    if (history.location.pathname === "/") {
      window.scrollTo(0, 0);
    } else {
      history.push("/");
      window.location.reload();
    }
  };

  return (
    <Row
      className="p-0 m-0 nav-container"
      style={{
        justifyContent: windowSize < 1300 && "space-around",
        background: color,
      }}
    >
      <Col
        md={windowSize < 800 ? 6 : windowSize < 1300 ? 2 : 3}
        xs={6}
        className="m-0 d-flex justify-content-start align-items-center"
        style={{ paddingLeft: windowSize > 1300 && "5rem" }}
      >
        <img
          onClick={handleLogoClick}
          src="/images/Logo_Dark.png"
          width={windowSize < 768 ? "150px" : "180px"}
          height="auto"
          alt="logo"
          className="logo"
          loading="lazy"
        />
      </Col>
      <Col
        md={6}
        className="p-0 m-0"
        style={{ display: windowSize < 1300 && "none" }}
      >
        <ul className="nav-list">
          <li onClick={handleOnClick("realEstates")} className="nav-items">
            Real Estate
          </li>
          <li onClick={handleOnClick("cars")} className="nav-items">
            Car
          </li>
          <li onClick={handleOnClick("jets")} className="nav-items">
            Jet
          </li>
          <li onClick={handleOnClick("yachts")} className="nav-items">
            Yacht
          </li>
        </ul>
      </Col>

      {user._id ? (
        <Col
          md={windowSize < 1300 ? 6 : 3}
          xs={6}
          className="p-0 m-0 d-flex justify-content-evenly align-items-center"
        >
          {windowSize > 520 && (
            <Button onClick={handleSell} className="nav-button">
              Sell
            </Button>
          )}
          <div className="d-flex justify-content-around align-items-center">
            <div className="dropdown">
              {windowSize > 800 ? (
                <Button
                  onClick={() => setDropdown(!dropdown)}
                  className="user-name px-2"
                >
                  Hello,{" "}
                  {user.firstName[0].toUpperCase() + user.firstName.slice(1)}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ marginLeft: "1rem" }}
                  >
                    <IoIosArrowDown size={20} />
                  </div>
                </Button>
              ) : (
                <Button
                  onClick={() => setDropdown(!dropdown)}
                  className="user-name px-2"
                >
                  {String(user.firstName[0]).toUpperCase()}
                  {String(user.lastName[0]).toUpperCase()}
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ marginLeft: "1rem" }}
                  >
                    <IoIosArrowDown />
                  </div>
                </Button>
              )}
              <div className="dropdown-content-user">
                <div className="dropdown-content-items p-4 py-4">
                  {/* <span className="d-flex justify-content-center user-names">
                    {user.firstName[0].toUpperCase() + user.firstName.slice(1)}{" "}
                    {user.lastName[0].toUpperCase() + user.lastName.slice(1)}
                  </span> */}
                  <span
                    className="fw-bold d-flex py-2 justify-content-start align-items-center"
                    onClick={handleOnClick("Dashboard")}
                    style={{
                      cursor: "pointer",
                      fontFamily: "Interstate",
                      fontSize: "1.2rem",
                      color: "#08080A",
                    }}
                  >
                    Dashboard
                  </span>
                  <span
                    className="fw-bold d-flex py-2 justify-content-start align-items-center"
                    onClick={handleOnClick("Dashboard/Profile")}
                    style={{
                      cursor: "pointer",
                      fontFamily: "Interstate",
                      fontSize: "1.2rem",
                      color: "#08080A",
                    }}
                  >
                    Profile
                  </span>
                  <span
                    className="fw-bold d-flex py-2 justify-content-start align-items-center"
                    onClick={handleLogout}
                    style={{
                      cursor: "pointer",
                      fontFamily: "Interstate",
                      fontSize: "1.2rem",
                      color: "#08080A",
                    }}
                  >
                    Log Out
                  </span>
                </div>
              </div>
            </div>

            <div className="dropdown">
              <Button
                className="nav-button"
                onClick={() => setShowWallet(!showWallet)}
              >
                <img
                  style={{ cursor: "pointer" }}
                  src={wallets}
                  width={windowSize > 1670 ? "22px" : "20px"}
                  height="auto"
                  alt=""
                  loading="lazy"
                />
              </Button>
              {showWallet && (
                <div className="dropdown-content">
                  <div
                    className="dropdown-content-items px-4"
                    style={{
                      marginLeft: "-80px",
                      width: "200px",
                      padding: "10px",
                    }}
                  >
                    <div className="d-flex justify-content-start align-items-center py-2">
                      <div className="wallet-icon">
                        <BsFillHouseFill size={20} color="white" />
                      </div>
                      <div className="d-grid justify-content-start">
                        <span
                          style={{
                            padding: "0",
                            display: "flex",
                            color: "#B77B50",
                          }}
                        >
                          Real Estate
                        </span>
                        <NumberFormat
                          style={{
                            padding: "0",
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

                    <div className="d-flex justify-content-start align-items-center py-2">
                      <div className="wallet-icon">
                        <IoCarSportSharp size={20} color="white" />
                      </div>
                      <div className="d-grid justify-content-start">
                        <span
                          style={{
                            padding: "0",
                            display: "flex",
                            color: "#B77B50",
                          }}
                        >
                          Car
                        </span>
                        <NumberFormat
                          style={{
                            padding: "0",
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

                    <div className="d-flex justify-content-start align-items-center py-2">
                      <div className="wallet-icon">
                        <IoAirplaneSharp size={20} color="white" />
                      </div>
                      <div className="d-grid justify-content-start">
                        <span
                          style={{
                            padding: "0",
                            display: "flex",
                            color: "#B77B50",
                          }}
                        >
                          Jet
                        </span>
                        <NumberFormat
                          style={{
                            padding: "0",
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

                    <div className="d-flex justify-content-start align-items-center py-2">
                      <div className="wallet-icon">
                        <IoIosBoat size={20} color="white" />
                      </div>
                      <div className="d-grid justify-content-start">
                        <span
                          style={{
                            padding: "0",
                            display: "flex",
                            color: "#B77B50",
                          }}
                        >
                          Yacht
                        </span>
                        <NumberFormat
                          style={{
                            padding: "0",
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
              )}
            </div>
            <Button
              onClick={() => {
                setExpendedMenuId("expended");
              }}
              className="nav-button"
            >
              <RiMenu2Line size={windowSize > 1670 ? 28 : 32} color="#bf9767" />
            </Button>
            {/* <Button className="mx-2" onClick={() => history.push("/Dashboard")}>
            Dashboard
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button> */}
          </div>
        </Col>
      ) : (
        <Col
          md={windowSize < 1160 ? 6 : 3}
          xs={6}
          className="p-0 m-0 d-flex justify-content-center align-items-center"
        >
          <Button onClick={handleSell} className="nav-button">
            Sell
          </Button>
          {windowSize < 768 ? (
            <Button onClick={toggleSignIn} className="nav-button">
              Login
            </Button>
          ) : (
            <div className="text-light h-100">
              <Button onClick={toggleSignIn} className="nav-button">
                Sign In
              </Button>
              |
              <Button onClick={toggleSignUp} className="nav-button">
                Sign Up
              </Button>
            </div>
          )}
          <Button
            onClick={() => {
              setExpendedMenuId("expended");
            }}
            className="nav-button"
            aria-label="menu"
          >
            <RiMenu2Line size={windowSize > 1670 ? 28 : 32} color="#bf9767" />
          </Button>
        </Col>
      )}
    </Row>
  );
}

export default NavBar;
