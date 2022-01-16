import React, { Component, useEffect, useState, useRef } from "react";
import "../styles/realEstate.css";
import authService from "../services/authServices";
import { Modal, Carousel, Table } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import {
  GoogleMap,
  LoadScript,
  Marker,
  StreetViewPanoramaOptions,
} from "@react-google-maps/api";
import env from "../env";
import Confirm from "../components/EmailConfirm";
import ForgotPass from "../components/ForgotPass";
import ChangePass from "../components/ChangePass";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BuyConfirm from "../components/BuyRegister/BuyConfirm";
import MultiBuyForm from "../components/BuyRegister/MultiBuyForm";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import { Tab, Tabs } from "react-bootstrap";
import NumberFormat from "react-number-format";
import DateCountdown from "react-date-countdown-timer";
import AuctionTimer from "./AuctionTimer";

const AuctionDisplay = ({ colorChange }) => {
  colorChange("black");
  const user = useSelector((state) => state.user);
  const { id } = useParams();

  const registProperty = useSelector((state) => state.registProperty);
  let checkProperty = [];
  for (let i = 0; i < registProperty.length; i++) {
    checkProperty = [...checkProperty, registProperty[i]];
  }
  const registeredProperty = checkProperty.find((item) => item._id === id);
  const [setRegistered, setRegisteredProperty] = useState(false);

  const auctions = useSelector((state) => state.auction);

  const [auction, setAuction] = useState([]);
  const [auctionProp, setAuctionProp] = useState();

  const [onGoingAuctionEnd, setOnGoingAuctionEnd] = useState();

  const [location, setLocation] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showLives, setShowLives] = useState(false);
  const toggleLive = () => setShowLives(!showLives);
  const toggleMap = () => setShowMap(!showMap);
  const toggleVids = () => setShowVideos(!showVideos);
  const togglePics = () => setShowPics(!showPics);
  const toggleImage = () => setFavorite(!favorite);

  const [bid, setBid] = useState(false);
  const [placeBid, setPlaceBid] = useState(false);
  const tooglePlaceBid = () => setPlaceBid(!placeBid);

  const toogleBid = () => setBid(!bid);
  const [showSignIn, popSignIn] = useState(false);
  const [showSignUp, popUpSignUp] = useState(false);
  const [showConfirm, popupConfirm] = useState(false);
  const [showButton, popButton] = useState(false);
  const [forgotPass, popForgotPass] = useState(false);
  const [changePass, popChangePass] = useState(false);
  const toogleChangePass = () => popChangePass(!changePass);
  const toogleForgotPass = () => popForgotPass(!forgotPass);
  const toogleButton = () => popButton(!showButton);
  const toogleSignIn = () => popSignIn(!showSignIn);
  const toogleSignUp = () => popUpSignUp(!showSignUp);
  const toogleConfirmModal = () => popupConfirm(!showConfirm);
  const [realTab, setRealTab] = useState("Investment Opportunity");

  //if auction id is found, then set property as already registered
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll

  const handleKYC = () => {
    if (!user.KYC) {
      return alert("Please Complete your KYC first to bid");
    }
  };

  const handleRegister = () => {
    if (!setRegistered) {
      return alert("You have not registered to bid for this property!");
    }
  };

  useEffect(() => {
    //for ongoing auction
    const auctionData = auctions.find((item) => item._id === id);
    setAuction(auctionData);
    setAuctionProp(auctionData.property);

    //set dates for ongoing auction end date
    setOnGoingAuctionEnd(auctionData.auctionEndDate);

    //set location for map
    setLocation({
      name: "Property Location",
      lat: auctionData.property.details.address.latitude,
      lng: auctionData.property.details.address.longitude,
    });
    window.setTimeout(() => {
      window.scrollTo(0, 0);
    }, 0);

    if (user._id && user.KYC) {
      if (registeredProperty !== undefined) {
        setRegisteredProperty(true);
      }
    }
  }, [registProperty]);

  //   console.log(onGoingAuctionEnd);
  const mapStyles = {
    height: "50vh",
    width: "100%",
  };
  const StreetviewStyles = {
    height: "50vh",
    width: "100%",
  };

  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: false,
  };

  let ImgSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
  };

  const Carousel = styled(Slider)`
    height: 30vh;
    overflow: hidden;

    & > button {
      opacity: 0;
      height: 100%;
      width: 5vw;
      z-index: 1;

      &:hover {
        opacity: 1;
        transition: opacity 0.2s ease 0s;
      }
    }

    ul li button {
      &:before {
        top: -3vh;
        font-size: 20px;
        color: gray;
        left: -35px;
      }
    }

    li.slick-active button:before {
      color: #e9af84;
    }

    .slick-list {
      overflow: initial;
    }

    .slick-prev {
      left: -75px;
      width: 12vw;
      height: 100%;
    }

    .slick-next {
      right: -75px;
      width: 12vw;
      height: 100%;
    }
  `;

  const Wrap = styled.div`
    border-radius: 4px;
    cursor: pointer;
    position: relative;

    a {
      border-radius: 4px;
      cursor: pointer;
      display: block;
      position: relative;
      padding: 0;

      img {
        width: 100%;
        height: 30vh;
      }

      // &:hover {
      //   padding: 0;
      //   // border: 4px solid rgba(249, 249, 249, 0.8);
      //   transition-duration: 300ms;
      // }
    }
  `;

  const HomeBottom = styled.div`
    position: absolute;
    bottom: 20vh;
    z-index: 1;
    left: 5vw;
    a {
      color: white !important;
      font-size: 24px;
      font-weight: bolder;
      box-shadow: none !important;
    }
    span {
      color: white;
      font-size: 14px;
      font-weight: bolder;
    }
  `;

  return (
    <>
      {auctionProp && location && (
        <div className="styl">
          <tr className="realHeader">
            <h2 style={{ color: "rgb(233,175,132)" }}>REAL ESTATE</h2>
          </tr>
          <div style={{ position: "relative", width: "100%" }}>
            <img
              src={auctionProp.images[0].url}
              alt="Snow"
              style={{
                display: "flex",
                justifyContent: "center",
                margin: "auto",
                padding: "35px",
                width: "100%",
                borderRadius: "15px",
                position: "relative",
                height: "auto",
              }}
            />
            <div
              style={{
                display: "inline-block",
                position: "absolute",
                top: "50%",
                left: "92%",
                transform: "translate(-50%, -50%)",
                height: "405px",
                marginRight: "100%",
                border: "none",
                cursor: "pointer",
                backgroundColor: "white",
                borderRadius: "10px",
              }}
            >
              <div>
                <button
                  onClick={toggleImage}
                  // icon={favorite ? "/images/star-before.png" : "/images/star.png"}
                  style={{
                    border: "none",
                    position: "relative",
                    background: "none",
                    borderBottom: "1px solid #e6e6e6",
                    display: "flex",
                    justifyContent: "center",
                    padding: "15px",
                    width: "100%",
                  }}
                >
                  {favorite ? (
                    <img src="/images/star.png" />
                  ) : (
                    <img src="/images/star-before.png" />
                  )}
                </button>
              </div>

              <div>
                <button
                  style={{
                    border: "none",
                    position: "relative",
                    top: "10px",
                    background: "none",
                    borderBottom: "1px solid #e6e6e6",
                    display: "flex",
                    justifyContent: "center",
                    padding: "15px",
                    width: "100%",
                  }}
                  onClick={togglePics}
                >
                  <img
                    style={{ borderRadius: "15px" }}
                    src="/images/picture.png"
                  />
                </button>
                <Modal
                  size="lg"
                  style={{ height: "100%" }}
                  show={showPics}
                  onHide={togglePics}
                  centered
                >
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h2 style={{ color: " #e9af84" }}>Property Pictures</h2>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Carousel
                      style={{ height: "100%", borderRadius: "15px" }}
                      {...ImgSettings}
                    >
                      {auctionProp.images.map((item) => (
                        <Wrap>
                          <a>
                            <img
                              style={{ height: "50vh" }}
                              src={item.url}
                              alt=""
                            />
                          </a>
                        </Wrap>
                      ))}
                    </Carousel>
                  </Modal.Body>
                </Modal>
              </div>

              <div>
                <button
                  onClick={toggleVids}
                  style={{
                    border: "none",
                    position: "relative",
                    top: "10px",
                    background: "none",
                    borderBottom: "1px solid #e6e6e6",
                    display: "flex",
                    justifyContent: "center",
                    padding: "15px",
                    width: "100%",
                  }}
                >
                  <img src="/images/video.png" />
                </button>

                <Modal size="lg" show={showVideos} onHide={toggleVids} centered>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      <h2 style={{ color: " #e9af84" }}>Property Videos</h2>
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ height: "500px" }}>
                    <Carousel
                      style={{ height: "100%", borderRadius: "15px" }}
                      {...settings}
                    >
                      {auctionProp.videos.map((item) => (
                        <Wrap>
                          <a>
                            <video
                              style={{
                                display: "relative",
                                justifyContent: "center",
                                margin: "auto",

                                width: "100%",
                                borderRadius: "15px",
                                position: "relative",
                                height: "3000px!important",
                                cursor: "pointer",
                              }}
                              controls
                            >
                              <source src={item.url} type="video/webm" />
                            </video>
                          </a>
                        </Wrap>
                      ))}
                    </Carousel>
                  </Modal.Body>
                </Modal>
              </div>
              <div>
                <button
                  style={{
                    border: "none",
                    position: "relative",
                    top: "10px",
                    background: "none",
                    borderBottom: "1px solid #e6e6e6",
                    display: "flex",
                    justifyContent: "center",
                    padding: "15px",
                    width: "100%",
                  }}
                  onClick={toggleLive}
                >
                  <img src="/images/360.png" />
                </button>
              </div>

              {auctionProp && (
                <div>
                  <button
                    onClick={toggleMap}
                    style={{
                      border: "none",
                      position: "relative",
                      top: "10px",
                      background: "none",
                      display: "flex",
                      justifyContent: "center",
                      padding: "15px",
                      width: "100%",
                    }}
                  >
                    <img src="/images/location.png" />
                  </button>
                  <Modal size="lg" show={showMap} onHide={toggleMap} centered>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        <h2 style={{ color: " #e9af84" }}>Property Location</h2>
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <LoadScript {...env.API_Key}>
                        <GoogleMap
                          mapContainerStyle={mapStyles}
                          zoom={18}
                          center={location}
                        ></GoogleMap>
                      </LoadScript>
                      <p>
                        {auctionProp.details.address.formatted_street_address}
                      </p>
                    </Modal.Body>
                  </Modal>
                </div>
              )}
            </div>
          </div>
          <div
            className="list-info-1"
            style={{ display: "inline-block", padding: "35px" }}
          >
            <tr>
              <td>
                <h2 style={{ color: "#B77B50" }}>
                  Luxury Villa in Los Angeles
                </h2>
                <div>
                  <p>{auctionProp.details.address.formatted_street_address}</p>
                </div>
              </td>
              {!user._id && (
                <td
                  style={{
                    position: "absolute",
                    right: "100px",
                    width: "240px",
                    fontSize: "17px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      marginLeft: "35px",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <button
                        className="customButton"
                        style={{ width: "200px", fontSize: "20px" }}
                        onClick={toogleSignIn}
                      >
                        Bid Now!
                      </button>
                    </div>

                    <b
                      style={{
                        borderBottom: "1px solid #6D6D6D",
                        cursor: "pointer",
                        color: "#6D6D6D",
                      }}
                      onClick={executeScroll}
                    >
                      View Document
                    </b>
                  </div>
                </td>
              )}

              {user._id && !user.KYC && (
                <td
                  style={{
                    position: "absolute",
                    right: "100px",
                    width: "240px",
                    fontSize: "17px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      marginLeft: "35px",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <button
                        className="customButton"
                        style={{ width: "200px", fontSize: "20px" }}
                        onClick={handleKYC}
                      >
                        Bid Now!
                      </button>
                    </div>

                    <b
                      style={{
                        borderBottom: "1px solid #6D6D6D",
                        cursor: "pointer",
                        color: "#6D6D6D",
                      }}
                      onClick={executeScroll}
                    >
                      View Document
                    </b>
                  </div>
                </td>
              )}

              {user._id && user.KYC && !setRegistered && (
                <td
                  style={{
                    position: "absolute",
                    right: "100px",
                    width: "240px",
                    fontSize: "17px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      marginLeft: "35px",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <button
                        className="customButton"
                        style={{ width: "200px", fontSize: "20px" }}
                        onClick={handleRegister}
                      >
                        Bid Now!
                      </button>
                    </div>
                    <Modal size="lg" show={bid} onHide={toogleBid} centered>
                      <Modal.Body>
                        {/* <BuyConfirm /> */}
                        <MultiBuyForm />
                      </Modal.Body>
                    </Modal>

                    <b
                      style={{
                        borderBottom: "1px solid #6D6D6D",
                        cursor: "pointer",
                        color: "#6D6D6D",
                      }}
                      onClick={executeScroll}
                    >
                      View Document
                    </b>
                  </div>
                </td>
              )}

              {user._id && user.KYC && setRegistered && (
                <td
                  style={{
                    position: "absolute",
                    right: "100px",
                    width: "240px",
                    fontSize: "17px",
                  }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      justifyContent: "center",
                      textAlign: "center",
                      width: "100%",
                      marginLeft: "35px",
                      padding: "15px",
                      borderRadius: "10px",
                    }}
                  >
                    <div>
                      <button
                        className="customButton"
                        style={{ width: "200px", fontSize: "20px" }}
                        onClick={tooglePlaceBid}
                      >
                        Bid Now!
                      </button>
                    </div>

                    <b
                      style={{
                        borderBottom: "1px solid #6D6D6D",
                        cursor: "pointer",
                        color: "#6D6D6D",
                      }}
                      onClick={executeScroll}
                    >
                      View Document
                    </b>
                  </div>
                </td>
              )}

              {/* <td>
            <div>
              <button onClick={tooglePlaceBid}>place to bid</button>
            </div>
          </td> */}
              <Modal size="lg" show={placeBid} onHide={tooglePlaceBid} centered>
                <Modal.Body>
                  <BuyConfirm />
                </Modal.Body>
              </Modal>
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

              <Modal
                size=""
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={forgotPass}
                onHide={toogleForgotPass}
                centered
                contentClassName="forgotPass"
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
                contentClassName="forgotPass"
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
                contentClassName="login"
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
                contentClassName="custom-modal-style"
              >
                <Modal.Body>
                  <SignUp
                    toogleSignUp={toogleSignUp}
                    toogleConfirmModal={toogleConfirmModal}
                    toogleSignIn={toogleSignIn}
                  />
                </Modal.Body>
              </Modal>
            </tr>
          </div>
          <div className="list-info-2">
            <div
              style={{
                display: "inline-block",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "#E8E8E8",
                width: "20%",
                marginLeft: "35px",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <h4> Online Auction</h4>
              <AuctionTimer auctionEndDate={onGoingAuctionEnd} />
            </div>
            {auction.highestBid ? (
              <div
                style={{
                  display: "inline-block",
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundColor: "#E8E8E8",
                  width: "15%",
                  marginLeft: "35px",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <h4>
                  <NumberFormat
                    value={auction.highestBid}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </h4>
                <p> Starting Bid</p>
              </div>
            ) : (
              <div
                style={{
                  display: "inline-block",
                  justifyContent: "center",
                  textAlign: "center",
                  backgroundColor: "#E8E8E8",
                  width: "15%",
                  marginLeft: "35px",
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                <h4>
                  <NumberFormat
                    value={auction.startingBid}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </h4>
                <p> Starting Bid</p>
              </div>
            )}

            <div
              style={{
                display: "inline-block",
                justifyContent: "center",
                textAlign: "center",
                backgroundColor: "#E8E8E8",
                width: "15%",
                marginLeft: "35px",
                padding: "15px",
                borderRadius: "10px",
              }}
            >
              <h4>12,3456</h4>
              <p> Views</p>
            </div>
            <div style={{ padding: "35px" }}>
              <h2>
                <span style={{ color: "#B77B50" }}>|</span>Property Information
              </h2>

              <tr>
                <td
                  style={{
                    width: "240px",
                    position: "relative",
                    left: "105px",
                    padding: "15px",
                  }}
                >
                  Sale Type
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "500px",
                    width: "240px",
                    fontSize: "17px",
                    padding: "15px",
                  }}
                >
                  Tenancy
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "240px",
                    padding: "15px",
                    position: "relative",
                    left: "105px",
                  }}
                >
                  Sale Condition
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "500px",
                    width: "240px",
                    fontSize: "17px",
                    padding: "15px",
                    padding: "15px",
                  }}
                >
                  Building Height:
                  <span style={{ fontWeight: "bold" }}>
                    {auctionProp.details.structure.stories} Stories
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "240px",
                    position: "relative",
                    padding: "15px",
                    left: "105px",
                  }}
                >
                  Property Type:
                  <span style={{ fontWeight: "bold" }}>
                    {auctionProp.details.parcel.county_land_use_description}
                  </span>
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "500px",
                    width: "240px",
                    fontSize: "17px",
                    padding: "15px",
                  }}
                >
                  Building FAR
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "240px",
                    padding: "15px",
                    position: "relative",
                    left: "105px",
                  }}
                >
                  Building Size:
                  <span style={{ fontWeight: "bold" }}>
                    {auctionProp.details.structure.total_area_sq_ft} sq.ft
                  </span>
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "500px",
                    width: "240px",
                    padding: "15px",
                    fontSize: "17px",
                  }}
                >
                  Zoning:
                  <span style={{ fontWeight: "bold" }}>
                    {auctionProp.details.parcel.zoning}
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "240px",
                    padding: "15px",
                    position: "relative",
                    left: "105px",
                  }}
                >
                  Building Class:
                  <span style={{ fontWeight: "bold" }}>
                    {auctionProp.details.structure.quality}
                  </span>
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "500px",
                    width: "240px",
                    padding: "15px",
                    fontSize: "17px",
                  }}
                >
                  Parking:
                  <span style={{ fontWeight: "bold" }}>
                    {auctionProp.details.structure.parking_type}
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "240px",
                    padding: "15px",
                    position: "relative",
                    left: "105px",
                  }}
                >
                  Year Built/ Renovated:
                  <span style={{ fontWeight: "bold" }}>
                    {auctionProp.details.structure.year_built}
                  </span>
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "500px",
                    width: "240px",
                    padding: "15px",
                    fontSize: "17px",
                  }}
                >
                  Frontage:
                  <span style={{ fontWeight: "bold" }}>
                    {auctionProp.details.parcel.frontage_ft}
                  </span>
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    width: "240px",
                    padding: "15px",
                    position: "relative",
                    left: "105px",
                  }}
                >
                  Percent Leased:
                  <span style={{ fontWeight: "bold" }}>N/A</span>
                </td>
                <td
                  style={{
                    position: "absolute",
                    right: "500px",
                    padding: "15px",
                    width: "240px",
                    fontSize: "17px",
                  }}
                >
                  Opportunity Zone:
                  <span style={{ fontWeight: "bold" }}>N/A</span>
                </td>
              </tr>
              {/* <tr>
                <td>{auction.highestBidders}</td>
              </tr> */}
            </div>

            <div style={{ padding: "35px" }}>
              <tr>
                
                <h2>
                  <span style={{ color: "#B77B50" }}>|</span>Executive Summary
                </h2>
              </tr>
              <tr>
                <td>
                  The Reid Group & Keller Williams Realty, in partnership with
                  Ten-X, is pleased to offer for sale this West Milwaukee
                  Medical Office. The property is being offered in a Fee Simple
                  interest, unencumbered by a management contract. Built by
                  masonry stone in 1957 and located in West Milwaukee,
                  Wisconsin, this property is a single-story, ‡4,856-SF office
                  most recently used as a medical office. It features small,
                  private rooms/offices that can be converted to something a new
                  investor has a vision for. It is zoned NS2, which is
                  commercial and neighborhood shopping. The structure itself
                  totals about six offices, a fully functional basement, and six
                  surface parking spaces on a 18-acre lot. The property is a
                  great value-add opportunity that has been well maintained but
                  would absolutely benefit from a renovation and strategic
                  marketing/lease-up plan. Today, Milwaukee is one of the most
                  ethnically and culturally diverse cities in the United States.
                  German immigrants heavily influenced its history in the 19th
                  century, and it became well known for its brewing industry.
                </td>
                <td>
                  In recent years, Milwaukee has been undergoing its largest
                  construction boom since the 1960s. Major new additions to the
                  city in the past two decades include the Milwaukee Riverwalk,
                  the Wisconsin Center, American Family Field, The Hop
                  (streetcar system), an expansion to the Milwaukee Art Museum,
                  Milwaukee Repertory Theater, the Bradley Symphony Center, and
                  Discovery World, as well as major renovations to the
                  UW-Milwaukee Panther Arena. Fiserv Forum opened in late 2018
                  and hosts sporting events and concerts. Since 1968, Milwaukee
                  has been home to Summerfest, one of the largest music
                  festivals in the world. With regard to education, Milwaukee is
                  home to UW-Milwaukee, Marquette University, MSOE, and several
                  other universities and colleges. The city is home to two major
                  professional sports teams, the Bucks and Brewers. It is home
                  to several Fortune 500 companies, including Northwestern
                  Mutual, WE Energy Group, Rockwell Automation, and
                  Harley-Davidson. Property tours are available by appointment
                  only. Please contact Alexander Reid to schedule at
                  847-791-2420 or alexander@reidgroup.house.
                </td>
              </tr>
            </div>
          </div>
          <form>
            <div
              ref={myRef}
              style={{ padding: "35px", backgroundColor: "white" }}
            >
              <Tabs
                activeKey={realTab}
                onSelect={() => setRealTab()}
                className="RealEstate-Tab"
              >
                <Tab
                  eventKey="Investment Opportunity"
                  title="Investment Opportunity"
                  className="RealEstate-Tab-1"
                  style={{
                    backgroundColor: "#B77B50",
                    border: "none",
                    outline: "none",
                    fontSize: "12px",
                    borderRadius: "4px",
                    padding: "20px",
                  }}
                >
                  <div style={{ color: "white" }}>
                    <h3>Detailed Despcription</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque euismod, urna eu tempor congue, ipsum nunc
                      consectetur nisi, eget congue nisl nisl eget nunc.
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                      ultrices posuere cubilia Curae; Donec euismod, nisi eget
                      tincidunt congue, nisl nisl euismod nisi, eget congue nisl
                      nisl eget nunc. Vestibulum ante ipsum primis in faucibus
                      orci luctus et ultrices posuere cubilia Curae; Donec
                      euismod, nisi eget tincidunt congue, nisl nisl euismod
                      nisi, eget congue nisl nisl eget nunc. Vestibulum ante
                      ipsum primis in faucibus orci luctus et ultrices posuere
                      cubilia Curae; Donec euismod, nisi eget tincidunt congue,
                      nisl nisl euismod nisi,
                    </p>
                  </div>
                </Tab>
                <Tab
                  eventKey="Location Information"
                  title="Location Information"
                  style={{
                    backgroundColor: "#B77B50",
                    border: "none",
                    outline: "none",
                    fontSize: "12px",
                    borderRadius: "4px",
                    padding: "20px",
                  }}
                >
                  
                  <div style={{ color: "white" }}>
                    <h3>Location Highlight</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque euismod, urna eu tempor congue, ipsum nunc
                      consectetur nisi, eget congue nisl nisl eget nunc.
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                    </p>
                  </div>
                </Tab>
                <Tab
                  eventKey="Market Information"
                  title="Market Information"
                  style={{
                    backgroundColor: "#B77B50",
                    border: "none",
                    outline: "none",
                    fontSize: "12px",
                    borderRadius: "4px",
                    padding: "20px",
                  }}
                >
                  
                  <div style={{ color: "white" }}>
                    <h3> Market Overview</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Pellentesque euismod, urna eu tempor congue, ipsum nunc
                      consectetur nisi, eget congue nisl nisl eget nunc.
                      Vestibulum ante ipsum primis in faucibus orci luctus et
                    </p>
                  </div>
                </Tab>

                <Tab
                  eventKey="Document Vault"
                  title="Document Vault"
                  style={{
                    backgroundColor: "#B77B50",
                    border: "none",
                    outline: "none",
                    fontSize: "12px",
                    borderRadius: "4px",
                    padding: "20px",
                  }}
                >
                  <div
                    style={{
                      color: "white",
                      display: "inline-block",
                      alignItems: "center",
                      position: "relative",
                      marginLeft: "35%",
                    }}
                  >
                    <div>
                      <tr>
                        <td className="DocVault">
                          <input type="checkbox" name="checkbox" /> Broker
                          Offering Memorandum (1)
                        </td>
                        <td className="DocVault">
                          <input type="checkbox" name="checkbox" /> Purchase
                          Agreement (3)
                        </td>
                      </tr>
                      <tr>
                        <td className="DocVault">
                          <input type="checkbox" name="checkbox" /> Market and
                          Valuations (4)
                        </td>
                        <td className="DocVault">
                          <input type="checkbox" name="checkbox" /> Third Party
                          Reports (2)
                        </td>
                      </tr>
                      <tr>
                        <td className="DocVault">
                          <input type="checkbox" name="checkbox" /> Operating
                          and Financial (10)
                        </td>
                        <td className="DocVault">
                          <input type="checkbox" name="checkbox" /> Title and
                          Insurance (1)
                        </td>
                      </tr>
                    </div>
                    <div className="DocVault-1">
                      <input type="checkbox" name="checkbox" />
                      <span
                        style={{
                          paddingLeft: "10px",
                          color: "#94a5b2",
                          fontSize: "13px",
                        }}
                      >
                        I agree to the Terms and Conditions
                      </span>
                    </div>
                    <div className="DocVault-1">
                      <button
                        style={{
                          backgroundColor: "white",
                          color: "#B77B50",
                          padding: "10px",
                          borderRadius: "10px",
                          margin: "auto",
                        }}
                        onClick={null}
                      >
                        Download Selected
                      </button>
                      <button
                        style={{
                          backgroundColor: "white",
                          color: "#B77B50",
                          padding: "10px",
                          borderRadius: "10px",
                          margin: "auto",
                        }}
                        onClick={null}
                      >
                        Download All
                      </button>
                    </div>
                  </div>
                </Tab>
              </Tabs>
            </div>
          </form>
        </div>
      )}
    </>
  );
};
export default AuctionDisplay;
