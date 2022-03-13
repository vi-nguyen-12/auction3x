import React from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../../../Toast";
import Login from "../../../Users/Login";
import Modal from "react-bootstrap/Modal";
import Confirm from "../../../Users/EmailConfirm";
import ForgotPass from "../../../Users/ForgotPass";
import SignUp from "../../../Users/SignUp";
import NumberFormat from "react-number-format";
import AuctionTimer from "../../../Auctions/AuctionTimer";
import authService from "../../../../services/authServices";
import "../../../../styles/Card.css";

function SavedAuctionsCard({
  url,
  data,
  id,
  auctionStartDate,
  auctionEndDate,
  startingBid,
}) {
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
  const auctions = useSelector((state) => state.auction);
  const property = useSelector((state) => state.property);
  const [auctionEnded, setAuctionEnded] = useState(false);
  const toogleAuction = () => setAuctionEnded(!auctionEnded);
  const [onGoingAuctionEnd, setOnGoingAuctionEnd] = useState();

  const history = useHistory();

  const handleBid = () => {
    if (!user._id) {
      return toogleSignIn();
    }
    if (user.KYC) {
      window.open(`/DisplayAuctions/${id}`);
      // window.location.reload();
    } else {
      setShowKYC(true);
    }
  };

  const handleDisplay = () => {
    window.open(`/DisplayAuctions/${id}`);
    // window.setTimeout(() => {
    //   window.location.reload();
    // }, 800);
  };

  useEffect(() => {
    if (auctionStartDate !== undefined) {
      const startDate = new Date(auctionStartDate)
        .toLocaleString()
        .split(",")[0];
      setAuctionStartDate(startDate);
    } else {
      const startDate = "n/a";
      setAuctionStartDate(startDate);
    }
    const endDate = new Date(auctionEndDate).toLocaleString().split(",")[0];
    const auctionData = auctions.find((item) => item._id === id);
    const propertyData = property.find((item) => item._id === id);
    setAuctionEndDate(endDate);
    setOnGoingAuctionEnd(
      auctionData ? auctionData.auctionEndDate : propertyData.auctionEndDate
    );
  }, []);
  return (
    <div style={{ margin: "30px" }}>
      {auctionDate && auctionEnd && (
        <Card
          className="savedCard text-left m-auto"
          style={{
            position: "relative",
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
          {/* <Link to={`/Display/${id}`}> */}
          <Card.Img
            onClick={handleDisplay}
            variant="top"
            src={url}
            className="img-fluid"
            style={{
              width: "100%",
              height: "250px",
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
              <img src="/images/hearted.png" alt="" />
            ) : (
              <img src="/images/heart.png" alt="" />
            )}
          </button>
          <Card.Body style={{ paddingLeft: "13px" }}>
            {/* <Container> */}
            {/* <div> */}
            <Row>
              <span className="golden-text">
                {data.address.formatted_street_address}, {data.address.state}
              </span>
              <h4 style={{ marginTop: "5px", color: "black" }}>Property Address</h4>
            </Row>
            {/* </div> */}
            {/* <div
              style={{
                display: "inline-flex",
              }}
            > */}
            {/* <div> */}
            <Row>
              <Col md={5} style={{ width: "50%", color: "black" }}>
                <p style={{ fontSize: "15px", width: "100px", color: "black" }}>
                  Online Auction
                </p>
              </Col>

              <Col md={6} style={{ width: "50%", color: "black" }}>
                <p
                  style={{
                    fontSize: "15px",
                    width: "250px",
                    color: "black"
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
                      auctionEndDate={onGoingAuctionEnd}
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
                    color: "black",
                  }}
                >
                  {data.structure.beds_count
                    ? data.structure.beds_count
                    : "N/A-"}
                  BD | {data.structure.baths ? data.structure.baths : "N/A-"}BA
                  |{" "}
                  {data.structure.total_area_sq_ft
                    ? data.structure.total_area_sq_ft
                    : "N/A-"}{" "}
                  sq.ft
                </p>
              </Col>
            </Row>
            {/* </div> */}
            {/* </div> */}

            <hr style={{ color: "black" }} />
            {/* <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            > */}
            {/* <div> */}
            <Row>
              <Col style={{ display: "grid", justifyContent: "flex-start" }}>
                <p className="grey-small">Starting Bid</p>
                <p className="black-bold">
                  <NumberFormat
                    value={startingBid}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </p>
                {/* </div> */}
              </Col>
              { }
              {/* <div
                style={{
                  alignItems: "flex-end",
                  display: "flex",
                  marginRight: "6px",
                }}
              > */}
              <Col xs={5}>
                <Button
                  onClick={handleBid}
                  className="black-button text-white"
                  variant="dark"
                >
                  Place Bid
                </Button>
              </Col>
              {/* </div> */}
              {/* </div> */}
            </Row>
            {/* </Container> */}
          </Card.Body>
          <Modal
            backdrop="static"
            keyboard={false}
            aria-labelledby="contained-modal-title-vcenter"
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
}

export default SavedAuctionsCard;
