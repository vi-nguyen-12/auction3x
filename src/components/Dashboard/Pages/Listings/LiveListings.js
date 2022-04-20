import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "../Auctions/SavedAuctionsCard";
import { CarCard } from "../../../Cards/CarCard";
import { JetCard } from "../../../Cards/JetCard";
import { YachtCard } from "../../../Cards/YachtCard";
import { CardComp } from "../../../Cards/RealEstateCard";
import { UpcomingRealEtateCard } from "../../../Cards/UpcomingRealEtateCard";
import { UpcomingCarCard } from "../../../Cards/UpcomingCarCard";
import { UpcomingJetCard } from "../../../Cards/UpcomingJetCard";
import { UpcomingYachtCard } from "../../../Cards/UpcomingYachtCard";
import authService from "../../../../services/authServices";
import ApprovedListings from "./ApprovedListings";

function LiveListings() {
  const user = useSelector((state) => state.user);
  const [upcomingListings, setUpcomingListings] = useState([]);

  useEffect(() => {
    const fetchApprovedProperty = async () => {
      const id = user._id;
      await authService.sellerApprovedListings(id).then((res) => {
        setUpcomingListings(res.data);
        console.log(res.data);
      });
    };
    fetchApprovedProperty();
  }, []);

  return (
    <Container>
      <Row>
        <h1>Upcoming Listing Auctions</h1>
        {upcomingListings.length > 0 ? (
          upcomingListings
            .slice(0, 4)
            .map((auction) => (
              <Col key={auction._id}>
                {auction.type === "real-estate" ? (
                  <SavedAuctionsCard
                    data={auction.details}
                    url={auction.images[0].url}
                    id={auction._id}
                    type={auction.type}
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
        <ApprovedListings />
      </Row>
    </Container>
  );
}

export default LiveListings;
