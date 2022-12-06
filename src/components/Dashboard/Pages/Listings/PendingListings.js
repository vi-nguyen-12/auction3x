import React, { useState, useEffect } from "react";
import { Table, Button, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import Paginations from "../../../Paginations";

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
  searchBy,
  search,
  setMessage,
}) {
  const user = useSelector((state) => state.user);
  const [pendingListings, setPendingListings] = useState([]);
  const [newPendingListings, setNewPendingListings] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);

  useEffect(() => {
    const fetchPendingListings = async () => {
      const id = user._id;
      await authService.sellerPendingAuctions(id).then((res) => {
        if (res.data.error) {
          if (res.data.error === "Invalid Token") {
            window.location.reload();
          } else {
            setMessage("");
            setMessage(res.data.error);
          }
        } else {
          setPendingListings(res.data);
          setNewPendingListings(res.data);
        }
      });
    };
    fetchPendingListings();
  }, [refresh, setMessage, user._id]);

  useEffect(() => {
    if (search) {
      if (searchBy === "id") {
        setNewPendingListings(
          pendingListings.filter((listing) =>
            listing._id.toLowerCase().includes(search?.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewPendingListings(
          pendingListings.filter((listing) =>
            listing.type.toLowerCase().includes(search?.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        const results = pendingListings.filter((listing) =>
          Object.values(listing.property?.details?.property_address)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

        setNewPendingListings(results);
      }
    } else {
      setNewPendingListings(pendingListings);
    }
  }, [search, searchBy, pendingListings]);

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
              <th>Property ID</th>
              <th>Property</th>
              <th>Edit Property Details</th>
              <th>Documents</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          {pageContent.length > 0 ? (
            pageContent[currentPageContent].map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>*****{auction._id.slice(auction._id.length - 5)}</td>
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
                        alt="property"
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
                      className="rounded-0"
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
                      className="btn btn-primary rounded-0"
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
                          borderRadius: "0",
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
      <Row className="d-flex justify-content-end align-items-center">
        <Paginations
          data={newPendingListings}
          setCurrentPageContents={setCurrentPageContents}
          setPageContents={setPageContents}
        />
      </Row>
    </Container>
  );
}

export default PendingListings;
