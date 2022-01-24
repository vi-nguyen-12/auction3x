import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import authService from "../services/authServices";
import { Button } from "react-bootstrap";
import "../styles/SellRegister.css";

const DocumentsUpload = ({ toogleStep, step, toogleDocuments }) => {
  const { register, handleSubmit } = useForm();
  const [docs, setDocuments] = useState([]);
  const [loader, setLoader] = useState(false);

  const onChange = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((response) => {
      console.log(response);
      if (response.status === 200) {
        console.log(docs)
        console.log(response.data)
        setDocuments([...docs, ...response.data]);
        setLoader(false);
      }
    });
  };


  const handleError = () => {
    if (docs.length === 0) {
      alert("Please upload atleast one image");
    }
  };


  const handleDelete = (url) => () => {
    setDocuments(docs.filter((document) => document.url !== url));
  };

  const onSubmit = async (data) => {
    // const documents = data.documents;
    // const formData = new FormData();

    // for (let i = 0; i < documents.length; i++) {
    //   formData.append("documents", documents[i]);
    // }
    // await authService.saveDocuments(formData).then((response) => {
    //   setDocuments(response.data);
    // });
    toogleStep(step + 1);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="upload-box">
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
        <div className="line-2"></div>
        <div className="circle-3">
          <p className="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div className="line-3"></div>
        <div className="circle-4">
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
        <div className="listDetails-title">
          <h2 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
            UPLOAD DOCUMENTS
          </h2>
          <p>We only accept PDF Files</p>
        </div>
        {loader ? (
          <div className="loader">
            <div className="spinning" />
          </div>
        ) : null}
        <div className="input-form-3">
          Choose the Documents Files (.pdf)
          <input
            id="documents-btn"
            accept="pdf/*"
            type="file"
            name="documents"
            multiple
            hidden
            {...register("documents", { onChange: onChange })}
            required
          />
          <div>
            <label for="documents-btn">+ Documents</label>
          </div>
          <div className="upload-list">
            {docs
              ? docs.map((document) => (
                <div className="upload-list-item">
                  <span>
                    {document.name}
                    <Button
                      className="delete-btn"
                      onClick={handleDelete(document.url)}
                    >
                      X
                    </Button>
                  </span>
                </div>
              ))
              : null}
          </div>
        </div>

        {/* <div className="upload-list">
          {documents.map((document) => (
            <div className="upload-list-item">
              <span>{document.name}
                <Button className="delete-btn" onClick={handleDelete(document.url)}>X</Button></span>
            </div>
          ))}
        </div> */}

        <div className="bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button
            className="nxt-btn"
            type="submit"
            onClick={() => {
              handleError();
              toogleDocuments(docs);
            }}

          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default DocumentsUpload;
