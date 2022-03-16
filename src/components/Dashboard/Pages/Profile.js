import React, { useState, useEffect } from "react";
import { Row, Col, Container, Button, Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { BsInstagram, BsFacebook, BsTwitter } from "react-icons/bs";
import { FiEdit } from "react-icons/fi";
import "../../../styles/DashBoardStyle.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import styled from "styled-components";
import authService from "../../../services/authServices";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import EditProfile from "../EditProfile";

const Carousel = styled(Slider)`
  height: 100%;
  width: 100%;
  overflow: hidden;

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

function Profile({ id }) {
  const savedProperty = useSelector((state) => state.savedProperty);
  const user = useSelector((state) => state.user);
  console.log(user.profileImage);
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: savedProperty.length > 3 ? 3 : savedProperty.length,
  };
  const { register, handleSubmit, errors } = useForm();
  const [showEdit, setShowEdit] = useState(false);
  const toogleEdit = () => setShowEdit(!showEdit);
  const [description, setDescription] = useState("");
  const getDescription = (descript) => setDescription(descript);

  const descriptPlaceHolder = "Please Enter Description";
  return (
    <Container className="profileContainer">
      <div className="edit-btn">
        <Button
          onClick={() => {
            toogleEdit();
          }}
        >
          <FiEdit size={20} />
        </Button>
        <Modal
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={showEdit}
          onHide={toogleEdit}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Edit Profile
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditProfile getDescription={getDescription} />
          </Modal.Body>
        </Modal>
      </div>
      <Row>
        <Col sm={3}>
          <div className="profileOutline">
            <div className="profileInline"></div>
          </div>
        </Col>
        <Col sm={9}>
          <div className="descript">
            <h3>Description</h3>
            <p>{description ? description : descriptPlaceHolder}</p>
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          sm={3}
          style={{
            display: "inline-grid",
            justifyContent: "center",
            textAlign: "center",
            marginTop: "30px",
          }}
        >
          <div className="name">
            <h3>
              {user.firstName} {user.lastName}
            </h3>
            <p>Owner</p>
          </div>
          <div className="address">
            <p>Midnight Corner St. Suite 600 San Francisco, CADGE 94107</p>
            <Button
              onClick={() => {
                window.open("https://www.instagram.com/");
              }}
            >
              <BsInstagram size={25} color="#216fed" />
            </Button>
            <Button
              onClick={() => {
                window.open("https://www.facebook.com/");
              }}
            >
              <BsFacebook size={29} color="#216fed" />
            </Button>
            <Button
              onClick={() => {
                window.open("https://www.twitter.com/");
              }}
            >
              <BsTwitter size={27} color="#216fed" />
            </Button>
          </div>
        </Col>
        <Col style={{ paddingLeft: "70px" }} sm={9}>
          <h3>Listed Property</h3>
          <Row>
            <Carousel {...settings}>
              {savedProperty.map((property, index) => (
                <Wrap key={index}>
                  <div className="listItem">
                    <img
                      src={property.property.images[0].url}
                      alt="property"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                        borderRadius: "15px",
                        cursor: "pointer",
                      }}
                    />
                  </div>
                </Wrap>
              ))}
            </Carousel>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Profile;
