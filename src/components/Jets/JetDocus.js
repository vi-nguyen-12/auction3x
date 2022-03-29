import React from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../services/authServices";
import { Row, Col, Container } from "react-bootstrap";

function JetDocus({ toogleStep, step, toogleDocuments, ownership }) {
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
  const [doc10, setDocument10] = useState([]);
  const [doc11, setDocument11] = useState([]);
  const [doc12, setDocument12] = useState([]);
  const [doc13, setDocument13] = useState([]);
  const [loader, setLoader] = useState(false);
  const listing_agreement = ownership.listing_agreement
    ? ownership.listing_agreement
    : "";

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
  };

  const onChange10 = async (e) => {
    setLoader(true);

    const formData10 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData10.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData10).then((response) => {
      if (response.status === 200) {
        setDocument10([...doc10, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange11 = async (e) => {
    setLoader(true);

    const formData11 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData11.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData11).then((response) => {
      if (response.status === 200) {
        setDocument11([...doc11, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange12 = async (e) => {
    setLoader(true);

    const formData12 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData12.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData12).then((response) => {
      if (response.status === 200) {
        setDocument12([...doc12, ...response.data]);
        setLoader(false);
      }
    });
  };

  const onChange13 = async (e) => {
    setLoader(true);

    const formData13 = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData13.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData13).then((response) => {
      if (response.status === 200) {
        setDocument13([...doc13, ...response.data]);
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
    setDocument9(doc9.filter((document) => document.url !== url));
    setDocument10(doc10.filter((document) => document.url !== url));
    setDocument11(doc11.filter((document) => document.url !== url));
    setDocument12(doc12.filter((document) => document.url !== url));
    setDocument13(doc13.filter((document) => document.url !== url));
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
  const detail_specification = doc4.map((document) => {
    return { ...document, officialName: "detail_specification" };
  });
  const insurance_document = doc5.map((document) => {
    return { ...document, officialName: "insurance_document" };
  });
  const loan_document = doc6.map((document) => {
    return { ...document, officialName: "loan_document" };
  });
  const jet_detail_history = doc7.map((document) => {
    return { ...document, officialName: "jet_detail_history" };
  });
  const fitness_report = doc8.map((document) => {
    return { ...document, officialName: "fitness_report" };
  });
  const electric_work_details = doc9.map((document) => {
    return { ...document, officialName: "electric_work_details" };
  });
  const engine_details = doc10.map((document) => {
    return { ...document, officialName: "engine_details" };
  });
  const inspection_report = doc11.map((document) => {
    return { ...document, officialName: "inspection_report" };
  });
  const valuation_report = doc12.map((document) => {
    return { ...document, officialName: "valuation_report" };
  });
  const others = doc13.map((document) => {
    return { ...document, officialName: "others" };
  });

  const documents = [
    ...ownership_document,
    ...registration_document,
    ...title_certificate,
    ...detail_specification,
    ...insurance_document,
    ...loan_document,
    ...jet_detail_history,
    ...fitness_report,
    ...electric_work_details,
    ...engine_details,
    ...inspection_report,
    ...valuation_report,
    ...(listing_agreement ? [...listing_agreement] : []),
    ...others,
  ];

  const onSubmit = async (data) => {
    if (
      data.ownership_document.length !== 0 &&
      data.registration_document.length !== 0 &&
      data.title_certificate.length !== 0 &&
      data.detail_specification.length !== 0 &&
      data.insurance_document.length !== 0 &&
      data.loan_document.length !== 0 &&
      data.jet_detail_history.length !== 0 &&
      data.fitness_report.length !== 0 &&
      data.electric_work_details.length !== 0 &&
      data.engine_details.length !== 0 &&
      data.inspection_report.length !== 0 &&
      data.valuation_report.length !== 0
    ) {
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
            height: "1300px",
            overflowX: "hidden",
            margin: "125px",
            color: "black",
          }}
        >
          <Row style={{ borderBottom: "#333 solid 1px" }}>
            <Col className="input-form-3">
              Ownership Document (.pdf){" "}
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
              Registration Document (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn2"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("registration_document", {
                  onChange: onChange2,
                })}
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
              Detail Specification (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn4"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("detail_specification", {
                  onChange: onChange4,
                })}
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
              Insurance Document (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn5"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("insurance_document", { onChange: onChange5 })}
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
              Loan Document (.pdf) <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn6"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("loan_document", { onChange: onChange6 })}
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
              Jet Detail History (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn7"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("jet_detail_history", {
                  onChange: onChange7,
                })}
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
              Fitness Report (.pdf)
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn8"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("fitness_report", {
                  onChange: onChange8,
                })}
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

          <Row style={{ borderBottom: "#333 solid 1px" }}>
            <Col className="input-form-3">
              Electric Work Details (.pdf)
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn9"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("electric_work_details", {
                  onChange: onChange9,
                })}
              />
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn9">+ Documents</label>
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
                {doc9
                  ? doc9.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover9 = true;
                              setDocument9([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover9 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument9([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover9 ? (
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
              Engine Details (.pdf)
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn10"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("engine_details", {
                  onChange: onChange10,
                })}
              />
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn10">+ Documents</label>
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
                {doc10
                  ? doc10.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover10 = true;
                              setDocument10([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover10 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument10([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover10 ? (
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
              Inspection Report (.pdf)
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn11"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("inspection_report", {
                  onChange: onChange11,
                })}
              />
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn11">+ Documents</label>
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
                {doc11
                  ? doc11.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover11 = true;
                              setDocument11([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover11 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument11([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover11 ? (
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
              valuation_report (.pdf)
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn12"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("valuation_report", {
                  onChange: onChange12,
                })}
              />
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn12">+ Documents</label>
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
                {doc12
                  ? doc12.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover12 = true;
                              setDocument12([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover12 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument12([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover12 ? (
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
                id="documents-btn13"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("others", { onChange: onChange13 })}
              />
              <div className="upload-cover">
                <details>
                  <summary>
                    <label htmlFor="documents-btn8">+ Documents</label>
                  </summary>
                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="documents-btn13"
                    >
                      <AiOutlinePlusCircle />
                    </label>
                  </div>
                </details>
              </div>
            </Col>
            <Col>
              <div className="upload-list">
                {doc13
                  ? doc13.map((document, index, arr) => (
                      <div key={index} className="upload-list-item">
                        <span>
                          {document.name}
                          <button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                            onMouseEnter={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover13 = true;
                              setDocument13([...tempArr]);
                            }}
                            onMouseLeave={() => {
                              var tempArr = arr;
                              var temp = document;
                              temp.onHover13 = false;
                              let newArr = tempArr.splice(index, 0);
                              setDocument13([...tempArr, ...newArr]);
                            }}
                          >
                            {!document.onHover13 ? (
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

export default JetDocus;
