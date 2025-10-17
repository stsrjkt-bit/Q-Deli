import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Top navigation bar component.
 * @returns {JSX.Element}
 */
export default function Navigation() {
  return (
    <nav className="navbar">
      <div>
        <NavLink to="/" end>Q-Deli</NavLink>
      </div>
      <div>
        <NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>Home</NavLink>
        <NavLink to="/answer" className={({ isActive }) => isActive ? 'active' : ''}>Teach</NavLink>
        <NavLink to="/profile" className={({ isActive }) => isActive ? 'active' : ''}>Profile</NavLink>
      </div>
    </nav>
  );
}
