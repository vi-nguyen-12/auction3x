import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import Toast from "../Toast";
import NumberFormat from "react-number-format";
import RegistrationTimer from "../Auctions/RegistrationTimer";
import Timer from "../Auctions/Timer";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import authService from "../../services/authServices";
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
const UpcomingYachtCard = ({
  urls,
  data,
  id,
  auctionStartDate,
  startRegister,
  endRegister,
  startingBid,
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
  const [registEnded, setRegistEnded] = useState(false);
  const toogleRegistEnded = () => setRegistEnded(!registEnded);

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
    <>
      <div>
        <Card
          // onClick={async () => {const estateData = await authService.sendProperty(id); console.log(estateData)}}
          //move to next page
          className="cards text-left m-auto"
          style={{
            // width: "18rem",
            background: "white",
            padding: "5px",
            width: "450px",
            borderRadius: "10px",
            border: "1px solid lightgrey",
            boxShadow:
              "0 13px 27px -5px hsla(240, 30.1%, 28%, 0.25), 0 8px 16px -8px hsla(0, 0%, 0%, 0.3), 0 -6px 16px -6px hsla(0, 0%, 0%, 0.03)",
            transition: "all ease 200ms",
            color: "black",
          }}
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
            <Row>
              <Col>
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.manufacturer_name} {data.engine_type}
                </h4>
              </Col>
            </Row>
            <Row style={{ fontSize: "15px" }}>
              <Col>
                {registEnded ? <p>Auction Start:</p> : <p>Registration</p>}
              </Col>
              <Col>
                <p>Additional Info</p>
              </Col>
            </Row>
            <Row>
              <Col>
                {registEnded ? (
                  <div
                    style={{
                      fontSize: "12px",
                      width: "100%",
                    }}
                  >
                    <Timer auctionStartDate={auctionStartDate} />
                  </div>
                ) : !registEnded ? (
                  <div style={{ fontSize: "12px", width: "100%" }}>
                    <RegistrationTimer
                      time={endRegister}
                      toogleRegistEnded={toogleRegistEnded}
                    />
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: "18px",
                      width: "100%",
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
                  {data.engine_type ? data.engine_type : "N/A"}|{" "}
                  {data.engine_deck_type ? data.engine_deck_type : "N/A"}|{" "}
                  {data.running_cost ? data.running_cost : "N/A"}
                </p>
              </Col>
            </Row>
            {/* <div>
              <div>
                <span className="golden-text">{data.property_address}</span>
                <h4 style={{ marginTop: "5px", color: "black" }}>
                  {data.manufacturer_name} {data.engine_type}
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
                            toogleRegistEnded={toogleRegistEnded}
                          />
                        </div>
                      </Col>
                    ) : (
                      <Col md={1} style={{ width: "50%" }}>
                        <div
                          style={{
                            fontSize: "18px",
                            width: "100%",
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
                        {data.engine_type ? data.engine_type : "N/A"}|{" "}
                        {data.engine_deck_type ? data.engine_deck_type : "N/A"}|{" "}
                        {data.running_cost ? data.running_cost : "N/A"}
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

export { UpcomingYachtCard };
