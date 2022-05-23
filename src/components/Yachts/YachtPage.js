import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import { UpcomingYachtCard } from "../Cards/UpcomingYachtCard";
import "../../styles/realEstate.css";
import { YachtCard } from "../Cards/YachtCard";
import authService from "../../services/authServices";

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
    background: url("./images/arrow_back.png") center center no-repeat !important;
    font-size: 50px;
  }

  .slick-prev:before {
    display: none;
  }

  .slick-next {
    right: -75px;
    width: 12vw;
    height: 100%;
    background: url("./images/arrow_next.png") center center no-repeat !important;
    font-size: 50px;
  }

  .slick-next:before {
    display: none;
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

function YachtPage({ toggleChange, setImgYacht, toggleSignIn }) {
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  useEffect(() => {
    authService
      .getOngoingAuctionsByType("yacht")
      .then((res) => {
        setOnGoingAuctions(res.data);
      })
      .catch((err) => {
        alert(err);
      });
    authService
      .getUpcomingAuctionsByType("yacht")
      .then((res) => {
        setUpcomingAuctions(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);
  useEffect(() => {
    if (onGoingAuctions && upcomingAuctions) {
      const Arr = [...onGoingAuctions, ...upcomingAuctions];
      const imageUrl = Arr.map((image) => {
        for (let i = 0; i < image.property.images.length; i++) {
          return image.property.images[i].url;
        }
      });
      setImgYacht(imageUrl);
    }
  }, [onGoingAuctions, upcomingAuctions, setImgYacht]);
  useEffect(() => {
    toggleChange();
  }, [toggleChange]);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: onGoingAuctions.length > 3 ? 3 : onGoingAuctions.length,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
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
        },
      },
    ],
  };
  return (
    <>
      <div className="mt-5">
        <Col md={12} className="m-auto pt-2">
          <Row>
            <h1
              style={{
                marginBottom: "80px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              ONGOING AUCTIONS
            </h1>
            {onGoingAuctions.length > 0 ? (
              <Carousel {...settings}>
                {onGoingAuctions.map((item, index) => (
                  <Wrap key={index}>
                    <Col md={12} style={{ marginBottom: "30px" }}>
                      <YachtCard
                        url={item.property.images[0].url}
                        urls={item.property.images}
                        data={item.property.details}
                        id={item._id}
                        auctionStartDate={item.auctionStartDate}
                        auctionEndDate={item.auctionEndDate}
                        startingBid={item.startingBid}
                        auctionId={item._id}
                        toggleSignIn={toggleSignIn}
                      />
                    </Col>
                  </Wrap>
                ))}
              </Carousel>
            ) : (
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                No Ongoing Auctions
              </h3>
            )}
          </Row>
          <Row style={{ marginBottom: "100px" }}>
            <h1
              style={{
                margin: "80px 0",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              UPCOMING AUCTIONS
            </h1>
            {upcomingAuctions.length > 0 ? (
              upcomingAuctions.map((item, index) => (
                <Col key={index} md={4} style={{ marginBottom: "30px" }}>
                  <UpcomingYachtCard
                    url={item.property.images[0].url}
                    urls={item.property.images}
                    data={item.property.details}
                    id={item._id}
                    auctionStartDate={item.auctionStartDate}
                    auctionEndDate={item.auctionEndDate}
                    startRegister={item.registerStartDate}
                    endRegister={item.registerEndDate}
                    startingBid={item.startingBid}
                    toggleSignIn={toggleSignIn}
                  />
                </Col>
              ))
            ) : (
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                No Upcoming Auctions
              </h3>
            )}
          </Row>
        </Col>
      </div>
    </>
  );
}

export default YachtPage;
