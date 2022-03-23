import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import authService from "../../services/authServices";

function EmptyRealEstateDetails({
  property,
  toogleStep,
  step,
  tooglePropertyData,
  propId,
  ownership,
  propertyType,
}) {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [zip, setZip] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [rooms, setRooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [propType, setPropType] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [sqft, setSqft] = useState("");
  const [reservedAmount, setReservedAmount] = useState("");
  const [discussedAmount, setDiscussedAmount] = useState("");

  const saveInfo = () => {
    if (propId) {
      const datas = {
        id: propId,
        details: {
          type: propertyType,
          street_address: address ? address : property.street_address,
          city: city ? city : property.city,
          state: state ? state : property.state,
          country: country ? country : property.country,
          zip_code: zip ? zip : property.zip_code,
          owner_name: ownerName,
          rooms_count: rooms,
          baths_count: bathrooms,
          beds_count: bedrooms,
          standardized_land_use_type: propType,
          total_value: totalValue,
          area_sq_ft: sqft,
          reservedAmount: reservedAmount,
          discussedAmount: discussedAmount,
          step: 2,
        },
      };
      authService.saveInfo(datas).then((res) => {
        console.log(res);
      });
    } else {
      const datas = {
        details: {
          type: propertyType,
          street_address: address ? address : property.street_address,
          city: city ? city : property.city,
          state: state ? state : property.state,
          country: country ? country : property.country,
          zip_code: zip ? zip : property.zip_code,
          owner_name: ownerName,
          rooms_count: rooms,
          baths_count: bathrooms,
          beds_count: bedrooms,
          standardized_land_use_type: propType,
          total_value: totalValue,
          area_sq_ft: sqft,
          reservedAmount: reservedAmount,
          discussedAmount: discussedAmount,
          details: { ...ownership },
          step: 2,
        },
      };
      authService.savePropInfo(datas).then((res) => {
        console.log(res);
      });
    }
  };

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
        type: "real-estate",
        street_address: data.street_address,
        city: data.city,
        state: data.state,
        zipCode: data.zipCode,
        discussedAmount: data.discussedAmount,
        reservedAmount: data.reservedAmount,
        fields: {
          beds_count: data.bedrooms,
          baths: data.bathrooms,
          rooms_count: data.rooms_count,
          total_value: data.total_value,
        },
      };

      tooglePropertyData(submitedData);
      toogleStep(step + 1);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          e.preventDefault();
        }
      }}
      className="list-form"
    >
      <Container>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              name="street_address"
              defaultValue={property.street_address}
              {...register("street_address", { required: false })}
              onChange={(e) => setAddress(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Street Address <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              name="city"
              defaultValue={property.city}
              {...register("city", { required: false })}
              onChange={(e) => setCity(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              City <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              name="state"
              defaultValue={property.state}
              {...register("state", { required: false })}
              onChange={(e) => setState(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              name="country"
              defaultValue={property.country}
              {...register("country", { required: false })}
              onChange={(e) => setCountry(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              name="zipCode"
              defaultValue={property.zip_code}
              {...register("zipCode", { required: false })}
              onChange={(e) => setZip(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("ownerName", { required: false })}
              name="ownerName"
              onChange={(e) => setOwnerName(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Owner Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("rooms_count", { required: false })}
              onChange={(e) => setRooms(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Rooms Count <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("bedrooms", { required: false })}
              onChange={(e) => setBedrooms(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bedrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("propertyType", { required: false })}
              onChange={(e) => setPropType(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Property Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("bathrooms", { required: false })}
              onChange={(e) => setBathrooms(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bathrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="$"
              {...register("total_value", { required: false })}
              onChange={(e) => setTotalValue(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Total Value <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("sqft", { required: false })}
              onChange={(e) => setSqft(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Sqft <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("reservedAmount", { required: false })}
              onChange={(e) => setReservedAmount(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Reserved Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("discussedAmount", { required: false })}
              onChange={(e) => setDiscussedAmount(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Discussed Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px", height: "130px" }}>
          <Col>
            <textarea
              style={{ height: "100%" }}
              className="form-control"
              placeholder="Description"
              {...register("description", { required: false })}
            />
          </Col>
        </Row>
      </Container>
      <div className="bottom-btn" style={{ width: "100%" }}>
        <div
          style={{
            position: "absolute",
            left: "50px",
          }}
        >
          <Button onClick={saveInfo}>Save</Button>
        </div>
        <button className="pre-btn" onClick={() => toogleStep(step - 1)}>
          Previous
        </button>
        <button className="nxt-btn" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}

export default EmptyRealEstateDetails;
