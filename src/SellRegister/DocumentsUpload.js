import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import authService from "../services/authServices";
import { Button, Row, Col, Container } from "react-bootstrap";
import "../styles/SellRegister.css";

const DocumentsUpload = ({ toogleStep, step, toogleDocuments }) => {
  const { register, handleSubmit } = useForm();
  const [doc1, setDocument1] = useState([]);
  const [doc2, setDocument2] = useState([]);
  const [doc3, setDocument3] = useState([]);
  const [doc4, setDocument4] = useState([]);
  const [doc5, setDocument5] = useState([]);
  const [doc6, setDocument6] = useState([]);
  const [doc7, setDocument7] = useState([]);
  const [doc8, setDocument8] = useState([]);

  const [loader, setLoader] = useState(false);

  const onChange1 = async (e) => {
    setLoader(true);
    const formData1 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData1.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData1).then((response) => {
      if (response.status === 200) {
        setDocument1([...doc1, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange2 = async (e) => {
    setLoader(true);

    const formData2 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData2.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData2).then((response) => {
      if (response.status === 200) {
        setDocument2([...doc2, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange3 = async (e) => {
    setLoader(true);

    const formData3 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData3.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData3).then((response) => {
      if (response.status === 200) {
        setDocument3([...doc3, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange4 = async (e) => {
    setLoader(true);

    const formData4 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData4.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData4).then((response) => {
      if (response.status === 200) {
        setDocument4([...doc4, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange5 = async (e) => {
    setLoader(true);

    const formData5 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData5.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData5).then((response) => {
      if (response.status === 200) {
        setDocument5([...doc5, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange6 = async (e) => {
    setLoader(true);

    const formData6 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData6.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData6).then((response) => {
      if (response.status === 200) {
        setDocument6([...doc6, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange7 = async (e) => {
    setLoader(true);

    const formData7 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData7.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData7).then((response) => {
      if (response.status === 200) {
        setDocument7([...doc7, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange8 = async (e) => {
    setLoader(true);

    const formData8 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData8.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData8).then((response) => {
      if (response.status === 200) {
        setDocument8([...doc8, ...response.data]);
        setLoader(false);
      }
    });
  };

  const handleDelete = (url) => () => {
    setDocument1(doc1.filter((document) => document.url !== url));
    setDocument2(doc2.filter((document) => document.url !== url));
    setDocument3(doc3.filter((document) => document.url !== url));
    setDocument4(doc4.filter((document) => document.url !== url));
    setDocument5(doc5.filter((document) => document.url !== url));
    setDocument6(doc6.filter((document) => document.url !== url));
    setDocument7(doc7.filter((document) => document.url !== url));
    setDocument8(doc8.filter((document) => document.url !== url));
  };

  const titleReport = doc1.map((document) => {
    return { ...document, officialName: "Title Report" };
  });
  const insuranceCopy = doc2.map((document) => {
    return { ...document, officialName: "Insurance Copy" };
  });
  const financialDocuments = doc3.map((document) => {
    return { ...document, officialName: "Financial Documents" };
  });
  const purchaseAgreement = doc4.map((document) => {
    return { ...document, officialName: "Purchase Agreement" };
  });
  const thirdpartyReport = doc5.map((document) => {
    return { ...document, officialName: "Third-party Report" };
  });
  const demographics = doc6.map((document) => {
    return { ...document, officialName: "Demographics" };
  });
  const marketandValuations = doc7.map((document) => {
    return { ...document, officialName: "Market and Valuations" };
  });
  const otherDocuments = doc8.map((document) => {
    return { ...document, officialName: "Other Documents" };
  });
  const documents = [
    ...titleReport,
    ...insuranceCopy,
    ...financialDocuments,
    ...purchaseAgreement,
    ...thirdpartyReport,
    ...demographics,
    ...marketandValuations,
    ...otherDocuments,
  ];
  console.log(documents);
  const onSubmit = async (data) => {
    if (
      doc1.length === 0 ||
      doc2.length === 0 ||
      doc3.length === 0 ||
      doc4.length === 0 ||
      doc5.length === 0 ||
      doc6.length === 0 ||
      doc7.length === 0 ||
      doc8.length === 0
    ) {
      alert("Please upload atleast one image");
    } else {
      toogleStep(step + 1);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="upload-box-docu">
      <div className="sell-top">
        <div className="circle-1">
          <p className="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div className="line-1"></div>
        <div className="circle-2">
          <p className="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div className="line-2"></div>
        <div className="circle-3">
          <p className="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div className="line-3"></div>
        <div className="circle-4">
          <p className="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">05</p>
          <span className="spnn">Agreement</span>
        </div>
        {/* <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div> */}
      </div>
      <div className="sell-bottom-docu">
        <div className="listDetails-title">
          <h2 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
            UPLOAD DOCUMENTS
          </h2>
          <p>We only accept PDF Files</p>
        </div>
        {loader ? (
          <div className="loader">
            <div className="spinning" />
          </div>
        ) : null}

        <Container style={{ marginTop: "10%" }}>
          <Row>
            <Col className="colum">
              <div className="input-form-3">
                Title Report (.pdf)
                <input
                  id="documents-btn1"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("titleReport", { onChange: onChange1 })}
                  required
                />
                <div>
                  <label for="documents-btn1">+ Documents</label>
                </div>
                <div className="upload-list">
                  {doc1
                    ? doc1.map((document) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            X
                          </Button>
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
            <Col className="colum">
              <div className="input-form-3">
                Insurance Copy (.pdf)
                <input
                  id="documents-btn2"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("insuranceCopy", { onChange: onChange2 })}
                  required
                />
                <div>
                  <label for="documents-btn2">+ Documents</label>
                </div>
                <div className="upload-list">
                  {doc2
                    ? doc2.map((document) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            X
                          </Button>
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
            <Col className="colum">
              <div className="input-form-3">
                Financial Documents (.pdf)
                <input
                  id="documents-btn3"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("financialDocuments", { onChange: onChange3 })}
                  required
                />
                <div>
                  <label for="documents-btn3">+ Documents</label>
                </div>
                <div className="upload-list">
                  {doc3
                    ? doc3.map((document) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            X
                          </Button>
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="colum">
              <div className="input-form-3">
                Purchase Agreement (.pdf)
                <input
                  id="documents-btn4"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("purchaseAgreement", { onChange: onChange4 })}
                  required
                />
                <div>
                  <label for="documents-btn4">+ Documents</label>
                </div>
                <div className="upload-list">
                  {doc4
                    ? doc4.map((document) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            X
                          </Button>
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
            <Col className="colum">
              <div className="input-form-3">
                Third-Party Report (.pdf)
                <input
                  id="documents-btn5"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("thirdpartyReport", { onChange: onChange5 })}
                  required
                />
                <div>
                  <label for="documents-btn5">+ Documents</label>
                </div>
                <div className="upload-list">
                  {doc5
                    ? doc5.map((document) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            X
                          </Button>
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
            <Col className="colum">
              <div className="input-form-3">
                Demographics (.pdf)
                <input
                  id="documents-btn6"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("demographics", { onChange: onChange6 })}
                  required
                />
                <div>
                  <label for="documents-btn6">+ Documents</label>
                </div>
                <div className="upload-list">
                  {doc6
                    ? doc6.map((document) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            X
                          </Button>
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="colum">
              <div className="input-form-3">
                Market and Valuations (.pdf)
                <input
                  id="documents-btn7"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("marketandValuations", { onChange: onChange7 })}
                  required
                />
                <div>
                  <label for="documents-btn7">+ Documents</label>
                </div>
                <div className="upload-list">
                  {doc7
                    ? doc7.map((document) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            X
                          </Button>
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
            <Col className="colum">
              <div className="input-form-3">
                Other Documents (.pdf)
                <input
                  id="documents-btn8"
                  accept=".pdf"
                  type="file"
                  name="documents"
                  multiple
                  hidden
                  {...register("otherDocuments", { onChange: onChange8 })}
                  required
                />
                <div>
                  <label for="documents-btn8">+ Documents</label>
                </div>
                <div className="upload-list">
                  {doc8
                    ? doc8.map((document) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            X
                          </Button>
                        </span>
                      </div>
                    ))
                    : null}
                </div>
              </div>
            </Col>
          </Row>
        </Container>

        <div className="bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button
            className="nxt-btn"
            type="submit"
            onClick={() => {
              toogleDocuments(documents);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default DocumentsUpload;
