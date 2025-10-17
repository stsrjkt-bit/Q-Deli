import React from 'react';

export default function Card({ title, action, children, footer, style }) {
  return (
    <section className="card" style={style}>
      {(title || action) && (
        <div className="space-between" style={{ marginBottom: 8 }}>
          {title && <h3 style={{ margin: 0 }}>{title}</h3>}
          {action}
        </div>
      )}
      <div>
        {children}
      </div>
      {footer && (
        <div style={{ marginTop: 12 }}>
          {footer}
        </div>
      )}
    </section>
  );
}
