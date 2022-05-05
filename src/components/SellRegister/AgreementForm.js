import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../styles/SellRegister.css";
import authService from "../../services/authServices";
import { useHistory } from "react-router-dom";
import { SiDocusign } from "react-icons/si";
import { useParams } from "react-router-dom";
import SellHeader from "./SellHeader";

const Agree = ({
  toogleStep,
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
  const toggle = () => {
    setAgree(!agree);
  };
  const { handleSubmit } = useForm();
  const params = useParams();
  const history = useHistory();

  const steps = sellStep ? sellStep : params.step ? params.step : 0;

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
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className="agree-content"
    >
      <SellHeader step={step} />
      <div className="agree-sell-bottom">
        <div className="header">
          <h2 style={{ color: "#6d6d6d", fontWeight: "bold", marginTop:"20px" }}>
            SELLER AGREEMENT
          </h2>
          {/* <p>sdfjshd dsjfhasldj sdfhljdhf sdhlf</p> */}
        </div>
        {loader ? (
          <div className="loader">
            <div className="spinning" />
          </div>
        ) : null}
        <div style={{ marginTop: "200px" }}>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleSignDocusign}
          >
            Sign DocuSign <SiDocusign />
          </button>
        </div>
        <div
          style={{
            height: "fit-content",
            position: "absolute",
            bottom: "200px",
            color: "black",
          }}
        >
          <input
            style={{ marginRight: "10px" }}
            type="checkbox"
            onChange={toggle}
          />
          <label>I agree to the terms and conditions</label>
        </div>
        <div className="agree-bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default Agree;
