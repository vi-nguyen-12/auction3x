import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
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

  console.log(bidAuctions);

  return (
    <Table striped borderless hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Auction ID</th>
          <th>Property Address</th>
          <th>Auction Status</th>
          <th>Auction Highest Bid</th>
          <th>Your Highest Bid</th>
          <th>Property Type</th>
          <th>Bid</th>
        </tr>
      </thead>
      {bidAuctions.map((auction, index) => (
        <tbody key={index}>
          <tr>
            <td>{index + 1}</td>
            <td>
              {auction._id}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <img
                  width="100px"
                  height="50px"
                  src={
                    auction.property.images.length > 0
                      ? auction.property.images[0].url
                      : ""
                  }
                />
              </div>
            </td>
            <td>{auction.property.details.address}</td>
            {new Date().toISOString() < auction.auctionEndDate ? (
              <td>
                Ongoing
                <br />
                <span style={{ color: "green" }}>
                  {new Date(auction.auctionEndDate).toLocaleDateString()}
                </span>
              </td>
            ) : (
              <td>
                Ended
                <br />
                <span style={{ color: "red" }}>
                  {new Date(auction.auctionEndDate).toLocaleDateString()}
                </span>
              </td>
            )}
            <td>
              <NumberFormat
                value={auction.bids[auction.bids.length - 1].amount}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"$"}
              />
            </td>
            <td>{auction.auctionStatus}</td>
            <td>
              {auction.property.type === "real-estate"
                ? "Real Estate"
                : auction.property.type === "car"
                ? "Car"
                : auction.property.type === "jet"
                ? "Jet"
                : auction.property.type === "yacht"
                ? "Yacht"
                : ""}
            </td>
            {new Date().toISOString() < auction.auctionEndDate ? (
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    window.open(`/DisplayAuctions/${auction._id}`);
                  }}
                >
                  Bid
                </Button>
              </td>
            ) : (
              <td>
                <Button
                  variant="primary"
                  onClick={() => {
                    window.open(`/DisplayAuctions/${auction._id}`);
                  }}
                >
                  View
                </Button>
              </td>
            )}
          </tr>
        </tbody>
      ))}
    </Table>
  );
}

export default BidAuctions;
