import React, { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import authService from "../../../../services/authServices";
import Paginations from "../../../Paginations";

function BidAuctions({ windowSize, searchBy, search, setMessage }) {
  const user = useSelector((state) => state.user);
  const [bidAuctions, setBidAuctions] = useState([]);
  const [newBidAuctions, setNewBidAuctions] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);

  useEffect(() => {
    const fetchBidAuctions = async () => {
      const id = user._id;
      await authService.getUserBidAuctions(id).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setBidAuctions(res.data);
          setNewBidAuctions(res.data);
        }
      });
    };
    fetchBidAuctions();
  }, [setMessage, user._id]);

  useEffect(() => {
    if (search) {
      if (searchBy === "id") {
        setNewBidAuctions(
          bidAuctions.filter((listing) =>
            listing._id?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewBidAuctions(
          bidAuctions.filter((listing) =>
            listing.property.type?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        setNewBidAuctions(
          bidAuctions.filter((listing) =>
            listing.property.details.property_address.formatted_street_address
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }
    } else {
      setNewBidAuctions(bidAuctions);
    }
  }, [search, searchBy, bidAuctions]);

  return (
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      <Row>
        <Table
          striped
          borderless
          hover
          style={{
            overflow: windowSize < 800 ? "auto" : "hidden",
            display: windowSize < 800 && "block",
            tableLayout: windowSize < 800 && "auto",
            padding: "0",
            boxShadow: "#d1dcee 0px 0px 20px 10px",
            marginTop: "50px",
          }}
        >
          <thead style={{ background: "black", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Auction</th>
              <th>Property Address</th>
              <th colSpan={2}>Auction Status</th>
              <th colSpan={2}>Auction Highest Bid</th>
              <th colSpan={2}>Your Highest Bid</th>
              <th>Bid</th>
            </tr>
          </thead>
          {pageContent.length > 0 ? (
            pageContent[currentPageContent].map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    *****{auction._id.slice(auction._id.length - 5)}
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
                        alt="property"
                      />
                    </div>
                  </td>
                  <td>
                    {
                      auction.property.details.property_address
                        .formatted_street_address
                    }
                  </td>
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
                      value={auction.highestBid?.amount}
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
                        className="rounded-0"
                      >
                        View
                      </Button>
                    </td>
                  )}
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td colSpan={12}>No Bid Auctions</td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>
      <Row className="d-flex justify-content-end align-items-center">
        <Paginations
          data={newBidAuctions}
          setCurrentPageContents={setCurrentPageContents}
          setPageContents={setPageContents}
        />
      </Row>
    </Container>
  );
}

export default BidAuctions;
