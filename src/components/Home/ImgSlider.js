import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "./SearchBar.js";
import NumberFormat from "react-number-format";
import { ImSearch } from "react-icons/im";
import "../../styles/Search.css";
import { Link } from "react-router-dom";
import authService from "../../services/authServices.js";

const Carousel = styled(Slider)`
  height: 99vh;
  overflow: hidden;

  & > button {
    opacity: 0;
    height: 100%;
    width: 5vw;
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
    width: 12vw;
    height: 100%;
  }

  .slick-prev:before {
    color: #e9af84;
    font-size: 50px;
  }

  .slick-next {
    width: 12vw;
    height: 100%;
  }

  .slick-next:before {
    color: #e9af84;
    font-size: 50px;
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
  bottom: 20vh;
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

const ImgSlider = () => {
  let settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };
  const [featureAuctions, setFeatureAuctions] = useState([]);
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  useEffect(() => {
    authService.getFeaturedAuctions().then((res) => {
      setFeatureAuctions(res.data);
    });
    authService.getUpcomingAuctions().then((res) => {
      setUpcomingAuctions(res.data);
    });
    authService.getOngoingAuctions().then((res) => {
      setOnGoingAuctions(res.data);
    });
  }, []);

  return (
    <>
      {featureAuctions.length > 0 ? (
        <Carousel {...settings}>
          {featureAuctions.map((auction) => (
            <Wrap key={auction._id}>
              <a href={`/DisplayAuctions/${auction._id}`}>
                <img src={auction.property.images[0].url} alt="auction" />
              </a>
              <HomeBottom>
                <h2>
                  <NumberFormat
                    style={{ fontSize: "50px", color: "white" }}
                    value={
                      auction.startingBid
                        ? auction.startingBid
                        : auction.property.details.market_assessments.length > 0
                        ? auction.property.details.market_assessments[0]
                            .total_value
                        : 0
                    }
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
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
          <div className="col-12 filterContainer px-lg-5 d-none d-lg-block">
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
          </div>
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
          <div className="col-12 filterContainer px-lg-5 d-none d-lg-block">
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
          </div>
        </>
      ) : null}
    </>
  );
};

export default ImgSlider;
