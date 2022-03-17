import React from "react";
import { useForm } from "react-hook-form";
import { Row, Col, Container } from "react-bootstrap";

function CarDetails({ property, toogleStep, step, tooglePropertyData }) {
  console.log(property);
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
    if (parseInt(data.reservedAmount) <= parseInt(data.discussedAmount)) {
      alert("Reserved amount should be greater than discussed amount");
    } else {
      const submitedData = {
        type: "car",
        reservedAmount: data.reservedAmount,
        discussedAmount: data.discussedAmount,
        details: {
          make: data.make,
          model: data.model,
          year: data.year,
          mileage: data.mileage,
          transmission: data.transmission,
          car_type: data.carType,
          power: data.power,
          color: data.color,
          VIN: data.vin,
          engine: data.engine,
          fuel_type: data.fuelType,
          condition: data.condition,
          price: data.price,
          property_address: data.address,
        },
      };
      tooglePropertyData(submitedData);
      toogleStep(step + 1);
    }
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="list-sell-bottom"
      style={{
        justifyContent: "flex-start",
        display: "block",
        marginTop: "20px",
      }}
    >
      <Container style={{ marginTop: "40px" }}>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("make", { required: true, maxLength: 100 })}
              defaultValue={property.make}
            />
            <span>Make</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("model", { required: true, maxLength: 100 })}
              defaultValue={property.model}
            />
            <span>Model</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("year", { required: true, maxLength: 100 })}
              defaultValue={property.year}
            />
            <span>Year</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("mileage", { required: true, maxLength: 100 })}
              defaultValue={property.mileage}
            />
            <span>Mileage</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("transmission", { required: true, maxLength: 100 })}
              defaultValue={property.transmission}
            />
            <span>Transmission</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("carType", { required: true, maxLength: 100 })}
              defaultValue={property.car_type}
            />
            <span>Car Type</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("power", { required: true, maxLength: 100 })}
              defaultValue={property.power}
            />
            <span>Power</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("color", { required: true, maxLength: 100 })}
              defaultValue={property.color}
            />
            <span>Color</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("vin", { required: true, maxLength: 100 })}
              defaultValue={property.VIN}
            />
            <span>VIN</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("engine", { required: true, maxLength: 100 })}
              defaultValue={property.engine}
            />
            <span>Engine</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("fuelType", { required: true, maxLength: 100 })}
              defaultValue={property.fuel_type}
            />
            <span>Fuel Type</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("condition", { required: true, maxLength: 100 })}
              defaultValue={property.condition}
            />
            <span>Condition</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("price", { required: true, maxLength: 100 })}
              defaultValue={property.price}
            />
            <span>Price</span>
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              {...register("address", { required: true, maxLength: 100 })}
              defaultValue={property.address}
            />
            <span>Address</span>
          </Col>
        </Row>
        <Row style={{ marginTop: "20px" }}>
          <Col>
            <input
              type="number"
              className="form-control"
              {...register("reservedAmount", { required: true })}
              required
            />
            <span>Reserved Amount</span>
          </Col>
          <Col>
            <input
              type="number"
              className="form-control"
              {...register("discussedAmount", { required: true })}
              required
            />
            <span>Discussed Amount</span>
          </Col>
        </Row>
      </Container>

      <div
        className="bottom-btn"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <button
          className="pre-btn"
          onClick={() => {
            toogleStep(step - 1);
          }}
        >
          Previous
        </button>
        <button className="nxt-btn" type="submit">
          Next
        </button>
      </div>
    </form>
  );
}

export default CarDetails;
