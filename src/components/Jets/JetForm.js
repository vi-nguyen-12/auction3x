import React from "react";
import { Table } from "react-bootstrap";

function JetForm({ toogleStep, step }) {
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
            <td>VAT Type</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Crusing Speed</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Max Range</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Max take off weight</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Altitude</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Cabin Size</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Exterior height</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Exterior length</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Capacity</td>
            <td>
              <input type="text" className="form-control" />
            </td>
          </tr>
          <tr>
            <td>Wing span</td>
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
        <button className="nxt-btn" type="submit">
          Next
        </button>
      </div>
    </div>
  );
}

export default JetForm;
