import React, { useEffect, useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import SellHeader from "./SellHeader";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

function Ownership({
  toggleStep,
  step,
  getOwnerShip,
  propertyType,
  getPropId,
  toggleSellStep,
  propId,
  ownership,
}) {
  const { register, handleSubmit } = useForm();
  const [showOwner, setShowOwner] = useState("none");
  const [showBroker, setShowBroker] = useState("none");
  const [ownerName, setOwnerName] = useState("");
  const [brokerName, setBrokerName] = useState("");
  const [brokerId, setBrokerId] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [listAgree, setListAgree] = useState([]);

  const params = useParams();

  const getFile = async (e) => {
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((res) => {
      setListAgree(res.data);
    });
  };

  const listing_agreement = listAgree.map((document) => {
    return { ...document, officialName: "listing_agreement" };
  });

  const saveInfo = async () => {
    if (propertyType === "real-estate") {
      if (propId || params.id) {
        const datas = {
          type: propertyType,
          id: propId ? propId : params.id,
          details: {
            owner_name: ownerName,
            broker_name: brokerName ? brokerName : null,
            broker_id: brokerId ? brokerId : null,
            phone: phone,
            email: email,
            address: address,
          },
          documents: listing_agreement ? listing_agreement : null,
          step: parseInt(1),
        };
        await authService.putRealEstateInfo(datas).then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            alert("Successfully updated");
            toggleSellStep(1);
          }
        });
      } else {
        const datas = {
          type: propertyType,
          details: {
            owner_name: ownerName,
            broker_name: brokerName ? brokerName : null,
            broker_id: brokerId ? brokerId : null,
            phone: phone,
            email: email,
            address: address,
          },
          documents: listing_agreement ? listing_agreement : null,
          step: parseInt(1),
        };
        await authService.postRealEstateInfo(datas).then((res) => {
          if (res.data.error) {
            alert(res.data.error);
          } else {
            getPropId(res.data._id);
            alert("Successfully updated");
            toggleSellStep(1);
          }
        });
      }
    } else {
      const data = {
        type: propertyType,
        details: {
          owner_name: ownerName,
          broker_name: brokerName ? brokerName : null,
          broker_id: brokerId ? brokerId : null,
          phone: phone,
          email: email,
          address: address,
        },
        documents: listing_agreement ? listing_agreement : null,
        step: parseInt(1),
      };
      authService.savePropInfo(data).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          getPropId(res.data._id);
          toggleSellStep(1);
          alert("Successfully saved");
        }
      });
    }
  };

  useEffect(() => {
    if (params.step) {
      authService.getIncompleteProperty(params.userId).then((res) => {
        const property = res.data.filter((prop) => prop._id === params.id);
        if (property[0].details.broker_id) {
          setShowBroker("block");
          setShowOwner("none");
          setBrokerName(property[0].details.broker_name);
          setBrokerId(property[0].details.broker_id);
          setOwnerName(property[0].details.owner_name);
          setPhone(property[0].details.phone);
          setEmail(property[0].details.email);
          setAddress(property[0].details.address);
        } else if (!property[0].details.broker_id) {
          setShowOwner("block");
          setShowBroker("none");
          setOwnerName(property[0].details.owner_name);
          setPhone(property[0].details.phone);
          setEmail(property[0].details.email);
          setAddress(property[0].details.address);
        }
      });
    }

    if (ownership) {
      if (ownership.details.broker_id) {
        setShowBroker("block");
        setOwnerName(ownership.details.owner_name);
        setPhone(ownership.details.phone);
        setEmail(ownership.details.email);
        setAddress(ownership.details.address);
        setBrokerName(
          ownership.details.broker_name ? ownership.details.broker_name : null
        );
        setBrokerId(
          ownership.details.broker_id ? ownership.details.broker_id : null
        );
      } else {
        setShowOwner("block");
        setOwnerName(ownership.details.owner_name);
        setPhone(ownership.details.phone);
        setEmail(ownership.details.email);
        setAddress(ownership.details.address);
      }
    }
  }, [params.step]);

  const onSubmit = (data) => {
    if (ownerName === "" || phone === "" || email === "" || address === "") {
      alert("Please enter ownership information");
    } else if (data.brokerName !== "") {
      const datas = {
        type: propertyType,
        details: {
          owner_name: ownerName,
          broker_name: brokerName ? brokerName : null,
          broker_id: brokerId ? brokerId : null,
          phone: phone,
          email: email,
          address: address,
        },
        documents: listing_agreement ? listing_agreement : null,
        step: parseInt(1),
      };
      getOwnerShip(datas);
      toggleStep(step + 1);
    } else {
      if (data.brokerName === "") {
        const datas = {
          type: propertyType,
          details: {
            owner_name: ownerName,
            phone: phone,
            email: email,
            address: address,
          },
          step: parseInt(1),
        };
        getOwnerShip(datas);
        toggleStep(step + 1);
      }
    }
  };
  console.log(phone);
  return (
    <div className="upload-box">
      <SellHeader step={step} />
      <div className="sell-bottom">
        <Container>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <Button
              className="submitBtn"
              style={{ border: "none", color: "black", fontWeight: "bold" }}
              onClick={() => {
                setShowBroker("none");
                setShowOwner("block");
              }}
            >
              Owner
            </Button>
            <Button
              className="submitBtn"
              style={{
                margin: "0px 10px",
                border: "none",
                color: "black",
                fontWeight: "bold",
              }}
              onClick={() => {
                setShowOwner("none");
                setShowBroker("block");
              }}
            >
              Broker
            </Button>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
            style={{ display: showOwner }}
          >
            <Row>
              <Row style={{ marginTop: "10px" }}>
                <Col
                  style={{
                    borderBottom: "2px solid gray",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Owner Information
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      ownerName
                        ? ownerName
                        : ownership
                        ? ownership.details.owner_name
                        : ""
                    }
                    onChange={(e) => setOwnerName(e.target.value)}
                    required
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Owner Name <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      address
                        ? address
                        : ownership
                        ? ownership.details.address
                        : ""
                    }
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Address <span style={{ color: "#ff0000" }}>*</span>{" "}
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au"]}
                    disableDropdown={false}
                    country={"us"}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    value={
                      phone ? phone : ownership ? ownership.details.phone : null
                    }
                    inputStyle={{ width: "100%" }}
                    buttonStyle={{
                      border: "2px solid #d58f5c",
                      borderRight: "none",
                    }}
                    onChange={setPhone}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
                <Col>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={
                      email ? email : ownership ? ownership.details.email : ""
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Email <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
              </Row>
            </Row>
            <Row>
              <div className="bottom-btn">
                <div
                  style={{
                    position: "absolute",
                    left: "50px",
                  }}
                >
                  <Button onClick={saveInfo}>Save</Button>
                </div>
                <button
                  className="pre-btn"
                  onClick={() => toggleStep(step - 1)}
                >
                  Previous
                </button>
                <button className="nxt-btn" id="next" type="submit">
                  Next
                </button>
              </div>
            </Row>
          </form>

          <form
            style={{ display: showBroker }}
            onSubmit={handleSubmit(onSubmit)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
              }
            }}
          >
            <Row>
              <Row style={{ marginTop: "10px" }}>
                <Col
                  style={{
                    borderBottom: "2px solid gray",
                    fontWeight: "bold",
                    fontSize: "18px",
                    color: "black",
                  }}
                >
                  Broker Information
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      ownerName
                        ? ownerName
                        : ownership
                        ? ownership.details.owner_name
                        : ""
                    }
                    onChange={(e) => setOwnerName(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Owner Name *
                  </span>
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      brokerName
                        ? brokerName
                        : ownership
                        ? ownership.details.broker_name
                        : ""
                    }
                    {...register("brokerName", { required: false })}
                    onChange={(e) => setBrokerName(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker Name *
                  </span>
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      brokerId
                        ? brokerId
                        : ownership
                        ? ownership.details.broker_id
                        : ""
                    }
                    {...register("brokerId", { required: false })}
                    onChange={(e) => setBrokerId(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Broker License Number *
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="file"
                    accept=".pdf"
                    className="form-control"
                    {...register("file", { onChange: getFile })}
                    multiple
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Listing Agreement(.pdf) *
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={
                      address
                        ? address
                        : ownership
                        ? ownership.details.address
                        : ""
                    }
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Address
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <PhoneInput
                    disableCountryCode={false}
                    onlyCountries={["ca", "us", "gb", "au"]}
                    disableDropdown={false}
                    country={"us"}
                    dropdownStyle={{ paddingLeft: "0!important" }}
                    value={
                      phone ? phone : ownership ? ownership.details.phone : null
                    }
                    inputStyle={{ width: "100%" }}
                    buttonStyle={{
                      border: "2px solid #d58f5c",
                      borderRight: "none",
                    }}
                    onChange={setPhone}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
                <Col>
                  <input
                    type="email"
                    className="form-control"
                    defaultValue={
                      email ? email : ownership ? ownership.details.email : ""
                    }
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Email *
                  </span>
                </Col>
              </Row>
            </Row>
            <Row>
              <div className="bottom-btn">
                <div
                  style={{
                    position: "absolute",
                    left: "50px",
                  }}
                >
                  <Button onClick={saveInfo}>Save</Button>
                </div>
                <button
                  className="pre-btn"
                  onClick={() => toggleStep(step - 1)}
                >
                  Previous
                </button>
                <button className="nxt-btn" id="next" type="submit">
                  Next
                </button>
              </div>
            </Row>
          </form>
        </Container>
      </div>
    </div>
  );
}

export default Ownership;
