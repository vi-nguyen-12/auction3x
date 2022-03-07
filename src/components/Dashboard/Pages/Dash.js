import React, { useState } from "react";
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
  const [showSavedProp, setShowSavedProp] = useState(false);
  const toogleShowSavedProp = () => setShowSavedProp(!showSavedProp);
  const user = useSelector((state) => state.user);
  const savedProperties = useSelector((state) => state.savedProperty);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: savedProperties.length > 3 ? 3 : savedProperties.length,
  };

  const getSavedProperty = () => {
    if (user._id) {
      setSavedProp(savedProperties);
    }
  };

  const getBidAuctions = async () => {
    const id = user._id;
    const data = await authServices.getUserBidAuctions(id);
    console.log(data);
  };

  const getApprovedAuctions = async () => {
    const id = user._id;
    const data = await authServices.buyerApprovedAuctions(id);
    console.log(data);
  };

  console.log(savedProp);
  return (
    // <div className="DashContainer">
    //   <div className="DashBody">
    <Container className="container2">
      <Row lg={3}>
        <Col>
          <div className="liveAuc">
            <div className="names">
              <span>Live Auctions</span>
              <h3>684</h3>
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
              <h3>546</h3>
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
                getSavedProperty();
                toogleShowSavedProp();
              }}
              className="tabs"
            >
              <span>Saved Auction</span>
            </Button>
            <Button className="tabs">
              <span>Bid Auction</span>
            </Button>
            <Button className="tabs">
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
      {showSavedProp ? (
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
      ) : null}
    </Container>
  );
}

export default Dash;
