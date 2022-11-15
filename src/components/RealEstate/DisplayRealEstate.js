import React, { useEffect, useState, useRef } from "react";
import "../../styles/headers.css";
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
import ReservedMet from "../../images/ReservedMet.png";
import CloseButton from "react-bootstrap/CloseButton";
import "../../styles/property-display.css";
import authService from "../../services/authServices";
import parse from "html-react-parser";

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

function DisplayRealEstate({
  property,
  toggleChange,
  toggleSignIn,
  windowSize,
  setRefresh,
  refresh,
  setMessage,
  toggleDocu,
  setDocuUrl,
}) {
  const user = useSelector((state) => state.user);
  const savedProperty = useSelector((state) => state.savedProperty);
  const [location, setLocation] = useState([]);
  const [favorite, setFavorite] = useState(false);
  const [showPics, setShowPics] = useState(false);
  const [showVideos, setShowVideos] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [downloadFiles, setDownloadFiles] = useState([]);
  // const [showLives, setShowLives] = useState(false);
  // const toggleLive = () => setShowLives(!showLives);
  const [viewDocs, setViewDocs] = useState("Location Information");
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
  const [registEnded, setRegistEnded] = useState(false);
  const toggleRegistEnded = () => setRegistEnded(!registEnded);
  const toggleRegister = () => setShowRegister(!showRegister);
  const togglePlaceBid = () => setPlaceBid(!placeBid);

  let disabled = new Date().toISOString() >= property.auctionEndDate;

  const myRef = useRef(null);
  const executeScroll = () => {
    myRef.current.scrollIntoView(); // run this function from an event handler or pass it to useEffect to execute scroll
    setViewDocs("Document Vault");
  };

  const titles = property.property.documents.filter(
    (doc) =>
      doc.officialName === "title_report" ||
      doc.officialName === "insurance_copy"
  );

  const purchaseAgreement = property.property.documents.filter(
    (doc) => doc.officialName === "purchase_agreement"
  );
  const thirdParty = property.property.documents.filter(
    (doc) => doc.officialName === "third-party_report"
  );

  const market = property.property.documents.filter(
    (doc) => doc.officialName === "market_and_valuations"
  );

  const financial = property.property.documents.filter(
    (doc) => doc.officialName === "financial_document"
  );

  const demographics = property.property.documents.filter(
    (doc) => doc.officialName === "demographics"
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

  useEffect(() => {
    toggleChange();

    //set location for map
    setLocation({
      name: "Property Location",
      lat: property ? property.property.details.property_address.lat : null,
      lng: property ? property.property.details.property_address.lng : null,
    });
  }, [property]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
      {property && (
        <>
          <div style={{ position: "relative", width: "100%" }}>
            <div
              className="mini-header"
              style={{ padding: windowSize < 500 && "20px 15px 0 15px" }}
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
            {/* {user._id &&
              property.highestBidders &&
              property.isReservedMet === true && (
                <span className="badge">Reserved Met!</span>
              )} */}
            <img
              src={property.property.images[0].url}
              alt="Snow"
              className="display-property"
              style={{ padding: windowSize < 500 && "0 15px" }}
            />
            <div className="info-box">
              <div>
                <button
                  onClick={toggleImage}
                  // icon={favorite ? "/images/star-before.png" : "/images/star.png"}
                  className="favorite-button"
                >
                  {favorite ? (
                    <AiFillHeart className="info_logo" />
                  ) : (
                    <AiOutlineHeart className="info_logo" />
                  )}
                </button>
              </div>

              <div>
                <button className="img-btn" onClick={togglePics}>
                  <IoImageOutline className="info_logo" />
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
                  <RiVideoLine className="info_logo" />
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
                    {property.property.videos.length > 0 ? (
                      <Carousel
                        style={{ height: "100%", borderRadius: "0" }}
                        {...settings}
                      >
                        {property.property.videos.map((item, index) => (
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
                        ))}
                      </Carousel>
                    ) : (
                      <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ height: "500px" }}
                      >
                        <h1 className="py-5">No Video Available</h1>
                      </div>
                    )}
                  </Modal.Body>
                </Modal>
              </div>
              {/* <div>
                <button className="live-btn" onClick={toggleLive}>
                  <Md360 className="info_logo" />
                </button>
              </div> */}

              {property && (
                <div>
                  <button onClick={toggleMap} className="map-btn">
                    <IoLocationOutline className="info_logo" />
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

          <Row
            style={{
              margin: "0",
              padding: "0",
              padding: windowSize > 500 ? "35px" : "15px",
            }}
          >
            <Col xs={12} md={6} style={{ padding: "0" }}>
              <Row
                style={{
                  textAlign: windowSize < 500 && "center",
                }}
              >
                <Col className="p-0" md={windowSize > 900 ? 7 : 12} xs={12}>
                  <h2
                    style={{
                      color: "#b77b50",
                      padding: "0",
                      fontFamily: "Tzimmes",
                      fontStyle: "normal",
                      fontWeight: "600",
                      fontSize: windowSize < 600 ? "1.7rem" : "3rem",
                    }}
                  >
                    {
                      property.property.details.property_address
                        .formatted_street_address
                    }
                  </h2>
                  <h5
                    style={{
                      color: "#919191",
                      padding: "0",
                      fontFamily: "Interstate, sans-serif",
                      fontStyle: "normal",
                      fontWeight: "400",
                      fontSize: "25px",
                    }}
                  >
                    {/* {
                    property.property.details.property_address
                      .formatted_street_address
                  }{" "} */}
                    {property.property.details.property_address.city}
                    {","} {property.property.details.property_address.state}{" "}
                    {property.property.details.property_address.zip_code}
                  </h5>
                </Col>
                {(property.isReservedMet || property.winner?.buyerId) && (
                  <Col md={windowSize > 900 ? 5 : 12} xs={12} className="p-0">
                    <img src={ReservedMet} alt="" />
                  </Col>
                )}
              </Row>
            </Col>
            <Col style={{ padding: "0" }}>
              {!user._id && (
                <div
                  className="registBtn"
                  style={{ margin: windowSize < 500 && "30px 0" }}
                >
                  <button className="registsBtn" onClick={toggleSignIn}>
                    Register to Bid
                  </button>
                  <div className="d-flex justify-content-center mt-2">
                    <button className="view-docs-btn" onClick={executeScroll}>
                      View Documents
                    </button>
                  </div>
                </div>
              )}

              {user._id &&
              property.isNotRegisteredToBuy === true &&
              !property.isOwner &&
              new Date().toISOString() < property.registerEndDate ? (
                <div
                  className="registBtn"
                  style={{ margin: windowSize < 500 && "30px 0" }}
                >
                  <button
                    className="registsBtn"
                    disabled={registEnded}
                    onClick={toggleRegister}
                  >
                    Register to Bid
                  </button>
                  <div className="d-flex justify-content-center mt-2">
                    <button className="view-docs-btn" onClick={executeScroll}>
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
                    style={{ backgroundColor: "gray", color: "#c5c4c4" }}
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
                      style={{ backgroundColor: "gray", color: "#c5c4c4" }}
                      onClick={toggleRegister}
                      disabled
                    >
                      Register to Bid
                    </button>
                    <div className="d-flex justify-content-center mt-2">
                      <button className="view-docs-btn" onClick={executeScroll}>
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
                    justifyContent: windowSize < 500 ? "center" : "flex-end",
                    width: "100%",
                    margin: windowSize < 500 && "30px 0",
                  }}
                >
                  <button
                    className="registsBtn"
                    onClick={togglePlaceBid}
                    disabled={disabled}
                    style={{
                      backgroundColor: disabled && "gray",
                      color: disabled && "#c5c4c4",
                    }}
                  >
                    Bid Now!
                  </button>
                  <div className="d-flex justify-content-center mt-2">
                    <button className="view-docs-btn" onClick={executeScroll}>
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
                      className="registsBtn"
                      style={{ color: "#a8a8a8" }}
                      onClick={togglePlaceBid}
                      disabled
                    >
                      Under Review
                    </button>
                    <div className="d-flex justify-content-center mt-2">
                      <button className="view-docs-btn" onClick={executeScroll}>
                        View Documents
                      </button>
                    </div>
                  </div>
                )
              )}
            </Col>
          </Row>

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
                  justifyContent: windowSize < 500 ? "center" : "flex-start",
                }}
              >
                {registEnded === false ? (
                  <Col
                    style={{ paddingLeft: windowSize > 800 && "0" }}
                    className="mt-2"
                  >
                    <div className="d-grid justify-content-center auction-boxes">
                      <RegistrationTimer
                        // time={property.registerEndDate}
                        time={
                          new Date().toISOString() < property.registerStartDate
                            ? property.registerStartDate
                            : property.registerEndDate
                        }
                        toggleRegistEnded={toggleRegistEnded}
                        windowSize={windowSize}
                      />
                      <span>
                        {new Date().toISOString() < property.registerStartDate
                          ? "Registration Starts"
                          : "Registration Ends"}
                      </span>
                    </div>
                  </Col>
                ) : (
                  <Col
                    style={{ paddingLeft: windowSize > 800 && "0" }}
                    className="mt-2"
                  >
                    <div
                      className="d-grid justify-content-center align-items-center auction-boxes"
                      style={{
                        padding: "3.32rem 40px",
                        width: windowSize < 800 && "306px",
                      }}
                    >
                      <p>Registration Ended</p>
                    </div>
                  </Col>
                )}
                {new Date().toISOString() < property.auctionEndDate &&
                new Date().toISOString() > property.auctionStartDate ? (
                  <Col className="mt-2">
                    <div className="d-grid justify-content-center align-items-center auction-boxes">
                      <AuctionTimer
                        time={property.auctionEndDate}
                        id={property._id}
                        windowSize={windowSize}
                      />
                      <span>Auction Ends</span>
                    </div>
                  </Col>
                ) : new Date().toISOString() < property.auctionStartDate ? (
                  <Col className="mt-2">
                    <div className="d-grid justify-content-center align-items-center auction-boxes">
                      <AuctionTimer
                        time={property.auctionStartDate}
                        id={property._id}
                        windowSize={windowSize}
                      />
                      <span>Auction Starts In</span>
                    </div>
                  </Col>
                ) : (
                  new Date().toISOString() > property.auctionEndDate && (
                    <Col className="mt-2">
                      <div
                        className="d-grid justify-content-center align-items-center auction-boxes"
                        style={{
                          padding: "3.32rem 40px",
                          width: windowSize < 800 && "306px",
                        }}
                      >
                        <p>Auction Ended</p>
                      </div>
                    </Col>
                  )
                )}

                {property.highestBidders && (
                  <Col className="mt-2">
                    {property.highestBid ? (
                      <div
                        className="d-grid justify-content-center align-items-center auction-boxes"
                        style={{
                          padding: "1.875rem 40px",
                          width: windowSize < 800 && "306px",
                        }}
                      >
                        <NumberFormat
                          value={property.highestBid}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          style={{
                            fontWeight: "600",
                            fontSize: "32px",
                            color: "#08080A",
                            fontFamily: "Tzimmes",
                            paddingBottom: "0.875rem",
                          }}
                        />
                        <span>Current Bid</span>
                      </div>
                    ) : (
                      <div
                        className="d-grid justify-content-center align-items-center auction-boxes"
                        style={{
                          padding: "1.875rem 40px",
                          width: windowSize < 800 && "306px",
                        }}
                      >
                        <NumberFormat
                          value={property.startingBid}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$"}
                          style={{
                            fontWeight: "600",
                            fontSize: "32px",
                            color: "#08080A",
                            fontFamily: "Tzimmes",
                            paddingBottom: "0.875rem",
                          }}
                        />
                        <p>Current Bid</p>
                      </div>
                    )}
                  </Col>
                )}

                <Col className="mt-2">
                  <div
                    className="d-grid justify-content-center align-items-center auction-boxes"
                    style={{
                      padding: "1.875rem 40px",
                      width: windowSize < 800 && "306px",
                    }}
                  >
                    <NumberFormat
                      value={property.viewCounts}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={""}
                      style={{
                        fontWeight: "600",
                        fontSize: "32px",
                        color: "#08080A",
                        fontFamily: "Tzimmes",
                        paddingBottom: "0.875rem",
                      }}
                    />
                    <span>Views</span>
                  </div>
                </Col>
              </Row>

              <Row className="p-0 m-0 mt-5">
                <Col style={{ padding: "0" }}>
                  <div className="prop-info-table">
                    <span>Property Info</span>
                    <Table borderless responsive>
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
                          {property.property.details.real_estate_type ? (
                            <td>
                              {property.property.details.real_estate_type
                                .replaceAll("_", " ")[0]
                                .toUpperCase() +
                                property.property.details.real_estate_type
                                  .replaceAll("_", " ")
                                  .slice(1)}
                            </td>
                          ) : (
                            <td>N/A</td>
                          )}
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Lot Size</td>
                          {property.property.details.parcel.lot_size ? (
                            <td>
                              {property.property.details.parcel.lot_size} Acre
                            </td>
                          ) : (
                            <td>N/A</td>
                          )}
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>
                            Year Built/Renovated
                          </td>
                          {property.property.details.year_built ? (
                            <td>{property.property.details.year_built}</td>
                          ) : (
                            <td>N/A</td>
                          )}
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Garage(s)</td>
                          {property.property.details.type_of_garage ? (
                            <td>{property.property.details.type_of_garage}</td>
                          ) : (
                            <td>N/A</td>
                          )}
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Story(s)</td>
                          {property.property.details.number_of_stories ? (
                            <td>
                              {property.property.details.number_of_stories}
                            </td>
                          ) : (
                            <td>N/A</td>
                          )}
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Bedrooms</td>
                          {property.property.details.structure.beds_count ? (
                            <td>
                              {property.property.details.structure.beds_count}
                            </td>
                          ) : (
                            <td>N/A</td>
                          )}
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Bathrooms</td>
                          {property.property.details.structure.baths_count ? (
                            <td>
                              {property.property.details.structure.baths_count}
                            </td>
                          ) : (
                            <td>N/A</td>
                          )}
                        </tr>
                        <tr>
                          <td style={{ fontWeight: "700" }}>Sqft</td>
                          {property.property.details.parcel.area_sq_ft ? (
                            <td>
                              {property.property.details.parcel.area_sq_ft}
                            </td>
                          ) : (
                            <td>N/A</td>
                          )}
                        </tr>
                      </tbody>
                    </Table>
                  </div>
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
                      hover
                      style={{
                        padding: "0",
                        // position: windowSize < 600 && "absolute",
                        width: windowSize < 600 && "92vw",
                        // height: windowSize < 600 && "300px",
                        overflow: windowSize < 800 ? "auto" : "hidden",
                        display: windowSize < 800 && "block",
                        tableLayout: windowSize < 800 && "auto",
                      }}
                    >
                      <thead
                        style={{
                          backgroundColor: "#d58f5c",
                        }}
                      >
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
            className="mt-4"
            style={{
              margin: "0",
              padding: "0",
              padding: windowSize < 500 ? "25px 15px" : "35px",
            }}
          >
            <Col
              style={{
                color: "black",
                padding: windowSize > 800 && "20px 20px 20px 0",
                fontFamily: "Interstate, sans-serif",
                fontWeight: "300",
              }}
              className="p-0"
              xs={12}
              // md={6}
            >
              <div
                style={{
                  fontSize: windowSize > 800 ? "20px" : "17px",
                }}
                className="summary-container d-grid"
              >
                <span>Executive Summary</span>
                {parse(property.property.details.description?.summary)}
              </div>
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
            className="mt-1"
            style={{
              padding: windowSize < 600 ? "15px" : "35px",
              scrollMarginTop: "10rem",
            }}
          >
            <Tabs
              defaultActiveKey="Location Information"
              activeKey={viewDocs}
              onSelect={(k) => setViewDocs(k)}
              className="RealEstate-Tab"
            >
              <Tab
                eventKey="Location Information"
                title={windowSize > 800 ? "Location Information" : "LI"}
                style={{
                  backgroundColor: "#B77B50",
                  border: "none",
                  outline: "none",
                  fontSize: "17px",
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
                  <span
                    style={{
                      fontSize: windowSize < 600 ? "18px" : "20px",
                      textAlign: "left",
                    }}
                  >
                    {parse(property.property.details.description?.location)}
                  </span>
                </div>
              </Tab>
              <Tab
                eventKey="Market Information"
                title={windowSize > 800 ? "Market Information" : "MI"}
                style={{
                  backgroundColor: "#B77B50",
                  border: "none",
                  outline: "none",
                  fontSize: "17px",
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
                  <span
                    style={{
                      fontSize: windowSize < 600 ? "18px" : "20px",
                      textAlign: "left",
                    }}
                  >
                    {parse(property.property.details.description?.market)}
                  </span>
                </div>
              </Tab>
              <Tab
                eventKey="Investment Opportunity"
                title={windowSize > 800 ? "Investment Opportunity" : "IO"}
                className="RealEstate-Tab-1"
                style={{
                  backgroundColor: "#B77B50",
                  border: "none",
                  outline: "none",
                  fontSize: "17px",
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
                  <span
                    style={{
                      fontSize: windowSize < 600 ? "18px" : "20px",
                      textAlign: "left",
                    }}
                  >
                    {parse(
                      property.property.details?.description?.investment || ""
                    )}
                  </span>
                </div>
              </Tab>
              <Tab
                eventKey="Document Vault"
                title={windowSize > 800 ? "Document Vault" : "DV"}
                style={{
                  backgroundColor: "#B77B50",
                  border: "none",
                  outline: "none",
                  fontSize: "17px",
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
                            demographics.map((item) => item.url)
                          )}
                        />{" "}
                        Demographics ({demographics.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(
                            purchaseAgreement.map((item) => item.url)
                          )}
                        />{" "}
                        Purchase Agreement ({purchaseAgreement.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(market.map((item) => item.url))}
                        />{" "}
                        Market and Valuations ({market.length})
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
                            thirdParty.map((item) => item.url)
                          )}
                        />
                        Third Party Reports ({thirdParty.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(financial.map((item) => item.url))}
                        />{" "}
                        Financial Documents ({financial.length})
                      </div>
                      <div>
                        <input
                          type="checkbox"
                          onChange={download(titles.map((item) => item.url))}
                        />{" "}
                        Title and Insurance ({titles.length})
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
                        fontFamily: "Josefin Slab",
                        fontWeight: "500",
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
                        className="mt-2 docs-view-btn"
                      >
                        View Selected
                      </button>
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }}>
                      <button
                        onClick={() => {
                          viewAll();
                        }}
                        className="mt-2 docs-view-btn"
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
            <Modal.Header className="auction-modal-header p-4">
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
              <MultiBuyForm
                windowSize={windowSize}
                setMessage={setMessage}
                auctionId={property._id}
                toggleDocu={toggleDocu}
                setDocuUrl={setDocuUrl}
              />
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
            <Modal.Header className="auction-modal-header p-3">
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
              <BuyConfirm
                property={property}
                setMessage={setMessage}
                windowSize={windowSize}
              />
            </Modal.Body>
          </Modal>
        </>
      )}
    </>
  );
}

export default DisplayRealEstate;
