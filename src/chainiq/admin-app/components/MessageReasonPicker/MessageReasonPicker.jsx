import React, { useState } from 'react';

/**
 * MessageReasonPicker
 * Renders a categorized list of rejection/approval reasons.
 * User clicks a category, then selects a specific reason from that category.
 * Props:
 *   catalog: object with category keys mapping to arrays of {code, label, message}
 *   categories: array of category names
 *   selectedCode: currently selected reason code
 *   onSelect: callback(reason) when a reason is selected
 */
export default function MessageReasonPicker({
  catalog = {},
  categories = [],
  selectedCode = null,
  onSelect = () => {},
}) {
  const [activeCategory, setActiveCategory] = useState(categories[0] || null);

  const activeReasons = activeCategory && catalog[activeCategory] ? catalog[activeCategory] : [];
  const selectedReason = activeReasons.find((r) => r.code === selectedCode);

  return (
    <div style={{ display: 'flex', gap: '16px', minHeight: '200px' }}>
      {/* Category list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        flex: '0 0 140px',
        borderRight: '1px solid rgba(255,255,255,0.08)',
        paddingRight: '12px',
      }}>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '8px 12px',
              borderRadius: '6px',
              border: 'none',
              background: activeCategory === cat
                ? 'rgba(240,185,11,.15)'
                : 'transparent',
              color: activeCategory === cat ? '#F0B90B' : '#B7BDC6',
              textAlign: 'left',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: activeCategory === cat ? 600 : 500,
              transition: 'all 0.15s ease',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Reasons list */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '6px',
        flex: 1,
        minWidth: 0,
      }}>
        {activeReasons.length === 0 ? (
          <div style={{ color: '#848E9C', fontSize: '0.85rem' }}>
            No reasons in this category.
          </div>
        ) : (
          activeReasons.map((reason) => (
            <button
              key={reason.code}
              onClick={() => onSelect(reason)}
              style={{
                padding: '10px 12px',
                borderRadius: '6px',
                border: selectedCode === reason.code
                  ? '1px solid #F0B90B'
                  : '1px solid rgba(255,255,255,0.08)',
                background: selectedCode === reason.code
                  ? 'rgba(240,185,11,.08)'
                  : 'transparent',
                color: selectedCode === reason.code ? '#F0B90B' : '#EAECEF',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: selectedCode === reason.code ? 600 : 500,
                transition: 'all 0.15s ease',
                lineHeight: 1.3,
              }}
            >
              <div style={{ fontWeight: 600, marginBottom: '2px' }}>{reason.label}</div>
              <div style={{ fontSize: '0.75rem', opacity: 0.7 }}>{reason.code}</div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
