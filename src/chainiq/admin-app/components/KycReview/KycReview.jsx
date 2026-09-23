import React, { useMemo, useState } from 'react';

const seedCases = [
  { id: 'kyc-2204', name: 'Maya Carter', country: 'GB', submitted: 'Today', status: 'Pending' },
  { id: 'kyc-2203', name: 'Jon Bell', country: 'DE', submitted: 'Yesterday', status: 'Needs information' },
];

export default function KycReview() {
  const [cases, setCases] = useState(seedCases);
  const [filter, setFilter] = useState('All');
  const visibleCases = useMemo(() => cases.filter((item) => filter === 'All' || item.status === filter), [cases, filter]);
  const updateStatus = (id, status) => setCases((current) => current.map((item) => item.id === id ? { ...item, status } : item));

  return <section style={{ padding: 20, color: '#EAECEF' }}>
    <h3 style={{ margin: 0 }}>KYC Review</h3><p style={{ color: '#848E9C' }}>Review identity submissions and record a decision.</p>
    <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>{['All', 'Pending', 'Needs information', 'Approved', 'Rejected'].map((item) => <button key={item} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
    <table><thead><tr><th>Case</th><th>Applicant</th><th>Country</th><th>Submitted</th><th>Status</th><th>Decision</th></tr></thead><tbody>
      {visibleCases.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.name}</td><td>{item.country}</td><td>{item.submitted}</td><td>{item.status}</td><td><button onClick={() => updateStatus(item.id, 'Approved')}>Approve</button> <button onClick={() => updateStatus(item.id, 'Rejected')}>Reject</button></td></tr>)}
    </tbody></table>
  </section>;
}
