import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../services/authServices";
import "../../styles/sell-register.css";
import { MdClose } from "react-icons/md";
import { Button, Row, Col } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { IoInformationCircleSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import SellHeader from "./SellHeader";
import Loading from "../../components/Loading";

const UploadForm = ({
  toggleStep,
  step,
  setStep,
  toggleSellStep,
  sellStep,
  propertyData,
  propId,
  ownership,
  getPropId,
  propertyType,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
}) => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState(propertyTest.images || []);
  const [videos, setVideos] = useState(propertyTest.videos || []);
  const [link, setLink] = useState([]);
  const [loader, setLoader] = useState(false);
  const [videoLoader, setVideoLoader] = useState(false);
  const [extra, setExtra] = useState(false);
  const toggleExtra = () => setExtra(!extra);

  const params = useParams();

  const onChange = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 3000000) {
        alert("File size must be less than 3MB.");
      } else {
        formData.append("images", e.target.files[i]);
      }
    }

    await authService.saveImages(formData).then((response) => {
      if (response.data.error) {
        alert(response.data.error);
      } else {
        setImages([...images, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const onChangeVideos = async (e) => {
    setVideoLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      if (e.target.files[i].size > 150000000) {
        alert("File size must be less than 150MB.");
      } else {
        formData.append("videos", e.target.files[i]);
      }
    }
    await authService.saveVideos(formData).then((response2) => {
      if (response2.data.error) {
        alert(response2.data.error);
      } else {
        setVideos([...videos, ...response2.data]);
        setVideoLoader(false);
      }
    });
    e.target.value = null;
  };

  const getLink = () => {
    if (link) {
      setVideos([...videos, { name: "videos", url: link }]);
    }
  };

  const handleDelete = (url) => () => {
    setImages(images.filter((image) => image.url !== url));
    // make button not hit submit
  };

  const handleDeleteVideo = (url) => () => {
    setVideos(videos.filter((video) => video.url !== url));
  };

  const onSubmit = () => {
    if (images.length !== 0) {
      const data = { images, videos, step: 3 };
      authService
        .editProperty(propertyTest._id, data)
        .then((res) => {
          if (res.data.error) {
            if (res.data.error === "Invalid Token") {
              alert("Your session ended. Please log in! ");
              toggleSignIn(true);
            } else alert(res.data.error);
          } else {
            setPropertyTest(res.data);
            setStep(step + 1);
          }
        })
        .catch((error) => {
          alert(error);
        });
    } else {
      alert("Please upload at least one image!");
    }
  };

  return (
    <div className="wrapper">
      <SellHeader step={step} />
      <div className="sell-bottom">
        <h3>UPLOAD PICTURES AND VIDEOS</h3>
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <div
            className="dropdown-icon"
            style={{
              width: "fit-content",
            }}
          >
            <IoInformationCircleSharp
              style={{ cursor: "pointer" }}
              color="blue"
              size={30}
            />
            <div
              className="dropdown-info"
              style={{ width: "400px", marginLeft: "-20rem" }}
            >
              <p>
                For Video, we recommend you to upload your youtube video link of
                the property to make the process smoother. If not, you may click
                on the "+ Videos" button to upload your video. *Video file size
                must not exceed 150MB*
              </p>
            </div>
          </div>
        </div>
        {loader ? <Loading /> : null}
        {videoLoader ? <Loading /> : null}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col xs={12} md={6} className="px-sm-3">
              Upload Image Files <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="images-btn"
                accept="image/*"
                type="file"
                name="images"
                multiple
                hidden
                {...register("images", { onChange: onChange })}
              />
              <div className="upload-wrapper">
                <details>
                  <summary>
                    <label onClick={toggleExtra} htmlFor="images-btn">
                      + Images
                    </label>
                  </summary>

                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="images-btn"
                    >
                      <AiOutlinePlusCircle color="black" />
                    </label>
                  </div>
                </details>
              </div>
              <div className="upload-list" style={{ width: "100%" }}>
                {images
                  ? images.map((image, index, arr) => (
                      <div key={index} className="upload-item">
                        <span>
                          {image.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDelete(image.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
                        </span>
                      </div>
                    ))
                  : null}
              </div>
            </Col>

            <Col xs={12} md={6} className="px-sm-3">
              Upload Videos {/* <span style={{ color: "#ff0000" }}>*</span> */}
              <input
                id="videos-btn"
                accept="video/*"
                type="file"
                name="videos"
                hidden
                {...register("videos", { onChange: onChangeVideos })}
              />
              <div className="upload-wrapper d-grid">
                <div className="d-flex">
                  <input
                    style={{ width: "80%" }}
                    placeholder="Video Link Here"
                    className="form-control mb-3 bg-white"
                    type="text"
                    onChange={(e) => setLink(e.target.value)}
                  />
                  <span style={{ marginLeft: "20px" }}>
                    <Button onClick={() => getLink()}>Upload</Button>
                  </span>
                </div>
                <label
                  onClick={toggleExtra}
                  htmlFor="videos-btn"
                  style={{ width: "50%" }}
                >
                  + Videos
                </label>
              </div>
              <div className="upload-list" style={{ width: "100%" }}>
                {videos
                  ? videos.map((video, index, arr) => (
                      <div key={index} className="upload-item">
                        <span>
                          {video.name}
                          <Button
                            className="delete-btn"
                            onClick={handleDeleteVideo(video.url)}
                          >
                            <MdClose fontSize="1.5em" color="red" />
                          </Button>
                        </span>
                      </div>
                    ))
                  : null}
              </div>
            </Col>
          </Row>
          <Row className="mt-5">
            <Col className="d-flex justify-content-center mt-2">
              <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
                Previous
              </Button>
              <Button className="nxt-btn" id="next" type="submit">
                Next
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;
