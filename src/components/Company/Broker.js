import React from "react";
import { useForm } from "react-hook-form";
import { Row, Col } from "react-bootstrap";
import authServices from "../../services/authServices";
import CompanyHeader from "./CompanyHeader";
require("react-bootstrap/ModalHeader");

const Broker = ({ RegistermodalClose, ConfirmmodalOpen }) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    authServices.register(data);
    RegistermodalClose();
    ConfirmmodalOpen();
  };
  //const onSubmit = (data) => console.log(data);
  return (
    <>
      <CompanyHeader location="Broker" />
    </>
  );
};

export default Broker;
