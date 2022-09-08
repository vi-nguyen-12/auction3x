import React, { useState, useEffect } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import authService from "../../../services/authServices";
import { useSelector } from "react-redux";
import ReactQuill from "react-quill";
import Loading from "../../Loading";
import { useForm } from "react-hook-form";
import { MdClose } from "react-icons/md";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import { MdAttachFile as GrAttachment } from "react-icons/md";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    ["bold", "italic", "underline"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ align: [] }],
    [{ color: [] }, { background: [] }],
    ["link", "blockquote"],
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
  "link",
];

function Messaging({ windowSize }) {
  const { register, handleSubmit } = useForm();
  const [subject, setSubject] = useState();
  const [message, setMessage] = useState();
  const [document, setDocument] = useState([]);
  const [loader, setLoader] = useState(false);
  const user = useSelector((state) => state.user);

  const handleOnChangeText = (value) => {
    setMessage(value);
  };

  const onChange1 = async (e) => {
    setLoader(true);
    const formData1 = new FormData();

    for (let i = 0; i < e.target.files.length; i++) {
      formData1.append("documents", e.target.files[i]);
    }
    await authService.saveDocuments(formData1).then((response) => {
      if (response.status === 200) {
        setDocument([...document, ...response.data]);
        setLoader(false);
      }
    });
    e.target.value = null;
  };

  const handleDelete = (url) => () => {
    setDocument(document.filter((document) => document.url !== url));
  };

  const send = async () => {
    const datas = {
      type: "from_user",
      userId: user._id,
      subject: subject,
      content: message,
    };

    await authService.sendEmails(datas).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
      } else {
        alert(res.data.message);
      }
    });
  };

  return (
    <>
      {loader && <Loading />}
      {/* <h1 style={{ margin: "50px" }}>Messaging</h1> */}
      <Container
        className="chatContainer p-5"
        style={{ width: windowSize < 600 ? "100%" : "50%", marginTop: "8%" }}
      >
        <Row className="d-flex justify-content-center mt-3">
          <Col>
            <span>Subject: </span>
            <input
              type="text"
              className="form-control mt-2"
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-3">
          <Col>
            <span>Message: </span>
            <ReactQuill
              theme="snow"
              className="mt-2"
              modules={modules}
              formats={formats}
              value={message}
              onChange={handleOnChangeText}
            ></ReactQuill>
          </Col>
        </Row>
        <Row className="d-flex justify-content-center mt-5">
          <Col className="d-flex justify-content-end align-items-center">
            <div>
              <input
                type="file"
                name="form"
                id="doc"
                className="form-control"
                {...register("document", { onChange: onChange1 })}
                hidden
                required
              />
              <div>
                <label htmlFor="doc" style={{ cursor: "pointer" }}>
                  <GrAttachment size={25} color="rgb(96 95 95)" />
                </label>
              </div>
              <div className="upload-list" style={{ width: "100%" }}>
                {document.map((document, index) => (
                  <div key={index}>
                    <span>
                      {document.name}
                      <Button
                        className="bg-transparent"
                        style={{ border: "none" }}
                        onClick={handleDelete(document.url)}
                      >
                        <MdClose fontSize="1.5em" color="red" />
                      </Button>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Col>
          <Col
            md={2}
            xs={12}
            className="d-flex justify-content-start align-items-start"
          >
            <Button className="btn btn-primary" onClick={() => send()}>
              Send
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Messaging;
