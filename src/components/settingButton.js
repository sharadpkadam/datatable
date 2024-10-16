import React from 'react';
import { FaCog } from 'react-icons/fa';

const SettingsButton = ({ onClick }) => {
  return (
    <button className="icon-btn" onClick={onClick}>
      <FaCog />
    </button>
  );
};

export default SettingsButton;
