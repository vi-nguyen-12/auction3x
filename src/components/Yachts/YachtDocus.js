import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function YachtDocus({
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
  const incompProperty = useSelector((state) => state.incompProperty);

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
      const prop = incompProperty.filter((item) => item._id === params.id);
      if (prop[0].documents.length > 1) {
        const documents = prop[0].documents.map((document) => {
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
        if (documents.length > 9 || document.length > 9) {
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
  }, [incompProperty]);

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

  const vessel_registration = doc1.map((document) => {
    return { ...document, officialName: "vessel_registration" };
  });
  const vessel_maintenance_report = doc2.map((document) => {
    return { ...document, officialName: "vessel_maintenance_report" };
  });
  const vessel_engine_type = doc3.map((document) => {
    return { ...document, officialName: "vessel_engine_type" };
  });
  const vessel_performance_report = doc4.map((document) => {
    return { ...document, officialName: "vessel_performance_report" };
  });
  const vessel_deck_details = doc5.map((document) => {
    return { ...document, officialName: "vessel_deck_details" };
  });
  const vessel_insurance = doc6.map((document) => {
    return { ...document, officialName: "vessel_insurance" };
  });
  const vessel_marine_surveyor_report = doc7.map((document) => {
    return { ...document, officialName: "vessel_marine_surveyor_report" };
  });
  const vessel_valuation_report = doc8.map((document) => {
    return { ...document, officialName: "vessel_valuation_report" };
  });
  const others = doc9.map((document) => {
    return { ...document, officialName: "others" };
  });

  let documents = [
    ...vessel_registration,
    ...vessel_maintenance_report,
    ...vessel_engine_type,
    ...vessel_performance_report,
    ...vessel_deck_details,
    ...vessel_insurance,
    ...vessel_marine_surveyor_report,
    ...vessel_valuation_report,
    ...others,
    ...(listing_agreement ? [...listing_agreement] : []),
  ];

  const saveInfo = async (data) => {
    documents = documents.map((item) => {
      delete item.onHover1;
      delete item.onHover2;
      delete item.onHover3;
      delete item.onHover4;
      delete item.onHover5;
      delete item.onHover6;
      delete item.onHover7;
      delete item.onHover8;
      delete item.onHover9;
      return item;
    });
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
            height: "1300px",
            overflowY: "scroll",
            margin: "150px 0 0 0",
            color: "black",
          }}
        >
          <Row style={{ borderBottom: "#333 solid 1px" }}>
            <Col className="input-form-3">
              Vessel Registration Documents (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn1"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("vessel_registration", { onChange: onChange1 })}
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
              Vessel Maintenance Report (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn2"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("vessel_maintenance_report", {
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
              Vessel Engine Type (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn3"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("vessel_engine_type", { onChange: onChange3 })}
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
              Vessel Performance Report (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn4"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("vessel_performance_report", {
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
              Vessel Deck Details (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn5"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("vessel_deck_details", { onChange: onChange5 })}
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
              Vessel Latest Insurance (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn6"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("vessel_insurance", { onChange: onChange6 })}
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
              Vessel Marine Surveyor Report(approved) (.pdf){" "}
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn7"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("vessel_marine_surveyor_report", {
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
              Vessel Valuation Report (.pdf)
              <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="documents-btn8"
                accept=".pdf"
                type="file"
                name="documents"
                multiple
                hidden
                {...register("vessel_valuation_report", {
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

export default YachtDocus;
