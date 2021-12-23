import React from "react";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axious from "axios";
import { useHistory } from "react-router-dom";

const BuyAuthoried = ({
  toogleStep,
  step,
  document1,
  document2,
  document3,
  document4,
  answer1,
  answer2,
  answer3,
  answer4,
  answer5,
  question1ID,
  question2ID,
  question3ID,
  question4ID,
  question5ID,
}) => {
  const { register, handleSubmit } = useForm();
  const id = useParams().id;

  const [ip, setIp] = useState();

  const getIp = async () => {
    await authService.getIPAddress().then((res) => {
      setIp(res.data.ip);
    });
  };

  useEffect(() => {
    getIp();
  }, []);

  const history = useHistory();
  // console.log(ip);

  const [agree, setAgree] = useState(false);
  const dateTime = new Date().toISOString();
  const hangleTerms = () => {
    setAgree(dateTime);
  };

  const documents = [{document1, document2, document3, document4}];
  const answers = [
    { questionId: question1ID, answer: answer1 },
    { questionId: question2ID, answer: answer2 },
    { questionId: question3ID, answer: answer3 },
    { questionId: question4ID, answer: answer4 },
    { questionId: question5ID, answer: answer5 },
  ];

  console.log(documents);
  const onSubmit = async (data) => {
    const response = await authService.buyerRegister({
      propertyId: id,
      documents: documents,
      TC: {time: agree, IPAddress: ip},
      answers: answers,
    });
  };
console.log(question1ID);
  return (
    <>
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassName="custom-modal-title"
        >
          Documents Upload
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>
          </div>

          <div
            style={{ fontSize: "14px", marginLeft: "30px" }}
            className="input-form-1"
          >
            <input
              type="checkbox"
              name="terms"
              multiple
              // {...register("images", { required: false })}
              style={{ marginRight: "10px" }}
              onChange={hangleTerms}
            />
            Terms & Conditions
          </div>
          <div
            style={{ position: "sticky", padding: "auto" }}
            className="bottom-btn"
          >
            <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
              Previous
            </button>
            <button className="nxt-btn" type="submit">
              Next
            </button>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

export default BuyAuthoried;
