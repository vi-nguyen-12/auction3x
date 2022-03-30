import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";

function Ownership({
  toogleStep,
  step,
  getOwnerShip,
  propertyType,
  getPropId,
  toogleSellStep,
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
        console.log(res.data);
        getPropId(res.data._id);
        toogleSellStep(1);
        alert("Successfully saved");
      }
    });
  };

  const onSubmit = (data) => {
    if (ownerName === "" || phone === "" || email === "" || address === "") {
      alert("Please enter ownership information");
    } else if (data.brokerName !== "") {
      if (phone.length > 10) {
        alert("Please enter valid phone number");
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
        getOwnerShip(datas);
        toogleStep(step + 1);
      }
    } else {
      if (data.brokerName === "") {
        if (phone.length !== 10) {
          alert("Please enter valid phone number");
        } else {
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
          toogleStep(step + 1);
        }
      }
    }
  };
  return (
    <div className="upload-box">
      <div className="sell-top">
        <div className="circle-1">
          <p className="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div className="line-1"></div>
        <div className="circle-2">
          <p className="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">05</p>
          <span className="spnn">Agreement</span>
        </div>
        {/* <div class="line"></div>
      <div class="circle">
        <p class="text">06</p>
        <span className="spnn">Agreement</span>
      </div> */}
      </div>
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
                    onChange={(e) => setOwnerName(e.target.value)}
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
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Address <span style={{ color: "#ff0000" }}>*</span>{" "}
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="number"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                    maxLength="10"
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Phone <span style={{ color: "#ff0000" }}>*</span>
                  </span>
                </Col>
                <Col>
                  <input
                    type="email"
                    className="form-control"
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
                  onClick={() => toogleStep(step - 1)}
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
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Address
                  </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="phone"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>
                    Phone *
                  </span>
                </Col>
                <Col>
                  <input
                    type="email"
                    className="form-control"
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
                  onClick={() => toogleStep(step - 1)}
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
