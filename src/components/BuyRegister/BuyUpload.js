import React, { Form } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../services/authServices";
import "../../styles/Buyer.css";

const BuyUpload = ({
  toogleStep,
  step,
  toogleDocument1,
  toogleDocument2,
  toogleDocument3,
  toogleDocument4,
}) => {
  const { register, handleSubmit } = useForm();
  const [document1, setDocument1] = useState([]);
  const [document2, setDocument2] = useState([]);
  const [document3, setDocument3] = useState([]);
  const [document4, setDocument4] = useState([]);

  const onSubmit = async (data) => {
    const document1 = data.document1;
    const document2 = data.document2;
    const document3 = data.document3;
    const document4 = data.document4;

    const formData1 = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();
    const formData4 = new FormData();

    for (let i = 0; i < document1.length; i++) {
      formData1.append("documents", document1[i]);
    }
    if(document1.length > 0){
    await authService.saveDocuments(formData1).then((res) => {
      res.data[0].name = "BankStatment-" + res.data[0].name;
      setDocument1(res.data[0]);
    });
    }


    if(document2.length > 0){
    for (let i = 0; i < document2.length; i++) {
      formData2.append("documents", document2[i]);
    }
    await authService.saveDocuments(formData2).then((res) => {
      res.data[0].name = "BrokerageAccountStatement-" + res.data[0].name;
      setDocument2(res.data[0]);
    });
    }


    if(document3.length > 0){
    for (let i = 0; i < document3.length; i++) {
      formData3.append("documents", document3[i]);
    }
    await authService.saveDocuments(formData3).then((res) => {
      res.data[0].name = "CryptoAccountStatement-"+ res.data[0].name;
      setDocument3(res.data[0]);
    });
    }

    if(document4.length > 0){
    for (let i = 0; i < document4.length; i++) {
      formData4.append("documents", document4[i]);
    }
    await authService.saveDocuments(formData4).then((res) => {
      res.data[0].name = "LineOfCreditDoc-"+ res.data[0].name;
      setDocument4(res.data[0]);
    });
    }

    await authService.getBuyerQuestions().then((res) => {
      console.log(res);
    });

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
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "inline", justifyContent: "center" }}
        >
          <div
            style={{
              display: "flex",
              position: "relative",
              justifyContent: "left",
              marginBottom: "20px",
            }}
          >
            Bank Statement
            <input style={{display:"flex" , position: "absolute", right: "0px"}}

              accept="documents/*"
              type="file"
              name="document1"
              multiple
              {...register("document1", { required: false })}
            />
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              justifyContent: "left",
              marginBottom: "20px",
            }}
          >
            Brokerage account statement
            <input
            style={{display:"flex" , position: "absolute", right: "0px"}}
              accept="documents/*"
              type="file"
              name="document2"
              multiple
              {...register("document2", { required: false })}
            />
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              justifyContent: "left",
              marginBottom: "20px",
            }}
          >
            Crypto account statement
            <input
            style={{display:"flex" , position: "absolute", right: "0px"}}
              accept="documents/*"
              type="file"
              name="document3"
              multiple
              {...register("document3", { required: false })}
            />
          </div>

          <div
            style={{
              display: "flex",
              position: "relative",
              justifyContent: "left",
              marginBottom: "20px",
            }}
          >
            Line of credit doc
            <input
            style={{display:"flex" , position: "absolute", right: "0px"}}
              accept="documents/*"
              type="file"
              name="document4"
              multiple
              {...register("document4", { required: false })}
            />
          </div>
          <div>
            <p>
              lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            </p>
          </div>

          <div
            style={{ position: "sticky", padding: "auto" }}
            className="bottom-btn"
          >
            <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
              Previous
            </button>
            <button
              className="nxt-btn"
              type="submit"
              onClick={
                (toogleDocument1(document1),
                toogleDocument2(document2),
                toogleDocument3(document3),
                toogleDocument4(document4))
              }
            >
              Next
            </button>
          </div>
        </form>
      </Modal.Body>
    </>
  );
};

export default BuyUpload;
