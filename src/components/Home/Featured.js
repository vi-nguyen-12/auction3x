import React from "react";
import { Row, Col } from "react-bootstrap";
import { CardComp } from "../Cards/RealEstateCard";
import { JetCard } from "../Cards/JetCard";
import { YachtCard } from "../Cards/YachtCard";
import { CarCard } from "../Cards/CarCard";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";

const Carousel = styled(Slider)`
  height: 30vh;
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

const Featured = () => {
  const auction = useSelector((state) => state.auction);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: auction.length > 3 ? 2 : auction.length,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: auction.length,
          slidesToScroll: 0,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: auction.length,
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

  return (
    <div className="background">
      {auction.length > 0 ? (
        <>
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
                {auction.map((item, index) => (
                  <Wrap key={index}>
                    <Col md={12}>
                      {item.type === "real-estate" ? (
                        <CardComp
                          url={item.property.images[0].url}
                          data={item.property.details}
                          id={item._id}
                          auctionStartDate={item.auctionStartDate}
                          auctionEndDate={item.auctionEndDate}
                          startingBid={item.highestBid}
                        />
                      ) : item.type === "car" ? (
                        <CarCard
                          data={item.details}
                          id={item._id}
                          url={item.images[0].url}
                          auctionStartDate={item.auctionStartDate}
                          auctionEndDate={item.auctionEndDate}
                          startingBid={item.highestBid}
                        />
                      ) : item.type === "jet" ? (
                        <JetCard
                          data={item.details}
                          id={item._id}
                          url={item.images[0].url}
                          auctionStartDate={item.auctionStartDate}
                          auctionEndDate={item.auctionEndDate}
                          startingBid={item.highestBid}
                        />
                      ) : item.type === "yacht" ? (
                        <YachtCard
                          data={item.details}
                          id={item._id}
                          url={item.images[0].url}
                          auctionStartDate={item.auctionStartDate}
                          auctionEndDate={item.auctionEndDate}
                          startingBid={item.highestBid}
                        />
                      ) : null}
                    </Col>
                  </Wrap>
                ))}
              </Carousel>
            </Row>
          </Col>
        </>
      ) : (
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
      )}
    </div>
  );
};

export { Featured };
