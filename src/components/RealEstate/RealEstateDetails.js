import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";

function RealEstateDetails({
  property,
  toogleStep,
  step,
  tooglePropertyData,
  propId,
  ownership,
  toogleSellStep,
  getPropId,
  propertyData,
}) {
  const { register, handleSubmit } = useForm();

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

  const params = useParams();

  const saveInfo = () => {
    if (propId || params.id) {
      const datas = {
        id: propId ? propId : params.id,
        details: {
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
          reservedAmount: parseInt(reservedAmount),
          discussedAmount: parseInt(discussedAmount),
          step: parseInt(2),
        },
      };
      authService.putRealEstateInfo(datas).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          toogleSellStep(2);
          alert("Saved Successfully!");
        }
      });
    } else {
      const datas = {
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
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
        ...ownership,
        step: parseInt(2),
      };
      delete datas.documents;
      authService.postRealEstateInfo(datas).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          toogleSellStep(2);
          getPropId(res.data._id);
          alert("Saved Successfully!");
        }
      });
    }
  };

  useEffect(() => {
    if (params.id) {
      authService.getIncompleteProperty(params.userId).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          const properti = res.data.filter((prop) => prop._id === params.id);
          setOwnerName(
            properti[0].details.owner
              ? properti[0].details.owner.name
              : propertyData.owner_name
              ? propertyData.owner_name
              : property.owner_name
              ? property.owner_name
              : ""
          );
          setRooms(
            properti[0].details.structure
              ? properti[0].details.structure.rooms_count
              : propertyData.rooms_count
              ? propertyData.rooms_count
              : property.rooms_count
              ? property.rooms_count
              : ""
          );
          setBathrooms(
            properti[0].details.structure
              ? properti[0].details.structure.baths
              : propertyData.baths_count
              ? propertyData.baths_count
              : property.baths_count
              ? property.baths_count
              : ""
          );
          setBedrooms(
            properti[0].details.structure
              ? properti[0].details.structure.beds_count
              : propertyData.beds_count
              ? propertyData.beds_count
              : property.beds_count
              ? property.beds_count
              : ""
          );
          setPropType(
            properti[0].details.parcel
              ? properti[0].details.parcel.standardized_land_use_type
              : propertyData.standardized_land_use_type
              ? propertyData.standardized_land_use_type
              : property.standardized_land_use_type
              ? property.standardized_land_use_type
              : ""
          );
          setSqft(
            properti[0].details.parcel
              ? properti[0].details.parcel.area_sq_ft
              : propertyData.area_sq_ft
              ? propertyData.area_sq_ft
              : property.area_sq_ft
              ? property.area_sq_ft
              : ""
          );
          setTotalValue(
            properti[0].details.market_assessments
              ? properti[0].details.market_assessments[0].total_value
              : propertyData.total_value
              ? propertyData.total_value
              : property.total_value
              ? property.total_value
              : ""
          );
          setReservedAmount(
            properti[0].reservedAmount
              ? properti[0].reservedAmount
              : propertyData.reservedAmount
              ? propertyData.reservedAmount
              : 0
          );
          setDiscussedAmount(
            properti[0].discussedAmount
              ? properti[0].discussedAmount
              : propertyData.discussedAmount
              ? propertyData.discussedAmount
              : 0
          );
          setAddress(
            properti[0].details.property_address
              ? properti[0].details.property_address.formatted_street_address
              : propertyData.street_address
              ? propertyData.street_address
              : property.street_address
              ? property.street_address
              : ""
          );
          setCity(
            properti[0].details.property_address
              ? properti[0].details.property_address.city
              : propertyData.city
              ? propertyData.city
              : property.city
              ? property.city
              : ""
          );
          setState(
            properti[0].details.property_address
              ? properti[0].details.property_address.state
              : propertyData.state
              ? propertyData.state
              : property.state
              ? property.state
              : ""
          );
          setCountry(
            properti[0].details.property_address
              ? properti[0].details.property_address.country
              : propertyData.country
              ? propertyData.country
              : property.country
              ? property.country
              : ""
          );
          setZip(
            properti[0].details.property_address
              ? properti[0].details.property_address.zip_code
              : propertyData.zip_code
              ? propertyData.zip_code
              : property.zip_code
              ? property.zip_code
              : ""
          );
        }
      });
    } else {
      setAddress(
        propertyData.street_address
          ? propertyData.street_address
          : property.street_address
      );
      setCity(propertyData.city ? propertyData.city : property.city);
      setState(propertyData.state ? propertyData.state : property.state);
      setCountry(
        propertyData.country ? propertyData.country : property.country
      );
      setZip(propertyData.zip_code ? propertyData.zip_code : property.zip_code);
      setOwnerName(
        propertyData.owner_name
          ? propertyData.owner_name
          : property
          ? property.owner_name
          : ""
      );
      setRooms(
        propertyData.rooms_count
          ? propertyData.rooms_count
          : property
          ? property.rooms_count
          : ""
      );
      setBathrooms(
        propertyData.baths_count
          ? propertyData.baths_count
          : property
          ? property.baths_count
          : ""
      );
      setBedrooms(
        propertyData.beds_count
          ? propertyData.beds_count
          : property
          ? property.beds_count
          : ""
      );
      setPropType(
        propertyData.standardized_land_use_type
          ? propertyData.standardized_land_use_type
          : property
          ? property.standardized_land_use_type
          : ""
      );
      setSqft(
        propertyData.area_sq_ft
          ? propertyData.area_sq_ft
          : property
          ? property.area_sq_ft
          : ""
      );
      setTotalValue(
        propertyData.total_value
          ? propertyData.total_value
          : property
          ? property.total_value
          : ""
      );
      setReservedAmount(
        propertyData.reservedAmount ? propertyData.reservedAmount : 0
      );
      setDiscussedAmount(
        propertyData.discussedAmount ? propertyData.discussedAmount : 0
      );
    }
  }, []);

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
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
      className="list-form1"
    >
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              name="street_address"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={
                property.address.formatted_street_address
                  ? property.address.formatted_street_address
                  : ""
              }
              onChange={(e) => {
                setAddress(e.target.value);
              }}
              {...register("street_address", { required: false })}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Street Address *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              name="city"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={property.address.city ? property.address.city : ""}
              onChange={(e) => {
                setCity(e.target.value);
              }}
              {...register("city", { required: false })}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>City *</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              name="state"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={
                property.address.state ? property.address.state : ""
              }
              onChange={(e) => {
                setState(e.target.value);
              }}
              {...register("state", { required: false })}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>State *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              name="country"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={
                property.address.country ? property.address.country : ""
              }
              onChange={(e) => {
                setCountry(e.target.value);
              }}
              {...register("country", { required: false })}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>Country *</span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              name="zipCode"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={property.address.zip_code}
              {...register("zipCode", { required: false })}
              onChange={(e) => {
                setZip(e.target.value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={property.owner.name}
              {...register("ownerName", { required: false })}
              onChange={(e) => {
                setOwnerName(e.target.value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Owner Name *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={property.structure.rooms_count}
              {...register("rooms_count", { required: false })}
              onChange={(e) => {
                setRooms(e.target.value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Rooms Count *
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={property.structure.beds_count}
              {...register("bedrooms", { required: false })}
              onChange={(e) => {
                setBedrooms(e.target.value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bedrooms *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={property.parcel.standardized_land_use_type}
              {...register("propertyType", { required: false })}
              onChange={(e) => {
                setPropType(e.target.value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Property Type *
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={property.structure.baths}
              style={{ color: "black", fontWeight: "bold" }}
              {...register("bathrooms", { required: false })}
              onChange={(e) => {
                setBathrooms(e.target.value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bathrooms *
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={
                property.market_assessments.length > 0
                  ? property.market_assessments[0].total_value
                  : property.assessments.length > 0
                  ? property.assessments[0].total_value
                  : ""
              }
              placeholder="$"
              {...register("total_value", { required: false })}
              onChange={(e) => {
                setTotalValue(e.target.value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Total Value *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={
                property.structure.total_area_sq_ft
                  ? property.structure.total_area_sq_ft
                  : ""
              }
              {...register("sqft", { required: false })}
              onChange={(e) => {
                setSqft(e.target.value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>Sqft *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="number"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={reservedAmount}
              {...register("reservedAmount", { required: false })}
              onChange={(e) => {
                setReservedAmount(parseInt(e.target.value));
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Reserved Amount *
            </span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={discussedAmount}
              {...register("discussedAmount", { required: false })}
              onChange={(e) => {
                setDiscussedAmount(parseInt(e.target.value));
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Discussed Amount *
            </span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px", height: "130px" }}>
          <Col>
            <textarea
              style={{ height: "100%", color: "black" }}
              className="form-control"
              placeholder="Description"
              {...register("description", { required: false })}
            />
          </Col>
        </Row>
      </Container>
      <div className="bottom-btn">
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

export default RealEstateDetails;
