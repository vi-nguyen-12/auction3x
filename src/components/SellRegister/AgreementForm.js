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

const Agree = ({ toggleStep, step, propertyTest }) => {
  window.scrollTo(0, 0);
  const [agree, setAgree] = useState(false);
  const [envelopeId, setEnvelopeId] = useState();
  const [loader, setLoader] = useState(false);
  const [terms, setTerms] = useState();
  const [show, setShow] = useState(false);
  const toggleTerms = () => setShow(!show);
  const toggle = () => {
    setAgree(!agree);
  };
  const { handleSubmit } = useForm();
  const history = useHistory();

  useEffect(() => {
    authService.getDocuments().then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        res.data.filter((doc) => {
          if (doc.officialName === "TC_selling") {
            setTerms(doc.url);
          }
        });
      }
    });
  }, []);

  const handleSignDocusign = async () => {
    setLoader(true);
    await authService
      .getSellingDocuSign(envelopeId)
      .then((res) => {
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
        alert(error);
      });
  };

  const onSubmit = async (data) => {
    if (!agree) {
      alert("You must agree to the terms and conditions");
    } else {
      setLoader(true);
      await authService.getDocuSignStatus(envelopeId).then((res) => {
        if (
          res.data.status !== "signing_complete" &&
          res.data.status !== "viewing_complete"
        ) {
          setLoader(false);
          alert("Please sign the docusign before proceeding ");
        } else {
          const data = { docusignId: res.data._id, step: 5 };
          authService.editProperty(propertyTest._id, data).then((res) => {
            setLoader(false);
            if (res.data.error) {
              alert(res.data.error);
            } else {
              alert("Property Successfully Created!");
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

      <Modal size="lg" show={show} onHide={toggleTerms} centered>
        <Modal.Body style={{ height: "70vh" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <CloseButton className="modal-close" onClick={toggleTerms} />
          </div>
          <embed src={terms} width="100%" height="100%" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Agree;
