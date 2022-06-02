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

function Dash({ windowSize }) {
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

  useEffect(() => {
    const getOngoingAuctions = async () => {
      authServices.getOngoingAuctions().then((res) => {
        setNumOfLiveAuctions(res.data.length);
      });
    };
    const getUpcomingAuctions = async () => {
      authServices.getUpcomingAuctions().then((res) => {
        setNumOfUpcomingAuctions(res.data.length);
      });
    };

    const getUserListings = async () => {
      authServices.sellerPropInAuctions(user._id).then((res) => {
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
          <div
            className="liveAuc"
            onClick={() => {
              window.open("/");
            }}
          >
            <div className="names">
              <span>Live Auctions</span>
              <h3>{numOfLiveAuctions}</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={70} strokeWidth={20} />
            </div>
          </div>
        </Col>
        <Col
          style={{ display: "flex", justifyContent: "center", padding: "20px" }}
        >
          <div
            className="liveAuc"
            onClick={() => {
              window.open("/");
            }}
          >
            <div className="names">
              <span>Upcoming Auctions</span>
              <h3>{numOfUpcomingAuctions}</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={20} strokeWidth={20} stroke="red" />
            </div>
          </div>
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
          <div
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
          </div>
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
              <div className="filterIcon">
                <RiFilter2Fill color="white" size={25} />
                <button className="filterBtn">
                  <span>Filter</span>
                </button>
              </div>
              <div className="refresh">
                <GoPlus color="white" size={28} />
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
                <div className="filterIcon">
                  <RiFilter2Fill color="white" size={25} />
                  <button className="filterBtn">
                    <span>Filter</span>
                  </button>
                </div>
                <div className="refresh">
                  <GoPlus color="white" size={28} />
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
        {showSavedProp && savedProp.length > 0 ? (
          <Col>
            <SavedAuctionsComp savedProp={savedProp} windowSize={windowSize} />
          </Col>
        ) : (
          // savedProp.length === 0 &&
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

        {showBidAuctions && bidAuctions.length > 0 ? (
          <BidAuctionsComp bidAuctions={bidAuctions} windowSize={windowSize} />
        ) : (
          // bidAuctions.length === 0 &&
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
        ) : (
          // approvedAuctions.length === 0 &&
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
        <div>
          <CloseButton
            style={{
              position: "absolute",
              right: "25px",
              top: "25px",
              width: "25px",
              height: "25px",
              zIndex: "999",
              backgroundColor: "white",
              boxShadow: "none",
            }}
            onClick={toggleFundReq}
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
