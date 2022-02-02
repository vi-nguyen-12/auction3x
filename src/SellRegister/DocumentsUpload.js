import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import authService from "../services/authServices";
import { Button, Row, Col, Container, Table } from "react-bootstrap";
import "../styles/SellRegister.css";
import { FaCheck } from "react-icons/fa";
import { GrFormClose } from "react-icons/gr";
import { MdClose } from "react-icons/md";

const DocumentsUpload = ({ toogleStep, step, toogleDocuments }) => {
  const [hover, setHover] = useState(true);
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
    return { ...document, officialName: "title_report" };
  });
  const insuranceCopy = doc2.map((document) => {
    return { ...document, officialName: "insurance_copy" };
  });
  const financialDocuments = doc3.map((document) => {
    return { ...document, officialName: "financial_document" };
  });
  const purchaseAgreement = doc4.map((document) => {
    return { ...document, officialName: "purchase_agreement" };
  });
  const thirdpartyReport = doc5.map((document) => {
    return { ...document, officialName: "third-party_report" };
  });
  const demographics = doc6.map((document) => {
    return { ...document, officialName: "demographics" };
  });
  const marketandValuations = doc7.map((document) => {
    return { ...document, officialName: "market_and_valuations" };
  });
  const otherDocuments = doc8.map((document) => {
    return { ...document, officialName: "other_documents" };
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

  const onSubmit = async (data) => {
    toogleDocuments(documents);
    toogleStep(step + 1);
    window.scrollTo(0, 0);
  };

  return (
    <Container className="upload-box-docu">
      <Row className="sell-top">
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
      </Row>
      <Container className="sell-bottom-docu">
        <Row className="listDetails-title">
          <h2 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
            UPLOAD DOCUMENTS
          </h2>
          <p>We only accept PDF Files</p>

          {loader ? (
            <div className="loader">
              <div className="spinning" />
            </div>
          ) : null}
        </Row>
        <Row style={{ height: "1300px", overflowX: "hidden", margin: "125px" }}>
          <Row style={{ borderBottom: "#333 solid 1px" }}>
            <Col className="input-form-3">
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
              <details>
                <summary>
                  <label for="documents-btn1">+ Documents</label>
                </summary>
                <div>
                  <label for="documents-btn1">
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />
                  </label>
                </div>
              </details>
            </Col>
            <Col>
              <div className="upload-list">
                {doc1
                  ? doc1.map((document, index, arr) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover1 = true;
                              setDocument1([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover1 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument1([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover1 ? (
                              <FaCheck fontSize="1.5em" color="blue" />
                            ) : (
                              <MdClose fontSize="1.5em" color="red" />
                            )}
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
              <details>
                <summary>
                  <label for="documents-btn2">+ Documents</label>
                </summary>
                <div>
                  <label for="documents-btn2">
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />{" "}
                  </label>
                </div>
              </details>
            </Col>
            <Col>
              <div className="upload-list">
                {doc2
                  ? doc2.map((document, index, arr) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover2 = true;
                              setDocument2([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover2 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument2([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover2 ? (
                              <FaCheck fontSize="1.5em" color="blue" />
                            ) : (
                              <MdClose fontSize="1.5em" color="red" />
                            )}
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
              <details>
                <summary>
                  <label for="documents-btn3">+ Documents</label>
                </summary>
                <div>
                  <label for="documents-btn3">
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />{" "}
                  </label>
                </div>
              </details>
            </Col>
            <Col>
              <div className="upload-list">
                {doc3
                  ? doc3.map((document, index, arr) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover3 = true;
                              setDocument3([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover3 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument3([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover3 ? (
                              <FaCheck fontSize="1.5em" color="blue" />
                            ) : (
                              <MdClose fontSize="1.5em" color="red" />
                            )}
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
              <details>
                <summary>
                  <label for="documents-btn4">+ Documents</label>
                </summary>
                <div>
                  <label for="documents-btn4">
                    {" "}
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />
                  </label>
                </div>
              </details>
            </Col>
            <Col>
              <div className="upload-list">
                {doc4
                  ? doc4.map((document, index, arr) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover4 = true;
                              setDocument4([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover4 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument4([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover4 ? (
                              <FaCheck fontSize="1.5em" color="blue" />
                            ) : (
                              <MdClose fontSize="1.5em" color="red" />
                            )}
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
              <details>
                <summary>
                  <label for="documents-btn5">+ Documents</label>
                </summary>
                <div>
                  <label for="documents-btn5">
                    {" "}
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />{" "}
                  </label>
                </div>
              </details>
            </Col>
            <Col>
              <div className="upload-list">
                {doc5
                  ? doc5.map((document, index, arr) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover5 = true;
                              setDocument5([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover5 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument5([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover5 ? (
                              <FaCheck fontSize="1.5em" color="blue" />
                            ) : (
                              <MdClose fontSize="1.5em" color="red" />
                            )}
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
              <details>
                <summary>
                  <label for="documents-btn6">+ Documents</label>
                </summary>
                <div>
                  <label for="documents-btn6">
                    {" "}
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />{" "}
                  </label>
                </div>
              </details>
            </Col>
            <Col>
              <div className="upload-list">
                {doc6
                  ? doc6.map((document, index, arr) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover6 = true;
                              setDocument6([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover6 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument6([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover6 ? (
                              <FaCheck fontSize="1.5em" color="blue" />
                            ) : (
                              <MdClose fontSize="1.5em" color="red" />
                            )}
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
              <details>
                <summary>
                  <label for="documents-btn7">+ Documents</label>
                </summary>
                <div>
                  <label for="documents-btn7">
                    {" "}
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />{" "}
                  </label>
                </div>
              </details>
            </Col>
            <Col>
              <div className="upload-list">
                {doc7
                  ? doc7.map((document, index, arr) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover7 = true;
                              setDocument7([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover7 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument7([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover7 ? (
                              <FaCheck fontSize="1.5em" color="blue" />
                            ) : (
                              <MdClose fontSize="1.5em" color="red" />
                            )}
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
              <details>
                <summary>
                  <label for="documents-btn8">+ Documents</label>
                </summary>
                <div>
                  <label for="documents-btn8">
                    {" "}
                    <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />{" "}
                  </label>
                </div>
              </details>
            </Col>
            <Col>
              <div className="upload-list">
                {doc8
                  ? doc8.map((document, index, arr) => (
                      <div className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover8 = true;
                              setDocument8([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover8 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument8([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover8 ? (
                              <FaCheck fontSize="1.5em" color="blue" />
                            ) : (
                              <MdClose fontSize="1.5em" color="red" />
                            )}
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
      <form onSubmit={handleSubmit(onSubmit)} className="bottom-btn">
        <div className="bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" type="submit">
            Next
          </button>
        </div>
      </form>
    </Container>
  );
};

export default DocumentsUpload;
