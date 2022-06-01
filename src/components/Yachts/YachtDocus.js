import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";

function YachtDocus({
  toggleStep,
  step,
  toggleDocuments,
  ownership,
  propId,
  images,
  videos,
  propertyData,
  toggleSellStep,
  sellStep,
  getPropId,
  document,
}) {
  const { register, handleSubmit } = useForm();
  const [doc1, setDocument1] = useState([]);
  const [doc2, setDocument2] = useState([]);
  const [doc3, setDocument3] = useState([]);
  const [doc4, setDocument4] = useState([]);
  const [doc5, setDocument5] = useState([]);
  const [doc6, setDocument6] = useState([]);
  const [doc7, setDocument7] = useState([]);
  const [doc8, setDocument8] = useState([]);
  const [doc9, setDocument9] = useState([]);
  const [loader, setLoader] = useState(false);
  const datas = [
    {
      name: "Vessel Registration Documents",
      officialName: "vesselRegistrationDocuments",
      number: 1,
      documents: doc1,
      required: true,
    },
    {
      name: "Vessel Maintenance Report",
      officialName: "vesselMaintenanceReport",
      number: 2,
      documents: doc2,
      required: true,
    },
    {
      name: "Vessel Engine Type",
      officialName: "vesselEngineType",
      number: 3,
      documents: doc3,
      required: true,
    },
    {
      name: "Vessel Performance Report",
      officialName: "vesselPerformanceReport",
      number: 4,
      documents: doc4,
      required: true,
    },
    {
      name: "Vessel Deck Details",
      officialName: "vesselDeckDetails",
      number: 5,
      documents: doc5,
      required: true,
    },
    {
      name: "Vessel Latest Insurance",
      officialName: "vesselLatestInsurance",
      number: 6,
      documents: doc6,
      required: true,
    },
    {
      name: "Vessel Marine Surveyor Report(approved)",
      officialName: "vesselMarineSurveyorReport",
      number: 7,
      documents: doc7,
      required: false,
    },
    {
      name: "Vessel Valuation Report",
      officialName: "vesselvaluationReport",
      number: 8,
      documents: doc8,
      required: true,
    },
    {
      name: "Other Documents",
      officialName: "otherDocuments",
      number: 9,
      documents: doc9,
      required: false,
    },
  ];
  const listing_agreement = ownership
    ? ownership.documents
      ? ownership.documents.length > 0
        ? ownership.documents
        : []
      : []
    : [];

  const params = useParams();
  const steps = sellStep ? sellStep : params.step ? params.step : 0;
  const onChange = (number) => async (e) => {
    setLoader(true);

    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((response) => {
      if (response.status === 200) {
        switch (number) {
          case 1:
            setDocument1([...doc1, ...response.data]);
            break;
          case 2:
            setDocument2([...doc2, ...response.data]);
            break;
          case 3:
            setDocument3([...doc3, ...response.data]);
            break;
          case 4:
            setDocument4([...doc4, ...response.data]);
            break;
          case 5:
            setDocument5([...doc5, ...response.data]);
            break;
          case 6:
            setDocument6([...doc6, ...response.data]);
            break;
          case 7:
            setDocument7([...doc7, ...response.data]);
            break;
          case 8:
            setDocument8([...doc8, ...response.data]);
            break;
          case 9:
            setDocument9([...doc9, ...response.data]);
            break;
          default:
        }
        setLoader(false);
      }
    });
    e.target.value = null;
  };
  const incompProperty = useSelector((state) => state.incompProperty);

  useEffect(() => {
    if (params.id) {
      const prop = incompProperty.filter((item) => item._id === params.id);
      if (prop[0].documents.length > 1) {
        const documents = prop[0].documents.map((document) => {
          if (document.isVerified && document._id) {
            delete document.isVerified;
            delete document._id;
            return document;
          }
        });
        setDocument1(
          documents
            ? documents.filter(
                (item) => item.officialName === "vessel_registration"
              )
            : []
        );
        setDocument2(
          documents
            ? documents.filter(
                (item) => item.officialName === "vessel_maintenance_report"
              )
            : []
        );
        setDocument3(
          documents
            ? documents.filter(
                (item) => item.officialName === "vessel_engine_type"
              )
            : []
        );
        setDocument4(
          documents
            ? documents.filter(
                (item) => item.officialName === "vessel_performance_report"
              )
            : []
        );
        setDocument5(
          documents
            ? documents.filter(
                (item) => item.officialName === "vessel_deck_details"
              )
            : []
        );
        setDocument6(
          documents
            ? documents.filter(
                (item) => item.officialName === "vessel_insurance"
              )
            : []
        );
        setDocument7(
          documents
            ? documents.filter(
                (item) => item.officialName === "vessel_marine_surveyor_report"
              )
            : []
        );
        setDocument8(
          documents
            ? documents.filter(
                (item) => item.officialName === "vessel_valuation_report"
              )
            : []
        );
        setDocument9(
          documents
            ? documents.filter((item) => item.officialName === "others")
            : []
        );
      } else {
        setDocument1(
          document
            ? document.filter(
                (item) => item.officialName === "vessel_registration"
              )
            : []
        );
        setDocument2(
          document
            ? document.filter(
                (item) => item.officialName === "vessel_maintenance_report"
              )
            : []
        );
        setDocument3(
          document
            ? document.filter(
                (item) => item.officialName === "vessel_engine_type"
              )
            : []
        );
        setDocument4(
          document
            ? document.filter(
                (item) => item.officialName === "vessel_performance_report"
              )
            : []
        );
        setDocument5(
          document
            ? document.filter(
                (item) => item.officialName === "vessel_deck_details"
              )
            : []
        );
        setDocument6(
          document
            ? document.filter(
                (item) => item.officialName === "vessel_insurance"
              )
            : []
        );
        setDocument7(
          document
            ? document.filter(
                (item) => item.officialName === "vessel_marine_surveyor_report"
              )
            : []
        );
        setDocument8(
          document
            ? document.filter(
                (item) => item.officialName === "vessel_valuation_report"
              )
            : []
        );
        setDocument9(
          document
            ? document.filter((item) => item.officialName === "others")
            : []
        );
      }
    } else {
      setDocument1(
        document
          ? document.filter(
              (item) => item.officialName === "vessel_registration"
            )
          : []
      );
      setDocument2(
        document
          ? document.filter(
              (item) => item.officialName === "vessel_maintenance_report"
            )
          : []
      );
      setDocument3(
        document
          ? document.filter(
              (item) => item.officialName === "vessel_engine_type"
            )
          : []
      );
      setDocument4(
        document
          ? document.filter(
              (item) => item.officialName === "vessel_performance_report"
            )
          : []
      );
      setDocument5(
        document
          ? document.filter(
              (item) => item.officialName === "vessel_deck_details"
            )
          : []
      );
      setDocument6(
        document
          ? document.filter((item) => item.officialName === "vessel_insurance")
          : []
      );
      setDocument7(
        document
          ? document.filter(
              (item) => item.officialName === "vessel_marine_surveyor_report"
            )
          : []
      );
      setDocument8(
        document
          ? document.filter(
              (item) => item.officialName === "vessel_valuation_report"
            )
          : []
      );
      setDocument9(
        document
          ? document.filter((item) => item.officialName === "others")
          : []
      );
    }
  }, [incompProperty, document, params.id]);

  const handleDelete = (url) => () => {
    setDocument1(doc1.filter((document) => document.url !== url));
    setDocument2(doc2.filter((document) => document.url !== url));
    setDocument3(doc3.filter((document) => document.url !== url));
    setDocument4(doc4.filter((document) => document.url !== url));
    setDocument5(doc5.filter((document) => document.url !== url));
    setDocument6(doc6.filter((document) => document.url !== url));
    setDocument7(doc7.filter((document) => document.url !== url));
    setDocument8(doc8.filter((document) => document.url !== url));
    setDocument9(doc9.filter((document) => document.url !== url));
  };

  const vessel_registration = doc1.map((document) => {
    return { ...document, officialName: "vessel_registration" };
  });
  const vessel_maintenance_report = doc2.map((document) => {
    return { ...document, officialName: "vessel_maintenance_report" };
  });
  const vessel_engine_type = doc3.map((document) => {
    return { ...document, officialName: "vessel_engine_type" };
  });
  const vessel_performance_report = doc4.map((document) => {
    return { ...document, officialName: "vessel_performance_report" };
  });
  const vessel_deck_details = doc5.map((document) => {
    return { ...document, officialName: "vessel_deck_details" };
  });
  const vessel_insurance = doc6.map((document) => {
    return { ...document, officialName: "vessel_insurance" };
  });
  const vessel_marine_surveyor_report = doc7.map((document) => {
    return { ...document, officialName: "vessel_marine_surveyor_report" };
  });
  const vessel_valuation_report = doc8.map((document) => {
    return { ...document, officialName: "vessel_valuation_report" };
  });
  const others = doc9.map((document) => {
    return { ...document, officialName: "others" };
  });

  let documents = [
    ...vessel_registration,
    ...vessel_maintenance_report,
    ...vessel_engine_type,
    ...vessel_performance_report,
    ...vessel_deck_details,
    ...vessel_insurance,
    ...vessel_marine_surveyor_report,
    ...vessel_valuation_report,
    ...others,
    ...(listing_agreement ? [...listing_agreement] : []),
  ];

  const saveInfo = async (data) => {
    if (propId || params.id) {
      if (parseInt(steps) === 1) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            ...propertyData,
            images,
            videos,
            documents,
            step: 4,
          },
        };
        await authService.saveInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toggleSellStep(4);
            alert("Saved Successfully!");
          }
        });
      } else if (parseInt(steps) === 2) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            images,
            videos,
            documents,
            step: 4,
          },
        };
        await authService.saveInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toggleSellStep(4);
            alert("Saved Successfully!");
          }
        });
      } else if (parseInt(steps) === 3) {
        const datas = {
          id: propId ? propId : params.id,
          details: {
            documents,
            step: 4,
          },
        };
        await authService.saveInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toggleSellStep(4);
            alert("Saved Successfully!");
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
        step: 4,
      };
      await authService.savePropInfo(datas).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          toggleSellStep(4);
          getPropId(response.data._id);
          alert("Saved Successfully!");
        }
      });
    }
  };

  const onSubmit = async (data) => {
    if (
      doc1.length !== 0 &&
      doc2.length !== 0 &&
      doc3.length !== 0 &&
      doc4.length !== 0 &&
      doc5.length !== 0 &&
      doc6.length !== 0 &&
      doc7.length !== 0 &&
      doc8.length !== 0
    ) {
      toggleDocuments(documents);
      toggleStep(step + 1);
    } else {
      alert("Please upload the required documents");
    }
  };
  return (
    <div className="sell-bottom">
      {loader ? <Loading /> : null}
      <h3 className="mb-1"> UPLOAD DOCUMENTS</h3>
      <p className="mb-4">We only accept PDF Files</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row
          style={{
            overflowY: "scroll",
            color: "black",
          }}
        >
          {datas.map((item) => (
            <Row className="mt-3">
              <Col lg={5}>
                <h5>
                  {" "}
                  {item.name} (.pdf){" "}
                  {item.required && <span style={{ color: "#ff0000" }}>*</span>}
                </h5>
                <input
                  id={item.officialName}
                  accept=".pdf"
                  type="file"
                  name={item.name}
                  multiple
                  hidden
                  {...register(`${item.officialName}`, {
                    onChange: onChange(item.number),
                  })}
                  style={{ border: "red" }}
                />
                <div className="upload-wrapper">
                  <details>
                    <summary>
                      <label htmlFor={item.officialName}>+ Documents</label>
                    </summary>
                    <div>
                      <label
                        style={{ width: "50%", marginTop: "10px" }}
                        htmlFor={item.officialName}
                      >
                        <AiOutlinePlusCircle />
                      </label>
                    </div>
                  </details>
                </div>
              </Col>
              <Col lg={7} className="pt-lg-5">
                {item.documents.length > 0 && (
                  <div className="upload-list">
                    {item.documents.map((document, index) => (
                      <div key={index}>
                        <span>
                          {document.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(document.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </Col>
            </Row>
          ))}
        </Row>
        <Row className="mt-5">
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-sm-center justify-content-md-end mt-2"
          >
            <Button className="save-btn" onClick={saveInfo}>
              Save
            </Button>
          </Col>
          <Col xs={12} md={8} className="d-flex mt-2">
            <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
              Previous
            </Button>
            <Button className="nxt-btn" id="next" type="submit">
              Next
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default YachtDocus;
