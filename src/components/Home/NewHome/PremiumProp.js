import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Button } from "react-bootstrap";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import NumberFormat from "react-number-format";

const Carousel = styled(Slider)`
  height: 100vh;
  overflow: hidden;

  //   & > button {
  //     opacity: 1;
  //     height: 100%;
  //     width: 5vw;
  //     z-index: 1;
  //     &:hover {
  //       opacity: 1;
  //       transition: opacity 0.2s ease 0s;
  //     }
  //   }

  //   .slick-prev {
  //     background: url("./images/arrow_back.png") center center no-repeat !important;
  //     font-size: 50px;
  //     margin-left: 50px;
  //   }

  //   .slick-prev:before {
  //     display: none;
  //   }

  //   .slick-next {
  //     background: url("./images/arrow_next.png") center center no-repeat !important;
  //     font-size: 50px;
  //     margin-right: 50px;
  //   }

  //   .slick-next:before {
  //     display: none;
  //   }
`;

const Wrap = styled.div`
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0;
  }

  img {
    width: 100%;
    height: 100vh;
    object-fit: fill;
  }
`;

const HomeBottom = styled.div`
  position: absolute;
  bottom: 0;
  height: 27vh;
  width: 100%;
  background: linear-gradient(
    180deg,
    rgba(8, 8, 10, 0) 0%,
    rgba(8, 8, 10, 0.74) 41.31%,
    #08080a 80%
  );
  opacity: 0.7;
  z-index: 1;
  padding: 0 2rem;
  a {
    color: white !important;
    font-size: 24px;
    font-weight: bolder;
    box-shadow: none !important;
  }
  span {
    color: white;
    font-size: 14px;
    font-weight: bolder;
  }
`;
const Bar = styled.button`
  width: 100px;
  height: 1px;
  border: none;
  margin: 15px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  background-color: transparent;
  border-radius: 15px;
  box-shadow: ${(props) => props.size} ${(props) => props.color};
  &:hover {
    transition: background-color 0.2s ease 0s;
    border: none;
    outline: none;
  }
  &:focus {
    outline: none;
    background-color: transparent;
    border: none;
  }
`;
const BarGroup = styled.div`
  display: flex;
  position: absolute;
  bottom: 90px;
  right: 5vw;
  justify-content: right;
  align-items: center;
  align-content: center;
  width: 100%;
  z-index: 10;
`;

function PremiumProp({
  featureAuctions,
  onGoingAuctions,
  upcomingAuctions,
  windowSize,
}) {
  const slider = useRef();
  const [Index, setIndex] = useState(0);

  const handleClick = (index) => () => {
    setIndex(index);
    slider.current.slickGoTo(index);
  };
  useEffect(() => {
    if (!slider) {
      slider.current.slickGoTo(Index);
    }
  }, [Index]);
  let settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    beforeChange: (current, next) => {
      setIndex(next);
    },
  };

  return (
    <>
      {featureAuctions.length > 0 ? (
        <>
          <BarGroup
            className="Bar-group"
            style={{
              bottom: windowSize < 1270 && "5px",
              right: windowSize < 1270 && "0",
            }}
          >
            {featureAuctions.length > 0 &&
              featureAuctions.slice(0, 5).map((images, index) => (
                <Bar
                  key={index}
                  color={index === Index ? "white" : "transparent"}
                  size={index === Index ? "0 0 0 0.2rem" : "0 0 0 0"}
                  onClick={handleClick(index)}
                >
                  <Button
                    style={{
                      borderRadius: "0",
                      border: "none",
                      color: "white",
                      width: "100%",
                      height: "5px",
                      opacity: "0.4",
                      backgroundColor: "white",
                      padding: "0",
                    }}
                  ></Button>
                </Bar>
              ))}
          </BarGroup>
          <Carousel ref={slider} {...settings}>
            {featureAuctions.slice(0, 5).map((auction, index) => (
              <Wrap key={index} setIndex={setIndex}>
                <a href={`/DisplayAuctions/${auction._id}`}>
                  <img
                    src={auction.property.images[0].url}
                    alt="auction"
                    style={{ objectFit: windowSize < 768 && "cover" }}
                  />
                </a>
                <HomeBottom>
                  <h2
                    style={{
                      fontSize: windowSize < 600 ? "30px" : "50px",
                      color: "white",
                      fontFamily: "Tzimmes",
                      fontStyle: "normal",
                      fontWeight: "400",
                    }}
                  >
                    The Best Luxury
                    <br />
                    Marketplace
                  </h2>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: windowSize < 600 ? "18px" : "24px",
                      fontFamily: "Interstate, sans-serif",
                      fontStyle: "normal",
                      fontWeight: "400",
                      textTransform: "uppercase",
                    }}
                  >
                    {auction.property.type === "real-estate"
                      ? "Real Estate"
                      : auction.property.type === "car"
                      ? "Car"
                      : auction.property.type === "jet"
                      ? "Jet"
                      : auction.property.type === "yacht"
                      ? "Yacht"
                      : ""}{" "}
                    In {auction.property.details.property_address.city},{" "}
                    {auction.property.details.property_address.state},{" "}
                    {auction.property.details.property_address.country}
                  </span>
                </HomeBottom>
              </Wrap>
            ))}
          </Carousel>
        </>
      ) : onGoingAuctions.length > 0 ? (
        <>
          <BarGroup
            className="Bar-group"
            style={{
              bottom: windowSize < 1270 && "5px",
              right: windowSize < 1270 && "0",
            }}
          >
            {onGoingAuctions.length > 0 &&
              onGoingAuctions.slice(0, 5).map((images, index) => (
                <Bar
                  key={index}
                  color={index === Index ? "white" : "transparent"}
                  size={index === Index ? "0 0 0 0.2rem" : "0 0 0 0"}
                  onClick={handleClick(index)}
                >
                  <Button
                    style={{
                      borderRadius: "0",
                      border: "none",
                      color: "white",
                      width: "100%",
                      height: "5px",
                      opacity: "0.4",
                      backgroundColor: "white",
                      padding: "0",
                    }}
                  ></Button>
                  {/* <hr
                    style={{
                      borderRadius: "15px",
                      color: "white",
                      width: "100%",
                      height: "10px",
                      opacity: "1",
                    }}
                  /> */}
                </Bar>
              ))}
          </BarGroup>
          <Carousel ref={slider} {...settings}>
            {onGoingAuctions.slice(0, 5).map((auction, index) => (
              <Wrap key={index} setIndex={setIndex}>
                <a href={`/DisplayAuctions/${auction._id}`}>
                  <img
                    src={auction.property.images[0].url}
                    alt="auction"
                    style={{ objectFit: windowSize < 768 && "cover" }}
                  />
                  {/* <div
                    style={{
                      width: "100vw",
                      height: "100vh",
                      background: `url(${auction.property.images[0].url})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      backgroundRepeat: "no-repeat",
                    }}
                  ></div> */}
                </a>
                <HomeBottom>
                  <h2
                    style={{
                      fontSize: windowSize < 600 ? "30px" : "50px",
                      color: "white",
                      fontFamily: "Tzimmes",
                      fontStyle: "normal",
                      fontWeight: "400",
                    }}
                  >
                    The Best Luxury
                    <br />
                    Marketplace
                  </h2>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: windowSize < 600 ? "18px" : "24px",
                      fontFamily: "Interstate , sans-serif",
                      fontStyle: "normal",
                      fontWeight: "400",
                      textTransform: "uppercase",
                    }}
                  >
                    {auction.property.type === "real-estate"
                      ? "Real Estate"
                      : auction.property.type === "car"
                      ? "Car"
                      : auction.property.type === "jet"
                      ? "Jet"
                      : auction.property.type === "yacht"
                      ? "Yacht"
                      : ""}{" "}
                    In {auction.property.details.property_address.city},{" "}
                    {auction.property.details.property_address.state},{" "}
                    {auction.property.details.property_address.country}
                  </span>
                </HomeBottom>
              </Wrap>
            ))}
          </Carousel>
        </>
      ) : upcomingAuctions.length > 0 ? (
        <>
          <BarGroup
            className="Bar-group"
            style={{
              bottom: windowSize < 1270 && "5px",
              right: windowSize < 1270 && "0",
            }}
          >
            {upcomingAuctions.length > 0 &&
              upcomingAuctions.slice(0, 5).map((images, index) => (
                <Bar
                  key={index}
                  color={index === Index ? "white" : "transparent"}
                  size={index === Index ? "0 0 0 0.2rem" : "0 0 0 0"}
                  onClick={handleClick(index)}
                >
                  <Button
                    style={{
                      borderRadius: "0",
                      border: "none",
                      color: "white",
                      width: "100%",
                      height: "5px",
                      opacity: "0.4",
                      backgroundColor: "white",
                      padding: "0",
                    }}
                  ></Button>
                </Bar>
              ))}
          </BarGroup>
          <Carousel ref={slider} {...settings}>
            {upcomingAuctions.slice(0, 5).map((auction, index) => (
              <Wrap key={index} setIndex={setIndex}>
                <a href={`/DisplayAuctions/${auction._id}`}>
                  <img
                    src={auction.property.images[0].url}
                    alt="auction"
                    style={{ objectFit: windowSize < 768 && "cover" }}
                  />
                </a>
                <HomeBottom>
                  <h2
                    style={{
                      fontSize: windowSize < 600 ? "30px" : "60px",
                      color: "white",
                      fontFamily: "Tzimmes",
                      fontStyle: "normal",
                      fontWeight: "400",
                    }}
                  >
                    The Best Luxury
                    <br />
                    Marketplace
                  </h2>
                  <span
                    style={{
                      color: "rgba(255, 255, 255, 0.6)",
                      fontSize: windowSize < 600 ? "18px" : "24px",
                      fontFamily: "Interstate , sans-serif",
                      fontStyle: "normal",
                      fontWeight: "400",
                      textTransform: "uppercase",
                    }}
                  >
                    {auction.property.type === "real-estate"
                      ? "Real Estate"
                      : auction.property.type === "car"
                      ? "Car"
                      : auction.property.type === "jet"
                      ? "Jet"
                      : auction.property.type === "yacht"
                      ? "Yacht"
                      : ""}{" "}
                    In {auction.property.details.property_address.city},{" "}
                    {auction.property.details.property_address.state},{" "}
                    {auction.property.details.property_address.country}
                  </span>
                </HomeBottom>
              </Wrap>
            ))}
          </Carousel>
        </>
      ) : null}
    </>
  );
}

export default PremiumProp;
