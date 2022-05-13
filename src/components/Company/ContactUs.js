import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CompanyHeader from "./CompanyHeader";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

function ContactUs() {
  const location = useLocation();
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      location: "",
      email: "",
      phone: "",
      message: "",
    },
  });
  const onSubmit = (data) => {
    console.log(data);
    alert(
      "Your message has been sent successfully. We will get back to you soon."
    );
    reset();
  };

  const data = [
    {
      title: "First Name",
      name: "firstName",
      placeholder: "Enter First Name",
    },
    {
      title: "Last Name",
      name: "lastName",
      placeholder: "Enter Last Name",
    },
    {
      title: "Location",
      name: "location",
      placeholder: "Enter Location",
    },
    { title: "Email", name: "email", placeholder: "Enter Email" },
    { title: "Phone No", name: "phone", placeholder: "Enter Phone No." },
    { title: "Message", name: "message", placeholder: "Message" },
  ];
  return (
    <>
      <CompanyHeader location={location.pathname.split("/")[1]} />
      <Container style={{ padding: "50px 0" }}>
        <Row>
          <Col md={4}>
            <h1
              style={{
                justifyContent: "start",
                marginLeft: "0",
                fontSize: "30px",
                marginBottom: "20px",
              }}
            >
              USA Office
            </h1>
            <p style={{ justifyContent: "start" }}>2150 Town Square Place</p>
            <p style={{ justifyContent: "start" }}>Suite 200 </p>
            <p style={{ justifyContent: "start" }}>Sugar Land, Texas</p>
            <p style={{ justifyContent: "start" }}>77479 USA</p>
            <p style={{ justifyContent: "start" }}>auction3x@gmail.com</p>
            <p style={{ justifyContent: "start" }}>www.auction3x.com</p>
          </Col>
          <Col md={8}>
            <form onSubmit={handleSubmit(onSubmit)}>
              {data.map((item) => (
                <>
                  <Col md={10} style={{ marginTop: "30px" }}>
                    {" "}
                    {item.title} <span style={{ color: "red" }}>*</span>
                  </Col>
                  <Col md={10} style={{ marginTop: "10px" }}>
                    <input
                      type={
                        item.name === "email"
                          ? "email"
                          : item.name === "phone"
                          ? "number"
                          : "text"
                      }
                      className="form-control"
                      style={{ color: "black", fontWeight: "bold" }}
                      placeholder={item.placeholder}
                      {...register(`${item.name}`, {
                        required: `Please enter your ${item.title}`,
                      })}
                    />

                    <ErrorMessage
                      errors={errors}
                      name={item.name}
                      render={({ message }) => (
                        <p style={{ color: "red", justifyContent: "start" }}>
                          {message}
                        </p>
                      )}
                    />
                  </Col>
                </>
              ))}

              <input
                type="submit"
                style={{
                  marginTop: "30px",
                  background: "#d58f5c",
                  border: "none",
                  padding: "5px",
                  borderRadius: "5px",
                }}
              />
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default ContactUs;
