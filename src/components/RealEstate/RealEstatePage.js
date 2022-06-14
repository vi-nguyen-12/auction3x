import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Col } from "react-bootstrap";
import "../../styles/realEstate.css";
import Cards from "../Cards/Cards";
import authService from "../../services/authServices";
import ErrorPage from "../Error/404page";

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
    // left: 2vw;
    z-index: 1;
    margin: -50px;
  }

  .slick-prev:before {
    display: none;
  }

  .slick-next {
    height: 150px;
    // right: 2vw;
    z-index: 1;
    content: ">";
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

function RealEstatePage({ toggleChange, setImg, toggleSignIn, windowSize }) {
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    toggleChange();
    authService
      .getOngoingAuctionsByType("real-estate")
      .then((res) => {
        setOnGoingAuctions(res.data);
      })
      .catch((err) => {
        alert(err);
      });
    authService
      .getUpcomingAuctionsByType("real-estate")
      .then((res) => {
        setUpcomingAuctions(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  }, []);

  useEffect(() => {
    const Arr = [...onGoingAuctions, ...upcomingAuctions];
    if (Arr.length > 0) {
      const imageUrl = Arr.map((image) => {
        for (let i = 0; i < image.property.images.length; i++) {
          return image.property.images[i].url;
        }
      });
      setImg(imageUrl);
    }
  }, [onGoingAuctions, upcomingAuctions]);

  useEffect(() => {
    if (onGoingAuctions && upcomingAuctions) {
      setAuctions([...onGoingAuctions, ...upcomingAuctions]);
    }
  }, [onGoingAuctions, upcomingAuctions]);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize > 800 ? (auctions.length > 3 ? 3 : auctions.length) : 1,
  };

  return (
    <>
      {auctions.length > 0 ? (
        <Row className="mt-5 mb-5">
          {windowSize > 800 ? (
            auctions.map((auction, index) => {
              return (
                <Col key={index}>
                  <Wrap>
                    <Cards
                      data={auction}
                      toggleSignIn={toggleSignIn}
                      type={auction.property.type}
                      windowSize={windowSize}
                    />
                  </Wrap>
                </Col>
              );
            })
          ) : (
            <Carousel {...settings}>
              {auctions.map((item, index) => (
                <Wrap key={index}>
                  <Cards
                    data={item}
                    toggleSignIn={toggleSignIn}
                    type={item.property.type}
                    windowSize={windowSize}
                  />
                </Wrap>
              ))}
            </Carousel>
          )}
        </Row>
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default RealEstatePage;
