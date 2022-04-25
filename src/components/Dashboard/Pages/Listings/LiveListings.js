import React, { useState, useEffect } from "react";
import { Row, Col, Container, Table, Tab } from "react-bootstrap";
import { useSelector } from "react-redux";
import SavedAuctionsCard from "../Auctions/SavedAuctionsCard";
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
      <h1>Upcoming Listings</h1>
      <Row>
        <Table
          striped
          borderless
          hover
          style={{
            overflow: "hidden",
            borderRadius: "5px",
            boxShadow: "#d7c4c4 0px 0px 20px 16px",
            marginTop: "50px",
            width: "70vw",
          }}
        >
          <thead style={{ background: "black", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Property ID</th>
              <th>Property Address</th>
              <th colSpan={2}>Auction Status</th>
              <th colSpan={2}>Auction Highest Bid</th>
              <th colSpan={2}>Your Highest Bid</th>
              <th>Property Type</th>
              <th>Bid</th>
            </tr>
          </thead>
          {upcomingListings.length > 0 &&
            upcomingListings.map((listing, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{listing._id}</td>
                  <td>{listing.address}</td>
                  <td>{listing.auctionStatus}</td>
                  <td>{listing.highestBid}</td>
                  <td>{listing.yourHighestBid}</td>
                  <td>{listing.propertyType}</td>
                  <td>{listing.bid}</td>
                </tr>
              </tbody>
            ))}
        </Table>
      </Row>
      <Row>
        <ApprovedListings />
      </Row>
    </Container>
  );
}

export default LiveListings;
