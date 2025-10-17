import React from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card.jsx';
import InputField from '../components/InputField.jsx';
import Button from '../components/Button.jsx';

export default function LoginPage(){
  const navigate = useNavigate();
  function handleLogin(e){
    e.preventDefault();
    navigate('/chat');
  }
  return (
    <div className="col" style={{ alignItems:'center' }}>
      <Card style={{ width: '100%', maxWidth: 420 }} title="Login">
        <form onSubmit={handleLogin} className="col">
          <InputField label="Email" type="email" placeholder="you@example.com" required />
          <InputField label="Password" type="password" placeholder="••••••••" required />
          <Button type="submit">Continue</Button>
        </form>
      </Card>
    </div>
  );
}
