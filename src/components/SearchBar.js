import React, { useEffect, useState } from "react";

const SearchBar = () => {
  // let autocomplete;
  // function initAutocomplete() {
  //   autocomplete = new google.maps.places.Autocomplete(
  //     document.getElementById("autocomplete"),
  //     {
  //       types: ["establishment"],
  //       componentRestrictions: { country: ["AU"] },
  //       fields: ["place_id", "geometry", "name"],
  //     }
  //   );
  // }
  // <script
  //   src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBh9v5Cy0z_nG7l51UKxhT_YhuveP1cTAA&libraries=places&callback=initMap"
  //   async
  //   defer
  // />;
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState("");
  const handleOnChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="search-bar">
      <label for="exampleDataList" class="form-label">
        Datalist example
      </label>

      <input
        type="text"
        id="autocomplete"
        placeholder="Type to search..."
        value={input}
        onChange={handleOnChange}
      />
      <div>{suggestions}</div>
      <div>outcome</div>
    </div>
  );
};

export default SearchBar;
