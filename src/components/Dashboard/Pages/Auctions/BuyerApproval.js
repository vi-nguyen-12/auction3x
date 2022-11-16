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
import Paginations from "../../../Paginations";

function BuyerApproval({ windowSize, searchBy, search, setMessage }) {
  const user = useSelector((state) => state.user);
  const [pendingAuctions, setPendingAuctions] = useState([]);
  const [newPendingAuctions, setNewPendingAuctions] = useState([]);
  const [edit, setEdit] = useState();
  const [editFund, setEditFund] = useState(false);
  const [questionair, setQuestionair] = useState([]);
  const [buyerId, setBuyerId] = useState();
  const [fundType, setFundType] = useState("");
  const [loader, setLoader] = useState(false);
  const [doc, setDoc] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [oldFund, setOldFund] = useState([]);
  const [showQuestionair, setShowQuestionair] = useState(false);
  const [showDocuments, setShowDocuments] = useState(false);
  const [pageContent, setPageContents] = useState([]);
  const [currentPageContent, setCurrentPageContents] = useState(0);
  const toggleQuestionair = () => setShowQuestionair(!showQuestionair);
  const toggleDocuments = () => setShowDocuments(!showDocuments);

  useEffect(() => {
    const getBuyerPendingAuctions = async () => {
      await authService.getBuyerInfo(user._id).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setPendingAuctions(res.data);
          setNewPendingAuctions(res.data);
        }
      });
    };
    getBuyerPendingAuctions();
  }, [setMessage, user._id]);

  useEffect(() => {
    if (search) {
      if (searchBy === "id") {
        setNewPendingAuctions(
          pendingAuctions.filter((listing) =>
            listing._id?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "propType") {
        setNewPendingAuctions(
          pendingAuctions.filter((listing) =>
            listing.property.type?.includes(search.toLowerCase())
          )
        );
      } else if (searchBy === "address") {
        setNewPendingAuctions(
          pendingAuctions.filter((listing) =>
            listing.property.details.property_address.formatted_street_address
              ?.toLowerCase()
              .includes(search.toLowerCase())
          )
        );
      }
    } else {
      setNewPendingAuctions(pendingAuctions);
    }
  }, [search, searchBy, pendingAuctions]);

  // Questionair files handler
  const handleFile = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }

    await authService.saveDocuments(formData).then((response) => {
      if (response.data.error) {
        setMessage("");
        setMessage(response.data.error);
        setLoader(false);
      } else {
        setDoc([...doc, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  // Proof of Funds
  const handleFundFile = async (e) => {
    if (fundType === "") {
      setMessage("");
      setTimeout(() => {
        setMessage("Please select a document type");
      }, 100);
    } else {
      setLoader(true);
      const formData = new FormData();

      for (let i = 0; i < e.target.files.length; i++) {
        formData.append("documents", e.target.files[i]);
      }

      await authService.saveDocuments(formData).then((response) => {
        if (response.data.error) {
          if (response.data.error === "Invalid Token") {
            window.location.reload();
          } else {
            setMessage("");
            setMessage(response.data.error);
            setLoader(false);
          }
        } else {
          const docu = documents.map((item) => {
            delete item.document?.isVerified;
            return item?.document || item;
          });

          const document = response.data.map((document) => {
            return { ...document, officialName: fundType, isSelf: true };
          });

          setDocuments([...docu, ...document]);
          setLoader(false);
        }
      });
      e.target.value = null;
    }
  };

  // delete questionair file
  const handleDeleteDocu = (id) => {
    setDoc(doc.filter((doc) => doc._id !== id));
  };

  // delete fund file
  const handleDeleteFund = (id) => {
    setDocuments(documents.filter((doc, index) => index !== id));
  };

  // useEffect(() => {
  //   if (pendingAuctions && approvedAuctions) {
  //     setAllAuctions([...pendingAuctions, ...approvedAuctions]);
  //   }
  // }, [pendingAuctions, approvedAuctions]);

  const onSubmit = async (id, data) => {
    let answers = data.map((item) => {
      delete item.files.map((file) => {
        delete file._id;
        return file;
      });
      return {
        questionId: item.questionId,
        answer: item.answer,
        explanation: item.explanation,
        files: doc,
      };
    });

    answers = answers.map((item) => {
      if (item?.answer === "no") {
        delete item.files;
      }
      return item;
    });

    setLoader(true);
    let submitedData = {
      answers: answers,
      documents: documents.map((item) => {
        delete item.document?.isVerified;
        return item?.document || item;
      }),
    };

    await authService.editBuyer(id, submitedData).then((res) => {
      if (res.data.error) {
        if (res.data.error === "Invalid Token") {
          window.location.reload();
        } else {
          setMessage("");
          setMessage(res.data.error);
          setLoader(false);
        }
      } else {
        setMessage("");
        setMessage("Successfully Updated Buyer info");
        setLoader(false);
        window.location.reload();
      }
    });
  };

  return (
    <Container style={{ width: "100vw", height: "100vh", marginTop: "50px" }}>
      {loader && <Loading />}
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
              <th>Auction Status</th>
              <th colSpan={2}>Property Address</th>
              <th colSpan={2}>Questionair</th>
              <th colSpan={2}>Funds</th>
              <th colSpan={2}>Total Approved Fund</th>
              <th>View Auction</th>
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
                        alt="auction"
                      />
                    </div>
                  </td>
                  {auction.auctionEndDate > new Date().toISOString() &&
                  auction.auctionStartDate <= new Date().toISOString() ? (
                    <td>
                      <span
                        style={{
                          background: "green",
                          color: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Ongoing
                      </span>
                    </td>
                  ) : auction.auctionEndDate < new Date().toISOString() ? (
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
                        Ended
                      </span>
                    </td>
                  ) : (
                    <td>
                      <span
                        style={{
                          background: "orange",
                          color: "white",
                          padding: "10px",
                          borderRadius: "5px",
                          fontWeight: "bold",
                        }}
                      >
                        Upcoming
                      </span>
                    </td>
                  )}
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
                        setBuyerId(auction.buyer._id);
                        setDocuments(auction.buyer.funds);
                        setOldFund(
                          ...auction.buyer.funds.map((item) => {
                            return item.document.url;
                          })
                        );
                        toggleQuestionair();
                      }}
                      variant="primary"
                      className="rounded-0"
                    >
                      View
                    </Button>
                  </td>
                  <td colSpan={2}>
                    <Button
                      onClick={() => {
                        setDocuments(auction.buyer.funds);
                        setQuestionair(auction.buyer.answers);
                        setBuyerId(auction.buyer._id);
                        setOldFund(
                          auction.buyer.funds.map((item) => {
                            return item.document.url;
                          })
                        );
                        toggleDocuments();
                      }}
                      variant="primary"
                      className="rounded-0"
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
                <td colSpan={12}>No Pending Approval</td>
              </tr>
            </tbody>
          )}
        </Table>
        <Modal
          size="xl"
          backdrop="static"
          keyboard={false}
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
                    <th>Explanation</th>
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
                        <td>{question.questionText}</td>
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
                                        answer: e.target.value.toLowerCase(),
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
                            <textarea
                              type="text"
                              className="form-control"
                              value={question.explanation}
                              onChange={(e) => {
                                setQuestionair(
                                  questionair.map((q, i) => {
                                    if (i === index) {
                                      return {
                                        ...q,
                                        explanation: e.target.value,
                                      };
                                    } else {
                                      return q;
                                    }
                                  })
                                );
                              }}
                              disabled={
                                question.answer === "yes" ? false : true
                              }
                            />
                          </td>
                        ) : (
                          <td>
                            {question.explanation
                              ? question.explanation
                              : "N/A"}
                          </td>
                        )}

                        {edit === index ? (
                          <td>
                            <input
                              type="file"
                              id="fileEdit"
                              onChange={handleFile}
                              multiple
                              hidden
                              disabled={
                                question.answer === "yes" ? false : true
                              }
                            />
                            <label
                              htmlFor="fileEdit"
                              className="btn btn-primary rounded-0"
                              // onClick={(e) => console.log(question.files)}
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
                              className="bg-danger border-0 rounded-0"
                            >
                              Close
                            </Button>
                          ) : (
                            <Button
                              onClick={() => {
                                setEdit(index);
                                setDoc(question.files);
                                delete question.isApproved;
                                delete question._id;
                              }}
                              variant="primary"
                              className="mx-2 rounded-0"
                            >
                              Edit
                            </Button>
                          )}
                          {edit === index && (
                            <Button
                              onClick={() => onSubmit(buyerId, questionair)}
                              className="mt-2 bg-success border-0 rounded-0"
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

        <Modal
          size="xl"
          backdrop="static"
          keyboard={false}
          show={showDocuments}
          onHide={toggleDocuments}
          centered
        >
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
                    {/* <th>Delete</th> */}
                  </tr>
                </thead>
                <tbody>
                  {documents.length > 0 &&
                    documents.map((document, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{document?.document?.name || document?.name}</td>
                        <td>
                          {document?.document?.officialName ||
                            document?.officialName}
                        </td>
                        <td>
                          {document?.document?.isVerified === "success"
                            ? "Approved"
                            : document?.document?.isVerified === "pending"
                            ? "Pending"
                            : document?.document?.isVerified === "fail"
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
                            className="rounded-0"
                          >
                            View
                          </Button>
                        </td>
                        {/* <td>
                          <Button
                            className="bg-transparent border-0 text-danger fw-bold"
                            style={{ fontSize: "1.3rem" }}
                            onClick={() => handleDeleteFund(index)}
                            disabled={!editFund}
                          >
                            X
                          </Button>
                        </td> */}
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
                    {/* <Col>
                      <span>Do you own this proof of fund?</span>
                      <div>
                        <input
                          checked={isSelf ? true : false}
                          type="radio"
                          id="yes"
                          value={true}
                          className="mx-2"
                          onChange={(e) => setIsSelf(true)}
                        />
                        <label htmlFor="yes">Yes</label>
                        <input
                          checked={!isSelf ? true : false}
                          type="radio"
                          id="no"
                          value={false}
                          className="mx-2"
                          onChange={(e) => setIsSelf(false)}
                        />
                        <label htmlFor="no">No</label>
                      </div>
                    </Col> */}
                    <Col>
                      <input
                        type="file"
                        id="funds"
                        accept=".pdf"
                        multiple
                        hidden
                        onChange={handleFundFile}
                      />
                      <label
                        htmlFor="funds"
                        className="btn btn-primary rounded-0"
                      >
                        Upload
                      </label>
                    </Col>
                  </>
                )}

                <Col className="d-flex justify-content-end">
                  {editFund && (
                    <Button
                      className="mx-2 bg-success border-0 rounded-0"
                      onClick={() => onSubmit(buyerId, questionair)}
                    >
                      Save
                    </Button>
                  )}
                  {editFund ? (
                    <Button
                      className="mx-2 bg-danger border-0 rounded-0"
                      onClick={() => setEditFund(!editFund)}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <Button
                      className="mx-2 rounded-0"
                      onClick={() => setEditFund(!editFund)}
                    >
                      Edit
                    </Button>
                  )}
                </Col>
              </Row>
              {editFund && (
                <Row>
                  <Col>
                    <div>
                      {documents.map((file, index) => (
                        <div key={index}>
                          <span>{file?.document?.name || file?.name}</span>
                          {!oldFund.find((old) =>
                            old === file?.url ? file?.url : file?.document?.url
                          ) ? (
                            <Button
                              onClick={() => handleDeleteFund(index)}
                              className="bg-transparent border-0 text-danger fw-bold"
                            >
                              X
                            </Button>
                          ) : null}
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
      <Row className="d-flex justify-content-end align-items-center">
        <Paginations
          data={newPendingAuctions}
          setPageContents={setPageContents}
          setCurrentPageContents={setCurrentPageContents}
        />
      </Row>
    </Container>
  );
}

export default BuyerApproval;
