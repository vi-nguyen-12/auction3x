import React from "react";
import { Row, Col, Button, Card, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
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
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../../../../styles/Card.css";

const Carousel = styled(Slider)`
  height: 100%;
  overflow: hidden;
  border-radius: 0;

  & > button {
    opacity: 1;
    height: 100%;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  .slick-prev {
    left: 0;
    width: 5vw;
    height: 100% !important;
    z-index: 1;
  }
  .slick-next {
    right: 0;
    width: 5vw;
    height: 100% !important;
    z-index: 1;
  }
  .slick-next:before{
    font-size: 50px;
    top: 50%;

  }
  .slick-prev:before{
    font-size: 50px;
    top: 50%;
  }
`;
function SavedAuctionsCard({
  urls,
  data,
  id,
  auctionStartDate,
  auctionEndDate,
  startingBid,
  startRegister,
  endRegister,
  type,
}) {
  let history = useHistory();
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
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
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
  const handleBid = () => {
    // history.push(`/DisplayAuctions/${id}`);
    window.open(`/DisplayAuctions/${id}`);
  };

  useEffect(() => {
    if (user._id) {
      const saved = savedProperty.find((item) => item._id === id);
      if (saved) {
        setFavorite(true);
      } else {
        setFavorite(false);
      }
    }
  }, [savedProperty]);

  return (
    <div style={{ margin: "30px" }}>
      {data && (
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
          <Carousel {...settings}>
            {urls.map((items) => (
              <Card.Img
                onClick={handleBid}
                variant="top"
                src={items.url}
                className="img-card img-fluid"
                style={{
                  width: "100%",
                  height: "250px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              />
            ))}
          </Carousel>
          <button onClick={toggleImage} className="favBtn">
            {favorite ? (
              <img src="/images/hearted.png" alt="" />
            ) : (
              <img src="/images/heart.png" alt="" />
            )}
          </button>
          <Card.Body style={{ paddingLeft: "13px" }}>
            <Row>
              {type === "real-estate" ? (
                <span className="golden-text">
                  {data.property_address.formatted_street_address},{" "}
                  {data.property_address.state}
                </span>
              ) : (
                <span className="golden-text">{data.address}</span>
              )}
              {type === "real-estate" ? (
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  Property Address
                </h4>
              ) : type === "car" ? (
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.year} {data.make} {data.model}
                </h4>
              ) : type === "jet" ? (
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.aircraft_builder_name} {data.aircraft_model_designation}
                </h4>
              ) : type === "yacht" ? (
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.manufacturer_name} {data.engine_type}
                </h4>
              ) : null}
            </Row>
            <Row>
              {new Date().toISOString() < auctionStartDate &&
                new Date().toISOString() < endRegister ? (
                <Col md={5} style={{ width: "50%", color: "black" }}>
                  <p
                    style={{ fontSize: "15px", width: "100px", color: "black" }}
                  >
                    Registration
                  </p>
                </Col>
              ) : (
                <Col md={5} style={{ width: "50%", color: "black" }}>
                  <p
                    style={{ fontSize: "15px", width: "100px", color: "black" }}
                  >
                    Online Auction
                  </p>
                </Col>
              )}

              <Col md={6} style={{ width: "50%", color: "black" }}>
                <p
                  style={{
                    fontSize: "15px",
                    width: "250px",
                    color: "black",
                  }}
                >
                  Additional Info
                </p>
              </Col>
            </Row>
            <Row>
              {new Date().toISOString() > auctionEndDate ? (
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
              ) : new Date().toISOString() < auctionStartDate &&
                new Date().toISOString() < endRegister ? (
                <Col md={1} style={{ width: "50%" }}>
                  <div style={{ fontSize: "12px", width: "200px" }}>
                    <AuctionTimer time={endRegister} id={id} />
                  </div>
                </Col>
              ) : new Date().toISOString() < auctionStartDate &&
                new Date().toISOString() > endRegister ? (
                <Col md={1} style={{ width: "50%" }}>
                  <p
                    style={{
                      fontSize: "15px",
                      width: "200px",
                      fontWeight: "bold",
                    }}
                  >
                    Registration Ended
                  </p>
                </Col>
              ) : new Date().toISOString() > auctionStartDate &&
                new Date().toISOString() < auctionEndDate ? (
                <Col md={1} style={{ width: "50%" }}>
                  <div style={{ fontSize: "12px", width: "200px" }}>
                    <AuctionTimer time={auctionEndDate} id={id} />
                  </div>
                </Col>
              ) : (
                <Col md={1} style={{ width: "50%" }}>
                  <div style={{ fontSize: "12px", width: "200px" }}>
                    <AuctionTimer time={auctionEndDate} id={id} />
                  </div>
                </Col>
              )}

              <Col md={6} style={{ width: "50%" }}>
                {type === "real-estate" ? (
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
                    BD | {data.structure.baths ? data.structure.baths : "N/A-"}
                    BA |{" "}
                    {data.parcel.area_sq_ft
                      ? data.parcel.area_sq_ft
                      : "N/A-"}{" "}
                    sq.ft
                  </p>
                ) : type === "car" ? (
                  <p
                    style={{
                      fontSize: "12px",
                      width: "250px",
                      color: "black",
                    }}
                  >
                    {data.car_type ? data.car_type : "N/A"}|{" "}
                    {data.engine ? data.engine : "N/A"}|{" "}
                    {data.fuel_type ? data.fuel_type : "N/A"}
                  </p>
                ) : type === "jet" ? (
                  <p
                    style={{
                      fontSize: "12px",
                      width: "250px",
                      color: "black",
                    }}
                  >
                    {data.number_of_engines
                      ? data.number_of_engines + " Engines"
                      : "N/A"}
                    |{" "}
                    {data.number_of_aircraft
                      ? data.number_of_aircraft + " Aircraft"
                      : "N/A"}
                    | {data.registration_mark ? data.registration_mark : "N/A"}
                  </p>
                ) : type === "yacht" ? (
                  <p
                    style={{
                      fontSize: "12px",
                      width: "250px",
                      color: "black",
                    }}
                  >
                    {data.engine_type ? data.engine_type : "N/A"}|{" "}
                    {data.engine_deck_type ? data.engine_deck_type : "N/A"}|{" "}
                    {data.running_cost ? data.running_cost : "N/A"}
                  </p>
                ) : null}
              </Col>
            </Row>
            <hr style={{ color: "black" }} />
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
              </Col>
              <Col xs={5}>
                <Button
                  onClick={handleBid}
                  className="black-button text-white"
                  variant="dark"
                >
                  Place Bid
                </Button>
              </Col>
            </Row>
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
              aria-labelledby="contained-modal-title-vcenter"
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
