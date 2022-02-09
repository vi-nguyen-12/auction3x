import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../services/authServices";
import "../styles/SellRegister.css";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const UploadForm = ({ toogleStep, step, toogleImages, toogleVideos }) => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [videoLoader, setVideoLoader] = useState(false);

  const onChange = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images", e.target.files[i]);
    }
    await authService.saveImages(formData).then((response) => {
      if (response.status === 200) {
        setImages([...images, ...response.data]);
        setLoader(false);
      }
    });
  };

  const handleError = () => {
    if (images.length === 0) {
      alert("Please upload atleast one image");
    }
  };

  const onChangeVideos = async (e) => {
    setVideoLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("videos", e.target.files[i]);
    }
    await authService.saveVideos(formData).then((response2) => {
      if (response2.status === 200) {
        setVideos([...videos, ...response2.data]);
        setVideoLoader(false);
      }
    });
  };

  const handleDelete = (url) => () => {
    setImages(images.filter((image) => image.url !== url));
    // make button not hit submit
  };

  const handleDeleteVideo = (url) => () => {
    setVideos(videos.filter((video) => video.url !== url));
  };

  const onSubmit = async (data) => {
    toogleStep(step + 1);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className="upload-box"
    >
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
        </div>
        {loader ? (
          <div className="loader">
            <div className="spinning" />
          </div>
        ) : null}
        {videoLoader ? (
          <div className="loader">
            <div className="spinning" />
          </div>
        ) : null}
        <div className="input-form-1">
          Choose the Image Files (*)
          <input
            id="images-btn"
            accept="image/*"
            type="file"
            name="images"
            multiple
            hidden
            {...register("images", { onChange: onChange })}
            required
          />
          <details>
            <summary>
              <label htmlFor="images-btn">+ Images</label>
            </summary>
            <div>
              <label htmlFor="images-btn">
                <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" alt="" />
              </label>
            </div>
          </details>
          <div className="upload-list">
            {images
              ? images.map((image, index, arr) => (
                  <div key={index} className="upload-list-item">
                    <span>
                      {image.name}
                      <button
                        className="delete-btn"
                        onClick={handleDelete(image.url)}
                        onMouseEnter={() => {
                          var tempArr = arr;
                          var temp = image;
                          temp.onHover = true;
                          setImages([...tempArr]);
                        }}
                        onMouseLeave={() => {
                          var tempArr = arr;
                          var temp = image;
                          temp.onHover = false;
                          let newArr = tempArr.splice(index, 0);
                          setImages([...tempArr, ...newArr]);
                        }}
                      >
                        {!image.onHover ? (
                          <FaCheck fontSize="1.5em" color="blue" />
                        ) : (
                          <MdClose fontSize="1.5em" color="red" />
                        )}
                      </button>
                    </span>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="input-form-2">
          Choose the Videos/ Live360 Files (optional)
          <input
            id="videos-btn"
            accept="video/*"
            type="file"
            name="videos"
            multiple
            hidden
            {...register("videos", { onChange: onChangeVideos })}
            // required
          />
          <details>
            <summary>
              <label htmlFor="videos-btn">+ Videos</label>
            </summary>
            <div>
              <label htmlFor="videos-btn">
                <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" alt="" />{" "}
              </label>
            </div>
          </details>
          <div className="upload-list">
            {videos
              ? videos.map((video, index, arr) => (
                  <div key={index} className="upload-list-item">
                    <span>
                      {video.name}
                      <button
                        className="delete-btn"
                        onClick={handleDeleteVideo(video.url)}
                        onMouseEnter={() => {
                          var tempArr = arr;
                          var temp = video;
                          temp.onHover0 = true;
                          setVideos([...tempArr]);
                        }}
                        onMouseLeave={() => {
                          var tempArr = arr;
                          var temp = video;
                          temp.onHover0 = false;
                          let newArr = tempArr.splice(index, 0);
                          setVideos([...tempArr, ...newArr]);
                        }}
                      >
                        {!video.onHover0 ? (
                          <FaCheck fontSize="1.5em" color="blue" />
                        ) : (
                          <MdClose fontSize="1.5em" color="red" />
                        )}
                      </button>
                    </span>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="bottom-btn">
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button
            className="nxt-btn"
            onClick={() => {
              handleError();
              toogleImages(images);
              toogleVideos(videos);
            }}
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
