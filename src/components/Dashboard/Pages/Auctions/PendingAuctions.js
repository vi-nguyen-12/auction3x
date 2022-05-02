import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import NumberFormat from "react-number-format";

function PendingAuctions() {
  const user = useSelector((state) => state.user);
  const [PendingAuctions, setPendingAuctions] = useState([]);
  const [questionair, setQuestionair] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [showQuestionair, setShowQuestionair] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const toogleQuestionair = () => setShowQuestionair(!showQuestionair);
  const toogleDocuments = () => setShowDocuments(!showDocuments);

  useEffect(() => {
    authService.getBuyerPendingAuctions(user._id).then((res) => {
      setPendingAuctions(res.data);
    });
  }, []);

  console.log(PendingAuctions);

  return (
    <>
      <h1>Pending Auctions</h1>
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
            <th colSpan={2}>Status</th>
            <th colSpan={2}>Questionair</th>
            <th colSpan={2}>Documents</th>
            <th colSpan={2}>Approved Fund</th>
            <th>View Auction</th>
          </tr>
        </thead>
        {PendingAuctions.length > 0 &&
          PendingAuctions.map(
            (auction, index) =>
              new Date().toISOString() < auction.auctionId.auctionEndDate && (
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>
                      {auction.auctionId._id}
                      <div
                        style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "left",
                          cursor: "pointer",
                        }}
                      >
                        <img
                          width="100px"
                          height="50px"
                          src={
                            auction.auctionId.property.images.length > 0
                              ? auction.auctionId.property.images[0].url
                              : ""
                          }
                        />
                      </div>
                    </td>
                    <td colSpan={2}>
                      {auction.auctionId.property.type === "real-estate"
                        ? "Real Estate"
                        : auction.auctionId.property.type === "car"
                        ? "Car"
                        : auction.auctionId.property.type === "jet"
                        ? "Jet"
                        : auction.auctionId.property.type === "yacht"
                        ? "Yacht"
                        : ""}
                    </td>
                    <td colSpan={2}>
                      {auction.auctionId.property.details.address}
                    </td>
                    {auction.isApproved === "success" ? (
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
                    ) : auction.isApproved === "pending" ? (
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
                    ) : auction.isApproved === "fail" ? (
                      <td colSpan={2}>
                        <span
                          style={{
                            background: "red",
                            color: "white",
                            padding: "5px",
                            borderRadius: "5px",
                          }}
                        >
                          Rejected
                        </span>
                      </td>
                    ) : null}
                    <td colSpan={2}>
                      <Button
                        onClick={() => {
                          setQuestionair(auction.answers);
                          toogleQuestionair();
                        }}
                        variant="primary"
                      >
                        View
                      </Button>
                    </td>
                    <td colSpan={2}>
                      <Button
                        onClick={() => {
                          setDocuments(auction.documents);
                          toogleDocuments();
                        }}
                        variant="primary"
                      >
                        View
                      </Button>
                    </td>
                    <td colSpan={2}>
                      <NumberFormat
                        value={auction.approvedFund ? auction.approvedFund : 0}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          window.open(
                            `/DisplayAuctions/${auction.auctionId._id}`
                          );
                        }}
                        variant="primary"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                </tbody>
              )
          )}
      </Table>
      <Modal
        size="lg"
        show={showQuestionair}
        onHide={toogleQuestionair}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Questionair</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Question ID</th>
                <th>Answer</th>
              </tr>
            </thead>
            <tbody>
              {questionair.length > 0 &&
                questionair.map((question, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{question.questionId}</td>
                    <td>{question.answer}</td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
      <Modal size="lg" show={showDocuments} onHide={toogleDocuments} centered>
        <Modal.Header closeButton>
          <Modal.Title>Documents</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Document Name</th>
                <th>Document Status</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody>
              {documents.length > 0 &&
                documents.map((document, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{document.officialName}</td>
                    <td>
                      {document.isVerified === "success"
                        ? "Approved"
                        : document.isVerified === "pending"
                        ? "Pending"
                        : document.isVerified === "fail"
                        ? "Rejected"
                        : ""}
                    </td>
                    <td>
                      <Button
                        onClick={() => {
                          window.open(document.url);
                        }}
                        variant="primary"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default PendingAuctions;
