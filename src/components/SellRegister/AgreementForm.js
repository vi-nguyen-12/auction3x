import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import "../../styles/sell-register.css";
import authService from "../../services/authServices";
import { useHistory } from "react-router-dom";
import { SiDocusign } from "react-icons/si";
import { useParams } from "react-router-dom";
import { IoDocumentTextOutline } from "react-icons/io5";
import SellHeader from "./SellHeader";
import CloseButton from "react-bootstrap/CloseButton";
import Loading from "../../components/Loading";
import { Button, Row, Col } from "react-bootstrap";
import parse from "html-react-parser";

const Agree = ({
  toggleStep,
  step,
  propertyTest,
  toggleSignIn,
  windowSize,
  setMessage,
}) => {
  window.scrollTo(0, 0);
  const [agree, setAgree] = useState(false);
  const [envelopeId, setEnvelopeId] = useState();
  const [loader, setLoader] = useState(false);
  const [terms, setTerms] = useState("");
  const [show, setShow] = useState(false);
  const toggleTerms = () => setShow(!show);
  const toggle = () => {
    setAgree(!agree);
  };
  const { handleSubmit } = useForm();
  const history = useHistory();

  let attorney = propertyTest.details.broker_documents.filter(
    (item) => item.officialName === "power_of_attorney"
  );

  useEffect(() => {
    let params = new URLSearchParams();
    params.append("name", "TC_selling");
    authService
      .getPageContents(params)
      .then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          for (let item of res.data) {
            if (item.name === "TC_selling") {
              setTerms(item.htmlText);
            }
          }
        }
      })
      .catch((error) => {
        setMessage("");
        setMessage(error.message);
      });
  }, []);

  const sendDocusign = async () => {
    setLoader(true);
    await authService.sendSellDocuSign(propertyTest._id).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setMessage("");
        setTimeout(() => {
          setMessage(
            `DocuSign successfully sent to ${propertyTest.details?.owner_email}!`
          );
        }, 100);
      }
    });
    setLoader(false);
  };

  const handleSignDocusign = async () => {
    setLoader(true);
    await authService
      .getSellingDocuSign(propertyTest._id)
      .then((res) => {
        if (res.data.error === "Invalid Token") {
          setMessage("");
          setMessage("Your session ended. Please log in! ");
          setLoader(false);
          return toggleSignIn(true);
        }
        setLoader(false);
        setEnvelopeId(res.data.envelopeId);
        if (
          res.data.status !== "signing_complete" &&
          res.data.status !== "viewing_complete"
        ) {
          window.open(res.data.redirectUrl);
        }
      })
      .catch((error) => {
        setMessage("");
        setMessage(error.message);
        setLoader(false);
      });
  };

  const onSubmit = async (data) => {
    if (!agree) {
      setMessage("");
      setTimeout(() => {
        setMessage("You must agree to the terms and conditions");
      }, 100);
    } else {
      setLoader(true);
      await authService.getDocuSignStatus(envelopeId).then((res) => {
        if (
          res.data.status !== "signing_complete" &&
          res.data.status !== "viewing_complete"
        ) {
          setLoader(false);
          setMessage("");
          setTimeout(() => {
            setMessage("Please sign the docusign before proceeding ");
          }, 100);
        } else {
          const data = { docusignId: res.data._id, step: 5 };
          authService.editProperty(propertyTest._id, data).then((res) => {
            setLoader(false);
            if (res.data.error) {
              setMessage("");
              setMessage(res.data.error);
            } else {
              setMessage("");
              setMessage("Property Successfully Created!");
              history.push("/");
              window.scrollTo(0, 0);
            }
          });
        }
      });
    }
  };

  return (
    <>
      {loader ? <Loading /> : null}
      <div className="wrapper">
        <SellHeader step={step} />
        <div className="sell-bottom">
          <h3>SELLER AGREEMENT</h3>
          <form
            className="w-100 px-5"
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            <Row className="docusign-section">
              {propertyTest.details.broker_id && attorney.length === 0 ? (
                <Button className="btn btn-primary" onClick={sendDocusign}>
                  Send Docusign to Owner
                </Button>
              ) : (
                <Col className="d-grid justify-content-center align-items-center">
                  <div className="d-flex justify-content-center align-items-center docusign-logo">
                    <IoDocumentTextOutline size={35} color="#ffffff" />
                  </div>
                  <span className="text-white docusign-text">
                    Please review and sign the Seller Agreement below
                  </span>
                  <button onClick={handleSignDocusign} className="docusign-btn">
                    REVIEW DOCUMENT
                  </button>
                </Col>
              )}
            </Row>
            <Row className="mt-3 mb-5 d-flex justify-content-center">
              <Col className="d-flex justify-content-center">
                <input className="mx-2" type="checkbox" onChange={toggle} />
                <label>
                  I agree to the
                  <span
                    onClick={() => toggleTerms()}
                    style={{ color: "#00a8ff", cursor: "pointer" }}
                  >
                    {" "}
                    Terms and Conditions
                  </span>
                </label>
              </Col>
            </Row>
            <Row className="mt-5 d-flex justify-content-center">
              <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
                Previous
              </Button>
              <Button className="nxt-btn" type="submit">
                Submit
              </Button>
            </Row>
          </form>
        </div>
      </div>

      <Modal size="xl" show={show} onHide={toggleTerms} centered>
        <Modal.Header className="auction-modal-header">
          <Modal.Title className="auction-modal-title px-3">
            Seller Terms and Conditions
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

export default Agree;
