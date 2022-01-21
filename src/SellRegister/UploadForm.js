import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../services/authServices";
import { Button } from "react-bootstrap";
import "../styles/SellRegister.css";

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

  const onChangeVideos = async (e) => {
    setVideoLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("videos", e.target.files[i]);
    }
    await authService
      .saveVideos(formData)
      .then((response2) => {
        if (response2.status === 200) {
          setVideos([...videos, ...response2.data]);
          setVideoLoader(false);
        }
      });
  }

  const handleDelete = (url) => () => {
    console.log(url)
    setImages(images.filter(image => image.url !== url))
    // make button not hit submit

  }

  const handleDeleteVideo = (url) => () => {
    console.log(url)
    setVideos(videos.filter(video => video.url !== url))

  }

  const onSubmit = async (data) => {
    const videos = data.videos;
    const images = data.images;


    const formData = new FormData();
    const formData2 = new FormData();


    for (let i = 0; i < videos.length; i++) {
      formData2.append("videos", videos[i]);
    }
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }

    await authService.saveVideos(formData2).then((response2) => {
      console.log(response2);
      setVideos(response2.data);
    });


    await authService.saveImages(formData).then((response) => {
      setImages(response.data);
    });
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
        </div>
        {loader ? <div className="loader" /> : null}
        {videoLoader ? <div className="loader" /> : null}
        <div className="input-form-1">
          Choose the Image Files
          <input
            id="images-btn"
            accept="image/*"
            type="file"
            name="images"
            multiple
            hidden
            {...register("images", { onChange: onChange })} required
          />
          <div>
            <label for="images-btn" >+ Images</label>
          </div>


          <div className="upload-list">
            {images.map((image) => (
              <div className="upload-list-item">
                <span>{image.name}<Button className="delete-btn"
                  onClick={handleDelete(image.url)}
                >
                  X
                </Button></span>
              </div>
            ))}
          </div>
        </div>

        <div className="input-form-2">
          Choose the Videos/ Live360 Files
          <input
            id="videos-btn"
            accept="video/*"
            type="file"
            name="videos"
            multiple
            hidden
            {...register("videos", { onChange: onChangeVideos })}
          />
          <div>
            <label for="videos-btn">+ Videos</label>
          </div>



          <div className="upload-list">
            {videos.map((video) => (
              <div className="upload-list-item">
                <span>{video.name}
                  <Button className="delete-btn"
                    onClick={handleDeleteVideo(video.url)}
                  >
                    X
                  </Button></span>
              </div>
            ))}
          </div>
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
