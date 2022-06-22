import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import authService from "../../services/authServices";
import { IoInformationCircleSharp } from "react-icons/io5";

function YachtDetails({
  property,
  propertyData,
  toggleStep,
  step,
  setStep,
  togglePropertyData,
  toggleSellStep,
  getPropId,
  propId,
  ownership,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
}) {
  const { register, handleSubmit } = useForm();
  const prop = useSelector((state) => state.incompProperty);
  const params = useParams();
  const [vessel_registration_number, setVessel_registration_number] =
    useState();
  const [vessel_manufacturing_date, setVessel_manufacturing_date] = useState();
  const [manufacture_mark, setManufacture_mark] = useState();
  const [manufacturer_name, setManufacturer_name] = useState();
  const [engine_type, setEngine_type] = useState();
  const [engine_deck_type, setEngine_deck_type] = useState();
  const [engine_manufacture_name, setEngine_manufacture_name] = useState();
  const [running_cost, setRunning_cost] = useState();
  const [no_of_crew_required, setNo_of_crew_required] = useState();
  const [property_address, setProperty_address] = useState();
  const [country, setCountry] = useState();
  const [state, setState] = useState();
  const [city, setCity] = useState();
  const [zip, setZip] = useState();
  const [success, setSuccess] = useState(false);
  const [otherDetails, setOtherDetails] = useState("");
  const [reservedAmount, setReservedAmount] = useState();
  const [discussedAmount, setDiscussedAmount] = useState();

  // useEffect(() => {
  //   if (params.id) {
  //     const properti = prop.filter((item) => item._id === params.id);
  //     setVessel_registration_number(
  //       properti[0].details.vessel_registration_number
  //         ? properti[0].details.vessel_registration_number
  //         : propertyData.vessel_registration_number
  //         ? propertyData.vessel_registration_number
  //         : property.vessel_registration_number
  //         ? property.vessel_registration_number
  //         : ""
  //     );
  //     setVessel_manufacturing_date(
  //       properti[0].details.vessel_manufacturing_date
  //         ? properti[0].details.vessel_manufacturing_date
  //         : propertyData.vessel_manufacturing_date
  //         ? propertyData.vessel_manufacturing_date
  //         : property.vessel_manufacturing_date
  //         ? property.vessel_manufacturing_date
  //         : ""
  //     );
  //     setManufacture_mark(
  //       properti[0].details.manufacture_mark
  //         ? properti[0].details.manufacture_mark
  //         : propertyData.manufacture_mark
  //         ? propertyData.manufacture_mark
  //         : property.manufacture_mark
  //         ? property.manufacture_mark
  //         : ""
  //     );
  //     setManufacturer_name(
  //       properti[0].details.manufacturer_name
  //         ? properti[0].details.manufacturer_name
  //         : propertyData.manufacturer_name
  //         ? propertyData.manufacturer_name
  //         : property.manufacturer_name
  //         ? property.manufacturer_name
  //         : ""
  //     );
  //     setEngine_type(
  //       properti[0].details.engine_type
  //         ? properti[0].details.engine_type
  //         : propertyData.engine_type
  //         ? propertyData.engine_type
  //         : property.engine_type
  //         ? property.engine_type
  //         : ""
  //     );
  //     setEngine_deck_type(
  //       properti[0].details.engine_deck_type
  //         ? properti[0].details.engine_deck_type
  //         : propertyData.engine_deck_type
  //         ? propertyData.engine_deck_type
  //         : property.engine_deck_type
  //         ? property.engine_deck_type
  //         : ""
  //     );
  //     setEngine_manufacture_name(
  //       properti[0].details.engine_manufacture_name
  //         ? properti[0].details.engine_manufacture_name
  //         : propertyData.engine_manufacture_name
  //         ? propertyData.engine_manufacture_name
  //         : property.engine_manufacture_name
  //         ? property.engine_manufacture_name
  //         : ""
  //     );
  //     setRunning_cost(
  //       properti[0].details.running_cost
  //         ? properti[0].details.running_cost
  //         : propertyData.running_cost
  //         ? propertyData.running_cost
  //         : property.running_cost
  //         ? property.running_cost
  //         : ""
  //     );
  //     setNo_of_crew_required(
  //       properti[0].details.no_of_crew_required
  //         ? properti[0].details.no_of_crew_required
  //         : propertyData.no_of_crew_required
  //         ? propertyData.no_of_crew_required
  //         : property.no_of_crew_required
  //         ? property.no_of_crew_required
  //         : ""
  //     );
  //     setProperty_address(
  //       properti[0].details.property_address
  //         ? properti[0].details.property_address.formatted_street_address
  //         : propertyData.property_address
  //         ? propertyData.property_address.formatted_street_address
  //         : property.property_address
  //         ? property.property_address.formatted_street_address
  //         : ""
  //     );
  //     setCountry(
  //       properti[0].details.property_address
  //         ? properti[0].details.property_address.country
  //         : propertyData.property_address
  //         ? propertyData.property_address.country
  //         : property.property_address
  //         ? property.property_address.country
  //         : ""
  //     );
  //     setState(
  //       properti[0].details.property_address
  //         ? properti[0].details.property_address.state
  //         : propertyData.property_address
  //         ? propertyData.property_address.state
  //         : property.property_address
  //         ? property.property_address.state
  //         : ""
  //     );
  //     setCity(
  //       properti[0].details.property_address
  //         ? properti[0].details.property_address.city
  //         : propertyData.property_address
  //         ? propertyData.property_address.city
  //         : property.property_address
  //         ? property.property_address.city
  //         : ""
  //     );
  //     setZip(
  //       properti[0].details.property_address
  //         ? properti[0].details.property_address.zip_code
  //         : propertyData.property_address
  //         ? propertyData.property_address.zip_code
  //         : property.property_address
  //         ? property.property_address.zip_code
  //         : ""
  //     );
  //     setOtherDetails(
  //       properti[0].details.otherDetails
  //         ? properti[0].details.otherDetails
  //         : propertyData.otherDetails
  //         ? propertyData.otherDetails
  //         : property.otherDetails
  //         ? property.otherDetails
  //         : ""
  //     );
  //     setReservedAmount(
  //       properti[0].reservedAmount
  //         ? properti[0].reservedAmount
  //         : propertyData.reservedAmount
  //         ? propertyData.reservedAmount
  //         : ""
  //     );
  //     setDiscussedAmount(
  //       properti[0].discussedAmount
  //         ? properti[0].discussedAmount
  //         : propertyData.discussedAmount
  //         ? propertyData.discussedAmount
  //         : ""
  //     );
  //   } else {
  //     setVessel_registration_number(
  //       propertyData.vessel_registration_number
  //         ? propertyData.vessel_registration_number
  //         : property.vessel_registration_number
  //         ? property.vessel_registration_number
  //         : ""
  //     );
  //     setVessel_manufacturing_date(
  //       propertyData.vessel_manufacturing_date
  //         ? propertyData.vessel_manufacturing_date
  //         : property.vessel_manufacturing_date
  //         ? property.vessel_manufacturing_date
  //         : ""
  //     );
  //     setManufacture_mark(
  //       propertyData.manufacture_mark
  //         ? propertyData.manufacture_mark
  //         : property.manufacture_mark
  //         ? property.manufacture_mark
  //         : ""
  //     );
  //     setManufacturer_name(
  //       propertyData.manufacturer_name
  //         ? propertyData.manufacturer_name
  //         : property.manufacturer_name
  //         ? property.manufacturer_name
  //         : ""
  //     );
  //     setEngine_type(
  //       propertyData.engine_type
  //         ? propertyData.engine_type
  //         : property.engine_type
  //         ? property.engine_type
  //         : ""
  //     );
  //     setEngine_deck_type(
  //       propertyData.engine_deck_type
  //         ? propertyData.engine_deck_type
  //         : property.engine_deck_type
  //         ? property.engine_deck_type
  //         : ""
  //     );
  //     setEngine_manufacture_name(
  //       propertyData.engine_manufacture_name
  //         ? propertyData.engine_manufacture_name
  //         : property.engine_manufacture_name
  //         ? property.engine_manufacture_name
  //         : ""
  //     );
  //     setRunning_cost(
  //       propertyData.running_cost
  //         ? propertyData.running_cost
  //         : property.running_cost
  //         ? property.running_cost
  //         : ""
  //     );
  //     setNo_of_crew_required(
  //       propertyData.no_of_crew_required
  //         ? propertyData.no_of_crew_required
  //         : property.no_of_crew_required
  //         ? property.no_of_crew_required
  //         : ""
  //     );
  //     setProperty_address(
  //       propertyData.property_address
  //         ? propertyData.property_address.formatted_street_address
  //         : property.property_address
  //         ? property.property_address.formatted_street_address
  //         : ""
  //     );
  //     setCountry(
  //       propertyData.property_address
  //         ? propertyData.property_address.country
  //         : property.property_address
  //         ? property.property_address.country
  //         : ""
  //     );
  //     setState(
  //       propertyData.property_address
  //         ? propertyData.property_address.state
  //         : property.property_address
  //         ? property.property_address.state
  //         : ""
  //     );
  //     setCity(
  //       propertyData.property_address
  //         ? propertyData.property_address.city
  //         : property.property_address
  //         ? property.property_address.city
  //         : ""
  //     );
  //     setZip(
  //       propertyData.property_address
  //         ? propertyData.property_address.zip_code
  //         : property.property_address
  //         ? property.property_address.zip_code
  //         : ""
  //     );
  //     setOtherDetails(
  //       propertyData.others
  //         ? propertyData.others
  //         : property.detain
  //         ? property.detain
  //         : ""
  //     );
  //     setReservedAmount(
  //       propertyData
  //         ? propertyData.reservedAmount
  //           ? propertyData.reservedAmount
  //           : ""
  //         : ""
  //     );
  //     setDiscussedAmount(
  //       propertyData
  //         ? propertyData.discussedAmount
  //           ? propertyData.discussedAmount
  //           : ""
  //         : ""
  //     );
  //   }
  // }, [params.id, prop]);

  // const saveInfo = () => {
  //   if (propId || params.id) {
  //     if (zip.length === 5) {
  //       if (otherDetails) {
  //         const datas = {
  //           id: propId ? propId : params.id,
  //           details: {
  //             reservedAmount: parseInt(reservedAmount),
  //             discussedAmount: parseInt(discussedAmount),
  //             vessel_registration_number: property.vessel_registration_number
  //               ? property.vessel_registration_number
  //               : vessel_registration_number,
  //             vessel_manufacturing_date: property.vessel_manufacturing_date
  //               ? property.vessel_manufacturing_date
  //               : vessel_manufacturing_date,
  //             manufacture_mark: property.manufacture_mark
  //               ? property.manufacture_mark
  //               : manufacture_mark,
  //             manufacturer_name: property.manufacturer_name
  //               ? property.manufacturer_name
  //               : manufacturer_name,
  //             engine_type: property.engine_type
  //               ? property.engine_type
  //               : engine_type,
  //             engine_manufacture_name: property.engine_manufacture_name
  //               ? property.engine_manufacture_name
  //               : engine_manufacture_name,
  //             engine_deck_type: property.engine_deck_type
  //               ? property.engine_deck_type
  //               : engine_deck_type,
  //             running_cost: property.running_cost
  //               ? property.running_cost
  //               : running_cost,
  //             no_of_crew_required: property.no_of_crew_required
  //               ? property.no_of_crew_required
  //               : no_of_crew_required,
  //             property_address: {
  //               formatted_street_address: property.property_address
  //                 .formatted_street_address
  //                 ? property.property_address.formatted_street_address
  //                 : property_address,
  //               country: property.property_address.country
  //                 ? property.property_address.country
  //                 : country,
  //               state: property.property_address.state
  //                 ? property.property_address.state
  //                 : state,
  //               city: property.property_address.city
  //                 ? property.property_address.city
  //                 : city,
  //               zip_code: property.property_address.zip_code
  //                 ? property.property_address.zip_code
  //                 : zip,
  //             },
  //             others: property.detain ? property.detain : otherDetails,
  //             step: parseInt(2),
  //           },
  //         };
  //         authService.saveInfo(datas).then((res) => {
  //           if (res.data.error) {
  //             alert(res.data.error);
  //           } else {
  //             toggleSellStep(2);
  //             setSuccess(true);
  //           }
  //         });
  //       } else {
  //         const datas = {
  //           id: propId ? propId : params.id,
  //           details: {
  //             reservedAmount: parseInt(reservedAmount),
  //             discussedAmount: parseInt(discussedAmount),
  //             vessel_registration_number: property.vessel_registration_number
  //               ? property.vessel_registration_number
  //               : vessel_registration_number,
  //             vessel_manufacturing_date: property.vessel_manufacturing_date
  //               ? property.vessel_manufacturing_date
  //               : vessel_manufacturing_date,
  //             manufacture_mark: property.manufacture_mark
  //               ? property.manufacture_mark
  //               : manufacture_mark,
  //             manufacturer_name: property.manufacturer_name
  //               ? property.manufacturer_name
  //               : manufacturer_name,
  //             engine_type: property.engine_type
  //               ? property.engine_type
  //               : engine_type,
  //             engine_manufacture_name: property.engine_manufacture_name
  //               ? property.engine_manufacture_name
  //               : engine_manufacture_name,
  //             engine_deck_type: property.engine_deck_type
  //               ? property.engine_deck_type
  //               : engine_deck_type,
  //             running_cost: property.running_cost
  //               ? property.running_cost
  //               : running_cost,
  //             no_of_crew_required: property.no_of_crew_required
  //               ? property.no_of_crew_required
  //               : no_of_crew_required,
  //             property_address: {
  //               formatted_street_address: property.property_address
  //                 ? property.property_address.formatted_street_address
  //                 : property_address,
  //               country: property.property_address
  //                 ? property.property_address.country
  //                 : country,
  //               state: property.property_address
  //                 ? property.property_address.state
  //                 : state,
  //               city: property.property_address
  //                 ? property.property_address.city
  //                 : city,
  //               zip_code: property.property_address
  //                 ? property.property_address.zip_code
  //                 : zip,
  //             },
  //             step: parseInt(2),
  //           },
  //         };
  //         authService.saveInfo(datas).then((res) => {
  //           if (res.data.error) {
  //             alert(res.data.error);
  //           } else {
  //             toggleSellStep(2);
  //             setSuccess(true);
  //           }
  //         });
  //       }
  //     } else {
  //       alert("Please enter valid zip code");
  //     }
  //   } else {
  //     if (zip.length === 5) {
  //       if (otherDetails) {
  //         const datas = {
  //           reservedAmount: parseInt(reservedAmount),
  //           discussedAmount: parseInt(discussedAmount),
  //           vessel_registration_number: property.vessel_registration_number
  //             ? property.vessel_registration_number
  //             : vessel_registration_number,
  //           vessel_manufacturing_date: property.vessel_manufacturing_date
  //             ? property.vessel_manufacturing_date
  //             : vessel_manufacturing_date,
  //           manufacture_mark: property.manufacture_mark
  //             ? property.manufacture_mark
  //             : manufacture_mark,
  //           manufacturer_name: property.manufacturer_name
  //             ? property.manufacturer_name
  //             : manufacturer_name,
  //           engine_type: property.engine_type
  //             ? property.engine_type
  //             : engine_type,
  //           engine_manufacture_name: property.engine_manufacture_name
  //             ? property.engine_manufacture_name
  //             : engine_manufacture_name,
  //           engine_deck_type: property.engine_deck_type
  //             ? property.engine_deck_type
  //             : engine_deck_type,
  //           running_cost: property.running_cost
  //             ? property.running_cost
  //             : running_cost,
  //           no_of_crew_required: property.no_of_crew_required
  //             ? property.no_of_crew_required
  //             : no_of_crew_required,
  //           property_address: {
  //             formatted_street_address: property.property_address
  //               .formatted_street_address
  //               ? property.property_address.formatted_street_address
  //               : property_address,
  //             country: property.property_address.country
  //               ? property.property_address.country
  //               : country,
  //             state: property.property_address.state
  //               ? property.property_address.state
  //               : state,
  //             city: property.property_address.city
  //               ? property.property_address.city
  //               : city,
  //             zip_code: property.property_address.zip_code
  //               ? property.property_address.zip_code
  //               : zip,
  //           },
  //           others: property.detain ? property.detain : otherDetails,
  //           ...ownership,
  //           step: parseInt(2),
  //         };
  //         authService.savePropInfo(datas).then((res) => {
  //           if (res.data.error) {
  //             alert(res.data.error);
  //           } else {
  //             toggleSellStep(2);
  //             getPropId(res.data._id);
  //             setSuccess(true);
  //           }
  //         });
  //       } else {
  //         const datas = {
  //           reservedAmount: parseInt(reservedAmount),
  //           discussedAmount: parseInt(discussedAmount),
  //           vessel_registration_number: property.vessel_registration_number
  //             ? property.vessel_registration_number
  //             : vessel_registration_number,
  //           vessel_manufacturing_date: property.vessel_manufacturing_date
  //             ? property.vessel_manufacturing_date
  //             : vessel_manufacturing_date,
  //           manufacture_mark: property.manufacture_mark
  //             ? property.manufacture_mark
  //             : manufacture_mark,
  //           manufacturer_name: property.manufacturer_name
  //             ? property.manufacturer_name
  //             : manufacturer_name,
  //           engine_type: property.engine_type
  //             ? property.engine_type
  //             : engine_type,
  //           engine_manufacture_name: property.engine_manufacture_name
  //             ? property.engine_manufacture_name
  //             : engine_manufacture_name,
  //           engine_deck_type: property.engine_deck_type
  //             ? property.engine_deck_type
  //             : engine_deck_type,
  //           running_cost: property.running_cost
  //             ? property.running_cost
  //             : running_cost,
  //           no_of_crew_required: property.no_of_crew_required
  //             ? property.no_of_crew_required
  //             : no_of_crew_required,
  //           property_address: {
  //             formatted_street_address: property.property_address
  //               .formatted_street_address
  //               ? property.property_address.formatted_street_address
  //               : property_address,
  //             country: property.property_address.country
  //               ? property.property_address.country
  //               : country,
  //             state: property.property_address.state
  //               ? property.property_address.state
  //               : state,
  //             city: property.property_address.city
  //               ? property.property_address.city
  //               : city,
  //             zip_code: property.property_address.zip_code
  //               ? property.property_address.zip_code
  //               : zip,
  //           },
  //           others: property.detain ? property.detain : otherDetails,
  //           ...ownership,
  //           step: parseInt(2),
  //         };
  //         authService.savePropInfo(datas).then((res) => {
  //           if (res.data.error) {
  //             alert(res.data.error);
  //           } else {
  //             toggleSellStep(2);
  //             getPropId(res.data._id);
  //             setSuccess(true);
  //           }
  //         });
  //       }
  //     } else {
  //       alert("Please enter valid zip code");
  //     }
  //   }
  // };

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
        reservedAmount: data.reservedAmount
          ? parseInt(data.reservedAmount)
          : parseInt(reservedAmount),
        discussedAmount: data.discussedAmount
          ? parseInt(data.discussedAmount)
          : parseInt(discussedAmount),
        vessel_registration_number: data.vessel_registration_number
          ? data.vessel_registration_number
          : vessel_registration_number,
        vessel_manufacturing_date: data.vessel_manufacturing_date
          ? data.vessel_manufacturing_date
          : vessel_manufacturing_date,
        manufacture_mark: data.manufacture_mark
          ? data.manufacture_mark
          : manufacture_mark,
        manufacturer_name: data.manufacturer_name
          ? data.manufacturer_name
          : manufacturer_name,
        engine_type: data.engine_type ? data.engine_type : engine_type,
        engine_manufacture_name: data.engine_manufacture_name
          ? data.engine_manufacture_name
          : engine_manufacture_name,
        engine_deck_type: data.engine_deck_type
          ? data.engine_deck_type
          : engine_deck_type,
        running_cost: data.running_cost ? data.running_cost : running_cost,
        no_of_crew_required: data.no_of_crew_required
          ? data.no_of_crew_required
          : no_of_crew_required,
        property_address: {
          formatted_street_address: data.property_address
            ? data.property_address
            : property_address,
          country: data.country ? data.country : country,
          state: data.state ? data.state : state,
          city: data.city ? data.city : city,
          zip_code: data.zipCode ? data.zipCode : zip,
        },
        step: 2,
      };
      if (otherDetails.length > 0) {
        submitedData.others = otherDetails;
      }
      authService
        .editProperty(propertyTest._id, submitedData)
        .then((res) => {
          if (res.data.error) {
            if (res.data.error === "Invalid Token") {
              alert("Your session ended. Please log in! ");
              toggleSignIn(true);
            } else alert(res.data.error);
          } else {
            setPropertyTest(res.data);
            setStep(step + 1);
          }
        })
        .catch((error) => {
          alert(error);
        });
    }
  };
  return (
    <>
      <h3>Yacht Details</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="list-form">
        <div
          className="dropdown-icon"
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <IoInformationCircleSharp
            style={{ cursor: "pointer" }}
            color="blue"
            size={30}
          />
          <div className="dropdown-info">
            <p>
              We will be using these details to match you with the right buyer.
            </p>
          </div>
        </div>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={vessel_registration_number}
              {...register("vessel_registration_number")}
              onChange={(e) => setVessel_registration_number(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Vessel Registration Number{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <input
              type="date"
              className="form-control"
              defaultValue={vessel_manufacturing_date}
              {...register("vessel_manufacturing_date")}
              onChange={(e) => setVessel_manufacturing_date(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Vessel Manufacturing Date{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property_address}
              {...register("property_address")}
              onChange={(e) => setProperty_address(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Property Address <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={country}
              {...register("country")}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={state}
              {...register("state")}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={city}
              {...register("city")}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              City <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              defaultValue={zip}
              {...register("zipCode")}
              maxLength="5"
              onChange={(e) => setZip(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col xs={12} md={4}>
            <input
              type="text"
              className="form-control"
              defaultValue={manufacture_mark}
              {...register("manufacture_mark")}
              onChange={(e) => setManufacture_mark(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Manufacture Mark <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4}>
            <input
              type="text"
              className="form-control"
              defaultValue={manufacturer_name}
              {...register("manufacturer_name")}
              onChange={(e) => setManufacturer_name(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Manufacturer Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>

          <Col xs={12} md={4}>
            <input
              type="text"
              className="form-control"
              defaultValue={engine_manufacture_name}
              {...register("engine_manufacture_name")}
              onChange={(e) => setEngine_manufacture_name(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Manufacturer Name{" "}
              <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={engine_type}
              {...register("engine_type")}
              onChange={(e) => setEngine_type(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <input
              type="text"
              className="form-control"
              defaultValue={engine_deck_type}
              {...register("engine_deck_type")}
              onChange={(e) => setEngine_deck_type(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Engine Deck Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4}>
            <input
              type="number"
              className="form-control"
              defaultValue={running_cost}
              {...register("running_cost")}
              onChange={(e) => setRunning_cost(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Running Cost <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4}>
            <input
              type="number"
              className="form-control"
              defaultValue={no_of_crew_required}
              {...register("no_of_crew_required")}
              onChange={(e) => setNo_of_crew_required(e.target.value)}
              required
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              No. Crew Required <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "30px", height: "200px" }}>
          <Col>
            <textarea
              className="form-control"
              style={{ height: "100%" }}
              defaultValue={otherDetails}
              placeholder="Other information about the property"
              {...register("detain")}
              onChange={(e) => setOtherDetails(e.target.value)}
            />
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={reservedAmount}
              {...register("reservedAmount")}
              onChange={(e) => setReservedAmount(parseInt(e.target.value))}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Reserved Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6}>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={discussedAmount}
              {...register("discussedAmount")}
              onChange={(e) => setDiscussedAmount(parseInt(e.target.value))}
            />
            <span
              style={{
                fontWeight: "600",
                color: "black",
              }}
            >
              Discussed Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>

        <Row className="mt-5">
          {/* <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center justify-content-md-end mt-2"
          >
            <Button className="save-btn" onClick={saveInfo}>
              Save
            </Button>
          </Col> */}
          <Col className="d-flex justify-content-center mt-2">
            <Button className="pre-btn" onClick={() => toggleStep(step - 2)}>
              Previous
            </Button>
            <Button className="nxt-btn" id="next" type="submit">
              Next
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}

export default YachtDetails;
