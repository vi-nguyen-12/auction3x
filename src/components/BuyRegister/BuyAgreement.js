import React from "react";
import { Modal, Row, Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import ToastMessage from '../../components/Toast'
import "../../styles/Buyer.css";

const BuyAgreement = ({ setStep, step }) => {
  const [agreement, setAgreement] = useState(false);
  const [show, setShow] = useState(true)
  const toggleAgree = () => {
    setAgreement(!agreement);
  };
  const handleNext = () => {
    if (agreement === true) {
      setStep(step + 1);
    } else {
     setShow(false)
    }
  };
  return (
    <>
      <Modal.Body className="px-md-5">
        <h3 className="fs-2 text-center my-3">Terms and Conditions</h3>
        <Container className="fs-5">
          <Row className="mb-2">
            1.1. The following terms and conditions apply to the use of the
            Auction 3 platform and the services provided by the Auction 3 team.
          </Row>
          <Row className=" mb-2">
            1.2. The Auction 3 platform is a platform for the sale of
            properties.
          </Row>
          <Row className=" mb-2">
            1.3. The Auction 3 team is a team of professional real estate
            investors and brokers.
          </Row>
          <Row className="mb-2">
            1.4. The Auction 3 team is not a real estate broker.
          </Row>
          <Row className=" mb-2">
            1.5. The Auction 3 team is not a real estate investor.
          </Row>
          <Row className="mb-2">
            1.6. The Auction 3 team is not a real estate agent.
          </Row>
          <Row className=" mb-2">
            1.7. The Auction 3 team is not a real estate developer.
          </Row>
          <Row className="mb-2">
            1.8. The Auction 3 team is not a real estate developer.
          </Row>
          <Row className="mb-2">
            1.9. The Auction 3 team is not a real estate developer.
          </Row>
          <Form.Check className="mt-4">
            <Form.Check.Input
              className="me-3"
              type="checkbox"
              onChange={toggleAgree}
            />
            <Form.Check.Label>
              I agree to the terms and conditions
            </Form.Check.Label>
          </Form.Check>
            {show == false && (
              <ToastMessage message={"Please Read the agreement and check the box to continue"}/>
            )}
        </Container>
      </Modal.Body>
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
};

export default BuyAgreement;
