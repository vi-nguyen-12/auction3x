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
  // height: 30vh;
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
    background: url("./images/arrow_back.png") center center no-repeat !important;
    font-size: 50px;
  }

  .slick-prev:before {
    display: none;
  }

  .slick-next {
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

function CarPage({
  toggleChange,
  setImgCar,
  toggleImgCar,
  toggleSignIn,
  windowSize,
}) {
  useEffect(() => {
    toggleChange();
  }, []);
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  useEffect(() => {
    authService
      .getOngoingAuctionsByType("car")
      .then((res) => {
        setOnGoingAuctions(res.data);
      })
      .catch((err) => {
        alert(err);
      });
    authService
      .getUpcomingAuctionsByType("car")
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
      setImgCar(imageUrl);
    }
  }, [onGoingAuctions, upcomingAuctions]);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow:
      windowSize > 800
        ? onGoingAuctions.length > 3
          ? 3
          : onGoingAuctions.length
        : 1,
  };
  return (
    <>
      {onGoingAuctions.length > 0 || upcomingAuctions.length > 0 ? (
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
                      <Col style={{ marginBottom: "30px" }}>
                        <Cards
                          data={item}
                          toggleSignIn={toggleSignIn}
                          type={item.property.type}
                          windowSize={windowSize}
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
                  <Col key={index} style={{ marginBottom: "30px" }}>
                    <Cards
                      data={item}
                      toggleSignIn={toggleSignIn}
                      type={item.property.type}
                      windowSize={windowSize}
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
      ) : (
        <ErrorPage />
      )}
    </>
  );
}

export default CarPage;
