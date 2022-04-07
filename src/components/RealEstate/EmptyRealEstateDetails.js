import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col, Button } from "react-bootstrap";
import authService from "../../services/authServices";
import { useParams } from "react-router-dom";

function EmptyRealEstateDetails({
  property,
  toogleStep,
  step,
  tooglePropertyData,
  propId,
  ownership,
  toogleSellStep,
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
          const property = res.data.filter((prop) => prop._id === params.id);
          console.log(property);
          setOwnerName(
            property[0].details.owner ? property[0].details.owner.name : ""
          );
          setRooms(
            property[0].details.structure
              ? property[0].details.structure.rooms_count
              : ""
          );
          setBathrooms(
            property[0].details.structure
              ? property[0].details.structure.baths
              : ""
          );
          setBedrooms(
            property[0].details.structure
              ? property[0].details.structure.beds_count
              : ""
          );
          setPropType(
            property[0].details.parcel
              ? property[0].details.parcel.standardized_land_use_type
              : ""
          );
          setSqft(
            property[0].details.parcel
              ? property[0].details.parcel.area_sq_ft
              : ""
          );
          setTotalValue(
            property[0].details.market_assessments
              ? property[0].details.market_assessments[0].total_value
              : ""
          );
          setReservedAmount(
            property[0].reservedAmount ? property[0].reservedAmount : 0
          );
          setDiscussedAmount(
            property[0].discussedAmount ? property[0].discussedAmount : 0
          );
          setAddress(
            property[0].details.property_address
              ? property[0].details.property_address.formatted_street_address
              : ""
          );
          setCity(
            property[0].details.property_address
              ? property[0].details.property_address.city
              : ""
          );
          setState(
            property[0].details.property_address
              ? property[0].details.property_address.state
              : ""
          );
          setCountry(
            property[0].details.property_address
              ? property[0].details.property_address.country
              : ""
          );
          setZip(
            property[0].details.property_address
              ? property[0].details.property_address.zip_code
              : ""
          );
        }
      });
    } else {
      setAddress(property.street_address);
      setCity(property.city);
      setState(property.state);
      setCountry(property.country);
      setZip(property.zip_code);
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
              defaultValue={
                property.street_address
                  ? property.street_address
                  : address
                  ? address
                  : ""
              }
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
              defaultValue={property.city ? property.city : city ? city : ""}
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
              defaultValue={
                property.state ? property.state : state ? state : ""
              }
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
              defaultValue={
                property.country ? property.country : country ? country : ""
              }
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
              defaultValue={
                property.zip_code ? property.zip_code : zip ? zip : ""
              }
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
              defaultValue={ownerName ? ownerName : ""}
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
              type="number"
              className="form-control"
              defaultValue={rooms ? rooms : 0}
              {...register("rooms_count", { required: false })}
              onChange={(e) => setRooms(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Rooms Count <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              defaultValue={bedrooms ? bedrooms : 0}
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
              defaultValue={propType ? propType : ""}
              {...register("propertyType", { required: false })}
              onChange={(e) => setPropType(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Property Type <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              defaultValue={bathrooms ? bathrooms : 0}
              {...register("bathrooms", { required: false })}
              onChange={(e) => setBathrooms(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Bathrooms <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              placeholder="$"
              defaultValue={totalValue ? totalValue : 0}
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
              type="number"
              className="form-control"
              defaultValue={sqft ? sqft : 0}
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
              type="number"
              className="form-control"
              defaultValue={reservedAmount}
              {...register("reservedAmount", { required: false })}
              onChange={(e) => setReservedAmount(e.target.value)}
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Reserved Amount <span style={{ color: "#ff0000" }}>*</span>
            </span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              defaultValue={discussedAmount}
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

export default EmptyRealEstateDetails;
