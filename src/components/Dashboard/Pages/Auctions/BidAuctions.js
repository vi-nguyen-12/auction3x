import React, { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import authService from "../../../../services/authServices";

function BidAuctions({ windowSize }) {
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
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      <Row>
        <h1>Bid Auctions</h1>
        <Table
          striped
          borderless
          hover
          style={{
            overflow: windowSize < 800 ? "auto" : "hidden",
            display: windowSize < 800 && "block",
            tableLayout: windowSize < 800 && "auto",
            padding: "0",
            borderRadius: "5px",
            boxShadow: "#d7c4c4 0px 0px 20px 16px",
            marginTop: "50px",
          }}
        >
          <thead style={{ background: "black", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Auction ID</th>
              <th>Property Address</th>
              <th colSpan={2}>Auction Status</th>
              <th colSpan={2}>Auction Highest Bid</th>
              <th colSpan={2}>Your Highest Bid</th>
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
                  <td colSpan={2}>
                    Ongoing
                    <br />
                    <span style={{ color: "green" }}>
                      {new Date(auction.auctionEndDate).toLocaleDateString()}
                    </span>
                  </td>
                ) : (
                  <td colSpan={2}>
                    Ended
                    <br />
                    <span style={{ color: "red" }}>
                      {new Date(auction.auctionEndDate).toLocaleDateString()}
                    </span>
                  </td>
                )}
                <td colSpan={2}>
                  <NumberFormat
                    value={auction.winner ? auction.winner.amount : 0}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
                <td colSpan={2}>
                  {" "}
                  <NumberFormat
                    value={auction.bids[auction.bids.length - 1].amount}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"$"}
                  />
                </td>
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
      </Row>
    </Container>
  );
}

export default BidAuctions;
