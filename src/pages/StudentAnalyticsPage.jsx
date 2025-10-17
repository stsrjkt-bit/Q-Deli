import React from 'react';
import Card from '../components/Card.jsx';
import StatCard from '../components/StatCard.jsx';

export default function StudentAnalyticsPage(){
  const stats = [
    { label: 'Tickets', value: 124, tag: '7d' },
    { label: 'Gems', value: 42, tag: '7d' },
    { label: 'Activity', value: '83%', tag: '7d' },
  ];

  const students = [
    { name: 'Alex', usage: 45, status: 'Active' },
    { name: 'Sam', usage: 30, status: 'Active' },
    { name: 'Mia', usage: 12, status: 'Dormant' },
  ];

  return (
    <div className="col" style={{ gap: 16 }}>
      <div className="stat-grid">
        {stats.map((s) => (
          <StatCard key={s.label} label={s.label} value={s.value} tag={s.tag} />
        ))}
      </div>

      <Card title="Student Usage">
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse' }}>
            <thead>
              <tr>
                <th style={{ textAlign:'left', padding:8 }}>Name</th>
                <th style={{ textAlign:'left', padding:8 }}>Usage</th>
                <th style={{ textAlign:'left', padding:8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {students.map((s)=> (
                <tr key={s.name}>
                  <td style={{ padding:8 }}>{s.name}</td>
                  <td style={{ padding:8 }}>{s.usage}</td>
                  <td style={{ padding:8 }}>
                    <span className="tag" style={{ background: s.status==='Active' ? '#1f3a2e' : '#3a1f1f' }}>{s.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card title="Guidance Suggestions">
        <div className="col" style={{ gap: 8 }}>
          <div className="card">Encourage Alex to explore geometry challenges.</div>
          <div className="card">Suggest Mia to revisit Algebra 1 basics.</div>
        </div>
      </Card>
    </div>
  );
}
