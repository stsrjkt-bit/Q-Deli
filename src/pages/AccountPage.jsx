import React, { useState } from 'react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

export default function AccountPage(){
  const [grade, setGrade] = useState('9');

  return (
    <div className="col" style={{ gap: 16 }}>
      <Card>
        <div className="row" style={{ alignItems:'center' }}>
          <div className="avatar" style={{ width:64, height:64, fontSize:28 }}>🐰</div>
          <div className="col" style={{ marginLeft: 12 }}>
            <strong>Alex Student</strong>
            <span className="muted">alex@example.com</span>
          </div>
        </div>
      </Card>

      <Card title="Profile">
        <div className="col">
          <label className="col">
            <span className="muted" style={{ fontSize: 12 }}>Grade Level</span>
            <select className="input" value={grade} onChange={(e)=>setGrade(e.target.value)}>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
          </label>
          <div>
            <div className="muted" style={{ fontSize: 12, marginBottom: 8 }}>Rank: The Jewel of Honor</div>
            <div className="progress"><span style={{ width: '62%' }} /></div>
          </div>
          <div className="row" style={{ gap: 8 }}>
            {['Mon','Tue','Wed','Thu','Fri'].map((d)=> (
              <button key={d} className="button" style={{ background:'#2a2a2a' }}>{d}</button>
            ))}
          </div>
          <div className="muted">Total usage: 400</div>
          <Button onClick={()=>window.history.back()}>Back</Button>
        </div>
      </Card>
    </div>
  );
}
