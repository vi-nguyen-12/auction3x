import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";

function EmptyRealEstateDetails({
  property,
  propertyData,
  toggleStep,
  step,
  togglePropertyData,
  propId,
  ownership,
  toggleSellStep,
  getPropId,
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
    <>
      <h3>Property Details</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              name="street_address"
              defaultValue={address}
              {...register("street_address", { required: false })}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Street Address <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="text"
              className="form-control"
              name="city"
              defaultValue={city}
              {...register("city", { required: false })}
              onChange={(e) => setCity(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              City <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              name="state"
              defaultValue={state}
              {...register("state", { required: false })}
              onChange={(e) => setState(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              State <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="text"
              className="form-control"
              name="country"
              defaultValue={country}
              {...register("country", { required: false })}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              min="0"
              className="form-control"
              name="zipCode"
              defaultValue={zip}
              {...register("zipCode", { required: false })}
              onChange={(e) => setZip(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Zip Code <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              defaultValue={ownerName}
              {...register("ownerName", { required: false })}
              name="ownerName"
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Owner Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={rooms}
              {...register("rooms_count", { required: false })}
              onChange={(e) => setRooms(e.target.value)}
              name="rooms"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Rooms Count <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={bedrooms}
              {...register("bedrooms", { required: false })}
              onChange={(e) => setBedrooms(e.target.value)}
              name="bedrooms"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bedrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <input
              type="text"
              className="form-control"
              defaultValue={propType}
              {...register("propertyType", { required: false })}
              onChange={(e) => setPropType(e.target.value)}
              name="propertyType"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Property Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={bathrooms}
              {...register("bathrooms", { required: false })}
              onChange={(e) => setBathrooms(e.target.value)}
              name="bathrooms"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bathrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              min="0"
              className="form-control"
              placeholder="$"
              defaultValue={totalValue}
              {...register("total_value", { required: false })}
              onChange={(e) => setTotalValue(e.target.value)}
              name="total_value"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Total Value <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={sqft}
              {...register("sqft", { required: false })}
              onChange={(e) => setSqft(e.target.value)}
              name="sqft"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Sqft <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={reservedAmount}
              {...register("reservedAmount", { required: false })}
              onChange={(e) => setReservedAmount(parseInt(e.target.value))}
              name="reservedAmount"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Reserved Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={discussedAmount}
              {...register("discussedAmount", { required: false })}
              onChange={(e) => setDiscussedAmount(parseInt(e.target.value))}
              name="discussedAmount"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Discussed Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col
            xs={12}
            md={4}
            className="d-flex justify-content-center justify-content-md-end mt-2"
          >
            <Button className="save-btn" onClick={saveInfo}>
              Save
            </Button>
          </Col>
          <Col
            xs={12}
            md={8}
            className="d-flex justify-content-center justify-content-md-start mt-2"
          >
            <Button className="pre-btn" onClick={() => toggleStep(step - 1)}>
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

export default EmptyRealEstateDetails;
