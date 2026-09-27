// Clean client portal data layer for Codex Dynamics CRM
// Stripped of crypto, trading, credit cards, and backend databases.

const CLIENT_TOKEN_KEY = "codex_client_token";
const CLIENT_USER_KEY = "codex_client_user";

export function readClientToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CLIENT_TOKEN_KEY) || sessionStorage.getItem(CLIENT_TOKEN_KEY) || "demo_token";
}

export function clearClientToken() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CLIENT_TOKEN_KEY);
  sessionStorage.removeItem(CLIENT_TOKEN_KEY);
  localStorage.removeItem(CLIENT_USER_KEY);
}

export function setClientToken(token) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CLIENT_TOKEN_KEY, token);
}

const defaultClientUser = {
  id: "client_codex_1",
  name: "Client Account",
  email: "client@codexdynamics.com",
  company: "Codex Dynamics Client",
  role: "client",
  status: "Active",
  kycStatus: "Active",
  createdAt: new Date().toISOString(),
};

// authLogin: NO PASSWORD NEEDED! Entering any email or empty logs in immediately.
export async function authLogin(email, _password) {
  const user = {
    ...defaultClientUser,
    email: email?.trim() || defaultClientUser.email,
    name: email?.split("@")[0]?.replace(/[._]/g, " ") || defaultClientUser.name,
  };
  if (typeof window !== "undefined") {
    localStorage.setItem(CLIENT_TOKEN_KEY, "client_active_session");
    localStorage.setItem(CLIENT_USER_KEY, JSON.stringify(user));
  }
  return user;
}

export async function authMe() {
  if (typeof window === "undefined") return defaultClientUser;
  try {
    const stored = localStorage.getItem(CLIENT_USER_KEY);
    if (stored) return JSON.parse(stored);
  } catch (_err) {
    // ignore parse error and return default
  }
  return defaultClientUser;
}

export async function getLead(id) {
  const me = await authMe();
  return {
    ...me,
    id: id || me.id,
    clientPassword: "",
  };
}

let inMemoryClientMessages = [
  { id: "msg_1", text: "Welcome to your Codex Dynamics workspace. Your team is ready to assist.", sender: "support", createdAt: new Date().toISOString() },
];

export async function getClientMessages() {
  return { messages: [...inMemoryClientMessages] };
}

export async function sendClientMessage(text) {
  const message = {
    id: `msg_${Date.now()}`,
    text: String(text).trim(),
    sender: "client",
    createdAt: new Date().toISOString(),
  };
  inMemoryClientMessages.push(message);
  return { message };
}

export async function getClientWorkspace() {
  return {
    services: ["Websites & web apps", "Brand identity & UI/UX", "CRM & sales infrastructure"],
    projects: [
      { id: "p1", name: "Codex Dynamics Agency Platform", status: "Active", progress: 85 },
    ],
    requests: [],
  };
}

export async function getKycStatus() {
  return { status: "Active", verified: true };
}

export async function getTransactionsPage(_opts = {}) {
  // Free of credit cards, crypto addresses, and trading balances
  return {
    transactions: [
      { id: "inv_101", description: "Design & Development - Phase 1", amount: "$3,500.00", date: new Date(Date.now() - 604800000).toISOString(), status: "Completed" },
      { id: "inv_102", description: "Retainer & Dedicated Infrastructure", amount: "$1,200.00", date: new Date(Date.now() - 1209600000).toISOString(), status: "Completed" },
    ],
    total: 2,
  };
}

export async function requestClientService(payload) {
  return { ok: true, payload };
}

export default {
  readClientToken,
  clearClientToken,
  setClientToken,
  authLogin,
  authMe,
  getLead,
  getClientMessages,
  sendClientMessage,
  getClientWorkspace,
  getKycStatus,
  getTransactionsPage,
  requestClientService,
};
