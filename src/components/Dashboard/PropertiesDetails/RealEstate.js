import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import NumberFormat from "react-number-format";

function RealEstate({ property, setEdit, edit }) {
  console.log(property);
  return (
    <>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Year Built<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.year_built}
            thousandSeparator={true}
            allowNegative={false}
            format="####"
            className="form-control"
            disabled={!edit.step2}
            onValueChange={(values) => {
              const { value } = values;
              property.year_built = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Square Feet<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.parcel.area_sq_ft}
            thousandSeparator={true}
            allowNegative={false}
            className="form-control"
            disabled={!edit.step2}
            onValueChange={(values) => {
              const { value } = values;
              property.details.parcel.area_sq_ft = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Property Type<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <input
            type="text"
            className="form-control"
            defaultValue={property.details.real_estate_type}
            disabled={!edit.step2}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Bedrooms<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.structure.beds_count}
            thousandSeparator={true}
            allowNegative={false}
            className="form-control"
            disabled={!edit.step2}
            format="###"
            onValueChange={(values) => {
              const { value } = values;
              property.details.structure.beds_count = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Bathrooms<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.structure.baths_count}
            thousandSeparator={true}
            allowNegative={false}
            className="form-control"
            disabled={!edit.step2}
            format="###"
            onValueChange={(values) => {
              const { value } = values;
              property.details.structure.baths_count = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Lot Size<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.parcel.lot_size}
            thousandSeparator={true}
            allowNegative={false}
            className="form-control"
            disabled={!edit.step2}
            onValueChange={(values) => {
              const { value } = values;
              property.details.parcel.lot_size = value;
            }}
          />
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Garage<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <input
            type="text"
            className="form-control"
            defaultValue={property.details.type_of_garage}
            disabled={!edit.step2}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Number of Stories<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.number_of_stories}
            thousandSeparator={true}
            allowNegative={false}
            className="form-control"
            disabled={!edit.step2}
            format="###"
            onValueChange={(values) => {
              const { value } = values;
              property.details.number_of_stories = value;
            }}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Market Evaluate Price<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.details.market_assessments[0].total_value}
            thousandSeparator={true}
            prefix="$"
            allowNegative={false}
            className="form-control"
            disabled={!edit.step2}
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
            Reserved Amount<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.reservedAmount}
            thousandSeparator={true}
            allowNegative={false}
            prefix={"$"}
            className="form-control"
            onValueChange={(values) => {
              const { value } = values;
              property.reservedAmount = value;
            }}
            disabled={!edit.step2}
          />
        </Col>
        <Col>
          <span style={{ fontWeight: "600", color: "black" }}>
            Disscussed Amount<span style={{ color: "#ff0000" }}>*</span>
          </span>
          <NumberFormat
            value={property.discussedAmount}
            thousandSeparator={true}
            allowNegative={false}
            prefix={"$"}
            className="form-control"
            onValueChange={(values) => {
              const { value } = values;
              property.discussedAmount = value;
            }}
            disabled={!edit.step2}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-center">
          <Button
            className="mx-3"
            onClick={() =>
              setEdit((prev) => ({ ...prev.step2, step2: !edit.step2.step2 }))
            }
          >
            Edit
          </Button>
          {edit.step2 ? <Button>Save</Button> : null}
        </Col>
      </Row>
    </>
  );
}

export default RealEstate;
