import React from "react";
import styled from "styled-components";
import { FaAlignJustify, FaGlobeAmericas } from "react-icons/fa";
import { useState } from "react";
import Login from "./Login";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Modal } from "react-bootstrap";
import "../styles/modalStyle.css";
import Confirm from "./EmailConfirm";
import SignUp from "./SignUp";

const Header = () => {
  const HeaderComp = () => {
    const [showSignIn, popSignIn] = useState(false);
    const [showSignUp, popUpSignUp] = useState(false);
    const [showConfirm, popupConfirm] = useState(false);
    const toogleSignIn = () => popSignIn(!showSignIn);
    const toogleSignUp = () => popUpSignUp(!showSignUp);
    const toogleConfirmModal = () => popupConfirm(!showConfirm);


    return (
      <nav className="customNav navbar navbar-expand-lg p-0">
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
            <li className="nav-item navactive mt-2 p-2 mb-auto">
              <a className="nav-link" href="#" style={{ color: "#D58F5C" }}>
                <b>Real Estate</b>
              </a>
            </li>
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
            <Button
              className="bg-light customButton border-0 mt-2"
              style={{
                marginLeft: 15,
                fontSize: 16,
                color: "black",
                fontWeight: "bold",
              }}
              variant="success"
              onClick={toogleConfirmModal}
            >
              Confirm Email
            </Button>

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
            <a
              className="nav-link"
              href="#"
              style={{ color: "white", marginTop: 5 }}
            >
              <b>Sell</b>
            </a>
            <Button
              className="bg-light customButton border-0 mt-2"
              style={{
                marginLeft: 15,
                fontSize: 16,
                color: "black",
                fontWeight: "bold",
              }}
              variant="success"
              onClick={toogleSignIn}
            >
              Sign In
            </Button>
            <Modal
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={showSignIn}
              onHide={toogleSignIn}
              contentClassName="login"
            >

              <Modal.Body>
                <Login toogleSignUp = {toogleSignUp} modalClose={toogleSignIn} />
              </Modal.Body>
            </Modal>

            <Button
              className="bg-light customButton border-0 mt-2"
              style={{
                marginLeft: 15,
                fontSize: 16,
                color: "black",
                fontWeight: "bold",
              }}
              variant="success"
              onClick={toogleSignUp}
            >
              Sign Up
            </Button>
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
                />
              </Modal.Body>
            </Modal>
            <button
              className="bg-light customIcon mt-2 ml-2 iconsCubstom"
              type="submit"
              style={{ marginLeft: 5 }}
            >
              <div>
                <FaGlobeAmericas />
              </div>
            </button>
          </form>
        </div>
      </nav>
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
