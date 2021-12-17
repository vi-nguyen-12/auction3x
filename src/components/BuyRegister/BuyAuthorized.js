import React from "react";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

const BuyAuthoried = ({
  toogleStep,
  step,
  document1,
  document2,
  document3,
}) => {
  const { register, handleSubmit } = useForm();
  const id = useParams().id;

  const [agree, setAgree] = useState(false);
  const dateTime = new Date().toISOString();
  const hangleTerms = () => {
    setAgree(dateTime);
  };

  const documents = [document1, document2, document3];

  const onSubmit = async (data) => {
    const response = await authService.buyerRegister({
      propertyId: id,
      documents: documents,
      TC: agree,
    });
    console.log(response);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            </p>
          </div>

          <div
            style={{ fontSize: "14px", marginLeft: "30px" }}
            className="input-form-1"
          >
            <input
              type="checkbox"
              name="terms"
              multiple
              // {...register("images", { required: false })}
              style={{ marginRight: "10px" }}
              onChange={hangleTerms}
            />
            Terms & Conditions
          </div>
          <div
            style={{ position: "sticky", padding: "auto" }}
            className="bottom-btn"
          >
            <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
              Previous
            </button>
            <button className="nxt-btn" type="submit">
              Next
            </button>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

export default BuyAuthoried;
