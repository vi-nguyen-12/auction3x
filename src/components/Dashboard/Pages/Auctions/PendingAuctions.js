import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "./SavedAuctionsCard";
import authService from "../../../../services/authServices";

function PendingAuctions() {
  const user = useSelector((state) => state.user);
  const [PendingAuctions, setPendingAuctions] = useState([]);

  useEffect(() => {
    authService.getBuyerPendingAuctions(user._id).then((res) => {
      setPendingAuctions(res.data);
    });
  }, []);

  return (
    <Container style={{ width: "70vw" }}>
      {PendingAuctions > 0 ? (
        <>
          <h1>Pending Auctions</h1>
          <Row>
            {PendingAuctions.map((property) => (
              <Col key={property._id}>
                <SavedAuctionsCard
                  data={property.property.details}
                  url={property.property.images[0].url}
                  id={property._id}
                  auctionStartDate={property.auctionStartDate}
                  auctionEndDate={property.auctionEndDate}
                  startingBid={
                    property.highestBid
                      ? property.highestBid
                      : property.startingBid
                  }
                  auctionId={property._id}
                />
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <h1>No Pending Auctions</h1>
      )}
    </Container>
  );
}

export default PendingAuctions;
