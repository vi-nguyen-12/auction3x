import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "../Auctions/SavedAuctionsCard";
import authService from "../../../../services/authServices";

function PendingListings() {
  const user = useSelector((state) => state.user);
  const [pendingListings, setPendingListings] = useState([]);

  useEffect(() => {
    const fetchPendingListings = async () => {
      const id = user._id;
      await authService.sellerApprovedListings(id).then((res) => {
        setPendingListings(res.data);
      });
    };
    fetchPendingListings();
  }, []);

  console.log(pendingListings);

  return (
    <Container>
      {pendingListings.length > 0 ? (
        <Row>
          {pendingListings.map((auction) => (
            <Col key={auction._id}>
              <SavedAuctionsCard
                data={auction.details}
                url={auction.images[0].url}
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
