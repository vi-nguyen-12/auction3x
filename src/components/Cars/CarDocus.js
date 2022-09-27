import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import authService from "../../services/authServices";
import { Row, Col, Button } from "react-bootstrap";
import Loading from "../../components/Loading";

function CarDocus({
  toggleStep,
  step,
  setStep,
  ownership,
  sellStep,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
  setMessage,
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
      name: "Title Certificate",
      officialName: "title_certificate",
      number: 3,
      documents: doc3,
      required: true,
    },
    {
      name: "Inspection Report",
      officialName: "inspection_report",
      number: 5,
      documents: doc5,
      required: true,
    },
    {
      name: "Registration Documents",
      officialName: "registration_document",
      number: 2,
      documents: doc2,
      required: true,
    },
    {
      name: "Ownership Documents",
      officialName: "ownership_document",
      number: 1,
      documents: doc1,
      required: false,
    },
    {
      name: "Loan Documents",
      officialName: "loan_document",
      number: 4,
      documents: doc4,
      required: false,
    },

    {
      name: "Engine Details",
      officialName: "engine_details",
      number: 6,
      documents: doc6,
      required: false,
    },
    {
      name: "Insurance Documents",
      officialName: "insurance_document",
      number: 7,
      documents: doc7,
      required: false,
    },
    {
      name: "Valuation Report",
      officialName: "valuation_report",
      number: 8,
      documents: doc8,
      required: false,
    },
    {
      name: "Other Documents",
      officialName: "other_document",
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

  useEffect(() => {
    if (propertyTest.documents.length > 0) {
      setDocument1((prev) =>
        propertyTest.documents.filter(
          (doc) => doc.officialName === "ownership_document"
        )
      );
      setDocument2((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "registration_document"
        );
      });
      setDocument3((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "title_certificate"
        );
      });
      setDocument4((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "loan_document"
        );
      });
      setDocument5((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "inspection_report"
        );
      });
      setDocument6((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "engine_details"
        );
      });
      setDocument7((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "insurance_document"
        );
      });
      setDocument8((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "valuation_report"
        );
      });
      setDocument9((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "other_document"
        );
      });
    }
  }, []);

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

  const ownership_document = doc1.map((document) => {
    return { ...document, officialName: "ownership_document" };
  });
  const registration_document = doc2.map((document) => {
    return { ...document, officialName: "registration_document" };
  });
  const title_certificate = doc3.map((document) => {
    return { ...document, officialName: "title_certificate" };
  });
  const loan_document = doc4.map((document) => {
    return { ...document, officialName: "loan_document" };
  });
  const inspection_report = doc5.map((document) => {
    return { ...document, officialName: "inspection_report" };
  });
  const engine_details = doc6.map((document) => {
    return { ...document, officialName: "engine_details" };
  });
  const insurance_document = doc7.map((document) => {
    return { ...document, officialName: "insurance_document" };
  });
  const valuation_report = doc8.map((document) => {
    return { ...document, officialName: "valuation_report" };
  });
  const others = doc9.map((document) => {
    return { ...document, officialName: "others" };
  });

  let documents = [
    ...ownership_document,
    ...registration_document,
    ...title_certificate,
    ...loan_document,
    ...inspection_report,
    ...engine_details,
    ...insurance_document,
    ...valuation_report,
    ...others,
    ...(listing_agreement ? [...listing_agreement] : []),
  ];

  const onSubmit = async (data) => {
    if (doc2.length !== 0 && doc3.length !== 0 && doc5.length !== 0) {
      const data = { documents, step: 4 };
      authService.editProperty(propertyTest._id, data).then((res) => {
        if (res.data.error) {
          if (res.data.error === "Invalid Token") {
            setMessage("");
            setMessage("Your session ended. Please log in! ");
            toggleSignIn(true);
          } else {
            setMessage("");
            setMessage(res.data.error);
          }
        } else {
          setPropertyTest(res.data);
          setStep(step + 1);
        }
      });
    } else {
      setMessage("");
      setTimeout(() => {
        setMessage("Please upload the required documents");
      }, 100);
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
          {datas.map((item, index) => (
            <Row key={index} className="mt-3">
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
                  <div className="upload-list" style={{ width: "100%" }}>
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
          <Col className="d-flex justify-content-center mt-2">
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

export default CarDocus;
