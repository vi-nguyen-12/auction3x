import React from "react";
import { Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axious from "axios";
import { useHistory } from "react-router-dom";
import { FaCreativeCommonsPd } from "react-icons/fa";

const BuyAuthoried = ({
  toogleStep,
  step,
  document,
  answer,
  questionID,
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

  const documents = [document[0], document[1], document[2], document[3]];
  console.log(documents);
  
  const answers = [
    { questionId: questionID[0], answer: answer[0] },
    { questionId: questionID[1], answer: answer[1] },
    { questionId: questionID[2], answer: answer[2] },
    { questionId: questionID[3], answer: answer[3] },
    { questionId: questionID[4], answer: answer[4] },
  ];

  const onSubmit = async (data) => {
    await authService.buyerRegister({
      propertyId: id,
      documents: documents,
      TC: {time: agree, IPAddress: ip},
      answers: answers,
    }).catch((err) => {
      alert("User Already Registered for this property!");
      history.push("/");
    }).then((res) => {
      if (res) {
        console.log(res);
        history.push("/");
      }
    });
  };
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
            <p>
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
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
