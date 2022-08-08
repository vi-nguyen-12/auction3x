import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Row,
  Col,
  Container,
  Form,
} from "react-bootstrap";
import { useSelector } from "react-redux";
import authService from "../../../../services/authServices";
import NumberFormat from "react-number-format";
import CloseButton from "react-bootstrap/CloseButton";
import Loading from "../../../Loading";

function PendingAuctions({ windowSize }) {
  const user = useSelector((state) => state.user);
  const [pendingAuctions, setPendingAuctions] = useState([]);
  const [edit, setEdit] = useState();
  const [editFund, setEditFund] = useState(false);
  const [questionair, setQuestionair] = useState([]);
  const [fundType, setFundType] = useState("");
  const [loader, setLoader] = useState(false);
  const [doc, setDoc] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [showQuestionair, setShowQuestionair] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const toggleQuestionair = () => setShowQuestionair(!showQuestionair);
  const toggleDocuments = () => setShowDocuments(!showDocuments);

  useEffect(() => {
    const getBuyerPendingAuctions = async () => {
      await authService.getBuyerInfo(user._id).then((res) => {
        setPendingAuctions(res.data);
      });
    };
    getBuyerPendingAuctions();
  }, []);

  const handleFile = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }

    await authService.saveDocuments(formData).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setDoc([...doc, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const handleFundFile = async (e) => {
    if (fundType === "") {
      alert("Please select a document type");
    } else {
      setLoader(true);
      const formData = new FormData();

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("documents", e.target.files[i]);
      }

      await authService.saveDocuments(formData).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const document = response.data.map((document) => {
            return { ...document, officialName: fundType };
          });
          setDocuments([...documents, ...document]);
          setLoader(false);
        }
      });
      e.target.value = null;
    }
  };

  const handleDeleteDocu = (id) => {
    setDoc(doc.filter((doc) => doc._id !== id));
  };

  const handleDeleteFund = (id) => {
    setDocuments(documents.filter((doc) => doc._id !== id));
  };

  // useEffect(() => {
  //   if (pendingAuctions && approvedAuctions) {
  //     setAllAuctions([...pendingAuctions, ...approvedAuctions]);
  //   }
  // }, [pendingAuctions, approvedAuctions]);

  console.log(pendingAuctions);

  return (
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      {loader && <Loading />}
      <Row>
        <h1>Buyer Approval</h1>
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
              <th>Auction ID</th>
              {/* <th colSpan={2}>Property Type</th> */}
              <th colSpan={2}>Property Address</th>
              <th colSpan={2}>Questionair</th>
              <th colSpan={2}>Documents</th>
              <th colSpan={2}>Total Approved Fund</th>
              <th>View Auction</th>
            </tr>
          </thead>
          {pendingAuctions.length > 0 ? (
            pendingAuctions.map((auction, index) => (
              <tbody key={index}>
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {auction._id}
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
                          auction.property.images.length > 0
                            ? auction.property.images[0].url
                            : ""
                        }
                      />
                    </div>
                  </td>
                  {/* <td colSpan={2}>
                    {auction.property.type === "real-estate"
                      ? "Real Estate"
                      : auction.property.type === "car"
                      ? "Car"
                      : auction.property.type === "jet"
                      ? "Jet"
                      : auction.property.type === "yacht"
                      ? "Yacht"
                      : ""}
                  </td> */}
                  <td colSpan={2}>
                    {
                      auction.property.details.property_address
                        .formatted_street_address
                    }
                  </td>
                  <td colSpan={2}>
                    <Button
                      onClick={() => {
                        setQuestionair(auction.buyer.answers);
                        setDocuments(auction.buyer.funds);
                        toggleQuestionair();
                      }}
                      variant="primary"
                    >
                      View
                    </Button>
                  </td>
                  <td colSpan={2}>
                    <Button
                      onClick={() => {
                        setDocuments(auction.buyer.funds);
                        setQuestionair(auction.buyer.answers);
                        toggleDocuments();
                      }}
                      variant="primary"
                    >
                      View
                    </Button>
                  </td>
                  <td colSpan={2}>
                    {auction.buyer.funds.length > 0 ? (
                      <NumberFormat
                        value={auction.buyer.funds.reduce(
                          (acc, curr) => acc + curr.amount,
                          0
                        )}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                    ) : (
                      "No Funds"
                    )}
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
                <td colSpan={12}>No Pending Approval</td>
              </tr>
            </tbody>
          )}
        </Table>
        <Modal
          size="xl"
          show={showQuestionair}
          onHide={toggleQuestionair}
          centered
        >
          <Modal.Header className="auction-modal-header">
            <Modal.Title className="auction-modal-title px-3">
              Questionair
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
                toggleQuestionair();
              }}
            />
          </div>
          <Modal.Body>
            <>
              <Table
                striped
                borderless
                hover
                style={{
                  overflow: windowSize < 800 ? "auto" : "hidden",
                  display: windowSize < 800 && "block",
                  tableLayout: windowSize < 800 && "auto",
                  padding: "0",
                }}
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid black" }}>
                    <th>#</th>
                    <th>Question ID</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Files</th>
                    <th>Edit</th>
                    {/* <th>Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {questionair.length > 0 &&
                    questionair.map((question, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>
                          *****
                          {question.questionId.slice(
                            question.questionId.length - 5
                          )}
                        </td>
                        <td>{question.question}</td>
                        {edit === index ? (
                          <td>
                            <input
                              type="text"
                              className="form-control"
                              value={question.answer}
                              onChange={(e) => {
                                setQuestionair(
                                  questionair.map((q, i) => {
                                    if (i === index) {
                                      return {
                                        ...q,
                                        answer: e.target.value,
                                      };
                                    } else {
                                      return q;
                                    }
                                  })
                                );
                              }}
                            />
                          </td>
                        ) : (
                          <td>{question.answer}</td>
                        )}
                        {edit === index ? (
                          <td>
                            <input
                              type="file"
                              id="fileEdit"
                              onChange={handleFile}
                              multiple
                              hidden
                            />
                            <label
                              htmlFor="fileEdit"
                              className="btn btn-primary"
                              onClick={(e) => console.log(question.files)}
                            >
                              Upload
                            </label>
                            <div>
                              {doc.map((file, index) => (
                                <div key={index}>
                                  <span>{file.name}</span>
                                  <Button
                                    onClick={() => handleDeleteDocu(file._id)}
                                    className="bg-transparent border-0 text-danger fw-bold"
                                  >
                                    X
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </td>
                        ) : (
                          <td>
                            {question.files.length > 0
                              ? question.files.map((doc, index) => (
                                  <div key={doc._id}>
                                    <a
                                      href={doc.url}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{
                                        fontSize: "0.7rem",
                                        background: "transparent",
                                        color: "blue",
                                      }}
                                    >
                                      {doc.name}
                                    </a>
                                  </div>
                                ))
                              : "No files"}
                          </td>
                        )}
                        <td>
                          {edit === index ? (
                            <Button
                              onClick={() => setEdit()}
                              className="bg-danger border-0"
                            >
                              Edit
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                setEdit(index);
                                setDoc(question.files);
                              }}
                              variant="primary"
                            >
                              Edit
                            </Button>
                          )}
                          {edit === index && (
                            <Button
                              onClick={() => setEdit()}
                              className="mx-2 bg-success border-0"
                            >
                              Save
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              {/* <Row>
                {edit && (
                  <>
                    <Col>
                      <Form.Select onChange={(e) => getAnswer(e.target.value)}>
                        <option value="">Question ID</option>
                        {questionair.map((question, index) => (
                          <option key={index} value={question.questionId}>
                            *****
                            {question.questionId.slice(
                              question.questionId.length - 5
                            )}
                          </option>
                        ))}
                      </Form.Select>
                    </Col>
                    <Col>
                      <Form.Control
                        type="text"
                        defaultValue={answer?.answer}
                        onChange={(e) => (answer.answer = e.target.value)}
                      />
                    </Col>
                    <Col>
                      <Form.Control
                        type="file"
                        placeholder="Files"
                        // value={files}
                        // onChange={(e) => setFiles(e.target.files)}
                      />
                    </Col>
                  </>
                )}
                <Col className="d-flex justify-content-end">
                  <Button onClick={() => setEdit(!edit)}>Edit</Button>
                </Col>
              </Row> */}
            </>
          </Modal.Body>
        </Modal>

        <Modal size="xl" show={showDocuments} onHide={toggleDocuments} centered>
          <Modal.Header className="auction-modal-header">
            <Modal.Title
              className="auction-modal-title px-3"
              style={{ fontSize: "2rem" }}
            >
              Proof of Funds
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
                toggleDocuments();
              }}
            />
          </div>
          <Modal.Body>
            <>
              <Table
                style={{
                  overflow: windowSize < 800 ? "auto" : "hidden",
                  display: windowSize < 800 && "block",
                  tableLayout: windowSize < 800 && "auto",
                  padding: "0",
                }}
                striped
                borderless
                hover
              >
                <thead>
                  <tr style={{ borderBottom: "2px solid black" }}>
                    <th>#</th>
                    <th>Document Name</th>
                    <th>Document Type</th>
                    <th>Document Status</th>
                    <th>Approved Amount</th>
                    <th>View Document</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {documents.length > 0 &&
                    documents.map((document, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{document.document?.name || document.name}</td>
                        <td>
                          {document.document?.officialName ||
                            document.officialName}
                        </td>
                        <td>
                          {document.document?.isVerified === "success"
                            ? "Approved"
                            : document.document?.isVerified === "pending"
                            ? "Pending"
                            : document.document?.isVerified === "fail"
                            ? "Rejected"
                            : ""}
                        </td>
                        <td>
                          <NumberFormat
                            value={document?.amount}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"$"}
                          />
                        </td>
                        <td>
                          <Button
                            onClick={() => {
                              window.open(
                                document.document?.url || document.url,
                                "_blank"
                              );
                            }}
                            variant="primary"
                          >
                            View
                          </Button>
                        </td>
                        <td>
                          <Button
                            className="bg-transparent border-0 text-danger fw-bold"
                            style={{ fontSize: "1.3rem" }}
                            onClick={() => handleDeleteFund(document._id)}
                            disabled={!editFund}
                          >
                            X
                          </Button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
              <Row>
                {editFund && (
                  <>
                    <Col>
                      <Form.Select
                        onChange={(e) => setFundType(e.target.value)}
                      >
                        <option value="">Document Type</option>
                        <option value="bank_statement">Bank Statement</option>
                        <option value="brokerage_account_statement">
                          Brokerage Account Statement
                        </option>
                        <option value="line_of_credit_doc">
                          Line Of Credit Document
                        </option>
                      </Form.Select>
                    </Col>
                    <Col>
                      <input
                        type="file"
                        id="funds"
                        accept=".pdf"
                        multiple
                        hidden
                        onChange={handleFundFile}
                      />
                      <label htmlFor="funds" className="btn btn-primary">
                        Upload
                      </label>
                    </Col>
                  </>
                )}

                <Col className="d-flex justify-content-end">
                  <Button onClick={() => setEditFund(!editFund)}>Edit</Button>
                </Col>
              </Row>
              {editFund && (
                <Row>
                  <Col>
                    <div>
                      {documents.map((file, index) => (
                        <div key={index}>
                          <span>{file.document?.name || file.name}</span>
                          <Button
                            onClick={() => handleDeleteFund(file._id)}
                            className="bg-transparent border-0 text-danger fw-bold"
                          >
                            X
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Col>
                </Row>
              )}
            </>
          </Modal.Body>
        </Modal>
      </Row>
    </Container>
  );
}

export default PendingAuctions;
