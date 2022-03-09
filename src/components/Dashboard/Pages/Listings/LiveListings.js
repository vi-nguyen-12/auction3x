import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "../Auctions/SavedAuctionsCard";
import authService from "../../../../services/authServices";

function LiveListings() {
  const user = useSelector((state) => state.user);
  const [approvedProperty, setApprovedProperty] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);

  useEffect(async () => {
    const id = user._id;
    await authService.sellerApprovedAuctions(id).then((data) => {
      console.log(data);
      setUpcomingAuctions(data);
    });
  }, []);
  return (
    <Container>
      <Row>
        {upcomingAuctions.length > 0 ? (
          <Col>
            <h1>Upcoming Auctions</h1>
            {upcomingAuctions.map((auction) => (
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
            ))}
          </Col>
        ) : (
          <h1>No Upcoming Auctions</h1>
        )}
      </Row>
      <Row>
        {approvedProperty.length > 0 ? (
          <Col>
            <h1>Approved Auctions</h1>
            {approvedProperty.map((auction) => (
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
            ))}
          </Col>
        ) : (
          <h1>No Approved Auctions</h1>
        )}
      </Row>
    </Container>
  );
}

export default LiveListings;
