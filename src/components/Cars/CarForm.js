import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function CarForm({ toogleStep, step, properties }) {
  const { handleSubmit, register } = useForm();
  const [property, setProperty] = useState({});
  const params = useParams();
  const incompleteProperty = useSelector((state) => state.incompProperty);

  useEffect(() => {
    if (params.id) {
      const prop = incompleteProperty.filter((item) => item._id === params.id);
      setProperty(prop[0]);
    }
  }, []);

  const onSubmit = (data) => {
    if (
      data.year !== "" &&
      data.make !== "" &&
      data.model !== "" &&
      data.vin !== "" &&
      data.mileage !== "" &&
      data.price !== "" &&
      data.description !== "" &&
      data.address !== "" &&
      data.color !== "" &&
      data.transmission !== "" &&
      data.carType !== "" &&
      data.power !== "" &&
      data.engine !== "" &&
      data.fuelType !== ""
    ) {
      const datas = {
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
      };
      properties(datas);
      toogleStep(step + 1);
    } else {
      alert("Please fill all the required fields");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="list-sell-bottom"
      style={{
        justifyContent: "flex-start",
        display: "block",
        overflowY: "auto",
      }}
    >
      <Table bordered striped hover>
        <tbody>
          <tr>
            <td style={{ color: "black" }}>Make</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.make : ""}
                {...register("make")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Model</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.model : ""}
                {...register("model")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Year</td>
            <td>
              <input
                type="number"
                className="form-control"
                defaultValue={property ? property.details.year : ""}
                {...register("year")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Mileage</td>
            <td>
              <input
                type="number"
                className="form-control"
                defaultValue={property ? property.details.mileage : ""}
                {...register("mileage")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Transmission</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.transmission : ""}
                {...register("transmission")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Car Type</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.car_type : ""}
                {...register("carType")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Power</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.power : ""}
                {...register("power")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Color</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.color : ""}
                {...register("color")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>VIN</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.VIN : ""}
                {...register("vin")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Engine</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.engine : ""}
                {...register("engine")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Fuel Type</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.fuel_type : ""}
                {...register("fuelType")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Condition</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.condition : ""}
                {...register("condition")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Price</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.price : ""}
                {...register("price")}
              />
            </td>
          </tr>
          <tr>
            <td style={{ color: "black" }}>Address</td>
            <td>
              <input
                type="text"
                className="form-control"
                defaultValue={property ? property.details.property_address : ""}
                {...register("address")}
              />
            </td>
          </tr>
        </tbody>
      </Table>

      <div
        className="bottom-btn"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          position: "relative",
          bottom: "0",
        }}
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

export default CarForm;
