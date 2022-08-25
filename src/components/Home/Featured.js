import React, { useState, useEffect, useRef } from "react";
import { Row, Col } from "react-bootstrap";
import Cards from "../Cards/Cards";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Next from "../../images/Next.png";
import Prev from "../../images/Previous.png";
import "../../App.css";

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

const Featured = ({ toggleSignIn, featureAuctions: auctions, windowSize }) => {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize >= 1536
        ? auctions.length > 3
          ? 3
          : auctions.length
        : auctions.length > 2
        ? 2
        : auctions.length,
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
    <div id="feature" className="background" style={{ height: "100vh" }}>
      <Row>
        <Col md={12} className="m-auto p-0">
          <h2
            style={{
              color: "white",
              fontSize: windowSize < 600 ? "24px" : "44px",
              marginBottom: "50px",
              fontWeight: "600",
              fontFamily: "Josefin Slab",
              fontStyle: "normal",
              padding: "30px 50px",
            }}
          >
            Featured Listings
          </h2>
        </Col>
      </Row>
      {auctions.length > 0 ? (
        <>
          <Col md={12} className="m-auto">
            <Row style={{ height: "700px" }}>
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
      ) : (
        <Col md={12} className="m-auto px-5">
          <div
            className="text-center"
            // style={{ border: "20px solid #55c2ff", padding: "30px 0" }}
          >
            <h3 style={{ color: "white" }}>
              No Featured Listings
            </h3>
          </div>
        </Col>
      )}
    </div>
  );
};

export { Featured };
