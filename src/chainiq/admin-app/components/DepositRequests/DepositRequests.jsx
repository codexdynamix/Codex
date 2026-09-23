import React, { useState } from 'react';

const seedRequests = [{ id: 'dep-8812', client: 'Maya Carter', asset: 'USDT', amount: '2,500', status: 'Pending' }, { id: 'dep-8811', client: 'Jon Bell', asset: 'BTC', amount: '0.18', status: 'Pending' }];

export default function DepositRequests() {
  const [requests, setRequests] = useState(seedRequests);
  const decide = (id, status) => setRequests((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  return <section style={{ padding: 20, color: '#EAECEF' }}><h3 style={{ margin: 0 }}>Deposit Requests</h3><p style={{ color: '#848E9C' }}>Approve or reject incoming funding requests.</p><table><thead><tr><th>Request</th><th>Client</th><th>Asset</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead><tbody>{requests.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.client}</td><td>{item.asset}</td><td>{item.amount}</td><td>{item.status}</td><td><button onClick={() => decide(item.id, 'Approved')}>Approve</button> <button onClick={() => decide(item.id, 'Rejected')}>Reject</button></td></tr>)}</tbody></table></section>;
}
