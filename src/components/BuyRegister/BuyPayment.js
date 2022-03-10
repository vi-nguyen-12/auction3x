import React from "react";
import { Button, Modal } from "react-bootstrap";
import authService from "../../services/authServices";
import { useState, useEffect } from "react";

const BuyAuthoried = ({
  toogleStep,
  step,
  toogleAnswer,
  // toogleAnswer2,
  // toogleAnswer3,
  // toogleAnswer4,
  // toogleAnswer5,
  toogleQuestionID,
  // toogleQuestion2ID,
  // toogleQuestion3ID,
  // toogleQuestion4ID,
  // toogleQuestion5ID,
}) => {
  const [question1, setQuestion1] = useState();
  const [question2, setQuestion2] = useState();
  const [question3, setQuestion3] = useState();
  const [question4, setQuestion4] = useState();
  const [question5, setQuestion5] = useState();
  const [question1ID, setQuestion1ID] = useState();
  const [question2ID, setQuestion2ID] = useState();
  const [question3ID, setQuestion3ID] = useState();
  const [question4ID, setQuestion4ID] = useState();
  const [question5ID, setQuestion5ID] = useState();

  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();
  const [answer4, setAnswer4] = useState();
  const [answer5, setAnswer5] = useState();

  const [explain1, setExplain1] = useState();

  const answer = [answer1, answer2, answer3, answer4, answer5];
  const questionID = [
    question1ID,
    question2ID,
    question3ID,
    question4ID,
    question5ID,
  ];

  useEffect(() => {
    const getQuestion = async () => {
      await authService.getBuyerQuestions().then((res) => {
        setQuestion1(res.data[0].questionText);
        setQuestion2(res.data[1].questionText);
        setQuestion3(res.data[2].questionText);
        setQuestion4(res.data[3].questionText);
        setQuestion5(res.data[4].questionText);

        setQuestion1ID(res.data[0]._id);
        setQuestion2ID(res.data[1]._id);
        setQuestion3ID(res.data[2]._id);
        setQuestion4ID(res.data[3]._id);
        setQuestion5ID(res.data[4]._id);
      });
    };
    getQuestion();
  }, []);

  // const onSubmit = () => {
  //   toogleAnswer2(answer2);
  //   toogleAnswer3(answer3);
  //   toogleAnswer4(answer4);
  //   toogleAnswer5(answer5);
  //   toogleQuestion1ID(question1ID);
  //   toogleQuestion2ID(question2ID);
  //   toogleQuestion3ID(question3ID);
  //   toogleQuestion4ID(question4ID);
  //   toogleQuestion5ID(question5ID);
  //   toogleStep(step + 1);
  // };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{
            color: "#D58F5C",
            fontSize: "40px",
            fontWeight: "bold",
            marginTop: "-20px",
          }}
          contentclassname="custom-modal-title"
        >
          Questionaire
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div style={{ marginBottom: "15px" }}>
            <p style={{ fontWeight: "bold" }}>Q.1: {question1}</p>
            <input
              type="radio"
              name="answer1"
              value="yes"
              onChange={(e) => setAnswer1(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>Yes</label>
            <input
              style={{ marginLeft: "30px" }}
              type="radio"
              name="answer1"
              value="no"
              onChange={(e) => setAnswer1(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>No</label>
            {answer1 === "yes" && (
              <div style={{ display: "grid" }}>
                <textarea
                  style={{ width: "40%" }}
                  placeholder="Please Explain"
                  onChange={(e) => setExplain1(e.target.value)}
                />
                <span style={{ marginTop: "10px" }}>
                  <input type="file" />
                </span>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <Button>Upload</Button>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontWeight: "bold" }}>Q.2: {question2}</p>
            <input
              type="radio"
              name="answer2"
              value="yes"
              onChange={(e) => setAnswer2(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>Yes</label>
            <input
              style={{ marginLeft: "30px" }}
              type="radio"
              name="answer2"
              value="no"
              onChange={(e) => setAnswer2(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>No</label>
            {answer2 === "yes" && (
              <div style={{ display: "grid" }}>
                <textarea
                  style={{ width: "40%" }}
                  placeholder="Please Explain"
                />
                <span style={{ marginTop: "10px" }}>
                  <input type="file" />
                </span>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button>Upload</button>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontWeight: "bold" }}>Q3: {question3}</p>
            <input
              type="radio"
              name="answer3"
              value="yes"
              onChange={(e) => setAnswer3(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>Yes</label>
            <input
              style={{ marginLeft: "30px" }}
              type="radio"
              name="answer3"
              value="no"
              onChange={(e) => setAnswer3(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>No</label>
            {answer3 === "yes" && (
              <div style={{ display: "grid" }}>
                <textarea
                  style={{ width: "40%" }}
                  placeholder="Please Explain"
                />
                <span style={{ marginTop: "10px" }}>
                  <input type="file" />
                </span>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button>Upload</button>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontWeight: "bold" }}>Q4: {question4}</p>
            <input
              type="radio"
              name="answer4"
              value="yes"
              onChange={(e) => setAnswer4(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>Yes</label>
            <input
              style={{ marginLeft: "30px" }}
              type="radio"
              name="answer4"
              value="no"
              onChange={(e) => setAnswer4(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>No</label>
            {answer4 === "yes" && (
              <div style={{ display: "grid" }}>
                <textarea
                  style={{ width: "40%" }}
                  placeholder="Please Explain"
                />
                <span style={{ marginTop: "10px" }}>
                  <input type="file" />
                </span>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button>Upload</button>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginBottom: "10px" }}>
            <p style={{ fontWeight: "bold" }}>Q5: {question5}</p>
            <input
              type="radio"
              name="answer5"
              value="yes"
              onChange={(e) => setAnswer5(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>Yes</label>
            <input
              style={{ marginLeft: "30px" }}
              type="radio"
              name="answer5"
              value="no"
              onChange={(e) => setAnswer5(e.target.value)}
            />
            <label style={{ marginLeft: "5px" }}>No</label>
            {answer5 === "yes" && (
              <div style={{ display: "grid" }}>
                <textarea
                  style={{ width: "40%" }}
                  placeholder="Please Explain"
                />
                <span style={{ marginTop: "10px" }}>
                  <input type="file" />
                </span>
                <div
                  style={{
                    width: "40%",
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "10px",
                  }}
                >
                  <button>Upload</button>
                </div>
              </div>
            )}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer
        style={{ marginTop: "20px", display: "flex", justifyContent: "center" }}
      >
        <div style={{ display: "flex" }}>
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button
            className="nxt-btn"
            type="submit"
            onClick={() => {
              toogleAnswer(answer);
              // toogleAnswer2(answer2);
              // toogleAnswer3(answer3);
              // toogleAnswer4(answer4);
              // toogleAnswer5(answer5);
              toogleQuestionID(questionID);
              // toogleQuestion2ID(question2ID);
              // toogleQuestion3ID(question3ID);
              // toogleQuestion4ID(question4ID);
              // toogleQuestion5ID(question5ID);
              toogleStep(step + 1);
            }}
          >
            Next
          </button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default BuyAuthoried;
