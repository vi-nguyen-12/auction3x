import React, { Form } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import authService from "../../services/authServices";
import "../../styles/Buyer.css";

const BuyUpload = ({
  toogleStep,
  step,
  toogleDocument,
  // toogleDocument2,
  // toogleDocument3,
  // toogleDocument4,
}) => {
  const { register, handleSubmit } = useForm();
  const [document1, setDocument1] = useState([]);
  const [document2, setDocument2] = useState([]);
  const [document3, setDocument3] = useState([]);
  const [document4, setDocument4] = useState([]);

  const onChange1 = async (e) => {
    const formData1 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData1.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData1).then((response) => {
      if (response.status === 200) {
        setDocument1([...document1, ...response.data]);
      }
    });
  };

  const onChange2 = async (e) => {
    const formData2 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData2.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData2).then((response) => {
      if (response.status === 200) {
        setDocument2([...document2, ...response.data]);
      }
    });
  };

  const onChange3 = async (e) => {
    const formData3 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData3.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData3).then((response) => {
      if (response.status === 200) {
        setDocument3([...document3, ...response.data]);
      }
    });
  };

  const onChange4 = async (e) => {
    const formData4 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData4.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData4).then((response) => {
      if (response.status === 200) {
        setDocument4([...document4, ...response.data]);
      }
    });
  };

  const bankStatment = document1.map((item) => {
    return { ...item, officialName: "bank_statement" };
  });

  const broker = document2.map((item) => {
    return { ...item, officialName: "brokerage_account_statement" };
  });

  const crypto = document3.map((item) => {
    return { ...item, officialName: "crypto_account_statement" };
  });

  const lineCredit = document4.map((item) => {
    return { ...item, officialName: "line_of_credit_doc" };
  });

  const document = [...bankStatment, ...broker, ...crypto, ...lineCredit];
  console.log(document);

  useEffect(() => {
    toogleDocument(document);
  }, [document[(0, 3)]]);

  const onSubmit = async (data) => {
    // const document1 = data.document1;
    // const document2 = data.document2;
    // const document3 = data.document3;
    // const document4 = data.document4;

    // const formData1 = new FormData();
    // const formData2 = new FormData();
    // const formData3 = new FormData();
    // const formData4 = new FormData();

    // for (let i = 0; i < document1.length; i++) {
    //   formData1.append("documents", document1[i]);
    // }
    // if (document1.length > 0) {
    //   await authService.saveDocuments(formData1).then((res) => {
    //     res.data[0].name = "BankStatment-" + res.data[0].name;
    //     setDocument1([...document1, ...res.data]);
    //   });
    // }

    // if (document2.length > 0) {
    //   for (let i = 0; i < document2.length; i++) {
    //     formData2.append("documents", document2[i]);
    //   }
    //   await authService.saveDocuments(formData2).then((res) => {
    //     res.data[0].name = "BrokerageAccountStatement-" + res.data[0].name;
    //     setDocument2([...document2, ...res.data]);
    //   });
    // }

    // if (document3.length > 0) {
    //   for (let i = 0; i < document3.length; i++) {
    //     formData3.append("documents", document3[i]);
    //   }
    //   await authService.saveDocuments(formData3).then((res) => {
    //     res.data[0].name = "CryptoAccountStatement-" + res.data[0].name;
    //     setDocument3([...document3, ...res.data]);
    //   });
    // }

    // if (document4.length > 0) {
    //   for (let i = 0; i < document4.length; i++) {
    //     formData4.append("documents", document4[i]);
    //   }
    //   await authService.saveDocuments(formData4).then((res) => {
    //     res.data[0].name = "LineOfCreditDoc-" + res.data[0].name;
    //     setDocument4([...document4, ...res.data]);
    //   });
    // }
    toogleStep(step + 1);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          style={{ color: "#D58F5C", fontSize: "40px", fontWeight: "bold" }}
          contentClassname="custom-modal-title"
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
            <input
              style={{ display: "flex", position: "absolute", right: "0px" }}
              accept="documents/*"
              type="file"
              name="document1"
              multiple
              {...register("document1", { onChange: onChange1 })}
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
              style={{ display: "flex", position: "absolute", right: "0px" }}
              accept="documents/*"
              type="file"
              name="document2"
              multiple
              {...register("document2", { onChange: onChange2 })}
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
              style={{ display: "flex", position: "absolute", right: "0px" }}
              accept="documents/*"
              type="file"
              name="document3"
              multiple
              {...register("document3", { onChange: onChange3 })}
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
              style={{ display: "flex", position: "absolute", right: "0px" }}
              accept="documents/*"
              type="file"
              name="document4"
              multiple
              {...register("document4", { onChange: onChange4 })}
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
              onClick={toogleDocument(document)}
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
