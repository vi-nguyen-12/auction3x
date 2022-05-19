import React from "react";
import { Row, Col } from "react-bootstrap";
import { UpcomingRealEstateCard } from "../Cards/UpcomingRealEtateCard";
import { UpcomingCarCard } from "../Cards/UpcomingCarCard";
import { UpcomingJetCard } from "../Cards/UpcomingJetCard";
import { UpcomingYachtCard } from "../Cards/UpcomingYachtCard";

const Upcoming = ({ toogleSignIn, upcomingAuctions }) => {
  return (
    <>
      {upcomingAuctions ? (
        <>
          <div className="mt-5" >
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
                  <div style={{ height: "100vh" }}>
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
                          toogleSignIn={toogleSignIn}
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
                          toogleSignIn={toogleSignIn}
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
                          toogleSignIn={toogleSignIn}
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
                          toogleSignIn={toogleSignIn}
                        />
                      ) : null}
                    </Col>
                  </div>
                ))
              ) : (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    textAlign: "center",
                    marginTop: "30px",
                    backgroundColor: "#e8e8e8",
                    boxShadow: "0px 0px 10px #00000029",
                    borderRadius: "10px",
                    padding: "20px",
                  }}
                >
                  <h1 style={{ margin: "0" }}>Auctions not found!</h1>
                </div>
              )}
            </Row>
          </div>
        </>
      ) : null}
    </>
  );
};

export { Upcoming };
