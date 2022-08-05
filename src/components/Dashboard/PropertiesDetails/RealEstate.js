import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import NumberFormat from "react-number-format";
import authService from "../../../services/authServices";

function RealEstate({ property, setEdit, edit, setRefresh, refresh }) {
  console.log(property);

  const onSubmit = async (prop, step) => {
    if (step === 2) {
      let submitedData = {
        street_address: prop.details.property_address.formatted_street_address,
        city: prop.details.property_address.city,
        state: prop.details.property_address.state,
        country: prop.details.property_address.country,
        zip_code: prop.details.property_address.zip_code,
        lat: prop.details.property_address.lat,
        lng: prop.details.property_address.lng,
        real_estate_type: prop.details.real_estate_type,
        year_built: parseInt(prop.details.year_built),
        owner_name: prop.details.owner_name,
        baths_count: parseInt(prop.details.structure.baths_count),
        beds_count: parseInt(prop.details.structure.beds_count),
        total_value: parseInt(prop.details.market_assessments[0].total_value),
        area_sq_ft: parseInt(prop.details.parcel.area_sq_ft),
        lot_size: parseInt(prop.details.parcel.lot_size),
        type_of_garage: prop.details.type_of_garage,
        number_of_stories: parseInt(prop.details.number_of_stories),
        description: {
          summary: prop.details.description.summary,
          investment: prop.details.description.investment,
          location: prop.details.description.location,
          market: prop.details.description.market,
        },
        reservedAmount: parseInt(prop.reservedAmount),
        discussedAmount: parseInt(prop.discussedAmount),
        step: 2,
      };
      await authService.editRealEstate(prop._id, submitedData).then((res) => {
        if (res.data.error) {
          alert(res.data.error);
        } else {
          alert("Property updated successfully");
          setRefresh(!refresh);
        }
      });
    }
  };

  return (
    <>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Year Built</span>
          <NumberFormat
            value={property.details.year_built}
            thousandSeparator={true}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            allowNegative={false}
            format="####"
            className="form-control"
            disabled={!edit.step2_1}
            onValueChange={(values) => {
              const { value } = values;
              property.details.year_built = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Square Feet</span>
          <NumberFormat
            value={property.details.parcel.area_sq_ft}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            onValueChange={(values) => {
              const { value } = values;
              property.details.parcel.area_sq_ft = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Property Type
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.real_estate_type}
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Bedrooms</span>
          <NumberFormat
            value={property.details.structure.beds_count}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            format="###"
            onValueChange={(values) => {
              const { value } = values;
              property.details.structure.beds_count = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Bathrooms</span>
          <NumberFormat
            value={property.details.structure.baths_count}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            format="###"
            onValueChange={(values) => {
              const { value } = values;
              property.details.structure.baths_count = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Lot Size</span>
          <NumberFormat
            value={property.details.parcel.lot_size}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            onValueChange={(values) => {
              const { value } = values;
              property.details.parcel.lot_size = value;
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>Garage</span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.type_of_garage}
            disabled={!edit.step2_1}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Number of Stories
          </span>
          <NumberFormat
            value={property.details.number_of_stories}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            format="###"
            onValueChange={(values) => {
              const { value } = values;
              property.details.number_of_stories = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Market Evaluate Price
          </span>
          <NumberFormat
            value={property.details.market_assessments[0].total_value}
            thousandSeparator={true}
            prefix="$"
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            className="form-control"
            disabled={!edit.step2_1}
            onValueChange={(values) => {
              const { value } = values;
              property.details.market_assessments[0].total_value = value;
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Reserved Amount
          </span>
          <NumberFormat
            value={property.reservedAmount}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            prefix={"$"}
            className="form-control"
            onValueChange={(values) => {
              const { value } = values;
              property.reservedAmount = value;
            }}
            disabled={!edit.step2_1}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Disscussed Amount
          </span>
          <NumberFormat
            value={property.discussedAmount}
            thousandSeparator={true}
            allowNegative={false}
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            prefix={"$"}
            className="form-control"
            onValueChange={(values) => {
              const { value } = values;
              property.discussedAmount = value;
            }}
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          <Button
            className="mx-3"
            onClick={() =>
              setEdit((prev) => ({ ...prev.step2_1, step2_1: !edit.step2_1 }))
            }
          >
            Edit
          </Button>
          {edit.step2_1 ? (
            <Button onClick={() => onSubmit(property, 2)}>Save</Button>
          ) : null}
        </Col>
      </Row>
    </>
  );
}

export default RealEstate;
