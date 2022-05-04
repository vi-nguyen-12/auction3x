import React, { useState, useEffect } from "react";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Row, Col, Modal } from "react-bootstrap";
import { UpcomingRealEstateCard } from "../Cards/UpcomingRealEtateCard";
import "../../styles/realEstate.css";
import { CardComp } from "../Cards/RealEstateCard";
import authService from "../../services/authServices";
import CloseButton from "react-bootstrap/CloseButton";
import { GoogleMap, Marker } from "@react-google-maps/api";

const mapStyles = {
  height: "90%",
  width: "100%",
};
const Carousel = styled(Slider)`
  //height: 30vh;
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

function RealEstatePage({ toogleChange }) {
  const [onGoingAuctions, setOnGoingAuctions] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [location, setLocation] = useState([]);
  const toggleMap = () => setShowMap(!showMap);
  const Arr = [...onGoingAuctions, ...upcomingAuctions];
  useEffect(() => {
    toogleChange();
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
      <Row className="realEstateFilter">
        <Col md={9} >
          <Row>
            {/* <div className="searchBar"> */}
            <Col md={3} >
              <div className=" RealButton ">
                <input type="text" placeholder="Enter your Location" className="searchBar" />
              </div>
            </Col>

            {/* </div> */}

            <Col >
              <select className=" RealButton ">
                <option>Auction Type</option>
                <option href="#">Ongoing</option>
                <option href="#">Upcoming</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Property Type</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Price</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Bldg Siize</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>More Filter</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
            <Col >
              <select className=" RealButton ">
                <option>Sort</option>
                <option href="#">Profile</option>
                <option href="#">My Ads</option>
              </select>
            </Col>
          </Row>
        </Col>
        <Col md={3} className="filterResult">
          <Row>
            <Col md={7} style={{ display: "flex", justifyContent: "right", alignItems: "center" }}>
              About 151051 results
            </Col>
            <Col md={2}>
              <button className="mapButton" onClick={toggleMap} >Map</button>
            </Col>
            <Col md={2}>
              <button className="galleryButton">Gallery</button>
            </Col>
          </Row>
        </Col>
      </Row>
      <div className="mt-5">
        <Col md={12} className="m-auto pt-2">
          <Row>
            <h1 style={{ marginBottom: "80px" }}>ONGOING AUCTIONS</h1>
            {onGoingAuctions.length > 0 ? (
              <Carousel {...settings}>
                {onGoingAuctions.map((item, index) => (
                  <Wrap key={index}>
                    <Col md={12} style={{ marginBottom: "30px" }}>
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
            ) : (
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                No Ongoing Auctions
              </h3>
            )}
          </Row>
          <Row style={{ marginBottom: "100px" }}>
            <h1 style={{ margin: "80px 0" }}>UPCOMING AUCTIONS</h1>
            {upcomingAuctions.length > 0 ? (
              upcomingAuctions.map((item, index) => (
                <Col key={index} md={4} style={{ marginBottom: "30px" }}>
                  <UpcomingRealEstateCard
                    url={item.property.images[0].url}
                    data={item.property.details}
                    id={item._id}
                    startRegister={item.registerStartDate}
                    auctionEndDate={item.auctionEndDate}
                    auctionStartDate={item.auctionStartDate}
                    endRegister={item.registerEndDate}
                    startingBid={item.startingBid}
                  />
                </Col>
              ))
            ) : (
              <h3 style={{ display: "flex", justifyContent: "center" }}>
                No Ongoing Auctions
              </h3>
            )}
          </Row>
        </Col>
      </div>
      {/* Map Button */}
      <Modal
        backdrop="static"
        keyboard={false}
        size="xl"
        show={showMap}
        onHide={toggleMap}
        centered
      >
        <Modal.Body style={{ height: "700px" }}>
          <div>
            <CloseButton
              className="modal-close"
              onClick={toggleMap}
            />
          </div>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={18}
            center={location}
          >
            <Marker position={location} />
          </GoogleMap>
          <p>
            {/* {
              property.property.details.property_address
                .formatted_street_address
            } */}
          </p>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RealEstatePage;
