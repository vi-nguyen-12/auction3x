import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "./SavedAuctionsCard";

function SavedAuctions() {
  const savedProperty = useSelector((state) => state.savedProperty);
  return (
    <Container>
      <Row>
        {savedProperty.slice(0, 4).map((property) => (
          <Col key={property._id}>
            <SavedAuctionsCard
              data={property.property.details}
              url={property.property.images[0].url}
              id={property._id}
              auctionStartDate={property.auctionStartDate}
              auctionEndDate={property.auctionEndDate}
              startingBid={
                property.highestBid ? property.highestBid : property.startingBid
              }
              auctionId={property._id}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SavedAuctions;
