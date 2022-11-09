import React from "react";
import "../../styles/sell-register.css";
import { Modal, Button, Container, Row, Col } from "react-bootstrap";
import { useState, useEffect } from "react";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import axious from "axios";
import { IoDocumentTextOutline } from "react-icons/io5";
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
  auctionId,
  toggleDocu,
  setDocuUrl,
  client,
}) => {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [docuId, setDocuId] = useState();
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

  const sendDocusign = async () => {
    setLoader(true);
    await authService.sendSellDocuSign().then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setMessage("");
        setTimeout(() => {
          setMessage(`DocuSign successfully sent to ${client?.email}!`);
        }, 100);
      }
    });
    setLoader(false);
  };

  const handleSignDocusign = async () => {
    setLoader(true);
    await authService
      .getBuyingDocuSign(auctionId)
      .then((res) => {
        if (res.data.error === "Invalid Token") {
          setMessage("");
          setMessage("Your session ended. Please log in! ");
          setLoader(false);
          window.location.reload();
        }
        setLoader(false);
        setDocuId(res.data.docusignId);
        if (
          res.data.status !== "signing_complete" &&
          res.data.status !== "viewing_complete"
        ) {
          window.open(res.data.redirectUrl);
          // setDocuUrl(res.data.redirectUrl);
          // toggleDocu();
        }
      })
      .catch((error) => {
        setMessage("");
        setMessage(error.message);
        setLoader(false);
      });
  };
  const handleSubmit = async () => {
    if (agree) {
      setLoader(true);
      await authService.getDocuSignStatus(docuId).then((res) => {
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
              client,
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
                  "You have successfully registered to bid this auction"
                );
                setLoader(false);
                window.location.reload();
              }
            })
            .catch((error) => {
              setMessage("");
              setMessage(error.message);
              setLoader(false);
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
      <Modal.Body>
        <Container className="d-flex flex-column align-items-center justify-content-center h-100">
          <Row className="docusign-section w-100 mt-3">
            <Col className="d-flex flex-column align-items-center justify-content-center">
              <div className="d-flex justify-content-center align-items-center docusign-logo">
                <IoDocumentTextOutline size={35} color="#ffffff" />
              </div>
              {client?.documents?.length > 0 || !client ? (
                <>
                  <span className="text-white docusign-text">
                    Please review and sign the Seller Agreement below
                  </span>
                  <button
                    type="button"
                    onClick={handleSignDocusign}
                    className="docusign-btn"
                  >
                    REVIEW DOCUMENT
                  </button>
                </>
              ) : (
                <>
                  <span className="text-white docusign-text">
                    You are not authorized to sign this document. Please send
                    the document to the owner for signing.
                  </span>
                  <button
                    type="button"
                    onClick={sendDocusign}
                    className="docusign-btn"
                  >
                    SEND DOCUSIGN TO OWNER
                  </button>
                </>
              )}
            </Col>
          </Row>

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
        <Modal.Header className="auction-modal-header p-4">
          <Modal.Title className="auction-modal-title">
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
