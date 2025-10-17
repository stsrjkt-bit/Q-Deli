import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

export default function WelcomePage(){
  return (
    <div className="col" style={{ alignItems:'center', textAlign:'center', gap: 16 }}>
      <div style={{ fontSize: 64, lineHeight: 1 }}>🐰</div>
      <h1 style={{ margin: 0 }}>Welcome to Q-Deli</h1>
      <p className="muted" style={{ marginTop: -8 }}>Learn faster with guided AI support.</p>
      <div className="col" style={{ gap: 10, width: '100%', maxWidth: 420 }}>
        <Card>
          <div className="col" style={{ gap: 10 }}>
            <Button as={Link} onClick={(e)=>{e.preventDefault(); window.location.href='/login';}}>Sign in with Google</Button>
            <Button as={Link} variant="secondary" onClick={(e)=>{e.preventDefault(); window.location.href='/login';}}>Admin Login</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
