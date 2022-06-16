import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../services/authServices";
import "../../styles/sell-register.css";
import { MdClose } from "react-icons/md";
import { Button, Row, Col } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";
import SellHeader from "./SellHeader";
import Loading from "../../components/Loading";

const UploadForm = ({
  toggleStep,
  step,
  toggleImages,
  toggleVideos,
  toggleSellStep,
  sellStep,
  propertyData,
  propId,
  ownership,
  getPropId,
  propertyType,
  image,
  video,
}) => {
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [videoLoader, setVideoLoader] = useState(false);
  const [extra, setExtra] = useState(false);
  const toggleExtra = () => setExtra(!extra);

  const params = useParams();

  const onChange = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images", e.target.files[i]);
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
      formData.append("videos", e.target.files[i]);
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

  const saveInfo = async () => {
    if (propertyType === "real-estate") {
      if (propId || params.id) {
        if (sellStep === 2 || parseInt(params.step) === 2) {
          const datas = {
            id: propId ? propId : params.id,
            changes: {
              images: images,
              videos: videos,
              step: 3,
            },
          };
          await authService.putRealEstateInfo(datas).then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            } else {
              toggleSellStep(3);
            }
          });
        } else if (sellStep === 1 || parseInt(params.step) === 1) {
          const datas = {
            id: propId ? propId : params.id,
            changes: {
              ...propertyData,
              images,
              videos,
              step: 3,
            },
          };
          await authService.putRealEstateInfo(datas).then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            } else {
              toggleSellStep(3);
            }
          });
        }
      } else {
        const datas = {
          ...ownership,
          ...propertyData,
          images,
          videos,
          step: 3,
        };
        await authService.postRealEstateInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toggleSellStep(3);
            getPropId(response.data._id);
          }
        });
      }
    } else {
      if (propId || params.id) {
        if (sellStep === 2 || parseInt(params.step) === 2) {
          const datas = {
            id: propId ? propId : params.id,
            details: {
              images,
              videos,
              step: 3,
            },
          };
          await authService.saveInfo(datas).then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            } else {
              toggleSellStep(3);
            }
          });
        } else if (sellStep === 1 || parseInt(params.step) === 1) {
          const datas = {
            id: propId ? propId : params.id,
            details: {
              ...propertyData,
              images,
              videos,
              step: 3,
            },
          };
          await authService.saveInfo(datas).then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            } else {
              toggleSellStep(3);
            }
          });
        }
      } else {
        const datas = {
          ...ownership,
          ...propertyData,
          images,
          videos,
          step: 3,
        };
        await authService.postPropInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toggleSellStep(3);
            getPropId(response.data._id);
          }
        });
      }
    }
  };

  useEffect(() => {
    if (params.id) {
      authService.getIncompleteProperty(params.userId).then((response) => {
        if (response.data.error) {
          alert(response.data.error);
        } else {
          const property = response.data.filter(
            (item) => item._id === params.id
          );
          if (property.length > 0) {
            setImages(
              property[0].images
                ? property[0].images.length > 0
                  ? property[0].images
                  : image
                  ? image
                  : []
                : []
            );
            setVideos(
              property[0].videos
                ? property[0].videos.length > 0
                  ? property[0].videos
                  : video
                  ? video
                  : []
                : []
            );
          }
        }
      });
    } else {
      setImages(image ? image : []);
      setVideos(video ? video : []);
    }
  }, []);

  const handleDelete = (url) => () => {
    setImages(images.filter((image) => image.url !== url));
    // make button not hit submit
  };

  const handleDeleteVideo = (url) => () => {
    setVideos(videos.filter((video) => video.url !== url));
  };

  const onSubmit = () => {
    if (images.length !== 0) {
      toggleImages(images);
      toggleVideos(videos);
      toggleStep(step + 1);
    } else {
      alert("Please upload at least one image!");
    }
  };

  return (
    <div className="wrapper">
      <SellHeader step={step} />
      <div className="sell-bottom">
        <h3>UPLOAD PICTURES AND VIDEOS</h3>

        {loader ? <Loading /> : null}
        {videoLoader ? <Loading /> : null}
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <Row style={{ display: "flex", justifyContent: "space-between" }}>
            <Col xs={12} md={6} className="px-sm-3">
              Choose the Image Files <span style={{ color: "#ff0000" }}>*</span>
              <input
                id="images-btn"
                accept="image/*"
                type="file"
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
              Choose the Videos/ Live360 Files (optional)
              <input
                id="videos-btn"
                accept="video/*"
                type="file"
                name="videos"
                multiple
                hidden
                {...register("videos", { onChange: onChangeVideos })}
              />
              <div className="upload-wrapper">
                <details>
                  <summary>
                    <label onClick={toggleExtra} htmlFor="videos-btn">
                      + Videos
                    </label>
                  </summary>

                  <div>
                    <label
                      style={{ width: "50%", marginTop: "10px" }}
                      htmlFor="images-btn"
                    >
                      <AiOutlinePlusCircle />
                    </label>
                  </div>
                </details>
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
            {/* <Col
              xs={12}
              md={4}
              className="d-flex justify-content-center justify-content-md-end mt-2"
            >
              <Button className="save-btn" onClick={saveInfo}>
                Save
              </Button>
            </Col> */}
            <Col className="d-flex justify-content-center mt-2">
              <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
                Previous
              </Button>
              <Button
                onClick={saveInfo}
                className="nxt-btn"
                id="next"
                type="submit"
              >
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
