import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Cards from "../Cards/Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { useParams } from "react-router-dom";
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
                    <Cards
                      toggleSignIn={toggleSignIn}
                      windowSize={windowSize}
                      data={item}
                      type={item.property.type}
                    />
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
