import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import authService from "../../services/authServices";
import { useForm } from "react-hook-form";
import "../../styles/buyer.css";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import Loading from "../Loading";

function AddFund({ setMessage }) {
  const { register } = useForm();
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(false);
  const [other, setOther] = useState(false);
  const [self, setSelf] = useState(true);
  const [registeredAuctions, setRegisteredAuctions] = useState([]);
  const toggleSelf = () => setSelf(!self);
  const toggleOther = () => setOther(!other);
  const [buyerId, setBuyerId] = useState();
  const [validityDate, setValidityDate] = useState();
  const [name, setName] = useState();
  const [provider, setProvider] = useState();

  const [document, setDocument] = useState([]);

  const onChange1 = async (e) => {
    setLoader(true);
    const formData1 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData1.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData1).then((response) => {
      if (response.status === 200) {
        setDocument([...document, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  useEffect(() => {
    authService.getBuyerInfo(user._id).then((res) => {
      setRegisteredAuctions(res.data);
    });
  }, [user._id]);

  const fundDoc = document.map((doc) => {
    return { ...doc, officialName: name };
  });

  const handleDelete = (url) => () => {
    setDocument(document.filter((document) => document.url !== url));
  };

  const fixDate = (date) => {
    const newDate = new Date(date).setDate(
      new Date(date).getDate() + 1 <= 31 ? new Date(date).getDate() + 1 : 1
    );
    const dates = new Date(newDate).setMonth(
      new Date(newDate).getDate() === 1
        ? new Date(newDate).getMonth() + 1
        : new Date(newDate).getMonth()
    );
    setValidityDate(new Date(dates).toISOString());
  };

  const onSubmit = async (data) => {
    if (other === true) {
      if (validityDate && name && provider && document.length > 0) {
        setLoader(true);
        const datas = {
          id: buyerId,
          details: {
            ...fundDoc[0],
            isSelf: false,
            validity: validityDate,
            providerName: provider,
          },
        };
        await authService.addFund(datas).then((res) => {
          if (res.data.error) {
            setMessage("");
            setMessage(res.data.error);
            setLoader(false);
          } else {
            setMessage("");
            setMessage("Fund Added Successfully");
            setLoader(false);
            window.location.reload();
          }
        });
      } else {
        setMessage("");
        setTimeout(() => {
          setMessage("Please fill all fields");
        }, 100);
      }
    } else {
      if (document.length > 0 && name && validityDate) {
        setLoader(true);
        const datas = {
          id: buyerId,
          details: {
            ...fundDoc[0],
            isSelf: true,
            validity: validityDate,
          },
        };
        await authService.addFund(datas).then((res) => {
          if (res.data.error) {
            setMessage("");
            setMessage(res.data.error);
            setLoader(false);
          } else {
            setMessage("");
            setMessage("Fund Added Successfully");
            setLoader(false);
            window.location.reload();
          }
        });
      } else {
        setMessage("");
        setTimeout(() => {
          setMessage("Please fill all fields");
        }, 100);
      }
    }
  };

  return (
    <Container style={{ padding: "20px", paddingBottom: "70px" }}>
      {loader && <Loading />}
      <Row style={{ margin: "20px", marginTop: "40px" }}>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="rounded-0 border-0 w-100"
            style={{
              background: self ? "rgb(21 45 131)" : "",
            }}
            onClick={() => {
              setOther(false);
              setBuyerId();
              setValidityDate();
              setName();
              setProvider();
              toggleSelf();
            }}
            variant="primary"
          >
            Self
          </Button>
        </Col>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button
            className="rounded-0 border-0 w-100"
            style={{
              background: other ? "rgb(21 45 131)" : "",
            }}
            onClick={() => {
              setSelf(false);
              setBuyerId();
              setValidityDate();
              setName();
              setProvider();
              toggleOther();
            }}
            variant="primary"
          >
            Other
          </Button>
        </Col>
      </Row>

      {other === true ? (
        <>
          <Row className="mb-3">
            <Col>
              <label style={{ color: "black" }}>
                Proof of Fund for
                <span style={{ color: "#ff0000" }}>*</span>
              </label>
              <Form.Select
                onChange={(e) => setBuyerId(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Auctions</option>
                {registeredAuctions.length > 0 ? (
                  registeredAuctions.map((item, index) => (
                    <option key={index} value={item.buyer._id}>
                      {
                        item.property.details.property_address
                          .formatted_street_address
                      }
                      ,{" "}
                      {item.property.type === "real-estate"
                        ? "Real Estate"
                        : item.property.type === "car"
                        ? "Car"
                        : item.property.type === "jet"
                        ? "Jet"
                        : item.property.type === "yacht"
                        ? "Yacht"
                        : ""}
                    </option>
                  ))
                ) : (
                  <option>You have not register to buy any property.</option>
                )}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label style={{ color: "black" }}>
                Type of Proof of Fund
                <span style={{ color: "#ff0000" }}>*</span>
              </label>
              <Form.Select
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="bank_statement">Bank Statement</option>
                <option value="brokerage_account_statement">
                  Brokerage Account Statement
                </option>
                <option value="crypto_account_statement">
                  Crypto Account Statement
                </option>
                <option value="line_of_credit_doc">
                  Line of Credit Document
                </option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={6} xs={12}>
              <label style={{ color: "black" }}>
                Provider Name<span style={{ color: "#ff0000" }}>*</span>
              </label>
              <input
                type="text"
                name="provider"
                className="form-control"
                placeholder="Provider"
                onChange={(e) => setProvider(e.target.value)}
                required
              />
            </Col>
            <Col md={6} xs={12}>
              <label style={{ color: "black" }}>
                Validity Date<span style={{ color: "#ff0000" }}>*</span>
              </label>
              <input
                type="date"
                name="validity"
                className="form-control"
                placeholder="Validity Date"
                onChange={(e) => fixDate(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={7} xs={12}>
              <div>
                <label style={{ color: "black" }}>
                  Proof Of Fund<span style={{ color: "#ff0000" }}>*</span>
                </label>
                <input
                  type="file"
                  name="form"
                  id="doc"
                  className="form-control"
                  {...register("document", { onChange: onChange1 })}
                  hidden
                  required
                />
                <div className="mt-2">
                  <label
                    htmlFor="doc"
                    className="btn btn-primary rounded-0 border-0"
                  >
                    Upload
                  </label>
                </div>
                <div className="upload-list" style={{ width: "100%" }}>
                  {document.map((document, index) => (
                    <div key={index}>
                      <span>
                        {document.name}
                        <Button
                          className="bg-transparent"
                          style={{ border: "none" }}
                          onClick={handleDelete(document.url)}
                        >
                          <MdClose fontSize="1.5em" color="red" />
                        </Button>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Col>
            <Col
              md={5}
              xs={12}
              className="d-flex justify-content-end align-items-end"
            >
              <Button
                onClick={onSubmit}
                variant="primary"
                className="btn-block rounded-0"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </>
      ) : null}

      {self === true ? (
        <Row>
          <Row className="mb-3">
            <Col>
              <label style={{ color: "black" }}>
                Proof of Fund for<span style={{ color: "#ff0000" }}>*</span>
              </label>
              <Form.Select
                onChange={(e) => setBuyerId(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Auctions</option>
                {registeredAuctions.length > 0 ? (
                  registeredAuctions.map((item, index) => (
                    <option key={index} value={item.buyer._id}>
                      {
                        item.property.details.property_address
                          .formatted_street_address
                      }
                      ,{" "}
                      {item.property.type === "real-estate"
                        ? "Real Estate"
                        : item.property.type === "car"
                        ? "Car"
                        : item.property.type === "jet"
                        ? "Jet"
                        : item.property.type === "yacht"
                        ? "Yacht"
                        : ""}
                    </option>
                  ))
                ) : (
                  <option>You have not register to buy any property.</option>
                )}
              </Form.Select>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col>
              <label style={{ color: "black" }}>
                Type of Proof of Fund<span style={{ color: "#ff0000" }}>*</span>
              </label>
              <Form.Select
                onChange={(e) => setName(e.target.value)}
                className="form-control"
                required
              >
                <option value="">Select</option>
                <option value="bank_statement">Bank Statement</option>
                <option value="brokerage_account_statement">
                  Brokerage Account Statement
                </option>
                <option value="crypto_account_statement">
                  Crypto Account Statement
                </option>
                <option value="line_of_credit_doc">
                  Line of Credit Document
                </option>
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col md={6} xs={12} className="mt-3">
              <label style={{ color: "black" }}>
                Proof Of Fund<span style={{ color: "#ff0000" }}>*</span>
              </label>
              <input
                type="file"
                name="form"
                className="form-control"
                id="doc1"
                {...register("document", { onChange: onChange1 })}
                hidden
                required
              />
              <div className="mt-2">
                <label
                  htmlFor="doc1"
                  className="btn btn-primary rounded-0 border-0"
                >
                  Upload
                </label>
              </div>
              <div className="upload-list" style={{ width: "100%" }}>
                {document.map((document, index) => (
                  <div key={index}>
                    <span>
                      {document.name}
                      <Button
                        className="bg-transparent"
                        style={{ border: "none" }}
                        onClick={handleDelete(document.url)}
                      >
                        <MdClose fontSize="1.5em" color="red" />
                      </Button>
                    </span>
                  </div>
                ))}
              </div>
            </Col>
            <Col md={6} xs={12} className="mt-3">
              <label style={{ color: "black" }}>
                Validity Date<span style={{ color: "#ff0000" }}>*</span>
              </label>
              <input
                type="date"
                name="validity"
                className="form-control"
                placeholder="Validity Date"
                onChange={(e) => fixDate(e.target.value)}
                required
              />
            </Col>
          </Row>
          <Row className="mt-5 d-flex justify-content-end">
            <Col className="d-flex justify-content-end">
              <Button
                onClick={onSubmit}
                variant="primary"
                className="btn-block rounded-0"
              >
                Submit
              </Button>
            </Col>
          </Row>
        </Row>
      ) : null}
    </Container>
  );
}

export default AddFund;
