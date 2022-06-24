import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../Toast";
import NumberFormat from "react-number-format";
import RegistrationTimer from "../Auctions/RegistrationTimer";
import Timer from "../Auctions/Timer";
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
const UpcomingCarCard = ({
  urls,
  data,
  id,
  endRegister,
  auctionStartDate,
  startingBid,
  toggleSignIn,
  windowSize,
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

  const [registEnded, setRegistEnded] = useState(false);
  const toogleRegistEnded = () => setRegistEnded(!registEnded);

  const history = useHistory();

  const handleBid = () => {
    if (!user._id) {
      return toggleSignIn();
    }
    if (user.KYC) {
      history.push(`/DisplayAuctions/${id}`);
    } else {
      setShowKYC(true);
    }
  };

  const handleDisplay = () => {
    if (
      history.location.pathname === "/Dashboard" ||
      history.location.pathname === "/Dashboard/Auctions/SavedAuctions"
    ) {
      window.open(`/DisplayAuctions/${id}`);
    } else {
      history.push(`/DisplayAuctions/${id}`);
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
      return toggleSignIn();
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
    <>
      <div>
        <Card
          className="cards text-left m-auto"
          style={{ width: windowSize > 500 ? "450px" : "320px" }}
        >
          {showKYC && (
            <Toast type="warning" message="Please complete your KYC" />
          )}
          <Carousel {...settings}>
            {urls.map((items) => (
              <Card.Img
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
          <button onClick={handleLike} className="favBtn">
            {favorite ? (
              <img src="/images/hearted.png" alt="" />
            ) : (
              <img src="/images/heart.png" alt="" />
            )}
          </button>
          <Card.Body>
            <Row style={{ padding: "0", margin: "0", width: "100%" }}>
              <Col>
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.year} {data.make} {data.model}
                </h4>
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
              <Col>
                {registEnded ? <p>Auction Start:</p> : <p>Registration</p>}
              </Col>
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
              <Col>
                {registEnded ? (
                  <div
                    style={{
                      fontSize: "13px",
                    }}
                  >
                    <Timer auctionStartDate={auctionStartDate} />
                  </div>
                ) : !registEnded ? (
                  <div style={{ fontSize: "13px" }}>
                    <RegistrationTimer
                      time={endRegister}
                      toogleRegistEnded={toogleRegistEnded}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    Registration Ended
                  </div>
                )}
              </Col>
              <Col>
                <p
                  style={{
                    fontSize: "12px",
                    color: "black",
                    width: "100%",
                  }}
                >
                  {data.car_type ? data.car_type : "N/A"}|{" "}
                  {data.engine ? data.engine : "N/A"}|{" "}
                  {data.fuel_type ? data.fuel_type : "N/A"}
                </p>
              </Col>
            </Row>
            {/* <div>
              <div>
                <span className="golden-text">{data.property_address}</span>
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.year} {data.make} {data.model}
                </h4>
              </div>
              <div
                style={{
                  display: "inline-flex",
                }}
              >
                <div>
                  <Row>
                    {registEnded ? (
                      <Col md={5} style={{ width: "50%", color: "black" }}>
                        <p style={{ fontSize: "15px", width: "100%" }}>
                          Auction Start:
                        </p>
                      </Col>
                    ) : (
                      <Col md={5} style={{ width: "50%", color: "black" }}>
                        <p style={{ fontSize: "15px", width: "100%" }}>
                          Registration
                        </p>
                      </Col>
                    )}

                    <Col md={6} style={{ width: "50%" }}>
                      <p
                        style={{
                          fontSize: "15px",
                          width: "100%",
                        }}
                      >
                        Additional Info
                      </p>
                    </Col>
                  </Row>
                  <Row>
                    {registEnded ? (
                      <Col md={1} style={{ width: "50%" }}>
                        <div
                          style={{
                            fontSize: "12px",
                            width: "100%",
                          }}
                        >
                          <Timer auctionStartDate={auctionStartDate} />
                        </div>
                      </Col>
                    ) : !registEnded ? (
                      <Col md={1} style={{ width: "50%" }}>
                        <div style={{ fontSize: "12px", width: "100%" }}>
                          <RegistrationTimer
                            time={endRegister}
                            toggleRegistEnded={toggleRegistEnded}
                          />
                        </div>
                      </Col>
                    ) : (
                      <Col md={1} style={{ width: "50%" }}>
                        <div
                          style={{
                            fontSize: "18px",
                            width: "200px",
                            fontWeight: "bold",
                          }}
                        >
                          Registration Ended
                        </div>
                      </Col>
                    )}

                    <Col md={6} style={{ width: "50%", color: "black" }}>
                      <p
                        style={{
                          fontSize: "12px",
                          color: "black",
                          width: "100%",
                        }}
                      >
                        {data.car_type ? data.car_type : "N/A"}|{" "}
                        {data.engine ? data.engine : "N/A"}|{" "}
                        {data.fuel_type ? data.fuel_type : "N/A"}
                      </p>
                    </Col>
                  </Row>
                </div>
              </div>
            </div> */}

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
              {registEnded ? (
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
                    disabled
                  >
                    Registeration Ended
                  </Button>
                </div>
              ) : (
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
                    Register to Bid
                  </Button>
                </div>
              )}
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
export { UpcomingCarCard };
