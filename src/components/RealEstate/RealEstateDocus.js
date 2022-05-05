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
  document,
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
  // const [documents, setDocuments] = useState([]);
  const listing_agreement = ownership
    ? ownership.documents
      ? ownership.documents.length > 0
        ? ownership.documents
        : []
      : []
    : [];

  const params = useParams();

  const steps = sellStep ? sellStep : params.step ? params.step : 0;

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
        setDocument2([...doc2, ...response.data]);
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
        setDocument3([...doc3, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
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
    e.target.value = null;
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
    e.target.value = null;
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
    e.target.value = null;
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
    e.target.value = null;
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
    e.target.value = null;
  };

  // const onChange = (officialName) => async (e) => {
  //   setLoader(true);

  //   const formData = new FormData();
  //   for (let i = 0; i < e.target.files.length; i++) {
  //     formData.append("documents", e.target.files[i]);
  //   }
  //   await authService.saveDocuments(formData).then((response) => {
  //     if (response.status === 200) {
  //       let newDocuments = response.data.map((item) => {
  //         return { ...item, officialName };
  //       });
  //       setDocuments([...documents, ...newDocuments]);
  //       setLoader(false);
  //     }
  //   });
  //   e.target.value = null;
  // };
  // let documents1=documents.filter(item=>item.officialName==="title_report")
  // let documents2=documents.filter(item=>item.officialName==="title_report")
  // let documents3=documents.filter(item=>item.officialName==="title_report")
  // let documents4=documents.filter(item=>item.officialName==="title_report")
  // let documents5=documents.filter(item=>item.officialName==="title_report")
  // let documents6=documents.filter(item=>item.officialName==="title_report")

  useEffect(() => {
    if (params.id) {
      authService.getIncompleteProperty(params.userId).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const property = response.data.filter(
            (property) => property._id === params.id
          );
          if (property[0].documents) {
            if (property[0].documents.length > 1) {
              const documents = property[0].documents.map((document) => {
                if (document.isVerified && document._id) {
                  delete document.isVerified;
                  delete document._id;
                  return document;
                }
              });
              console.log(documents);
              setDocument1(
                documents
                  ? documents.filter(
                      (item) => item.officialName === "title_report"
                    )
                  : []
              );
              setDocument2(
                documents
                  ? documents.filter(
                      (item) => item.officialName === "insurance_copy"
                    )
                  : []
              );
              setDocument3(
                documents
                  ? documents.filter(
                      (item) => item.officialName === "financial_document"
                    )
                  : []
              );
              setDocument4(
                documents
                  ? documents.filter(
                      (item) => item.officialName === "purchase_agreement"
                    )
                  : []
              );
              setDocument5(
                documents
                  ? documents.filter(
                      (item) => item.officialName === "third-party_report"
                    )
                  : []
              );
              setDocument6(
                documents
                  ? documents.filter(
                      (item) => item.officialName === "market_and_valuations"
                    )
                  : []
              );
              setDocument7(
                documents
                  ? documents.filter(
                      (item) => item.officialName === "demographics"
                    )
                  : []
              );
              setDocument8(
                documents
                  ? documents.filter((item) => item.officialName === "others")
                  : []
              );
            } else {
              setDocument1(
                document
                  ? document.filter(
                      (item) => item.officialName === "title_report"
                    )
                  : []
              );
              setDocument2(
                document
                  ? document.filter(
                      (item) => item.officialName === "insurance_copy"
                    )
                  : []
              );
              setDocument3(
                document
                  ? document.filter(
                      (item) => item.officialName === "financial_document"
                    )
                  : []
              );
              setDocument4(
                document
                  ? document.filter(
                      (item) => item.officialName === "purchase_agreement"
                    )
                  : []
              );
              setDocument5(
                document
                  ? document.filter(
                      (item) => item.officialName === "third-party_report"
                    )
                  : []
              );
              setDocument6(
                document
                  ? document.filter(
                      (item) => item.officialName === "market_and_valuations"
                    )
                  : []
              );
              setDocument7(
                document
                  ? document.filter(
                      (item) => item.officialName === "demographics"
                    )
                  : []
              );
              setDocument8(
                document
                  ? document.filter((item) => item.officialName === "others")
                  : []
              );
            }
          }
        }
      });
    } else {
      setDocument1(
        document
          ? document.filter((item) => item.officialName === "title_report")
          : []
      );
      setDocument2(
        document
          ? document.filter((item) => item.officialName === "insurance_copy")
          : []
      );
      setDocument3(
        document
          ? document.filter(
              (item) => item.officialName === "financial_document"
            )
          : []
      );
      setDocument4(
        document
          ? document.filter(
              (item) => item.officialName === "purchase_agreement"
            )
          : []
      );
      setDocument5(
        document
          ? document.filter(
              (item) => item.officialName === "third-party_report"
            )
          : []
      );
      setDocument6(
        document
          ? document.filter(
              (item) => item.officialName === "market_and_valuations"
            )
          : []
      );
      setDocument7(
        document
          ? document.filter((item) => item.officialName === "demographics")
          : []
      );
      setDocument8(
        document
          ? document.filter((item) => item.officialName === "others")
          : []
      );
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
  const marketandValuations = doc6.map((document) => {
    return { ...document, officialName: "market_and_valuations" };
  });
  const demographics = doc7.map((document) => {
    return { ...document, officialName: "demographics" };
  });
  const otherDocuments = doc8.map((document) => {
    return { ...document, officialName: "others" };
  });

  let documents = [
    ...titleReport,
    ...insuranceCopy,
    ...financialDocuments,
    ...purchaseAgreement,
    ...thirdpartyReport,
    ...marketandValuations,
    ...demographics,
    ...otherDocuments,
    ...(listing_agreement ? [...listing_agreement] : []),
  ];

  const saveInfo = async () => {
    if (propId || params.id) {
      if (parseInt(steps) === 1) {
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
        await authService.putRealEstateInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(4);
            alert("Saved Successfully!");
          }
        });
      } else if (parseInt(steps) === 2) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            images,
            videos,
            documents,
            step: 4,
          },
        };
        await authService.putRealEstateInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(5);
            alert("Saved Successfully!");
          }
        });
      } else if (parseInt(steps) === 3) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            documents,
            step: 4,
          },
        };
        await authService.putRealEstateInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(6);
            alert("Saved Successfully!");
          }
        });
      } else if (parseInt(steps) === 4) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            documents,
            step: 4,
          },
        };
        await authService.putRealEstateInfo(datas).then((response) => {
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
      await authService.postRealEstateInfo(datas).then((response) => {
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
    if (
      doc1.length !== 0 &&
      doc2.length !== 0 &&
      doc3.length !== 0 &&
      doc4.length !== 0 &&
      doc5.length !== 0 &&
      doc6.length !== 0
    ) {
      toogleDocuments(documents);
      toogleStep(step + 1);
    } else {
      alert("Please upload all required documents");
    }
  };
  return (
    <>
      <Container className="sell-bottom-docu" style={{ bottom: "250px" }}>
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
            // height: "1300px",
            overflowY: "scroll",
            margin: "150px 0 0 0",
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
                // {...register("titleReport", { onChange: onChange })}
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
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
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
                // {...register("insuranceCopy", {
                //   onChange: onChange("insurance_copy"),
                // })}
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
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
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
                // {...register("financialDocuments", {
                //   onChange: onChange("financial_document"),
                // })}
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
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
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
                // {...register("purchaseAgreement", {
                //   onChange: onChange("purchase_agreement"),
                // })}
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
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
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
                {...register("thirdPartyReport", { onChange: onChange5 })}
                // {...register("thirdpartyReport", {
                //   onChange: onChange("third_party_report"),
                // })}
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
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
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
                id="documents-btn6"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("marketValuations", { onChange: onChange6 })}
                required
                // {...register("demographics", {
                //   onChange: onChange("demographics"),
                // })}
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
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
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
                id="documents-btn7"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("demographics", { onChange: onChange7 })}
                // {...register("marketandValuations", {
                //   onChange: onChange("market_and_evaluations"),
                // })}
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
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
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
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
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
          <div
            style={{
              position: "absolute",
              left: "50px",
            }}
          >
            <Button onClick={saveInfo}>Save</Button>
          </div>
          <Button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </Button>
          <button className="nxt-btn" type="submit">
            Next
          </button>
        </div>
      </form>
    </>
  );
}

export default RealEstateDocus;
