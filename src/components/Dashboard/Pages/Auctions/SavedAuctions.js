import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import ErrorPage from "../../../Error/404page";
import SavedAuctionsCard from "./SavedAuctionsCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const Carousel = styled(Slider)`
  // height: 100%;
  overflow: hidden;

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
    height: 150px;
    left: 2vw;
    z-index: 1;
    background: url("./images/arrow_back.png") center center no-repeat !important;
    margin: -50px;
  }

  .slick-prev:before {
    display: none;
  }

  .slick-next {
    height: 150px;
    right: 2vw;
    z-index: 1;
    background: url("./images/arrow_next.png") center center no-repeat !important;
    margin: -50px;
  }

  .slick-next:before {
    display: none;
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
    // border: 4px solid rgba(249, 249, 249, 0.8);
    transition-duration: 300ms;
  }
}
`;

function SavedAuctions({ windowSize }) {
  const savedProperty = useSelector((state) => state.savedProperty);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize > 800
        ? savedProperty.length > 2
          ? 2
          : savedProperty.length
        : 1,
  };

  return (
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      <Row>
        <h1 style={{ marginBottom: "40px" }}>Saved Auctions</h1>
        {savedProperty.length > 0 ? (
          <Carousel {...settings}>
            {savedProperty.map((auction, index) => (
              <Wrap key={index}>
                <SavedAuctionsCard
                  url={auction.property.images[0].url}
                  urls={auction.property.images}
                  data={auction.property.details}
                  id={auction._id}
                  auctionStartDate={auction.auctionStartDate}
                  auctionEndDate={auction.auctionEndDate}
                  startingBid={auction.startingBid}
                  auctionId={auction._id}
                  type={auction.property.type}
                  windowSize={windowSize}
                />
              </Wrap>
            ))}
          </Carousel>
        ) : (
          <ErrorPage />
        )}
      </Row>
    </Container>
  );
}

export default SavedAuctions;
