import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";

function RealEstateDetails({
  property,
  toggleStep,
  step,
  togglePropertyData,
  propId,
  ownership,
  toggleSellStep,
  getPropId,
  propertyData,
}) {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const params = useParams();

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
          toggleSellStep(2);
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
          toggleSellStep(2);
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
              : property.owner.name
              ? property.owner.name
              : ""
          );
          setRooms(
            properti[0].details.structure
              ? properti[0].details.structure.rooms_count
              : propertyData.rooms_count
              ? propertyData.rooms_count
              : property.structure.rooms_count
              ? property.structure.rooms_count
              : ""
          );
          setBathrooms(
            properti[0].details.structure
              ? properti[0].details.structure.baths
              : propertyData.baths_count
              ? propertyData.baths_count
              : property.structure.baths
              ? property.structure.baths
              : ""
          );
          setBedrooms(
            properti[0].details.structure
              ? properti[0].details.structure.beds_count
              : propertyData.beds_count
              ? propertyData.beds_count
              : property.structure.beds_count
              ? property.structure.beds_count
              : ""
          );
          setPropType(
            properti[0].details.parcel
              ? properti[0].details.parcel.standardized_land_use_type
              : propertyData.standardized_land_use_type
              ? propertyData.standardized_land_use_type
              : property.parcel.standardized_land_use_type
              ? property.parcel.standardized_land_use_type
              : ""
          );
          setSqft(
            properti[0].details.parcel
              ? properti[0].details.parcel.area_sq_ft
              : propertyData.area_sq_ft
              ? propertyData.area_sq_ft
              : property.structure.total_area_sq_ft
              ? property.structure.total_area_sq_ft
              : ""
          );
          setTotalValue(
            properti[0].details.market_assessments
              ? properti[0].details.market_assessments[0].total_value
              : propertyData.total_value
              ? propertyData.total_value
              : property.market_assessments.length > 0
              ? property.market_assessments[0].total_value
              : property.assessments.length > 0
              ? property.assessments[0].total_value
              : ""
          );
          setReservedAmount(
            properti[0].reservedAmount
              ? properti[0].reservedAmount
              : propertyData.reservedAmount
              ? propertyData.reservedAmount
              : ""
          );
          setDiscussedAmount(
            properti[0].discussedAmount
              ? properti[0].discussedAmount
              : propertyData.discussedAmount
              ? propertyData.discussedAmount
              : ""
          );
          setAddress(
            properti[0].details.property_address
              ? properti[0].details.property_address.formatted_street_address
              : propertyData.street_address
              ? propertyData.street_address
              : property.address.formatted_street_address
              ? property.address.formatted_street_address
              : ""
          );
          setCity(
            properti[0].details.property_address
              ? properti[0].details.property_address.city
              : propertyData.city
              ? propertyData.city
              : property.address.city
              ? property.address.city
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
              : property.address.country
              ? property.address.country
              : property.country
              ? property.country
              : "USA"
          );
          setZip(
            properti[0].details.property_address
              ? properti[0].details.property_address.zip_code
              : propertyData.zip_code
              ? propertyData.zip_code
              : property.address.zip_code
              ? property.address.zip_code
              : ""
          );
        }
      });
    } else {
      setAddress(
        propertyData.street_address
          ? propertyData.street_address
          : property.address.formatted_street_address
      );
      setCity(propertyData.city ? propertyData.city : property.address.city);
      setState(
        propertyData.state ? propertyData.state : property.address.state
      );
      setCountry(
        propertyData.country
          ? propertyData.country
          : property.address.country
          ? property.address.country
          : "USA"
      );
      setZip(
        propertyData.zip_code
          ? propertyData.zip_code
          : property.address.zip_code
      );
      setOwnerName(
        propertyData.owner_name
          ? propertyData.owner_name
          : property.owner.name
          ? property.owner.name
          : ""
      );
      setRooms(
        propertyData.rooms_count
          ? propertyData.rooms_count
          : property.structure.rooms_count
          ? property.structure.rooms_count
          : ""
      );
      setBathrooms(
        propertyData.baths_count
          ? propertyData.baths_count
          : property.structure.baths
          ? property.structure.baths
          : ""
      );
      setBedrooms(
        propertyData.beds_count
          ? propertyData.beds_count
          : property.structure.beds_count
          ? property.structure.beds_count
          : ""
      );
      setPropType(
        propertyData.standardized_land_use_type
          ? propertyData.standardized_land_use_type
          : property.parcel.standardized_land_use_type
          ? property.parcel.standardized_land_use_type
          : ""
      );
      setSqft(
        propertyData.area_sq_ft
          ? propertyData.area_sq_ft
          : property.structure.total_area_sq_ft
          ? property.structure.total_area_sq_ft
          : ""
      );
      setTotalValue(
        propertyData.total_value
          ? propertyData.total_value
          : property.market_assessments.length > 0
          ? property.market_assessments[0].total_value
          : property.assessments.length > 0
          ? property.assessments[0].total_value
          : ""
      );
      setReservedAmount(
        propertyData.reservedAmount ? parseInt(propertyData.reservedAmount) : ""
      );
      setDiscussedAmount(
        propertyData.discussedAmount
          ? parseInt(propertyData.discussedAmount)
          : ""
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
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
      };
      togglePropertyData(submitedData);
      toggleStep(step + 1);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="list-form">
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              name="street_address"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={address}
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
              defaultValue={city}
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
              defaultValue={country}
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
              min="0"
              className="form-control"
              name="zipCode"
              style={{ color: "black", fontWeight: "bold" }}
              defaultValue={zip}
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
              defaultValue={ownerName}
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
              defaultValue={rooms}
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
              defaultValue={bedrooms}
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
              defaultValue={propType}
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
              defaultValue={bathrooms}
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
              defaultValue={totalValue}
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
              defaultValue={sqft}
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
              min="0"
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
              min="0"
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
      <Row className="mt-5">
        <Col
          xs={12}
          md={4}
          className="d-flex justify-content-sm-center justify-content-md-end mt-2"
        >
          <Button className="save-btn" onClick={saveInfo}>
            Save
          </Button>
        </Col>
        <Col xs={12} md={8} className="d-flex mt-2">
          <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
            Previous
          </Button>
          <Button className="nxt-btn" id="next" type="submit">
            Next
          </Button>
        </Col>
      </Row>
    </form>
  );
}

export default RealEstateDetails;
