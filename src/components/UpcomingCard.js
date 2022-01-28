import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import Display from "../RealEstate/Display";
import { Link } from "react-router-dom";
import authService from "../services/authServices";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "./Toast";
import Login from "./Login";
import Modal from "react-bootstrap/Modal";
import Confirm from "./EmailConfirm";
import ForgotPass from "./ForgotPass";
import ChangePass from "./ChangePass";
import SignUp from "./SignUp";
import NumberFormat from "react-number-format";
import RegistrationTimer from "../RealEstate/RegistrationTimer";
import Timer from "../RealEstate/Timer";

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
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const toggleImage = () => setFavorite(!favorite);
  const [kycUrl, setKycUrl] = useState("");
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
      history.push(`/Display/${id}`);
      // window.location.reload();
    } else {
      setShowKYC(true);
    }
  };

  const handleDisplay = () => {
    history.push(`/Display/${id}`);
    window.setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  useEffect(() => {
    const startDate = new Date(startRegister).toLocaleString().split(",")[0];
    const endDate = new Date(endRegister).toLocaleString().split(",")[0];
    const auctionData = property.find((item) => item._id === id);
    setRegistrationEndDate(auctionData.registerEndDate);
    setStartRegisterDate(startDate);
    setEndRegisterDate(endDate);
    setStartAuction(auctionData.auctionStartDate);
  }, []);

  console.log(registEnded);
  return (
    <>
      {startRegisterDate && endRegisterDate && startAuction && (
        <div>
          <Card
            // onClick={async () => {const estateData = await authService.sendProperty(id); console.log(estateData)}}
            //move to next page
            className="text-left m-auto"
            style={{
              width: "18rem",
              background: "white",
              padding: "5px",
              width: "450px",
              borderRadius: "10px",
              border: "1px solid lightgrey",
            }}
          >
            {showKYC && (
              <Toast type="warning" message="Please complete your KYC" />
            )}
            {/* <Link to={`/Display/${id}`}> */}
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
            {/* </Link> */}
            <button
              onClick={toggleImage}
              // icon={favorite ? "/images/star-before.png" : "/images/star.png"}
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
                <img src="/images/hearted.png" />
              ) : (
                <img src="/images/heart.png" />
              )}
            </button>
            <Card.Body style={{ paddingLeft: "13px" }}>
              <div>
                <div>
                  <span className="golden-text">
                    {data.address.formatted_street_address},{" "}
                    {data.address.state}
                  </span>
                  <h4 style={{ marginTop: "5px" }}>Property Address</h4>
                </div>
                <div
                  style={{
                    display: "inline-flex",
                  }}
                >
                  <div>
                    <Row>
                      {registEnded && startAuction ? (
                        <Col md={5} style={{ width: "50%" }}>
                          <p style={{ fontSize: "15px", width: "100px" }}>
                            Auction Start:
                          </p>
                        </Col>
                      ) : (
                        <Col md={5} style={{ width: "50%" }}>
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
                          <p
                            style={{
                              fontSize: "12px",
                              width: "200px",
                            }}
                          >
                            <Timer auctionStartDate={startAuction} />
                          </p>
                        </Col>
                      ) : (
                        <Col md={1} style={{ width: "50%" }}>
                          <p style={{ fontSize: "12px", width: "200px" }}>
                            <RegistrationTimer
                              RegistrationEndDate={RegistrationEndDate}
                              toogleRegistEnded={toogleRegistEnded}
                            />
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
                          {data.structure.beds_count}BD | {data.structure.baths}
                          BA | {data.structure.total_area_sq_ft} sq.ft
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
              centered
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
              centered
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
              centered
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
