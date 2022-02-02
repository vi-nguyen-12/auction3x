import React from "react";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axious from "axios";
import { useHistory } from "react-router-dom";
import { FaCreativeCommonsPd } from "react-icons/fa";
import { useSelector } from "react-redux";
import { SiDocusign } from "react-icons/si";

const BuyAuthoried = ({ toogleStep, step, document, answer, questionID }) => {
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [url, setUrl] = useState();
  const properties = useSelector((state) => state.property);
  const auction = useSelector((state) => state.auction);
  const onGoingAuction = auction.find((item) => item._id === id);
  const auctionId = properties.find((item) => item._id === id);

  const [ip, setIp] = useState();

  const getIp = async () => {
    await axious.get("https://api.ipify.org?format=json").then((res) => {
      setIp(res.data.ip);
    });
  };

  useEffect(() => {
    getIp();
    authService.getDocuSign().then((res) => {
      setUrl(res.data.redirectUrl);
    });
  }, []);

  const history = useHistory();
  // console.log(ip);

  const [agree, setAgree] = useState(false);
  const dateTime = new Date().toISOString();
  const hangleTerms = () => {
    setAgree(dateTime);
  };

  const documents = [];

  //push document to array if it is not empty
  document.map((item) => {
    if (item.name) {
      documents.push(item);
    }
  });

  const realDocuments = documents.map((item) => {
    return {
      officialName: item.officialName,
      name: item.name,
      url: item.url,
    };
  });
  console.log(realDocuments);

  const answers = [
    { questionId: questionID[0], answer: answer[0] },
    { questionId: questionID[1], answer: answer[1] },
    { questionId: questionID[2], answer: answer[2] },
    { questionId: questionID[3], answer: answer[3] },
    { questionId: questionID[4], answer: answer[4] },
  ];

  console.log(answers);

  const onSubmit = async (data) => {
    await authService
      .buyerRegister({
        auctionId: auctionId ? auctionId._id : onGoingAuction._id,
        documents: realDocuments,
        TC: { time: agree, IPAddress: ip },
        answers: answers,
        // explanation: explanations,
        // files: files,
      })
      .catch((err) => {
        alert("User Already Registered for this property!");
        history.push("/");
      })
      .then((res) => {
        if (res) {
          console.log(res);
          history.push("/");
        }
      });
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentclassname="custom-modal-title"
        >
          Documents Upload
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "300px" }}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "70px",
            }}
          >
            <Button
              className="btn btn-primary"
              onClick={() => {
                window.open(url);
              }}
            >
              <SiDocusign />
              <span style={{ marginLeft: "10px" }}>
                <span style={{ fontSize: "20px" }}>
                  <strong>Sign</strong>
                </span>
                <span style={{ fontSize: "15px", marginLeft: "10px" }}>
                  <strong>Document</strong>
                </span>
              </span>
            </Button>
          </div>

          <div
            style={{
              fontSize: "14px",
              width: "100%",
              marginTop: "70px",
              textAlign: "center",
            }}
          >
            <input
              type="checkbox"
              name="terms"
              multiple
              // {...register("images", { required: false })}
              style={{ marginRight: "10px", marginBottom: "30px" }}
              onChange={hangleTerms}
            />
            Terms & Conditions
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "center" }}>
        <div
          style={{ position: "sticky", padding: "auto" }}
          className="bottom-btn"
        >
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" type="submit">
            Submit
          </button>
        </div>
      </Modal.Footer>
    </>
  );
};

export default BuyAuthoried;
