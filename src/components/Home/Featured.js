import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CardComp } from "../Cards/RealEstateCard";
import { JetCard } from "../Cards/JetCard";
import { YachtCard } from "../Cards/YachtCard";
import { CarCard } from "../Cards/CarCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import "../../App.css";

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

const Featured = ({ toggleSignIn, featureAuctions: auctions, windowSize }) => {

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: auctions.length > 2 ? 2 : auctions.length,
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
    <div className="background" style={{ height: "100vh" }}>
      {auctions.length > 0 ? (
        <>
          <Row>
            <Col md={12} className="m-auto">
              <h2 style={{ color: "white", fontSize: "22px", padding: "20px" }}>
                Featured Listings
              </h2>
            </Col>
          </Row>

          <Col md={12} className="m-auto">
            <Row>
              <Carousel {...settings}>
                {auctions.map((item, index) => (
                  <Wrap key={index}>
                    <Col md={12}>
                      {item.property.type === "real-estate" ? (
                        <CardComp
                          url={item.property.images[0].url}
                          urls={item.property.images}
                          data={item.property.details}
                          id={item._id}
                          windowSize={windowSize}
                          auctionStartDate={item.auctionStartDate}
                          auctionEndDate={item.auctionEndDate}
                          startingBid={item.startingBid}
                          reserveMet={item.isReservedMet}
                          toggleSignIn={toggleSignIn}
                        />
                      ) : item.property.type === "car" ? (
                        <CarCard
                          windowSize={windowSize}
                          url={item.property.images[0].url}
                          urls={item.property.images}
                          data={item.property.details}
                          id={item._id}
                          auctionStartDate={item.auctionStartDate}
                          auctionEndDate={item.auctionEndDate}
                          startingBid={item.startingBid}
                          reserveMet={item.isReservedMet}
                          toggleSignIn={toggleSignIn}
                        />
                      ) : item.property.type === "jet" ? (
                        <JetCard
                          windowSize={windowSize}
                          url={item.property.images[0].url}
                          urls={item.property.images}
                          data={item.property.details}
                          id={item._id}
                          auctionStartDate={item.auctionStartDate}
                          auctionEndDate={item.auctionEndDate}
                          startingBid={item.startingBid}
                          reserveMet={item.isReservedMet}
                          toggleSignIn={toggleSignIn}
                        />
                      ) : item.property.type === "yacht" ? (
                        <YachtCard
                          windowSize={windowSize}
                          url={item.property.images[0].url}
                          urls={item.property.images}
                          data={item.property.details}
                          id={item._id}
                          auctionStartDate={item.auctionStartDate}
                          auctionEndDate={item.auctionEndDate}
                          startingBid={item.startingBid}
                          reserveMet={item.isReservedMet}
                          toggleSignIn={toggleSignIn}
                        />
                      ) : null}
                    </Col>
                  </Wrap>
                ))}
              </Carousel>
            </Row>
          </Col>
        </>
      ) : null}
    </div>
  );
};

export { Featured };
