import React, { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { Row, Col, Button } from "react-bootstrap";
import Loading from "../../components/Loading";

function RealEstateDocus({
  toggleStep,
  step,
  setStep,
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
  propertyTest,
  setPropertyTest,
  toggleSignIn,
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
  const [loader, setLoader] = useState(false);
  const datas = [
    {
      name: "Title Report",
      officialName: "titleReport",
      number: 1,
      documents: doc1,
      required: true,
    },
    {
      name: "Purchase Agreement",
      officialName: "purchaseAgreement",
      number: 4,
      documents: doc4,
      required: true,
    },
    {
      name: "Insurance Copy",
      officialName: "insuranceCopy",
      number: 2,
      documents: doc2,
      required: false,
    },
    {
      name: "Financial Documents",
      officialName: "financialDocuments",
      number: 3,
      documents: doc3,
      required: false,
    },
    {
      name: "Third-party Report",
      officialName: "thirdPartyReport",
      number: 5,
      documents: doc5,
      required: false,
    },
    {
      name: "Market and Valuations",
      officialName: "marketValuations",
      number: 6,
      documents: doc6,
      required: false,
    },
    {
      name: "Demographics",
      officialName: "demographics",
      number: 7,
      documents: doc7,
      required: false,
    },
    {
      name: "Other Documents",
      officialName: "otherDocuments",
      number: 8,
      documents: doc8,
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
          (doc) => doc.officialName === "title_report"
        )
      );
      setDocument2((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "insurance_copy"
        );
      });
      setDocument3((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "financial_document"
        );
      });
      setDocument4((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "purchase_agreement"
        );
      });
      setDocument5((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "third_party_report"
        );
      });
      setDocument6((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "market_and_valuations"
        );
      });
      setDocument7((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "demographics"
        );
      });
      setDocument8((prev) => {
        return propertyTest.documents.filter(
          (doc) => doc.officialName === "others"
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
  };

  const titleReport = doc1.map((document) => {
    return { ...document, officialName: "title_report" };
  });
  const insuranceCopy = doc2.map((document) => {
    return { ...document, officialName: "insurance_copy" };
  });
  const financialDocuments = doc3.map((document) => {
    return { ...document, officialName: "financial_document" };
  });
  const purchaseAgreement = doc4.map((document) => {
    return { ...document, officialName: "purchase_agreement" };
  });
  const thirdpartyReport = doc5.map((document) => {
    return { ...document, officialName: "third-party_report" };
  });
  const marketandValuations = doc6.map((document) => {
    return { ...document, officialName: "market_and_valuations" };
  });
  const demographics = doc7.map((document) => {
    return { ...document, officialName: "demographics" };
  });
  const otherDocuments = doc8.map((document) => {
    return { ...document, officialName: "others" };
  });

  let documents = [
    ...titleReport,
    ...insuranceCopy,
    ...financialDocuments,
    ...purchaseAgreement,
    ...thirdpartyReport,
    ...marketandValuations,
    ...demographics,
    ...otherDocuments,
    ...(listing_agreement ? [...listing_agreement] : []),
  ];

  // const saveInfo = async () => {
  //   if (propId || params.id) {
  //     if (parseInt(steps) === 1) {
  //       const datas = {
  //         id: propId ? propId : params.id,
  //         changes: {
  //           ...propertyData,
  //           images,
  //           videos,
  //           documents,
  //           step: 4,
  //         },
  //       };
  //       await authService.putRealEstateInfo(datas).then((response) => {
  //         if (response.data.error) {
  //           alert(response.data.error);
  //         } else {
  //           toggleSellStep(4);
  //         }
  //       });
  //     } else if (parseInt(steps) === 2) {
  //       const datas = {
  //         id: propId ? propId : params.id,
  //         changes: {
  //           images,
  //           videos,
  //           documents,
  //           step: 4,
  //         },
  //       };
  //       await authService.putRealEstateInfo(datas).then((response) => {
  //         if (response.data.error) {
  //           alert(response.data.error);
  //         } else {
  //           toggleSellStep(5);
  //         }
  //       });
  //     } else if (parseInt(steps) === 3) {
  //       const datas = {
  //         id: propId ? propId : params.id,
  //         changes: {
  //           documents,
  //           step: 4,
  //         },
  //       };
  //       await authService.putRealEstateInfo(datas).then((response) => {
  //         if (response.data.error) {
  //           alert(response.data.error);
  //         } else {
  //           toggleSellStep(6);
  //         }
  //       });
  //     } else if (parseInt(steps) === 4) {
  //       const datas = {
  //         id: propId ? propId : params.id,
  //         changes: {
  //           documents,
  //           step: 4,
  //         },
  //       };
  //       await authService.putRealEstateInfo(datas).then((response) => {
  //         if (response.data.error) {
  //           alert(response.data.error);
  //         } else {
  //           toggleSellStep(6);
  //         }
  //       });
  //     }
  //   } else {
  //     const datas = {
  //       ...ownership,
  //       ...propertyData,
  //       images,
  //       videos,
  //       documents,
  //       step: 4,
  //     };
  //     await authService.postRealEstateInfo(datas).then((response) => {
  //       if (response.data.error) {
  //         alert(response.data.error);
  //       } else {
  //         toggleSellStep(4);
  //         getPropId(response.data._id);
  //       }
  //     });
  //   }
  // };

  const onSubmit = async (data) => {
    if (doc1.length !== 0 && doc4.length !== 0) {
      const data = { documents, step: 4 };
      authService.editProperty(propertyTest._id, data).then((res) => {
        if (res.data.error) {
          if (res.data.error === "Invalid Token") {
            alert("Your session ended. Please log in! ");
            toggleSignIn(true);
          } else alert(res.data.error);
        } else {
          setPropertyTest(res.data);
          setStep(step + 1);
        }
      });
    } else {
      alert("Please upload all required documents");
    }
  };

  return (
    <div className="sell-bottom">
      <h3 className="mb-1"> UPLOAD DOCUMENTS</h3>
      <p className="mb-4">We only accept PDF Files</p>
      {loader ? <Loading /> : null}
      <form onSubmit={handleSubmit(onSubmit)} novalidate>
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
          {/* <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center justify-content-md-end mt-2"
          >
            <Button className="save-btn" onClick={saveInfo}>
              Save
            </Button>
          </Col> */}
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

export default RealEstateDocus;
