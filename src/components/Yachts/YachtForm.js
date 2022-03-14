import React from "react";
import { Table } from "react-bootstrap";

function YachtForm({ toogleStep, step }) {
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
            <td>Length</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Beam</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Draft</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Displacement</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Engines</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Fuel tankage</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Boat type</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Cabins</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Berths</td>
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
          <tr>
            <td>Other</td>
            <td>
              <textarea className="form-control" />
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
    </div>
  );
}

export default YachtForm;
