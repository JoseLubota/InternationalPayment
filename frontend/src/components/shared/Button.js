// Shared Button Components
import React from 'react';
import { Link } from 'react-router-dom';

export function Button({ children, type = 'button', className = '', onClick, ...props }) {
  return (
    <button type={type} className={`btn ${className}`} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export function PrimaryButton({ children, ...props }) {
  return (
    <Button className="btn-primary" {...props}>
      {children}
    </Button>
  );
}

export function SecondaryButton({ children, ...props }) {
  return (
    <Button className="btn-secondary" {...props}>
      {children}
    </Button>
  );
}

export function LinkButton({ to, children, className = '', ...props }) {
  return (
    <Button className={className} {...props}>
      <Link to={to} style={{ textDecoration: 'none', color: 'inherit' }}>
        {children}
      </Link>
    </Button>
  );
}
