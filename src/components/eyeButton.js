// EyeButton.js
import React from 'react';
import { FaEye, FaTimes } from 'react-icons/fa';

const EyeButton = ({
  showEye,
  toggleEye,
  columns,
  columnVisibility,
  toggleColumnVisibility,
}) => {
  return (
    <div className="column-options-dropdown">
      <button className="icon-btn" onClick={toggleEye}>
        <FaEye />
      </button>
      {showEye && (
        <div className="column-options">
          <div className="close-btn" onClick={toggleEye}>
            <FaTimes />
          </div>
          {columns.map((column, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  checked={columnVisibility[index]}
                  onChange={() => toggleColumnVisibility(index)}
                />
                {column.Header}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EyeButton;
