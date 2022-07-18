import React from "react";
import "../../styles/sell-register.css";
import { Modal, Button, Container, Row } from "react-bootstrap";
import { useState, useEffect } from "react";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import axious from "axios";
import { SiDocusign } from "react-icons/si";
import Loading from "../../components/Loading";
import parse from "html-react-parser";

const BuyAuthorized = ({ setStep, step, answers, document }) => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [envelopeId, setEnvelopeId] = useState();
  const [terms, setTerms] = useState("");
  const [show, setShow] = useState(false);
  const toggleTerms = () => setShow(!show);

  const [ip, setIp] = useState();

  const documents = [];

  //push document to array if it is not empty

  document.map((item) => {
    if (item.url) {
      documents.push(item);
    }
  });

  useEffect(() => {
    const getIp = async () => {
      await axious.get("https://api.ipify.org?format=json").then((res) => {
        setIp(res.data.ip);
      });
    };
    getIp();
    let params = new URLSearchParams();
    params.append("name", "TC_buying");
    authService
      .getPageContents(params)
      .then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          for (let item of res.data) {
            if (item.name === "TC_buying") {
              setTerms(item.htmlText);
            }
          }
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }, []);

  const [agree, setAgree] = useState(false);
  const dateTime = new Date().toISOString();
  const hangleTerms = () => {
    setAgree(dateTime);
  };

  const handleSignDocusign = async () => {
    setLoader(true);
    await authService.getBuyingDocuSign(envelopeId).then((res) => {
      setLoader(false);
      setEnvelopeId(res.data.envelopeId);
      if (
        res.data.status !== "signing_complete" &&
        res.data.status !== "viewing_complete"
      ) {
        window.open(res.data.redirectUrl);
      }
    });
  };
  const handleSubmit = async () => {
    if (agree) {
      setLoader(true);
      await authService.getDocuSignStatus(envelopeId).then((res) => {
        if (
          res.data.status !== "signing_complete" &&
          res.data.status !== "viewing_complete"
        ) {
          setLoader(false);
          alert("Please sign the docusign before proceeding ");
        } else {
          answers = answers.map((item) => {
            return {
              questionId: item._id,
              answer: item.answer,
              explanation: item.explanation,
              files: item.files,
            };
          });
          authService
            .buyerRegister({
              auctionId: id,
              TC: { time: agree, IPAddress: ip },
              answers: answers,
              docusignId: res.data._id,
              funds: [documents],
            })
            .then((res) => {
              if (res.data.error) {
                setLoader(false);
                alert(res.data.error);
              } else {
                setLoader(false);
                alert("You have successfully registered to buy this auction");
                window.location.reload();
              }
            });
        }
      });
    } else {
      alert("Please agree to the terms and conditions");
    }
  };
  return (
    <>
      {" "}
      {loader ? <Loading /> : null}
      <Modal.Header closeButton>
        <Modal.Title
          className="fw-bold fs-1 "
          style={{
            color: "#D58F5C",
          }}
        >
          Buyer Agreement
        </Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ height: "300px" }}>
        <Container className="d-flex flex-column align-items-center justify-content-center h-100">
          <Button className="btn btn-primary" onClick={handleSignDocusign}>
            <SiDocusign />
            <span className="ms-3 fs-5">
              <strong>Sign</strong>
            </span>
            <span className="ms-2 fs-5">
              <strong>Document</strong>
            </span>
          </Button>

          <div className="mt-3">
            <input
              type="checkbox"
              name="terms"
              multiple
              onChange={hangleTerms}
            />

            <label onClick={() => toggleTerms()} className="ms-2">
              {" "}
              Agree to{" "}
              <span style={{ color: "#00a8ff", cursor: "pointer" }}>
                Terms & Conditions
              </span>
            </label>
          </div>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Row className="mt-3">
          <Button className="pre-btn" onClick={() => setStep(step - 1)}>
            Previous
          </Button>
          <Button onClick={handleSubmit} className="nxt-btn" id="next">
            Submit
          </Button>
        </Row>
      </Modal.Footer>
      <Modal size="xl" show={show} onHide={toggleTerms} centered>
        <Modal.Header closeButton>
          <Modal.Title> Buyer Terms and Conditions</Modal.Title>
        </Modal.Header>
        <Modal.Body unselectable="on" className="unselectable">
          {parse(terms)}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BuyAuthorized;
