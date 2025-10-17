import React, { useState } from 'react';
import Card from '../components/Card.jsx';
import Button from '../components/Button.jsx';

export default function InviteCodePage(){
  const [code, setCode] = useState('');
  const [generated, setGenerated] = useState([]);

  function generate(){
    const newCode = Math.random().toString(36).slice(2,8).toUpperCase();
    setGenerated((prev) => [newCode, ...prev]);
  }

  return (
    <div className="col" style={{ gap: 16 }}>
      <Card title="Enter Invite Code">
        <div className="row">
          <input className="input" placeholder="ABC123" value={code} onChange={(e)=>setCode(e.target.value)} style={{ maxWidth: 220 }} />
          <Button>Submit</Button>
        </div>
      </Card>

      <Card title="Generate Codes" action={<Button onClick={generate}>Generate</Button>}>
        <div className="col" style={{ gap: 8 }}>
          {generated.length === 0 && <div className="muted">No codes generated yet.</div>}
          {generated.map((c) => (
            <div key={c} className="card" style={{ display:'flex', justifyContent:'space-between' }}>
              <strong>{c}</strong>
              <span className="muted">Unused</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
