import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";

function Ownership({ toogleStep, step, getOwnerShip }) {
  const { register, handleSubmit, errors } = useForm();
  const [showOwner, setShowOwner] = useState("none");
  const [showBroker, setShowBroker] = useState("none");
  const [ownerName, setOwnerName] = useState("");
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

  const onSubmit = (data) => {
    if (ownerName === "" || phone === "" || email === "" || address === "") {
      alert("Please enter ownership information");
    } else if (data.brokerName !== "") {
      const datas = {
        listing_agreement: listing_agreement,
        details: {
          owner_name: ownerName,
          address: address,
          phone: phone,
          email: email,
          broker_name: data.brokerName,
          broker_id: data.brokerId,
        },
      };
      getOwnerShip(datas);
      toogleStep(step + 1);
    } else {
      if (data.brokerName === "") {
        const datas = {
          details: {
            owner_name: ownerName,
            address: address,
            phone: phone,
            email: email,
          },
        };
        getOwnerShip(datas);
        toogleStep(step + 1);
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
              style={{ border: "none" }}
              onClick={() => {
                setShowBroker("none");
                setShowOwner("block");
              }}
            >
              Owner
            </Button>
            <Button
              className="submitBtn"
              style={{ margin: "0px 10px", border: "none" }}
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
                  <span style={{ fontWeight: "600" }}>Owner Name *</span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span style={{ fontWeight: "600" }}>Address *</span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="phone"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span style={{ fontWeight: "600" }}>Phone *</span>
                </Col>
                <Col>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span style={{ fontWeight: "600" }}>Email *</span>
                </Col>
              </Row>
            </Row>
            <Row>
              <div className="bottom-btn">
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
                  <span style={{ fontWeight: "600" }}>Owner Name *</span>
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    {...register("brokerName", { required: false })}
                  />
                  <span style={{ fontWeight: "600" }}>Broker Name *</span>
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    {...register("brokerId", { required: false })}
                  />
                  <span style={{ fontWeight: "600" }}>Broker ID *</span>
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
                  <span style={{ fontWeight: "600" }}>
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
                  <span style={{ fontWeight: "600" }}>Address</span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="phone"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span style={{ fontWeight: "600" }}>Phone *</span>
                </Col>
                <Col>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span style={{ fontWeight: "600" }}>Email *</span>
                </Col>
              </Row>
            </Row>
            <Row>
              <div className="bottom-btn">
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
