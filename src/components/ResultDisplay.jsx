import React from 'react';

/**
 * Display component for AI answer text.
 * @param {{ text: string }} props
 * @returns {JSX.Element}
 */
export default function ResultDisplay({ text }) {
  if (!text) return null;
  return (
    <div className="card">
      <div className="section-title">回答</div>
      <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>{text}</div>
    </div>
  );
}
