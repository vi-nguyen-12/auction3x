import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../Toast";
import NumberFormat from "react-number-format";
import AuctionTimer from "../Auctions/AuctionTimer";
import RegistrationTimer from "../Auctions/RegistrationTimer";
import authService from "../../services/authServices";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../../styles/card.css";

const Carousel = styled(Slider)`
  height: 100%;
  overflow-x: hidden;
  border-radius: 0;

  & > button {
    opacity: 0;
    height: 100%;
    z-index: 1;
    width: 5vw;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  .slick-prev {
    height: 100px !important;
    background: url("./images/arrow_back.png") center center no-repeat !important;
    font-size: 50px;
    margin: -5px !important;
  }
  .slick-next {
    height: 100px !important;
    background: url("./images/arrow_next.png") center center no-repeat !important;
    font-size: 50px;
    margin: -5px !important;
  }
  .slick-next:before {
    display: none;
  }
  .slick-prev:before {
    display: none;
  }
  @media (max-width:700px) {
    // .slick-prev {
    //   display: block !important;
    //     width: 50px !important; 
    // }
    // .slick-next {
    //   display: block !important;
    //     width: 50px !important; 
    // }
    .slick-prev {
      display: block;
    }
    .slick-next {
      display: block;
    }
`;

function Cards({ data, reserveMet, type, toggleSignIn, windowSize }) {
  const [auctionEnded, setAuctionEnded] = useState(false);
  const [registrationEnded, setRegistrationEnded] = useState(false);
  const toggleRegistEnded = () => setRegistrationEnded(!registrationEnded);
  const toogleAuction = () => setAuctionEnded(!auctionEnded);
  const user = useSelector((state) => state.user);
  const savedProperty = useSelector((state) => state.savedProperty);
  const [favorite, setFavorite] = useState(false);
  const [showKYC, setShowKYC] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const history = useHistory();

  const handleBid = () => {
    if (!user._id) {
      return toggleSignIn();
    }
    if (user.KYC) {
      history.push(`/DisplayAuctions/${data._id}`);
    } else {
      setShowKYC(true);
    }
  };

  const handleDisplay = () => {
    if (auctionEnded) {
      alert("Auction has ended");
    } else if (!auctionEnded) {
      if (
        history.location.pathname === "/Dashboard" ||
        history.location.pathname === "/Dashboard/Auctions/SavedAuctions"
      ) {
        window.open(`/DisplayAuctions/${data._id}`);
      } else {
        history.push(`/DisplayAuctions/${data._id}`);
      }
    }
  };
  const handleLike = () => {
    if (user._id) {
      const data_1 = {
        userId: user._id,
        auctionId: data._id,
      };

      if (favorite === false) {
        authService.saveProperty(data_1);
        setFavorite(!favorite);
      } else if (favorite === true) {
        authService.removeProperty(data_1);
        setFavorite(!favorite);
      }
    } else {
      return toggleSignIn();
    }
  };
  useEffect(() => {
    if (user._id) {
      if (savedProperty.length > 0) {
        const saved = savedProperty.find((item) => item._id === data._id);
        if (saved) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    }
  }, [savedProperty]);

  return (
    <>
      <Card
        style={{ width: windowSize > 500 ? "450px" : "320px" }}
        className="cards text-left m-auto"
      >
        {showKYC && <Toast type="warning" message="Please complete your KYC" />}
        <Carousel {...settings}>
          {data.property.images.map((items, index) => (
            <Card.Img
              key={index}
              onClick={handleDisplay}
              variant="top"
              src={items.url}
              className="img-card img-fluid"
              style={{
                width: "100%",
                height: "300px",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            />
          ))}
        </Carousel>
        {reserveMet === true && user._id && (
          <div className="badge-label" aria-label="Reserved Met !" />
        )}
        <button onClick={handleLike} className="favBtn">
          {favorite ? (
            <img src="/images/hearted.png" alt="" />
          ) : (
            <img src="/images/heart.png" alt="" />
          )}
        </button>
        <Card.Body>
          <Row style={{ padding: "0", margin: "0", width: "100%" }}>
            <Col style={{ padding: "0" }}>
              {type === "yacht" ? (
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.property.details.manufacturer_name}{" "}
                  {data.property.details.engine_type}
                </h4>
              ) : type === "car" ? (
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.property.details.year} {data.property.details.make}{" "}
                  {data.property.details.model}
                </h4>
              ) : type === "jet" ? (
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.property.details.aircraft_builder_name}{" "}
                  {data.property.details.aircraft_model_designation}
                </h4>
              ) : (
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {
                    data.property.details.property_address
                      .formatted_street_address
                  }
                  , {data.property.details.property_address.state}
                </h4>
              )}
            </Col>
          </Row>
          <Row
            style={{
              padding: "0",
              margin: "0",
              width: "100%",
              fontSize: windowSize > 500 ? "20px" : "15px",
            }}
          >
            {new Date().toISOString() < data.auctionStartDate &&
              new Date().toISOString() < data.registerEndDate ? (
              <Col style={{ padding: "0" }}>
                <p>Registration</p>
              </Col>
            ) : (
              <Col style={{ padding: "0" }}>
                <p>Online Auction</p>
              </Col>
            )}
            <Col>
              <p>Additional Info</p>
            </Col>
          </Row>
          <Row
            style={{
              padding: "0",
              margin: "0",
              width: "100%",
              fontSize: windowSize > 500 ? "14px" : "12px",
            }}
          >
            {new Date().toISOString() > data.auctionEndDate ? (
              <Col>
                <p
                  style={{
                    fontSize: "15px",
                    fontWeight: "bold",
                  }}
                >
                  Auction Ended
                </p>
              </Col>
            ) : new Date().toISOString() < data.auctionStartDate &&
              new Date().toISOString() < data.registerEndDate ? (
              <Col style={{ padding: "0" }}>
                <div style={{ fontSize: "12px" }}>
                  <AuctionTimer
                    time={data.registerEndDate}
                    id={data._id}
                    windowSize={windowSize}
                  />
                </div>
              </Col>
            ) : new Date().toISOString() < data.auctionStartDate &&
              new Date().toISOString() > data.registerEndDate ? (
              <Col>
                <p
                  style={{
                    fontSize: "15px",
                    width: "200px",
                    fontWeight: "bold",
                  }}
                >
                  Registration Ended
                </p>
              </Col>
            ) : new Date().toISOString() > data.auctionStartDate &&
              new Date().toISOString() < data.auctionEndDate ? (
              <Col style={{ padding: "0" }}>
                <div style={{ fontSize: "12px" }}>
                  <AuctionTimer
                    time={data.auctionEndDate}
                    id={data._id}
                    windowSize={windowSize}
                  />
                </div>
              </Col>
            ) : (
              <Col style={{ padding: "0" }}>
                <div style={{ fontSize: "12px" }}>
                  <AuctionTimer
                    time={data.auctionEndDate}
                    id={data._id}
                    windowSize={windowSize}
                  />
                </div>
              </Col>
            )}
            {/* {auctionEnded ? (
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Auction Ended
                </p>
              ) : new Date().toISOString() < data.auctionEndDate &&
                new Date().toISOString() >= data.auctionStartDate ? (
                <div style={{ fontSize: "13px" }}>
                  <AuctionTimer
                    id={data._id}
                    time={data.auctionEndDate}
                    toogleAuction={toogleAuction}
                    windowSize={windowSize}
                  />
                </div>
              ) : !registrationEnded ? (
                <div style={{ fontSize: "13px" }}>
                  <RegistrationTimer
                    id={data._id}
                    time={data.registerEndDate}
                    windowSize={windowSize}
                    toggleRegistEnded={toggleRegistEnded}
                  />
                </div>
              ) : (
                <p
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  Registration Ended
                </p>
              )} */}
            {/* </Col> */}
            <Col style={{ paddingRight: "0" }}>
              {type === "yacht" ? (
                <p>
                  {data.property.details.engine_type
                    ? data.property.details.engine_type
                    : "N/A"}
                  |{" "}
                  {data.property.details.engine_deck_type
                    ? data.property.details.engine_deck_type
                    : "N/A"}
                  |{" "}
                  {data.property.details.running_cost
                    ? data.property.details.running_cost
                    : "N/A"}
                </p>
              ) : type === "car" ? (
                <p>
                  {data.property.details.car_type
                    ? data.property.details.car_type
                    : "N/A"}
                  |{" "}
                  {data.property.details.engine
                    ? data.property.details.engine
                    : "N/A"}
                  |{" "}
                  {data.property.details.fuel_type
                    ? data.property.details.fuel_type
                    : "N/A"}
                </p>
              ) : type === "jet" ? (
                <p>
                  {data.property.details.number_of_engines
                    ? data.property.details.number_of_engines + " Engines "
                    : "N/A"}
                  |{" "}
                  {data.property.details.number_of_aircraft
                    ? data.property.details.number_of_aircraft + " Aircraft "
                    : "N/A"}
                  |{" "}
                  {data.property.details.registration_mark
                    ? data.property.details.registration_mark
                    : "N/A"}
                </p>
              ) : (
                <p>
                  {data.property.details.structure.beds_count
                    ? data.property.details.structure.beds_count
                    : "N/A-"}
                  BD |{" "}
                  {data.property.details.structure.baths
                    ? data.property.details.structure.baths
                    : "N/A-"}
                  BA |{" "}
                  {data.property.details.parcel.area_sq_ft
                    ? data.property.details.parcel.area_sq_ft
                    : "N/A-"}{" "}
                  sq.ft
                </p>
              )}
            </Col>
          </Row>

          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
            }}
          >
            <div>
              <p className="grey-small">Starting Bid</p>
              <p className="black-bold">
                <NumberFormat
                  value={data.startingBid}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"$"}
                />
              </p>
            </div>
            { }
            <div
              style={{
                alignItems: "flex-end",
                display: "flex",
                marginRight: "6px",
              }}
            >
              <Button
                onClick={handleBid}
                className="black-button text-white"
                variant="dark"
              >
                Place Bid
              </Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    </>
  );
}

export default Cards;
