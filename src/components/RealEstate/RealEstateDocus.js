import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { Row, Col, Container, Button } from "react-bootstrap";

function RealEstateDocus({
  toogleStep,
  step,
  toogleDocuments,
  ownership,
  propId,
  images,
  videos,
  propertyData,
  toogleSellStep,
  sellStep,
  getPropId,
}) {
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
  const listing_agreement = ownership
    ? ownership.documents
      ? ownership.documents.length > 0
        ? ownership.documents
        : []
      : []
    : [];

  const params = useParams();

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

  useEffect(() => {
    if (params.id) {
      authService.getIncompleteProperty(params.userId).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const property = response.data.filter(
            (property) => property._id === params.id
          );
          if (property[0].documents.length > 0) {
            setDocument1([property[0].documents[0]]);
            setDocument2([property[0].documents[1]]);
            setDocument3([property[0].documents[2]]);
            setDocument4([property[0].documents[3]]);
            setDocument5([property[0].documents[4]]);
            setDocument6([property[0].documents[5]]);
            setDocument7([property[0].documents[6]]);
            if (property[0].documents.length > 7) {
              if (property[0].documents[7].officialName === "others") {
                setDocument8([property[0].documents[7]]);
              }
            }
          }
        }
      });
    }
  }, []);

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

  if (
    titleReport.onHover1 ||
    insuranceCopy.onHover2 ||
    financialDocuments.onHover3 ||
    purchaseAgreement.onHover4 ||
    thirdpartyReport.onHover5 ||
    demographics.onHover6 ||
    marketandValuations.onHover7 ||
    otherDocuments.onHover8
  ) {
    delete titleReport.onHover1 ||
      delete insuranceCopy.onHover2 ||
      delete financialDocuments.onHover3 ||
      delete purchaseAgreement.onHover4 ||
      delete thirdpartyReport.onHover5 ||
      delete demographics.onHover6 ||
      delete marketandValuations.onHover7 ||
      delete otherDocuments.onHover8;
  }
  const documents = [
    ...titleReport,
    ...insuranceCopy,
    ...financialDocuments,
    ...purchaseAgreement,
    ...thirdpartyReport,
    ...demographics,
    ...marketandValuations,
    ...(listing_agreement ? [...listing_agreement] : []),
    ...otherDocuments,
  ];

  const saveInfo = async (data) => {
    if (propId || params.id) {
      if (sellStep || parseInt(params.step) === 1) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            ...propertyData,
            images,
            videos,
            documents,
            step: 4,
          },
        };
        await authService.saveInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(4);
            alert("Saved Successfully!");
          }
        });
      } else if (sellStep || parseInt(params.step) === 2) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            images,
            videos,
            documents,
            step: 4,
          },
        };
        await authService.saveInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(5);
            alert("Saved Successfully!");
          }
        });
      } else if (sellStep || parseInt(params.step) === 3) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            documents,
            step: 4,
          },
        };
        await authService.saveInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(6);
            alert("Saved Successfully!");
          }
        });
      } else if (sellStep || parseInt(params.step) === 4) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            documents,
            step: 4,
          },
        };
        await authService.saveInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(6);
            alert("Saved Successfully!");
          }
        });
      }
    } else {
      const datas = {
        ...ownership,
        ...propertyData,
        images,
        videos,
        documents,
        step: 4,
      };
      await authService.savePropInfo(datas).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          toogleSellStep(4);
          getPropId(response.data._id);
          alert("Saved Successfully!");
        }
      });
    }
  };

  const onSubmit = async (data) => {
    if (params.id) {
      if (
        titleReport.length !== 0 &&
        insuranceCopy.length !== 0 &&
        financialDocuments.length !== 0 &&
        purchaseAgreement.length !== 0 &&
        thirdpartyReport.length !== 0 &&
        demographics.length !== 0 &&
        marketandValuations.length !== 0 &&
        otherDocuments.length !== 0
      ) {
        toogleDocuments(documents);
        toogleStep(step + 1);
      } else {
        alert("Please upload all documents");
      }
    } else {
      if (
        data.titleReport.length !== 0 &&
        data.insuranceCopy.length !== 0 &&
        data.financialDocuments.length !== 0 &&
        data.purchaseAgreement.length !== 0 &&
        data.thirdpartyReport.length !== 0 &&
        data.demographics.length !== 0 &&
        data.marketandValuations.length !== 0
      ) {
        toogleDocuments(documents);
        toogleStep(step + 1);
      } else {
        alert("Please upload the required documents");
      }
    }
  };
  return (
    <>
      <Container className="sell-bottom-docu">
        <Row className="listDetails-title">
          <h2 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
            UPLOAD DOCUMENTS
          </h2>
          <p style={{ color: "black" }}>We only accept PDF Files</p>

          {loader ? (
            <div className="loader">
              <div className="spinning" />
            </div>
          ) : null}
        </Row>
        <Row
          style={{
            height: "1300px",
            overflowX: "hidden",
            margin: "125px",
            color: "black",
          }}
        >
          <Row style={{ borderBottom: "#333 solid 1px" }}>
            <Col className="input-form-3">
              Title Report (.pdf) <span style={{ color: "#ff0000" }}>*</span>
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
                {doc1
                  ? doc1.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
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
              Insurance Copy (.pdf) <span style={{ color: "#ff0000" }}>*</span>
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
                {doc2
                  ? doc2.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
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
              Financial Documents (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
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
                {doc3
                  ? doc3.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
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
              Purchase Agreement (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
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
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn4">+ Documents</label>
                  </summary>
                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="documents-btn4"
                    >
                      <AiOutlinePlusCircle />
                    </label>
                  </div>
                </details>
              </div>
            </Col>
            <Col>
              <div className="upload-list">
                {doc4
                  ? doc4.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
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
              Third-Party Report (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
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
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn5">+ Documents</label>
                  </summary>
                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="documents-btn5"
                    >
                      <AiOutlinePlusCircle />
                    </label>
                  </div>
                </details>
              </div>
            </Col>
            <Col>
              <div className="upload-list">
                {doc5
                  ? doc5.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
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
              Demographics (.pdf) <span style={{ color: "#ff0000" }}>*</span>
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
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn6">+ Documents</label>
                  </summary>
                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="documents-btn6"
                    >
                      <AiOutlinePlusCircle />
                    </label>
                  </div>
                </details>
              </div>
            </Col>
            <Col>
              <div className="upload-list">
                {doc6
                  ? doc6.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
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
              Market and Valuations (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
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
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn7">+ Documents</label>
                  </summary>
                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="documents-btn7"
                    >
                      <AiOutlinePlusCircle />
                    </label>
                  </div>
                </details>
              </div>
            </Col>
            <Col>
              <div className="upload-list">
                {doc7
                  ? doc7.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
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
              />
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn8">+ Documents</label>
                  </summary>
                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="documents-btn8"
                    >
                      <AiOutlinePlusCircle />
                    </label>
                  </div>
                </details>
              </div>
            </Col>
            <Col>
              <div className="upload-list">
                {doc8
                  ? doc8.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
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
      <form
        onSubmit={handleSubmit(onSubmit)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        className="bottom-btn"
      >
        <div className="bottom-btn">
          <div
            style={{
              position: "absolute",
              left: "50px",
            }}
          >
            <Button onClick={saveInfo}>Save</Button>
          </div>
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
}

export default RealEstateDocus;
