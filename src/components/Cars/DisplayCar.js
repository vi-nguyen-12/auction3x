import React, { useEffect, useState, useRef } from "react";
import "../../styles/realEstate.css";
import { Modal, Table, Row, Col } from "react-bootstrap";
import { GoogleMap, Marker } from "@react-google-maps/api";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import BuyConfirm from "../BuyRegister/BuyConfirm";
import MultiBuyForm from "../BuyRegister/MultiBuyForm";
import { useSelector } from "react-redux";
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
import "../../styles/property-display.css";
import authService from "../../services/authServices";

const mapStyles = {
  height: "60vh",
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
  height: 100%;
  overflow: hidden;

  & > button {
    opacity: 1;
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

  img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0;
  }
`;

function DisplayCar({ toggleChange, property, toggleSignIn, windowSize }) {
  const user = useSelector((state) => state.user);
  const savedProperty = useSelector((state) => state.savedProperty);
  const [registEnded, setRegistEnded] = useState(false);
  const toggleRegistEnded = () => setRegistEnded(!registEnded);
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
  const [placeBid, setPlaceBid] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const toggleRegister = () => setShowRegister(!showRegister);
  const togglePlaceBid = () => setPlaceBid(!placeBid);
  const [downloadFiles, setDownloadFiles] = useState([]);
  //if auction id is found, then set property as already registered
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll

  useEffect(() => {
    window.scrollTo(0, 0);
    toggleChange();

    //set location for map
    setLocation({
      name: "Property Location",
      lat: property ? property.property.details.property_address.lat : null,
      lng: property ? property.property.details.property_address.lng : null,
    });
  }, [property]);

  useEffect(() => {
    if (user._id) {
      if (savedProperty.length > 0) {
        const saved = savedProperty.find((item) => item._id === property._id);
        if (saved) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    }
  }, [savedProperty]);

  const ownershipDoc = property.property.documents.filter(
    (doc) => doc.officialName === "ownership_document"
  );

  const registrationDoc = property.property.documents.filter(
    (doc) => doc.officialName === "registration_document"
  );

  const loanDoc = property.property.documents.filter(
    (doc) => doc.officialName === "loan_document"
  );

  const inspectionDoc = property.property.documents.filter(
    (doc) => doc.officialName === "inspection_report"
  );

  const engineDoc = property.property.documents.filter(
    (doc) => doc.officialName === "engine_details"
  );

  const valuationDoc = property.property.documents.filter(
    (doc) => doc.officialName === "valuation_report"
  );

  const download = (files) => (e) => {
    if (e.target.checked) {
      setDownloadFiles([...downloadFiles, ...files]);
    } else {
      for (let i = 0; i < files.length; i++) {
        const index = downloadFiles.indexOf(files[i]);
        if (index > -1) {
          downloadFiles.splice(index, 1);
        }
      }
      setDownloadFiles([...downloadFiles]);
    }
  };

  const viewSelected = () => {
    if (downloadFiles.length > 0) {
      for (let i = 0; i < downloadFiles.length; i++) {
        window.open(downloadFiles[i]);
      }
    }
  };

  const viewAll = () => {
    for (let i = 0; i < property.property.documents.length; i++) {
      window.open(property.property.documents[i].url);
    }
  };

  const toggleImage = () => {
    if (user._id) {
      const data = {
        userId: user._id,
        auctionId: property._id,
      };
      if (favorite === false) {
        authService.saveProperty(data);
        setFavorite(!favorite);
      } else if (favorite === true) {
        authService.removeProperty(data);
        setFavorite(!favorite);
      }
    } else {
      return toggleSignIn();
    }
  };

  return (
    <>
      {location && property && (
        <>
          <div style={{ position: "relative", width: "100%" }}>
            <div
              className="mini-header"
              style={{ padding: windowSize < 500 && "35px 15px" }}
            >
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
              style={{ padding: windowSize < 500 && "5px 15px" }}
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
                    <AiFillHeart className="logo" />
                  ) : (
                    <AiOutlineHeart className="logo" />
                  )}
                </button>
              </div>

              <div>
                <button className="img-btn" onClick={togglePics}>
                  <IoImageOutline className="logo" />
                </button>
                <Modal
                  size="xl"
                  style={{ height: "100%" }}
                  show={showPics}
                  onHide={togglePics}
                  centered
                >
                  <Modal.Body>
                    <div
                      style={{
                        position: "absolute",
                        top: windowSize < 600 ? "0" : "25px",
                        right: windowSize < 600 ? "0" : "25px",
                        zIndex: "999",
                      }}
                    >
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
                  <RiVideoLine className="logo" />
                </button>

                <Modal size="xl" show={showVideos} onHide={toggleVids} centered>
                  <Modal.Body>
                    <div
                      style={{
                        position: "absolute",
                        top: windowSize < 600 ? "0" : "25px",
                        right: windowSize < 600 ? "0" : "25px",
                        zIndex: "999",
                      }}
                    >
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
                            {item.name === "videos" ? (
                              <iframe
                                src={`https://www.youtube.com/embed/${item.url.slice(
                                  32,
                                  item.url.indexOf("&")
                                )}`}
                                height="500px"
                                width="100%"
                                allowFullScreen
                              />
                            ) : (
                              <video
                                className="vid-display"
                                width="100%"
                                height="100%"
                                controls
                              >
                                <source src={item.url} type="video/webm" />
                              </video>
                            )}
                          </Wrap>
                        ))
                      ) : (
                        <div>
                          <h1>No videos available</h1>
                        </div>
                      )}
                    </Carousel>
                  </Modal.Body>
                </Modal>
              </div>
              <div>
                <button className="live-btn" onClick={toggleLive}>
                  <Md360 className="logo" />
                </button>
              </div>

              {property && (
                <div>
                  <button onClick={toggleMap} className="map-btn">
                    <IoLocationOutline className="logo" />
                  </button>
                  <Modal size="xl" show={showMap} onHide={toggleMap} centered>
                    <Modal.Body>
                      <div
                        style={{
                          position: "absolute",
                          top: windowSize < 600 ? "0" : "10px",
                          right: windowSize < 600 ? "0" : "10px",
                          marginTop: windowSize < 600 && "-15px",
                          marginRight: windowSize < 600 && "-15px",
                          zIndex: "999",
                        }}
                      >
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
                      <p className="d-flex justify-content-center">
                        {
                          property.property.details.property_address
                            .formatted_street_address
                        }
                      </p>
                    </Modal.Body>
                  </Modal>
                </div>
              )}
            </div>
          </div>

          {/* first row */}
          <Row
            style={{
              margin: "0",
              padding: "0",
              padding: windowSize > 500 ? "35px" : "15px",
            }}
          >
            <Col style={{ padding: "0" }} xs={12} md={6}>
              <Row style={{ textAlign: windowSize < 500 && "center" }}>
                <h2 style={{ color: "#b77b50", padding: "0" }}>
                  {property.property.details.year} {""}
                  {property.property.details.make} {""}
                  {property.property.details.model}
                </h2>
                <h5
                  style={{ color: "#919191", fontWeight: "400", padding: "0" }}
                >
                  {
                    property.property.details.property_address
                      .formatted_street_address
                  }
                </h5>
              </Row>
            </Col>
            <Col style={{ padding: "0" }}>
              {!user._id && (
                <div
                  className="registBtn"
                  style={{ margin: windowSize < 500 && "30px 0" }}
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
                    onClick={toggleSignIn}
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
                <div
                  className="registBtn"
                  style={{ margin: windowSize < 500 && "30px 0" }}
                >
                  <button className="registsBtn" onClick={toggleRegister}>
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
                    onClick={toggleRegister}
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
                  <div
                    className="registBtn"
                    style={{ margin: windowSize < 500 && "30px 0" }}
                  >
                    <button
                      className="registsBtn"
                      onClick={toggleRegister}
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

              {user._id &&
              !property.isNotRegisteredToBuy &&
              !property.isOwner &&
              property.highestBidders ? (
                <div
                  style={{
                    display: "grid",
                    justifyContent: "right",
                    width: "100%",
                    margin: windowSize < 500 && "30px 0",
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
                    onClick={togglePlaceBid}
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
              ) : (
                user._id &&
                !property.isNotRegisteredToBuy &&
                !property.isOwner && (
                  <div
                    className="registBtn"
                    style={{ margin: windowSize < 500 && "30px 0" }}
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
                      onClick={togglePlaceBid}
                      disabled
                    >
                      Under Review
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
            </Col>
          </Row>

          {/* second row */}
          <Row
            style={{
              margin: "0",
              padding: "0",
              padding: windowSize > 500 ? "0 35px" : "0 15px",
            }}
          >
            <Col style={{ display: "grid", padding: "0" }}>
              <Row
                xs="auto"
                style={{
                  width: "100%",
                  padding: "0",
                  margin: " 0",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {registEnded === false ? (
                  <Col style={{ margin: "10px" }}>
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        padding: "30px",
                      }}
                    >
                      <RegistrationTimer
                        time={property.registerEndDate}
                        toggleRegistEnded={toggleRegistEnded}
                        windowSize={windowSize}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          color: "#7c7c7c",
                        }}
                      >
                        <p>Registration Ends</p>
                      </div>
                    </div>
                  </Col>
                ) : (
                  <Col style={{ margin: "10px" }}>
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#e8e8e8",
                        width: "200px",
                        height: "150px",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          color: "Black",
                          fontWeight: "bold",
                        }}
                      >
                        <p>Registration Ended</p>
                      </div>
                    </div>
                  </Col>
                )}
                {new Date().toISOString() < property.auctionEndDate &&
                new Date().toISOString() > property.auctionStartDate ? (
                  <Col style={{ margin: "10px" }}>
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        padding: "30px",
                      }}
                    >
                      <AuctionTimer
                        time={property.auctionEndDate}
                        id={property._id}
                        windowSize={windowSize}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          color: "#7c7c7c",
                        }}
                      >
                        <p>Auction Ends</p>
                      </div>
                    </div>
                  </Col>
                ) : new Date().toISOString() < property.auctionStartDate ? (
                  <Col style={{ margin: "10px" }}>
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        alignContent: "center",
                        backgroundColor: "#e8e8e8",
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        padding: "30px",
                        color: "black",
                      }}
                    >
                      <AuctionTimer time={property.auctionStartDate} />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          color: "#7c7c7c",
                        }}
                      >
                        <p>Auction Starts In</p>
                      </div>
                    </div>
                  </Col>
                ) : (
                  new Date().toISOString() > property.auctionEndDate && (
                    <Col style={{ margin: "10px" }}>
                      <div
                        style={{
                          display: "grid",
                          justifyContent: "center",
                          alignItems: "center",
                          backgroundColor: "#e8e8e8",
                          width: "200px",
                          height: "150px",
                          borderRadius: "10px",
                          padding: "40px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "left",
                            color: "Black",
                            fontWeight: "bold",
                          }}
                        >
                          <p>Auction Ended</p>
                        </div>
                      </div>
                    </Col>
                  )
                )}

                {property.highestBidders && (
                  <Col style={{ margin: "10px" }}>
                    {property.highestBid ? (
                      <div
                        style={{
                          display: "grid",
                          justifyContent: "center",
                          alignContent: "center",
                          backgroundColor: "#e8e8e8",
                          width: "280px",
                          height: "100%",
                          borderRadius: "10px",
                          padding: "30px 70px",
                        }}
                      >
                        <h4>
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
                          alignContent: "center",
                          backgroundColor: "#e8e8e8",
                          width: "100%",
                          height: "100%",
                          borderRadius: "10px",
                          padding: "30px 70px",
                        }}
                      >
                        <h4>
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
                            color: "#7c7c7c",
                          }}
                        >
                          Current Bid
                        </p>
                      </div>
                    )}
                  </Col>
                )}

                <Col style={{ margin: "10px" }}>
                  <div
                    style={{
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#e8e8e8",
                      width: "280px",
                      height: "165px",
                      borderRadius: "10px",
                      padding: "40px",
                    }}
                  >
                    <h4
                      style={{
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
                        color: "#7c7c7c",
                      }}
                    >
                      Views
                    </p>
                  </div>
                </Col>
              </Row>

              <Row style={{ padding: "0", margin: "0" }}>
                <div
                  style={{
                    marginTop: "30px",
                    alignItems: "center",
                    marginBottom: "30px",
                    padding: "0",
                  }}
                >
                  <span style={{ color: "#b77b50", fontSize: "40px" }}>|</span>
                  <span
                    style={{
                      fontWeight: "600",
                      fontSize: "30px",
                      color: "black",
                    }}
                  >
                    Property Info
                  </span>
                </div>

                <Col style={{ padding: "0" }}>
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
                        <td style={{ fontWeight: "700" }}>Make</td>
                        {property.property.details.make ? (
                          <td>{property.property.details.make}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Model</td>
                        {property.property.details.model ? (
                          <td>{property.property.details.model}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Year</td>
                        {property.property.details.year ? (
                          <td>{property.property.details.year}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Color</td>
                        {property.property.details.color ? (
                          <td>{property.property.details.color}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Mileage</td>
                        {property.property.details.mileage ? (
                          <td>{property.property.details.mileage}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Transmission</td>
                        {property.property.details.transmission ? (
                          <td>{property.property.details.transmission}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>VIN</td>
                        {property.property.details.VIN ? (
                          <td>{property.property.details.VIN}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Car Type</td>
                        {property.property.details.car_type ? (
                          <td>{property.property.details.car_type}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Fuel Type</td>
                        {property.property.details.fuel_type ? (
                          <td>{property.property.details.fuel_type}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Condition</td>
                        {property.property.details.condition ? (
                          <td>{property.property.details.condition}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Engine</td>
                        {property.property.details.engine ? (
                          <td>{property.property.details.engine}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Power</td>
                        {property.property.details.power ? (
                          <td>{property.property.details.power}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                {user._id && user.KYC && property.highestBidders && (
                  <Col
                    style={{ padding: windowSize < 600 && "0" }}
                    md={6}
                    xs={12}
                  >
                    <Table
                      responsive
                      striped
                      style={{
                        padding: "0",
                        position: windowSize < 600 && "absolute",
                        width: windowSize < 600 && "92vw",
                        height: windowSize < 600 && "300px",
                        overflow: windowSize < 800 ? "auto" : "hidden",
                        display: windowSize < 800 && "block",
                        tableLayout: windowSize < 800 && "auto",
                      }}
                    >
                      <thead style={{ backgroundColor: "#d58f5c" }}>
                        <tr>
                          <th>#</th>
                          <th>Bidder ID</th>
                          <th>Bidder</th>
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
                              <tr
                                style={{
                                  backgroundColor:
                                    bid.userId === user._id ? "#6de8b1" : "",
                                }}
                                key={index}
                              >
                                <td>{index + 1}</td>
                                <td>{bid.userId}</td>
                                {bid.userId === user._id ? (
                                  <td>
                                    {user.firstName + " " + user.lastName}
                                  </td>
                                ) : (
                                  <td>XXXXX</td>
                                )}
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
                            <td colSpan={5}>No bids yet</td>
                          </tr>
                        )}
                      </tbody>
                    </Table>
                  </Col>
                )}
              </Row>
            </Col>
          </Row>

          <Row
            style={{
              margin: "0",
              padding: "0",
              padding: windowSize < 500 ? "25px 15px" : "35px",
            }}
          >
            <div
              style={{
                marginTop: windowSize < 600 ? "300px" : "30px",
                alignItems: "center",
                marginBottom: "20px",
                padding: "0",
              }}
            >
              <span style={{ color: "#b77b50", fontSize: "40px" }}>|</span>
              <span
                style={{
                  fontWeight: "600",
                  fontSize: "30px",
                  color: "black",
                }}
              >
                Executive Summary
              </span>
            </div>
            <Col
              style={{
                fontSize: windowSize > 800 ? "20px" : "17px",
                color: "black",
                padding: windowSize > 800 && "20px 20px 20px 0",
              }}
              xs={12}
              md={6}
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
              style={{
                fontSize: windowSize > 800 ? "20px" : "17px",
                color: "black",
                padding: windowSize > 800 && "20px 20px 20px 0",
                marginTop: windowSize <= 767 && "20px",
              }}
              xs={12}
              md={6}
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

          <Row
            ref={myRef}
            style={{
              marginTop: "50px",
              padding: windowSize < 500 ? "25px 15px" : "35px",
            }}
          >
            <Tabs
              defaultActiveKey="Investment Opportunity"
              className="RealEstate-Tab"
            >
              <Tab
                eventKey="Investment Opportunity"
                title={windowSize > 800 ? "Investment Opportunity" : "IO"}
                className="RealEstate-Tab-1"
                style={{
                  backgroundColor: "#B77B50",
                  border: "none",
                  outline: "none",
                  fontSize: "12px",
                  borderRadius: "0",
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
                title={windowSize > 800 ? "Location Information" : "LI"}
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
                title={windowSize > 800 ? "Market Information" : "MI"}
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
                title={windowSize > 800 ? "Document Vault" : "DV"}
                style={{
                  backgroundColor: "#B77B50",
                  border: "none",
                  outline: "none",
                  fontSize: "12px",
                  borderRadius: "4px",
                  padding: "20px",
                }}
              >
                <Row className="tabDocs">
                  <Row>
                    <Col
                      style={{
                        display: "grid",
                        margin: "10px",
                        fontSize: windowSize < 800 ? "10px" : "20px",
                        color: "white",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            ownershipDoc.map((item) => item.url)
                          )}
                        />{" "}
                        Ownership Documents ({ownershipDoc.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            registrationDoc.map((item) => item.url)
                          )}
                        />{" "}
                        Registration Documents ({registrationDoc.length})
                      </div>
                    </Col>
                    <Col
                      style={{
                        display: "grid",
                        margin: "10px",
                        fontSize: windowSize < 800 ? "10px" : "20px",
                        color: "white",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            valuationDoc.map((item) => item.url)
                          )}
                        />{" "}
                        Valuation Report ({valuationDoc.length})
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          onChange={download(loanDoc.map((item) => item.url))}
                        />{" "}
                        Loan Documents ({loanDoc.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            inspectionDoc.map((item) => item.url)
                          )}
                        />{" "}
                        Inspection Report ({inspectionDoc.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(engineDoc.map((item) => item.url))}
                        />{" "}
                        Engine Details ({engineDoc.length})
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col
                      style={{
                        margin: "10px",
                        fontSize: windowSize < 800 ? "10px" : "20px",
                        color: "white",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div>
                        <input type="checkbox" /> Notify me when the Due
                        Diligence Documents are updated
                      </div>
                    </Col>
                  </Row>
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "auto",
                      width: "auto",
                      height: "auto",
                    }}
                  >
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => {
                          viewSelected();
                        }}
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
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => {
                          viewAll();
                        }}
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
                    </Col>
                  </Row>
                </Row>
              </Tab>
            </Tabs>
          </Row>
          <Modal
            size="lg"
            backdrop="static"
            keyboard={false}
            show={showRegister}
            onHide={toggleRegister}
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
            onHide={togglePlaceBid}
            centered
          >
            <Modal.Body>
              <BuyConfirm property={property} />
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}
export default DisplayCar;
