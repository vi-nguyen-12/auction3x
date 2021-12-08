import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../services/authServices";

const UploadForm = ({ toogleStep, step, toogleImages, toogleVideos }) => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [documents, setDocuments] = useState([]);

  const onSelectImages = (e) => {
    const images = e.target.files;
    console.log(images);
    setImages(images);
  };

  const onSelectVideos = (e) => {
    const videos = e.target.files;
    console.log(videos);
    setVideos(videos);
  };

  const send = (e) => {
    e.preventDefault();

    const formData = new FormData();
    const formData2 = new FormData();

    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    toogleImages(formData);

    // authService
    //   .saveImages(formData)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });

    for (let i = 0; i < videos.length; i++) {
      formData2.append("videos", videos[i]);
    }
    toogleVideos(formData2);

    // authService
    //   .saveVideos(formData2)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    toogleStep(step + 1);
  };

  return (
    <form className="upload-box">
      <div className="sell-top">
        <div class="circle-1">
          <p class="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div class="line-1"></div>
        <div class="circle-2">
          <p class="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div class="line-2"></div>
        <div class="circle-3">
          <p class="text">03</p>
          <span className="spnn">Property Details</span>
        </div>{" "}
        <div class="line-3"></div>
        <div class="circle-4">
          <p class="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">05</p>
          <span className="spnn">Listing Fees</span>
        </div>
        <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div>
      </div>
      <div className="sell-bottom">
        <div className="listDetails-title">
          <h2 style={{ color: "#6d6d6d", fontWeight: "bold" }}>
            UPLOAD DOCUMENTS
          </h2>
          <p>shdcb sdhb sdhc sdbchsdbch </p>
        </div>
        <div className="input-form-1">
          Choose the Image Files
          <input
            accept="image/*"
            type="file"
            name="images"
            onChange={onSelectImages}
            multiple
            // {...register("images", { required: false })}
          />
        </div>
        <div className="input-form-2">
          Choose the Videos Files
          <input
            accept="video/*"
            type="file"
            name="videos"
            onChange={onSelectVideos}
            multiple
            // {...register("videos", { required: false })}
          />
        </div>

        <div className="bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" type="submit" onClick={send}>
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
