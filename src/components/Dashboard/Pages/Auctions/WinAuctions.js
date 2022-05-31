import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import authService from "../../../../services/authServices";

function WinAuctions({ windowSize }) {
  const user = useSelector((state) => state.user);
  const [winAuctions, setWinAuctions] = useState([]);
  const [images, setImages] = useState([]);
  const [showPic, setShowPic] = useState(false);
  const toggleShowPic = () => setShowPic(!showPic);

  useEffect(() => {
    const fetchWinAuctions = async () => {
      const id = user._id;
      await authService.buyerWonAuctions(id).then((res) => {
        setWinAuctions(res.data);
      });
    };
    fetchWinAuctions();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100vw" }}>
      <h1>Win Auctions</h1>
      {windowSize > 800 ? (
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
              <th>Auction ID</th>
              <th colSpan={2}>Property Type</th>
              <th colSpan={2}>Property Address</th>
              <th colSpan={2}>Bid Amount</th>
              <th>View</th>
            </tr>
          </thead>
          {winAuctions.length > 0 &&
            winAuctions.map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {auction._id}
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
                          setImages(auction.property[0].images);
                          toggleShowPic();
                        }}
                        src={
                          auction.property[0].images.length > 0
                            ? auction.property[0].images[0].url
                            : ""
                        }
                        alt="property"
                      />
                    </div>
                  </td>
                  <td colSpan={2}>
                    {auction.property[0].type === "real-estate"
                      ? "Real Estate"
                      : auction.property[0].type === "car"
                      ? "Car"
                      : auction.property[0].type === "jet"
                      ? "Jet"
                      : auction.property[0].type === "yacht"
                      ? "Yacht"
                      : ""}
                  </td>
                  <td colSpan={2}>{auction.property[0].details.address}</td>
                  <td colSpan={2}>
                    <NumberFormat
                      value={auction.amount}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        window.open(`/DisplayAuctions/${auction._id}`);
                      }}
                      variant="primary"
                    >
                      View
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
        </Table>
      ) : (
        <Table striped borderless hover responsive>
          <thead style={{ background: "black", color: "white" }}>
            <tr>
              <th>#</th>
              <th>Auction</th>
              <th>View</th>
            </tr>
          </thead>
          {winAuctions.length > 0 ? (
            winAuctions.map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {auction.property[0].details.address}
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
                        src={
                          auction.property[0].images.length > 0
                            ? auction.property[0].images[0].url
                            : ""
                        }
                      />
                    </div>
                  </td>
                  <td>
                    <Button
                      onClick={() => {
                        window.open(`/DisplayAuctions/${auction._id}`);
                      }}
                      variant="primary"
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
                <td>No Auctions</td>
              </tr>
            </tbody>
          )}
        </Table>
      )}
      <Modal size="lg" show={showPic} onHide={toggleShowPic} centered>
        <Modal.Header closeButton>
          <Modal.Title>Images</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped borderless hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Image Name</th>
                <th>Image Status</th>
                <th>View Image</th>
              </tr>
            </thead>
            {images.length > 0 &&
              images.map((image, index) => (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{image.name}</td>
                    <td>
                      {image.isVerified === "success"
                        ? "Approved"
                        : image.isVerified === "pending"
                        ? "Pending"
                        : "Rejected"}
                    </td>
                    <td>
                      <Button
                        onClick={() => window.open(image.url)}
                        variant="primary"
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
    </div>
  );
}

export default WinAuctions;
