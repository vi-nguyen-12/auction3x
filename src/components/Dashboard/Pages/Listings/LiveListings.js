import React, { useState, useEffect } from "react";
import { Row, Container, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import ApprovedListings from "./ApprovedListings";
import { useHistory } from "react-router-dom";
import Paginations from "../../../Paginations";

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
  setMessage,
}) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [upcomingListings, setUpcomingListings] = useState([]);
  const [newUpcomingListings, setNewUpcomingListings] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);

  useEffect(() => {
    const fetchApprovedProperty = async () => {
      const id = user._id;
      await authService.sellerApprovedListings(id).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setUpcomingListings(res.data);
          setNewUpcomingListings(res.data);
        }
      });
    };
    fetchApprovedProperty();
  }, [setMessage, user._id]);

  useEffect(() => {
    if (search) {
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
        const results = upcomingListings.filter((listing) =>
          Object.values(listing.property?.details?.property_address)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

        setNewUpcomingListings(results);
      }
    } else {
      setNewUpcomingListings((pre) => [...upcomingListings]);
    }
  }, [search, searchBy, upcomingListings]);

  return (
    <>
      <Container className="vh-100 vw-100 mt-4">
        <Row>
          <h3>
            <ins>Upcoming Listings</ins>
          </h3>
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
            <thead
              style={{ background: "black", color: "white", padding: "50px" }}
            >
              <tr>
                <th>#</th>
                <th>Property ID</th>
                <th>Property</th>
                <th>Edit Property</th>
                <th colSpan={2}>Documents</th>
                <th colSpan={2}>Property Status</th>
                <th>Email</th>
              </tr>
            </thead>
            {pageContent.length > 0 ? (
              pageContent[currentPageContent].map((listing, index) => (
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
                          alt="property"
                        />
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="primary"
                        className="rounded-0"
                        onClick={() => {
                          setProperty(listing);
                          toggleShowProperty();
                        }}
                      >
                        View
                      </Button>
                    </td>
                    <td colSpan={2}>
                      <Button
                        variant="primary"
                        className="rounded-0"
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
                            borderRadius: "0",
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
                            borderRadius: "0",
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
                            borderRadius: "0",
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
                        className="rounded-0"
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
        <Row className="d-flex justify-content-end align-items-center">
          <Paginations
            data={newUpcomingListings}
            setCurrentPageContents={setCurrentPageContents}
            setPageContents={setPageContents}
          />
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
            setMessage={setMessage}
          />
        </Row>
      </Container>
    </>
  );
}

export default LiveListings;
