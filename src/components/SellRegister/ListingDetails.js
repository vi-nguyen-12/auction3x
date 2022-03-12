import React from "react";
import RealEstateForm from "../RealEstate/RealEstateForm";
import CarForm from "../Cars/CarForm";
import JetForm from "../Jets/JetForm";
import YachtForm from "../Yachts/YachtForm";

const ListingDetails = ({ toogleStep, step, properties, propertyType }) => {
  // const {
  //   register,
  //   handleSubmit,
  //   //formState: { errors },
  // } = useForm();

  // const [address, setAddress] = useState("");
  // const [state, setState] = useState("");
  // const [city, setCity] = useState("");
  // const [country, setCountry] = useState("");
  // const [zip, setZip] = useState("");

  // const handleChange = (address) => {
  //   setAddress(address);
  // };

  // const handleSelect = (address) => {
  //   geocodeByAddress(address).then((results) => {
  //     console.log(results);
  //     setAddress(results[0].formatted_address.split(",")[0]);

  //     let cities = results[0].address_components.filter((item) => {
  //       return item.types.includes("locality" || "sublocality");
  //     });
  //     setCity(cities[0].long_name ? cities[0].long_name : cities[0].short_name);

  //     let states = results[0].address_components.filter((item) => {
  //       return item.types[0] === "administrative_area_level_1";
  //     });
  //     setState(
  //       states[0].long_name ? states[0].long_name : states[0].short_name
  //     );

  //     let countries = results[0].address_components.filter((item) => {
  //       return item.types[0] === "country";
  //     });
  //     setCountry(
  //       countries[0].long_name
  //         ? countries[0].long_name
  //         : countries[0].short_name
  //     );

  //     let zipcodes = results[0].address_components.filter((item) => {
  //       return item.types[0] === "postal_code";
  //     });
  //     setZip(
  //       zipcodes[0].long_name ? zipcodes[0].long_name : zipcodes[0].short_name
  //     );
  //   });
  // };

  // const onSubmit = (data) => {
  //   const addres = address + " " + data.address1;
  //   const datas = {
  //     street_address: addres,
  //     city: city,
  //     state: state,
  //     country: country,
  //     zipCode: zip,
  //   };

  //   authService.realEstate(datas).then((res) => {
  //     if (res.data.length !== 0) {
  //       properties(res.data);
  //       toogleStep(step + 1);
  //     } else if (res.data.length === 0) {
  //       alert(
  //         "Could not find property information! Please fill out the property details."
  //       );
  //       properties(datas);
  //       toogleStep(step + 1);
  //     }
  //   });
  // };

  return (
    <div className="listDetail-content">
      <div className="sell-top">
        <div className="circle-1">
          <p className="text">01</p>
          <span className="spnn">Select Catagory</span>
        </div>
        <div className="line-1"></div>
        <div className="circle-2">
          <p className="text">02</p>
          <span className="spnn">Listing Details</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">03</p>
          <span className="spnn">Property Details</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">04</p>
          <span className="spnn">Upload Documents</span>
        </div>
        <div className="line"></div>
        <div className="circle">
          <p className="text">05</p>
          <span className="spnn">Agreement</span>
        </div>
        {/* <div class="line"></div>
        <div class="circle">
          <p class="text">06</p>
          <span className="spnn">Agreement</span>
        </div> */}
      </div>
      {propertyType === "realEstate" ? (
        <RealEstateForm
          toogleStep={toogleStep}
          step={step}
          properties={properties}
        />
      ) : propertyType === "cars" ? (
        <CarForm toogleStep={toogleStep} step={step} />
      ) : propertyType === "jets" ? (
        <JetForm toogleStep={toogleStep} step={step} />
      ) : propertyType === "yachts" ? (
        <YachtForm toogleStep={toogleStep} step={step} />
      ) : null}
    </div>
  );
};
export default ListingDetails;
