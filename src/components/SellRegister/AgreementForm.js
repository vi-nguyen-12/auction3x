import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Modal } from "react-bootstrap";
import "../../styles/sell-register.css";
import authService from "../../services/authServices";
import { useHistory } from "react-router-dom";
import { SiDocusign } from "react-icons/si";
import { useParams } from "react-router-dom";
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

  const handleSignDocusign = async () => {
    setLoader(true);
    await authService
      .getSellingDocuSign(envelopeId)
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
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            <Row className="mt-5">
              <Button className="btn btn-primary" onClick={handleSignDocusign}>
                Sign DocuSign <SiDocusign />
              </Button>
            </Row>
            <Row className="mt-3 mb-5">
              <Col sm={1}>
                <input className="mr-2" type="checkbox" onChange={toggle} />
              </Col>
              <Col>
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
            <Row className="mt-5">
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
