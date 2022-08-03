import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import CloseButton from "react-bootstrap/CloseButton";
import PropertyDetails from "../../PropertyDetails";

function PendingListings({
  windowSize,
  toggleShowDocu,
  setDocuments,
  documents,
}) {
  const user = useSelector((state) => state.user);
  const [pendingListings, setPendingListings] = useState([]);
  const [property, setProperty] = useState([]);
  const [showImages, setShowImages] = useState(false);
  const toggleShowImages = () => setShowImages(!showImages);

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
  }, []);

  console.log(documents);

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
              <th>Owner Name</th>
              <th>Property Type</th>
              <th>Property</th>
              <th>Documents</th>
              <th>Status</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          {pendingListings.length > 0 ? (
            pendingListings.map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>{auction.details.owner_name}</td>
                  <td>
                    {auction.type === "real-estate"
                      ? "Real Estate"
                      : auction.type === "car"
                      ? "Car"
                      : auction.type === "jet"
                      ? "Jet"
                      : auction.type === "yacht"
                      ? "Yacht"
                      : ""}
                  </td>
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
                        onClick={() => {
                          setProperty(auction);
                          toggleShowImages();
                        }}
                        src={auction.images[0].url}
                      />
                    </div>
                  </td>
                  <td>
                    <button
                      onClick={() => {
                        setDocuments([
                          ...documents,
                          ...auction.documents,
                          ...auction.images,
                        ]);
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

        <Modal size="xl" show={showImages} onHide={toggleShowImages} centered>
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
                toggleShowImages();
              }}
            />
          </div>
          <Modal.Body>
            <PropertyDetails property={property} />
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
      </Row>
    </Container>
  );
}

export default PendingListings;
