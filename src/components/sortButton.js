import React from "react";
import { FaSort, FaTimes } from "react-icons/fa";

const SortButton = ({
  showSort,
  handleSortClick,
  sortCriteria,
  handleSortChange,
}) => {
  return (
    <>
      <button className="icon-btn" onClick={handleSortClick}>
        <FaSort />
      </button>
      {showSort && (
        <div className="sort-options">
          <div className="close-btn" onClick={handleSortClick}>
            <FaTimes />
          </div>
          <select value={sortCriteria} onChange={handleSortChange}>
            <option value="id">ID</option>
            <option value="name">Name</option>
            <option value="category">Category</option>
            <option value="subcategory">Subcategory</option>
            <option value="createdAt">Created At</option>
            <option value="updatedAt">Updated At</option>
            <option value="price">Price</option>
            <option value="salePrice">Sale Price</option>
          </select>
        </div>
      )}
    </>
  );
};

export default SortButton;
