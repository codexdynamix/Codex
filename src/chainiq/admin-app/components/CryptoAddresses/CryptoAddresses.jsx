import React, { useState, useEffect, useContext } from 'react';
import { DataContext } from '../../shared';
import { listCryptoAddresses } from '../../adminApi';

export default function CryptoAddresses() {
  const { data } = useContext(DataContext);
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const result = await listCryptoAddresses();
        const merged = [...(result.global || []), ...(result.client || [])];
        setAddresses(merged);
      } catch (err) {
        console.error('Failed to load crypto addresses:', err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#848E9C' }}>
        Loading crypto addresses...
      </div>
    );
  }

  if (!addresses || addresses.length === 0) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#848E9C' }}>
        No crypto addresses configured.
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h3 style={{ color: '#EAECEF', marginBottom: '16px' }}>Crypto Addresses</h3>
      <div style={{
        overflowX: 'auto',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '8px',
      }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.85rem',
          color: '#EAECEF',
        }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#B7BDC6' }}>Asset</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#B7BDC6' }}>Network</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#B7BDC6' }}>Address</th>
              <th style={{ padding: '12px', textAlign: 'left', fontWeight: 600, color: '#B7BDC6' }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {addresses.map((addr, idx) => (
              <tr key={addr.id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '12px', fontWeight: 600, color: '#F0B90B' }}>{addr.asset || '—'}</td>
                <td style={{ padding: '12px', color: '#B7BDC6' }}>{addr.network || '—'}</td>
                <td style={{
                  padding: '12px',
                  color: '#B7BDC6',
                  fontFamily: 'monospace',
                  fontSize: '0.8rem',
                  maxWidth: '300px',
                  wordBreak: 'break-all',
                }}>
                  {addr.address || '—'}
                </td>
                <td style={{ padding: '12px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '2px 8px',
                    borderRadius: '9999px',
                    fontSize: '0.72rem',
                    fontWeight: 600,
                    background: (addr.status || '').toLowerCase() === 'active'
                      ? 'rgba(14,203,129,.15)'
                      : 'rgba(240,185,11,.15)',
                    color: (addr.status || '').toLowerCase() === 'active' ? '#0ECB81' : '#F0B90B',
                  }}>
                    {addr.status || 'Unknown'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
