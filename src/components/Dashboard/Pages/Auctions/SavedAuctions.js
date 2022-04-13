import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "./SavedAuctionsCard";
import { CarCard } from "../../../Cards/CarCard";
import { JetCard } from "../../../Cards/JetCard";
import { YachtCard } from "../../../Cards/YachtCard";
import { CardComp } from "../../../Cards/RealEstateCard";
import { UpcomingCard } from "../../../Auctions/UpcomingCard";
import { UpcomingCarCard } from "../../../Cards/UpcomingCarCard";
import { UpcomingJetCard } from "../../../Cards/UpcomingJetCard";
import { UpcomingYachtCard } from "../../../Cards/UpcomingYachtCard";

function SavedAuctions() {
  const savedProperty = useSelector((state) => state.savedProperty);
  const auction = useSelector((state) => state.auction);
  return (
    <Container>
      <Row>
        {savedProperty.length > 0 ? (
          savedProperty.map((property, index) => (
            <Col key={index}>
              {property.property.type === "real-estate" ? (
                auction.filter((item) => item._id === property._id) ? (
                  <CardComp
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    auctionStartDate={property.auctionStartDate}
                    auctionEndDate={property.auctionEndDate}
                    startingBid={property.startingBid}
                  />
                ) : (
                  <UpcomingCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    startRegister={property.registerStartDate}
                    endRegister={property.registerEndDate}
                    startingBid={property.startingBid}
                  />
                )
              ) : property.property.type === "car" ? (
                auction.filter((item) => item._id === property._id) ? (
                  <CarCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    auctionStartDate={property.auctionStartDate}
                    auctionEndDate={property.auctionEndDate}
                    startingBid={property.startingBid}
                  />
                ) : (
                  <UpcomingCarCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    startRegister={property.registerStartDate}
                    endRegister={property.registerEndDate}
                    startingBid={property.startingBid}
                  />
                )
              ) : property.property.type === "jet" ? (
                auction.filter((item) => item._id === property._id) ? (
                  <JetCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    auctionStartDate={property.auctionStartDate}
                    auctionEndDate={property.auctionEndDate}
                    startingBid={property.startingBid}
                  />
                ) : (
                  <UpcomingJetCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    startRegister={property.registerStartDate}
                    endRegister={property.registerEndDate}
                    startingBid={property.startingBid}
                  />
                )
              ) : property.property.type === "yacht" ? (
                auction.filter((item) => item._id === property._id) ? (
                  <YachtCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    auctionStartDate={property.auctionStartDate}
                    auctionEndDate={property.auctionEndDate}
                    startingBid={property.startingBid}
                  />
                ) : (
                  <UpcomingYachtCard
                    url={property.property.images[0].url}
                    data={property.property.details}
                    id={property._id}
                    startRegister={property.registerStartDate}
                    endRegister={property.registerEndDate}
                    startingBid={property.startingBid}
                  />
                )
              ) : null}
            </Col>
          ))
        ) : (
          <h1>No Saved Property</h1>
        )}
      </Row>
    </Container>
  );
}

export default SavedAuctions;
