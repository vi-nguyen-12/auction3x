import React from "react";
import { useForm } from "react-hook-form";
import { Container, Row, Col } from "react-bootstrap";

function EmptyRealEstateDetails({
  property,
  toogleStep,
  step,
  tooglePropertyData,
}) {
  console.log(property);
  const {
    register,
    handleSubmit,
    //formState: { errors },
  } = useForm();

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
            />
            <span style={{ fontWeight: "600", color: "black" }}>Street Address <span style={{ color: "#ff0000" }}>*</span></span>
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
            />
            <span style={{ fontWeight: "600", color: "black" }}>City <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              name="state"
              defaultValue={property.state}
              {...register("state", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>State <span style={{ color: "#ff0000" }}>*</span></span>
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
            />
            <span style={{ fontWeight: "600", color: "black" }}>Country <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              name="zipCode"
              defaultValue={property.zipCode}
              {...register("zipCode", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Zip Code <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("ownerName", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Owner Name <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("rooms_count", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Rooms Count <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("bedrooms", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Bedrooms <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("propertyType", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Property Type <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("bathrooms", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Bathrooms <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="$"
              {...register("total_value", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Total Value <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("sqft", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Sqft <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
        </Row>
        <Row style={{ marginTop: "10px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("reservedAmount", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Reserved Amount <span style={{ color: "#ff0000" }}>*</span></span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("discussedAmount", { required: false })}
            />
            <span style={{ fontWeight: "600", color: "black" }}>Discussed Amount <span style={{ color: "#ff0000" }}>*</span></span>
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
