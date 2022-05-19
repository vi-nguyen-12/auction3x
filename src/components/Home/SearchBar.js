import React, { useState, useRef } from "react";
import "../../styles/search.css";
import { ImSearch } from "react-icons/im";

// let autoComplete;

// const loadScript = (url, callback) => {
//   let script = document.createElement("script");
//   script.type = "text/javascript";

//   if (script.readyState) {
//     script.onreadystatechange = function () {
//       if (script.readyState === "loaded" || script.readyState === "complete") {
//         script.onreadystatechange = null;
//         callback();
//       }
//     };
//   } else {
//     script.onload = () => callback();
//   }

//   script.src = url;
//   document.getElementsByTagName("head")[0].appendChild(script);
// };

// function handleScriptLoad(updateQuery, autoCompleteRef) {
//   autoComplete = new window.google.maps.places.Autocomplete(
//     autoCompleteRef.current,
//     { types: ["(address)"], componentRestrictions: { country: "us" } }
//   );
//   autoComplete.setFields(["address_components", "formatted_address"]);
//   autoComplete.addListener("place_changed", () =>
//     handlePlaceSelect(updateQuery)
//   );
// }

// async function handlePlaceSelect(updateQuery) {
//   const addressObject = autoComplete.getPlace();
//   const query = addressObject.formatted_address;
//   updateQuery(query);
// }

function SearchBar({ getQuery }) {
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  // useEffect(() => {
  //   loadScript(
  //     `https://maps.googleapis.com/maps/api/js?key=AIzaSyAzWmlqg_i74_az_uNpk4A-pDo2LpxNNbE&libraries=places`,
  //     () => handleScriptLoad(setQuery, autoCompleteRef)
  //   );
  // }, []);

  const onSubmit = () => {
    getQuery(query);
  };

  return (
    <>
      <div className="search-box col-12 col-sm-6 col-md-4 mt-3">
        <div className="search-location-input">
          <input
            style={{ color: "white" }}
            ref={autoCompleteRef}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Enter a City"
            value={query}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                onSubmit();
              }
            }}
          />
        </div>
        <button
          onClick={() => {
            onSubmit();
          }}
          type="submit"
        >
          <ImSearch />
        </button>
      </div>
    </>
  );
}

export default SearchBar;
