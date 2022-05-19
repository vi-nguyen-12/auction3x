import React from "react";
import { Modal, Col, Row, Container } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import authService from "../../../services/authServices";
import "../../../styles/buyer.css";
import Loading from "../../../components/Loading";

const FundUpload = ({ toogleStep, step, toogleDocument, docu }) => {
  const { register, handleSubmit } = useForm();
  const [document1, setDocument1] = useState([]);
  const [document2, setDocument2] = useState([]);
  const [document3, setDocument3] = useState([]);
  // const [document4, setDocument4] = useState([]);
  const [loader, setLoader] = useState(false);

  const onChange1 = async (e) => {
    setLoader(true);
    const formData1 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData1.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData1).then((response) => {
      if (response.status === 200) {
        setDocument1([...document1, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const onChange2 = async (e) => {
    setLoader(true);
    const formData2 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData2.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData2).then((response) => {
      if (response.status === 200) {
        setDocument2([...document2, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const onChange3 = async (e) => {
    setLoader(true);
    const formData3 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData3.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData3).then((response) => {
      if (response.status === 200) {
        setDocument3([...document3, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  // const onChange4 = async (e) => {
  //   setLoader(true);
  //   const formData4 = new FormData();

  //   for (let i = 0; i < e.target.files.length; i++) {
  //     formData4.append("documents", e.target.files[i]);
  //   }
  //   await authService.saveDocuments(formData4).then((response) => {
  //     if (response.status === 200) {
  //       setDocument4([...document4, ...response.data]);
  //       setLoader(false);
  //     }
  //   });
  // };

  useEffect(() => {
    if (docu !== undefined) {
      setDocument1(
        docu ? docu.filter((doc) => doc.officialName === "bank_statement") : []
      );
      setDocument2(
        docu
          ? docu.filter(
              (doc) => doc.officialName === "brokerage_account_statement"
            )
          : []
      );
      setDocument3(
        docu
          ? docu.filter((doc) => doc.officialName === "line_of_credit_doc")
          : []
      );
    }
  }, []);

  const bankStatment = document1.map((item) => {
    return { ...item, officialName: "bank_statement", isSelf: true };
  });

  const broker = document2.map((item) => {
    return {
      ...item,
      officialName: "brokerage_account_statement",
      isSelf: true,
    };
  });

  // const crypto = document3.map((item) => {
  //   return { ...item, officialName: "crypto_account_statement" };
  // });

  const lineCredit = document3.map((item) => {
    return { ...item, officialName: "line_of_credit_doc", isSelf: true };
  });

  const handleDelete = (url) => () => {
    setDocument1(document1.filter((document) => document.url !== url));
    setDocument2(document2.filter((document) => document.url !== url));
    setDocument3(document3.filter((document) => document.url !== url));
    // setDocument4(document4.filter((document) => document.url !== url));
  };
  const documents = [...bankStatment, ...broker, ...lineCredit];

  const handleUpload = () => {
    if (documents.length >= 1) {
      toogleDocument(documents);
      toogleStep(step + 1);
    } else {
      alert("Please upload atleast one document");
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title
          style={{
            display: "grid",
            width: "100%",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <h2
            style={{
              color: "#6d6d6d",
              fontWeight: "bold",
              width: "100%",
              display: "flex",
              justifyContent: "center",
            }}
          >
            UPLOAD DOCUMENTS
          </h2>
          <p style={{ color: "black", fontSize: "14px" }}>
            *We only accept PDF Files*
          </p>
        </Modal.Title>
      </Modal.Header>
      <div
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        style={{ display: "inline", justifyContent: "center" }}
      >
        <Container>
          {loader ? <Loading /> : null}
          <Row
            style={{
              overflowX: "hidden",
              margin: "0 50px",
              color: "black",
            }}
          >
            <Row style={{ borderBottom: "#333 solid 1px" }}>
              <Col className="input-form-3">
                Bank Statement (.pdf){" "}
                <span style={{ color: "#ff0000" }}>*</span>
                <input
                  id="documents-btn1"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("document1", { onChange: onChange1 })}
                  required
                />
                <div className="upload-cover">
                  <details>
                    <summary>
                      <label htmlFor="documents-btn1">+ Documents</label>
                    </summary>
                    <div>
                      <label
                        style={{ width: "50%", marginTop: "10px" }}
                        htmlFor="documents-btn1"
                      >
                        <AiOutlinePlusCircle />
                      </label>
                    </div>
                  </details>
                </div>
              </Col>
              <Col>
                <div className="upload-list">
                  {document1
                    ? document1.map((document, index, arr) => (
                        <div key={index} className="upload-list-item">
                          <span>
                            {document.name}
                            <button
                              className="delete-btn"
                              onClick={handleDelete(document.url)}
                            >
                              <MdClose fontSize="1.5em" color="red" />
                            </button>
                          </span>
                        </div>
                      ))
                    : null}
                </div>
              </Col>
            </Row>
            <Row style={{ borderBottom: "#333 solid 1px" }}>
              <Col className="input-form-3">
                Brokerage account statement{" "}
                <span style={{ color: "#ff0000" }}>*</span>
                <input
                  id="documents-btn2"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("document2", { onChange: onChange2 })}
                  required
                />
                <div className="upload-cover">
                  <details>
                    <summary>
                      <label htmlFor="documents-btn2">+ Documents</label>
                    </summary>
                    <div>
                      <label
                        style={{ width: "50%", marginTop: "10px" }}
                        htmlFor="documents-btn2"
                      >
                        <AiOutlinePlusCircle />
                      </label>
                    </div>
                  </details>
                </div>
              </Col>
              <Col>
                <div className="upload-list">
                  {document2
                    ? document2.map((document, index, arr) => (
                        <div key={index} className="upload-list-item">
                          <span>
                            {document.name}
                            <button
                              className="delete-btn"
                              onClick={handleDelete(document.url)}
                            >
                              <MdClose fontSize="1.5em" color="red" />
                            </button>
                          </span>
                        </div>
                      ))
                    : null}
                </div>
              </Col>
            </Row>

            <Row style={{ borderBottom: "#333 solid 1px" }}>
              <Col className="input-form-3">
                Line of credit doc (.pdf){" "}
                <span style={{ color: "#ff0000" }}>*</span>
                <input
                  id="documents-btn3"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("document3", { onChange: onChange3 })}
                  required
                />
                <div className="upload-cover">
                  <details>
                    <summary>
                      <label htmlFor="documents-btn3">+ Documents</label>
                    </summary>
                    <div>
                      <label
                        style={{ width: "50%", marginTop: "10px" }}
                        htmlFor="documents-btn3"
                      >
                        <AiOutlinePlusCircle />
                      </label>
                    </div>
                  </details>
                </div>
              </Col>
              <Col>
                <div className="upload-list">
                  {document3
                    ? document3.map((document, index, arr) => (
                        <div key={index} className="upload-list-item">
                          <span>
                            {document.name}
                            <button
                              className="delete-btn"
                              onClick={handleDelete(document.url)}
                            >
                              <MdClose fontSize="1.5em" color="red" />
                            </button>
                          </span>
                        </div>
                      ))
                    : null}
                </div>
              </Col>
            </Row>
          </Row>
        </Container>

        <div
          style={{ position: "sticky", padding: "auto", marginTop: "30px" }}
          className="bottom-btn"
        >
          <button
            className="pre-btn"
            onClick={() => {
              toogleStep(step - 1);
            }}
          >
            Previous
          </button>
          <button
            className="nxt-btn"
            type="submit"
            onClick={() => {
              handleUpload();
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default FundUpload;
