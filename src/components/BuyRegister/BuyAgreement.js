import React from "react";
import { Modal, Row, Button, Container, Form } from "react-bootstrap";
import { useState } from "react";
import "../../styles/buyer.css";

const BuyAgreement = ({ setStep, step, setMessage }) => {
  const [agreement, setAgreement] = useState(false);
  const toggleAgree = () => {
    setAgreement(!agreement);
  };

  const handleNext = () => {
    if (agreement === false) {
      setMessage("");
      setTimeout(() => {
        setMessage("Please Read the agreement and check the box to continue");
      }, 100);
    } else {
      setStep(step + 1);
    }
  };
  return (
    <>
      <Modal.Body className="px-md-5">
        <h3 className="fs-2 text-center my-3">Terms and Conditions</h3>
        <Container className="fs-5">
          <Row className="mb-2">
            1.1. The following terms and conditions apply to the use of the
            Auction Tree platform and the services provided by the Auction Tree
            team.
          </Row>
          <Row className=" mb-2">
            1.2. The Auction Tree platform is a platform for the sale of
            properties.
          </Row>
          <Row className=" mb-2">
            1.3. The Auction Tree team is a team of professional real estate
            investors and brokers.
          </Row>
          <Row className="mb-2">
            1.4. The Auction Tree team is not a real estate broker.
          </Row>
          <Row className=" mb-2">
            1.5. The Auction Tree team is not a real estate investor.
          </Row>
          <Row className="mb-2">
            1.6. The Auction Tree team is not a real estate agent.
          </Row>
          <Row className=" mb-2">
            1.7. The Auction Tree team is not a real estate developer.
          </Row>
          <Row className="mb-2">
            1.8. The Auction Tree team is not a real estate developer.
          </Row>
          <Row className="mb-2">
            1.9. The Auction Tree team is not a real estate developer.
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
