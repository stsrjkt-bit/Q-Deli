import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiClock, FiUser, FiMessageSquare, FiLogOut, FiPlus } from 'react-icons/fi';
import Button from './Button.jsx';

export default function MenuDrawer({ open, onClose }){
  return (
    <aside className={open ? 'drawer open' : 'drawer'} role="dialog" aria-modal>
      <div className="drawer-header">
        <strong>MENU</strong>
        <button aria-label="Close" onClick={onClose} style={{ background:'transparent', border:'none', color:'#fff', cursor:'pointer' }}>
          <FiX size={20} />
        </button>
      </div>
      <div className="content" style={{ paddingTop: 8 }}>
        <Button as={Link} to="/chat" onClick={onClose} className="row" style={{ gap: 8 }}>
          <FiPlus /> New Chat
        </Button>
        <nav className="list" style={{ marginTop: 8 }}>
          <Link to="/chat" className="list-item" onClick={onClose}>
            <FiMessageSquare /> History
          </Link>
          <Link to="/consultant" className="list-item" onClick={onClose}>
            <FiClock /> Availability
          </Link>
          <Link to="/account" className="list-item" onClick={onClose}>
            <FiUser /> Account
          </Link>
        </nav>
        <div style={{ flex: 1 }} />
        <button className="list-item" style={{ background:'transparent', border:'none', color:'#fff', cursor:'pointer' }}>
          <FiLogOut /> Logout
        </button>
      </div>
    </aside>
  );
}
