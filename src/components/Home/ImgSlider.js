import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "./SearchBar.js";
import NumberFormat from "react-number-format";
import { ImSearch } from "react-icons/im";
import "../../styles/Search.css";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import authService from "../../services/authServices.js";

const Carousel = styled(Slider)`
  height: 100vh;
  overflow: hidden;

  & > button {
    opacity: 1;
    height: 100%;
    width: 5vw;
    z-index: 1;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
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
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0;

    img {
      width: 100%;
      height: 100vh;
    }
  }
`;

const HomeBottom = styled.div`
  position: absolute;
  bottom: 10vh;
  z-index: 1;
  left: 5vw;
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
  height: 150px;
  border: none;
  margin: 15px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1px;
  outline: none;
  background-color: transparent;
  border-radius: 15px;
  box-shadow:${props => props.size} ${props => props.color};
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
  bottom: 10px;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 100%;
  z-index: 10;
`;

const ImgSlider = ({ featureAuctions, onGoingAuctions, upcomingAuctions }) => {
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
          <BarGroup className="Bar-group">
            {featureAuctions.length > 0 &&
              featureAuctions.map((images, index) => (
                <Bar key={index}
                  color={index === Index ? "white" : "transparent"}
                  size={index === Index ? "0 0 0 0.2rem" : "0 0 0 0"}
                  onClick={handleClick(index)}>
                  <hr
                    style={{
                      borderRadius: "15px",
                      color: "white",
                      width: "100%",
                      height: "5px",
                      opacity: "1",
                    }}
                  />
                </Bar>
              ))}
          </BarGroup>
          {featureAuctions.length > 0 && (
            <Carousel ref={slider} {...settings}>
              {featureAuctions.map((auction, index) => (
                <Wrap key={index} setIndex={setIndex}>
                  <a href={`/DisplayAuctions/${auction._id}`}>
                    <img src={auction.property.images[0].url} alt="auction" />
                  </a>
                  <HomeBottom>
                    <h2 style={{ fontSize: "50px", color: "white" }}>
                      The Best
                      <br />
                      Luxury Market
                    </h2>
                    <span style={{ color: "white", fontSize: "20px" }}>
                      HOUSE IN {auction.property.details.property_address.city},
                      {auction.property.details.property_address.state} UNITED
                      STATES
                    </span>
                  </HomeBottom>
                </Wrap>
              ))}
            </Carousel>
          )}

          {/* <div className="col-12 filterContainer px-lg-5 d-none d-lg-block">
            <div className="row px-lg-5">
              <div className="form-group">
                <SearchBar getQuery={getQuery} />
              </div>
            </div>
          </div> */}
        </>
      ) : onGoingAuctions.length > 0 ? (
        <>
          <Carousel {...settings}>
            {onGoingAuctions.slice(0, 5).map((item, index) => (
              // <Link to={`/Display/${item._id}`} key={item._id}>
              <Wrap key={index}>
                <a href={`/DisplayAuctions/${item._id}`}>
                  <img src={item.property.images[0].url} alt="" />
                </a>
                <HomeBottom>
                  <h2>
                    <NumberFormat
                      style={{ fontSize: "50px", color: "white" }}
                      value={item.startingBid}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </h2>
                  <span style={{ color: "white", fontSize: "20px" }}>
                    HOUSE IN {item.property.details.property_address.city},
                    {item.property.details.property_address.state} UNITED STATES
                  </span>
                </HomeBottom>
              </Wrap>
              // </Link>
            ))}
          </Carousel>
          {/* <div className="col-12 filterContainer px-lg-5 d-none d-lg-block">
            <div className="row px-lg-5">
              <div className="search-box col-12 col-sm-6 col-md-4 mt-3">
                <div className="form-group">
                  <SearchBar />
                </div>
                <button type="submit">
                  <ImSearch />
                </button>
              </div>
            </div>
          </div> */}
        </>
      ) : upcomingAuctions.length > 0 ? (
        <>
          <Carousel {...settings}>
            {upcomingAuctions.slice(0, 5).map((item, index) => (
              // <Link to={`/Display/${item._id}`} key={item._id}>
              <Wrap key={index}>
                <a href={`/DisplayAuctions/${item._id}`}>
                  <img src={item.property.images[0].url} alt="" />
                </a>
                <HomeBottom>
                  <h2>
                    <NumberFormat
                      style={{ fontSize: "50px", color: "white" }}
                      value={item.startingBid}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </h2>
                  <span style={{ color: "white", fontSize: "20px" }}>
                    HOUSE IN {item.property.details.property_address.city},
                    {item.property.details.property_address.state} UNITED STATES
                  </span>
                </HomeBottom>
              </Wrap>
              // </Link>
            ))}
          </Carousel>
          {/* <div className="col-12 filterContainer px-lg-5 d-none d-lg-block">
            <div className="row px-lg-5">
              <div className="search-box col-12 col-sm-6 col-md-4 mt-3 p-0">
                <div className="form-group">
                  <SearchBar />
                </div>
                <button type="submit">
                  <ImSearch />
                </button>
              </div>
            </div>
          </div> */}
        </>
      ) : null}
    </>
  );
};

export default ImgSlider;
