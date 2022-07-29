import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import authService from "../../services/authServices";
import Loading from "../../components/Loading";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

function EditProfile({ getProfilePic, getDescription }) {
  const user = useSelector((state) => state.user);
  const { register, handleSubmit } = useForm();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [description, setDescription] = useState();
  const [facebook, setFacebook] = useState(user.social_links.facebook);
  const [instagram, setInstagram] = useState(user.social_links.instagram);
  const [twitter, setTwitter] = useState(user.social_links.twitter);
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [country, setCountry] = useState();
  const [city, setCity] = useState();
  const [changePass, setChangePass] = useState(false);
  const [changePlace, setChangePlace] = useState(false);
  const [profilePic, setProfilePic] = useState();
  const [loader, setLoader] = useState(false);

  const changePassword = async () => {
    if (newPass !== confirmPass) {
      alert("Please make sure your new password matches");
    } else {
      const datas = {
        id: user._id,
        details: {
          old_password: oldPass,
          new_password: newPass,
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
    }
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
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        userName: username,
        profileImage: profilePic ? profilePic : user.profileImage,
        social_links: {
          facebook: facebook ? facebook : "https://www.facebook.com/",
          twitter: twitter ? twitter : "https://www.twitter.com/",
          instagram: instagram ? instagram : "https://www.instagram.com/",
        },
      },
    };
    getDescription(description);
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
    <Container style={{ padding: "20px", paddingBottom: "30px" }}>
      <Row>
        <Col>
          <span>First Name</span>
          <input
            className="form-control"
            defaultValue={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Col>
        <Col>
          <span>Last Name</span>
          <input
            className="form-control"
            defaultValue={lastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Col>
        <Col>
          <span>Username</span>
          <input
            className="form-control"
            defaultValue={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
          <span>Email</span>
          <input
            className="form-control"
            defaultValue={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
        <Col>
          <span>Phone</span>
          <PhoneInput
            disableCountryCode={false}
            onlyCountries={["ca", "us", "gb", "au"]}
            disableDropdown={false}
            country={"us"}
            dropdownStyle={{ paddingLeft: "0!important" }}
            inputStyle={{ width: "100%" }}
            buttonStyle={{
              borderRight: "none",
            }}
            value={phone}
            onChange={setPhone}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col>
          {loader ? <Loading /> : null}
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
        <Col style={{ fontSize: "20px", fontWeight: "700" }}>Social Media</Col>
      </Row>
      <Row>
        <Col>
          <span>Instagram</span>
          <input
            className="form-control"
            defaultValue={instagram}
            type="text"
            onChange={(e) => setInstagram(e.target.value)}
          />
        </Col>
        <Col>
          <span>Facebook</span>
          <input
            className="form-control"
            defaultValue={facebook}
            type="text"
            onChange={(e) => setFacebook(e.target.value)}
          />
        </Col>
        <Col>
          <span>Twitter</span>
          <input
            className="form-control"
            defaultValue={twitter}
            type="text"
            onChange={(e) => setTwitter(e.target.value)}
          />
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
              <input
                className="form-control"
                onChange={(e) => setConfirmPass(e.target.value)}
                type="password"
              />
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
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Col>
      </Row>
      <Row style={{ marginTop: "50px" }}>
        <Col style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={onSubmit} className="btn btn-primary" type="submit">
            Change
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
