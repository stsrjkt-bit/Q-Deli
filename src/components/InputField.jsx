import React from 'react';

export default function InputField({ label, hint, ...props }) {
  return (
    <label className="col" style={{ width: '100%' }}>
      {label && (
        <span className="muted" style={{ fontSize: 12 }}>{label}</span>
      )}
      <input className="input" {...props} />
      {hint && (
        <span className="muted" style={{ fontSize: 12 }}>{hint}</span>
      )}
    </label>
  );
}
