import React, { useState, useEffect } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { Row, Col, Button, Form } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../slice/userSlice";
import wallets from "../../../images/wallet.png";
import { IoIosArrowDown } from "react-icons/io";
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

  const handleOnClick = (page) => () => {
    bodyColorChange("#F5F9FF");
    history.push(`/${page}`);
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
      style={{ justifyContent: windowSize < 1070 && "space-around" }}
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
          <li onClick={handleOnClick("realEstates")} className="nav-item">
            Real Estate
          </li>
          <li onClick={handleOnClick("cars")} className="nav-item">
            Car
          </li>
          <li onClick={handleOnClick("jets")} className="nav-item">
            Jet
          </li>
          <li onClick={handleOnClick("yachts")} className="nav-item">
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
            <Button className="user-name p-0">
              Hello, {user.firstName[0].toUpperCase() + user.firstName.slice(1)}
              <div className="d-flex justify-content-center align-items-center mx-2">
                <IoIosArrowDown />
              </div>
            </Button>
            <div className="position-absolute bg-white drop-item">
              <div className="drop-item-lists">Dashboard</div>
              <div className="drop-item-lists">
                <Button variant="danger" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
            <Button className="nav-button">
              <img
                style={{ cursor: "pointer" }}
                src={wallets}
                width={windowSize > 1670 ? "23px" : "26px"}
                height="auto"
                alt=""
              />
            </Button>
            <Button className="nav-button p-0">
              <RiMenu2Line
                size={windowSize > 1670 ? 28 : 32}
                className="menu-icon"
                color="#bf9767"
              />
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
            <Button className="nav-button">Login</Button>
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
