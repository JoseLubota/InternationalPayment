// Shared Form Components
import React from 'react';

export function FormGroup({ children, className = '' }) {
  return (
    <div className={`form-group ${className}`}>
      {children}
    </div>
  );
}

export function FormInput({ type = 'text', placeholder, value, onChange, name, required = false, ...props }) {
  return (
    <input
      type={type}
      className="form-input"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      name={name}
      required={required}
      {...props}
    />
  );
}

export function FormLabel({ children }) {
  return (
    <label className="form-label">
      {children}
    </label>
  );
}
