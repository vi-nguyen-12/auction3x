import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { RiFilter2Fill } from "react-icons/ri";
import { MdOutlineRefresh } from "react-icons/md";
import "react-circular-progressbar/dist/styles.css";
import authServices from "../../../services/authServices";
import { useSelector } from "react-redux";
import SavedAuctionsComp from "./Auctions/TabsComponents/SavedAuctionsComp";
import BidAuctionsComp from "./Auctions/TabsComponents/BidAuctionsComp";
import ApprovedAuctionsComp from "./Auctions/TabsComponents/ApprovedAuctionsComp";

function Dash() {
  const [savedProp, setSavedProp] = useState([]);
  const [bidAuctions, setBidAuctions] = useState([]);
  const [approvedAuctions, setApprovedAuctions] = useState([]);
  const [showSavedProp, setShowSavedProp] = useState(true);
  const [showBidAuctions, setShowBidAuctions] = useState(false);
  const [showApprovedAuctions, setShowApprovedAuctions] = useState(false);
  const [liveAuctions, setLiveAuctions] = useState();
  const [upcomingAuctions, setUpcomingAuctions] = useState();
  const toogleShowSavedProp = (state) => setShowSavedProp(state);
  const toogleShowBidAuctions = (state) => setShowBidAuctions(state);
  const toogleShowApprovedAuctions = (state) => setShowApprovedAuctions(state);
  const user = useSelector((state) => state.user);
  const auctions = useSelector((state) => state.auction);
  const property = useSelector((state) => state.property);
  const savedProperties = useSelector((state) => state.savedProperty);
  const [color, setColor] = useState('#b77b50');
  const toogleColor = (color) => setColor(color);


  useEffect(() => {
    setUpcomingAuctions(property.length);
    setLiveAuctions(auctions.length);
    if (user._id) {
      setSavedProp(savedProperties);
      setColor('#b77b50');
    }
  }, [property, auctions, savedProperties, user]);

  const getSavedProperty = () => {
    if (user._id) {
      setSavedProp(savedProperties);
    }
  };

  const getBidAuctions = async () => {
    const id = user._id;
    const data = await authServices.getUserBidAuctions(id);
    setBidAuctions(data);
  };

  const getApprovedAuctions = async () => {
    const id = user._id;
    const data = await authServices.buyerApprovedAuctions(id);
    setApprovedAuctions(data);
  };
  console.log(savedProp.length)
  return (
    // <div className="DashContainer">
    //   <div className="DashBody">
    <Container className="container2">
      <Row lg={3}>
        <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Live Auctions</span>
              <h3>{liveAuctions}</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={70} strokeWidth={20} stroke="red" />
            </div>
          </div>
        </Col>
        <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Upcoming Auctions</span>
              <h3>{upcomingAuctions}</h3>
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
        <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Your Purchased</span>
              <h3>75</h3>
            </div>
            <div className="progress">
              <CircularProgressbar value={35} strokeWidth={20} stroke="red" />
            </div>
          </div>
        </Col>
      </Row>

      <Row>
        <Col>
          <div className="tab" >
            {window.location.pathname === "/Dashboard" ?
              <Button
                onClick={() => {
                  toogleShowApprovedAuctions(false);
                  toogleShowBidAuctions(false);
                  getSavedProperty();
                  toogleShowSavedProp(true);
                }}
                id={window.location.pathname === "/Dashboard" ? "active" : ""}
                // style={{ borderBottom: "4px solid black", color: "black" ? 'true' : 'false' }}
                className="tabs"
              >
                <span>Saved Auction</span>
              </Button>
              : <Button
                onClick={() => {
                  toogleShowApprovedAuctions(false);
                  toogleShowBidAuctions(false);
                  getSavedProperty();
                  toogleShowSavedProp(true);
                }}
                // style={{ borderBottom: color, color: textColor }}
                className="tabs"
              >
                <span>Saved Auction</span>
              </Button>}

            <Button
              onClick={() => {
                toogleShowApprovedAuctions(false);
                toogleShowSavedProp(false);
                getBidAuctions();
                toogleShowBidAuctions(true);
              }}
              className="tabs"
            >
              <span>Bid Auction</span>
            </Button>
            <Button
              onClick={() => {
                toogleShowBidAuctions(false);
                toogleShowSavedProp(false);
                getApprovedAuctions();
                toogleShowApprovedAuctions(true);
              }}
              className="tabs"
            >
              <span>Approved</span>
            </Button>
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
              <MdOutlineRefresh color="white" size={28} />
              <button className="resetBtn">
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </Col>
      </Row>
      {showSavedProp && savedProp.length > 0 ? (
        <Row>
          <SavedAuctionsComp savedProp={savedProp} />
        </Row>
      ) : (
        // savedProp.length === 0 &&
        showSavedProp && (
          <div>
            <h1>No Saved Auction</h1>
          </div>
        )
      )}

      {showBidAuctions && bidAuctions.length > 0 ? (
        <Row>
          <BidAuctionsComp bidAuctions={bidAuctions} />
        </Row>
      ) : (
        // bidAuctions.length === 0 &&
        showBidAuctions && (
          <div>
            <h1>No Bid Auction</h1>
          </div>
        )
      )}

      {showApprovedAuctions && approvedAuctions.length > 0 ? (
        <Row>
          <ApprovedAuctionsComp approvedAuctions={approvedAuctions} />
        </Row>
      ) : (
        // approvedAuctions.length === 0 &&
        showApprovedAuctions && (
          <div>
            <h1>No Approved Auction</h1>
          </div>
        )
      )}
    </Container>
  );
}

export default Dash;
