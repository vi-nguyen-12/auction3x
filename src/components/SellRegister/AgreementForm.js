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

const Agree = ({
  toggleStep,
  step,
  propertyData,
  images,
  videos,
  documents,
  ownership,
  sellStep,
  propId,
  propertyType,
}) => {
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
  const params = useParams();
  const history = useHistory();

  const steps = sellStep ? sellStep : params.step ? params.step : 0;

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
          if (propertyType === "real-estate") {
            if (params.id || propId) {
              if (parseInt(steps) === 1) {
                const datas = {
                  id: params.id ? params.id : propId,
                  details: {
                    ...propertyData,
                    images,
                    videos,
                    documents,
                    step: 5,
                    docusignId: res.data._id,
                  },
                };
                authService.putRealEstateInfo(datas).then((res) => {
                  if (res.data.error) {
                    setLoader(false);
                    alert(res.data.error);
                  } else {
                    setLoader(false);
                    alert("Property Successfully Created!");
                    history.push("/");
                  }
                });
              } else if (parseInt(steps) === 2) {
                const datas = {
                  id: params.id ? params.id : propId,
                  details: {
                    images,
                    videos,
                    documents,
                    step: 5,
                    docusignId: res.data._id,
                  },
                };
                authService.putRealEstateInfo(datas).then((res) => {
                  if (res.data.error) {
                    setLoader(false);
                    alert(res.data.error);
                  } else {
                    setLoader(false);
                    alert("Property Successfully Created!");
                    history.push("/");
                    window.scrollTo(0, 0);
                  }
                });
              } else if (parseInt(steps) === 3) {
                const datas = {
                  id: params.id ? params.id : propId,
                  details: {
                    documents,
                    step: 5,
                    docusignId: res.data._id,
                  },
                };
                authService.putRealEstateInfo(datas).then((res) => {
                  if (res.data.error) {
                    setLoader(false);
                    alert(res.data.error);
                  } else {
                    setLoader(false);
                    alert("Property Successfully Created!");
                    history.push("/");
                    window.scrollTo(0, 0);
                  }
                });
              } else if (parseInt(steps) === 4) {
                const datas = {
                  id: params.id ? params.id : propId,
                  details: {
                    step: 5,
                    docusignId: res.data._id,
                  },
                };
                authService.putRealEstateInfo(datas).then((res) => {
                  if (res.data.error) {
                    setLoader(false);
                    alert(res.data.error);
                  } else {
                    setLoader(false);
                    alert("Property Successfully Created!");
                    history.push("/");
                    window.scrollTo(0, 0);
                  }
                });
              }
            } else {
              const datas = {
                ...ownership,
                ...propertyData,
                images,
                videos,
                documents,
                step: 5,
                docusignId: res.data._id,
              };
              authService.postRealEstateInfo(datas).then((res) => {
                if (res.data.error) {
                  setLoader(false);
                  alert(res.data.error);
                } else {
                  setLoader(false);
                  alert("Property Successfully Created!");
                  history.push("/");
                  window.scrollTo(0, 0);
                }
              });
            }
          } else {
            if (params.id || propId) {
              if (parseInt(steps) === 1) {
                const datas = {
                  id: params.id ? params.id : propId,
                  details: {
                    ...propertyData,
                    images,
                    videos,
                    documents,
                    step: 5,
                    docusignId: res.data._id,
                  },
                };
                authService.saveInfo(datas).then((res) => {
                  if (res.data.error) {
                    setLoader(false);
                    alert(res.data.error);
                  } else {
                    setLoader(false);
                    alert("Property Successfully Created!");
                    history.push("/");
                  }
                });
              } else if (parseInt(steps) === 2) {
                const datas = {
                  id: params.id ? params.id : propId,
                  details: {
                    images,
                    videos,
                    documents,
                    step: 5,
                    docusignId: res.data._id,
                  },
                };
                authService.saveInfo(datas).then((res) => {
                  if (res.data.error) {
                    setLoader(false);
                    alert(res.data.error);
                  } else {
                    setLoader(false);
                    alert("Property Successfully Created!");
                    history.push("/");
                    window.scrollTo(0, 0);
                  }
                });
              } else if (parseInt(steps) === 3) {
                const datas = {
                  id: params.id ? params.id : propId,
                  details: {
                    documents,
                    step: 5,
                    docusignId: res.data._id,
                  },
                };
                authService.saveInfo(datas).then((res) => {
                  if (res.data.error) {
                    setLoader(false);
                    alert(res.data.error);
                  } else {
                    setLoader(false);
                    alert("Property Successfully Created!");
                    history.push("/");
                    window.scrollTo(0, 0);
                  }
                });
              } else if (parseInt(steps) === 4) {
                const datas = {
                  id: params.id ? params.id : propId,
                  details: {
                    step: 5,
                    docusignId: res.data._id,
                  },
                };
                authService.saveInfo(datas).then((res) => {
                  if (res.data.error) {
                    setLoader(false);
                    alert(res.data.error);
                  } else {
                    setLoader(false);
                    alert("Property Successfully Created!");
                    history.push("/");
                    window.scrollTo(0, 0);
                  }
                });
              }
            } else {
              const datas = {
                ...ownership,
                ...propertyData,
                images,
                videos,
                documents,
                step: 5,
                docusignId: res.data._id,
              };
              authService.savePropInfo(datas).then((res) => {
                if (res.data.error) {
                  setLoader(false);
                  alert(res.data.error);
                } else {
                  setLoader(false);
                  alert("Property Successfully Created!");
                  history.push("/");
                  window.scrollTo(0, 0);
                }
              });
            }
          }
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
          <div>
            <CloseButton className="modal-close" onClick={toggleTerms} />
          </div>
          <embed src={terms} width="100%" height="100%" />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Agree;
