import React, { useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { ProgressBar } from "react-bootstrap";
import authService from "../../services/authServices";
import Loading from "../../components/Loading";
import PhoneInput from "react-phone-input-2";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import "react-phone-input-2/lib/style.css";
import "react-phone-input-2/lib/bootstrap.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["clean"],
  ],
};

const formats = [
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "list",
  "bullet",
  "align",
  "color",
  "background",
];

function EditProfile({ setMessage }) {
  const user = useSelector((state) => state.user);
  const { register } = useForm();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [username, setUsername] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone);
  const [description, setDescription] = useState(user.description);
  const [facebook, setFacebook] = useState(user.social_links.facebook);
  const [instagram, setInstagram] = useState(user.social_links.instagram);
  const [twitter, setTwitter] = useState(user.social_links.twitter);
  const [oldPass, setOldPass] = useState();
  const [newPass, setNewPass] = useState();
  const [confirmPass, setConfirmPass] = useState();
  const [country, setCountry] = useState(user.country);
  const [city, setCity] = useState(user.city);
  const [profilePic, setProfilePic] = useState();
  const [loader, setLoader] = useState(false);
  const [licenseNum, setLicenseNum] = useState(user.agent.licenseNumber);
  const [files, setFiles] = useState(user.agent.licenseDocument);
  const [licenseState, setLicenseState] = useState(user.agent?.licenseState);
  const [licenseExpireDate, setLicenseExpireDate] = useState(
    user.agent?.licenseExpireDate
  );
  const [passStrong, setPassStrong] = useState("");
  const [passMatch, setPassMatch] = useState(false);
  const [changeDate, setChangeDate] = useState(false);

  var strongRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
  var mediumRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

  const handleCheckStrength = (e) => {
    const password = e.target.value;
    setNewPass(password);

    if (password.match(strongRegex)) {
      setPassStrong("strong");
    } else if (password.match(mediumRegex)) {
      setPassStrong("medium");
    } else {
      setPassStrong("weak");
    }
  };

  const handleCheckMatch = (e) => {
    setConfirmPass(e.target.value);
    const password = e.target.value;
    if (password === newPass) {
      setPassMatch(true);
    } else {
      setPassMatch(false);
    }
  };

  const fixDate = (date) => {
    const newDate = new Date(date).setDate(
      new Date(date).getDate() + 1 <= 31 ? new Date(date).getDate() + 1 : 1
    );
    const dates = new Date(newDate).setMonth(
      new Date(newDate).getDate() === 1
        ? new Date(newDate).getMonth() + 1
        : new Date(newDate).getMonth()
    );
    setLicenseExpireDate(new Date(dates).toISOString());
  };

  const onChange = async (e) => {
    setLoader(true);
    const formData = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData).then((response) => {
      if (response.data.error) {
        setMessage("");
        setMessage(response.data.error);
        setLoader(false);
      } else {
        setFiles([...files, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const handleDelete = (url) => () => {
    setFiles(files.filter((document) => document.url !== url));
  };

  const changeProfilePic = async (e) => {
    setLoader(true);
    const formData = new FormData();
    for (let i = 0; i < e.target.files.length; i++) {
      formData.append("images", e.target.files[i]);
    }
    await authService.saveImages(formData).then((res) => {
      if (res.data.error) {
        setMessage("");
        setMessage(res.data.error);
      } else {
        setProfilePic(res.data[0].url);
        setLoader(false);
      }
    });
  };

  const onSubmit = async (data) => {
    if (newPass && !passMatch) {
      setMessage("");
      setTimeout(() => {
        setMessage("Passwords do not match");
      }, 100);
    } else if (newPass && passStrong === "weak") {
      setMessage("");
      setTimeout(() => {
        setMessage("Password is too weak");
      }, 100);
    } else {
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
          agent: {
            licenseNumber: licenseNum,
            licenseDocument: files,
            licenseState: licenseState,
            licenseExpireDate: licenseExpireDate,
          },
          country: country,
          city: city,
          old_password: oldPass,
          new_password: newPass,
          description: description,
        },
      };
      (!licenseNum || files.length === 0) && delete datas.details.agent;
      await authService.editUserInfo(datas).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setMessage("");
          setMessage("Profile updated successfully");
          window.location.reload();
        }
      });
    }
  };
  return (
    <Container style={{ padding: "20px", paddingBottom: "30px" }}>
      <Row>
        <Col
          style={{
            fontSize: "20px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "flex-start",
            borderBottom: "2px solid black",
          }}
        >
          User Info
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={4} xs={12}>
          <span>First Name</span>
          <input
            className="form-control custom-input"
            defaultValue={firstName}
            type="text"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Col>
        <Col md={4} xs={12}>
          <span>Last Name</span>
          <input
            className="form-control custom-input"
            defaultValue={lastName}
            type="text"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Col>
        <Col md={4} xs={12}>
          <span>Username</span>
          <input
            className="form-control custom-input"
            defaultValue={username}
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} xs={12}>
          <span>Email</span>
          <input
            className="form-control custom-input"
            defaultValue={email}
            type="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Col>
        <Col md={6} xs={12}>
          <span>Phone</span>
          <PhoneInput
            disableCountryCode={false}
            onlyCountries={["ca", "us", "gb", "au", "in"]}
            disableDropdown={false}
            country={"us"}
            dropdownStyle={{ paddingLeft: "0!important" }}
            inputStyle={{
              width: "100%",
              border: "0",
              borderBottom: "1px solid #ececec",
              borderRadius: "0",
            }}
            buttonStyle={{
              border: "none",
              borderRadius: "0",
            }}
            value={phone}
            onChange={setPhone}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col md={6} xs={12}>
          <span>Country</span>
          <input
            className="form-control custom-input"
            type="text"
            defaultValue={country}
            onChange={(e) => setCountry(e.target.value)}
          />
        </Col>
        <Col md={6} xs={12}>
          <span>City</span>
          <input
            className="form-control custom-input"
            type="text"
            defaultValue={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col
          md={12}
          xs={12}
          style={{
            fontSize: "20px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "flex-start",
            borderBottom: "2px solid black",
          }}
        >
          Broker Info
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <span>Broker License Number</span>
          <input
            className="form-control custom-input"
            type="text"
            onInput={(e) => (e.target.value = e.target.value.toUpperCase())}
            defaultValue={licenseNum}
            onChange={(e) => setLicenseNum(e.target.value)}
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <span>Broker License/Certificate</span>
          <input
            className="form-control custom-input"
            type="file"
            id="agentFile"
            {...register("agentFile", { onChange: onChange })}
          />
          {files.length > 0 && (
            <div>
              {files.map((file, index) => (
                <ul style={{ paddingLeft: "0.5rem" }} key={index}>
                  <li style={{ fontSize: "18px", listStyle: "none" }}>
                    {file.name}{" "}
                    <span>
                      <Button
                        onClick={handleDelete(file.url)}
                        style={{
                          background: "transparent",
                          border: "none",
                          color: "red",
                          margin: "0",
                        }}
                      >
                        X
                      </Button>
                    </span>
                  </li>
                </ul>
              ))}
            </div>
          )}
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <span>Broker License State</span>
          <input
            className="form-control custom-input"
            type="text"
            defaultValue={licenseState}
            onChange={(e) => setLicenseState(e.target.value)}
          />
        </Col>
        <Col md={6} xs={12} className="mt-3">
          <span>Broker License Expiry Date</span>
          <div className="d-flex justify-content-between">
            {!changeDate ? (
              <input
                className="form-control custom-input"
                type="text"
                value={new Date(licenseExpireDate)?.toLocaleDateString() || ""}
                disabled
              />
            ) : (
              <input
                className="form-control custom-input"
                type="date"
                onChange={(e) => fixDate(e.target.value)}
              />
            )}
            <Button
              variant="primary"
              onClick={() => setChangeDate(!changeDate)}
              className={`bg-${
                changeDate ? "danger" : "success"
              } border-0 rounded-0 ms-2`}
            >
              {changeDate ? "Cancel" : "Change"}
            </Button>
          </div>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col
          md={12}
          xs={12}
          style={{
            fontSize: "20px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "flex-start",
            borderBottom: "2px solid black",
          }}
        >
          {loader ? <Loading /> : null}
          Profile Picture
        </Col>
        <Col md={12} xs={12} className="mt-3">
          <input
            className="form-control custom-input"
            type="file"
            accept="image/*"
            {...register("images", { onChange: changeProfilePic })}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col
          style={{
            fontSize: "20px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "flex-start",
            borderBottom: "2px solid black",
          }}
        >
          Social Media
        </Col>
      </Row>
      <Row className="mt-2">
        <Col md={4} xs={12}>
          <span>Instagram</span>
          <input
            className="form-control custom-input"
            defaultValue={instagram}
            type="text"
            onChange={(e) => setInstagram(e.target.value)}
          />
        </Col>
        <Col md={4} xs={12}>
          <span>Facebook</span>
          <input
            className="form-control custom-input"
            defaultValue={facebook}
            type="text"
            onChange={(e) => setFacebook(e.target.value)}
          />
        </Col>
        <Col md={4} xs={12}>
          <span>Twitter</span>
          <input
            className="form-control custom-input"
            defaultValue={twitter}
            type="text"
            onChange={(e) => setTwitter(e.target.value)}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Row className="mt-3">
          <Col
            style={{
              fontSize: "20px",
              fontWeight: "700",
              display: "flex",
              justifyContent: "flex-start",
              borderBottom: "2px solid black",
            }}
          >
            Change Password
          </Col>
        </Row>
        <Row className="mt-2">
          <Col md={12} xs={12}>
            <span>Current Password</span>
            <input
              className="form-control custom-input"
              type="password"
              onChange={(e) => setOldPass(e.target.value)}
            />
          </Col>
          <Col md={12} xs={12} className="mt-2">
            <span>New Password</span>
            <input
              className="form-control custom-input"
              type="password"
              onChange={handleCheckStrength}
            />
            <div style={{ width: "150px" }} className="mt-2">
              <ProgressBar
                className="rounded-0"
                style={{ height: "0.3rem", width: "100%" }}
              >
                <ProgressBar
                  animated
                  now={
                    passStrong === "strong"
                      ? 100
                      : passStrong === "medium"
                      ? 50
                      : 30
                  }
                  variant={
                    passStrong === "strong"
                      ? "success"
                      : passStrong === "medium"
                      ? "warning"
                      : "danger"
                  }
                />
              </ProgressBar>
            </div>
          </Col>
          <Col md={12} xs={12} className="mt-2">
            <span>Confirm Password</span>
            <input
              className="form-control custom-input"
              onChange={handleCheckMatch}
              type="password"
              style={{
                border: passMatch
                  ? "1px solid green"
                  : confirmPass
                  ? "1px solid red"
                  : "1px solid #ced4da",
              }}
            />
          </Col>
        </Row>
      </Row>

      <Row className="mt-3">
        <Col
          style={{
            fontSize: "20px",
            fontWeight: "700",
            display: "flex",
            justifyContent: "flex-start",
            borderBottom: "2px solid black",
          }}
        >
          Description
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={description}
            onChange={(e) => setDescription(e)}
          ></ReactQuill>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex w-100">
          <Button onClick={onSubmit} className="w-100 rounded-0" type="submit">
            Change
          </Button>
        </Col>
      </Row>
    </Container>
  );
}

export default EditProfile;
