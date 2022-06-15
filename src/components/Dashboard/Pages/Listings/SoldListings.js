import React, { useState, useEffect } from "react";
import { Table, Row, Container } from "react-bootstrap";
import authService from "../../../../services/authServices";
import { useSelector } from "react-redux";

function SoldListings({ windowSize }) {
  const user = useSelector((state) => state.user);
  const [images, setImages] = useState([]);
  const [showPic, setShowPic] = useState(false);
  const toggleShowPic = () => setShowPic(!showPic);
  const [soldListings, setSoldListings] = useState([]);

  useEffect(() => {
    authService.getSellerSoldListings(user._id).then((res) => {
      setSoldListings(res.data);
    });
  }, []);

  return (
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      <Row>
        <h1>Sold Properties</h1>
        <Table
          striped
          borderless
          hover
          style={{
            overflow: "hidden",
            borderRadius: "5px",
            boxShadow: "#d7c4c4 0px 0px 20px 16px",
            marginTop: "50px",
          }}
        >
          <thead style={{ background: "black", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Auction</th>
              <th>Property</th>
              <th>Bid Amount</th>
              <th>View</th>
            </tr>
          </thead>
          {soldListings.length > 0 ? (
            soldListings.map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {auction.auctionStartDate} - {auction.auctionEndDate}
                  </td>
                  <td>
                    {auction.property.details.address}
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
                        onClick={() => {
                          setImages(auction.property.images);
                          toggleShowPic();
                        }}
                        src={
                          auction.images.length > 0 ? auction.images[0].url : ""
                        }
                      />
                    </div>
                  </td>
                  <td>{auction.bidAmount}</td>
                  <td>
                    <button
                      className="btn btn-primary"
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
                <td colSpan={6}>No Sold Properties</td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>
    </Container>
  );
}

export default SoldListings;
