import React from "react";
import { Col, Row } from "react-bootstrap";
import "react-circular-progressbar/dist/styles.css";
import SavedAuctionsCard from "../../Auctions/SavedAuctionsCard";
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

function SavedAuctionsComp({ savedProp, windowSize }) {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: savedProp.length > 2 ? 2 : savedProp.length,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <>
      <Carousel {...settings}>
        {savedProp.map((property, index) => (
          <Wrap key={index}>
            <SavedAuctionsCard
              url={property.property.images[0].url}
              urls={property.property.images}
              data={property.property.details}
              id={property._id}
              auctionStartDate={property.auctionStartDate}
              auctionEndDate={property.auctionEndDate}
              startingBid={
                property.highestBid
                  ? property.highestBid.amount
                  : property.startingBid
              }
              auctionId={property._id}
              type={property.property.type}
              windowSize={windowSize}
            />
          </Wrap>
        ))}
      </Carousel>
    </>
  );
}

export default SavedAuctionsComp;
