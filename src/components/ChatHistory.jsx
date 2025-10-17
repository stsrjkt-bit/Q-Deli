import React from 'react';

export default function ChatHistory({ items = [], onSelect }){
  if (!items.length) {
    return (
      <div className="card">
        <div className="muted">No chat history yet.</div>
      </div>
    );
  }
  return (
    <div className="card">
      <ul style={{ listStyle:'none', margin:0, padding:0 }}>
        {items.map((it) => (
          <li key={it.id} className="list-item" onClick={() => onSelect?.(it)} style={{ cursor:'pointer' }}>
            <div style={{ fontWeight: 700 }}>{it.title}</div>
            <div className="muted" style={{ fontSize: 12 }}>{it.date}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
