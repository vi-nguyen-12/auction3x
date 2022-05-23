import React, { useState, useEffect } from "react";
import { SiDocusign } from "react-icons/si";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";

function FundDocuSign({ step, toggleStep, document }) {
  const { register, handleSubmit } = useForm();
  const [term, setTerm] = useState(false);
  const toggleTerms = () => setTerm(!term);
  const documents = [];

  //push document to array if it is not empty
  document.map((item) => {
    if (item.url) {
      documents.push(item);
    }
  });

  const onSubmit = (data) => {
    if (term === false) {
      alert("Please agree to the terms and conditions");
    } else {
      window.location.reload();
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "70px",
        }}
      >
        <Button
          className="btn btn-primary"
          //   onClick={() => {
          //     window.open(url);
          //   }}
        >
          <SiDocusign />
          <span style={{ marginLeft: "10px" }}>
            <span style={{ fontSize: "20px" }}>
              <strong>Sign</strong>
            </span>
            <span style={{ fontSize: "15px", marginLeft: "10px" }}>
              <strong>Document</strong>
            </span>
          </span>
        </Button>
      </div>

      <div
        style={{
          fontSize: "14px",
          width: "100%",
          marginTop: "70px",
          textAlign: "center",
          color: "black",
        }}
      >
        <input
          type="checkbox"
          name="terms"
          multiple
          // {...register("images", { required: false })}
          style={{ marginRight: "10px", marginBottom: "30px" }}
          onChange={toggleTerms}
        />
        Terms & Conditions
      </div>
      <div
        style={{ position: "sticky", padding: "auto" }}
        className="bottom-btn"
      >
        <button className="pre-btn" onClick={() => toggleStep(step - 1)}>
          Previous
        </button>
        <button className="nxt-btn" type="submit">
          Submit
        </button>
      </div>
    </form>
  );
}

export default FundDocuSign;
