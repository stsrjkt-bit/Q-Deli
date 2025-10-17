import React from 'react';
import Card from '../components/Card.jsx';

export default function ConsultantPage(){
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const slots = ['9:00', '10:00', '11:00', '13:00', '14:00'];

  return (
    <div className="col" style={{ gap: 16 }}>
      <Card title="Weekly Availability">
        <div className="card" style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign:'left', padding:8 }}>Day</th>
                {slots.map((s)=> <th key={s} style={{ textAlign:'left', padding:8 }}>{s}</th>)}
              </tr>
            </thead>
            <tbody>
              {days.map((d)=> (
                <tr key={d}>
                  <td style={{ padding:8 }}>{d}</td>
                  {slots.map((s)=> (
                    <td key={s} style={{ padding:8 }}>
                      <span className="tag">{Math.random() > 0.5 ? 'Open' : 'Full'}</span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
