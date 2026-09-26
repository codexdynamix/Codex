import { DEFAULT_PLATFORM_SETTINGS } from '../../platformDefaults';

// --- Data ---
// NOTE: users/clients are now managed entirely through the CRM leads system (data.leads in App.jsx).
// This array is intentionally empty - do not add static crypto user records here.
export const users = [];

// Transactions are now created per-lead via the Transactions admin section.
export const transactionData = [];

// Activity log entries are generated from real lead actions at runtime.
export const activityLog = [];

export const auditLog = [];

export const cryptoData = [];

// Withdrawals are logged per-lead through the Transactions admin section.
export const withdrawalData = [];

export const userFees = {
  depositFee: 0.01, // 1%
  withdrawalFee: 0.02, // 2%
};

// Per-lead fee overrides, keyed by lead ID. Set via the Fees admin section.
export const clientSpecificFees = {};

// Source of truth: src/platformDefaults.js. Keeping a single canonical
// defaults object means admin Settings, the user landing page, and the
// "Revert to Default Design" button all see the exact same baseline.
export const platformSettings = { ...DEFAULT_PLATFORM_SETTINGS };

export const globalAddressData = [];
export const clientAddressData = [];
export const assetLogos = {};

export const createLogAdminAction = (setAuditLog) => (admin, action, details) => {
  const newLog = { admin, action, details, timestamp: new Date() };
  setAuditLog(prevLogs => [newLog, ...prevLogs]);
};

export const getEffectiveFees = (userId, globalFees, clientSpecificFees) => {
  const clientFees = clientSpecificFees[userId] || {};
  return {
    depositFee: clientFees.depositFee !== undefined ? clientFees.depositFee : globalFees.depositFee,
    withdrawalFee: clientFees.withdrawalFee !== undefined ? clientFees.withdrawalFee : globalFees.withdrawalFee,
  };
};

export const createLogActivity = (setActivityLog) => (userId, type, details) => {
  const newLog = { userId, type, details, timestamp: new Date() };
  setActivityLog(prevLogs => [newLog, ...prevLogs]);
};
