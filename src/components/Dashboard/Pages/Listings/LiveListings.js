import React, { useState, useEffect } from "react";
import { Row, Container, Table, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import ApprovedListings from "./ApprovedListings";
import { useHistory } from "react-router-dom";
import CloseButton from "react-bootstrap/CloseButton";

function LiveListings({ windowSize }) {
  const user = useSelector((state) => state.user);
  const history = useHistory();
  const [upcomingListings, setUpcomingListings] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const [documents, setDocuments] = useState([]);
  const [property, setProperty] = useState([]);
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
                <th>Property Address</th>
                <th colSpan={2}>Property Status</th>
                <th colSpan={2}>Property Documents</th>
                <th>Property Type</th>
                <th>Email</th>
              </tr>
            </thead>
            {upcomingListings.length > 0 ? (
              upcomingListings.map((listing, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{listing._id}</td>
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
                          onClick={() => {
                            setProperty(listing);
                            toggleImages();
                          }}
                          src={
                            listing.images.length > 0
                              ? listing.images[0].url
                              : ""
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
                    <td colSpan={2}>
                      <Button
                        onClick={() => {
                          setProperty(listing);
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
          <ApprovedListings windowSize={windowSize} />
        </Row>
      </Container>

      <Modal size="lg" show={showDocuments} onHide={toggleDocuments} centered>
        <Modal.Header closeButton>
          <Modal.Title>Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table
            style={{
              overflow: windowSize < 800 ? "auto" : "hidden",
              display: windowSize < 800 && "block",
              tableLayout: windowSize < 800 && "auto",
              padding: "0",
            }}
          >
            <thead>
              <tr>
                <th>#</th>
                <th>Document Name</th>
                <th>Document Official Name</th>
                <th>Document Status</th>
                <th>Document URL</th>
              </tr>
            </thead>
            {documents.length > 0 &&
              documents.map((document, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{document.name}</td>
                    <td>{document.officialName}</td>
                    {document.isVerified === "pending" ? (
                      <td>Pending</td>
                    ) : document.isVerified === "success" ? (
                      <td>Approved</td>
                    ) : document.isVerified === "fail" ? (
                      <td>Rejected</td>
                    ) : null}
                    <td>
                      <Button
                        onClick={() => {
                          window.open(document.url, "_blank");
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </Table>
        </Modal.Body>
      </Modal>

      <Modal size="lg" show={showImages} onHide={toggleImages} centered>
        <Modal.Header className="auction-modal-header">
          <Modal.Title className="auction-modal-title px-3">
            Property Details
          </Modal.Title>
        </Modal.Header>
        <div
          style={{
            position: "absolute",
            top: windowSize < 600 ? "0" : "25px",
            right: windowSize < 600 ? "0" : "25px",
            zIndex: "999",
          }}
        >
          <CloseButton
            className="modal-close"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              toggleImages();
            }}
          />
        </div>
        <Modal.Body>
          {/* <Table>
            <thead>
              <tr>
                <th>#</th>
                <th>Image Name</th>
                <th>Image Status</th>
                <th>Image URL</th>
              </tr>
            </thead>
            {images.length > 0 &&
              images.map((image, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{image.name}</td>
                    {image.isVerified === "pending" ? (
                      <td>Pending</td>
                    ) : image.isVerified === "success" ? (
                      <td>Approved</td>
                    ) : image.isVerified === "fail" ? (
                      <td>Rejected</td>
                    ) : null}
                    <td>
                      <Button
                        onClick={() => {
                          window.open(image.url, "_blank");
                        }}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </Table> */}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default LiveListings;
