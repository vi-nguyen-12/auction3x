import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import authService from "../../services/authServices";
import { Row, Col, Container, Button } from "react-bootstrap";

function CarDocus({
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
  const [doc9, setDocument9] = useState([]);
  const [loader, setLoader] = useState(false);
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

  const onChange9 = async (e) => {
    setLoader(true);

    const formData9 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData9.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData9).then((response) => {
      if (response.status === 200) {
        setDocument9([...doc9, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
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
          if (property[0].documents.length > 1) {
            const documents = property[0].documents.map((document) => {
              if (document.isVerified && document._id) {
                delete document.isVerified;
                delete document._id;
                return document;
              }
            });
            setDocument1(
              documents[0]
                ? [documents[0]]
                : document
                ? document[0]
                  ? [document[0]]
                  : []
                : []
            );
            setDocument2(
              documents[1]
                ? [documents[1]]
                : document
                ? document[1]
                  ? [document[1]]
                  : []
                : []
            );
            setDocument3(
              documents[2]
                ? [documents[2]]
                : document
                ? document[2]
                  ? [document[2]]
                  : []
                : []
            );
            setDocument4(
              documents[3]
                ? [documents[3]]
                : document
                ? document[3]
                  ? [document[3]]
                  : []
                : []
            );
            setDocument5(
              documents[4]
                ? [documents[4]]
                : document
                ? document[4]
                  ? [document[4]]
                  : []
                : []
            );
            setDocument6(
              documents[5]
                ? [documents[5]]
                : document
                ? document[5]
                  ? [document[5]]
                  : []
                : []
            );
            setDocument7(
              documents[6]
                ? [documents[6]]
                : document
                ? document[6]
                  ? [document[6]]
                  : []
                : []
            );
            setDocument8(
              documents[7]
                ? [documents[7]]
                : document
                ? document[7]
                  ? [document[7]]
                  : []
                : []
            );
            if (documents.length > 8 || document.length > 8) {
              setDocument9(
                documents[8]
                  ? [documents[8]]
                  : document
                  ? document[8]
                    ? [document[8]]
                    : []
                  : []
              );
            }
          }
        }
      });
    } else {
      setDocument1(document ? (document[0] ? [document[0]] : []) : []);
      setDocument2(document ? (document[1] ? [document[1]] : []) : []);
      setDocument3(document ? (document[2] ? [document[2]] : []) : []);
      setDocument4(document ? (document[3] ? [document[3]] : []) : []);
      setDocument5(document ? (document[4] ? [document[4]] : []) : []);
      setDocument6(document ? (document[5] ? [document[5]] : []) : []);
      setDocument7(document ? (document[6] ? [document[6]] : []) : []);
      setDocument8(document ? (document[7] ? [document[7]] : []) : []);
      setDocument9(document ? (document[8] ? [document[8]] : []) : []);
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
    setDocument9(doc9.filter((document) => document.url !== url));
  };

  const ownership_document = doc1.map((document) => {
    return { ...document, officialName: "ownership_document" };
  });
  const registration_document = doc2.map((document) => {
    return { ...document, officialName: "registration_document" };
  });
  const title_certificate = doc3.map((document) => {
    return { ...document, officialName: "title_certificate" };
  });
  const loan_document = doc4.map((document) => {
    return { ...document, officialName: "loan_document" };
  });
  const inspection_report = doc5.map((document) => {
    return { ...document, officialName: "inspection_report" };
  });
  const engine_details = doc6.map((document) => {
    return { ...document, officialName: "engine_details" };
  });
  const insurance_document = doc7.map((document) => {
    return { ...document, officialName: "insurance_document" };
  });
  const valuation_report = doc8.map((document) => {
    return { ...document, officialName: "valuation_report" };
  });
  const others = doc9.map((document) => {
    return { ...document, officialName: "others" };
  });

  let documents = [
    ...ownership_document,
    ...registration_document,
    ...title_certificate,
    ...loan_document,
    ...inspection_report,
    ...engine_details,
    ...insurance_document,
    ...valuation_report,
    ...others,
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
        await authService.saveInfo(datas).then((response) => {
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
        await authService.saveInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(4);
            alert("Saved Successfully!");
          }
        });
      } else if (parseInt(steps) === 3) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            documents: [...documents],
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
    if (documents.length >= 8) {
      toogleDocuments(documents);
      toogleStep(step + 1);
    } else {
      alert("Please upload the required documents");
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
            // height: "1300px",
            overflowY: "scroll",
            margin: "120px 0 0 0",
            color: "black",
          }}
        >
          <Row style={{ borderBottom: "#333 solid 1px" }}>
            <Col className="input-form-3">
              Ownership Documents (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn1"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("ownership_document", { onChange: onChange1 })}
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
              Registration Documents (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn2"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("registration_document", { onChange: onChange2 })}
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
              Title Certificate (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn3"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("title_certificate", { onChange: onChange3 })}
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
              Loan Documents (.pdf) <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn4"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("loan_document", { onChange: onChange4 })}
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
              Inspection Report (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn5"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("inspection_report", { onChange: onChange5 })}
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
              Engine Details (.pdf) <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn6"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("engine_details", { onChange: onChange6 })}
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
              Insurance Documents (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn7"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("insurance_document", { onChange: onChange7 })}
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
              Valuation Report (.pdf)
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn8"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("valuation_report", { onChange: onChange8 })}
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

          <Row style={{ borderBottom: "#333 solid 1px" }}>
            <Col className="input-form-3">
              Other Documents (.pdf)
              <input
                id="documents-btn9"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("others", { onChange: onChange9 })}
              />
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn9">+ Documents</label>
                  </summary>
                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="documents-btn9"
                    >
                      <AiOutlinePlusCircle />
                    </label>
                  </div>
                </details>
              </div>
            </Col>
            <Col>
              <div className="upload-list">
                {doc9
                  ? doc9.map((document, index, arr) => (
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

export default CarDocus;
