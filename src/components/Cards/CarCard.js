import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../Toast";
import Login from "../Users/Login";
import Modal from "react-bootstrap/Modal";
import Confirm from "../Users/EmailConfirm";
import ForgotPass from "../Users/ForgotPass";
import SignUp from "../Users/SignUp";
import NumberFormat from "react-number-format";
import AuctionTimer from "../Auctions/AuctionTimer";
import authService from "../../services/authServices";
import "../../styles/Card.css";

const CarCard = ({ url, data, id, startingBid, auctionEndDate }) => {
  const user = useSelector((state) => state.user);
  const savedProperty = useSelector((state) => state.savedProperty);
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const toggleImage = () => {
    const userId = user._id;
    const data = {
      userId: userId,
      auctionId: id,
    };
    if (favorite === false) {
      authService.saveProperty(data);
      setFavorite(!favorite);
    } else if (favorite === true) {
      authService.removeProperty(data);
      setFavorite(!favorite);
    }
  };
  const toogleChangePass = () => popChangePass(!changePass);
  const toogleForgotPass = () => popForgotPass(!forgotPass);
  const toogleButton = () => popButton(!showButton);
  const toogleSignIn = () => popSignIn(!showSignIn);
  const toogleSignUp = () => popUpSignUp(!showSignUp);
  const toogleConfirmModal = () => popupConfirm(!showConfirm);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const toogleAuction = () => setAuctionEnded(!auctionEnded);

  const history = useHistory();

  const handleBid = () => {
    if (!user._id) {
      return toogleSignIn();
    }
    if (user.KYC) {
      history.push(`/DisplayAuctions/${id}`);
    } else {
      setShowKYC(true);
    }
  };

  const handleDisplay = () => {
    if (auctionEnded) {
      alert("Auction has ended");
    } else if (!auctionEnded) {
      if (
        history.location.pathname === "/Dashboard" ||
        history.location.pathname === "/Dashboard/Auctions/SavedAuctions"
      ) {
        window.open(`/DisplayAuctions/${id}`);
      } else {
        history.push(`/DisplayAuctions/${id}`);
      }
    }
  };

  useEffect(() => {
    if (user._id) {
      if (savedProperty.length > 0) {
        const saved = savedProperty.filter((property) => property._id === id);
        if (saved) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    }
  }, [savedProperty]);

  return (
    <div>
      {auctionEndDate && (
        <Card className="cards text-left m-auto">
          {showKYC && (
            <Toast type="warning" message="Please complete your KYC" />
          )}
          <Card.Img
            onClick={handleDisplay}
            variant="top"
            src={url}
            className="img-fluid"
            style={{
              width: "100%",
              height: "300px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          />
          <button
            onClick={toggleImage}
            style={{
              border: "none",
              position: "absolute",
              display: "flex",
              marginLeft: "90%",
              top: "10px",
              background: "none",
            }}
          >
            {favorite ? (
              <img src="/images/hearted.png" alt="" />
            ) : (
              <img src="/images/heart.png" alt="" />
            )}
          </button>
          <Card.Body style={{ paddingLeft: "13px" }}>
            <div>
              <div>
                <span className="golden-text">{data.property_address}</span>
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.year} {data.make} {data.model}
                </h4>
              </div>
              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <div>
                  <Row>
                    <Col md={5} style={{ width: "50%", color: "black" }}>
                      <p style={{ fontSize: "15px", width: "100px" }}>
                        Online Auction
                      </p>
                    </Col>

                    <Col md={6} style={{ width: "50%", color: "black" }}>
                      <p
                        style={{
                          fontSize: "12px",

                          width: "250px",
                        }}
                      >
                        Additional Info
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    {auctionEnded ? (
                      <Col md={1} style={{ width: "50%" }}>
                        <p
                          style={{
                            fontSize: "15px",
                            width: "200px",
                            fontWeight: "bold",
                          }}
                        >
                          Auction Ended
                        </p>
                      </Col>
                    ) : (
                      <Col md={1} style={{ width: "50%" }}>
                        <div style={{ fontSize: "12px", width: "200px" }}>
                          <AuctionTimer
                            auctionEndDate={auctionEndDate}
                            toogleAuction={toogleAuction}
                          />
                        </div>
                      </Col>
                    )}

                    <Col md={6} style={{ width: "50%" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          width: "250px",
                        }}
                      >
                        {data.car_type ? data.car_type : "N/A"}|{" "}
                        {data.engine ? data.engine : "N/A"}|{" "}
                        {data.fuel_type ? data.fuel_type : "N/A"}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

            <hr />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <p className="grey-small">Starting Bid</p>
                <p className="black-bold">
                  <NumberFormat
                    value={startingBid}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </p>
              </div>
              {}
              <div
                style={{
                  alignItems: "flex-end",
                  display: "flex",
                  marginRight: "6px",
                }}
              >
                <Button
                  onClick={handleBid}
                  className="black-button text-white"
                  variant="dark"
                >
                  Place Bid
                </Button>
              </div>
            </div>
          </Card.Body>
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
              <Confirm
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
            size="md"
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={forgotPass}
            onHide={toogleForgotPass}
          >
            <Modal.Body className="forgot-modal"></Modal.Body>
          </Modal>
          <Modal
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
              centered
              show={showSignIn}
              onHide={toogleSignIn}
              backdrop="static"
              keyboard={false}
              aria-labelledby="contained-modal-title-vcenter"
              className="sign-In"
            ></Modal.Body>
          </Modal>
          <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={showSignIn}
            onHide={toogleSignIn}
            contentclassname="login"
            backdrop="static"
            keyboard={false}
          >
            <Modal.Body>
              <Login
                toogleSignUp={toogleSignUp}
                toogleSignIn={toogleSignIn}
                toogleButton={toogleButton}
                toogleForgotPass={toogleForgotPass}
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
              aria-labelledby="contained-modal-title-vcenter"
              centered
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
        </Card>
      )}
    </div>
  );
};
export { CarCard };
