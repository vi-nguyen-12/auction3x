import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { UpcomingRealEstateCard } from "../Cards/UpcomingRealEtateCard";
import { UpcomingCarCard } from "../Cards/UpcomingCarCard";
import { UpcomingJetCard } from "../Cards/UpcomingJetCard";
import { UpcomingYachtCard } from "../Cards/UpcomingYachtCard";
import error from "../../../src/images/error.png";

const Upcoming = ({ toggleSignIn, upcomingAuctions, windowSize }) => {
  return (
    <>
      {upcomingAuctions ? (
        <>
          <div className="mt-5">
            <Row style={{ padding: "0 50px" }}>
              <Col md={10} className="pt-5">
                <h2 style={{ color: "black", fontSize: "22px" }}>
                  Upcoming Auctions
                </h2>
              </Col>
            </Row>
            <Row
              style={{
                padding: "0 50px",
                display: "flex",
                alignContent: "center",
                alignItems: "center",
              }}
            >
              {upcomingAuctions.length > 0 ? (
                upcomingAuctions.slice(0, 6).map((item) => (
                  <Col
                    key={item._id}
                    md={4}
                    style={{ marginBottom: "30px", marginTop: "20px" }}
                  >
                    {item.property.type === "real-estate" ? (
                      <UpcomingRealEstateCard
                        url={item.property.images[0].url}
                        urls={item.property.images}
                        data={item.property.details}
                        id={item._id}
                        startRegister={item.registerStartDate}
                        auctionStartDate={item.auctionStartDate}
                        endRegister={item.registerEndDate}
                        startingBid={item.startingBid}
                        toggleSignIn={toggleSignIn}
                        windowSize={windowSize}
                      />
                    ) : item.property.type === "car" ? (
                      <UpcomingCarCard
                        url={item.property.images[0].url}
                        urls={item.property.images}
                        data={item.property.details}
                        id={item._id}
                        startRegister={item.registerStartDate}
                        auctionStartDate={item.auctionStartDate}
                        endRegister={item.registerEndDate}
                        startingBid={item.startingBid}
                        toggleSignIn={toggleSignIn}
                        windowSize={windowSize}
                      />
                    ) : item.property.type === "jet" ? (
                      <UpcomingJetCard
                        url={item.property.images[0].url}
                        urls={item.property.images}
                        data={item.property.details}
                        id={item._id}
                        startRegister={item.registerStartDate}
                        auctionStartDate={item.auctionStartDate}
                        endRegister={item.registerEndDate}
                        startingBid={item.startingBid}
                        toggleSignIn={toggleSignIn}
                        windowSize={windowSize}
                      />
                    ) : item.property.type === "yacht" ? (
                      <UpcomingYachtCard
                        url={item.property.images[0].url}
                        urls={item.property.images}
                        data={item.property.details}
                        id={item._id}
                        startRegister={item.registerStartDate}
                        auctionStartDate={item.auctionStartDate}
                        endRegister={item.registerEndDate}
                        startingBid={item.startingBid}
                        toggleSignIn={toggleSignIn}
                        windowSize={windowSize}
                      />
                    ) : null}
                  </Col>
                ))
              ) : (
                <Row style={{ margin: "0", padding: "0", marginTop: "20px" }}>
                  <Col
                    style={{
                      backgroundColor: "#282828",
                      borderRadius: "10px",
                      margin: "0",
                      padding: "0",
                      display: "flex",
                      justifyContent: "center",
                      alignContent: "center",
                      alignItems: "center",
                      height: windowSize < 500 && "30vh",
                    }}
                    md={12}
                  >
                    <img
                      src={error}
                      alt="error"
                      style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "10px",
                        objectFit: "cover",
                        backgroundPosition: "center",
                        backgroundSize: "cover",
                      }}
                    />
                    <div
                      style={{
                        display: "grid",
                        justifyContent: "center",
                        fontSize: windowSize > 500 ? "10rem" : "3rem",
                        alignContent: "center",
                        width: "100%",
                        height: "fit-content",
                        position: "absolute",
                        color: "white",
                        zIndex: "100",
                      }}
                    >
                      <span
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        404
                      </span>
                      <p
                        style={{
                          fontSize: windowSize > 500 ? "25px" : "18px",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        No Auctions Found!
                      </p>
                      <Button
                        style={{
                          background: "white",
                          color: "#B77B50",
                          fontWeight: "bold",
                          border: "none",
                          padding: "10px",
                        }}
                        onClick={() => {
                          window.scrollTo(0, 0);
                        }}
                      >
                        Take Me Home
                      </Button>
                    </div>
                  </Col>
                </Row>
              )}
            </Row>
          </div>
        </>
      ) : null}
    </>
  );
};

export { Upcoming };
