import React, { useState } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";

function Ownership({ toogleStep, step, getOwnerShip }) {
  const { register, handleSubmit, errors } = useForm();
  const [showOwner, setShowOwner] = useState("none");
  const [showBroker, setShowBroker] = useState("none");
  const [ownerName, setOwnerName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const onSubmit = (data) => {
    if (ownerName === "" || phone === "" || email === "" || address === "") {
      alert("Please enter ownership information");
    } else if (data.brokerName !== "") {
      const datas = {
        owner_name: ownerName,
        address: address,
        phone: phone,
        email: email,
        broker_name: data.brokerName,
        broker_id: data.brokerId,
      };
      getOwnerShip(datas);
      toogleStep(step + 1);
    } else {
      if (data.brokerName === "") {
        const datas = {
          owner_name: ownerName,
          address: address,
          phone: phone,
          email: email,
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
              style={{}}
              onClick={() => {
                setShowBroker("none");
                setShowOwner("block");
              }}
            >
              Owner
            </Button>
            <Button
              style={{ margin: "0px 10px" }}
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
              <Row style={{ marginTop: "20px" }}>
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
                  <span style={{ fontWeight: "600", color: "black" }}>Owner Name <span style={{ color: "#ff0000" }}>*</span></span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>Address <span style={{ color: "#ff0000" }}>*</span> </span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="phone"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>Phone <span style={{ color: "#ff0000" }}>*</span></span>
                </Col>
                <Col>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>Email <span style={{ color: "#ff0000" }}>*</span></span>
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
                    color: "black"
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
                  <span style={{ fontWeight: "600", color: "black" }}>Owner Name *</span>
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    {...register("brokerName", { required: false })}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>Broker Name *</span>
                </Col>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    {...register("brokerId", { required: false })}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>Broker ID *</span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input type="file" className="form-control" multiple />
                  <span style={{ fontWeight: "600", color: "black" }}>Listing Agreement *</span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>Address</span>
                </Col>
              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col>
                  <input
                    type="phone"
                    className="form-control"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>Phone *</span>
                </Col>
                <Col>
                  <input
                    type="email"
                    className="form-control"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <span style={{ fontWeight: "600", color: "black" }}>Email *</span>
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
    </div >
  );
}

export default Ownership;
