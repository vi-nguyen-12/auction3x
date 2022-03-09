import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "../Auctions/SavedAuctionsCard";
import authService from "../../../../services/authServices";

function PendingListings() {
  const user = useSelector((state) => state.user);
  const [pendingListings, setPendingListings] = useState([]);

  useEffect(async () => {
    const id = user._id;
    await authService.sellerPendingAuctions(id).then((data) => {
      setPendingListings(data);
    });
  }, []);

  return (
    <Container>
      {pendingListings.length > 0 ? (
        <Row>
          {pendingListings.map((auction) => (
            <Col key={auction._id}>
              <SavedAuctionsCard
                data={auction.property.details}
                url={auction.property.images[0].url}
                id={auction._id}
                auctionStartDate={auction.auctionStartDate}
                auctionEndDate={auction.auctionEndDate}
                startingBid={
                  auction.highestBid ? auction.highestBid : auction.startingBid
                }
                auctionId={auction._id}
              />
            </Col>
          ))}
        </Row>
      ) : (
        <h1>No Pending Approval</h1>
      )}
    </Container>
  );
}

export default PendingListings;
