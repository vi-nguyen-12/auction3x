import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
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
import AuctionTimer from "../RealEstate/AuctionTimer";

const CardComp = ({
  url,
  data,
  id,
  auctionStartDate,
  auctionEndDate,
  startingBid,
}) => {
  const user = useSelector((state) => state.user);
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const [auctionDate, setAuctionStartDate] = useState();
  const [auctionEnd, setAuctionEndDate] = useState();
  const toggleImage = () => setFavorite(!favorite);
  const [kycUrl, setKycUrl] = useState("");
  const toogleChangePass = () => popChangePass(!changePass);
  const toogleForgotPass = () => popForgotPass(!forgotPass);
  const toogleButton = () => popButton(!showButton);
  const toogleSignIn = () => popSignIn(!showSignIn);
  const toogleSignUp = () => popUpSignUp(!showSignUp);
  const toogleConfirmModal = () => popupConfirm(!showConfirm);
  const auctions = useSelector((state) => state.auction);
  const [auction, setAuction] = useState([]);
  const [auctionProp, setAuctionProp] = useState();
  const [auctionEnded, setAuctionEnded] = useState(false);
  const toogleAuction = () => setAuctionEnded(!auctionEnded);
  const [onGoingAuctionEnd, setOnGoingAuctionEnd] = useState();

  const history = useHistory();

  const handleBid = () => {
    if (!user._id) {
      return toogleSignIn();
    }
    if (user.KYC) {
      history.push(`/AuctionDisplay/${id}`);
      // window.location.reload();
    } else {
      setShowKYC(true);
    }
  };

  const handleDisplay = () => {
    history.push(`/AuctionDisplay/${id}`);
    // window.setTimeout(() => {
    //   window.location.reload();
    // }, 800);
  };

  useEffect(() => {
    const startDate = new Date(auctionStartDate).toLocaleString().split(",")[0];
    const endDate = new Date(auctionEndDate).toLocaleString().split(",")[0];
    const auctionData = auctions.find((item) => item._id === id);
    setAuction(auctionData);
    setAuctionProp(auctionData.property);
    setAuctionStartDate(startDate);
    setAuctionEndDate(endDate);
    setOnGoingAuctionEnd(auctionData.auctionEndDate);
  }, []);

  return (
    <div>
      {auctionDate && auctionEnd && (
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
                  {data.address.formatted_street_address}, {data.address.state}
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
                    <Col md={5} style={{ width: "50%" }}>
                      <p style={{ fontSize: "15px", width: "100px" }}>
                        Online Auction
                      </p>
                    </Col>

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
                    {auctionEnded ? (
                      <Col md={1} style={{ width: "50%" }}>
                        <p style={{ fontSize: "15px", width: "200px", fontWeight:"bold" }}>
                          Auction Ended
                        </p>
                      </Col>
                    ) : (
                      <Col md={1} style={{ width: "50%" }}>
                        <p style={{ fontSize: "12px", width: "200px" }}>
                          <AuctionTimer
                            auctionEndDate={onGoingAuctionEnd}
                            toogleAuction={toogleAuction}
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
                        {data.structure.beds_count}BD | {data.structure.baths}BA
                        | {data.structure.total_area_sq_ft} sq.ft
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
            size=""
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
            size=""
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
            size=""
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
            size=""
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

export { CardComp };
