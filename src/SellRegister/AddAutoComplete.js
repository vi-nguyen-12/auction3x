import React from "react";
import { useState, useEffect } from "react";
import { geocodeByAddress, geocodeByPlaceId } from "react-places-autocomplete";

const AddAutoComplete = ({ updateQuery }) => {
  const [address, setAddress] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState(false);

  const handleChange = (address) => {
    setAddress(address);
  };

  const handleSelect = async (address) => {
    setAddress(address);
    const results = await geocodeByAddress(address);
    setQuery(address);
  };

  useEffect(() => {
    if (query && !error) {
      updateQuery(query);
    }
  }, [query, error, updateQuery]);

  return (
    <div className="search-location-input">
      <input
        type="text"
        placeholder="Search Location"
        value={address}
        onChange={(e) => handleChange(e.target.value)}
        onSelect={(e) => handleSelect(e.target.value)}
      />
    </div>
  );
}