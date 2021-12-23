import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../services/authServices";
import Toast from "../components/Toast";

const UploadForm = ({ toogleStep, step, toogleImages, toogleVideos }) => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [lives, setLives] = useState([]);

  const onSubmit = async (data) => {
    const videos = data.videos;
    const images = data.images;
    const lives = data.lives;

    const formData = new FormData();
    const formData2 = new FormData();
    const formData3 = new FormData();

    for (let i = 0; i < videos.length; i++) {
      formData.append("videos", videos[i]);
    }
    for (let i = 0; i < images.length; i++) {
      formData2.append("images", images[i]);
    }
    for (let i = 0; i < lives.length; i++) {
      formData3.append("lives", lives[i]);
    }

    const response2 = await authService
      .saveVideos(formData)
      .then((response2) => {
        console.log(response2);
        setVideos(response2.data);
      });

    const respone3 = await authService
      .saveLives(formData3)
      .then((response3) => {
        console.log(response3);
        setLives(response3.data);
      });
    const response = await authService
      .saveImages(formData2)
      .then((response) => {
        setImages(response.data);
      });
    toogleStep(step + 1);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="upload-box">
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
            multiple
            {...register("images", { required: false })}
          />
        </div>
        <div className="input-form-2">
          Choose the Videos Files
          <input
            accept="video/*"
            type="file"
            name="videos"
            multiple
            {...register("videos", { required: false })}
          />
        </div>

        <div className="input-form-2">
          Choose the Live360 Files
          <input
            accept="video/*"
            type="file"
            name="live360"
            multiple
            {...register("lives", { required: false })}
          />
        </div>

        <div className="bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button
            className="nxt-btn"
            onClick={(toogleImages(images), toogleVideos(videos))}
            id="next"
            type="submit"
          >
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
