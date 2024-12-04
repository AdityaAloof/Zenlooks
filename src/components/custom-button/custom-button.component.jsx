// src/components/custom-button/custom-button.component.jsx
import React from 'react';

const CustomButton = ({ children, ...otherProps }) => (
  <button className="custom-button" {...otherProps}>
    {children}
  </button>
);

export default CustomButton;
