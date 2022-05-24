import React, { useState, useEffect } from "react";
import { Row, Container, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import ApprovedListings from "./ApprovedListings";

function LiveListings() {
  const user = useSelector((state) => state.user);
  const [upcomingListings, setUpcomingListings] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const toggleDocuments = () => setShowDocuments(!showDocuments);
  const toggleImages = () => setShowImages(!showImages);

  useEffect(() => {
    const fetchApprovedProperty = async () => {
      const id = user._id;
      await authService.sellerApprovedListings(id).then((res) => {
        setUpcomingListings(res.data);
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
              <th colSpan={2}>Property Status</th>
              <th colSpan={2}>Property Documents</th>
              <th>Property Type</th>
              <th>Email</th>
            </tr>
          </thead>
          {upcomingListings.length > 0 &&
            upcomingListings.map((listing, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{listing._id}</td>
                  <td>
                    {listing.type === "real-estate"
                      ? listing.details.property_address
                          .formatted_street_address
                      : listing.details.property_address}
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
                        onClick={() => {
                          toggleImages();
                        }}
                        src={
                          listing.images.length > 0 ? listing.images[0].url : ""
                        }
                      />
                    </div>
                  </td>
                  {listing.isApproved === "success" ? (
                    <td colSpan={2}>
                      <span
                        style={{
                          background: "green",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        Approved
                      </span>
                    </td>
                  ) : listing.isApproved === "pending" ? (
                    <td colSpan={2}>
                      <span
                        style={{
                          background: "orange",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        Pending
                      </span>
                    </td>
                  ) : listing.isApproved === "fail" ? (
                    <td colSpan={2}>
                      <span
                        style={{
                          background: "red",
                          color: "white",
                          padding: "5px",
                          borderRadius: "5px",
                        }}
                      >
                        Pending
                      </span>
                    </td>
                  ) : null}
                  <td colSpan={2}>
                    <Button
                      onClick={() => {
                        toggleDocuments();
                      }}
                      variant="primary"
                    >
                      View
                    </Button>
                  </td>
                  <td>
                    {listing.type === "real-estate"
                      ? "Real Estate"
                      : listing.type === "car"
                      ? "Car"
                      : listing.type === "jet"
                      ? "Jet"
                      : listing.type === "yacht"
                      ? "Yacht"
                      : ""}
                  </td>
                  <td>
                    <Button variant="primary">Email</Button>
                  </td>
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
