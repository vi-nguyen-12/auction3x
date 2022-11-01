import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { GoPlus } from "react-icons/go";
import "react-circular-progressbar/dist/styles.css";
import authServices from "../../../services/authServices";
import { useSelector } from "react-redux";
import CloseButton from "react-bootstrap/CloseButton";
import AddFund from "../../BuyRegister/AddFund";
import { useHistory } from "react-router-dom";
import NewCards from "../../Cards/NewCards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import Next from "../../../images/Next.png";
import Prev from "../../../images/Previous.png";

const Carousel = styled(Slider)`
  // height: 100%;
  overflow-x: hidden;

  & > button {
    opacity: 1;
    height: 80%;
    width: 5vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      position: absolute;
      // top: -3vh;
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

  // .slick-prev {
  //   width: 60px;
  //   height: 60px;
  //   left: 8vw;
  //   z-index: 1;
  //   background: url(${Prev});
  //   background-size: 15px;
  //   background-repeat: no-repeat;
  //   background-position: 45% 50%;
  //   background-color: white;
  //   border-radius: 50%;
  //   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
  //   margin: -50px;
  //   margin-left: -120px;
  // }

  .slick-prev:before {
    display: none;
    // font-size: 60px;
    // color: #e9af84;
  }

  // .slick-next {
  //   width: 60px;
  //   height: 60px;
  //   right: 8vw;
  //   z-index: 1;
  //   background: url(${Next});
  //   background-size: 15px;
  //   background-repeat: no-repeat;
  //   background-position: 53% 50%;
  //   background-color: white;
  //   border-radius: 50%;
  //   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
  //   margin: -50px;
  //   margin-right: -122px;
  // }

  .slick-next:before {
    display: none;
    // font-size: 60px;
    // color: #e9af84;
  }

  // @media (max-width: 600px) {
  //   .slick-prev {
  //     width: 50px;
  //     height: 50px;
  //     left: 15vw;
  //     margin-top: -75px;
  //   }
  //   .slick-next {
  //     width: 50px;
  //     height: 50px;
  //     right: 15vw;
  //     margin-top: -75px;
  //   }
  // }
`;

function Dash({ windowSize, featureLength, loader, toggleToast, setMessage }) {
  const [savedProp, setSavedProp] = useState([]);
  const [bidAuctions, setBidAuctions] = useState([]);
  const [approvedAuctions, setApprovedAuctions] = useState([]);
  const [showSavedProp, setShowSavedProp] = useState(true);
  const [showBidAuctions, setShowBidAuctions] = useState(false);
  const [showApprovedAuctions, setShowApprovedAuctions] = useState(false);
  const [featureListings, setFeatureListings] = useState(0);
  const [listing, setListing] = useState(0);
  const [numOfUpcomingAuctions, setNumOfUpcomingAuctions] = useState(0);
  const toggleShowSavedProp = (state) => setShowSavedProp(state);
  const toggleShowBidAuctions = (state) => setShowBidAuctions(state);
  const toggleShowApprovedAuctions = (state) => setShowApprovedAuctions(state);
  const user = useSelector((state) => state.user);
  const savedProperties = useSelector((state) => state.savedProperty);
  const [showFundReq, popFundReq] = useState(false);
  const toggleFundReq = () => popFundReq(!showFundReq);
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);

  const history = useHistory();

  //slider circles
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize >= 1250 ? (savedProp.length >= 3 ? 3 : savedProp.length) : 1,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };

  let bidSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize >= 1250
        ? bidAuctions.length >= 3
          ? 3
          : bidAuctions.length
        : 1,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };

  let approvedSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize >= 1250
        ? approvedAuctions.length >= 3
          ? 3
          : approvedAuctions.length
        : 1,
    beforeChange: (current, next) => {
      setSlideIndex(next);
    },
  };

  const handleClick = (index) => () => {
    setSlideIndex(index);
  };

  useEffect(() => {
    if (slider.current) {
      slider.current.slickGoTo(slideIndex);
    }
  }, [slideIndex]);

  useEffect(() => {
    const getFeatureAuctions = async () => {
      await authServices.getFeaturedAuctions().then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setFeatureListings(
            res.data.filter(
              (auction) => auction.auctionEndDate > new Date().toISOString()
            ).length
          );
        }
      });
    };
    const getUpcomingAuctions = async () => {
      await authServices.getUpcomingAuctions().then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setNumOfUpcomingAuctions(res.data.length);
        }
      });
    };

    const getUserListings = async () => {
      await authServices.sellerPropInAuctions(user._id).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setListing(res.data.length);
        }
      });
    };
    // setUpcomingAuctions(property.length);
    // setLiveAuctions(auctions.length);
    if (user._id) {
      setSavedProp(savedProperties.slice().reverse());
    }
    getFeatureAuctions();
    getUpcomingAuctions();
    getUserListings();
  }, [savedProperties, user, setMessage]);

  const getSavedProperty = () => {
    if (user._id) {
      setSavedProp(savedProperties.slice().reverse());
    }
  };

  const getBidAuctions = async () => {
    const id = user._id;
    await authServices.getUserBidAuctions(id).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setBidAuctions(res.data.slice().reverse());
      }
    });
  };

  const getApprovedAuctions = async () => {
    const id = user._id;
    await authServices.buyerApprovedAuctions(id).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setApprovedAuctions(res.data.slice().reverse());
      }
    });
  };

  return (
    <Container
      className="container2"
      style={{
        width: windowSize < 800 && "100vw",
        // justifyContent: windowSize < 800 && "grid",
        justifyContent: windowSize < 800 && "center",
        padding: windowSize < 800 && "0",
        margin: windowSize < 800 && "0",
      }}
    >
      {/* <a href="mailto:nungkhual@gmail.com?subject = test"> Contact Us</a> */}
      <Row>
        <Col
          className="d-flex justify-content-center mt-2"
          lg={4}
          md={6}
          sm={12}
          xs={12}
        >
          <a
            className="liveAuc"
            href="/Auctions/Featured"
            // onClick={() => {
            //   window.open(`/${"feature"}`);
            // }}
          >
            <div className="names">
              <span>Featured Auctions</span>
              <h3>{featureListings}</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={70} strokeWidth={20} />
            </div>
          </a>
        </Col>
        <Col
          className="d-flex justify-content-center mt-2"
          lg={4}
          md={6}
          sm={12}
          xs={12}
        >
          <a className="liveAuc" href="/Auctions/Upcoming">
            <div className="names">
              <span>Upcoming Auctions</span>
              <h3>{numOfUpcomingAuctions}</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={20} strokeWidth={20} stroke="red" />
            </div>
          </a>
        </Col>
        {/* <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Your Wishlist</span>
              <h3>3,672</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={60} strokeWidth={20} stroke="red" />
            </div>
          </div>
        </Col> */}
        <Col
          className="d-flex justify-content-center mt-2"
          lg={4}
          md={6}
          sm={12}
          xs={12}
        >
          <a
            className="liveAuc"
            onClick={() => {
              history.push("/Dashboard/Listings/YourListings");
            }}
          >
            <div className="names">
              <span>Your Listings</span>
              <h3>{listing}</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={35} strokeWidth={20} stroke="red" />
            </div>
          </a>
        </Col>
      </Row>

      {windowSize > 800 ? (
        <Row>
          <Col>
            <div className="tab">
              {showSavedProp === true ? (
                <Button
                  onClick={() => {
                    toggleShowApprovedAuctions(false);
                    toggleShowBidAuctions(false);
                    getSavedProperty();
                    toggleShowSavedProp(true);
                  }}
                  style={{ fontSize: windowSize < 600 && "0.9rem" }}
                  id={window.location.pathname === "/Dashboard" ? "active" : ""}
                  className="tabs"
                >
                  <span>Saved Auction</span>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    toggleShowApprovedAuctions(false);
                    toggleShowBidAuctions(false);
                    getSavedProperty();
                    toggleShowSavedProp(true);
                  }}
                  style={{ fontSize: windowSize < 600 && "0.9rem" }}
                  // style={{ borderBottom: color, color: textColor }}
                  className="tabs"
                >
                  <span>Saved Auction</span>
                </Button>
              )}
              {showBidAuctions === true ? (
                <Button
                  onClick={() => {
                    toggleShowApprovedAuctions(false);
                    toggleShowSavedProp(false);
                    getBidAuctions();
                    toggleShowBidAuctions(true);
                  }}
                  className="tabs"
                  id={window.location.pathname === "/Dashboard" ? "active" : ""}
                >
                  <span>Bid Auction</span>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    toggleShowApprovedAuctions(false);
                    toggleShowSavedProp(false);
                    getBidAuctions();
                    toggleShowBidAuctions(true);
                  }}
                  className="tabs"
                >
                  <span>Bid Auction</span>
                </Button>
              )}
              {showApprovedAuctions === true ? (
                <Button
                  onClick={() => {
                    toggleShowBidAuctions(false);
                    toggleShowSavedProp(false);
                    getApprovedAuctions();
                    toggleShowApprovedAuctions(true);
                  }}
                  className="tabs"
                  id={window.location.pathname === "/Dashboard" ? "active" : ""}
                >
                  <span>Approved</span>
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    toggleShowBidAuctions(false);
                    toggleShowSavedProp(false);
                    getApprovedAuctions();
                    toggleShowApprovedAuctions(true);
                  }}
                  className="tabs"
                >
                  <span>Approved</span>
                </Button>
              )}
            </div>
          </Col>

          <Col>
            <div className="filter">
              <div onClick={toggleFundReq} className="refresh">
                <GoPlus onClick={toggleFundReq} color="white" size={28} />
                <button onClick={toggleFundReq} className="resetBtn">
                  <span>Add Fund</span>
                </button>
              </div>
            </div>
          </Col>
        </Row>
      ) : (
        <>
          <Row
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              padding: "0",
              margin: "0",
            }}
          >
            <Col
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="filter">
                <div onClick={toggleFundReq} className="refresh">
                  <GoPlus onClick={toggleFundReq} color="white" size={28} />
                  <button onClick={toggleFundReq} className="resetBtn">
                    <span>Add Fund</span>
                  </button>
                </div>
              </div>
            </Col>
          </Row>

          <Row
            style={{
              width: "100vw",
              display: "flex",
              justifyContent: "center",
              padding: "0",
              margin: "0",
            }}
          >
            <Col
              style={{
                width: "100vw",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <div className="tab">
                {showSavedProp === true ? (
                  <Button
                    onClick={() => {
                      toggleShowApprovedAuctions(false);
                      toggleShowBidAuctions(false);
                      getSavedProperty();
                      toggleShowSavedProp(true);
                    }}
                    style={{ padding: windowSize < 600 && "5px" }}
                    id={
                      window.location.pathname === "/Dashboard" ? "active" : ""
                    }
                    className="tabs"
                  >
                    <span>Saved Auction</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      toggleShowApprovedAuctions(false);
                      toggleShowBidAuctions(false);
                      getSavedProperty();
                      toggleShowSavedProp(true);
                    }}
                    style={{ padding: windowSize < 600 && "5px" }}
                    className="tabs"
                  >
                    <span>Saved Auction</span>
                  </Button>
                )}
                {showBidAuctions === true ? (
                  <Button
                    onClick={() => {
                      toggleShowApprovedAuctions(false);
                      toggleShowSavedProp(false);
                      getBidAuctions();
                      toggleShowBidAuctions(true);
                    }}
                    className="tabs"
                    id={
                      window.location.pathname === "/Dashboard" ? "active" : ""
                    }
                  >
                    <span>Bid Auction</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      toggleShowApprovedAuctions(false);
                      toggleShowSavedProp(false);
                      getBidAuctions();
                      toggleShowBidAuctions(true);
                    }}
                    className="tabs"
                  >
                    <span>Bid Auction</span>
                  </Button>
                )}
                {showApprovedAuctions === true ? (
                  <Button
                    onClick={() => {
                      toggleShowBidAuctions(false);
                      toggleShowSavedProp(false);
                      getApprovedAuctions();
                      toggleShowApprovedAuctions(true);
                    }}
                    className="tabs"
                    id={
                      window.location.pathname === "/Dashboard" ? "active" : ""
                    }
                  >
                    <span>Approved</span>
                  </Button>
                ) : (
                  <Button
                    onClick={() => {
                      toggleShowBidAuctions(false);
                      toggleShowSavedProp(false);
                      getApprovedAuctions();
                      toggleShowApprovedAuctions(true);
                    }}
                    className="tabs"
                  >
                    <span>Approved</span>
                  </Button>
                )}
              </div>
            </Col>
          </Row>
        </>
      )}

      <Row className="mb-2 mt-3">
        {showSavedProp && savedProp.length > 0 && savedProp.length < 3 ? (
          savedProp.slice(0, 5).map((property, index) => (
            <Col
              md={windowSize > 1400 ? 5 : 6}
              key={index}
              className="py-2 d-flex justify-content-center align-items-center my-5"
            >
              <NewCards
                windowSize={windowSize}
                data={property}
                type={property.property.type}
              />
            </Col>
          ))
        ) : showSavedProp && savedProp.length >= 3 ? (
          <Carousel {...settings} ref={slider}>
            {savedProp.slice(0, 5).map((property, index) => (
              <Col
                key={index}
                className="d-flex justify-content-center align-items-center align-content-center position-relative carousel-cards px-2"
              >
                <NewCards
                  windowSize={windowSize}
                  data={property}
                  type={property.property.type}
                />
              </Col>
            ))}
          </Carousel>
        ) : !loader ? (
          <Col></Col>
        ) : (
          showSavedProp && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <h1 style={{ fontSize: windowSize < 800 && "2rem" }}>
                No Saved Auction
              </h1>
            </div>
          )
        )}

        {showBidAuctions && bidAuctions.length > 0 && bidAuctions.length < 3 ? (
          bidAuctions.slice(0, 5).map((property, index) => (
            <Col
              md={windowSize > 1400 ? 5 : 6}
              key={index}
              className="py-2 d-flex justify-content-center"
            >
              <NewCards
                windowSize={windowSize}
                data={property}
                type={property.property.type}
              />
            </Col>
          ))
        ) : showBidAuctions && bidAuctions.length >= 3 ? (
          <Carousel {...bidSettings} ref={slider}>
            {bidAuctions.slice(0, 5).map((property, index) => (
              <Col
                key={index}
                className="d-flex justify-content-center align-items-center align-content-center position-relative carousel-cards px-2"
              >
                <NewCards
                  windowSize={windowSize}
                  data={property}
                  type={property.property.type}
                />
              </Col>
            ))}
          </Carousel>
        ) : (
          showBidAuctions && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <h1 style={{ fontSize: windowSize < 800 && "2rem" }}>
                No Bid Auction
              </h1>
            </div>
          )
        )}

        {showApprovedAuctions &&
        approvedAuctions.length > 0 &&
        approvedAuctions.length < 3 ? (
          approvedAuctions.slice(0, 5).map((property, index) => (
            <Col
              md={windowSize > 1400 ? 5 : 6}
              key={index}
              className="py-2 d-flex justify-content-center align-items-center my-5"
            >
              <NewCards
                windowSize={windowSize}
                data={property}
                type={property.property.type}
              />
            </Col>
          ))
        ) : showApprovedAuctions && approvedAuctions.length >= 3 ? (
          <Carousel {...approvedSettings} ref={slider}>
            {approvedAuctions.slice(0, 5).map((property, index) => (
              <Col
                key={index}
                className="d-flex justify-content-center align-items-center align-content-center position-relative carousel-cards px-2"
              >
                <NewCards
                  windowSize={windowSize}
                  data={property}
                  type={property.property.type}
                />
              </Col>
            ))}
          </Carousel>
        ) : !loader ? (
          <Col></Col>
        ) : (
          showApprovedAuctions && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <h1 style={{ fontSize: windowSize < 800 && "2rem" }}>
                No Saved Auction
              </h1>
            </div>
          )
        )}
      </Row>
      <Row className="d-flex justify-content-center align-items-center">
        {showSavedProp && savedProp.length > 0
          ? savedProp
              .slice(0, 5)
              .map((property, index) => (
                <div
                  onClick={handleClick(index)}
                  key={index}
                  style={{ backgroundColor: index === slideIndex && "#B77B50" }}
                  className="slide-circle"
                ></div>
              ))
          : showBidAuctions && bidAuctions.length > 0
          ? bidAuctions
              .slice(0, 5)
              .map((property, index) => (
                <div
                  onClick={handleClick(index)}
                  key={index}
                  style={{ backgroundColor: index === slideIndex && "#B77B50" }}
                  className="slide-circle"
                ></div>
              ))
          : showApprovedAuctions && approvedAuctions.length > 0
          ? approvedAuctions
              .slice(0, 5)
              .map((property, index) => (
                <div
                  onClick={handleClick(index)}
                  key={index}
                  style={{ backgroundColor: index === slideIndex && "#B77B50" }}
                  className="slide-circle"
                ></div>
              ))
          : null}
      </Row>

      <Modal
        backdrop="static"
        keyboard={false}
        size="lg"
        show={showFundReq}
        onHide={toggleFundReq}
        centered
        className="fund-modal"
      >
        <Modal.Header className="auction-modal-header">
          <Modal.Title className="auction-modal-title px-3">
            Add Funds
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
              toggleFundReq();
            }}
          />
        </div>
        <Modal.Body>
          <AddFund setMessage={setMessage} />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Dash;
