import React from "react";
import {Form} from 'react-bootstrap';
import {useState} from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import Buyer from "./Buyer";
import Seller from "./Seller";
import Broker from "./Broker";
import { FaCreativeCommonsPd } from "react-icons/fa";
require("react-bootstrap/ModalHeader");

export default function Register(props) {
  const [formType, setFormType] = useState("buyer");
  console.log(Buyer);
  const onSubmit = (data) => console.log(data);

  return (
    <Form>
      <div className = "mb-2" style = {{display: "flex"}}> Register as:
      <div style = {{paddingLeft: "20px", fontWeight: "bold"}}>
      <input
      style = {{type: "radio", backgroundColor:"#D58F5C"}}
        onClick={() => {
          setFormType("buyer");
        }}
        checked={formType === "buyer"}
        type="radio"
      />
      <label htmlFor="buyer"> Buyer</label>
      </div>
      <div style = {{paddingLeft: "20px", fontWeight: "bold"}}>
      <input
        onClick={() => {
          setFormType("seller");
        }}
        checked={formType === "seller"}
        type="radio"
      />
      <label htmlFor="seller"> Seller</label>
      </div>
      <div style = {{paddingLeft: "20px", fontWeight: "bold"}}>
      <input
      style = {{color: "#D58F5C"}}
        onClick={() => {
          setFormType("broker");
        }}
        checked={formType === "broker"}
        type="radio"
      />
      <label htmlFor="broker"> Broker</label>
      </div>
      </div>
      {formType === "buyer" && <Buyer />}
      {formType === "seller" && <Seller />}
      {formType === "broker" && <Broker/>}
      <button type="submit" className="btn btn-primary"/>
    </Form>
  );
}









// const BuyerForm = (props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = (data) => {
//     axios.post("http://localhost:5000/api/user/register", data)
//   };
 
//   return (
//     <div className="register">
//       <div className="register__container">
//         <div className="block" />
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="First Name"
//               {...register("firstName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Last Name"
//               {...register("lastName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Email"
//               {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//               {...register("password", {
//                 required: true,
//                 minLength: 6,
//                 maxLength: 12,
//               })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Confirm Password"
//             />
//           </div>

//           <div className="form-group mb-2">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Phone Number"
//               {...register("phone", {
//                 required: true,
//                 minLength: 6,
//                 maxLength: 12,
//               })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Bidder Name"
//               {...register("bidderName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Country"
//               {...register("country", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-5">
//             <input
//               type="text"
//               className="form-control color-black"
//               placeholder="City"
//               {...register("city", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <button
//             type="submit"
//             className="registerBtn"
//             style={{
//               width: "100%",
//               color: "white",
//               fontWeight: "bold",
//               fontSize: "15px",
//             }}
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// const SellerForm = (props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = (data) => {
//     axios.post("http://localhost:5000/api/user/register", data)
//   };
 
//   return (
//     <div className="register">
//       <div className="register__container">
//         <div className="block" />
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="First Name"
//               {...register("firstName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Last Name"
//               {...register("lastName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Email"
//               {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//               {...register("password", {
//                 required: true,
//                 minLength: 6,
//                 maxLength: 12,
//               })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Confirm Password"
//             />
//           </div>

//           <div className="form-group mb-2">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Phone Number"
//               {...register("phone", {
//                 required: true,
//                 minLength: 6,
//                 maxLength: 12,
//               })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Bidder Name"
//               {...register("bidderName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Country"
//               {...register("country", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-5">
//             <input
//               type="text"
//               className="form-control color-black"
//               placeholder="City"
//               {...register("city", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <button
//             type="submit"
//             className="registerBtn"
//             style={{
//               width: "100%",
//               color: "white",
//               fontWeight: "bold",
//               fontSize: "15px",
//             }}
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// const BrokerForm = (props) => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();
//   const onSubmit = (data) => {
//     axios.post("http://localhost:5000/api/user/register", data)
//   };
//   console.log(errors);
//   return (
//     <div className="register">
//       <div className="register__container">
//         <div className="block" />
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="First Name"
//               {...register("firstName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Last Name"
//               {...register("lastName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="email"
//               className="form-control"
//               placeholder="Email"
//               {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Password"
//               {...register("password", {
//                 required: true,
//                 minLength: 6,
//                 maxLength: 12,
//               })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="password"
//               className="form-control"
//               placeholder="Confirm Password"
//             />
//           </div>

//           <div className="form-group mb-2">
//             <input
//               type="number"
//               className="form-control"
//               placeholder="Phone Number"
//               {...register("phone", {
//                 required: true,
//                 minLength: 6,
//                 maxLength: 12,
//               })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Bidder Name"
//               {...register("bidderName", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-2">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Country"
//               {...register("country", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <div className="form-group mb-5">
//             <input
//               type="text"
//               className="form-control color-black"
//               placeholder="City"
//               {...register("city", { required: true, maxLength: 20 })}
//             />
//           </div>
//           <button
//             type="submit"
//             className="registerBtn"
//             style={{
//               width: "100%",
//               color: "white",
//               fontWeight: "bold",
//               fontSize: "15px",
//             }}
//           >
//             Register
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function Register() {

//   const { register, handleSubmit } = useForm();
//   const [formType, setFormType] = useState("buyer");
//   const onSubmit = (data) => console.log(data);

//   return (
//     <Form>
//       <p>Are you a new user?</p>
//       <label htmlFor="buyer"> buyer?</label>
//       <input
//         onClick={() => {
//           setFormType("buyer");
//         }}
//         checked={formType === "buyer"}
//         type="radio"
//       />
//       <label htmlFor="seller"> seller?</label>
//       <input
//         onClick={() => {
//           setFormType("seller");
//         }}
//         checked={formType === "seller"}
//         type="radio"
//       />
//       <label htmlFor="broker"> broker?</label>
//       <input
//         onClick={() => {
//           setFormType("broker");
//         }}
//         checked={formType === "broker"}
//         type="radio"
//       />
//       <input type="submit" />

//       {formType === "seller" && <SellerForm />}
//       {formType === "buyer" && <BuyerForm />}
//       {formType === "broker" && <BrokerForm />}
//     </Form>
//   );
// }