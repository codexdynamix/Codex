import React, { useEffect, useState } from 'react';
import SignupRequests from './SignupRequests/SignupRequests.jsx';
import Notifications from './Notifications/Notifications.jsx';
import SecurityRequests from './SecurityRequests/SecurityRequests.jsx';
import { DataContext, NotificationContext } from '../shared';
import { getStaffCapabilities } from '../adminApi';

const TOOLS = [
  ['registrations', 'Registrations', SignupRequests],
  ['notifications', 'Notifications', Notifications],
  ['security', 'Security', SecurityRequests],
];

export default function ReactCapabilityWorkspace({
  data,
  currentUser,
  showNotification,
  activeTab,
  onActiveChange,
  nativeTabKeys = [],
  fallbackTab,
  excludeTools = [],
  showPanel = true,
}) {
  const [capabilities, setCapabilities] = useState({});
  const [internalActive, setInternalActive] = useState('');
  const [capabilitiesLoaded, setCapabilitiesLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setCapabilitiesLoaded(false);
    Promise.resolve(getStaffCapabilities(currentUser?.id))
      .then((payload) => {
        if (cancelled) return;
        const next = payload?.capabilities || {
          registrations: true,
          notifications: true,
          security: true,
        };
        setCapabilities(next);
        const first = TOOLS.find(([key]) => next[key]);
        setInternalActive(first?.[0] || '');
        setCapabilitiesLoaded(true);
      })
      .catch(() => {
        if (!cancelled) setCapabilitiesLoaded(true);
      });
    return () => { cancelled = true; };
  }, [currentUser?.id]);

  const visibleTools = TOOLS.filter(([key]) => capabilities[key] && !excludeTools.includes(key));
  const selectedKey = activeTab === undefined ? internalActive : activeTab;
  const current = visibleTools.find(([key]) => key === selectedKey);

  useEffect(() => {
    if (!capabilitiesLoaded || activeTab === undefined || nativeTabKeys.includes(activeTab)) return;
    if (!visibleTools.some(([key]) => key === activeTab) && fallbackTab) {
      onActiveChange?.(fallbackTab);
    }
  }, [activeTab, capabilitiesLoaded, fallbackTab, nativeTabKeys, onActiveChange, visibleTools]);

  if (!visibleTools.length) return null;
  const Component = current?.[2];
  const props = current?.[0] === 'registrations' ? { data, showNotification } : current?.[0] === 'security' ? { showNotification } : {};

  const scopedClients = data.leads || [];
  const contextValue = {
    currentUser,
    clientUsers: scopedClients,
    leads: scopedClients, setLeads: () => {},
    users: scopedClients, setUsers: () => {},
    transactionData: [], setTransactionData: () => {}, activityLog: [], setActivityLog: () => {},
    logAdminAction: () => {}, logActivity: () => {},
  };

  return (
    <DataContext.Provider value={contextValue}>
      <NotificationContext.Provider value={showNotification || (() => {})}>
        <section className="aax-react-capability-workspace">
          <div className="aax-super-admin-header aax-role-panel-header aax-react-capability-header">
            <nav className="aax-super-admin-tabs aax-react-capability-tabs" aria-label="Granted tools">
              {visibleTools.map(([key, label]) => (
                <button key={key} type="button" className={`aax-super-admin-tab-btn ${selectedKey === key ? 'aax-active' : ''}`} onClick={() => { setInternalActive(key); onActiveChange?.(key); }}>
                  {label}
                </button>
              ))}
            </nav>
          </div>
          {showPanel && current && <div className="aax-react-capability-panel"><Component {...props} /></div>}
        </section>
      </NotificationContext.Provider>
    </DataContext.Provider>
  );
}
