import React, { useState } from 'react';

export default function MessageReasonPicker({ catalog, categories, selectedCode, onSelect }) {
  const catList = categories || Object.keys(catalog || {});
  const [activeCategory, setActiveCategory] = useState(catList[0] || '');

  const reasons = (catalog && catalog[activeCategory]) || [];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '10px 0' }}>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {catList.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '4px 10px',
              borderRadius: 6,
              fontSize: 11,
              fontWeight: 500,
              cursor: 'pointer',
              background: activeCategory === cat ? 'rgba(240,185,11,0.15)' : '#1E2329',
              color: activeCategory === cat ? '#F0B90B' : '#848E9C',
              border: `1px solid ${activeCategory === cat ? '#F0B90B60' : '#2B3139'}`,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 180, overflowY: 'auto' }}>
        {reasons.map((r) => {
          const isSelected = selectedCode === r.code;
          return (
            <div
              key={r.code}
              onClick={() => onSelect && onSelect(r)}
              style={{
                padding: '8px 12px',
                borderRadius: 6,
                background: isSelected ? 'rgba(240,185,11,0.1)' : '#161A1E',
                border: `1px solid ${isSelected ? '#F0B90B80' : '#2B3139'}`,
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <div style={{ fontSize: 12, fontWeight: 600, color: isSelected ? '#F0B90B' : '#EAECEF' }}>
                {r.label}
              </div>
              <div style={{ fontSize: 11, color: '#848E9C', lineHeight: 1.3 }}>
                {r.message}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
