import React, { Component, useEffect, useState, useRef } from "react";
import "../styles/realEstate.css";
import authService from "../services/authServices";
import { Modal, Table, Row, Col, Container } from "react-bootstrap";
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

function DisplayAuctions({ colorChange }) {
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
  const [topBid, setTopBid] = useState();

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
  const [showRegister, setShowRegister] = useState(false);
  const toogleRegister = () => setShowRegister(!showRegister);
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

  const [count, setCount] = useState(0);
  const [sorted, setSorted] = useState(false);

  const sortByPrice = () => {
    if (sorted === false) {
      setSorted(true);
      setAuction(auctions.sort((a, b) => a.bidder.amount - b.bidder.amount));
    } else {
      setSorted(false);
      setAuction(auctions.sort((a, b) => b.bidder.amount - a.bidder.amount));
    }
  };

  //if auction id is found, then set property as already registered
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll

  const handleKYC = () => {
    if (!user.KYC) {
      return alert("Please Complete your KYC first to bid");
    }
  };

  useEffect(() => {
    colorChange("black");
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

    let topBidders = [];
    for (let i = 0; i < auctionData.highestBidders.length; i++) {
      topBidders = [...topBidders, auctionData.highestBidders[i]];
    }
    setTopBid(topBidders.reverse());
  }, [auctions, registProperty]);

  return (
    <>
      {auction && location && auctionProp && (
        <>
          <div
            style={{ position: "relative", width: "100%", marginTop: "70px" }}
          >
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
                      {auctionProp.images.map((item, index) => (
                        <Wrap key={index}>
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
                      {auctionProp.videos.map((item, index) => (
                        <Wrap key={index}>
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
                      <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={18}
                        center={location}
                      >
                        <Marker position={location} />
                      </GoogleMap>
                      <p>
                        {auctionProp.details.address.formatted_street_address}
                      </p>
                    </Modal.Body>
                  </Modal>
                </div>
              )}
            </div>
          </div>

          {/* first row */}
          <Row style={{ padding: "0 35px" }}>
            <Col>
              <h2 style={{ color: "#b77b50" }}>Marbella Detached Villa</h2>
              <h5 style={{ color: "#919191", fontWeight: "400" }}>
                {auctionProp.details.address.formatted_street_address} {","}{" "}
                {auctionProp.details.address.city} {","}{" "}
                {auctionProp.details.address.state}{" "}
                {auctionProp.details.address.zip_code}
              </h5>
            </Col>

            <Col>
              {!user._id && (
                <div
                  style={{
                    display: "grid",
                    justifyContent: "right",
                    width: "100%",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#e8a676",
                      borderRadius: "10px",
                      border: "0",
                      width: "200px",
                      height: "50px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    onClick={toogleSignIn}
                  >
                    Register to Bid
                  </button>
                  <div style={{ marginLeft: "35px", marginTop: "10px" }}>
                    <button
                      style={{
                        fontWeight: "500",
                        border: "0",
                        borderBottom: "1px solid #919191",
                        backgroundColor: "transparent",
                        width: "fit-content",
                        pointer: "cursor",
                      }}
                      onClick={executeScroll}
                    >
                      View Documents
                    </button>
                  </div>
                </div>
              )}

              {user._id && !user.KYC && (
                <div
                  style={{
                    display: "grid",
                    justifyContent: "right",
                    width: "100%",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#e8a676",
                      borderRadius: "10px",
                      border: "0",
                      width: "200px",
                      height: "50px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    onClick={handleKYC}
                  >
                    Register to Bid
                  </button>
                  <div style={{ marginLeft: "35px", marginTop: "10px" }}>
                    <button
                      style={{
                        fontWeight: "500",
                        border: "0",
                        borderBottom: "1px solid #919191",
                        backgroundColor: "transparent",
                        width: "fit-content",
                        pointer: "cursor",
                      }}
                      onClick={executeScroll}
                    >
                      View Documents
                    </button>
                  </div>
                </div>
              )}

              {user._id && user.KYC && !setRegistered && (
                <div
                  style={{
                    display: "grid",
                    justifyContent: "right",
                    width: "100%",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#e8a676",
                      borderRadius: "10px",
                      border: "0",
                      width: "200px",
                      height: "50px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    onClick={toogleRegister}
                  >
                    Register to Bid
                  </button>
                  <div style={{ marginLeft: "35px", marginTop: "10px" }}>
                    <button
                      style={{
                        fontWeight: "500",
                        border: "0",
                        borderBottom: "1px solid #919191",
                        backgroundColor: "transparent",
                        width: "fit-content",
                        pointer: "cursor",
                      }}
                      onClick={executeScroll}
                    >
                      View Documents
                    </button>
                  </div>
                </div>
              )}

              {user._id && user.KYC && setRegistered && (
                <div
                  style={{
                    display: "grid",
                    justifyContent: "right",
                    width: "100%",
                  }}
                >
                  <button
                    style={{
                      backgroundColor: "#e8a676",
                      borderRadius: "10px",
                      border: "0",
                      width: "200px",
                      height: "50px",
                      fontWeight: "bold",
                      fontSize: "20px",
                    }}
                    onClick={tooglePlaceBid}
                  >
                    Bid Now!
                  </button>
                  <div style={{ marginLeft: "35px", marginTop: "10px" }}>
                    <button
                      style={{
                        fontWeight: "500",
                        border: "0",
                        borderBottom: "1px solid #919191",
                        backgroundColor: "transparent",
                        width: "fit-content",
                        pointer: "cursor",
                      }}
                      onClick={executeScroll}
                    >
                      View Documents
                    </button>
                  </div>
                </div>
              )}
            </Col>
          </Row>

          {/* second row */}
          <Row style={{ padding: "35px" }}>
            <Col sm={8} style={{ display: "grid" }}>
              <Row xs="auto" style={{ width: "100vw" }}>
                <Col>
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      backgroundColor: "#e8e8e8",
                      width: "100%",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <AuctionTimer auctionEndDate={onGoingAuctionEnd} />
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        marginLeft: "10px",
                        marginTop: "-10px",
                        color: "#7c7c7c",
                      }}
                    >
                      <p>Auction Ends</p>
                    </div>
                  </div>
                </Col>

                <Col>
                  {auction.highestBid ? (
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        marginLeft: "35px",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <h4 style={{ padding: "8px" }}>
                        <NumberFormat
                          value={auction.highestBid}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          style={{ fontWeight: "700", fontSize: "20px" }}
                        />
                      </h4>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          marginLeft: "10px",
                          marginTop: "-10px",
                          color: "#7c7c7c",
                        }}
                      >
                        Current Bid
                      </p>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        marginLeft: "20px",
                        borderRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      <h4 style={{ padding: "8px" }}>
                        <NumberFormat
                          value={auction.startingBid}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          style={{ fontWeight: "700", fontSize: "20px" }}
                        />
                      </h4>
                      <p
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          marginLeft: "10px",
                          marginTop: "-10px",
                          color: "#7c7c7c",
                        }}
                      >
                        Current Bid
                      </p>
                    </div>
                  )}
                </Col>

                <Col>
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      backgroundColor: "#e8e8e8",
                      width: "100%",
                      marginLeft: "35px",
                      borderRadius: "10px",
                      padding: "10px",
                    }}
                  >
                    <h4 style={{ padding: "8px" }}>199,530</h4>
                    <p
                      style={{
                        display: "flex",
                        justifyContent: "left",
                        marginLeft: "10px",
                        marginTop: "-10px",
                        color: "#7c7c7c",
                      }}
                    >
                      Views
                    </p>
                  </div>
                </Col>
              </Row>

              <Row style={{ width: "50vw" }}>
                <div style={{ marginTop: "30px", alignItems: "center" }}>
                  <span style={{ color: "#b77b50", fontSize: "40px" }}>|</span>
                  <span
                    style={{
                      fontWeight: "400",
                      fontSize: "30px",
                      marginLeft: "20px",
                    }}
                  >
                    Property Info
                  </span>
                </div>

                <Col>
                  <Table responsive>
                    <tbody className="propInfo">
                      <tr>
                        <td>Sale Type</td>
                        <td>Auction</td>
                      </tr>
                      <tr>
                        <td>Sale Condition</td>
                        <td>Auction Sale</td>
                      </tr>
                      <tr>
                        <td>Property Type</td>
                        {auctionProp.details.parcel
                          .county_land_use_description ? (
                          <td>
                            {
                              auctionProp.details.parcel
                                .county_land_use_description
                            }
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Building Size</td>
                        {auctionProp.details.structure.total_area_sq_ft ? (
                          <td>
                            {auctionProp.details.structure.total_area_sq_ft}{" "}
                            sqft
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Building Class</td>
                        {auctionProp.details.structure.quality ? (
                          <td>{auctionProp.details.structure.quality}</td>
                        ) : auctionProp.details.structure.condition ? (
                          <td>{auctionProp.details.structure.condition}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Year Built/Renovated</td>
                        {auctionProp.details.structure.year_built ? (
                          <td>{auctionProp.details.structure.year_built}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Percent Leased</td>
                        <td>N/A</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>

                <Col>
                  <Table responsive>
                    <tbody className="propInfo">
                      <tr>
                        <td>Tenancy</td>
                        {auctionProp.details.parcel
                          .standardized_land_use_type ? (
                          <td>
                            {
                              auctionProp.details.parcel
                                .standardized_land_use_type
                            }
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Building Height</td>
                        {auctionProp.details.structure.stories ? (
                          <td>{auctionProp.details.structure.stories} story</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Building FAR</td>
                        {auctionProp.details.parcel.area_acres ? (
                          <td>{auctionProp.details.parcel.area_acres} acres</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Zoning</td>
                        {auctionProp.details.parcel.zoning ? (
                          <td>{auctionProp.details.parcel.zoning}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Parking</td>
                        {auctionProp.details.structure.parking_spaces_count ? (
                          <td>
                            {auctionProp.details.structure.parking_spaces_count}{" "}
                            spaces ({auctionProp.details.structure.parking_type}
                            )
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Frontage</td>
                        {auctionProp.details.parcel.frontage_ft ? (
                          <td>{auctionProp.details.parcel.frontage_ft} ft</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td>Opportunity Zone</td>
                        <td>No</td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Col>

            <Col sm={4}>
              <Table
                responsive
                bordered
                style={{
                  margin: "auto",
                  justifyContent: "center",
                  textAlign: "center",
                  width: "auto",
                  height: "auto",
                  marginTop: "50px",
                }}
              >
                <thead style={{ backgroundColor: "#d58f5c" }}>
                  <tr>
                    <th colSpan={3}>Top Bidders</th>
                  </tr>
                </thead>
                <thead style={{ backgroundColor: "#d58f5c" }}>
                  <tr>
                    <th>Bidder ID</th>
                    <th>Bid Amount</th>
                    <th>Date/Time</th>
                  </tr>
                </thead>
                <tbody>
                  {topBid ? (
                    topBid.map((bid, index) => (
                      <tr key={index}>
                        <td>{bid.userName}</td>
                        <td>{bid.amount}</td>
                        <td>{new Date(bid.time).toLocaleString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>No bids yet</td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row style={{ padding: "35px" }}>
            <div
              style={{
                marginTop: "30px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span style={{ color: "#b77b50", fontSize: "40px" }}>|</span>
              <span
                style={{
                  fontWeight: "400",
                  fontSize: "25px",
                  marginLeft: "20px",
                }}
              >
                Executive Summary
              </span>
            </div>
            <Col style={{ fontSize: "20px", paddingRight: "40px" }}>
              The Reid Group & Keller Williams Realty, in partnership with
              Ten-X, is pleased to offer for sale this West Milwaukee Medical
              Office. The property is being offered in a Fee Simple interest,
              unencumbered by a management contract. Built by masonry stone in
              1957 and located in West Milwaukee, Wisconsin, this property is a
              single-story, ‡4,856-SF office most recently used as a medical
              office. It features small, private rooms/offices that can be
              converted to something a new investor has a vision for. It is
              zoned NS2, which is commercial and neighborhood shopping. The
              structure itself totals about six offices, a fully functional
              basement, and six surface parking spaces on a 18-acre lot. The
              property is a great value-add opportunity that has been well
              maintained but would absolutely benefit from a renovation and
              strategic marketing/lease-up plan. Today, Milwaukee is one of the
              most ethnically and culturally diverse cities in the United
              States. German immigrants heavily influenced its history in the
              19th century, and it became well known for its brewing industry.
            </Col>

            <Col style={{ fontSize: "20px", paddingRight: "40px" }}>
              In recent years, Milwaukee has been undergoing its largest
              construction boom since the 1960s. Major new additions to the city
              in the past two decades include the Milwaukee Riverwalk, the
              Wisconsin Center, American Family Field, The Hop (streetcar
              system), an expansion to the Milwaukee Art Museum, Milwaukee
              Repertory Theater, the Bradley Symphony Center, and Discovery
              World, as well as major renovations to the UW-Milwaukee Panther
              Arena. Fiserv Forum opened in late 2018 and hosts sporting events
              and concerts. Since 1968, Milwaukee has been home to Summerfest,
              one of the largest music festivals in the world. With regard to
              education, Milwaukee is home to UW-Milwaukee, Marquette
              University, MSOE, and several other universities and colleges. The
              city is home to two major professional sports teams, the Bucks and
              Brewers. It is home to several Fortune 500 companies, including
              Northwestern Mutual, WE Energy Group, Rockwell Automation, and
              Harley-Davidson. Property tours are available by appointment only.
              Please contact Alexander Reid to schedule at 847-791-2420 or
              alexander@reidgroup.house.
            </Col>
          </Row>

          <Row ref={myRef} style={{ marginTop: "50px", padding: "35px" }}>
            {/* ref={myRef}
            style={{ padding: "35px", backgroundColor: "white" }}> */}
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
                    euismod, nisi eget tincidunt congue, nisl nisl euismod nisi,
                    eget congue nisl nisl eget nunc. Vestibulum ante ipsum
                    primis in faucibus orci luctus et ultrices posuere cubilia
                    Curae; Donec euismod, nisi eget tincidunt congue, nisl nisl
                    euismod nisi,
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
                <Table
                  style={{
                    display: "flex",
                    width: "100%",
                    justifyContent: "center",
                  }}
                  borderless
                >
                  <tbody className="tabDocs" style={{ padding: "20px" }}>
                    <tr>
                      <td>
                        <input type="checkbox" /> Broker Offering Memorandum (1)
                      </td>
                      <td>
                        <input type="checkbox" /> Purchase Agreement (3)
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" /> Market and Valuations (4)
                      </td>
                      <td>
                        <input type="checkbox" />
                        Third Party Reports (2)
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <input type="checkbox" /> Operating and Financial (10)
                      </td>
                      <td>
                        <input type="checkbox" /> Title and Insurance (1)
                      </td>
                    </tr>
                    <tr>
                      <td
                        style={{ textAlign: "center", fontSize: "15px" }}
                        colSpan={2}
                      >
                        <input type="checkbox" /> Notify me when the Due
                        Diligence Documents are updated
                      </td>
                    </tr>
                    <tr
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        margin: "auto",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <td>
                        <button
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            outline: "none",
                            color: "#b77b50",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            fontSize: "18px",
                            width: "200px",
                          }}
                        >
                          Download Selected
                        </button>
                      </td>
                      <td>
                        <button
                          style={{
                            backgroundColor: "white",
                            border: "none",
                            outline: "none",
                            color: "#b77b50",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            fontSize: "18px",
                            width: "200px",
                          }}
                        >
                          Download All
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Tab>
            </Tabs>
          </Row>

          {/* <Row style={{ padding: "35px" }}>
            <div
              style={{
                marginTop: "30px",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "30px",
                  color: "#6d6d6d",
                }}
              >
                Similar Properties
              </span>
            </div>
          </Row> */}
          <Modal size="lg" show={bid} onHide={toogleBid} centered>
            <Modal.Body>
              {/* <BuyConfirm /> */}
              <MultiBuyForm />
            </Modal.Body>
          </Modal>

          <Modal
            size="lg"
            backdrop="static"
            keyboard={false}
            show={showRegister}
            onHide={toogleRegister}
            centered
          >
            <Modal.Body>
              {/* <BuyConfirm /> */}
              <MultiBuyForm />
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            keyboard={false}
            size="lg"
            show={placeBid}
            onHide={tooglePlaceBid}
            centered
          >
            <Modal.Body>
              <BuyConfirm tooglePlaceBid={tooglePlaceBid} />
            </Modal.Body>
          </Modal>
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
            backdrop="static"
            keyboard={false}
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
        </>
      )}
    </>
  );
}

export default DisplayAuctions;
