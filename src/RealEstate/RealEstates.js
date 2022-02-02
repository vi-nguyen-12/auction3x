import React, { useEffect } from 'react';
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import SearchBar from "../components/SearchBar";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { UpcomingCard } from "../components/UpcomingCard";
import "../styles/realEstate.css";
import { CardComp } from "../components/Card";

const RealEstates = ({ colorChange }) => {
  useEffect(() => {
    colorChange("black");
  }, [])

  const property = useSelector((state) => state.property);
  const auction = useSelector((state) => state.auction);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: false,
    slidesToShow: auction.length > 3 ? 3 : auction.length,
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
      padding-left: 4%;
    }

    .slick-prev:before {
      color: #e9af84;
      font-size: 50px;
    }

    .slick-next {
      right: -75px;
      width: 12vw;
      height: 100%;
      padding-right: 4%;
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
    <>
      <h5 className="realHeader">
        <p style={{ fontSize: "4rem", color: "#fcbe91" }}>REAL ESTATE</p>
      </h5>

      <div className="realEstateFilter">
        <div className="searchBar">
          <SearchBar />
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Auction Type</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Property Type</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Price</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Bldg Siize</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>More Filter</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="dropdown">
          <select className=" RealButton ">
            <option>Sort</option>
            <option href="#">Profile</option>
            <option href="#">My Ads</option>
          </select>
        </div>
        <div className="filterResult">
          <div>About 9,620 results</div>
          <button className="mapButton">Map</button>
          <button className="galleryButton">Gallery</button>
        </div>
      </div>
      <div className="mt-5">
        <Col md={12} className="m-auto pt-2">
          <Row>
            <Carousel {...settings}>

              {auction.map((item) => (
                <Wrap>
                  <Col key={item._id} md={12} style={{ marginBottom: "30px" }}>
                    <CardComp
                      url={item.property.images[0].url}
                      data={item.property.details}
                      id={item._id}
                      auctionStartDate={item.auctionStartDate}
                      auctionEndDate={item.auctionEndDate}
                      startingBid={item.startingBid}
                      auctionId={item._id}
                    />
                  </Col>
                </Wrap>
              ))}

            </Carousel>
          </Row>
          <Row>
            {property.map((item) => (
              <Col key={item._id} md={4} style={{ marginBottom: "30px" }}>
                <UpcomingCard
                  url={item.property.images[0].url}
                  data={item.property.details}
                  id={item._id}
                  startRegister={item.registerStartDate}
                  endRegister={item.registerEndDate}
                  startingBid={item.startingBid}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </div>
    </>
  );
};

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
      top: -22vh;
      font-size: 10px;
      color: white;
    }
  }

  li.slick-active button:before {
    color: white;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
    width: 19vw;
    height: 100%;
  }

  .slick-next {
    right: -75px;
    width: 19vw;
    height: 100vh;
  }
`;

const Wrap = styled.div`
  //border-radius: 4px;
  cursor: pointer;
  position: relative;

  a {
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 69%) 0px 26px 30px -10px,
      rgb(0 0 0 / 73%) 0px 16px 10px -10px;
    cursor: pointer;
    display: block;
    position: relative;
    padding: 0;

    img {
      width: 100%;
      height: 100vh;
    }

    // &:hover {
    //   padding: 0;
    //   // border: 4px solid rgba(249, 249, 249, 0.8);
    //   transition-duration: 300ms;
    // }
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

const FilterMenu = styled.div`
  position: absolute;
  bottom: 10vh;
  z-index: 1;
  left: 5vw;
  width: 90vw;
`;

const FilterContainer = styled.div`
  display: flex;
  width: 100%;
`;

const Flex1 = styled.div`
  flex: 1;
  padding-right: 30px;
`;

const Flex2 = styled.div`
  flex: 5;
  padding-right: 30px;
`;

export default RealEstates;
