import React from "react";
import { Button, Modal, Row, Col } from "react-bootstrap";
import authService from "../../services/authServices";
import { useState, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import Loading from "../../components/Loading";
import { MdClose } from "react-icons/md";

const BuyQuestionair = ({ setStep, step, answers, setAnswers, setMessage }) => {
  const [loading, setLoading] = useState(false);
  const handleChoose = (id) => (e) => {
    setAnswers((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, answer: e.target.value };
        }
        return item;
      });
    });
  };
  const handleExplain = (id) => (e) => {
    setAnswers((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          return { ...item, explanation: e.target.value };
        }
        return item;
      });
    });
  };
  const handleUpload = (id) => async (e) => {
    setLoading(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((response) => {
      if (response.status === 200) {
        setAnswers((prev) => {
          return prev.map((item) => {
            if (item._id === id) {
              return {
                ...item,
                files: [...(item.files ? item.files : []), ...response.data],
              };
            }
            return item;
          });
        });
        setLoading(false);
      }
    });
    e.target.value = null;
  };
  const handleDelete = (id, url) => () => {
    setAnswers((prev) => {
      return prev.map((item) => {
        if (item._id === id) {
          let files = item.files.filter((file) => file.url !== url);
          return { ...item, files };
        }
        return item;
      });
    });
  };
  const handleNext = () => {
    let isAllAnswered = true;
    let isExplainedIfAnswerIsTrue = true;
    for (let item of answers) {
      if (!(item.answer === "yes" || item.answer === "no")) {
        isAllAnswered = false;
        break;
      }
      if (
        item.answer === "yes" &&
        (item.explanation === undefined ||
          item.explanation === "" ||
          item.files === undefined ||
          item.files?.length < 1)
      ) {
        isExplainedIfAnswerIsTrue = false;
        break;
      }
    }
    if (!isAllAnswered) {
      setMessage("");
      return setTimeout(() => {
        setMessage("Please answer all questions");
      }, 100);
    }
    if (!isExplainedIfAnswerIsTrue) {
      setMessage("");
      return setTimeout(() => {
        setMessage(
          'Please explain reason and upload supported document for question with answer "yes"'
        );
      }, 100);
    }
    setStep(step + 1);
  };

  useEffect(() => {
    const getQuestion = async () => {
      await authService.getBuyerQuestions().then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setAnswers(res.data);
        }
      });
    };
    if (!answers) {
      getQuestion();
    }
  }, [setAnswers, answers, setMessage]);

  return (
    <>
      {loading && <Loading />}
      <Modal.Body>
        <form>
          {answers?.length > 0 &&
            answers.map((item, idx) => (
              <div className="mb-3" key={idx}>
                <p className="fw-bold">
                  Q{idx + 1}: {item.questionText}
                </p>
                <input
                  type="radio"
                  name={item._id + "yes"}
                  value="yes"
                  id={item._id + "yes"}
                  checked={item.answer === "yes"}
                  onChange={handleChoose(item._id)}
                />
                <label htmlFor={item._id + "yes"} className="ms-2">
                  Yes
                </label>
                <input
                  className="ms-4"
                  type="radio"
                  name={item._id}
                  value="no"
                  id={item._id + "no"}
                  checked={item.answer === "no"}
                  onChange={handleChoose(item._id)}
                />
                <label htmlFor={item._id + "no"} className="ms-2">
                  No
                </label>
                {item.answer === "yes" && (
                  <>
                    <Row className="mt-3">
                      <Col xs={12} md={6}>
                        <textarea
                          className="w-100"
                          placeholder="Please Explain"
                          onChange={handleExplain(item._id)}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <p className="justify-content-start">
                        {" "}
                        Please upload file for explanation{" "}
                        <span style={{ color: "#ff0000" }}>*</span>
                      </p>
                    </Row>
                    <Row>
                      <Col xs={12} md={6}>
                        <input
                          id="documents"
                          accept=".pdf"
                          type="file"
                          name="documents"
                          multiple
                          hidden
                          // {...register("document1", { onChange: onChange1 })}
                          onChange={handleUpload(item._id)}
                          // required
                        />
                        <label
                          htmlFor="documents"
                          style={{
                            width: "130px",
                            padding: "0.5rem",
                            borderRadius: "0.3rem",
                            cursor: "pointer",
                            textAlign: "center",
                          }}
                        >
                          <AiOutlinePlusCircle /> Upload file
                        </label>
                      </Col>
                      <Col xs={12} md={6}>
                        <div className="upload-list">
                          {item.files?.length > 0 &&
                            item.files.map((document, index) => (
                              <div key={index} className="upload-list-item">
                                <span>
                                  {document.name}
                                  <Button
                                    className="delete-btn"
                                    onClick={handleDelete(
                                      item._id,
                                      document.url
                                    )}
                                  >
                                    <MdClose fontSize="1.5em" color="red" />
                                  </Button>
                                </span>
                              </div>
                            ))}
                        </div>
                      </Col>
                    </Row>
                  </>
                )}
              </div>
            ))}
        </form>
      </Modal.Body>
      <Modal.Footer
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <div style={{ display: "flex" }}>
          <button className="pre-btn" onClick={() => setStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" onClick={handleNext}>
            Next
          </button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default BuyQuestionair;
