import React from 'react';
import { FiMenu } from 'react-icons/fi';

export default function Header({ onMenuClick }){
  return (
    <header className="header">
      <button aria-label="Open Menu" onClick={onMenuClick} className="row" style={{ background:'transparent', border:'none', color:'#fff', cursor:'pointer' }}>
        <FiMenu size={22} />
      </button>
      <div className="header-title">Q-Deli</div>
      <div style={{ width: 22 }} />
    </header>
  );
}
