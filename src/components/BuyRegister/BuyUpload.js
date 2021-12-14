import React, { Form } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";

const BuyUpload = ({ toogleStep, step, toogleDocuments }) => {
  const [documents, setDocuments] = useState([]);

  const send = (e) => {
    e.preventDefault();
    toogleDocuments(documents);
    toogleStep(step + 1);
  };
  return (
    <Modal>
      <Modal.Header>
        <Modal.Title>
          <h3>Documents Upload</h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={send}>
          <Form.Group>
            <Form.Label>Upload Documents</Form.Label>
          </Form.Group>
          <div className="bottom-btn">
            <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
              Previous
            </button>
            <button className="nxt-btn" type="submit" onClick={send}>
              Next
            </button>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default BuyUpload;
