import React from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../Toast";
import NumberFormat from "react-number-format";
import AuctionTimer from "../Auctions/AuctionTimer";
import authService from "../../services/authServices";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "../../styles/card.css";

const Carousel = styled(Slider)`
  height: 100%;
  overflow: hidden;
  border-radius: 0;

  & > button {
    opacity: 1;
    height: 100%;
    z-index: 1;
    width: 5vw;
    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }
  .slick-prev {
    height: 100px;
    background: url("./images/arrow_back.png") center center no-repeat !important;
    font-size: 50px;
  }
  .slick-next {
    height: 100px;
    background: url("./images/arrow_next.png") center center no-repeat !important;
    font-size: 50px;
  }
  .slick-next:before {
    display: none;
  }
  .slick-prev:before {
    display: none;
  }
`;
const JetCard = ({
  urls,
  data,
  id,
  startingBid,
  auctionEndDate,
  reserveMet,
  toogleSignIn,
}) => {
  const user = useSelector((state) => state.user);
  const savedProperty = useSelector((state) => state.savedProperty);
  const [showKYC, setShowKYC] = useState(false);
  const [favorite, setFavorite] = useState(false);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const [auctionEnded, setAuctionEnded] = useState(false);
  const toogleAuction = () => setAuctionEnded(!auctionEnded);

  const history = useHistory();

  const handleBid = () => {
    if (!user._id) {
      return toogleSignIn();
    }
    if (user.KYC) {
      history.push(`/DisplayAuctions/${id}`);
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
        window.open(`/DisplayAuctions/${id}`);
      } else {
        history.push(`/DisplayAuctions/${id}`);
      }
    }
  };
  const handleLike = () => {
    if (user._id) {
      const data = {
        userId: user._id,
        auctionId: id,
      };
      if (favorite === false) {
        authService.saveProperty(data);
        setFavorite(!favorite);
      } else if (favorite === true) {
        authService.removeProperty(data);
        setFavorite(!favorite);
      }
    } else {
      return toogleSignIn();
    }
  };
  useEffect(() => {
    if (user._id) {
      if (savedProperty.length > 0) {
        const saved = savedProperty.find((property) => property._id === id);
        if (saved) {
          setFavorite(true);
        } else {
          setFavorite(false);
        }
      }
    }
  }, [savedProperty]);

  return (
    <div>
      {auctionEndDate && (
        <Card className="cards text-left m-auto">
          {showKYC && (
            <Toast type="warning" message="Please complete your KYC" />
          )}
          <Carousel {...settings}>
            {urls.map((items, index) => (
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
          {user._id && reserveMet === true && (
            <div className="badge-label" aria-label="Reserved Met !" />
          )}
          <button onClick={handleLike} className="favBtn">
            {favorite ? (
              <img src="/images/hearted.png" alt="" />
            ) : (
              <img src="/images/heart.png" alt="" />
            )}
          </button>
          <Card.Body style={{ paddingLeft: "13px" }}>
            <div>
              <div>
                <span className="golden-text">
                  {data.address.formatted_street_address}, {data.address.state}
                </span>
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.aircraft_builder_name} {data.aircraft_model_designation}
                </h4>
              </div>
              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <div>
                  <Row>
                    <Col md={5} style={{ width: "50%", color: "black" }}>
                      <p style={{ fontSize: "15px", width: "100px" }}>
                        Online Auction
                      </p>
                    </Col>

                    <Col md={6} style={{ width: "50%", color: "black" }}>
                      <p
                        style={{
                          fontSize: "15px",
                          width: "250px",
                        }}
                      >
                        Additional Info
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    {auctionEnded ? (
                      <Col md={1} style={{ width: "50%" }}>
                        <p
                          style={{
                            fontSize: "15px",
                            width: "200px",
                            fontWeight: "bold",
                          }}
                        >
                          Auction Ended
                        </p>
                      </Col>
                    ) : (
                      <Col md={1} style={{ width: "50%" }}>
                        <div style={{ fontSize: "12px", width: "200px" }}>
                          <AuctionTimer
                            id={id}
                            time={auctionEndDate}
                            toogleAuction={toogleAuction}
                          />
                        </div>
                      </Col>
                    )}

                    <Col md={6} style={{ width: "50%" }}>
                      <p
                        style={{
                          fontSize: "12px",

                          width: "250px",
                        }}
                      >
                        {data.number_of_engines
                          ? data.number_of_engines + " Engines"
                          : "N/A"}
                        |{" "}
                        {data.number_of_aircraft
                          ? data.number_of_aircraft + " Aircraft"
                          : "N/A"}
                        |{" "}
                        {data.registration_mark
                          ? data.registration_mark
                          : "N/A"}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div>

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
                    value={startingBid}
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
      )}
    </div>
  );
};

export { JetCard };
