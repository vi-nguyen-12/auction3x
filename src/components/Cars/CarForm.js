import React from "react";
import { Table } from "react-bootstrap";
import { useForm } from "react-hook-form";

function CarForm({ toogleStep, step, properties }) {
  const { handleSubmit, register } = useForm();

  const onSubmit = (data) => {
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
      address: data.address,
    };
    properties(datas);
    toogleStep(step + 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="list-sell-bottom"
      style={{ justifyContent: "flex-start", display: "block" }}
    >
      <Table bordered striped hover>
        <tbody>
          <tr>
            <td>Make</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("make", { required: true, maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Model</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("model", { required: true, maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Year</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("year", { required: true, maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Mileage</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("mileage", { required: true, maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Transmission</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("transmission", {
                  required: true,
                  maxLength: 100,
                })}
              />
            </td>
          </tr>
          <tr>
            <td>Car Type</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("carType", { maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Power</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("power", { maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Color</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("color", { required: true, maxLength: 100 })}
                required
              />
            </td>
          </tr>
          <tr>
            <td>VIN</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("vin", { required: true })}
                required
              />
            </td>
          </tr>
          <tr>
            <td>Engine</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("engine", { required: true, maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Fuel Type</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("fuelType", { required: true, maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Condition</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("condition", { required: true, maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("price", { required: true, maxLength: 100 })}
              />
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <input
                type="text"
                className="form-control"
                {...register("address", { required: true })}
              />
            </td>
          </tr>
        </tbody>
      </Table>

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

export default CarForm;