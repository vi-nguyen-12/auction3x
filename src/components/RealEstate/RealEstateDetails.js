import React from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";

function RealEstateDetails({ property, toogleStep, step, tooglePropertyData }) {
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();
  // alert(
  //   "Please check the property information below and confirm that it is correct, if it is not, please fill in the correct information!"
  // );
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
              {...register("street_address", { required: false })}
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
              {...register("city", { required: false })}
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
              {...register("state", { required: false })}
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
              {...register("country", { required: false })}
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
            />
            <span style={{ fontWeight: "600", color: "black" }}>Sqft *</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              {...register("reservedAmount", { required: false })}
              required
            />
            <span style={{ fontWeight: "600", color: "black" }}>
              Reserved Amount *
            </span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              style={{ color: "black", fontWeight: "bold" }}
              {...register("discussedAmount", { required: false })}
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
      <div className="bottom-btn" style={{ width: "100%" }}>
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
