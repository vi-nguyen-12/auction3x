import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../Toast";
import Login from "../Users/Login";
import Modal from "react-bootstrap/Modal";
import Confirm from "../Users/EmailConfirm";
import ForgotPass from "../Users/ForgotPass";
import ChangePass from "../Users/ChangePass";
import SignUp from "../Users/SignUp";
import NumberFormat from "react-number-format";
import RegistrationTimer from "./RegistrationTimer";
import Timer from "./Timer";
import authService from "../../services/authServices";

const UpcomingCard = ({
  url,
  data,
  id,
  startRegister,
  endRegister,
  startingBid,
}) => {
  const user = useSelector((state) => state.user);
  const property = useSelector((state) => state.property);
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
    const data = {
      userId: user._id,
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
  const [startRegisterDate, setStartRegisterDate] = useState();
  const [endRegisterDate, setEndRegisterDate] = useState();
  const [RegistrationEndDate, setRegistrationEndDate] = useState();
  const [registEnded, setRegistEnded] = useState(false);
  const [startAuction, setStartAuction] = useState();
  const toogleRegistEnded = () => setRegistEnded(!registEnded);

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
    if (
      history.location.pathname === "/dashboard" ||
      history.location.pathname === "/dashboard/Auctions/SavedAuctions"
    ) {
      window.open(`/DisplayAuctions/${id}`);
    } else {
      history.push(`/DisplayAuctions/${id}`);
    }
  };

  useEffect(() => {
    const startDate = new Date(startRegister).toLocaleString().split(",")[0];
    const endDate = new Date(endRegister).toLocaleString().split(",")[0];
    const auctionData = property.find((item) => item._id === id);
    if (user._id) {
      if (savedProperty.length > 0) {
        if (savedProperty.find((item) => item._id === id)) {
          setFavorite(true);
        }
      }
    }

    setRegistrationEndDate(auctionData.registerEndDate);
    setStartRegisterDate(startDate);
    setEndRegisterDate(endDate);
    setStartAuction(auctionData.auctionStartDate);
  }, []);

  return (
    <>
      {startRegisterDate && endRegisterDate && startAuction && (
        <div>
          <Card
            className="cards text-left m-auto"
            style={{
              background: "white",
              padding: "5px",
              width: "450px",
              borderRadius: "10px",
              border: "1px solid lightgrey",
              boxShadow:
                "0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
              transition: "all ease 200ms",
              color: "black",
            }}
          >
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
                  <span className="golden-text">{data.address}</span>
                  <h4 style={{ marginTop: "5px", color: "black" }}>
                    Property Address
                  </h4>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                  }}
                >
                  <div>
                    <Row>
                      {registEnded && startAuction ? (
                        <Col md={5} style={{ width: "50%", color: "black" }}>
                          <p style={{ fontSize: "15px", width: "100px" }}>
                            Auction Start:
                          </p>
                        </Col>
                      ) : (
                        <Col md={5} style={{ width: "50%", color: "black" }}>
                          <p style={{ fontSize: "15px", width: "100px" }}>
                            Registration:
                          </p>
                        </Col>
                      )}

                      <Col md={6} style={{ width: "50%" }}>
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
                      {registEnded && startAuction ? (
                        <Col md={1} style={{ width: "50%" }}>
                          <div
                            style={{
                              fontSize: "12px",
                              width: "200px",
                            }}
                          >
                            <Timer auctionStartDate={startAuction} />
                          </div>
                        </Col>
                      ) : (
                        <Col md={1} style={{ width: "50%" }}>
                          <div style={{ fontSize: "12px", width: "200px" }}>
                            <RegistrationTimer
                              time={RegistrationEndDate}
                              toogleRegistEnded={toogleRegistEnded}
                            />
                          </div>
                        </Col>
                      )}

                      <Col md={6} style={{ width: "50%", color: "black" }}>
                        <p
                          style={{
                            fontSize: "12px",
                            color: "black",
                            width: "250px",
                          }}
                        >
                          {data.structure.beds_count
                            ? data.structure.beds_count
                            : "N/A-"}
                          BD |{" "}
                          {data.structure.baths ? data.structure.baths : "N/A-"}
                          BA |{" "}
                          {data.structure.total_area_sq_ft
                            ? data.structure.total_area_sq_ft
                            : "N/A-"}{" "}
                          sq.ft
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
                {registEnded ? (
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
                      disabled
                    >
                      Registeration Ended
                    </Button>
                  </div>
                ) : (
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
                      Register to Bid
                    </Button>
                  </div>
                )}
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
                />
              </Modal.Body>
            </Modal>

            <Modal
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
        </div>
      )}
    </>
  );
};

export { UpcomingCard };
