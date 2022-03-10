import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "./SavedAuctionsCard";
import Pagination from "../Pagination";

function SavedAuctions() {
  const savedProperty = useSelector((state) => state.savedProperty);
  const [currentPage, setCurrentPage] = useState(1);
  const [cardPerPage] = useState(4);

  const indexOfLastCard = currentPage * cardPerPage;
  const indexOfFirstCard = indexOfLastCard - cardPerPage;
  const currentCard = savedProperty.slice(indexOfFirstCard, indexOfLastCard);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  console.log(currentCard);
  return (
    <Container>
      <Row>
        {currentCard.map((property, index) => (
          <Col key={index}>
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
      <Row>
        <Col>
          <Pagination
            cardPerPage={cardPerPage}
            totalCard={savedProperty.length}
            paginate={paginate}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default SavedAuctions;
