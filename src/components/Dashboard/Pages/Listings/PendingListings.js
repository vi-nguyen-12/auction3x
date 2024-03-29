import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";

function PendingListings() {
  const user = useSelector((state) => state.user);
  const [pendingListings, setPendingListings] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [images, setImages] = useState([]);
  const [show, setShow] = useState(false);
  const toogleShow = () => setShow(!show);
  const [showImages, setShowImages] = useState(false);
  const toogleShowImages = () => setShowImages(!showImages);

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

  return (
    <>
      <h1>Pending Approval</h1>
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
            <th>Owner Name</th>
            <th>Property Type</th>
            <th>Status</th>
            <th>Images</th>
            <th>Documents</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        {pendingListings.length > 0 &&
          pendingListings.map((auction, index) => (
            <tbody key={index}>
              <tr>
                <td>{index}</td>
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
                {auction.isApproved === "pending" ? (
                  <td>Pending</td>
                ) : auction.isApproved === "success" ? (
                  <td>Approved</td>
                ) : auction.isApproved === "fail" ? (
                  <td>Rejected</td>
                ) : null}
                <td>
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
                        setImages(auction.images);
                        toogleShowImages();
                      }}
                      src={auction.images[0].url}
                    />
                  </div>
                </td>
                <td>
                  <Button
                    onClick={() => {
                      setDocuments(auction.documents);
                      toogleShow();
                    }}
                    variant="primary"
                  >
                    View
                  </Button>
                </td>
                <td>{new Date(auction.updatedAt).toLocaleString()}</td>
              </tr>
            </tbody>
          ))}
      </Table>
      <Modal size="lg" show={show} onHide={toogleShow} centered>
        <Modal.Header closeButton>
          <Modal.Title>Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
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
      <Modal size="lg" show={showImages} onHide={toogleShowImages} centered>
        <Modal.Header closeButton>
          <Modal.Title>Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table>
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
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PendingListings;
