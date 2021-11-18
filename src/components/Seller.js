import React from "react";
import {Form} from 'react-bootstrap';
import {useState} from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import Buyer from "./Buyer";
require("react-bootstrap/ModalHeader");

export default function Seller(props){
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
      props.onSubmit(data);
    };
    //const onSubmit = (data) => console.log(data);
    return (
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="First Name"
                {...register("firstName", { required: true, maxLength: 20 })}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Last Name"
                {...register("lastName", { required: true, maxLength: 20 })}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="password"
                className="form-control"
                placeholder="Confirm Password"
              />
            </div>
  
            <div className="form-group mb-2">
              <input
                type="number"
                className="form-control"
                placeholder="Phone Number"
                {...register("phone", {
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </div>
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Extra Option"
                {...register("extraOption", { required: true, maxLength: 20 })}
              />
            </div>
  
            <div className="form-group mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                {...register("country", { required: true, maxLength: 20 })}
              />
            </div>
            <div className="form-group mb-5">
              <input
                type="text"
                className="form-control color-black"
                placeholder="City"
                {...register("city", { required: true, maxLength: 20 })}
              />
            </div>
            <button
              type="submit"
              className="registerBtn"
              style={{
                width: "100%",
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Register
            </button>
          </form>
    );
  };