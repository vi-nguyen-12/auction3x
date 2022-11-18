import React from "react";
import { Modal, Col, Row, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import authService from "../../../services/authServices";
import "../../../styles/buyer.css";
import Loading from "../../../components/Loading";

const FundUpload = ({ setStep, step, toggleDocument, docu, setMessage }) => {
  const { register } = useForm();
  const [document1, setDocument1] = useState([]);
  const [document2, setDocument2] = useState([]);
  const [document3, setDocument3] = useState([]);
  const [loader, setLoader] = useState(false);

  const onChange1 = async (e) => {
    setLoader(true);
    const formData1 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData1.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData1).then((response) => {
      if (response.data.error) {
        if (response.data.error === "Invalid Token") {
          window.location.reload();
        } else {
          setMessage("");
          setMessage(response.data.error);
        }
      } else {
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
      if (response.data.error) {
        if (response.data.error === "Invalid Token") {
          window.location.reload();
        } else {
          setMessage("");
          setMessage(response.data.error);
        }
      } else {
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
      if (response.data.error) {
        if (response.data.error === "Invalid Token") {
          window.location.reload();
        } else {
          setMessage("");
          setMessage(response.data.error);
        }
      } else {
        setDocument3([...document3, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

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
  }, [docu]);

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

  const lineCredit = document3.map((item) => {
    return { ...item, officialName: "line_of_credit_doc", isSelf: true };
  });

  const handleDelete = (url) => () => {
    setDocument1(document1.filter((document) => document.url !== url));
    setDocument2(document2.filter((document) => document.url !== url));
    setDocument3(document3.filter((document) => document.url !== url));
  };
  const documents = [...bankStatment, ...broker, ...lineCredit];

  const handleNext = () => {
    if (documents.length >= 1) {
      toggleDocument(documents);
      setStep(step + 1);
    } else {
      setMessage("");
      setTimeout(() => {
        setMessage("Please upload at least one document");
      }, 100);
    }
  };
  return (
    <>
      {loader ? <Loading /> : null}
      <Modal.Body>
        <Row>
          <Col
            md={12}
            style={{
              borderBottom: "2px solid gray",
              fontWeight: "bold",
              fontSize: "18px",
              color: "black",
              display: "flex",
              justifyContent: "flex-start",
            }}
          >
            Proof Of Funds
          </Col>
        </Row>
        <Row style={{ borderBottom: "#333 solid 1px" }} className="mt-4">
          <Col md={6} xs={12} className="input-form-3">
            Bank Statement (.pdf) <span style={{ color: "#ff0000" }}>*</span>
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
            <div className="upload-wrapper m-0">
              <details>
                <summary>
                  <label
                    htmlFor="documents-btn1"
                    className="justify-content-start"
                  >
                    + Documents
                  </label>
                </summary>
                <div className="mt-2">
                  <label className="w-100" htmlFor="documents-btn1">
                    <AiOutlinePlusCircle size={20} />
                  </label>
                </div>
              </details>
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="upload-list w-100">
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
          <Col md={6} xs={12} className="input-form-3">
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
            <div className="upload-wrapper m-0">
              <details>
                <summary>
                  <label
                    htmlFor="documents-btn2"
                    className="justify-content-start"
                  >
                    + Documents
                  </label>
                </summary>
                <div className="mt-2">
                  <label className="w-100" htmlFor="documents-btn2">
                    <AiOutlinePlusCircle size={20} />
                  </label>
                </div>
              </details>
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="upload-list w-100">
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
          <Col md={6} xs={12} className="input-form-3">
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
            <div className="upload-wrapper m-0">
              <details>
                <summary>
                  <label
                    htmlFor="documents-btn3"
                    className="justify-content-start"
                  >
                    + Documents
                  </label>
                </summary>
                <div className="mt-2">
                  <label className="w-100" htmlFor="documents-btn3">
                    <AiOutlinePlusCircle size={20} />
                  </label>
                </div>
              </details>
            </div>
          </Col>
          <Col md={6} xs={12}>
            <div className="upload-list w-100">
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
      </Modal.Body>

      <Modal.Footer>
        <Row className="mt-3">
          <Button className="pre-btn" onClick={handlePrevious}>
            Previous
          </Button>
          <Button className="nxt-btn" id="next" onClick={handleNext}>
            Next
          </Button>
        </Row>
      </Modal.Footer>
    </>
  );
};

export default FundUpload;
