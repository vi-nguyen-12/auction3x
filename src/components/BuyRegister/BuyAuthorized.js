import React from "react";
import "../../styles/SellRegister.css";
import { Modal, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import axious from "axios";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { SiDocusign } from "react-icons/si";

const BuyAuthoried = ({ toogleStep, step, answer, questionID, document }) => {
  console.log(document);
  const { register, handleSubmit } = useForm();
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [envelopeId, setEnvelopeId] = useState();
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

  const documents = [];

  //push document to array if it is not empty
  document.map((item) => {
    if (item.url) {
      documents.push(item);
    }
  });

  useEffect(() => {
    getIp();
  }, []);

  const [agree, setAgree] = useState(false);
  const dateTime = new Date().toISOString();
  const hangleTerms = () => {
    setAgree(dateTime);
  };

  const answers = [
    { questionId: questionID[0], answer: answer[0] },
    { questionId: questionID[1], answer: answer[1] },
    { questionId: questionID[2], answer: answer[2] },
    { questionId: questionID[3], answer: answer[3] },
    { questionId: questionID[4], answer: answer[4] },
  ];

  const handleSignDocusign = async () => {
    setLoader(true);
    await authService.getDocuSign(envelopeId).then((res) => {
      setLoader(false);
      setEnvelopeId(res.data.envelopeId);
      if (
        res.data.status !== "signing_complete" &&
        res.data.status !== "viewing_complete"
      ) {
        window.open(res.data.redirectUrl);
      }
      console.log(res.data);
    });
  };
  const onSubmit = async () => {
    if (agree) {
      setLoader(true);
      await authService.getDocuSignStatus(envelopeId).then((res) => {
        if (
          res.data.status !== "signing_complete" &&
          res.data.status !== "viewing_complete"
        ) {
          alert("Please sign the docusign before proceeding ");
        } else {
          setLoader(false);
          authService
            .buyerRegister({
              auctionId: auctionId ? auctionId._id : onGoingAuction._id,
              TC: { time: agree, IPAddress: ip },
              answers: answers,
              docusignId: res.data._id,
              documents,
            })
            .then((res) => {
              window.location.reload();
              alert("You have successfully registered to buy this auction");
            });
        }
      });
    } else {
      alert("Please agree to the terms and conditions");
    }
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentclassname="custom-modal-title"
        >
          Buyer Agreement
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "300px" }}>
        {loader ? (
          <div className="loader">
            <div className="spinning" />
          </div>
        ) : null}
        <form
          onSubmit={handleSubmit(onSubmit)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
            }
          }}
        >
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
              // onClick={() => {
              //   window.open(url);
              // }}
              onClick={handleSignDocusign}
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
              color: "black",
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
        </form>
      </Modal.Body>
    </>
  );
};

export default BuyAuthoried;
