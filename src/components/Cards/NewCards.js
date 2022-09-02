import React, { useState, useEffect } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import AuctionTimer from "../Auctions/AuctionTimer";
import NumberFormat from "react-number-format";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import "../../styles/card.css";

function NewCards({ data, reserveMet, type, toggleSignIn, windowSize }) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const handleBid = () => {
    if (!user._id) {
      return toggleSignIn();
    }
    // if (user.KYC) {
    //   history.push(`/DisplayAuctions/${data._id}`);
    // } else {
    //   setShowKYC(true);
    // }
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

  return (
    <Card
      className="card-container"
      // style={{ width: windowSize < 1680 && "440px" }}
    >
      <Card.Img
        className="card-img"
        style={{
          height:
            history.location.pathname === "/" && windowSize > 1680 && "100%",
        }}
        variant="top"
        onClick={handleDisplay}
        src={data.property.images[0].url}
      />
      <Card.Body className="p-0 px-4">
        <Row>
          <Col
            className="py-3 px-0"
            style={{ borderBottom: "1px solid rgba(209, 214, 226, 0.5)" }}
          >
            {type === "yacht" ? (
              <span className="prop-title">
                {data.property.details.manufacturer_name}{" "}
                {data.property.details.engine_type}
              </span>
            ) : type === "car" ? (
              <span className="prop-title">
                {data.property.details.year} {data.property.details.make}{" "}
                {data.property.details.model}
              </span>
            ) : type === "jet" ? (
              <span className="prop-title">
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
            style={{ borderBottom: "1px solid rgba(209, 214, 226, 0.5)" }}
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
                        {data.property.details.number_of_engines
                          ? data.property.details.number_of_engines +
                            " Engines "
                          : "N/A"}
                      </p>{" "}
                      •{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "8px",
                        }}
                      >
                        {data.property.details.imported_aircraft
                          ? "Imported"
                          : "Local"}
                      </p>{" "}
                      <p
                        className="info-text"
                        style={{
                          marginLeft: "10px",
                        }}
                      >
                        {data.property.details.year_built
                          ? data.property.details.year_built
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
              <div style={{ paddingBottom: "1.5rem" }}>
                {new Date().toISOString() < data.auctionStartDate &&
                new Date().toISOString() < data.registerEndDate ? (
                  <span className="card-section-title">Registration Ends</span>
                ) : new Date().toISOString() > data.registerEndDate &&
                  new Date().toISOString() < data.auctionStartDate ? (
                  <span className="card-section-title">Auction Starts</span>
                ) : (
                  <span className="card-section-title">Online Auction</span>
                )}
                {new Date().toISOString() > data.auctionEndDate ? (
                  <p className="auction-end">Auction Ended</p>
                ) : new Date().toISOString() < data.auctionStartDate &&
                  new Date().toISOString() < data.registerEndDate ? (
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.registerEndDate}
                      id={data._id}
                      windowSize={windowSize}
                    />
                  </div>
                ) : new Date().toISOString() < data.auctionStartDate &&
                  new Date().toISOString() > data.registerEndDate ? (
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.auctionStartDate}
                      id={data._id}
                      windowSize={windowSize}
                    />
                  </div>
                ) : new Date().toISOString() > data.auctionStartDate &&
                  new Date().toISOString() < data.auctionEndDate ? (
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.auctionEndDate}
                      id={data._id}
                      windowSize={windowSize}
                    />
                  </div>
                ) : (
                  <div className="position-absolute">
                    <AuctionTimer
                      time={data.auctionEndDate}
                      id={data._id}
                      windowSize={windowSize}
                    />
                  </div>
                )}
              </div>
            </Col>
            <Col className="d-flex justify-content-center">
              <div>
                <span className="card-section-title">Listed On</span>
                <p className="info-text">Aug 18, 2022</p>
              </div>
            </Col>
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
          </Col>
          <Col className="d-flex justify-content-end align-items-center py-3 px-0">
            <Button onClick={handleBid} className="card-bid-btn">
              Place Bid
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

export default NewCards;
