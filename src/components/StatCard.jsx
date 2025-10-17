import React from 'react';

export default function StatCard({ label, value, delta, tag }){
  return (
    <div className="stat-card">
      <div className="space-between" style={{ marginBottom: 6 }}>
        <span className="muted" style={{ fontSize: 12 }}>{label}</span>
        {tag && <span className="tag">{tag}</span>}
      </div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>{value}</div>
      {delta && (
        <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>{delta}</div>
      )}
    </div>
  );
}
