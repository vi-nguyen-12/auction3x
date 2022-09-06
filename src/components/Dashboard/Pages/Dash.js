import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container, Modal } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { RiFilter2Fill } from "react-icons/ri";
import { GoPlus } from "react-icons/go";
import "react-circular-progressbar/dist/styles.css";
import authServices from "../../../services/authServices";
import { useSelector } from "react-redux";
import SavedAuctionsComp from "./Auctions/TabsComponents/SavedAuctionsComp";
import BidAuctionsComp from "./Auctions/TabsComponents/BidAuctionsComp";
import ApprovedAuctionsComp from "./Auctions/TabsComponents/ApprovedAuctionsComp";
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
    height: 100%;
    width: 15vw;
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
    width: 60px;
    height: 60px;
    left: 8vw;
    z-index: 1;
    background: url(${Prev});
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: 45% 50%;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
    margin: -50px;
    margin-left: -120px;
  }

  .slick-prev:before {
    display: none;
    // font-size: 60px;
    // color: #e9af84;
  }

  .slick-next {
    width: 60px;
    height: 60px;
    right: 8vw;
    z-index: 1;
    background: url(${Next});
    background-size: 15px;
    background-repeat: no-repeat;
    background-position: 53% 50%;
    background-color: white;
    border-radius: 50%;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.75);
    margin: -50px;
    margin-right: -122px;
  }

  .slick-next:before {
    display: none;
    // font-size: 60px;
    // color: #e9af84;
  }

  @media (max-width: 600px) {
    .slick-prev {
      width: 50px;
      height: 50px;
      left: 15vw;
      margin-top: -75px;
    }
    .slick-next {
      width: 50px;
      height: 50px;
      right: 15vw;
      margin-top: -75px;
    }
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;
display: flex;
justify-content: center;
align-items: center;
align-content: center;
// margin-top: auto;  // Just for display

  &:hover {
    padding: 0;
    transition-duration: 300ms;
  }
}
`;

function Dash({ windowSize, featureLength }) {
  const [savedProp, setSavedProp] = useState([]);
  const [bidAuctions, setBidAuctions] = useState([]);
  const [approvedAuctions, setApprovedAuctions] = useState([]);
  const [showSavedProp, setShowSavedProp] = useState(true);
  const [showBidAuctions, setShowBidAuctions] = useState(false);
  const [showApprovedAuctions, setShowApprovedAuctions] = useState(false);
  const [numOfLiveAuctions, setNumOfLiveAuctions] = useState(0);
  const [listing, setListing] = useState();
  const [numOfUpcomingAuctions, setNumOfUpcomingAuctions] = useState(0);
  const toggleShowSavedProp = (state) => setShowSavedProp(state);
  const toggleShowBidAuctions = (state) => setShowBidAuctions(state);
  const toggleShowApprovedAuctions = (state) => setShowApprovedAuctions(state);
  const user = useSelector((state) => state.user);
  const savedProperties = useSelector((state) => state.savedProperty);
  const [showFundReq, popFundReq] = useState(false);
  const toggleFundReq = () => popFundReq(!showFundReq);

  const history = useHistory();

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize >= 1250 ? (savedProp.length >= 3 ? 2 : savedProp.length) : 1,
  };

  let bidSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize >= 1250
        ? bidAuctions.length >= 3
          ? 2
          : bidAuctions.length
        : 1,
  };

  let approvedSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize >= 1250
        ? approvedAuctions.length >= 3
          ? 2
          : approvedAuctions.length
        : 1,
  };

  console.log(bidAuctions);

  useEffect(() => {
    const getOngoingAuctions = async () => {
      await authServices.getFeaturedAuctions().then((res) => {
        setNumOfLiveAuctions(res.data.length);
      });
    };
    const getUpcomingAuctions = async () => {
      await authServices.getUpcomingAuctions().then((res) => {
        setNumOfUpcomingAuctions(res.data.length);
      });
    };

    const getUserListings = async () => {
      await authServices.sellerPropInAuctions(user._id).then((res) => {
        setListing(res.data.length);
      });
    };
    // setUpcomingAuctions(property.length);
    // setLiveAuctions(auctions.length);
    if (user._id) {
      setSavedProp(savedProperties);
    }
    getOngoingAuctions();
    getUpcomingAuctions();
    getUserListings();
  }, [savedProperties, user]);

  const getSavedProperty = () => {
    if (user._id) {
      setSavedProp(savedProperties);
    }
  };

  const getBidAuctions = async () => {
    const id = user._id;
    const data = await authServices.getUserBidAuctions(id);
    setBidAuctions(data.data);
  };

  const getApprovedAuctions = async () => {
    const id = user._id;
    const data = await authServices.buyerApprovedAuctions(id);
    setApprovedAuctions(data);
  };
  return (
    <Container
      className="container2"
      style={{
        width: windowSize < 800 && "100vw",
        justifyContent: windowSize < 800 && "grid",
        justifyContent: windowSize < 800 && "center",
        padding: windowSize < 800 && "0",
        margin: windowSize < 800 && "0",
      }}
    >
      <Row lg={3}>
        <Col
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "20px",
          }}
        >
          <a
            className="liveAuc"
            href="feature"
            // onClick={() => {
            //   window.open(`/${"feature"}`);
            // }}
          >
            <div className="names">
              <span>Featured Listings</span>
              <h3>{numOfLiveAuctions}</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={70} strokeWidth={20} />
            </div>
          </a>
        </Col>
        <Col
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <a className="liveAuc" href="upcoming">
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
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <a
            className="liveAuc"
            onClick={() => {
              history.push("/Dashboard/Listings/AuctionListings");
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
                  // style={{ borderBottom: "4px solid black", color: "black" ? 'true' : 'false' }}
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
              {/* <div className="filterIcon">
                <RiFilter2Fill color="white" size={25} />
                <button className="filterBtn">
                  <span>Filter</span>
                </button>
              </div> */}
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
                {/* <div className="filterIcon">
                  <RiFilter2Fill color="white" size={25} />
                  <button className="filterBtn">
                    <span>Filter</span>
                  </button>
                </div> */}
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
                    // style={{ borderBottom: "4px solid black", color: "black" ? 'true' : 'false' }}
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

      <Row>
        {showSavedProp && savedProp.length > 0 && savedProp.left < 3 ? (
          savedProp.map((property, index) => (
            <Col
              md={windowSize > 1400 ? 5 : 6}
              key={index}
              className="py-2 d-flex justify-content-center"
            >
              <NewCards
                // toggleSignIn={toggleSignIn}
                windowSize={windowSize}
                data={property}
                type={property.property.type}
              />
            </Col>
          ))
        ) : // savedProp.length === 0 &&
        showSavedProp && savedProp.length >= 3 ? (
          <Carousel {...settings}>
            {savedProp.map((property, index) => (
              <Col
                key={index}
                className="d-flex justify-content-center carousel-cards"
              >
                <NewCards
                  // toggleSignIn={toggleSignIn}
                  windowSize={windowSize}
                  data={property}
                  type={property.property.type}
                />
              </Col>
            ))}
          </Carousel>
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
          bidAuctions.map((property, index) => (
            <Col
              md={windowSize > 1400 ? 5 : 6}
              key={index}
              className="py-2 d-flex justify-content-center"
            >
              <NewCards
                // toggleSignIn={toggleSignIn}
                windowSize={windowSize}
                data={property}
                type={property.property.type}
              />
            </Col>
          ))
        ) : showBidAuctions && bidAuctions.length >= 3 ? (
          <Carousel {...bidSettings}>
            {bidAuctions.map((property, index) => (
              <Col
                key={index}
                className="d-flex justify-content-center carousel-cards"
              >
                <NewCards
                  // toggleSignIn={toggleSignIn}
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

        {showApprovedAuctions && approvedAuctions.length > 0 ? (
          <ApprovedAuctionsComp
            approvedAuctions={approvedAuctions}
            windowSize={windowSize}
          />
        ) : showApprovedAuctions && approvedAuctions.length >= 3 ? (
          <Carousel {...approvedSettings}>
            {savedProp.map((property, index) => (
              <Col
                key={index}
                className="d-flex justify-content-center carousel-cards"
              >
                <NewCards
                  // toggleSignIn={toggleSignIn}
                  windowSize={windowSize}
                  data={property}
                  type={property.property.type}
                />
              </Col>
            ))}
          </Carousel>
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
                No Approved Auction
              </h1>
            </div>
          )
        )}
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
          <AddFund />
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Dash;
