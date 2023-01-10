import React, { useState, useEffect, useContext } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import authService from "../../../../services/authServices";
import Paginations from "../../../Paginations";
import { currencyText } from "../../../../App";
import axios from "axios";

function BidAuctions({ windowSize, searchBy, search, setMessage }) {
  const user = useSelector((state) => state.user);
  const currency = useContext(currencyText);
  const [bidAuctions, setBidAuctions] = useState([]);
  const [newBidAuctions, setNewBidAuctions] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);

  useEffect(() => {
    const fetchBidAuctions = async () => {
      const id = user._id;
      await authService.getUserBidAuctions(id).then(async (res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          let bidAuctions = res.data;
          if (currency !== "USD") {
            bidAuctions = await Promise.all(
              bidAuctions.map(async (auction) => {
                let convertedHighestBid;
                let convertedYourHighestBid;
                await axios
                  .get(
                    `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${auction.highestBid?.amount}`
                  )
                  .then((res) => {
                    convertedHighestBid = res.data.result?.toFixed(0) || 0;
                  });

                await axios
                  .get(
                    `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${
                      auction.bids[auction.bids.length - 1].amount
                    }`
                  )
                  .then((res) => {
                    convertedYourHighestBid = res.data.result?.toFixed(0) || 0;
                  });
                auction.convertedHighestBid = convertedHighestBid;
                auction.convertedYourHighestBid = convertedYourHighestBid;
                return auction;
              })
            );
          }
          setBidAuctions(bidAuctions);
          setNewBidAuctions(bidAuctions);
        }
      });
    };
    fetchBidAuctions();
  }, [setMessage, user._id, currency]);

  useEffect(() => {
    if (search) {
      if (searchBy === "id") {
        setNewBidAuctions(
          bidAuctions.filter((listing) => listing._id?.includes(search))
        );
      } else if (searchBy === "propType") {
        setNewBidAuctions(
          bidAuctions.filter((listing) =>
            listing.property.type?.includes(search)
          )
        );
      } else if (searchBy === "address") {
        const results = bidAuctions.filter((listing) =>
          Object.values(listing.property?.details?.property_address)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

        setNewBidAuctions(results);
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
                    {currency !== "USD" && (
                      <p className="text-muted p-0">
                        {currency === "INR" ? (
                          "Approx" +
                          " " +
                          parseInt(auction?.convertedHighestBid).toLocaleString(
                            "en-IN",
                            {
                              style: "currency",
                              currency: "INR",
                              maximumFractionDigits: 2,
                            }
                          )
                        ) : (
                          <NumberFormat
                            value={auction?.convertedHighestBid}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Approx. "}
                            suffix={" " + currency}
                          />
                        )}
                      </p>
                    )}
                  </td>
                  <td colSpan={2}>
                    {" "}
                    <NumberFormat
                      value={auction.bids[auction.bids.length - 1].amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    {currency !== "USD" && (
                      <p className="text-muted p-0">
                        {currency === "INR" ? (
                          "Approx" +
                          " " +
                          parseInt(
                            auction?.convertedYourHighestBid
                          ).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                          })
                        ) : (
                          <NumberFormat
                            value={auction?.convertedYourHighestBid}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Approx. "}
                            suffix={" " + currency}
                          />
                        )}
                      </p>
                    )}
                  </td>
                  {new Date().toISOString() < auction.auctionEndDate ? (
                    <td>
                      <Button
                        variant="primary"
                        className="rounded-0"
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
