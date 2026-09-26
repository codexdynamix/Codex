import React, { useState, useEffect, useContext, useCallback } from 'react';
import { DataContext, NotificationContext } from '../../shared';
import { injectBalance, getLeadBalanceHistory, deleteBalanceHistoryEntryApi, clearBalanceHistoryApi, resetAllBalancesApi, searchAdminLeads } from '../../adminApi';
import { SearchAutocomplete } from '../UserChrome';

const Balances = () => {
  const { leads, setLeads, logAdminAction } = useContext(DataContext);
  const showNotification = useContext(NotificationContext);

  const [selectedLead, setSelectedLead] = useState(null);
  const [leadSearch, setLeadSearch] = useState('');
  const [balanceAmount, setBalanceAmount] = useState('');

  // Authoritative balance + audit-log timeline for the currently selected lead.
  // Loaded from /api/admin/users/{id}/balance-history whenever the operator
  // selects a lead and after every balance adjustment.
  const [leadBalanceHistory, setLeadBalanceHistory] = useState([]);
  const [leadBalanceFresh, setLeadBalanceFresh]     = useState(null);
  const [leadBalanceDisplay, setLeadBalanceDisplay] = useState({});
  const [historyLoading, setHistoryLoading]         = useState(false);
  const [historyError, setHistoryError]             = useState(null);
  const [selectedHistoryIds, setSelectedHistoryIds] = useState(new Set());
  const [deletingHistory, setDeletingHistory]       = useState(false);
  const [resettingAll, setResettingAll]             = useState(false);

  const baseLead = selectedLead ? leads.find(lead => lead.id === selectedLead.id) || selectedLead : null;
  const currentSelectedLead = baseLead ? {
    ...baseLead,
    balance:        leadBalanceFresh   || baseLead.balance   || null,
    balances:       Object.keys(leadBalanceDisplay).length > 0 ? leadBalanceDisplay : (baseLead.balances || {}),
    balanceHistory: leadBalanceHistory,
  } : null;

  const currentFiatBalance = currentSelectedLead
    ? (Number.isFinite(Number(currentSelectedLead.balance?.fiat_minor))
      ? Number(currentSelectedLead.balance.fiat_minor) / 100
      : Number(currentSelectedLead.balances?.usd || 0))
    : 0;
  const currentFiatCurrency = currentSelectedLead?.balances?.fiatCurrency
    || currentSelectedLead?.balance?.fiat_currency
    || 'USD';

  const refreshBalanceHistory = useCallback(async (leadId) => {
    if (!leadId) return;
    setHistoryLoading(true);
    setHistoryError(null);
    try {
      const data = await getLeadBalanceHistory(leadId);
      setLeadBalanceFresh(data.balance || null);
      setLeadBalanceDisplay(data.balances || {});
      setLeadBalanceHistory(data.history || []);
      setLeads(prevLeads => prevLeads.map(lead =>
        lead.id === leadId
          ? { ...lead, balance: data.balance || lead.balance, balances: data.balances || lead.balances }
          : lead
      ));
    } catch (error) {
      console.error('[Balances] failed to load balance history:', error);
      setHistoryError(error?.message || 'Could not load balance history.');
    } finally {
      setHistoryLoading(false);
    }
  }, [setLeads]);

  const handleLeadSelect = (lead) => {
    setSelectedLead(lead);
    setLeadSearch(lead.name || lead.email || lead.phone || lead.id || '');
    setLeadBalanceFresh(null);
    setLeadBalanceDisplay({});
    setLeadBalanceHistory([]);
    setHistoryError(null);
    refreshBalanceHistory(lead.id);
  };

  useEffect(() => {
    if (!selectedLead) {
      setLeadBalanceFresh(null);
      setLeadBalanceDisplay({});
      setLeadBalanceHistory([]);
      setHistoryError(null);
    }
  }, [selectedLead]);

  const handleSetBalance = async (e) => {
    e.preventDefault();
    if (!currentSelectedLead || !balanceAmount) {
      showNotification('Please enter a USD amount.', 'error');
      return;
    }

    const amount = parseFloat(balanceAmount);
    if (isNaN(amount) || amount < 0) {
      showNotification('Invalid USD amount.', 'error');
      return;
    }

    const amountMinor = Math.round(amount * 100);
    if (amountMinor <= 0) {
      showNotification('Enter an amount greater than zero.', 'error');
      return;
    }

    try {
      const result = await injectBalance(currentSelectedLead.id, {
        asset: 'USD',
        amount_minor: amountMinor,
        type: 'Adjustment',
        description: `Admin added $${amount.toFixed(2)} to account balance`,
      });

      const freshBalances = result?.balances ?? {};
      setLeads(prevLeads => prevLeads.map(lead =>
        lead.id === currentSelectedLead.id
          ? { ...lead, balance: { ...(lead.balance || {}), ...freshBalances } }
          : lead
      ));
      refreshBalanceHistory(currentSelectedLead.id);

      logAdminAction('Admin', 'Add USD Balance', `Added $${amount.toFixed(2)} USD to ${currentSelectedLead.name}'s account balance.`);
      showNotification(`Added $${amount.toFixed(2)} USD to ${currentSelectedLead.name}'s balance.`, 'success');
      setBalanceAmount('');
    } catch (error) {
      console.error('[Balances] balance injection failed:', error);
      const msg = error?.message || 'Balance could not be saved to backend.';
      showNotification(msg, 'error');
    }
  };

  const handleDeleteHistoryEntry = useCallback(async (leadId, entryId) => {
    try {
      await deleteBalanceHistoryEntryApi(leadId, entryId);
      setSelectedHistoryIds(prev => { const next = new Set(prev); next.delete(entryId); return next; });
      refreshBalanceHistory(leadId);
      showNotification('History entry deleted.', 'success');
    } catch (err) {
      showNotification(err?.message || 'Failed to delete entry.', 'error');
    }
  }, [refreshBalanceHistory, showNotification]);

  const handleBulkDeleteHistory = useCallback(async (leadId) => {
    if (!selectedHistoryIds.size) return;
    setDeletingHistory(true);
    const count = selectedHistoryIds.size;
    try {
      await Promise.all([...selectedHistoryIds].map(id => deleteBalanceHistoryEntryApi(leadId, id)));
      setSelectedHistoryIds(new Set());
      refreshBalanceHistory(leadId);
      showNotification(`${count} entr${count === 1 ? 'y' : 'ies'} deleted.`, 'success');
    } catch (err) {
      showNotification(err?.message || 'Failed to delete entries.', 'error');
    } finally {
      setDeletingHistory(false);
    }
  }, [selectedHistoryIds, refreshBalanceHistory, showNotification]);

  const handleClearAllHistory = useCallback(async (leadId) => {
    if (!window.confirm('Delete ALL balance history for this lead? This cannot be undone.')) return;
    setDeletingHistory(true);
    try {
      await clearBalanceHistoryApi(leadId);
      setSelectedHistoryIds(new Set());
      refreshBalanceHistory(leadId);
      showNotification('All balance history cleared.', 'success');
    } catch (err) {
      showNotification(err?.message || 'Failed to clear history.', 'error');
    } finally {
      setDeletingHistory(false);
    }
  }, [refreshBalanceHistory, showNotification]);

  const handleResetAllBalances = useCallback(async (leadId, leadName) => {
    if (!window.confirm(`Reset all balances to zero for ${leadName}? This cannot be undone.`)) return;
    setResettingAll(true);
    try {
      await resetAllBalancesApi(leadId);
      showNotification(`All balances reset to zero for ${leadName}.`, 'success');
      setLeads(prev => prev.map(l => l.id === leadId ? { ...l, balances: {} } : l));
      refreshBalanceHistory(leadId);
    } catch (err) {
      showNotification(err?.message || 'Failed to reset balances.', 'error');
    } finally {
      setResettingAll(false);
    }
  }, [refreshBalanceHistory, setLeads, showNotification]);

  const balanceFieldStyle = {
    width: '100%',
    margin: 0,
    padding: '12px 14px',
    minHeight: '44px',
    boxSizing: 'border-box',
    border: '1px solid #444A55',
    borderRadius: '6px',
    background: '#2B3038',
    color: '#EAECEF',
    fontSize: '14px',
    lineHeight: '1.4',
  };
  const balanceFormGroupStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: 0,
    width: '100%',
  };
  const balanceLabelStyle = {
    display: 'block',
    margin: '0 0 8px',
    color: '#848E9C',
    fontSize: '12px',
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: '1.4',
  };
  const balanceActionsStyle = {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: '12px',
    paddingTop: '4px',
  };
  const balanceActionButtonStyle = {
    margin: 0,
    padding: '10px 16px',
    minHeight: '38px',
    borderRadius: '6px',
    fontWeight: 600,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    lineHeight: 1.2,
    border: '1px solid rgba(240, 185, 11, 0.45)',
    boxSizing: 'border-box',
    background: '#F0B90B',
    color: '#1A1E2A',
    boxShadow: '0 1px 2px rgba(240, 185, 11, 0.18)',
  };
  const selectedBalanceHistory = currentSelectedLead?.balanceHistory || [];

  return (
    <div id="balances-section" className="aax-admin-section aax-balances-page">
      <h2>Balances Management</h2>
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '16px', color: '#848E9C' }}>Manage Client Account Balances</h3>
         <SearchAutocomplete
           value={leadSearch}
           onChange={(value) => {
             setLeadSearch(value);
             if (selectedLead && value !== (selectedLead.name || selectedLead.email || selectedLead.phone || selectedLead.id)) {
               setSelectedLead(null);
             }
           }}
           onSelect={(suggestion) => handleLeadSelect(suggestion?.lead || suggestion)}
           placeholder="Search name, email, phone or ID..."
           className="admin-input"
           style={{ width: '100%', marginBottom: 16 }}
           fetchSuggestions={searchAdminLeads}
           buildSuggestions={(query) => {
             const q = query.trim().toLowerCase();
             return (leads || [])
               .filter(lead => [lead.name, lead.firstName, lead.lastName, lead.email, lead.phone, lead.id]
                 .some(value => String(value || '').toLowerCase().includes(q)))
               .map(lead => ({
                 key: lead.id,
                 value: lead.name || lead.email || lead.phone || lead.id,
                 label: lead.name || '(no name)',
                 meta: [lead.email, lead.phone, lead.id].filter(Boolean).join(' · '),
                 lead,
               }));
           }}
           maxSuggestions={15}
           inputProps={{
             id: 'lead-balance-search',
             'aria-label': 'Select lead for account balance management',
           }}
         />
        {currentSelectedLead && (
          <div className="aax-fiat-balance-summary" aria-label={`${currentFiatCurrency} balance`}>
            <div>
              <span className="aax-fiat-balance-label">{currentFiatCurrency} Balance</span>
              <span className="aax-fiat-balance-subtitle">{currentSelectedLead.name}</span>
            </div>
            <strong>{currentFiatBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currentFiatCurrency}</strong>
          </div>
        )}
        {currentSelectedLead && (
          <div style={{ marginBottom: '16px', padding: '16px', background: '#363B44', border: '1px solid #444A55', borderRadius: '10px' }}>
            <div style={{ fontWeight: 700, marginBottom: '12px', color: '#f3ba2f', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 }}>
              <span>Current USD balance for {currentSelectedLead.name}</span>
              <button
                onClick={() => handleResetAllBalances(currentSelectedLead.id, currentSelectedLead.name)}
                disabled={resettingAll}
                style={{ fontSize: '0.78rem', padding: '4px 12px', background: 'rgba(246,70,93,0.12)', border: '1px solid rgba(246,70,93,0.4)', borderRadius: 6, color: '#F6465D', cursor: resettingAll ? 'not-allowed' : 'pointer', fontWeight: 600 }}
                title="Reset USD balance to zero"
              >
                {resettingAll ? '...resetting' : '⚠ Reset USD to Zero'}
              </button>
            </div>
            <div style={{ padding: '12px 14px', background: '#2B3038', border: '1px solid #444A55', borderRadius: '8px', marginBottom: '14px', color: '#EAECEF' }}>
              <div style={{ fontSize: '0.8rem', color: '#9fb1d1' }}>USD balance</div>
              <div style={{ fontWeight: 700, fontSize: '1.3rem' }}>
                {currentFiatBalance.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {currentFiatCurrency}
              </div>
            </div>
            <div style={{ fontWeight: 700, marginBottom: '8px', color: '#848E9C', display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <span>Balance update history ({selectedBalanceHistory.length})</span>
              {historyLoading && <span style={{ fontSize: '0.8rem', color: '#9fb1d1' }}> / refreshing...</span>}
              {historyError && <span style={{ fontSize: '0.8rem', color: '#F6465D' }}> / {historyError}</span>}
              <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px', alignItems: 'center' }}>
                {selectedHistoryIds.size > 0 && (
                  <button onClick={() => handleBulkDeleteHistory(currentSelectedLead.id)} disabled={deletingHistory}
                    style={{ fontSize: '0.75rem', padding: '3px 10px', background: 'rgba(246,70,93,0.15)', border: '1px solid rgba(246,70,93,0.4)', borderRadius: 6, color: '#F6465D', cursor: 'pointer', fontWeight: 600 }}>
                    Delete {selectedHistoryIds.size} selected
                  </button>
                )}
                {selectedBalanceHistory.length > 0 && (
                  <button onClick={() => handleClearAllHistory(currentSelectedLead.id)} disabled={deletingHistory}
                    style={{ fontSize: '0.75rem', padding: '3px 10px', background: 'rgba(246,70,93,0.08)', border: '1px solid #444A55', borderRadius: 6, color: '#9fb1d1', cursor: 'pointer' }}>
                    Clear all
                  </button>
                )}
              </div>
            </div>
            {selectedBalanceHistory.length > 0 ? (
              <div style={{ maxHeight: '260px', overflowY: 'auto', border: '1px solid #444A55', borderRadius: '8px' }}>
                {selectedBalanceHistory.map(entry => {
                  const deltaPositive = (entry.delta || 0) >= 0;
                  const entryId = entry.id || `${entry.date}-${entry.asset || 'USD'}`;
                  const isChecked = selectedHistoryIds.has(entryId);
                  return (
                    <div key={entryId} style={{ display: 'grid', gridTemplateColumns: '24px 1.3fr 1fr 1fr 1fr 28px', gap: '8px', padding: '10px 10px', borderBottom: '1px solid #444A55', color: '#848E9C', alignItems: 'center' }}>
                      <input
                        type="checkbox" checked={isChecked}
                        onChange={e => {
                          const checked = e.target.checked;
                          setSelectedHistoryIds(prev => {
                            const next = new Set(prev);
                            if (checked) {
                              next.add(entryId);
                            } else {
                              next.delete(entryId);
                            }
                            return next;
                          });
                        }}
                        style={{ cursor: 'pointer', accentColor: '#F0B90B' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700 }}>{entry.assetName || entry.asset || 'USD'} <span style={{ fontSize: '0.78rem', color: '#9fb1d1', fontWeight: 400 }}>({entry.txType || 'Adjustment'})</span></div>
                        <div style={{ fontSize: '0.78rem', color: '#9fb1d1' }}>{entry.date ? new Date(entry.date).toLocaleString() : '-'}</div>
                        <div style={{ fontSize: '0.78rem', color: '#9fb1d1' }}>by {entry.actorName || entry.actorRole || entry.actorAdminId || 'admin'}</div>
                      </div>
                      <div style={{ fontSize: '0.9rem' }}>Before: <strong>{Number(entry.previousBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {entry.ticker || 'USD'}</strong></div>
                      <div style={{ fontSize: '0.9rem' }}>After: <strong style={{ color: '#f3ba2f' }}>{Number(entry.newBalance || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {entry.ticker || 'USD'}</strong></div>
                      <div style={{ fontSize: '0.9rem', color: deltaPositive ? '#0ECB81' : '#F6465D' }}>
                        {deltaPositive ? '+' : ''}{Number(entry.delta || 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} {entry.ticker || 'USD'}
                      </div>
                      <button onClick={() => handleDeleteHistoryEntry(currentSelectedLead.id, entryId)}
                        title="Delete entry"
                        style={{ background: 'transparent', border: 'none', color: 'rgba(246,70,93,0.6)', cursor: 'pointer', padding: '2px 4px', borderRadius: 4, fontSize: '0.85rem', lineHeight: 1 }}>
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div style={{ color: '#8c9cb5' }}>{historyLoading ? 'Loading balance history...' : 'No balance updates recorded yet.'}</div>
            )}
          </div>
        )}
        <fieldset id="lead-balance-fieldset" disabled={!selectedLead} style={{ opacity: !selectedLead ? 0.5 : 1, border: 'none', padding: 0, margin: 0 }}>
          <form id="lead-balance-form" onSubmit={handleSetBalance} style={{ background: '#363B44', border: '1px solid #444A55', borderRadius: '10px', padding: 0 }}>
            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
              <div className="admin-form-group" style={balanceFormGroupStyle}>
                <label htmlFor="lead-balance-amount" className="admin-form-label" style={balanceLabelStyle}>USD Amount</label>
                <input
                  type="number"
                  step="any"
                  id="lead-balance-amount"
                  className="admin-input"
                  placeholder="e.g., 500.00"
                  required
                  value={balanceAmount}
                  style={balanceFieldStyle}
                  onChange={(e) => setBalanceAmount(e.target.value)}
                />
              </div>
            </div>
            <div style={{ marginBottom: 0, fontSize: '0.95rem', color: '#b0c1d7' }}>
              Balance adjustments are recorded directly in account USD currency.
            </div>
            <div style={balanceActionsStyle}>
              <button type="submit" className="aax-btn-primary" style={balanceActionButtonStyle}>Add USD Balance</button>
            </div>
            </div>
          </form>
        </fieldset>
      </div>
    </div>
  );
};

export default Balances;
