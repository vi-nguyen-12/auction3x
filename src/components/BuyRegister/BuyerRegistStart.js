import React, { useState } from "react";
import { Row, Col, Button, Modal, Form } from "react-bootstrap";
import { MdClose } from "react-icons/md";
import authService from "../../services/authServices";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

function BuyerRegistStart({ setStep, step, setMessage }) {
  const [buyerControl, setBuyerControl] = useState();
  const [clientName, setClientName] = useState();
  const [clientEmail, setClientEmail] = useState();
  const [clientPhone, setClientPhone] = useState();
  const [agreement, setAgreement] = useState(false);
  const [attorney, setAttorney] = useState([]);
  const toggleAgree = () => {
    setAgreement(!agreement);
  };

  const getAttorneyFile = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setAttorney((prev) =>
          res.data.map((doc) => ({ ...doc, officialName: "attorney" }))
        );
      }
    });
  };

  const handleDeleteAttorney = (url) => () => {
    setAttorney(attorney.filter((document) => document.url !== url));
  };

  const handleNext = () => {
    if (!buyerControl) {
      setMessage("");
      setTimeout(() => {
        setMessage("Please Select Buyer type");
      }, 100);
    } else if (buyerControl === "buyer" && agreement === false) {
      setMessage("");
      setTimeout(() => {
        setMessage("Please agree to the terms and conditions");
      }, 100);
    } else if (
      buyerControl === "broker" &&
      !clientName &&
      !clientEmail &&
      !clientPhone
    ) {
      setMessage("");
      setTimeout(() => {
        setMessage("Please fill in the client information");
      }, 100);
    } else {
      setStep(step + 1);
    }
  };
  return (
    <>
      <Row className="mb-5">
        <Col>
          <Row>
            <Col className="d-flex justify-content-center">
              <Button
                onClick={() => setBuyerControl("buyer")}
                className="mx-2 submitBtn border-0"
                style={{
                  background: buyerControl === "buyer" ? "#d68e5a" : "#edb48b",
                }}
              >
                Buyer
              </Button>
              <Button
                onClick={() => setBuyerControl("broker")}
                className="submitBtn border-0"
                style={{
                  background: buyerControl === "broker" ? "#d68e5a" : "#edb48b",
                }}
              >
                Broker
              </Button>
            </Col>
          </Row>
          {buyerControl === "buyer" && (
            <>
              <Row className="mt-4">
                <Col className="d-flex justify-content-center">
                  <ul className="fs-5">
                    <li>
                      1.1. The following terms and conditions apply to the use
                      of the Auction3 platform and the services provided by the
                      Auction3 team.
                    </li>
                    <li>
                      1.2. The Auction3 platform is a platform for the sale of
                      properties.
                    </li>
                    <li>
                      1.3. The Auction3 team is a team of professional real
                      estate investors and brokers.
                    </li>
                    <li>1.4. The Auction3 team is not a real estate broker.</li>
                    <li>
                      1.5. The Auction3 team is not a real estate investor.
                    </li>
                    <li>1.6. The Auction3 team is not a real estate agent.</li>
                    <li>
                      1.7. The Auction3 team is not a real estate attorney.
                    </li>
                    <li>
                      1.8. The Auction3 team is not a real estate title company.
                    </li>
                    <li>
                      1.9. The Auction3 team is not a real estate escrow
                      company.
                    </li>
                  </ul>
                </Col>
              </Row>
              <Form.Check className="mt-4 d-flex justify-content-center">
                <Form.Check.Input
                  className="me-3"
                  type="checkbox"
                  id="agree"
                  onChange={toggleAgree}
                />
                <Form.Check.Label htmlFor="agree">
                  I agree to the terms and conditions
                </Form.Check.Label>
              </Form.Check>
            </>
          )}
          {buyerControl === "broker" ? (
            <>
              <Row className="my-3">
                <Col xs={12} md={6}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Client Name <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Name"
                    className="form-control"
                    required
                  />
                </Col>
                <Col xs={12} md={6}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Client Email <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <input
                    type="text"
                    placeholder="Email"
                    className="form-control"
                    required
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col xs={12} md={6}>
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Client Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au"]}
                    disableDropdown={false}
                    country={"us"}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    value={clientPhone}
                    inputStyle={{ width: "100%" }}
                    buttonStyle={{
                      borderRight: "none",
                    }}
                    onChange={setClientPhone}
                    required
                  />
                </Col>
                <Col xs={12} md={6}>
                  <div className="d-flex flex-column">
                    <span style={{ fontWeight: "600", color: "black" }}>
                      Power of Attorney(.pdf)
                    </span>
                    <input
                      type="file"
                      id="docus"
                      accept=".pdf"
                      className="form-control"
                      onChange={getAttorneyFile}
                      hidden
                      multiple
                      required
                    />
                    <div className="d-flex">
                      <label
                        htmlFor="docus"
                        className="btn btn-primary rounded-0"
                      >
                        Upload
                      </label>
                    </div>
                    <div className="d-grid">
                      {attorney.map((doc, index) => (
                        <span key={index}>
                          {doc.name}
                          <Button
                            className="bg-transparent border-0"
                            onClick={handleDeleteAttorney(doc.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
                        </span>
                      ))}
                    </div>
                  </div>
                </Col>
              </Row>
            </>
          ) : null}
        </Col>
      </Row>
      <Modal.Footer>
        <Row className="mt-3">
          <Button className="pre-btn" style={{ opacity: "0.4" }} disabled>
            Previous
          </Button>
          <Button onClick={handleNext} className="nxt-btn" id="next">
            Next
          </Button>
        </Row>
      </Modal.Footer>
    </>
  );
}

export default BuyerRegistStart;
