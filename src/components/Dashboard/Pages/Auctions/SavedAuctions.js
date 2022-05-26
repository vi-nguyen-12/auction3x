import React from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { CarCard } from "../../../Cards/CarCard";
import { JetCard } from "../../../Cards/JetCard";
import { YachtCard } from "../../../Cards/YachtCard";
import { CardComp } from "../../../Cards/RealEstateCard";
import { UpcomingRealEstateCard } from "../../../Cards/UpcomingRealEtateCard";
import { UpcomingCarCard } from "../../../Cards/UpcomingCarCard";
import { UpcomingJetCard } from "../../../Cards/UpcomingJetCard";
import { UpcomingYachtCard } from "../../../Cards/UpcomingYachtCard";

function SavedAuctions({ windowSize }) {
  let now = new Date();
  let upcomingSavedAuctions = [];
  let notUpcomingSavedAuctions = [];
  const savedProperty = useSelector((state) => state.savedProperty);
  for (let auction of savedProperty) {
    if (auction.startDate > now) {
      upcomingSavedAuctions.push(auction);
    } else {
      notUpcomingSavedAuctions.push(auction);
    }
  }
  return (
    <Container style={{ width: "70vw", marginTop: "50px" }}>
      <Row>
        {savedProperty.length > 0 ? (
          <>
            <h1 style={{ marginBottom: "40px" }}>Saved Auctions</h1>
            {upcomingSavedAuctions.map((auction, index) => (
              <Col style={{ marginBottom: "50px" }} key={index}>
                {auction.property.type === "real-estate" ? (
                  <UpcomingRealEstateCard
                    url={auction.property.images[0].url}
                    urls={auction.property.images}
                    data={auction.property.details}
                    id={auction._id}
                    startRegister={auction.registerStartDate}
                    endRegister={auction.registerEndDate}
                    startingBid={auction.startingBid}
                    windowSize={windowSize}
                  />
                ) : auction.property.type === "car" ? (
                  <UpcomingCarCard
                    url={auction.property.images[0].url}
                    urls={auction.property.images}
                    data={auction.property.details}
                    id={auction._id}
                    startRegister={auction.registerStartDate}
                    endRegister={auction.registerEndDate}
                    startingBid={auction.startingBid}
                    windowSize={windowSize}
                  />
                ) : auction.property.type === "jet" ? (
                  <UpcomingJetCard
                    url={auction.property.images[0].url}
                    urls={auction.property.images}
                    data={auction.property.details}
                    id={auction._id}
                    startRegister={auction.registerStartDate}
                    endRegister={auction.registerEndDate}
                    startingBid={auction.startingBid}
                    windowSize={windowSize}
                  />
                ) : (
                  <UpcomingYachtCard
                    url={auction.property.images[0].url}
                    urls={auction.property.images}
                    data={auction.property.details}
                    id={auction._id}
                    startRegister={auction.registerStartDate}
                    endRegister={auction.registerEndDate}
                    startingBid={auction.startingBid}
                    windowSize={windowSize}
                  />
                )}
              </Col>
            ))}
            {notUpcomingSavedAuctions.map((auction, index) => (
              <Col style={{ marginBottom: "50px" }} key={index}>
                {auction.property.type === "real-estate" ? (
                  <CardComp
                    url={auction.property.images[0].url}
                    urls={auction.property.images}
                    data={auction.property.details}
                    id={auction._id}
                    auctionStartDate={auction.auctionStartDate}
                    auctionEndDate={auction.auctionEndDate}
                    startingBid={auction.startingBid}
                    windowSize={windowSize}
                  />
                ) : auction.property.type === "car" ? (
                  <CarCard
                    url={auction.property.images[0].url}
                    urls={auction.property.images}
                    data={auction.property.details}
                    id={auction._id}
                    auctionStartDate={auction.auctionStartDate}
                    auctionEndDate={auction.auctionEndDate}
                    startingBid={auction.startingBid}
                    windowSize={windowSize}
                  />
                ) : auction.property.type === "jet" ? (
                  <JetCard
                    url={auction.property.images[0].url}
                    urls={auction.property.images}
                    data={auction.property.details}
                    id={auction._id}
                    auctionStartDate={auction.auctionStartDate}
                    auctionEndDate={auction.auctionEndDate}
                    startingBid={auction.startingBid}
                    windowSize={windowSize}
                  />
                ) : (
                  <YachtCard
                    url={auction.property.images[0].url}
                    urls={auction.property.images}
                    data={auction.property.details}
                    id={auction._id}
                    auctionStartDate={auction.auctionStartDate}
                    auctionEndDate={auction.auctionEndDate}
                    startingBid={auction.startingBid}
                    windowSize={windowSize}
                  />
                )}
              </Col>
            ))}
          </>
        ) : (
          <h1>No Saved Auctions</h1>
        )}
      </Row>
    </Container>
  );
}

export default SavedAuctions;
