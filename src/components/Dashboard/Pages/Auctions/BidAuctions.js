import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "./SavedAuctionsCard";
import authService from "../../../../services/authServices";

function BidAuctions() {
  const user = useSelector((state) => state.user);
  const [bidAuctions, setBidAuctions] = useState([]);

  useEffect(() => {
    const fetchBidAuctions = async () => {
      const id = user._id;
      await authService.getUserBidAuctions(id).then((res) => {
        setBidAuctions(res.data);
      });
    };
    fetchBidAuctions();
  }, []);
  return (
    <Container>
      {bidAuctions.length > 0 ? (
        <Row>
          {bidAuctions.map((auction) => (
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
        <h1>No Bid Auctions</h1>
      )}
    </Container>
  );
}

export default BidAuctions;
