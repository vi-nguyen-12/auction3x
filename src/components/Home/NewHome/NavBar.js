import React, { useState, useEffect } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { Row, Col, Button, Form } from "react-bootstrap";
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
  change,
  color,
  headerWidth,
  toggleSignIn,
  toggleSignUp,
  windowSize,
  wallet,
  subWallet,
  bodyColorChange,
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
    window.location.reload();
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

  return (
    <Row
      className="p-0 m-0 nav-container"
      style={{
        justifyContent: windowSize < 1070 && "space-around",
        background: color,
      }}
    >
      <Col
        md={3}
        xs={6}
        className="m-0 d-flex justify-content-start align-items-center"
        style={{ paddingLeft: windowSize > 1070 && "2rem" }}
      >
        <img
          onClick={() => {
            history.push("/");
            window.location.reload();
          }}
          src="/images/newName.png"
          width={windowSize < 768 ? "150px" : "180px"}
          height="auto"
          alt=""
          className="logo"
        />
      </Col>
      <Col
        md={6}
        className="p-0 m-0"
        style={{ display: windowSize < 1100 && "none" }}
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
          md={windowSize < 1070 ? 5 : 3}
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
                    <IoIosArrowDown />
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
              <div className="dropdown-content">
                <div className="dropdown-content-items">
                  <span className="d-flex justify-content-center user-names">
                    {user.firstName[0].toUpperCase() + user.firstName.slice(1)}{" "}
                    {user.lastName[0].toUpperCase() + user.lastName.slice(1)}
                  </span>
                  <button
                    className="fw-bold p-3 d-flex justify-content-start align-items-center"
                    onClick={handleOnClick("Dashboard")}
                  >
                    <RiDashboardFill size={20} /> Dashboard
                  </button>
                  <button
                    className="fw-bold p-3 d-flex justify-content-start align-items-center"
                    onClick={handleOnClick("Dashboard/Profile")}
                  >
                    <HiUser size={20} />
                    Profile
                  </button>
                  <button
                    className="fw-bold p-3 d-flex justify-content-start align-items-center"
                    onClick={handleLogout}
                  >
                    <RiLogoutBoxRFill size={20} />
                    Log Out
                  </button>
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
                />
              </Button>
              {showWallet && (
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

                    <div className="d-flex justify-content-start align-items-center mt-2">
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

                    <div className="d-flex justify-content-start align-items-center mt-2">
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

                    <div className="d-flex justify-content-start align-items-center mt-2">
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
            <Button className="nav-button">
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
          md={windowSize < 1070 ? 5 : 3}
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
          <div className="d-flex align-items-center menu-icon">
            <RiMenu2Line size={windowSize > 1670 ? 28 : 27} color="#E0BC8F" />
          </div>
        </Col>
      )}
    </Row>
  );
}

export default NavBar;
