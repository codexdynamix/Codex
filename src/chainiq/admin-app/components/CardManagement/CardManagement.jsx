import React, { useMemo, useState } from 'react';

const seedCards = [
  { id: 'card-1042', holder: 'Ava Agent', type: 'Virtual', last4: '4821', status: 'Active', limit: '$5,000' },
  { id: 'card-1041', holder: 'Theo Leader', type: 'Physical', last4: '9017', status: 'Pending', limit: '$10,000' },
];

export default function CardManagement() {
  const [cards, setCards] = useState(seedCards);
  const [query, setQuery] = useState('');
  const visibleCards = useMemo(() => cards.filter((card) => `${card.holder} ${card.last4}`.toLowerCase().includes(query.toLowerCase())), [cards, query]);

  return <section style={{ padding: 20, color: '#EAECEF' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, alignItems: 'center', marginBottom: 16 }}>
      <div><h3 style={{ margin: 0 }}>Card Management</h3><p style={{ color: '#848E9C', margin: '6px 0 0' }}>Issue, review, and suspend platform cards.</p></div>
      <button onClick={() => setCards((current) => [{ id: `card-${Date.now()}`, holder: 'New cardholder', type: 'Virtual', last4: '0000', status: 'Pending', limit: '$1,000' }, ...current])}>Issue card</button>
    </div>
    <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search cardholder or last four" style={{ width: '100%', maxWidth: 360, marginBottom: 14 }} />
    <table><thead><tr><th>Card</th><th>Holder</th><th>Type</th><th>Status</th><th>Limit</th><th /></tr></thead><tbody>
      {visibleCards.map((card) => (
        <tr key={card.id}>
          <td>•••• {card.last4}</td><td>{card.holder}</td><td>{card.type}</td><td>{card.status}</td><td>{card.limit}</td>
          <td><button onClick={() => setCards((current) => current.map((item) => item.id === card.id
            ? { ...item, status: item.status === 'Suspended' ? 'Active' : 'Suspended' }
            : item))}>{card.status === 'Suspended' ? 'Activate' : 'Suspend'}</button></td>
        </tr>
      ))}
    </tbody></table>
  </section>;
}
