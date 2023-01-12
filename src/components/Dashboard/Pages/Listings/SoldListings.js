import React, { useState, useEffect, useContext } from "react";
import { Table, Row, Container } from "react-bootstrap";
import authService from "../../../../services/authServices";
import { useSelector } from "react-redux";
import Paginations from "../../../Paginations";
import { currencyText } from "../../../../App";
import NumberFormat from "react-number-format";
import axios from "axios";

function SoldListings({ windowSize, setMessage, searchBy, search }) {
  const currency = useContext(currencyText);
  const user = useSelector((state) => state.user);
  const [soldListings, setSoldListings] = useState([]);
  const [newSoldListings, setNewSoldListings] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);

  useEffect(() => {
    authService.getSellerSoldListings(user._id).then(async (res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        let soldProperties = res.data;
        if (currency !== "USD") {
          soldProperties = await Promise.all(
            soldProperties.map(async (auction) => {
              let convertedWinAmount;
              await axios
                .get(
                  `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${auction.winner?.amount}`
                )
                .then((res) => {
                  convertedWinAmount = res.data.result?.toFixed(0) || 0;
                });
              auction.winner.convertedWinAmount = convertedWinAmount;
              return auction;
            })
          );
        }
        setSoldListings(res.data);
        setNewSoldListings(res.data);
      }
    });
  }, [setMessage, user._id]);

  useEffect(() => {
    if (search) {
      if (searchBy === "id") {
        setNewSoldListings(
          soldListings.filter((listing) =>
            listing._id.toLowerCase().includes(search?.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewSoldListings(
          soldListings.filter((listing) =>
            listing.type.toLowerCase().includes(search?.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        const results = soldListings.filter((listing) =>
          Object.values(listing.property?.details?.property_address)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

        setNewSoldListings(results);
      }
    } else {
      setNewSoldListings(soldListings);
    }
  }, [search, searchBy, soldListings]);

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
              <th>Auction Start Date</th>
              <th>Auction End Date</th>
              <th>Winner</th>
              <th>View</th>
            </tr>
          </thead>
          {pageContent.length > 0 ? (
            pageContent[currentPageContent].map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    *****
                    {auction._id.slice(auction._id.length - 5)}
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-start",
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
                  <td>{new Date(auction.auctionStartDate).toLocaleString()}</td>
                  <td>{new Date(auction.auctionEndDate).toLocaleString()}</td>
                  <td>
                    <span className="fw-bold">Buyer ID: </span> *****
                    {auction.winner.buyerId.slice(
                      auction.winner.buyerId.length - 5
                    )}
                    <br />
                    <span className="fw-bold">Amount: </span> $
                    {auction.winner.amount.toLocaleString()}
                    {currency !== "USD" && (
                      <p className="text-muted p-0">
                        {currency === "INR" ? (
                          "Approx" +
                          " " +
                          parseInt(
                            auction.winner?.convertedWinAmount
                          ).toLocaleString("en-IN", {
                            style: "currency",
                            currency: "INR",
                            maximumFractionDigits: 2,
                          })
                        ) : (
                          <NumberFormat
                            value={auction.winner?.convertedWinAmount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Approx. "}
                            suffix={" " + currency}
                          />
                        )}
                      </p>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary rounded-0"
                      onClick={() => {
                        window.open(`/DisplayAuctions/${auction._id}`);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td colSpan={12}>No Sold Properties</td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>
      <Row className="d-flex justify-content-end align-items-center">
        <Paginations
          data={newSoldListings}
          setCurrentPageContents={setCurrentPageContents}
          setPageContents={setPageContents}
        />
      </Row>
    </Container>
  );
}

export default SoldListings;
