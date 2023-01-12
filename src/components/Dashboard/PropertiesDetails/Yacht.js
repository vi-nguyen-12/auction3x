import React, { useEffect, useState, useContext } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import NumberFormat from "react-number-format";
import authService from "../../../services/authServices";
import { currencyText } from "../../../App";
import axios from "axios";

function Yacht({ property, setEdit, edit, setRefresh, refresh, setMessage }) {
  const currency = useContext(currencyText);
  const [other, setOther] = useState(false);
  const [changeDate, setChangeDate] = useState(false);
  const [vessel_manufacturing_date, setVessel_manufacturing_date] = useState(
    property.details.vessel_manufacturing_date
  );
  const [convertedCurrency, setConvertedCurrency] = useState();

  useEffect(() => {
    const convert = async () => {
      let convertCurrency = {
        reservedAmount: 0,
        discussedAmount: 0,
        runningCost: 0,
      };
      await axios
        .get(
          `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${property.reservedAmount}`
        )
        .then((res) => {
          convertCurrency = {
            ...convertCurrency,
            reservedAmount: res.data.result?.toFixed(0) || 0,
          };
        });

      await axios
        .get(
          `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${property.discussedAmount}`
        )
        .then((res) => {
          convertCurrency = {
            ...convertCurrency,
            discussedAmount: res.data.result?.toFixed(0) || 0,
          };
        });

      await axios
        .get(
          `https://api.exchangerate.host/convert?from=USD&to=${currency}&amount=${property.details.running_cost}`
        )
        .then((res) => {
          convertCurrency = {
            ...convertCurrency,
            runningCost: res.data.result?.toFixed(0) || 0,
          };
        });
      setConvertedCurrency(convertCurrency);
    };

    if (property && currency !== "USD") {
      convert();
    }
  }, [property]);

  const manufacturer = [
    "AMELS",
    "BENETTI",
    "FEADSHIP",
    "FINCANTIERI YACHTS",
    "HEESEN YACHTS",
    "LURSSEN",
    "NOBISKRUG",
    "OCEANCO",
    "PERINI NAVI",
    "ROYAL HUISMAN",
    "SUNSEEKER",
    "MANGUSTA",
    "Other",
  ];

  const fixDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate() + 1;
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();
    setVessel_manufacturing_date(`${month}/${day}/${year}`);
  };

  const onSubmit = async (prop, step) => {
    if (step === 2) {
      let submitedData = {
        reservedAmount: parseInt(prop.reservedAmount),
        discussedAmount: parseInt(prop.discussedAmount),
        vessel_registration_number: prop.details.vessel_registration_number,
        vessel_manufacturing_date: vessel_manufacturing_date,
        manufacture_mark: prop.details.manufacture_mark,
        manufacturer_name: prop.details.manufacturer_name,
        engine_type: prop.details.engine_type,
        length: parseInt(prop.details.length),
        engine_manufacture_name: prop.details.engine_manufacture_name,
        engine_deck_type: prop.details.engine_deck_type,
        running_cost: parseInt(prop.details.running_cost),
        no_of_crew_required: parseInt(prop.details.no_of_crew_required),
        description: {
          summary: prop.details.description.summary,
          investment: prop.details.description.investment,
          location: prop.details.description.location,
          market: prop.details.description.market,
        },
        property_address: {
          formatted_street_address:
            prop.details.property_address.formatted_street_address,
          country: prop.details.property_address.country,
          state: prop.details.property_address.state,
          city: prop.details.property_address.city,
          zip_code: prop.details.property_address.zip_code,
          lat: prop.details.property_address.lat,
          lng: prop.details.property_address.lng,
        },
        step: 2,
      };
      await authService.editProp(submitedData, prop._id).then((res) => {
        if (res.data.error) {
          setMessage("");
          setMessage(res.data.error);
        } else {
          setMessage("");
          setMessage("Property updated successfully");
          setRefresh(!refresh);
        }
      });
    }
  };

  return (
    <>
      <Row className="mt-3">
        <Col>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Vessel Registration Number
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.vessel_registration_number}
            onInput={(e) => {
              e.target.value = e.target.value.toUpperCase();
            }}
            onChange={(e) =>
              (property.details.vessel_registration_number = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Vessel Manufacturing Date{" "}
          </span>
          <div className="d-flex">
            {changeDate ? (
              <input
                type="date"
                className="form-control"
                style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
                value={vessel_manufacturing_date}
                onChange={(e) => fixDate(e.target.value)}
                disabled={!edit.step2_1}
              />
            ) : (
              <input
                type="text"
                className="form-control"
                value={new Date(vessel_manufacturing_date).toLocaleDateString()}
                disabled={!edit.step2_1}
              />
            )}
            <Button
              variant="primary"
              onClick={() => setChangeDate(!changeDate)}
              className={`bg-${
                changeDate ? "danger" : "success"
              } border-0 rounded-0 ms-2`}
              disabled={!edit.step2_1}
            >
              {changeDate ? "Cancel" : "Change"}
            </Button>
          </div>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={12} md={4}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Manufacture Mark
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.manufacture_mark}
            onChange={(e) =>
              (property.details.manufacture_mark = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
        <Col xs={12} md={4}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Manufacturer Name
          </span>
          {other ? (
            <>
              <input
                type="text"
                className="form-control"
                style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
                placeholder="Enter Manufacturer Name"
                defaultValue={property.details.manufacturer_name}
                onChange={(e) =>
                  (property.details.manufacturer_name = e.target.value)
                }
                disabled={!edit.step2_1}
              />
              <span className="d-flex justify-content-end mt-1">
                <Button className="rounded-0" onClick={() => setOther(false)}>
                  Back
                </Button>
              </span>
            </>
          ) : (
            <Form.Select
              className="form-control"
              style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
              value={property.details.manufacturer_name}
              onChange={(e) => {
                if (e.target.value !== "Other" && e.target.value !== "") {
                  property.details.manufacturer_name = e.target.value;
                } else {
                  e.target.value === "Other" ? setOther(true) : setOther(false);
                }
              }}
              disabled={!edit.step2_1}
            >
              <option value="">Manufacturer</option>
              {manufacturer.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </Form.Select>
          )}
        </Col>

        <Col xs={12} md={4}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Engine Manufacturer Name
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.engine_manufacture_name}
            onChange={(e) =>
              (property.details.engine_manufacture_name = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>

      <Row className="mt-3">
        <Col xs={12} md={6}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Engine Type
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.engine_type}
            onChange={(e) => (property.details.engine_type = e.target.value)}
            disabled={!edit.step2_1}
          />
        </Col>
        <Col>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Vessel Length(ft)
          </span>
          <NumberFormat
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            thousandSeparator={true}
            allowNegative={false}
            value={property.details.length}
            onValueChange={(values) => {
              const { value } = values;
              property.details.length = value;
            }}
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col xs={12} md={4}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Engine Deck Type
          </span>
          <input
            type="text"
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            defaultValue={property.details.engine_deck_type}
            onChange={(e) =>
              (property.details.engine_deck_type = e.target.value)
            }
            disabled={!edit.step2_1}
          />
        </Col>
        <Col xs={12} md={4}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Running Cost
          </span>
          <NumberFormat
            thousandSeparator={true}
            allowNegative={false}
            prefix="$"
            value={property.details.running_cost}
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            onValueChange={(values) => {
              const { value } = values;
              property.details.running_cost = value;
            }}
            disabled={!edit.step2_1}
          />
          {currency !== "USD" && (
            <p className="text-muted p-0">
              {currency === "INR" ? (
                "Approx" +
                " " +
                parseInt(convertedCurrency?.runningCost).toLocaleString(
                  "en-IN",
                  {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                  }
                )
              ) : (
                <NumberFormat
                  value={convertedCurrency?.runningCost}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Approx. "}
                  suffix={" " + currency}
                />
              )}
            </p>
          )}
        </Col>
        <Col xs={12} md={4}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            No. Crew Required
          </span>
          <NumberFormat
            thousandSeparator={true}
            allowNegative={false}
            value={property.details.no_of_crew_required}
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            onValueChange={(values) => {
              const { value } = values;
              property.details.no_of_crew_required = value;
            }}
            disabled={!edit.step2_1}
          />
        </Col>
      </Row>
      {/* <Row style={{ marginTop: "30px", height: "100px" }}>
        <Col>
          <textarea
            className="form-control"
            style={{ height: "100%" }}
            defaultValue={property.details.detain}
            placeholder="Other information about the property"
            {...register("detain")}
            onChange={(e) => (property.details.detain = e.target.value)}
          />
        </Col>
      </Row> */}
      <Row className="mt-3">
        <Col xs={12} md={6}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Reserve Amount
          </span>
          <NumberFormat
            thousandSeparator={true}
            allowNegative={false}
            prefix="$"
            value={property.reservedAmount}
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            onValueChange={(values) => {
              const { value } = values;
              property.reservedAmount = value;
            }}
            disabled={!edit.step2_1}
          />
          {currency !== "USD" && (
            <p className="text-muted p-0">
              {currency === "INR" ? (
                "Approx" +
                " " +
                parseInt(convertedCurrency?.reservedAmount).toLocaleString(
                  "en-IN",
                  {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                  }
                )
              ) : (
                <NumberFormat
                  value={convertedCurrency?.reservedAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Approx. "}
                  suffix={" " + currency}
                />
              )}
            </p>
          )}
        </Col>
        <Col xs={12} md={6}>
          <span
            style={{
              fontWeight: "600",
              color: "black",
            }}
          >
            Negotiable Amount
          </span>
          <NumberFormat
            thousandSeparator={true}
            allowNegative={false}
            prefix="$"
            value={property.discussedAmount}
            className="form-control"
            style={{ border: edit.step2_1 ? "1px solid #2ecc71" : "" }}
            onValueChange={(values) => {
              const { value } = values;
              property.discussedAmount = value;
            }}
            disabled={!edit.step2_1}
          />
          {currency !== "USD" && (
            <p className="text-muted p-0">
              {currency === "INR" ? (
                "Approx" +
                " " +
                parseInt(convertedCurrency?.discussedAmount).toLocaleString(
                  "en-IN",
                  {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 2,
                  }
                )
              ) : (
                <NumberFormat
                  value={convertedCurrency?.discussedAmount}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix={"Approx. "}
                  suffix={" " + currency}
                />
              )}
            </p>
          )}
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          {edit.step2_1 ? (
            <Button className="rounded-0" onClick={() => onSubmit(property, 2)}>
              Save
            </Button>
          ) : null}
          <Button
            className={
              edit.step2_1 ? "mx-3 btn btn-danger rounded-0" : "mx-3 rounded-0"
            }
            onClick={() =>
              setEdit((prev) => ({ ...prev.step2_1, step2_1: !edit.step2_1 }))
            }
            disabled={
              property.auctionDetails?.auctionStartDate ||
              property.isApproved === "success"
            }
          >
            Edit
          </Button>
        </Col>
      </Row>
    </>
  );
}

export default Yacht;
