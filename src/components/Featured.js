import React from "react";
import { Row, Col } from "react-bootstrap";
import { CardComp } from "./Card";
import { useSelector } from "react-redux";
import authService from "../services/authServices";
import { useState, useEffect } from "react";
import { propertySlice } from "../slice/propertySlice";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const Featured = (props) => {
  const auction = useSelector((state) => state.auction);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 0,
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
        },
      },
    ],
  };

  const Carousel = styled(Slider)`
    height: 30vh;
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
  return (
    <div className="background">
      <Row>
        <Col md={12} className="m-auto">
          <img
            src="/images/f_name.png"
            alt=""
            style={{
              marginBottom: "0px",
              maxWidth: "250px",
              maxHeight: "150px",
            }}
          />
        </Col>
      </Row>

      <Col md={12} className="m-auto">
        <Row>
          <Carousel {...settings}>
            {auction.map((item) => (
              <Wrap>
                <Col key={item._id} md={12}>
                  <CardComp
                    url={item.property.images[0].url}
                    data={item.property.details}
                    id={item._id}
                    auctionStartDate={item.auctionStartDate}
                    auctionEndDate={item.auctionEndDate}
                    startingBid={item.highestBid}
                    auctionId={item._id}
                  />
                </Col>
              </Wrap>
            ))}
          </Carousel>
        </Row>
      </Col>
    </div>
  );
};

export { Featured };
