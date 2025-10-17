import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function LoginForm({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { email };
    if (typeof onLogin === 'function') {
      onLogin(payload);
    }
    navigate('/home');
  }

  return (
    <div style={{ display:'grid', gap:12, padding:16, maxWidth:400, margin:'40px auto' }}>
      <h1 style={{ margin:0 }}>Q-Deli Login</h1>
      <form onSubmit={handleSubmit} style={{ display:'grid', gap:10 }}>
        <label style={{ display:'grid', gap:6 }}>
          <span>Email</span>
          <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="you@example.com" required />
        </label>
        <label style={{ display:'grid', gap:6 }}>
          <span>Password</span>
          <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="••••••••" required />
        </label>
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
}

LoginForm.propTypes = {
  onLogin: PropTypes.func,
};

export default LoginForm;
