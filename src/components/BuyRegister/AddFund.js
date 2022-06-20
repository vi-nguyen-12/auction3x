import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useForm } from "react-hook-form";
import "../../styles/buyer.css";

function AddFund() {
  const { register, handleSubmit } = useForm();
  const [loader, setLoader] = useState(false);
  const [other, setOther] = useState(false);
  const [self, setSelf] = useState(false);
  const toggleSelf = () => setSelf(!self);
  const toggleOther = () => setOther(!other);

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

  return (
    <Container style={{ padding: "20px" }}>
      <h1 style={{ paddingTop: "30px" }}>Add Fund</h1>
      <Row style={{ margin: "20px", marginTop: "40px" }}>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              width: "100%",
            }}
            onClick={() => {
              setOther(false);
              toggleSelf();
            }}
            variant="primary"
          >
            Self
          </Button>
        </Col>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button
            style={{
              width: "100%",
            }}
            onClick={() => {
              setSelf(false);
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
          <Row>
            <Col>
              <label style={{ color: "black" }}>Name of Proof of Fund</label>
              <input
                type="text"
                name="fund"
                className="form-control"
                placeholder="Name"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label style={{ color: "black" }}>Fund Amount</label>
              <input
                type="number"
                min="0"
                name="fund"
                className="form-control"
                placeholder="Amount"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <label style={{ color: "black" }}>Provider Name</label>
              <input
                type="text"
                name="provider"
                className="form-control"
                placeholder="Provider"
                required
              />
            </Col>
            <Col>
              <label style={{ color: "black" }}>Validity Date</label>
              <input
                type="date"
                name="validity"
                className="form-control"
                placeholder="Validity Date"
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <div>
                <label style={{ color: "black" }}>Proof Of Fund</label>
                <input
                  type="file"
                  name="form"
                  className="form-control"
                  placeholder="Form"
                  {...register("document", { onChange: onChange1 })}
                />
              </div>
            </Col>
          </Row>
          <Row style={{ marginTop: "40px" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" className="btn-block">
                Submit
              </Button>
            </Col>
          </Row>
        </>
      ) : null}

      {self === true ? (
        <Row>
          <Row>
            <Col>
              <label style={{ color: "black" }}>Proof Of Fund</label>
              <input
                type="file"
                name="form"
                className="form-control"
                placeholder="Form"
              />
            </Col>
            <Col style={{ padding: "0" }}>
              <label style={{ color: "black" }}>Validity Date</label>
              <input
                type="date"
                name="validity"
                className="form-control"
                placeholder="Validity Date"
                required
              />
            </Col>
          </Row>
          <Row style={{ marginTop: "40px" }}>
            <Col style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="primary" className="btn-block">
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
