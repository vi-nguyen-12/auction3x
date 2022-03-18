import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "../Auctions/SavedAuctionsCard";
import authService from "../../../../services/authServices";

function LiveListings() {
  const user = useSelector((state) => state.user);
  const [approvedProperty, setApprovedProperty] = useState([]);
  const [upcomingAuctions, setUpcomingAuctions] = useState([]);

  useEffect(() => {
    const fetchApprovedProperty = async () => {
      const id = user._id;
      await authService.sellerApprovedListings(id).then((res) => {
        setUpcomingAuctions(res.data);
      });
    };
    fetchApprovedProperty();
  }, []);

  useEffect(() => {
    const fetchApprovedProperty = async () => {
      const id = user._id;
      await authService.sellerPropInAuctions(id).then((res) => {
        setApprovedProperty(res.data);
      });
    };
    fetchApprovedProperty();
  }, []);
  console.log(approvedProperty);

  return (
    <Container>
      <Row>
        <h1>Upcoming Listing Auctions</h1>
        {upcomingAuctions.length > 0 ? (
          upcomingAuctions
            .slice(0, 4)
            .map((auction) => (
              <Col key={auction._id}>
                {auction.type === "real-estate" ? (
                  <SavedAuctionsCard
                    data={auction.details}
                    url={auction.images[0].url}
                    id={auction._id}
                    auctionStartDate={auction.auctionStartDate}
                    auctionEndDate={auction.auctionEndDate}
                    startingBid={
                      auction.highestBid
                        ? auction.highestBid
                        : auction.startingBid
                    }
                  />
                ) : null}
              </Col>
            ))
        ) : (
          <h1>No Upcoming Listing Auctions</h1>
        )}
      </Row>
      <Row>
        <h1>Approved Listing Auctions</h1>
        {approvedProperty.length > 0 ? (
          approvedProperty.map((auction, index) => (
            <Col key={index}>
              {auction.type === "real-estate" ? (
                <SavedAuctionsCard
                  data={auction.details}
                  url={auction.images[0].url}
                  id={auction.auctionDetails._id}
                  auctionStartDate={auction.auctionDetails.auctionStartDate}
                  auctionEndDate={auction.auctionDetails.auctionEndDate}
                  startingBid={
                    auction.auctionDetails.highestBid
                      ? auction.auctionDetails.highestBid
                      : auction.auctionDetails.startingBid
                  }
                />
              ) : null}
            </Col>
          ))
        ) : (
          <h1>No Approved Listing Auctions</h1>
        )}
      </Row>
    </Container>
  );
}

export default LiveListings;
