import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";
import { IoInformationCircleSharp } from "react-icons/io5";
import NumberFormat from "react-number-format";

function RealEstateDetails({
  property,
  step,
  setStep,
  togglePropertyData,
  propId,
  ownership,
  toggleSellStep,
  getPropId,
  propertyData,
  property_address,
  propertyTest,
  setPropertyTest,
  toggleSignIn,
}) {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

  const params = useParams();
  console.log(property_address);

  const [address, setAddress] = useState(
    propertyTest.details?.property_address?.formatted_street_address ||
      property_address.address
  );
  const [city, setCity] = useState(
    propertyTest.details?.property_address?.city || property_address.city
  );
  const [state, setState] = useState(
    propertyTest.details?.property_address?.formatted_street_address?.state ||
      property_address.state
  );
  const [country, setCountry] = useState(
    propertyTest.details?.property_address?.formatted_street_address?.country ||
      property_address.country
  );
  const [zip, setZip] = useState(
    propertyTest.details?.property_address?.formatted_street_address
      ?.zip_code || property_address.zip
  );
  const [ownerName, setOwnerName] = useState(
    propertyTest.details?.owner?.name || ""
  );
  const [bathrooms, setBathrooms] = useState(
    propertyTest.details?.structure?.baths_count || ""
  );
  const [bedrooms, setBedrooms] = useState(
    propertyTest.details?.structure?.beds_count || ""
  );
  const [propType, setPropType] = useState(
    propertyTest.details?.real_estate_type || ""
  );
  const [totalValue, setTotalValue] = useState(
    propertyTest.details?.market_assessments?.slice(-1)[0]["total_value"] || ""
  );
  const [year, setYear] = useState(propertyTest.details?.year_built || "");
  const [lotSize, setLotSize] = useState(
    propertyTest.details?.parcel?.lot_size || ""
  );
  const [garage, setGarage] = useState(
    propertyTest.details?.type_of_garage || ""
  );
  const [story, setStory] = useState(
    propertyTest.details?.number_of_stories || ""
  );

  const [sqft, setSqft] = useState(
    propertyTest.details?.parcel?.area_sq_ft || ""
  );
  const [reservedAmount, setReservedAmount] = useState(
    propertyTest.reservedAmount || ""
  );
  const [discussedAmount, setDiscussedAmount] = useState(
    propertyTest.discussedAmount || ""
  );

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
        street_address: address,
        city: city,
        state: state,
        country: country,
        zip_code: zip,
        real_estate_type: propType,
        year_built: year,
        owner_name: ownerName,
        baths_count: bathrooms,
        beds_count: bedrooms,
        standardized_land_use_type: propType,
        total_value: totalValue,
        area_sq_ft: sqft,
        lot_size: lotSize,
        type_of_garage: garage,
        number_of_stories: story,
        reservedAmount: parseInt(reservedAmount),
        discussedAmount: parseInt(discussedAmount),
        step: 2,
      };
      authService
        .editRealEstate(propertyTest._id, submitedData)
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
        .catch((error) => alert(error));
    }
  };
  return (
    <div className="sell-bottom">
      <h3>Property Details</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="list-form">
        <div
          style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}
        >
          <div
            className="dropdown-icon"
            style={{
              width: "fit-content",
            }}
          >
            <IoInformationCircleSharp
              style={{ cursor: "pointer" }}
              color="blue"
              size={30}
            />
            <div className="dropdown-info">
              <p>
                We will be using these details to match you with the right
                buyer.
              </p>
            </div>
          </div>
        </div>
        <Row className="mt-3">
          <Col>
            <input
              type="text"
              className="form-control"
              name="street_address"
              defaultValue={address}
              {...register("street_address")}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Address <span style={{ color: "#ff0000" }}>*</span>
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
              {...register("city")}
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
              {...register("state")}
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
              {...register("country")}
              onChange={(e) => setCountry(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Country <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <input
              type="text"
              className="form-control"
              name="zipCode"
              defaultValue={zip}
              {...register("zipCode")}
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
              {...register("ownerName")}
              name="ownerName"
              onChange={(e) => setOwnerName(e.target.value)}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Owner/Entity Name <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4}>
            <input
              type="text"
              className="form-control"
              defaultValue={propType}
              {...register("propertyType")}
              onChange={(e) => setPropType(e.target.value)}
              name="propertyType"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Property Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <NumberFormat
              format="####"
              className="form-control"
              placeholder="YYYY"
              defaultValue={year}
              onValueChange={(values) => {
                const { value } = values;
                setYear(value);
              }}
              name="year"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Year Built <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              className="form-control"
              defaultValue={lotSize}
              {...register("lotSize")}
              onChange={(e) => setLotSize(e.target.value)}
              name="lotSize"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Lot Size (Acre) <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={6}>
            <input
              type="text"
              className="form-control"
              defaultValue={garage}
              {...register("garage")}
              onChange={(e) => setGarage(e.target.value)}
              name="garage"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Garage(s) <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              className="form-control"
              defaultValue={story}
              {...register("story")}
              onChange={(e) => setStory(e.target.value)}
              name="story"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              story(s) <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={bedrooms}
              {...register("bedrooms")}
              onChange={(e) => setBedrooms(e.target.value)}
              name="bedrooms"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bedrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <input
              type="number"
              min="0"
              className="form-control"
              defaultValue={bathrooms}
              {...register("bathrooms")}
              onChange={(e) => setBathrooms(e.target.value)}
              name="bathrooms"
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bathrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={4} className="mt-sm-3 mt-md-0">
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={totalValue}
              allowNegative={false}
              className="form-control"
              onValueChange={(values) => {
                const { value } = values;
                setTotalValue(value);
              }}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Total Maket Value <span style={{ color: "#ff0000" }}>*</span>
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
              {...register("sqft")}
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
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={reservedAmount}
              allowNegative={false}
              className="form-control"
              onValueChange={(values) => {
                const { value } = values;
                setReservedAmount(value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Reserved Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col xs={12} md={6} className="mt-sm-3 mt-md-0">
            <NumberFormat
              thousandSeparator={true}
              prefix="$"
              value={discussedAmount}
              allowNegative={false}
              className="form-control"
              onValueChange={(values) => {
                const { value } = values;
                setDiscussedAmount(value);
              }}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Discussed Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
        </Row>
        <Row className="mt-5">
          <Col className="d-flex justify-content-center mt-2">
            <Button className="pre-btn" onClick={() => setStep(step - 1)}>
              Previous
            </Button>
            <Button
              // onClick={saveInfo}
              className="nxt-btn"
              id="next"
              type="submit"
            >
              Next
            </Button>
          </Col>
        </Row>
      </form>
    </div>
  );
}

export default RealEstateDetails;
