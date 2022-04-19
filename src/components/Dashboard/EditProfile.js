import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";

function EditProfile({ getProfilePic, getDescription }) {
  const user = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [changePass, setChangePass] = useState(false);
  const [changePlace, setChangePlace] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [loader, setLoader] = useState(false);

  const changePassword = async () => {
    const datas = {
      id: user._id,
      details: {
        oldPass,
        newPass,
      },
    };
    await authService.editUserInfo(datas).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Password changed successfully");
        setOldPass("");
        setNewPass("");
      }
    });
  };

  const changePlaces = async () => {
    const datas = {
      id: user._id,
      details: {
        country,
        city,
      },
    };
    await authService.editUserInfo(datas).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Place changed successfully");
        setCountry("");
        setCity("");
      }
    });
  };

  const changeProfilePic = async (e) => {
    setLoader(true);
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images", e.target.files[i]);
    }
    await authService.saveImages(formData).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        setProfilePic(res.data[0].url);
        setLoader(false);
      }
    });
  };

  const onSubmit = async (data) => {
    const datas = {
      id: user._id,
      details: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        userName: data.userName,
        profileImage: profilePic ? profilePic : user.profileImage,
        social_links: {
          facebook: data.facebook ? data.facebook : "https://www.facebook.com/",
          twitter: data.twitter ? data.twitter : "https://www.twitter.com/",
          instagram: data.instagram
            ? data.instagram
            : "https://www.instagram.com/",
        },
      },
    };
    getDescription(data.description);
    await authService.editUserInfo(datas).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert("Profile changed successfully");
        window.location.reload();
      }
    });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Container style={{ padding: "40px" }}>
        <Row>
          <Col>
            <span>First Name</span>
            <input
              className="form-control"
              defaultValue={user.firstName}
              type="text"
              {...register("firstName", { required: true })}
            />
          </Col>
          <Col>
            <span>Last Name</span>
            <input
              className="form-control"
              defaultValue={user.lastName}
              type="text"
              {...register("lastName", { required: true })}
            />
          </Col>
          <Col>
            <span>Title</span>
            <input
              className="form-control"
              defaultValue={"Owner"}
              type="text"
              {...register("title", { required: true })}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <span>Username</span>
            <input
              className="form-control"
              defaultValue={user.userName}
              type="text"
              {...register("userName", { required: true })}
            />
          </Col>
          <Col>
            <span>Email</span>
            <input
              className="form-control"
              defaultValue={user.email}
              type="email"
              {...register("email", { required: true })}
            />
          </Col>
          <Col>
            <span>Phone</span>
            <input
              className="form-control"
              defaultValue={user.phone}
              type="phone"
              {...register("phone", { required: true })}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            {loader ? (
              <div className="loader">
                <div className="spinning" />
              </div>
            ) : null}
            <span style={{ fontSize: "20px", fontWeight: "700" }}>
              Profile Picture
            </span>
            <input
              className="form-control"
              type="file"
              {...register("images", { onChange: changeProfilePic })}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col style={{ fontSize: "20px", fontWeight: "700" }}>
            Social Media
          </Col>
        </Row>
        <Row>
          <Col>
            <span>Instagram</span>
            {/* <input
              className="form-control"
              defaultValue={user.social_links.instagram ? user.social_links.instagram : ""}
              type="text"
              {...register("instagram", { required: false })}
            /> */}
          </Col>
          <Col>
            <span>Facebook</span>
            {/* <input
              className="form-control"
              defaultValue={user.social_links.facebook ? user.social_links.facebook : ""}
              type="text"
              {...register("facebook", { required: false })}
            /> */}
          </Col>
          <Col>
            <span>Twitter</span>
            {/* <input
              className="form-control"
              defaultValue={user.social_links.twitter ? user.social_links.twitter : ""}
              type="text"
              {...register("twitter", { required: false })}
            /> */}
          </Col>
        </Row>
        <Row
          style={{
            marginTop: "20px",
          }}
        >
          <Col
            style={{
              fontSize: "20px",
              fontWeight: "700",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Button onClick={() => setChangePass(!changePass)}>
              Change Password
            </Button>
          </Col>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button onClick={() => setChangePlace(!changePlace)}>
              Change Place
            </Button>
          </Col>
        </Row>

        {changePass ? (
          <Row>
            <Row style={{ marginTop: "20px" }}>
              <Col
                style={{
                  fontSize: "20px",
                  fontWeight: "700",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                Change Password
              </Col>
            </Row>
            <Row style={{ marginTop: "20px" }}>
              <Col>
                <span>Current Password</span>
                <input
                  className="form-control"
                  type="password"
                  onChange={(e) => setOldPass(e.target.value)}
                />
              </Col>
              <Col>
                <span>New Password</span>
                <input
                  className="form-control"
                  type="password"
                  onChange={(e) => setNewPass(e.target.value)}
                />
              </Col>
              <Col>
                <span>Confirm Password</span>
                <input className="form-control" type="password" />
              </Col>
              <Row style={{ marginTop: "20px" }}>
                <Col style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    className="btn btn-primary"
                    onClick={() => {
                      changePassword();
                    }}
                  >
                    Save
                  </Button>
                </Col>
              </Row>
            </Row>
          </Row>
        ) : null}

        {changePlace ? (
          <Row>
            <Col>
              <span>Country</span>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setCountry(e.target.value)}
              />
            </Col>
            <Col>
              <span>City</span>
              <input
                className="form-control"
                type="text"
                onChange={(e) => setCity(e.target.value)}
              />
            </Col>
            <Row style={{ marginTop: "20px" }}>
              <Col style={{ display: "flex", justifyContent: "center" }}>
                <Button
                  className="btn btn-primary"
                  onClick={() => {
                    changePlaces();
                  }}
                >
                  Save
                </Button>
              </Col>
            </Row>
          </Row>
        ) : null}
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <span style={{ fontSize: "20px", fontWeight: "700" }}>
              Description
            </span>
          </Col>
        </Row>
        <Row>
          <Col>
            <textarea
              style={{ height: "150px" }}
              className="form-control"
              {...register("description", { required: false })}
            />
          </Col>
        </Row>
        <Row style={{ marginTop: "50px" }}>
          <Col style={{ display: "flex", justifyContent: "center" }}>
            <Button className="btn btn-primary" type="submit">
              Change
            </Button>
          </Col>
        </Row>
      </Container>
    </form>
  );
}

export default EditProfile;
