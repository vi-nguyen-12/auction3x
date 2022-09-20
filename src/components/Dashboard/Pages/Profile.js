import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import "../../../styles/dashboard.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import { Modal } from "react-bootstrap";
import EditProfile from "../EditProfile";
import authService from "../../../services/authServices";
import CloseButton from "react-bootstrap/CloseButton";
import parse from "html-react-parser";

const Carousel = styled(Slider)`
  height: 100%;
  width: 100%;
  overflow-x: hidden;

  & > button {
    opacity: 1;
    height: 100%;
    width: 15vw;
    z-index: 1;

    &:hover {
      opacity: 1;
      transition: opacity 0.2s ease 0s;
    }
  }

  ul li button {
    &:before {
      top: -3vh;
      font-size: 20px;
      color: gray;
      left: -35px;
    }
  }

  li.slick-active button:before {
    color: #e9af84;
  }

  .slick-list {
    overflow: initial;
  }

  .slick-prev {
    left: -75px;
    width: 12vw;
    height: 100%;
  }

  .slick-prev:before {
    color: #e9af84;
    font-size: 50px;
  }

  .slick-next {
    right: -75px;
    width: 12vw;
    height: 100%;
  }

  .slick-next:before {
    color: #e9af84;
    font-size: 50px;
  }
`;

const Wrap = styled.div`
border-radius: 15px;
// cursor: pointer;
// position: relative;
width: 250px;
height: 150px;

  // &:hover {
  //   padding: 0;
  //   transform: scale(1.03);
  //   box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  // }
}
`;

function Profile({ id, windowSize }) {
  const user = useSelector((state) => state.user);
  const [listedProp, setListedProp] = useState([]);

  useEffect(async () => {
    await authService.sellerPropInAuctions(user._id).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        setListedProp(res.data);
      }
    });
  }, []);

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow:
      windowSize > 800 ? (listedProp.length > 3 ? 3 : listedProp.length) : 2,
  };
  // const { register, handleSubmit, errors } = useForm();
  const [showEdit, setShowEdit] = useState(false);
  const toggleEdit = () => setShowEdit(!showEdit);

  return (
    <Container
      className="profileContainer"
      style={{ padding: windowSize < 800 && "20px" }}
    >
      <div className="edit-btn">
        <Button
          onClick={() => {
            toggleEdit();
          }}
        >
          <FiEdit size={20} />
        </Button>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showEdit}
          onHide={toggleEdit}
          backdrop="static"
          keyboard={false}
          className="edit-modal"
        >
          <Modal.Header className="auction-modal-header">
            <Modal.Title className="auction-modal-title px-3">
              Edit Profile
            </Modal.Title>
          </Modal.Header>
          <div
            style={{
              position: "absolute",
              top: windowSize < 600 ? "0" : "25px",
              right: windowSize < 600 ? "0" : "25px",
              zIndex: "999",
            }}
          >
            <CloseButton
              className="modal-close"
              style={{ backgroundColor: "white" }}
              onClick={() => {
                toggleEdit();
              }}
            />
          </div>
          <Modal.Body>
            <EditProfile />
          </Modal.Body>
        </Modal>
      </div>
      <Row>
        <Col
          lg={3}
          md={12}
          xs={12}
          style={{
            display: windowSize < 800 && "flex",
            justifyContent: windowSize < 800 && "center",
          }}
        >
          <div className="profileOutline">
            <div className="profileInline">
              <div
                style={{
                  borderRadius: "0",
                  width: "100%",
                  height: "100%",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundImage: `url(${user.profileImage})`,
                }}
              />
            </div>
          </div>
        </Col>
        <Col lg={9} md={12} xs={12}>
          <div
            style={{
              padding: windowSize < 800 && "0",
              display: windowSize < 800 && "grid",
              justifyContent: windowSize < 800 && "center",
              height: windowSize < 800 && "fit-content",
            }}
            className="descript"
          >
            <h3 style={{ textAlign: windowSize < 800 && "center" }}>
              Description
            </h3>
            <p
              style={{
                height: windowSize < 800 && "100%",
                textAlign: windowSize < 800 && "start",
              }}
            >
              {user.description
                ? parse(user.description)
                : "Please Enter Description"}
            </p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          lg={3}
          md={12}
          xs={12}
          style={{
            display: "inline-grid",
            justifyContent: "flex-start",
            textAlign: "start",
            marginTop: "30px",
          }}
        >
          <div className="name">
            <h3>
              {user.firstName[0].toUpperCase() + user.firstName.slice(1)}{" "}
              {user.lastName[0].toUpperCase() + user.lastName.slice(1)}
            </h3>
            <p>Owner</p>
          </div>
          <div className="address">
            <p>
              {user.country}, {user.city}
            </p>
            <Button
              onClick={() => {
                window.open(
                  user.social_links.instagram
                    ? user.social_links.instagram
                    : "https://www.instagram.com/"
                );
              }}
            >
              <BsInstagram size={25} color="#b77b50" />
            </Button>
            <Button
              onClick={() => {
                window.open(
                  user.social_links
                    ? user.social_links.facebook
                    : "https://www.facebook.com/"
                );
              }}
            >
              <BsFacebook size={29} color="#b77b50" />
            </Button>
            <Button
              onClick={() => {
                window.open(
                  user.social_links
                    ? user.social_links.twitter
                    : "https://www.twitter.com/"
                );
              }}
            >
              <BsTwitter size={27} color="#b77b50" />
            </Button>
          </div>
        </Col>
        <Col
          style={{ paddingLeft: windowSize > 800 && "70px" }}
          lg={9}
          md={12}
          xs={12}
        >
          <h3 style={{ textAlign: windowSize < 800 && "center" }}>
            Listed Property
          </h3>
          <Row>
            <Carousel {...settings}>
              {listedProp.length > 0
                ? listedProp.map((property, index) => (
                    <div className="listItem px-1" key={index}>
                      <img
                        src={property.images[0].url}
                        alt="property"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          width: "100%",
                          height: "100%",
                          borderRadius: "0",
                          cursor: "pointer",
                        }}
                        onClick={() => {
                          window.open(
                            `/DisplayAuctions/${property.auctionDetails._id}`,
                            "_blank"
                          );
                        }}
                      />
                    </div>
                  ))
                : null}
            </Carousel>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
