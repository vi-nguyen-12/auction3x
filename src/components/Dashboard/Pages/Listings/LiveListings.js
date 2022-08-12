import React, { useState, useEffect } from "react";
import { Row, Container, Table, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import ApprovedListings from "./ApprovedListings";
import { useHistory } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";

function LiveListings({
  windowSize,
  toggleShowDocu,
  toggleShowProperty,
  setProperty,
  setDocuments,
  setImages,
  setVideos,
  searchBy,
  search,
}) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [upcomingListings, setUpcomingListings] = useState([]);
  const [newUpcomingListings, setNewUpcomingListings] = useState([]);

  useEffect(() => {
    const fetchApprovedProperty = async () => {
      const id = user._id;
      await authService.sellerApprovedListings(id).then((res) => {
        setUpcomingListings(res.data);
        setNewUpcomingListings(res.data);
      });
    };
    fetchApprovedProperty();
  }, []);

  useEffect(() => {
    if (!(search === undefined || search === "")) {
      if (searchBy === "id") {
        setNewUpcomingListings(
          upcomingListings.filter((listing) =>
            listing._id?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewUpcomingListings(
          upcomingListings.filter((listing) =>
            listing.type?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        setNewUpcomingListings(
          upcomingListings.filter((listing) =>
            listing.details.property_address.formatted_street_address
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }
    } else {
      setNewUpcomingListings((pre) => [...upcomingListings]);
    }
  }, [search]);

  return (
    <>
      <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
        <Row>
          <h1>Upcoming Listings</h1>
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
            <thead
              style={{ background: "black", color: "white", padding: "50px" }}
            >
              <tr>
                <th>#</th>
                <th>Property ID</th>
                <th>Property</th>
                <th>Edit Property</th>
                <th colSpan={2}>Property Documents</th>
                <th colSpan={2}>Property Status</th>
                <th>Email</th>
              </tr>
            </thead>
            {newUpcomingListings.length > 0 ? (
              newUpcomingListings.map((listing, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>*****{listing._id.slice(listing._id.length - 5)}</td>
                    <td>
                      {listing.details.property_address
                        ?.formatted_street_address || ""}
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
                          src={
                            listing.images.length > 0
                              ? listing.images[0].url
                              : ""
                          }
                        />
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setProperty(listing);
                          toggleShowProperty();
                        }}
                      >
                        Edit
                      </Button>
                    </td>
                    <td colSpan={2}>
                      <Button
                        variant="primary"
                        onClick={() => {
                          setDocuments(listing.documents);
                          setImages(listing.images);
                          setVideos(listing.videos);
                          setProperty(listing);
                          toggleShowDocu();
                        }}
                      >
                        View
                      </Button>
                    </td>
                    {listing.isApproved === "success" ? (
                      <td colSpan={2}>
                        <span
                          style={{
                            background: "green",
                            color: "white",
                            padding: "10px",
                            borderRadius: "5px",
                            fontWeight: "bold",
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
                            padding: "10px",
                            borderRadius: "5px",
                            fontWeight: "bold",
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
                            padding: "10px",
                            borderRadius: "5px",
                            fontWeight: "bold",
                          }}
                        >
                          Pending
                        </span>
                      </td>
                    ) : null}
                    {/* <td>
                      {listing.type === "real-estate"
                        ? "Real Estate"
                        : listing.type === "car"
                        ? "Car"
                        : listing.type === "jet"
                        ? "Jet"
                        : listing.type === "yacht"
                        ? "Yacht"
                        : ""}
                    </td> */}
                    <td>
                      <Button
                        onClick={() => history.push("/Dashboard/Messaging")}
                        variant="primary"
                      >
                        Email
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))
            ) : (
              <tbody>
                <tr>
                  <td colSpan={12}>No Upcoming Listings</td>
                </tr>
              </tbody>
            )}
          </Table>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <ApprovedListings
            windowSize={windowSize}
            toggleShowDocu={toggleShowDocu}
            toggleShowProperty={toggleShowProperty}
            setProperty={setProperty}
            setDocuments={setDocuments}
            setImages={setImages}
            setVideos={setVideos}
            searchBy={searchBy}
            search={search}
          />
        </Row>
      </Container>
    </>
  );
}

export default LiveListings;
