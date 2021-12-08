import React, { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";

const DisplayTab = () => {
  const [realTab, setRealTab] = useState("Investment Opportunity");
  return (
    <form>
      <div style={{ padding: "25px" }}>
        <Tabs
          aciveKey={realTab}
          onselect={() => setRealTab()}
          className="RealEstate-Tab"
        >
          <Tab
            eventKey="Investment Opportunity"
            title="Investment Opportunity"
            className="RealEstate-Tab-1"
            style={{
              backgroundColor: "#B77B50",
              border: "none",
              outline: "none",
              fontSize: "12px",
              borderRadius: "4px",
              padding: "20px",
            }}
          >
            <div style={{ color: "white" }}>
              <h3>Detailed Despcription</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tempor congue, ipsum nunc
                consectetur nisi, eget congue nisl nisl eget nunc. Vestibulum
                ante ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia Curae; Donec euismod, nisi eget tincidunt congue, nisl
                nisl euismod nisi, eget congue nisl nisl eget nunc. Vestibulum
                ante ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia Curae; Donec euismod, nisi eget tincidunt congue, nisl
                nisl euismod nisi, eget congue nisl nisl eget nunc. Vestibulum
                ante ipsum primis in faucibus orci luctus et ultrices posuere
                cubilia Curae; Donec euismod, nisi eget tincidunt congue, nisl
                nisl euismod nisi,
              </p>
            </div>
          </Tab>
          <Tab
            eventKey="Location Information"
            title="Location Information"
            style={{
              backgroundColor: "#B77B50",
              border: "none",
              outline: "none",
              fontSize: "12px",
              borderRadius: "4px",
              padding: "20px",
            }}
          >
            {" "}
            <div style={{ color: "white" }}>
              <h3>Location Highlight</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tempor congue, ipsum nunc
                consectetur nisi, eget congue nisl nisl eget nunc. Vestibulum
                ante ipsum primis in faucibus orci luctus et
              </p>
            </div>
          </Tab>
          <Tab
            eventKey="Market Information"
            title="ConMarket Informationtact"
            style={{
              backgroundColor: "#B77B50",
              border: "none",
              outline: "none",
              fontSize: "12px",
              borderRadius: "4px",
              padding: "20px",
            }}
          >
            {" "}
            <div style={{ color: "white" }}>
              <h3> Market Overview</h3>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Pellentesque euismod, urna eu tempor congue, ipsum nunc
                consectetur nisi, eget congue nisl nisl eget nunc. Vestibulum
                ante ipsum primis in faucibus orci luctus et
              </p>
            </div>
          </Tab>

          <Tab
            eventKey="Document Vault"
            title="Document Vault"
            style={{
              backgroundColor: "#B77B50",
              border: "none",
              outline: "none",
              fontSize: "12px",
              borderRadius: "4px",
              padding: "20px",
            }}
          >
            <div
              style={{
                color: "white",
                display: "inline-block",
                alignItems: "center",
                position: "relative",
                marginLeft: "35%",
              }}
            >
              <div>
                <tr>
                  <td className="DocVault">
                    <input type="checkbox" name="checkbox" /> Broker Offering
                    Memorandum (1)
                  </td>
                  <td className="DocVault">
                    <input type="checkbox" name="checkbox" /> Purchase Agreement
                    (3)
                  </td>
                </tr>
                <tr>
                  <td className="DocVault">
                    <input type="checkbox" name="checkbox" /> Market and
                    Valuations (4)
                  </td>
                  <td className="DocVault">
                    <input type="checkbox" name="checkbox" /> Third Party
                    Reports (2)
                  </td>
                </tr>
                <tr>
                  <td className="DocVault">
                    <input type="checkbox" name="checkbox" /> Operating and
                    Financial (10)
                  </td>
                  <td className="DocVault">
                    <input type="checkbox" name="checkbox" /> Title and
                    Insurance (1)
                  </td>
                </tr>
              </div>
              <div className="DocVault-1">
                <input type="checkbox" name="checkbox" />
                <span
                  style={{
                    paddingLeft: "10px",
                    color: "#94a5b2",
                    fontSize: "13px",
                  }}
                >
                  I agree to the Terms and Conditions
                </span>
              </div>
              <div className="DocVault-1">
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#B77B50",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "auto",
                  }}
                  onClick={null}
                >
                  Download Selected
                </button>
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#B77B50",
                    padding: "10px",
                    borderRadius: "10px",
                    margin: "auto",
                  }}
                  onClick={null}
                >
                  Download All
                </button>
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </form>
  );
};

export default DisplayTab;
