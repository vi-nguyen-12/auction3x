import React, { useEffect, useState, useRef } from "react";
import "../../styles/realEstate.css";
import { Modal, Table, Row, Col, Container } from "react-bootstrap";
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

function DisplayYacht({
  toggleChange,
  property,
  toggleSignIn,
  windowSize,
  setRefresh,
  refresh,
}) {
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

  const [placeBid, setPlaceBid] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [downloadFiles, setDownloadFiles] = useState([]);
  const toggleRegister = () => setShowRegister(!showRegister);
  const togglePlaceBid = () => setPlaceBid(!placeBid);

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
        const saved = savedProperty.filter((item) => item._id === property._id);
        if (saved.length > 0) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    }
  }, [savedProperty]);

  const vesselRegist = property.property.documents.filter(
    (doc) => doc.officialName === "vessel_registration"
  );

  const vesselMaintenance = property.property.documents.filter(
    (doc) => doc.officialName === "vessel_maintenance_report"
  );

  const vesselPerformance = property.property.documents.filter(
    (doc) => doc.officialName === "vessel_performance_report"
  );

  const deckDetails = property.property.documents.filter(
    (doc) => doc.officialName === "vessel_deck_details"
  );

  const marineReport = property.property.documents.filter(
    (doc) => doc.officialName === "vessel_marine_surveyor_report"
  );

  const valuationDoc = property.property.documents.filter(
    (doc) => doc.officialName === "vessel_valuation_report"
  );

  const engine = property.property.documents.filter(
    (doc) => doc.officialName === "vessel_engine_type"
  );

  const insurance = property.property.documents.filter(
    (doc) => doc.officialName === "vessel_insurance"
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
              alt="Snow"
              className="display-property"
              style={{ padding: windowSize < 500 && "5px 15px" }}
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
                        style={{ backgroundColor: "white" }}
                        onClick={togglePics}
                      />
                    </div>
                    <Carousel
                      style={{ height: "100%", borderRadius: "0" }}
                      {...ImgSettings}
                    >
                      {property.property.images.map((item, index) => (
                        <Wrap key={index}>
                          <img
                            width="100%"
                            height="100%"
                            src={item.url}
                            alt=""
                          />
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
                        style={{ backgroundColor: "white" }}
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
                          <h1>No Videos Available</h1>
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
                          style={{ backgroundColor: "rgb(0, 0, 0, 0.4)" }}
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
                <h2
                  style={{
                    color: "#b77b50",
                    padding: "0",
                    fontFamily: "josefin slab",
                    fontWeight: "600",
                    fontSize: windowSize < 600 ? "1.7rem" : "2.6rem",
                  }}
                >
                  {property.property.details.manufacturer_name}
                </h2>
                <h5
                  style={{
                    color: "#919191",
                    fontWeight: "400",
                    padding: "0",
                    fontFamily: "Montserrat",
                    fontWeight: "400",
                    fontSize: "25px",
                  }}
                >
                  {property.property.details.property_address.city},{" "}
                  {property.property.details.property_address.state}
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
                    disabled={
                      new Date().toISOString() > property.auctionEndDate
                        ? true
                        : false
                    }
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
                        width: "278px",
                        height: "180px",
                        borderRadius: "10px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "left",
                          color: "Black",
                          fontFamily: "Josefin Slab",
                          fontWeight: "600",
                          fontSize: "25px",
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
                          width: "278px",
                          height: "180px",
                          borderRadius: "10px",
                          padding: "40px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "left",
                            color: "Black",
                            fontFamily: "Josefin Slab",
                            fontWeight: "600",
                            fontSize: "25px",
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
                              fontFamily: "Josefin Slab",
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
                              fontFamily: "Josefin Slab",
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
                      height: "180px",
                      borderRadius: "10px",
                      padding: "40px",
                    }}
                  >
                    <h4
                      style={{
                        fontSize: "22px",
                        color: "black",
                        fontFamily: "Josefin Slab",
                        fontWeight: "600",
                        margin: "0",
                        marginBottom: "-30px",
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

              <Row style={{ margin: "0", padding: "0" }}>
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
                      fontFamily: "Josefin Slab",
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
                        <td style={{ fontWeight: "700" }}>
                          Vessel Registration Number
                        </td>
                        {property.property.details
                          .vessel_registration_number ? (
                          <td>
                            {
                              property.property.details
                                .vessel_registration_number
                            }
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Vessel Manufacturing Date
                        </td>
                        {property.property.details.vessel_manufacturing_date ? (
                          <td>
                            {
                              property.property.details
                                .vessel_manufacturing_date
                            }
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Manufacture Mark</td>
                        {property.property.details.manufacture_mark ? (
                          <td>{property.property.details.manufacture_mark}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Manufacturer Name</td>
                        {property.property.details.manufacturer_name ? (
                          <td>{property.property.details.manufacturer_name}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Engine Type</td>
                        {property.property.details.engine_type ? (
                          <td>{property.property.details.engine_type}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          Engine Manufacture Name
                        </td>
                        {property.property.details.engine_manufacture_name ? (
                          <td>
                            {property.property.details.engine_manufacture_name}
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Engine Deck Type</td>
                        {property.property.details.engine_deck_type ? (
                          <td>{property.property.details.engine_deck_type}</td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>Running Cost</td>
                        {property.property.details.running_cost ? (
                          <td>
                            <NumberFormat
                              value={property.property.details.running_cost}
                              displayType={"text"}
                              thousandSeparator={true}
                              prefix={"$"}
                            />
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                      <tr>
                        <td style={{ fontWeight: "700" }}>
                          No. Of Crew Required
                        </td>
                        {property.property.details.no_of_crew_required ? (
                          <td>
                            {property.property.details.no_of_crew_required}
                          </td>
                        ) : (
                          <td>N/A</td>
                        )}
                      </tr>
                    </tbody>
                  </Table>
                </Col>
                {user._id && property.highestBidders && (
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
                                    bid.userId === user._id ? "#e8e8e8" : "",
                                }}
                                key={index}
                              >
                                <td>{index + 1}</td>
                                <td>
                                  *****
                                  {bid.buyerId.slice(bid.buyerId.length - 5)}
                                </td>
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
                marginTop:
                  windowSize < 600 && property.highestBidders?.length > 0
                    ? "300px"
                    : windowSize < 600
                    ? "150px"
                    : "0",
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
                  fontFamily: "Josefin Slab",
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
                fontFamily: "Josefin Slab",
                fontWeight: "600",
              }}
              xs={12}
              // md={6}
            >
              {property.property.details.description?.summary}
            </Col>

            {/* <Col
              style={{
                fontSize: windowSize > 800 ? "20px" : "17px",
                color: "black",
                padding: windowSize > 800 && "20px 20px 20px 0",
                marginTop: windowSize <= 767 && "20px",
                fontFamily: "Josefin Slab",
                fontWeight: "600",
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
            </Col> */}
          </Row>

          <Row
            ref={myRef}
            style={{
              marginTop: "50px",
              padding: windowSize < 600 ? "15px" : "35px",
            }}
          >
            {/* ref={myRef}
            style={{ padding: "35px", backgroundColor: "white" }}> */}
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
                  borderRadius: "4px",
                  padding: "30px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontFamily: "Josefin Slab",
                    fontWeight: "600",
                  }}
                >
                  <div
                    style={{
                      // marginTop: windowSize < 600 ? "300px" : "30px",
                      alignItems: "center",
                      marginBottom: "20px",
                      padding: "0",
                    }}
                  >
                    <span style={{ color: "#fcba7d", fontSize: "40px" }}>
                      |
                    </span>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "25px",
                        color: "white",
                        fontFamily: "Josefin Slab",
                      }}
                    >
                      Investment Opportunity
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: windowSize < 600 ? "18px" : "20px",
                      textAlign: "left",
                    }}
                  >
                    {property.property.details.description?.investment}
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
                  padding: "30px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontFamily: "Josefin Slab",
                    fontWeight: "600",
                  }}
                >
                  <div
                    style={{
                      // marginTop: windowSize < 600 ? "300px" : "30px",
                      alignItems: "center",
                      marginBottom: "20px",
                      padding: "0",
                    }}
                  >
                    <span style={{ color: "#fcba7d", fontSize: "40px" }}>
                      |
                    </span>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "25px",
                        color: "white",
                        fontFamily: "Josefin Slab",
                      }}
                    >
                      Location Highlight
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: windowSize < 600 ? "18px" : "20px",
                      textAlign: "left",
                    }}
                  >
                    {property.property.details.description?.location}
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
                  padding: "30px",
                }}
              >
                <div
                  style={{
                    color: "white",
                    fontFamily: "Josefin Slab",
                    fontWeight: "600",
                  }}
                >
                  <div
                    style={{
                      // marginTop: windowSize < 600 ? "300px" : "30px",
                      alignItems: "center",
                      marginBottom: "20px",
                      padding: "0",
                    }}
                  >
                    <span style={{ color: "#fcba7d", fontSize: "40px" }}>
                      |
                    </span>
                    <span
                      style={{
                        fontWeight: "600",
                        fontSize: "25px",
                        color: "white",
                        fontFamily: "Josefin Slab",
                      }}
                    >
                      Merket Overview
                    </span>
                  </div>
                  <p
                    style={{
                      fontSize: windowSize < 600 ? "18px" : "20px",
                      textAlign: "left",
                    }}
                  >
                    {property.property.details.description?.market}
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
                  padding: "50px 30px",
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
                            vesselRegist.map((item) => item.url)
                          )}
                        />{" "}
                        Vessel Registration Document ({vesselRegist.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            vesselMaintenance.map((item) => item.url)
                          )}
                        />{" "}
                        Vessel Maintenance Report ({vesselMaintenance.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            valuationDoc.map((item) => item.url)
                          )}
                        />{" "}
                        Vessel Valuation Report ({valuationDoc.length})
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          onChange={download(engine.map((item) => item.url))}
                        />{" "}
                        Vessel Engine Details ({engine.length})
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
                            deckDetails.map((item) => item.url)
                          )}
                        />{" "}
                        Vessel Deck Details ({deckDetails.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            marineReport.map((item) => item.url)
                          )}
                        />{" "}
                        Marine Surveyor Report ({marineReport.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            vesselPerformance.map((item) => item.url)
                          )}
                        />{" "}
                        Vessel Performance Report ({vesselPerformance.length})
                      </div>

                      <div>
                        <input
                          type="checkbox"
                          onChange={download(insurance.map((item) => item.url))}
                        />{" "}
                        Vessel Insurance Document ({insurance.length})
                      </div>
                    </Col>
                  </Row>
                  {/* <Row>
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
                  </Row> */}
                  <Row
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      margin: "auto",
                      width: "auto",
                      height: "auto",
                    }}
                    className="mt-5"
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
                          margin: "10px 0",
                        }}
                      >
                        View Selected
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
                          margin: "10px 0",
                        }}
                      >
                        View All
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
            <Modal.Header className="auction-modal-header">
              <Modal.Title
                className="auction-modal-title"
                style={{ fontSize: windowSize < 600 ? "1.6rem" : "" }}
              >
                Buyer Registration
              </Modal.Title>
            </Modal.Header>
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
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  toggleRegister();
                  setRefresh(!refresh);
                }}
              />
            </div>
            <Modal.Body>
              <MultiBuyForm windowSize={windowSize} />
            </Modal.Body>
          </Modal>

          <Modal
            backdrop="static"
            keyboard={false}
            size="md"
            show={placeBid}
            onHide={() => {
              togglePlaceBid();
              window.location.reload();
            }}
            centered
          >
            <Modal.Header className="auction-modal-header">
              <Modal.Title className="auction-modal-title">
                Enter Bid
              </Modal.Title>
            </Modal.Header>
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
                style={{ backgroundColor: "white" }}
                onClick={() => {
                  togglePlaceBid();
                  setRefresh(!refresh);
                }}
              />
            </div>
            <Modal.Body className="p-0 pb-4">
              <BuyConfirm property={property} />
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default DisplayYacht;
