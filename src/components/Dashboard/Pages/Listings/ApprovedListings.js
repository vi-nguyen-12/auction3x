import React, { useState, useEffect } from "react";
import { Row, Table, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import Paginations from "../../../Paginations";

function ApprovedListings({
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
  const [approvedLists, setApprovedLists] = useState([]);
  const [newApprovedLists, setNewApprovedLists] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);

  useEffect(() => {
    authService.sellerPropInAuctions(user._id).then((res) => {
      if (res.data.error) {
        if (res.data.error === "Invalid Token") {
          window.location.reload();
        } else {
          setMessage("");
          setMessage(res.data.error);
        }
      } else {
        setApprovedLists(res.data);
        setNewApprovedLists(res.data);
      }
    });
  }, [setMessage, user._id]);

  useEffect(() => {
    if (search) {
      if (searchBy === "id") {
        setNewApprovedLists(
          approvedLists.filter((listing) =>
            listing._id?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewApprovedLists(
          approvedLists.filter((listing) =>
            listing.type?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        const results = approvedLists.filter((listing) =>
          Object.values(listing.property?.details?.property_address)
            .join(" ")
            .toLowerCase()
            .includes(search.toLowerCase())
        );

        setNewApprovedLists(results);
      }
    } else {
      setNewApprovedLists(approvedLists);
    }
  }, [search, searchBy, approvedLists]);

  return (
    <>
      <Row>
        <h3>
          <ins>Ongoing Listings</ins>
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
              <th>Property Info</th>
              <th>Documents</th>
              <th colSpan={2}>Auction Status</th>
              <th>Property Status</th>
              {/* <th>Email</th> */}
              <th>View Auction</th>
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
                          listing.images.length > 0 ? listing.images[0].url : ""
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
                  <td>
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
                  {listing.auctionDetails.auctionEndDate >
                    new Date().toISOString() &&
                  listing.auctionDetails.auctionStartDate <=
                    new Date().toISOString() ? (
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
                        Ongoing
                      </span>
                    </td>
                  ) : listing.auctionDetails.auctionEndDate <
                    new Date().toISOString() ? (
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
                        Ended
                      </span>
                    </td>
                  ) : (
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
                        Upcoming
                      </span>
                    </td>
                  )}
                  {listing.isApproved === "success" ? (
                    <td>
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
                    <td>
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
                    <td>
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
                  {/* <td>
                  <Button
                    onClick={() => history.push("/Dashboard/Messaging")}
                    variant="primary"
                  >
                    Email
                  </Button>
                </td> */}
                  <td>
                    <Button
                      onClick={() =>
                        window.open(
                          `/DisplayAuctions/${listing.auctionDetails._id}`
                        )
                      }
                      variant="primary"
                      className="rounded-0"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))
          ) : (
            <tbody>
              <tr>
                <td colSpan={12}>No Listed Listings</td>
              </tr>
            </tbody>
          )}
        </Table>
      </Row>
      <Row className="d-flex justify-content-end align-items-center">
        <Paginations
          data={newApprovedLists}
          setCurrentPageContents={setCurrentPageContents}
          setPageContents={setPageContents}
        />
      </Row>
    </>
  );
}

export default ApprovedListings;
