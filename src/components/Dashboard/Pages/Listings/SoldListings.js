import React, { useState, useEffect } from "react";
import { Table, Row, Container } from "react-bootstrap";
import authService from "../../../../services/authServices";
import { useSelector } from "react-redux";
import Paginations from "../../../Paginations";

function SoldListings({ windowSize, setMessage, searchBy, search }) {
  const user = useSelector((state) => state.user);
  const [soldListings, setSoldListings] = useState([]);
  const [newSoldListings, setNewSoldListings] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);

  useEffect(() => {
    authService.getSellerSoldListings(user._id).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
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
        setNewSoldListings(
          soldListings.filter((listing) =>
            listing.details.property_address.formatted_street_address
              .toLowerCase()
              .includes(search?.toLowerCase())
          )
        );
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
