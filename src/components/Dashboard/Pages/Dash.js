import React, { useState, useEffect } from "react";
import { Row, Col, Button, Container } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import { RiFilter2Fill } from "react-icons/ri";
import { MdOutlineRefresh } from "react-icons/md";
import "react-circular-progressbar/dist/styles.css";
import authServices from "../../../services/authServices";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "./Auctions/SavedAuctionsCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const Carousel = styled(Slider)`
  // height: 30vh;
  // overflow: hidden;

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
    left: -75px;
    width: 12vw;
    height: 100%;
  }

  .slick-prev:before {
    color: #e9af84;
    font-size: 50px;
  }

  .slick-next {
    right: -75px;
    width: 12vw;
    height: 100%;
  }

  .slick-next:before {
    color: #e9af84;
    font-size: 50px;
  }
`;

const Wrap = styled.div`
border-radius: 4px;
cursor: pointer;
position: relative;


  &:hover {
    padding: 0;
    // border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
}
`;

function Dash() {
  const [savedProp, setSavedProp] = useState([]);
  const [bidAuctions, setBidAuctions] = useState([]);
  const [approvedAuctions, setApprovedAuctions] = useState([]);
  const [showSavedProp, setShowSavedProp] = useState(false);
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

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: savedProperties.length > 3 ? 3 : savedProperties.length,
  };

  useEffect(() => {
    setUpcomingAuctions(property.length);
    setLiveAuctions(auctions.length);
  }, [property, auctions]);

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
          <div className="tab">
            <Button
              onClick={() => {
                toogleShowApprovedAuctions(false);
                toogleShowBidAuctions(false);
                getSavedProperty();
                toogleShowSavedProp(true);
              }}
              className="tabs"
            >
              <span>Saved Auction</span>
            </Button>
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
          <Carousel {...settings}>
            {savedProp.map((property, index) => (
              <Wrap key={index}>
                <Col md={12}>
                  <SavedAuctionsCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    auctionStartDate={property.auctionStartDate}
                    auctionEndDate={property.auctionEndDate}
                    startingBid={
                      property.highestBid
                        ? property.highestBid
                        : property.startingBid
                    }
                    auctionId={property._id}
                  />
                </Col>
              </Wrap>
            ))}
          </Carousel>
        </Row>
      ) : (
        savedProp.length === 0 &&
        showSavedProp && (
          <div>
            <h1>No Saved Auction</h1>
          </div>
        )
      )}

      {showBidAuctions && bidAuctions.length > 0 ? (
        <Row>
          <Carousel {...settings}>
            {bidAuctions.map((property, index) => (
              <Wrap key={index}>
                <Col md={12}>
                  <SavedAuctionsCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    auctionStartDate={property.auctionStartDate}
                    auctionEndDate={property.auctionEndDate}
                    startingBid={
                      property.highestBid
                        ? property.highestBid
                        : property.startingBid
                    }
                    auctionId={property._id}
                  />
                </Col>
              </Wrap>
            ))}
          </Carousel>
        </Row>
      ) : (
        bidAuctions.length === 0 &&
        showBidAuctions && (
          <div>
            <h1>No Bid Auction</h1>
          </div>
        )
      )}

      {showApprovedAuctions && approvedAuctions.length > 0 ? (
        <Row>
          <Carousel {...settings}>
            {approvedAuctions.map((property, index) => (
              <Wrap key={index}>
                <Col md={12}>
                  <SavedAuctionsCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    auctionStartDate={property.auctionStartDate}
                    auctionEndDate={property.auctionEndDate}
                    startingBid={
                      property.highestBid
                        ? property.highestBid
                        : property.startingBid
                    }
                    auctionId={property._id}
                  />
                </Col>
              </Wrap>
            ))}
          </Carousel>
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
