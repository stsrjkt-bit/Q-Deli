import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Navigation({ userName }) {
  return (
    <nav style={{ display:'flex', alignItems:'center', gap:12, padding:12, borderBottom:'1px solid #333' }}>
      <strong style={{ marginRight:'auto' }}>Q-Deli</strong>
      {userName && <span>Hi, {userName}</span>}
      <Link to="/home">Home</Link>
      <Link to="/answer">Answer</Link>
      <Link to="/profile">Profile</Link>
    </nav>
  );
}

Navigation.propTypes = {
  userName: PropTypes.string,
};

export default Navigation;
