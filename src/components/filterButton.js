import React, { useMemo, useState } from "react";
import { FaFilter, FaTimes } from "react-icons/fa";
import Slider from 'rc-slider'; // Import Slider
import 'rc-slider/assets/index.css'; // Import Slider styles
import './FilterButton.css';

const FilterButton = ({
  showFilter,
  handleFilterClick,
  data,
  setFilteredData,
}) => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [minPriceFilter, setMinPriceFilter] = useState(0);
  const [maxPriceFilter, setMaxPriceFilter] = useState(1000); // Set a default max price
  const [salePriceRange, setSalePriceRange] = useState([0, 1000]); // Adjust range as necessary
  const [createdAtStart, setCreatedAtStart] = useState("");
  const [createdAtEnd, setCreatedAtEnd] = useState("");
  const [updatedAtStart, setUpdatedAtStart] = useState("");
  const [updatedAtEnd, setUpdatedAtEnd] = useState("");

  const uniqueCategories = useMemo(() => {
    return Array.from(new Set(data.map((item) => item.category)));
  }, [data]);

  const applyFilters = () => {
    let filteredData = data;
    
    if (categoryFilter) {
      filteredData = filteredData.filter((row) => row.category === categoryFilter);
    }

    if (nameFilter) {
      filteredData = filteredData.filter((row) =>
        row.name.toLowerCase().includes(nameFilter.toLowerCase())
      );
    }

    // Price Filters
    filteredData = filteredData.filter(row => 
      row.price >= minPriceFilter && row.price <= maxPriceFilter
    );

    // Sale Price Filters
    filteredData = filteredData.filter(row => 
      row.sale_price >= salePriceRange[0] && row.sale_price <= salePriceRange[1]
    );

    // Created At Date Range
    if (createdAtStart) {
      filteredData = filteredData.filter(row => 
        new Date(row.createdAt) >= new Date(createdAtStart)
      );
    }
    if (createdAtEnd) {
      filteredData = filteredData.filter(row => 
        new Date(row.createdAt) <= new Date(createdAtEnd)
      );
    }

    // Updated At Date Range
    if (updatedAtStart) {
      filteredData = filteredData.filter(row => 
        new Date(row.updatedAt) >= new Date(updatedAtStart)
      );
    }
    if (updatedAtEnd) {
      filteredData = filteredData.filter(row => 
        new Date(row.updatedAt) <= new Date(updatedAtEnd)
      );
    }

    setFilteredData(filteredData);
  };

  const resetFilters = () => {
    setCategoryFilter("");
    setNameFilter("");
    setMinPriceFilter(0);
    setMaxPriceFilter(1000);
    setSalePriceRange([0, 1000]);
    setCreatedAtStart("");
    setCreatedAtEnd("");
    setUpdatedAtStart("");
    setUpdatedAtEnd("");
    setFilteredData(data);
  };

  return (
    <>
      <button className="icon-btn" onClick={handleFilterClick}>
        <FaFilter />
      </button>
      {showFilter && (
        <div className="filter-options">
          <div className="close-btn" onClick={handleFilterClick}>
            <FaTimes />
          </div>
          
          <div className="filter-group">
            <label htmlFor="name">Filter by Name</label>
            <input
              id="name"
              type="text"
              placeholder="Type name..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <label htmlFor="category">Filter by Category</label>
            <select
              id="category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="">Select a category</option>
              {uniqueCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Price Filter Slider */}
          <div className="filter-group">
            <label>Filter by Price</label>
            <Slider
              range
              min={0}
              max={1000}
              value={[minPriceFilter, maxPriceFilter]}
              onChange={(range) => {
                setMinPriceFilter(range[0]);
                setMaxPriceFilter(range[1]);
              }}
            />
          </div>

          {/* Sale Price Filter Slider */}
          <div className="filter-group">
            <label>Filter by Sale Price</label>
            <Slider
              range
              min={0}
              max={1000}
              value={salePriceRange}
              onChange={(range) => setSalePriceRange(range)}
            />
          </div>

          {/* Created At Date Range */}
          <div className="filter-group">
            <label>Filter by Created At</label>
            <div>
              <input
                type="date"
                value={createdAtStart}
                onChange={(e) => setCreatedAtStart(e.target.value)}
              />
            </div>
          </div>

          {/* Updated At Date Range */}
          <div className="filter-group">
            <label>Filter by Updated At</label>
            <div>
              <input
                type="date"
                value={updatedAtStart}
                onChange={(e) => setUpdatedAtStart(e.target.value)}
              />
            </div>
          </div>

          {/* Apply Filters Button */}
          <button className="apply-filters-btn" onClick={applyFilters}>
            Apply Filters
          </button>

          {/* Reset Filters Button */}
          <button className="reset-btn" onClick={resetFilters}>
            Reset Filters
          </button>
        </div>
      )}
    </>
  );
};

export default FilterButton;
