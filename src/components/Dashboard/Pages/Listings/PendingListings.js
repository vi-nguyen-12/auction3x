import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import CloseButton from "react-bootstrap/CloseButton";
import PropertyDetails from "../../PropertyDetails";

function PendingListings({
  windowSize,
  toggleShowDocu,
  toggleShowProperty,
  setProperty,
  setDocuments,
  setImages,
  setVideos,
  setRefresh,
  refresh,
}) {
  const user = useSelector((state) => state.user);
  const [pendingListings, setPendingListings] = useState([]);

  useEffect(() => {
    const fetchPendingListings = async () => {
      const id = user._id;
      await authService.sellerPendingAuctions(id).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          setPendingListings(res.data);
        }
      });
    };
    fetchPendingListings();
  }, [refresh]);

  return (
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      <Row>
        <h1>Pending Approval</h1>
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
              <th>Property ID</th>
              <th>Property</th>
              <th>Edit Property Details</th>
              <th>Documents/Media</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          {pendingListings.length > 0 ? (
            pendingListings.map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{auction._id}</td>
                  <td>
                    {auction.details.property_address.formatted_street_address}
                    <div
                      style={{
                        width: "100%",
                        alignItems: "right",
                        cursor: "pointer",
                      }}
                    >
                      <img
                        width="100px"
                        height="50px"
                        src={auction.images[0].url}
                      />
                    </div>
                  </td>
                  <td>
                    <Button
                      variant="primary"
                      onClick={() => {
                        setProperty(auction);
                        toggleShowProperty();
                      }}
                    >
                      Edit
                    </Button>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setDocuments(auction.documents);
                        setImages(auction.images);
                        setVideos(auction.videos);
                        setProperty(auction);
                        toggleShowDocu();
                      }}
                      className="btn btn-primary"
                    >
                      View Documents
                    </button>
                  </td>
                  {auction.isApproved === "pending" ? (
                    <td>
                      <span
                        style={{
                          background: "orange",
                          color: "white",
                          padding: "10px",
                          fontWeight: "bold",
                          borderRadius: "5px",
                        }}
                      >
                        Pending
                      </span>
                    </td>
                  ) : auction.isApproved === "success" ? (
                    <td>Approved</td>
                  ) : auction.isApproved === "fail" ? (
                    <td>Rejected</td>
                  ) : null}
                  <td>{new Date(auction.updatedAt).toLocaleString()}</td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td colSpan={12}>No Pending Approval</td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>
    </Container>
  );
}

export default PendingListings;
