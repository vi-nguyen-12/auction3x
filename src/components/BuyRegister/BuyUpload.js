import React, { Form } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../services/authServices";
import "../../styles/Buyer.css";

const BuyUpload = ({ toogleStep, step, toogleDocuments }) => {
  const [documents, setDocuments] = useState([]);

  const onSelectDocs = async (e) => {
    const documents = e.target.files;
    const formData = new FormData();
    for (let i = 0; i < documents.length; i++) {
      formData.append("documents", documents[i]);
    }
    const response = await authService.saveDocuments(formData);
    setDocuments(response.data);
  };

  const send = (e) => {
    e.preventDefault();
    toogleDocuments(documents);
    toogleStep(step + 1);
  };
  return (
    <>
      <Modal.Header>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassName="custom-modal-title"
        >
          Documents Upload
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="input-form-1">
            Choose the Documents Files
            <input
              accept="documents/*"
              type="file"
              name="documents"
              onChange={onSelectDocs}
              multiple
              // {...register("images", { required: false })}
            />
          </div>

          <div>
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>
          </div>
          <div
            style={{ position: "sticky", padding: "auto" }}
            className="bottom-btn"
          >
            <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
              Previous
            </button>
            <button className="nxt-btn" onClick={() => toogleStep(step + 1)}>
              Next
            </button>
          </div>
          <div className="buy-bottom">
            <div class="circle-1"></div> <div class="line-1"></div>
            <div class="circle-2"></div> <div class="line"></div>
            <div class="circle"></div> <div class="line"></div>
            <div class="circle"></div> <div class="line"></div>
            <div class="circle"></div>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

export default BuyUpload;
