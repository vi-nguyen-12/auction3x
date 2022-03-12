import React from "react";
import { Table } from "react-bootstrap";

function CarForm({ toogleStep, step }) {
  return (
    <div
      className="list-sell-bottom"
      style={{ justifyContent: "flex-start", display: "block" }}
    >
      <Table bordered striped hover>
        <tbody>
          <tr>
            <td>Make</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Model</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Year</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Mileage</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Transmission</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Car Type</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Power</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Color</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>VIN</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Engine</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Fuel Type</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Condition</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Price</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Address</td>
            <td>
              <input type="text" className="form-control" />
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
        <button
          onClick={toogleStep(step + 1)}
          className="nxt-btn"
          type="submit"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default CarForm;
