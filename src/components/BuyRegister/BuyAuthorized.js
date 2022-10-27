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
import CloseButton from "react-bootstrap/CloseButton";
import { MdClose } from "react-icons/md";
import { BsFillCheckCircleFill } from "react-icons/bs";

const BuyAuthorized = ({
  setStep,
  step,
  answers,
  document,
  windowSize,
  setMessage,
}) => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [envelopeId, setEnvelopeId] = useState();
  const [terms, setTerms] = useState("");
  const [show, setShow] = useState(false);
  const [buyerType, setBuyerType] = useState();
  const [brokerControl, setBrokerControl] = useState();
  const [buyerControl, setBuyerControl] = useState();
  const [attorney, setAttorney] = useState([]);

  const toggleTerms = () => setShow(!show);

  const [ip, setIp] = useState();

  const documents = [];

  const getAttorneyFile = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((res) => {
      if (res.data.error) {
        setMessage(res.data.error);
      } else {
        setAttorney((prev) =>
          res.data.map((doc) => ({ ...doc, officialName: "attorney" }))
        );
        setBuyerControl("attorney");
      }
    });
  };

  const handleDeleteAttorney = (url) => () => {
    setAttorney(attorney.filter((document) => document.url !== url));
  };

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
          if (res.data.error === "Invalid Token") {
            window.location.reload();
          } else {
            setMessage("");
            setMessage(res.data.error);
          }
        } else {
          for (let item of res.data) {
            if (item.name === "TC_buying") {
              setTerms(item.htmlText);
            }
          }
        }
      })
      .catch((error) => {
        setMessage("");
        setMessage(error.message);
      });
  }, [setMessage]);

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
          setMessage("");
          setTimeout(() => {
            setMessage("Please sign the docusign before proceeding");
          }, 100);
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
              documents,
            })
            .then((res) => {
              if (res.data.error) {
                if (res.data.error === "Invalid Token") {
                  window.location.reload();
                } else {
                  setMessage("");
                  setMessage(res.data.error);
                  setLoader(false);
                }
              } else {
                setMessage("");
                setMessage(
                  "You have successfully registered to buy this auction"
                );
                setLoader(false);
                window.location.reload();
              }
            });
        }
      });
    } else {
      setMessage("");
      setTimeout(() => {
        setMessage("Please agree to the terms and conditions");
      }, 100);
    }
  };

  return (
    <>
      {" "}
      {loader ? <Loading /> : null}
      <Modal.Body style={{ height: "300px" }}>
        <Container className="d-flex flex-column align-items-center justify-content-center h-100">
          <div className="d-flex">
            <Button onClick={() => setBuyerControl("buyer")} className="mx-2">
              Buyer
            </Button>
            <Button onClick={() => setBuyerControl("broker")}>Broker</Button>
          </div>
          {(buyerControl === "buyer" || buyerControl === "attorney") && (
            <Button
              className="btn btn-primary mt-4"
              onClick={handleSignDocusign}
            >
              <SiDocusign />
              <span className="ms-3 fs-5">
                <strong>Sign Document</strong>
              </span>
            </Button>
          )}
          {buyerControl === "broker" && (
            <div className="d-flex align-items-center mt-3">
              <div className="d-flex flex-column">
                <span style={{ fontWeight: "600", color: "black" }}>
                  Power of Attorney(.pdf){" "}
                </span>
                <input
                  type="file"
                  id="docus"
                  accept=".pdf"
                  className="form-control"
                  onChange={getAttorneyFile}
                  hidden
                  multiple
                />
                <div className="d-flex">
                  <label htmlFor="docus" className="btn btn-primary">
                    Upload
                  </label>
                </div>
                <div className="d-grid">
                  {attorney.map((doc, index) => (
                    <span key={index}>
                      {doc.name}
                      <Button
                        className="bg-transparent border-0"
                        onClick={handleDeleteAttorney(doc.url)}
                      >
                        <MdClose fontSize="1.5em" color="red" />
                      </Button>
                    </span>
                  ))}
                </div>
              </div>
              <div className="d-flex align-items-center fw-bold my-2 mx-4">
                Or
              </div>
              <div className="d-flex">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Owner Email"
                />
                <div className="d-flex justify-content-end mx-2">
                  <Button
                    className="btn btn-primary d-flex justify-content-center"
                    style={{ width: "50px" }}
                    onClick={() => setBuyerControl("send")}
                  >
                    Send
                  </Button>
                </div>
              </div>
              {/* {attorney.length > 0 && (
                          <Button
                            className="btn btn-primary mt-4"
                            onClick={handleSignDocusign}
                          >
                            <SiDocusign />
                            <span className="ms-3 fs-5">
                              <strong>Sign Document</strong>
                            </span>
                          </Button>
                        )} */}
            </div>
          )}
          {buyerControl === "send" && (
            <div className="d-flex flex-column align-items-center mt-3">
              <BsFillCheckCircleFill color="green" fontSize="2em" />
              <span className="ms-3 fs-5">
                <strong>Document Sent</strong>
              </span>
            </div>
          )}

          <div className="mt-5">
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
        <Modal.Header className="auction-modal-header">
          <Modal.Title className="auction-modal-title px-3">
            Buyer Terms and Conditions
          </Modal.Title>
        </Modal.Header>
        <div
          style={{
            position: "absolute",
            top: windowSize < 600 ? "0" : "25px",
            right: windowSize < 600 ? "0" : "25px",
            zIndex: "999",
          }}
        >
          <CloseButton
            className="modal-close"
            style={{ backgroundColor: "white" }}
            onClick={() => {
              toggleTerms();
            }}
          />
        </div>
        <Modal.Body unselectable="on" className="unselectable">
          {parse(terms)}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default BuyAuthorized;
