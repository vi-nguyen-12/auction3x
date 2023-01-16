import React, { useState, useEffect, useContext } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import AuctionTimer from "../Auctions/AuctionTimer";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../services/authServices";
import { AiOutlineHeart } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import { currencyText } from "../../App";
import ReservedMet from "../../images/ReservedMet.png";
import axios from "axios";
import "../../styles/card.css";

function NewCards({ data, type, toggleSignIn, windowSize }) {
  const currency = useContext(currencyText);
  const [favorite, setFavorite] = useState(false);
  const [convertedCurrency, setConvertedCurrency] = useState(0);
  const user = useSelector((state) => state.user);
  const savedProperty = useSelector((state) => state.savedProperty);

  const history = useHistory();
  const handleBid = () => {
    if (!user._id) {
      return toggleSignIn();
    } else {
      history.location.pathname === "/Dashboard" ||
      "/Dashboard/Auctions/SavedAuctions"
        ? window.open(`/DisplayAuctions/${data._id}`)
        : history.push(`/DisplayAuctions/${data._id}`);
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

  const handleDisplay = () => {
    // if (new Date().toISOString() > data.auctionEndDate) {
    //   alert("Auction has ended");
    // } else {
    if (
      history.location.pathname === "/Dashboard" ||
      history.location.pathname === "/Dashboard/Auctions/SavedAuctions"
    ) {
      window.open(`/DisplayAuctions/${data._id}`);
    } else {
      history.push(`/DisplayAuctions/${data._id}`);
    }
    // }
  };

  useEffect(() => {
    if (currency !== "USD") {
      axios
        .get(
          `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${data.startingBid}`
        )
        .then((res) => {
          setConvertedCurrency(res.data.result?.toFixed(0));
        });
    }
  }, [currency]);

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
  }, [savedProperty, user._id, data._id]);

  return (
    <Card
      className="card-container"
      style={{
        width:
          history.location.pathname === "/" && windowSize > 1680 ? "100%" : "",
      }}
    >
      {(data.isReservedMet || data.winner?.buyerId) && (
        <div
          className="position-absolute"
          style={{
            marginTop: windowSize > 600 ? "-1rem" : "0.5rem",
            marginLeft: windowSize > 600 ? "-1rem" : "0.5rem",
          }}
        >
          <img
            src={ReservedMet}
            alt="property"
            width={windowSize < 600 ? "50px" : ""}
            loading="lazy"
          />
        </div>
      )}
      <Card.Img
        className="card-img"
        style={{
          height:
            history.location.pathname === "/" && windowSize > 1680 && "380px",
        }}
        variant="top"
        onClick={handleDisplay}
        src={
          data.property.images.filter((img) => img.isMain === true)[0]?.url ||
          data.property.images[0]?.url
        }
        alt="property"
      />
      <button
        onClick={handleLike}
        className="favBtn"
        // disabled={new Date().toISOString() > data.auctionEndDate}
      >
        {favorite ? (
          <AiFillHeart size={25} className="favIcon" color="#ff5260" />
        ) : (
          <AiOutlineHeart size={25} className="favIcon" />
        )}
      </button>
      <Card.Body className="p-0 px-4">
        <Row>
          <Col
            className="py-3 px-0"
            style={{
              borderBottom: "1px solid rgba(209, 214, 226, 0.5)",
              overflow: "auto",
            }}
          >
            {type === "yacht" ? (
              <span className="prop-title">
                {data.property.details.manufacturer_name}{" "}
                {data.property.details.engine_manufacture_name}{" "}
                {data.property.details.engine_type}
              </span>
            ) : type === "car" ? (
              <span className="prop-title">
                {data.property.details.year} {data.property.details.make}{" "}
                {data.property.details.model}
              </span>
            ) : type === "jet" ? (
              <span className="prop-title">
                {data.property.details.year_built}{" "}
                {data.property.details.aircraft_builder_name}{" "}
                {data.property.details.aircraft_model_designation}
              </span>
            ) : (
              <span className="prop-title">
                {
                  data.property.details.property_address
                    .formatted_street_address
                }
                , {data.property.details.property_address.state}
              </span>
            )}
          </Col>
        </Row>
        <Row>
          <Col
            className="py-3 px-0 d-flex"
            style={{
              borderBottom: "1px solid rgba(209, 214, 226, 0.5)",
              overflow: "auto",
            }}
          >
            <Col>
              <div>
                <span className="card-section-title">Property Info</span>
                <div className="d-flex">
                  {type === "yacht" ? (
                    <>
                      <p
                        className="info-text"
                        style={{
                          marginRight: "8px",
                        }}
                      >
                        {data.property.details.engine_type
                          ? data.property.details.engine_type
                          : "N/A"}
                      </p>{" "}
                      •{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        {data.property.details.engine_deck_type
                          ? data.property.details.engine_deck_type
                          : "N/A"}
                      </p>{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {data.property.details.running_cost
                          ? data.property.details.running_cost
                          : "N/A"}
                      </p>
                    </>
                  ) : type === "car" ? (
                    <>
                      <p
                        className="info-text"
                        style={{
                          marginRight: "8px",
                        }}
                      >
                        {data.property.details.car_type
                          ? data.property.details.car_type
                          : "N/A"}
                      </p>{" "}
                      •{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        {data.property.details.engine
                          ? data.property.details.engine
                          : "N/A"}
                      </p>{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {data.property.details.fuel_type
                          ? data.property.details.fuel_type
                          : "N/A"}
                      </p>
                    </>
                  ) : type === "jet" ? (
                    <>
                      <p
                        className="info-text"
                        style={{
                          marginRight: "8px",
                        }}
                      >
                        {data.property.details.engine_builder_name
                          ? data.property.details.engine_builder_name
                          : "N/A"}
                      </p>{" "}
                      •{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        {data.property.details.engine_model_designation
                          ? data.property.details.engine_model_designation
                          : "N/A"}
                      </p>{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {data.property.details.number_of_engines
                          ? data.property.details.number_of_engines +
                            " Engines "
                          : "N/A"}
                      </p>
                    </>
                  ) : (
                    <>
                      <p
                        className="info-text"
                        style={{
                          marginRight: "8px",
                        }}
                      >
                        {data.property.details.structure.beds_count
                          ? data.property.details.structure.beds_count + " Bd"
                          : "N/A-"}
                      </p>{" "}
                      •{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        {data.property.details.structure.baths_count
                          ? data.property.details.structure.baths_count + " Ba"
                          : "N/A-"}
                      </p>{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {data.property.details.parcel.area_sq_ft
                          ? data.property.details.parcel.area_sq_ft + " Sqft"
                          : "N/A-"}{" "}
                      </p>
                    </>
                  )}
                </div>
              </div>

              {new Date().toISOString() < data.registerStartDate ? (
                <span className="card-section-title">Registration Starts</span>
              ) : new Date().toISOString() < data.auctionStartDate &&
                new Date().toISOString() < data.registerEndDate &&
                new Date().toISOString() >= data.registerStartDate ? (
                <span className="card-section-title">Registration Ends</span>
              ) : new Date().toISOString() > data.registerEndDate &&
                new Date().toISOString() < data.auctionStartDate ? (
                <span className="card-section-title">Auction Starts</span>
              ) : (
                <span className="card-section-title">Online Auction</span>
              )}
              {new Date().toISOString() > data.auctionEndDate ? (
                <p className="auction-end p-0 m-0">Auction Ended</p>
              ) : new Date().toISOString() < data.registerStartDate ? (
                <div style={{ paddingBottom: "1.8rem" }}>
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.registerStartDate}
                      windowSize={windowSize}
                      id={data._id}
                    />
                  </div>
                </div>
              ) : new Date().toISOString() < data.auctionStartDate &&
                new Date().toISOString() < data.registerEndDate &&
                new Date().toISOString() >= data.registerStartDate ? (
                <div style={{ paddingBottom: "1.8rem" }}>
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.registerEndDate}
                      id={data._id}
                      windowSize={windowSize}
                    />
                  </div>
                </div>
              ) : new Date().toISOString() < data.auctionStartDate &&
                new Date().toISOString() > data.registerEndDate ? (
                <div style={{ paddingBottom: "1.8rem" }}>
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.auctionStartDate}
                      id={data._id}
                      windowSize={windowSize}
                    />
                  </div>
                </div>
              ) : new Date().toISOString() > data.auctionStartDate &&
                new Date().toISOString() < data.auctionEndDate ? (
                <div style={{ paddingBottom: "1.8rem" }}>
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.auctionEndDate}
                      id={data._id}
                      windowSize={windowSize}
                    />
                  </div>
                </div>
              ) : (
                <div style={{ paddingBottom: "1.8rem" }}>
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.auctionEndDate}
                      id={data._id}
                      windowSize={windowSize}
                    />
                  </div>
                </div>
              )}
            </Col>
            {/* <Col className="d-flex justify-content-center">
              <div>
                <span className="card-section-title">Listed On</span>
                <p className="info-text">Aug 18, 2022</p>
              </div>
            </Col> */}
          </Col>
        </Row>
        <Row>
          <Col className="d-grid justify-content-start align-items-center py-3 px-0">
            <span className="card-section-title" style={{ fontSize: "15px" }}>
              Starting Bid
            </span>
            <p className="m-0 starting-amount">
              <NumberFormat
                value={data.startingBid}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </p>
            {currency !== "USD" && (
              <p className="m-0" style={{ fontSize: "14px" }}>
                {currency === "INR" ? (
                  <>
                    Approx.{" "}
                    {parseInt(convertedCurrency).toLocaleString("en-IN", {
                      style: "currency",
                      currency: "INR",
                      maximumFractionDigits: 2,
                    })}
                  </>
                ) : (
                  <NumberFormat
                    value={convertedCurrency}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"Approx. "}
                    suffix={" " + currency}
                  />
                )}
              </p>
            )}
          </Col>
          <Col className="d-flex justify-content-end align-items-center py-3 px-0">
            <Button
              onClick={handleBid}
              disabled={
                new Date().toISOString() > data.auctionEndDate ||
                (new Date().toISOString() > data.registerEndDate &&
                  new Date().toISOString() < data.auctionStartDate) ||
                new Date().toISOString() < data.registerStartDate
              }
              className="card-bid-btn"
            >
              {new Date().toISOString() > data.auctionEndDate
                ? "Completed"
                : new Date().toISOString() > data.auctionStartDate &&
                  new Date().toISOString() < data.auctionEndDate
                ? "Place Bid"
                : "Register"}
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default NewCards;
