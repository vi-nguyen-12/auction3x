import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "./SavedAuctionsCard";
import authService from "../../../../services/authServices";

function WinAuctions() {
  const user = useSelector((state) => state.user);
  const [winAuctions, setWinAuctions] = useState([]);

  useEffect(() => {
    const fetchWinAuctions = async () => {
      const id = user._id;
      await authService.buyerWonAuctions(id).then((data) => {
        setWinAuctions(data);
      });
    };
    fetchWinAuctions();
  }, []);

  return (
    <Container>
      {winAuctions.length > 0 ? (
        <Row>
          {winAuctions.map((auction) => (
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
        <h1>No Win Auctions</h1>
      )}
    </Container>
  );
}

export default WinAuctions;
