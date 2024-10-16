import React from "react";

const SearchButton = ({ searchInput, handleSearch, }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchInput}
        onChange={handleSearch}
        placeholder="Search..."
        className="search-input"
      />
    </div>
  );
};

export default SearchButton;
