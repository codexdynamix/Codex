import React, { useState } from 'react';

const seedRequests = [{ id: 'wd-4418', client: 'Ava Agent', asset: 'USDT', amount: '850', status: 'Queued' }, { id: 'wd-4417', client: 'Theo Leader', asset: 'BTC', amount: '0.04', status: 'Review' }];

export default function WithdrawalQueue() {
  const [requests, setRequests] = useState(seedRequests);
  const update = (id, status) => setRequests((current) => current.map((item) => item.id === id ? { ...item, status } : item));
  return <section style={{ padding: 20, color: '#EAECEF' }}><h3 style={{ margin: 0 }}>Withdrawal Queue</h3><p style={{ color: '#848E9C' }}>Review queued withdrawals and mark them for processing.</p><table><thead><tr><th>Request</th><th>Client</th><th>Asset</th><th>Amount</th><th>Status</th><th>Actions</th></tr></thead><tbody>{requests.map((item) => <tr key={item.id}><td>{item.id}</td><td>{item.client}</td><td>{item.asset}</td><td>{item.amount}</td><td>{item.status}</td><td><button onClick={() => update(item.id, 'Processing')}>Process</button> <button onClick={() => update(item.id, 'Held')}>Hold</button></td></tr>)}</tbody></table></section>;
}
