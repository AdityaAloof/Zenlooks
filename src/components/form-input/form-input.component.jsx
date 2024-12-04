// src/components/form-input/form-input.component.jsx
import React from 'react';

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <div className="group">
    {label ? (
      <label className="form-input-label">
        {label}
      </label>
    ) : null}
    <input className="form-input" onChange={handleChange} {...otherProps} />
  </div>
);

export default FormInput;
