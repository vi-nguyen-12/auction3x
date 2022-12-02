import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Row, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import NumberFormat from "react-number-format";
import authService from "../../../../services/authServices";
import Paginations from "../../../Paginations";

function WinAuctions({ windowSize, searchBy, search, setMessage }) {
  const user = useSelector((state) => state.user);
  const [winAuctions, setWinAuctions] = useState([]);
  const [newWinAuctions, setNewWinAuctions] = useState([]);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);
  const [images, setImages] = useState([]);
  const [showPic, setShowPic] = useState(false);
  const toggleShowPic = () => setShowPic(!showPic);

  useEffect(() => {
    const fetchWinAuctions = async () => {
      await authService.buyerWonAuctions(user._id).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setWinAuctions(res.data);
          setNewWinAuctions(res.data);
        }
      });
    };
    fetchWinAuctions();
  }, [setMessage, user._id]);

  useEffect(() => {
    if (search) {
      if (searchBy === "id") {
        setNewWinAuctions(
          winAuctions.filter((listing) =>
            listing._id?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewWinAuctions(
          winAuctions.filter((listing) =>
            listing.property.type?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        setNewWinAuctions(
          winAuctions.filter((listing) =>
            listing.property.details.property_address.formatted_street_address
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }
    } else {
      setNewWinAuctions(winAuctions);
    }
  }, [search, searchBy, winAuctions]);

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
              <th>Auction</th>
              <th>Property</th>
              <th>Property Address</th>
              <th>Bid Amount</th>
              <th>View</th>
            </tr>
          </thead>
          {pageContent.length > 0 ? (
            pageContent[currentPageContent].map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    *****
                    {auction._id.slice(auction._id.length - 5)}
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
                        // onClick={() => {
                        //   setImages(auction.property[0].images);
                        //   toggleShowPic();
                        // }}
                        src={
                          auction.property[0].images.length > 0
                            ? auction.property[0].images[0].url
                            : ""
                        }
                        alt="property"
                      />
                    </div>
                  </td>
                  <td>
                    {auction.property[0].type === "yacht" ? (
                      <span>
                        {auction.property[0].details.manufacturer_name}{" "}
                        {auction.property[0].details.engine_manufacture_name}{" "}
                        {auction.property[0].details.engine_type}
                      </span>
                    ) : auction.property[0].type === "car" ? (
                      <span>
                        {auction.property[0].details.year}{" "}
                        {auction.property[0].details.make}{" "}
                        {auction.property[0].details.model}
                      </span>
                    ) : auction.property[0].type === "jet" ? (
                      <span>
                        {auction.property[0].details.year_built}{" "}
                        {auction.property[0].details.aircraft_builder_name}{" "}
                        {auction.property[0].details.aircraft_model_designation}
                      </span>
                    ) : (
                      <span>
                        {
                          auction.property[0].details.property_address
                            .formatted_street_address
                        }
                        , {auction.property[0].details.property_address.state}
                      </span>
                    )}
                  </td>
                  <td>
                    {
                      auction.property[0].details.property_address
                        .formatted_street_address
                    }
                  </td>
                  <td>
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
                <td colSpan={12}>No Won Auctions</td>
              </tr>
            </tbody>
          )}
        </Table>
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
      </Row>
      <Row className="d-flex justify-content-end align-items-center">
        <Paginations
          data={newWinAuctions}
          setCurrentPageContents={setCurrentPageContents}
          setPageContents={setPageContents}
        />
      </Row>
    </Container>
  );
}

export default WinAuctions;
