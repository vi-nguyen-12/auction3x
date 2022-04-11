import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import authService from "../../services/authServices";
import "../../styles/SellRegister.css";
import { FaCheck } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { Button } from "react-bootstrap";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useParams } from "react-router-dom";

const UploadForm = ({
  toogleStep,
  step,
  toogleImages,
  toogleVideos,
  toogleSellStep,
  sellStep,
  propertyData,
  propId,
  ownership,
  getPropId,
  propertyType,
  image,
  video,
}) => {
  console.log(image);
  const { register, handleSubmit } = useForm();
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loader, setLoader] = useState(false);
  const [videoLoader, setVideoLoader] = useState(false);
  const [extra, setExtra] = useState(false);
  const toogleExtra = () => setExtra(!extra);

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
    let savedImages = images.map((image) => {
      delete image.onHover;
      return image;
    });
    let savedVideos = videos.map((video) => {
      delete video.onHover0;
      return video;
    });
    if (propertyType === "real-estate") {
      if (propId || params.id) {
        if (sellStep === 2 || parseInt(params.step) === 2) {
          console.log("Hello");
          const datas = {
            id: propId ? propId : params.id,
            details: {
              images: savedImages,
              videos: savedVideos,
              step: 3,
            },
          };
          await authService.putRealEstateInfo(datas).then((response) => {
            if (response.data.error) {
              alert(response.data.error);
            } else {
              toogleSellStep(3);
              alert("Saved Successfully!");
            }
          });
        } else if (sellStep === 1 || parseInt(params.step) === 1) {
          console.log("Hello");
          const datas = {
            id: propId ? propId : params.id,
            details: {
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
              toogleSellStep(3);
              alert("Saved Successfully!");
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
            toogleSellStep(3);
            getPropId(response.data._id);
            alert("Saved Successfully!");
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
              toogleSellStep(3);
              alert("Saved Successfully!");
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
              toogleSellStep(3);
              alert("Saved Successfully!");
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
        await authService.savePropInfo(datas).then((response) => {
          if (response.data.error) {
            alert(response.data.error);
          } else {
            toogleSellStep(3);
            getPropId(response.data._id);
            alert("Saved Successfully!");
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
              property[0].images.length > 0
                ? property[0].images
                : image
                ? image
                : []
            );
            setVideos(
              property[0].videos.length > 0
                ? property[0].videos
                : video
                ? video
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
    let savedImages = images.map((image) => {
      delete image.onHover;
      return image;
    });
    let savedVideos = videos.map((video) => {
      delete video.onHover;
      return video;
    });
    if (images.length !== 0) {
      toogleImages(savedImages);
      toogleVideos(savedVideos);
      toogleStep(step + 1);
    } else {
      alert("Please upload at least one image!");
    }
  };

  console.log(images);
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
          <h2 style={{ color: "black", fontWeight: "bold" }}>
            UPLOAD PICTURES AND VIDEOS
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
          Choose the Image Files<span style={{ color: "#ff0000" }}>*</span>
          <input
            id="images-btn"
            accept="image/*"
            type="file"
            multiple
            hidden
            {...register("images", { onChange: onChange })}
          />
          <div className="upload-cover">
            <details>
              <summary>
                <label onClick={toogleExtra} htmlFor="images-btn">
                  + Images
                </label>
              </summary>
              {/* {extra ? (
              <AiOutlinePlusCircle />
            ) : (
              null
            )} */}
              {/* {extra === true ? (
              <AiOutlinePlus size="5%" />
            ) : (
              null
            )} */}

              {/* {extra ? (
              <button className="upload-btn" onClick={toogleExtra}>
                <AiOutlinePlus size="5%" />
              </button>
            ) : (
              <>
                <button className="upload-btn" onClick={toogleExtra}>
                  <AiOutlineMinus size="5%" />
                </button>
                <label htmlFor="images-btn">
                  
                </label>
              </>
            )} */}

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
          <div className="upload-list">
            {images
              ? images.map((image, index, arr) => (
                  <div key={index} className="upload-list-item">
                    <span>
                      {image.name}
                      <Button
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
                      </Button>
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
          <div className="upload-cover">
            <details>
              <summary>
                <label onClick={toogleExtra} htmlFor="videos-btn">
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
          {/* <div>
                <label htmlFor="videos-btn">
                  <img src="https://img.icons8.com/material-outlined/24/FFFFFF/plus--v2.png" />{" "}
                </label>
              </div> */}
          <div className="upload-list">
            {videos
              ? videos.map((video, index, arr) => (
                  <div key={index} className="upload-list-item">
                    <span>
                      {video.name}
                      <Button
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
                      </Button>
                    </span>
                  </div>
                ))
              : null}
          </div>
        </div>

        <div className="bottom-btn">
          <div
            style={{
              position: "absolute",
              left: "50px",
            }}
          >
            <Button onClick={saveInfo}>Save</Button>
          </div>
          <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
            Previous
          </button>
          <button className="nxt-btn" id="next" type="submit">
            Next
          </button>
        </div>
      </div>
    </form>
  );
};

export default UploadForm;
