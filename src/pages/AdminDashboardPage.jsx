import React from 'react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';
import { Link } from 'react-router-dom';

export default function AdminDashboardPage(){
  const menus = [
    { to:'/analytics', label:'Analytics' },
    { to:'/consultant', label:'Weekly Availability' },
    { to:'/invite', label:'Invite Codes' },
  ];

  return (
    <div className="col" style={{ gap: 16 }}>
      <Card title="Access Codes" action={<Button as={Link} to="/invite">Generate</Button>}>
        Manage invite codes for classes and students.
      </Card>

      <Card title="Admin Menu">
        <div className="list">
          {menus.map((m)=> (
            <Link key={m.to} to={m.to} className="list-item">{m.label}</Link>
          ))}
        </div>
      </Card>

      <div style={{ marginTop: 'auto' }}>
        <Button variant="secondary" style={{ width:'100%', background:'#2a2a2a' }}>Logout</Button>
      </div>
    </div>
  );
}
