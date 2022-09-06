import React, { useState, useEffect } from "react";
import { RiMenu2Line } from "react-icons/ri";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../../slice/userSlice";
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
        style={{ paddingLeft: windowSize > 1070 && "4rem" }}
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
          className="p-0 m-0 d-flex justify-content-center align-items-center"
        >
          <Button className="bg-success border-0">
            {user.firstName} {user.lastName}
          </Button>
          <Button className="mx-2" onClick={() => history.push("/Dashboard")}>
            DashBoard
          </Button>
          <Button variant="danger" onClick={handleLogout}>
            Logout
          </Button>
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
