import React, { useEffect, useState, useRef } from "react";
import "../../styles/realEstate.css";
import { Modal, Table, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { GoogleMap, Marker } from "@react-google-maps/api";
import Confirm from "../Users/EmailConfirm";
import ForgotPass from "../Users/ForgotPass";
import ChangePass from "../Users/ChangePass";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BuyConfirm from "../BuyRegister/BuyConfirm";
import MultiBuyForm from "../BuyRegister/MultiBuyForm";
import { useSelector } from "react-redux";
import Login from "../Users/Login";
import SignUp from "../Users/SignUp";
import { Tab, Tabs } from "react-bootstrap";
import NumberFormat from "react-number-format";
import AuctionTimer from "../Auctions/AuctionTimer";
import RegistrationTimer from "../Auctions/RegistrationTimer";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { IoImageOutline } from "react-icons/io5";
import { RiVideoLine } from "react-icons/ri";
import { Md360 } from "react-icons/md";
import { IoLocationOutline } from "react-icons/io5";
import CloseButton from "react-bootstrap/CloseButton";
import "../../styles/PropDisplay.css";
import authService from "../../services/authServices";

const mapStyles = {
  height: "98%",
  width: "100%",
};
// const StreetviewStyles = {
//   height: "50vh",
//   width: "100%",
// };

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
  height: 100%;
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
      top: -5vh;
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
    left: -50px;
    width: 12vw;
    height: 100%;
  }

  .slick-next {
    right: -50px;
    width: 12vw;
    height: 100%;
  }
`;

const Wrap = styled.div`
  border-radius: 4px;
  cursor: pointer;
  position: relative;

  // a {
  //   border-radius: 4px;
  //   cursor: pointer;
  //   display: block;
  //   position: relative;
  //   padding: 0;

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0;
  }

  // &:hover {
  //   padding: 0;
  //   // border: 4px solid rgba(249, 249, 249, 0.8);
  //   transition-duration: 300ms;
  // }
  // }
`;

function DisplayJet({ toogleChange, property }) {
  const user = useSelector((state) => state.user);
  const savedProperty = useSelector((state) => state.savedProperty);
  const [registerEnd, setRegisterEnd] = useState();
  const [registEnded, setRegistEnded] = useState(false);
  const toogleRegistEnded = () => setRegistEnded(!registEnded);

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
  const toggleImage = () => {
    const userId = user._id;
    const data = {
      userId: userId,
      auctionId: property._id,
    };
    if (favorite === false) {
      authService.saveProperty(data);
      setFavorite(!favorite);
    } else if (favorite === true) {
      authService.removeProperty(data);
      setFavorite(!favorite);
    }
    console.log(data);
  };

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
  const [startAuction, setStartAuction] = useState();
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

  useEffect(() => {
    window.scrollTo(0, 0);
    toogleChange();

    //set location for map
    setLocation({
      name: "Property Location",
      lat: property
        ? property.property.details.property_address.latitude
        : null,
      lng: property
        ? property.property.details.property_address.longitude
        : null,
    });
  }, [property]);

  useEffect(() => {
    if (user._id) {
      if (savedProperty.length > 0) {
        const saved = savedProperty.filter((item) => item._id === property._id);
        if (saved.length > 0) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    }
  }, [savedProperty]);

  return (
    <>
      {location && property && (
        <>
          <div style={{ position: "relative", width: "100%" }}>
            <div className="mini-header">
              {new Date().toISOString() < property.auctionStartDate ? (
                <div className="mini-header-text">
                  UPCOMING AUCTION | STARTS IN{" "}
                  {new Date(property.auctionStartDate).toLocaleString()}
                </div>
              ) : new Date().toISOString() > property.auctionStartDate &&
                new Date().toISOString() < property.auctionEndDate ? (
                <div className="mini-header-text">
                  AUCTION IN PROGRESS | ENDS IN{" "}
                  {new Date(property.auctionEndDate).toLocaleString()}
                </div>
              ) : (
                <div className="mini-header-text">AUCTION ENDED</div>
              )}
            </div>
            {property.isReservedMet === true && (
              <span className="badge">Reserved Met!</span>
            )}
            <img
              src={property.property.images[0].url}
              alt="Snow"
              className="display-property"
            />
            <div className="info-box">
              <div>
                <button
                  onClick={toggleImage}
                  // icon={favorite ? "/images/star-before.png" : "/images/star.png"}
                  className="favorite-button"
                >
                  {favorite ? (
                    <AiFillHeart size="100%" color="C58753" />
                  ) : (
                    <AiOutlineHeart size="100%" color="C58753" />
                  )}
                </button>
              </div>

              <div>
                <button className="img-btn" onClick={togglePics}>
                  <IoImageOutline size="100%" color="C58753" />
                </button>
                <Modal
                  size="xl"
                  style={{ height: "100%" }}
                  show={showPics}
                  onHide={togglePics}
                  centered
                >
                  <Modal.Body style={{ height: "700px" }}>
                    <div>
                      <CloseButton
                        className="modal-close"
                        onClick={togglePics}
                      />
                    </div>
                    <Carousel
                      style={{ height: "100%", borderRadius: "0" }}
                      {...ImgSettings}
                    >
                      {property.property.images.map((item, index) => (
                        <Wrap key={index}>
                          {/* <a> */}
                          <img
                            style={{ height: "100%" }}
                            src={item.url}
                            alt=""
                          />
                          {/* </a> */}
                        </Wrap>
                      ))}
                    </Carousel>
                  </Modal.Body>
                </Modal>
              </div>

              <div>
                <button onClick={toggleVids} className="vid-btn">
                  <RiVideoLine size="100%" color="C58753" />
                </button>

                <Modal size="xl" show={showVideos} onHide={toggleVids} centered>
                  <Modal.Body style={{ height: "700px" }}>
                    <div>
                      <CloseButton
                        className="modal-close"
                        onClick={toggleVids}
                      />
                    </div>
                    <Carousel
                      style={{ height: "100%", borderRadius: "0" }}
                      {...settings}
                    >
                      {property.property.videos.length > 0 ? (
                        property.property.videos.map((item, index) => (
                          <Wrap key={index}>
                            <video className="vid-display" controls>
                              <source src={item.url} type="video/webm" />
                            </video>
                          </Wrap>
                        ))
                      ) : (
                        <div>
                          <h1>No Videos Available</h1>
                        </div>
                      )}
                    </Carousel>
                  </Modal.Body>
                </Modal>
              </div>
              <div>
                <button className="live-btn" onClick={toggleLive}>
                  <Md360 size="100%" color="C58753" />
                </button>
              </div>

              {property && (
                <div>
                  <button onClick={toggleMap} className="map-btn">
                    <IoLocationOutline size="50px" color="C58753" />
                  </button>
                  <Modal size="xl" show={showMap} onHide={toggleMap} centered>
                    <Modal.Body style={{ height: "700px" }}>
                      <div>
                        <CloseButton
                          className="modal-close"
                          onClick={toggleMap}
                        />
                      </div>
                      <GoogleMap
                        mapContainerStyle={mapStyles}
                        zoom={18}
                        center={location}
                      >
                        <Marker position={location} />
                      </GoogleMap>
                      <p>{property.property.details.property_address}</p>
                    </Modal.Body>
                  </Modal>
                </div>
              )}
            </div>
          </div>

          {/* first row */}
          <Row style={{ padding: "0", padding: "35px 35px" }}>
            <Col style={{ padding: "0" }}>
              <h2 style={{ color: "#b77b50" }}>
                {property.property.details.aircraft_builder_name}{" "}
                {property.property.details.aircraft_model_designation}
              </h2>
              <h5 style={{ color: "#919191", fontWeight: "400" }}>
                {property.property.details.property_address}
              </h5>
            </Col>

            <Col style={{ padding: "0" }}>
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

              {/* {user._id && !user.KYC && (
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
              )} */}

              {user._id &&
              property.isNotRegisteredToBuy === true &&
              !property.isOwner &&
              new Date().toISOString() < property.registerEndDate ? (
                <div className="registBtn">
                  <button className="registsBtn" onClick={toogleRegister}>
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
              ) : user._id &&
                property.isNotRegisteredToBuy === true &&
                property.isOwner ? (
                <div className="registBtn">
                  <button
                    className="registsBtn"
                    onClick={toogleRegister}
                    disabled
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
              ) : (
                user._id &&
                property.isNotRegisteredToBuy === true &&
                new Date().toISOString() > property.registerEndDate && (
                  <div className="registBtn">
                    <button
                      className="registsBtn"
                      onClick={toogleRegister}
                      disabled
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
                )
              )}

              {user._id && !property.isNotRegisteredToBuy && !property.isOwner && (
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
                    disabled={property.highestBidders ? false : true}
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
          <Row style={{ padding: "0 35px" }}>
            <Col sm={8} style={{ display: "grid", padding: "0" }}>
              <Row xs="auto" style={{ width: "100vw", padding: "0" }}>
                {registEnded === false ? (
                  <Col style={{ padding: "0" }}>
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        borderRadius: "10px",
                        padding: "20px",
                      }}
                    >
                      <RegistrationTimer
                        toogleRegistEnded={toogleRegistEnded}
                        time={property.registerEndDate}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          marginLeft: "10px",
                          color: "#7c7c7c",
                        }}
                      >
                        <p>Registration Ends</p>
                      </div>
                    </div>
                  </Col>
                ) : (
                  <Col style={{ padding: "0" }}>
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        borderRadius: "10px",
                        padding: "53px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          marginLeft: "10px",
                          color: "Black",
                          fontWeight: "bold",
                        }}
                      >
                        <p>Registration Ended</p>
                      </div>
                    </div>
                  </Col>
                )}
                {new Date().toISOString() < property.auctionEndDate ? (
                  <Col>
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        borderRadius: "10px",
                        padding: "20px",
                      }}
                    >
                      <AuctionTimer
                        time={property.auctionEndDate}
                        id={property._id}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          marginLeft: "10px",
                          color: "#7c7c7c",
                        }}
                      >
                        <p>Auction Ends</p>
                      </div>
                    </div>
                  </Col>
                ) : (
                  <Col>
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        borderRadius: "10px",
                        padding: "20px",
                        color: "black",
                      }}
                    >
                      <AuctionTimer time={property.auctionStartDate} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          marginLeft: "10px",
                          color: "#7c7c7c",
                        }}
                      >
                        <p>Auction Starts In</p>
                      </div>
                    </div>
                  </Col>
                )}

                {property.highestBidders && user._id && (
                  <Col>
                    {property.highestBid ? (
                      <div
                        style={{
                          display: "grid",
                          justifyContent: "center",
                          backgroundColor: "#e8e8e8",
                          width: "100%",
                          marginLeft: "18px",
                          borderRadius: "10px",
                          padding: "33px",
                        }}
                      >
                        <h4 style={{ padding: "8px" }}>
                          <NumberFormat
                            value={property.highestBid}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            style={{
                              fontWeight: "700",
                              fontSize: "22px",
                              color: "black",
                            }}
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
                          marginLeft: "18px",
                          borderRadius: "10px",
                          padding: "33px",
                        }}
                      >
                        <h4 style={{ padding: "8px" }}>
                          <NumberFormat
                            value={property.startingBid}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                            style={{
                              fontWeight: "700",
                              fontSize: "22px",
                              color: "black",
                            }}
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
                )}

                <Col>
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      backgroundColor: "#e8e8e8",
                      width: "100%",
                      marginLeft: "35px",
                      borderRadius: "10px",
                      padding: "33px",
                    }}
                  >
                    <h4
                      style={{
                        padding: "8px",
                        fontWeight: "700",
                        fontSize: "22px",
                        color: "black",
                      }}
                    >
                      199,530
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
                      Views
                    </p>
                  </div>
                </Col>
              </Row>

              <Row style={{ padding: "0", paddingRight: "35px" }}>
                <div
                  style={{
                    marginTop: "30px",
                    alignItems: "center",
                    marginBottom: "30px",
                    marginLeft: "-15px",
                  }}
                >
                  <span style={{ color: "#b77b50", fontSize: "40px" }}>|</span>
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "30px",
                      marginLeft: "10px",
                      color: "black",
                    }}
                  >
                    Property Info
                  </span>
                </div>

                <Col style={{ padding: "0", paddingRight: "35px" }}>
                  <Table striped hover responsive>
                    <tbody className="propInfo">
                      <tr>
                        <td style={{ fontWeight: "700" }}>Sale Type</td>
                        <td>Auction</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Sale Condition</td>
                        <td>Auction Sale</td>
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Property Type</td>
                        {property.property.type ? (
                          <td>{property.property.type}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>registration Mark</td>
                        {property.property.details.registration_mark ? (
                          <td>{property.property.details.registration_mark}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Aircraft Builder Name
                        </td>
                        {property.property.details.aircraft_builder_name ? (
                          <td>
                            {property.property.details.aircraft_builder_name}
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Aircraft Model Designation
                        </td>
                        {property.property.details
                          .aircraft_model_designation ? (
                          <td>
                            {
                              property.property.details
                                .aircraft_model_designation
                            }
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Aircraft Serial No.
                        </td>
                        {property.property.details.aircraft_serial_no ? (
                          <td>
                            {property.property.details.aircraft_serial_no}
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Engine Builder Name
                        </td>
                        {property.property.details.engine_builder_name ? (
                          <td>
                            {property.property.details.engine_builder_name}
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          engine_model_designation
                        </td>
                        {property.property.details.engine_model_designation ? (
                          <td>
                            {property.property.details.engine_model_designation}
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Number Of Engines</td>
                        {property.property.details.number_of_engines ? (
                          <td>{property.property.details.number_of_engines}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Propeller Builder Name
                        </td>
                        {property.property.details.propeller_builder_name ? (
                          <td>
                            {property.property.details.propeller_builder_name}
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Propeller Model Designation
                        </td>
                        {property.property.details
                          .propeller_model_designation ? (
                          <td>
                            {
                              property.property.details
                                .propeller_model_designation
                            }
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Number Of Aircraft
                        </td>
                        {property.property.details.number_of_aircraft ? (
                          <td>
                            {property.property.details.number_of_aircraft}
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Imported Aircraft</td>
                        {property.property.details.imported_aircraft ? (
                          <td>{property.property.details.imported_aircraft}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                {user._id && property.highestBidders && (
                  <Col>
                    <Table
                      responsive
                      striped
                      style={{
                        margin: "auto",
                        justifyContent: "center",
                        textAlign: "center",
                        width: "auto",
                        height: "auto",
                      }}
                    >
                      <thead style={{ backgroundColor: "#d58f5c" }}>
                        <tr>
                          <th>#</th>
                          <th>Bidder ID</th>
                          <th>Bid Amount</th>
                          <th>Date/Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        {property.highestBidders?.length > 0 ? (
                          property.highestBidders
                            .slice()
                            .reverse()
                            .map((bid, index) => (
                              <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{bid.userId}</td>
                                <td>
                                  <NumberFormat
                                    value={bid.amount}
                                    displayType={"text"}
                                    thousandSeparator={true}
                                    prefix={"$"}
                                  />
                                </td>
                                <td>{new Date(bid.time).toLocaleString()}</td>
                              </tr>
                            ))
                        ) : (
                          <tr>
                            <td colSpan={4}>No bids yet</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Col>
                )}
              </Row>
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
                  color: "black",
                }}
              >
                Executive Summary
              </span>
            </div>
            <Col
              style={{ fontSize: "20px", paddingRight: "40px", color: "black" }}
            >
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

            <Col
              style={{ fontSize: "20px", paddingRight: "40px", color: "black" }}
            >
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
          <Modal size="lg" show={bid} onHide={toogleBid} centered>
            <Modal.Body>
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
              <MultiBuyForm />
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            keyboard={false}
            size="md"
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
        </>
      )}
    </>
  );
}

export default DisplayJet;
