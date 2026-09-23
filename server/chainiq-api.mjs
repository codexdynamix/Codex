/**
 * Codex Dynamics API for the admin + client frontends.
 * Operational CRM data is stored in the shared Codex Dynamics SQLite database.
 */

import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

import {
  addBacklink,
  addBlogPost,
  addProject,
  addReview,
  addVisitorToLeads as legacyAddVisitorToLeads,
  bulkDeleteEnquiries,
  bulkDeleteLeads,
  bulkDeleteVisitors,
  clearVisitors,
  createLead as legacyCreateLead,
  deleteBacklink,
  deleteBlogPost,
  deleteEnquiry,
  deleteLead as legacyDeleteLead,
  deleteProject,
  deleteReview,
  deleteVisitor,
  deleteChatThread,
  duplicateBlogPost,
  getAllCrmData,
  getBlogPostBySlug,
  getAllLeads as legacyGetAllLeads,
  getChatMessages,
  getChatThreads,
  getPublicContent,
  getDb as legacyGetDb,
  getSetting,
  getSiteConfig,
  markChatThreadRead,
  recordVisitor,
  restoreBackup,
  resetSiteConfig,
  saveSiteConfig,
  sendChatMessage,
  setSetting,
  toggleBlogStatus,
  toggleProjectPublish,
  toggleReviewPublish,
  updateBacklink,
  updateBlogPost,
  updateChatThreadStatus,
  updateEnquiryStatus,
  updateProject,
  updateReview,
  updateLeadNotes as legacyUpdateLeadNotes,
  updateLeadStatus as legacyUpdateLeadStatus,
  recordEnquiry as sharedRecordEnquiry,
  updateAdminPassword,
  verifyAdminCredentials,
} from "./shared-site-db.mjs";
import {
  findChainiqStaffByEmail,
  findChainiqStaffById,
  getChainiqResource,
  getChainiqPlatformSettings,
  insertChainiqOffice,
  insertChainiqStaff,
  insertChainiqTeam,
  listChainiqOffices,
  listChainiqStaff,
  listChainiqTeams,
  updateChainiqPlatformSettings,
  setChainiqResource,
} from "./chainiq-db.mjs";

const CAPS = {
  lead_upload: true,
  create_agent: true,
  trading: true,
  balances: true,
  transactions: true,
  registrations: true,
  notifications: true,
  security: true,
};

const nowIso = () => new Date().toISOString();

function uid(prefix) {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36).slice(-4)}`;
}

function seed() {
  const created = nowIso();
  const office = {
    id: "of_london",
    name: "London",
    manager_id: "adm_om",
    manager_name: "Olivia Manager",
    team_count: 1,
    agent_count: 1,
    lead_count: 3,
    created_at: created,
    deleted_at: null,
  };
  const team = {
    id: "tm_alpha",
    name: "Alpha",
    office_id: office.id,
    leader_id: "adm_tl",
    leader_name: "Theo Leader",
    max_size: 10,
    agent_count: 1,
    lead_count: 3,
    created_at: created,
    deleted_at: null,
  };
  const staff = [
    {
      id: "adm_sa",
      name: "Sam Super",
      email: "sarah.b@example.net",
      password: "admin123",
      role: "Super Admin",
      office_id: null,
      office_name: null,
      team_id: null,
      team_name: null,
      status: "Active",
      last_login_at: created,
      created_at: created,
      lead_count: 0,
      plain_password: "admin123",
      capabilities: { ...CAPS },
    },
    {
      id: "adm_om",
      name: "Olivia Manager",
      email: "kevin.m@example.com",
      password: "manager123",
      role: "Office Manager",
      office_id: office.id,
      office_name: office.name,
      team_id: null,
      team_name: null,
      status: "Active",
      last_login_at: created,
      created_at: created,
      lead_count: 3,
      plain_password: "manager123",
      capabilities: { ...CAPS },
    },
    {
      id: "adm_tl",
      name: "Theo Leader",
      email: "xena.w@example.org",
      password: "leader123",
      role: "Team Leader",
      office_id: office.id,
      office_name: office.name,
      team_id: team.id,
      team_name: team.name,
      status: "Active",
      last_login_at: created,
      created_at: created,
      lead_count: 3,
      plain_password: "leader123",
      capabilities: { ...CAPS },
    },
    {
      id: "adm_ag",
      name: "Ava Agent",
      email: "hannah.h@example.com",
      password: "agent123",
      role: "Agent",
      office_id: office.id,
      office_name: office.name,
      team_id: team.id,
      team_name: team.name,
      status: "Active",
      last_login_at: created,
      created_at: created,
      lead_count: 2,
      plain_password: "agent123",
      capabilities: { ...CAPS },
    },
  ];

  const mkLead = (id, first, last, email, stage, agentId) => ({
    id,
    first_name: first,
    last_name: last,
    name: `${first} ${last}`,
    email,
    phone: "+44 20 7946 0958",
    country: "United Kingdom",
    country_code: "GB",
    stage,
    funnel: "Retail",
    affiliate: "",
    client_password: "client123",
    kyc_status: id === "usr_maya" ? "Approved" : "Not Submitted",
    status: "Active",
    trades_enabled: true,
    cards_enabled: true,
    assigned_office_id: office.id,
    assigned_team_id: team.id,
    assigned_agent_id: agentId,
    assigned_agent_name: agentId ? "Ava Agent" : null,
    assigned_by: "adm_om",
    last_comment_date: created.slice(0, 10),
    registered_date: created.slice(0, 10),
    deleted_at: null,
    created_at: created,
    updated_at: created,
    balance: {
      fiat_minor: id === "usr_maya" ? 1250000 : 0,
      fiat_currency: "USD",
      btc_sat: id === "usr_maya" ? 15000000 : 0,
      eth_wei_e9: 0,
      usdt_minor: id === "usr_maya" ? 420000 : 0,
      card_minor: id === "usr_maya" ? 80000 : 0,
    },
    comment_history: [
      { id: uid("c"), lead_id: id, text: "Intro call completed.", by_name: "Ava Agent", created_at: created },
    ],
    status_history: [
      { id: uid("s"), lead_id: id, from_stage: "New", to_stage: stage, by_name: "Ava Agent", created_at: created },
    ],
    appointments: [],
  });

  const leads = [
    mkLead("usr_maya", "Maya", "Chen", "client@codexdynamics.com", "Deposit", "adm_ag"),
    mkLead("usr_leo", "Leo", "Anders", "leo@example.com", "In Line", "adm_ag"),
    mkLead("usr_nina", "Nina", "Patel", "nina@example.com", "New", null),
  ];

  return {
    offices: [office],
    teams: [team],
    staff,
    leads: [],
    deletedLeads: [],
    deletedOffices: [],
    deletedTeams: [],
    sessions: [],
    notifications: [],
    messages: [],
    transactions: [
      {
        id: "tx_1",
        user_id: "usr_maya",
        type: "deposit",
        asset: "USD",
        amount: 12500,
        status: "completed",
        created_at: created,
        visible: true,
      },
    ],
    cards: [
      {
        id: "card_1",
        user_id: "usr_maya",
        last4: "4242",
        brand: "Codex Dynamics",
        tier: "gold",
        status: "active",
        frozen: false,
        created_at: created,
      },
    ],
    withdrawals: [],
    deposits: [],
    signupRequests: [],
    kyc: [],
    cryptoAddresses: [
      { id: "ca_1", asset: "BTC", network: "Bitcoin", address: "bc1qpreviewaddress000000000000000000", status: "active" },
    ],
    audit: [],
    settings: {
      platformName: "Codex Dynamics",
      platformAbbreviation: "CD",
      cardBrandName: "Codex Dynamics",
      platformYear: "2026",
      supportEmail: "support@codexdynamics.com",
      primaryColor: "#F0B90B",
      secondaryColor: "#1E2026",
      accentColor: "#F0B90B",
      buttonColor: "#F0B90B",
      backgroundColor: "#0a0a0f",
      textColor: "#F9FAFB",
      registrationEnabled: true,
    },
    tokens: new Map(),
  };
}

const store = seed();

function json(status, body) {
  return { status, body };
}

function error(status, code, message) {
  return json(status, { error: code, message });
}

function parseBody(raw) {
  if (!raw) return {};
  try {
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

function publicAdmin(admin) {
  const { password, ...rest } = admin;
  return {
    id: rest.id,
    name: rest.name,
    email: rest.email,
    role: rest.role,
    office_id: rest.office_id,
    team_id: rest.team_id,
    status: rest.status,
    last_login_at: rest.last_login_at,
    capabilities: rest.capabilities || CAPS,
  };
}

function issueToken(kind, profile) {
  const token = `${kind}.${uid("tok")}`;
  store.tokens.set(token, { kind, id: profile.id, at: Date.now() });
  return token;
}

function authAdmin(headers) {
  const header = headers.authorization || headers.Authorization || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const rec = store.tokens.get(token);
  if (!rec || rec.kind !== "admin") return null;
  return findChainiqStaffById(rec.id);
}

function authClient(headers) {
  const header = headers.authorization || headers.Authorization || "";
  const token = header.replace(/^Bearer\s+/i, "").trim();
  if (!token) return null;
  const rec = store.tokens.get(token);
  if (!rec || rec.kind !== "client") return null;
  return readLegacyLeadById(rec.id);
}

function refreshCounts() {
  return null;
}

function clientUser(lead) {
  return {
    id: lead.id,
    name: lead.name,
    first_name: lead.first_name,
    last_name: lead.last_name,
    email: lead.email,
    phone: lead.phone,
    country: lead.country,
    status: lead.status,
    kyc_status: lead.kyc_status,
    trades_enabled: lead.trades_enabled,
    cards_enabled: lead.cards_enabled,
    created_at: lead.created_at,
    avatar_url: null,
    password_changed_at: null,
  };
}

function clientWorkspaceKey(userId) {
  return `client_workspace:${userId}`;
}

function getClientWorkspace(userId) {
  return getChainiqResource(clientWorkspaceKey(userId), {
    services: [], projects: [], files: [], approvals: [], links: [],
    campaigns: [], contracts: [], feedback: [], requests: [],
  });
}

function saveClientWorkspace(userId, workspace) {
  setChainiqResource(clientWorkspaceKey(userId), workspace);
  return workspace;
}

function splitLeadName(name) {
  const source = String(name || "").trim();
  if (!source) return { first_name: "", last_name: "" };
  const parts = source.split(/\s+/);
  if (parts.length <= 1) return { first_name: source, last_name: "" };
  return {
    first_name: parts.shift(),
    last_name: parts.join(" "),
  };
}

function normalizeLegacyLeadStatus(value) {
  const status = String(value || "").trim().toLowerCase();
  const map = {
    new: "New",
    contacted: "In Line",
    qualified: "Deposit",
    proposal: "Deposit",
    won: "Deposit",
    lost: "Not Interested",
    closed: "Deposit",
    rejected: "Not Interested",
    "no answer": "No Answer",
    "didn't register": "Didn't Register",
    "not interested": "Not Interested",
    "low potential": "Low Potential",
    "wrong person": "Wrong Person",
    "wrong number": "Wrong Number",
    "call back": "Call Back",
    "never answer": "Never Answer",
    "no potential": "No Potential",
    "na1": "NA1",
    "na2": "NA2",
    "na3": "NA3",
  };
  return map[status] || (status ? status.charAt(0).toUpperCase() + status.slice(1) : "New");
}

function legacyStatusToStage(stage) {
  const value = String(stage || "").trim();
  const map = {
    New: "new",
    "In Line": "contacted",
    "No Answer": "no_answer",
    Deposit: "qualified",
    "Failed Deposit": "lost",
    "Didn't Register": "lost",
    "Not Interested": "lost",
    "Low Potential": "lost",
    NA1: "lost",
    NA2: "lost",
    NA3: "lost",
    "Never Answer": "no_answer",
    "No Potential": "lost",
    "Wrong Person": "lost",
    "Wrong Number": "lost",
    "Call Back": "contacted",
  };
  return map[value] || (value ? value.toLowerCase().replace(/[^a-z]+/g, "_") : "new");
}

function legacyLeadRowToChainiq(lead) {
  if (!lead) return null;
  const nameParts = splitLeadName(lead.name || "");
  return {
    id: String(lead.id),
    first_name: lead.first_name || nameParts.first_name,
    last_name: lead.last_name || nameParts.last_name,
    name: lead.name || `${nameParts.first_name} ${nameParts.last_name}`.trim(),
    email: lead.email || "",
    phone: lead.phone || "",
    country: lead.country || "",
    country_code: lead.country_code || "",
    stage: normalizeLegacyLeadStatus(lead.status || lead.stage || "new"),
    funnel: lead.funnel || "",
    affiliate: lead.affiliate || "",
    client_password: lead.client_password || "",
    kyc_status: lead.kyc_status || "Not Submitted",
    status: lead.status || "new",
    trades_enabled: lead.trades_enabled !== false,
    cards_enabled: lead.cards_enabled !== false,
    assigned_office_id: lead.assigned_office_id ?? null,
    assigned_team_id: lead.assigned_team_id ?? null,
    assigned_agent_id: lead.assigned_agent_id ?? null,
    assigned_agent_name: lead.assigned_agent_name || null,
    assigned_by: lead.assigned_by || null,
    last_comment_date: lead.last_comment_date || "",
    registered_date: lead.registered_date || lead.created_at || "",
    deleted_at: lead.deleted_at || null,
    created_at: lead.created_at,
    updated_at: lead.updated_at || lead.created_at,
    balance: lead.balance || { fiat_minor: 0, fiat_currency: "USD", btc_sat: 0, eth_wei_e9: 0, usdt_minor: 0, card_minor: 0 },
    comment_history: Array.isArray(lead.comment_history) ? lead.comment_history : [],
    status_history: Array.isArray(lead.status_history) ? lead.status_history : [],
    appointments: Array.isArray(lead.appointments) ? lead.appointments : [],
  };
}

function readLegacyLeadList() {
  return legacyGetAllLeads().map((lead) => legacyLeadRowToChainiq(lead));
}

function readLegacyLeadById(id) {
  const row = legacyGetAllLeads().find((l) => String(l.id) === String(id));
  return row ? legacyLeadRowToChainiq(row) : null;
}

function createPublicLead(body) {
  const name = String(body.name || "Anonymous Lead").trim();
  const email = String(body.email || "").trim();
  if (!name || !email) return error(400, "validation_error", "Name and email are required.");

  if (body.kind === "enquiry") {
    sharedRecordEnquiry({
      name,
      email,
      phone: body.phone || "",
      company: body.company || "",
      message: body.message || "",
      source: body.source || "website_contact",
    });
  } else {
    legacyCreateLead({
      name,
      email,
      phone: body.phone || "",
      company: body.company || "",
      message: body.message || "",
      source: body.source || "website",
      status: body.status || "new",
      score: Number(body.score ?? 50),
      notes: body.notes || "",
      visitor_id: body.visitor_id || null,
    });
  }

  const lead = readLegacyLeadList().find((row) => row.email === email) || null;
  return json(201, { ok: true, lead });
}

function updateLegacyLeadFields(id, body = {}) {
  const db = legacyGetDb();
  const updates = [];
  const values = [];

  if (body.first_name !== undefined || body.firstName !== undefined) {
    updates.push("name = ?");
    const first = (body.first_name ?? body.firstName ?? "").toString();
    const last = (body.last_name ?? body.lastName ?? "").toString();
    values.push(`${first} ${last}`.trim() || "Anonymous Lead");
  }
  if (body.last_name !== undefined || body.lastName !== undefined) {
    const current = db.prepare("SELECT name FROM leads WHERE id = ?").get(Number(id));
    const parts = String(current?.name || "").trim().split(/\s+/);
    const first = (body.first_name ?? body.firstName ?? parts[0] ?? "").toString();
    const last = (body.last_name ?? body.lastName ?? parts.slice(1).join(" ") ?? "").toString();
    updates.push("name = ?");
    values.push(`${first} ${last}`.trim() || "Anonymous Lead");
  }
  if (body.email !== undefined) {
    updates.push("email = ?");
    values.push(String(body.email));
  }
  if (body.phone !== undefined) {
    updates.push("phone = ?");
    values.push(String(body.phone));
  }
  if (body.company !== undefined) {
    updates.push("company = ?");
    values.push(String(body.company));
  }
  if (body.message !== undefined) {
    updates.push("message = ?");
    values.push(String(body.message));
  }
  if (body.country !== undefined) {
    updates.push("country = ?");
    values.push(String(body.country));
  }
  if (body.country_code !== undefined || body.countryCode !== undefined) {
    updates.push("country = ?");
    values.push(String(body.country_code ?? body.countryCode ?? ""));
  }
  if (body.stage !== undefined) {
    updates.push("status = ?");
    values.push(legacyStatusToStage(body.stage));
  }
  if (body.notes !== undefined) {
    updates.push("notes = ?");
    values.push(String(body.notes));
  }
  if (body.comment !== undefined) {
    const current = db.prepare("SELECT notes FROM leads WHERE id = ?").get(Number(id));
    const combined = [current?.notes || "", String(body.comment)].filter(Boolean).join("\n");
    updates.push("notes = ?");
    values.push(combined);
  }
  if (updates.length === 0) return readLegacyLeadById(id);

  values.push(Number(id));
  db.prepare(`UPDATE leads SET ${updates.join(", ")} WHERE id = ?`).run(...values);
  return readLegacyLeadById(id);
}

function emptyPage(key) {
  return { [key]: [], total: 0, limit: 50, offset: 0, has_more: false, hasMore: false };
}

async function handleSharedCrmAction(payload) {
  const action = payload.action;
  if (action === "mark_read" || action === "update_status" || action === "delete_thread") {
    if (!payload.threadId) return error(400, "validation_error", "Missing threadId.");
    if (action === "mark_read") markChatThreadRead(payload.threadId);
    if (action === "update_status") updateChatThreadStatus(payload.threadId, payload.status || "active");
    if (action === "delete_thread") deleteChatThread(payload.threadId);
    return json(200, { ok: true });
  }
  if (action === "login") {
    const email = String(payload.email || "").trim().toLowerCase();
    const valid = verifyAdminCredentials(email, payload.password || "");
    return valid ? json(200, { ok: true, user: { email, name: "Administrator" } }) : error(401, "invalid_credentials", "Invalid email or password.");
  }
  if (action === "change_password") {
    const email = String(payload.email || "admin@codexdynamics.com").trim().toLowerCase();
    if (!verifyAdminCredentials(email, payload.currentPassword || "")) return error(400, "invalid_password", "Current password is incorrect.");
    if (!payload.newPassword || String(payload.newPassword).length < 6) return error(400, "invalid_password", "New password must be at least 6 characters.");
    updateAdminPassword(email, payload.newPassword);
    return json(200, { ok: true, message: "Password updated successfully in the shared SQLite database." });
  }
  if (action === "save_webhook") {
    setSetting("webhook_url", payload.url || "");
    return json(200, { ok: true, message: "Webhook settings saved." });
  }
  if (action === "test_webhook") {
    const targetUrl = payload.url || getSetting("webhook_url");
    if (!targetUrl || !String(targetUrl).startsWith("http")) return error(400, "invalid_url", "Please enter a valid HTTP/HTTPS webhook URL.");
    try {
      await fetch(targetUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event: "test_ping", source: "Codex Dynamics", timestamp: new Date().toISOString() }) });
    } catch {
      // The legacy contract reports delivery attempts as successful even when the target is unavailable.
    }
    return json(200, { ok: true, message: "Webhook dispatched." });
  }

  if (action === "save_backlink" || action === "add_backlink") addBacklink(payload);
  else if (action === "update_backlink") updateBacklink(payload.id, payload);
  else if (action === "delete_backlink") deleteBacklink(payload.id);
  else if (action === "save_blog") payload.id ? updateBlogPost(payload.id, payload) : addBlogPost(payload);
  else if (action === "update_blog") updateBlogPost(payload.id, payload);
  else if (action === "toggle_blog_status") toggleBlogStatus(payload.id, payload.status);
  else if (action === "duplicate_blog") duplicateBlogPost(payload.id);
  else if (action === "delete_blog") deleteBlogPost(payload.id);
  else if (action === "save_review") addReview(payload);
  else if (action === "update_review") updateReview(payload.id, payload);
  else if (action === "toggle_review") toggleReviewPublish(payload.id, payload.is_published);
  else if (action === "delete_review") deleteReview(payload.id);
  else if (action === "save_project") addProject(payload);
  else if (action === "update_project") updateProject(payload.id, payload);
  else if (action === "toggle_project") toggleProjectPublish(payload.id, payload.is_published);
  else if (action === "delete_project") deleteProject(payload.id);
  else if (action === "delete_visitor") deleteVisitor(payload.id);
  else if (action === "bulk_delete_visitors") bulkDeleteVisitors(payload.ids || []);
  else if (action === "clear_visitors") clearVisitors(payload.olderThanDays);
  else if (action === "update_enquiry_status") updateEnquiryStatus(payload.id, payload.status);
  else if (action === "delete_enquiry") deleteEnquiry(payload.id);
  else if (action === "bulk_delete_enquiries") bulkDeleteEnquiries(payload.ids || []);
  else if (action === "add_visitor_to_leads") legacyAddVisitorToLeads(payload.visitor_id, payload.lead_data || {});
  else if (action === "create_lead") legacyCreateLead(payload);
  else if (action === "update_lead_status") legacyUpdateLeadStatus(payload.id, payload.status);
  else if (action === "update_lead_notes") legacyUpdateLeadNotes(payload.id, payload.notes);
  else if (action === "delete_lead") legacyDeleteLead(payload.id);
  else if (action === "bulk_delete_leads") bulkDeleteLeads(payload.ids || []);
  else if (action === "subscribe_blog_reader") legacyCreateLead({ name: payload.name || "Blog Reader", email: payload.email, source: "blog_reader", status: "new", score: 70, notes: `Subscribed while reading: ${payload.blog_title || payload.blog_slug || "Insights"}` });
  else if (action === "simulate_visitor") recordVisitor(payload);
  else if (action === "save_site_content") return json(200, { ok: true, config: saveSiteConfig(payload.config || payload.payload?.config || payload) });
  else if (action === "reset_site_content") return json(200, { ok: true, config: resetSiteConfig() });
  else if (action === "restore_backup") {
    try { restoreBackup(payload.backupData || payload.data || payload); } catch (err) { return error(400, "restore_failed", err.message || "Failed to restore backup."); }
  } else if (action === "upload_image") {
    const name = payload.name || payload.payload?.name || "image.jpg";
    const data = payload.data || payload.payload?.data;
    if (!data) return error(400, "invalid_upload", "No image data provided.");
    const match = String(data).match(/^data:([A-Za-z0-9-+/]+);base64,(.+)$/);
    const buffer = Buffer.from(match ? match[2] : data, "base64");
    const rawExt = name.includes(".") ? name.split(".").pop().toLowerCase() : "jpg";
    const ext = ["jpg", "jpeg", "png", "webp", "svg", "gif"].includes(rawExt) ? rawExt : "jpg";
    const filename = `img_${Date.now()}_${Math.random().toString(36).slice(2, 7)}.${ext}`;
    const uploadDir = join(process.cwd(), "public", "uploads");
    if (!existsSync(uploadDir)) mkdirSync(uploadDir, { recursive: true });
    writeFileSync(join(uploadDir, filename), buffer);
    return json(200, { ok: true, url: `/uploads/${filename}`, filename });
  } else {
    return error(400, "unknown_action", `Unknown CRM action: ${action || ""}`);
  }

  return json(200, { ok: true, ...getAllCrmData(), settings: { webhookUrl: getSetting("webhook_url") || "" } });
}

export async function handleChainiqApi({ method, path, search, headers, rawBody }) {
  const url = new URL(path + (search || ""), "http://local");
  const p = url.pathname.replace(/\/+$/, "") || "/";
  const q = url.searchParams;
  const body = parseBody(rawBody);
  method = (method || "GET").toUpperCase();

  if (p === "/api/health") return json(200, { ok: true });
  if (p === "/api/heartbeat") return json(200, { ok: true });
  if (p === "/api/visitor") return json(200, { ok: true });

  if (p === "/api/crm/data" && method === "GET") {
    return json(200, { ok: true, ...getAllCrmData(), settings: { webhookUrl: getSetting("webhook_url") || "" } });
  }
  if (p === "/api/public/content" && method === "GET") return json(200, { ok: true, ...getPublicContent() });
  if (p === "/api/public/site-config" && method === "GET") return json(200, { ok: true, config: getSiteConfig() });
  if (p === "/api/public/blog" && method === "GET") {
    const slug = q.get("slug");
    if (!slug) return error(400, "validation_error", "Missing slug parameter.");
    const post = getBlogPostBySlug(slug);
    return post ? json(200, { ok: true, post }) : error(404, "not_found", "Post not found.");
  }
  if (p === "/api/crm/action" && method === "POST") return handleSharedCrmAction(body);
  if (p === "/api/crm/chat/threads" && method === "GET") return json(200, { ok: true, threads: getChatThreads() });
  if (p === "/api/crm/chat/messages" && method === "GET") {
    const threadId = q.get("threadId");
    if (!threadId) return error(400, "validation_error", "Missing threadId parameter.");
    if (q.get("markRead") === "true") markChatThreadRead(threadId);
    return json(200, { ok: true, messages: getChatMessages(threadId) });
  }
  if (p === "/api/crm/chat/send" && method === "POST") {
    if (!body.message || !String(body.message).trim()) return error(400, "validation_error", "Message cannot be empty.");
    const result = sendChatMessage({ threadId: body.threadId, sender: body.sender || "visitor", senderName: body.senderName, message: String(body.message).trim(), visitorInfo: body.visitorInfo || {} });
    if (body.sender === "visitor" && body.autoReply) {
      setTimeout(() => sendChatMessage({ threadId: result.thread.id, sender: "bot", senderName: "Codex Concierge", message: "Thank you for contacting Codex Dynamics. Your message has been received." }), 600);
    }
    return json(200, { ok: true, ...result });
  }
  if (p === "/api/crm/chat/action" && method === "POST") {
    if (!body.threadId) return error(400, "validation_error", "Missing threadId.");
    if (body.action === "mark_read") markChatThreadRead(body.threadId);
    else if (body.action === "update_status") updateChatThreadStatus(body.threadId, body.status || "active");
    else if (body.action === "delete_thread") deleteChatThread(body.threadId);
    else return error(400, "unknown_action", "Unknown chat action.");
    return json(200, { ok: true });
  }
  if (p === "/api/crm/chat" && method === "GET") return json(200, { ok: true, threads: getChatThreads() });
  if (p.startsWith("/api/crm/chat/") && method === "GET") return json(200, { ok: true, messages: getChatMessages(p.split("/").pop()) });

  // Public site capture enters the same shared database as ChainIQ admin.
  if (p === "/api/chainiq/leads" && method === "POST") {
    return createPublicLead(body);
  }
  if (p === "/api/track-visitor") {
    if (method !== "POST") return error(405, "method_not_allowed", "POST required.");
    recordVisitor(body);
    return json(200, { ok: true, status: "tracked" });
  }
  if (p === "/api/submit-enquiry" && method === "POST") {
    if (!body.name || !body.email || !body.message) return error(400, "validation_error", "Name, email and message are required.");
    sharedRecordEnquiry(body);
    return json(200, { ok: true, message: "Enquiry saved successfully into the shared SQLite database." });
  }

  if (p === "/api/platform/settings" && method === "GET") {
    return json(200, { settings: getChainiqPlatformSettings() });
  }
  if (p === "/api/market/tradfi" && method === "GET") {
    return json(200, { assets: [] });
  }
  if (p === "/api/market/crypto" && method === "GET") {
    return json(200, { assets: [] });
  }
  if (p === "/api/market/crypto-sparklines" && method === "GET") {
    return json(200, { sparklines: {} });
  }

  // ---- admin auth ----
  if (p === "/api/admin/login" && method === "POST") {
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");
    const admin = findChainiqStaffByEmail(email);
    if (!admin || admin.password !== password) return error(401, "invalid_credentials", "email or password is incorrect");
    if (admin.status !== "Active") return error(403, "account_disabled", "this account is not active");
    admin.last_login_at = nowIso();
    const token = issueToken("admin", admin);
    return json(200, {
      token,
      token_type: "Bearer",
      expires_in: 8 * 3600,
      csrf: "preview-csrf",
      admin: publicAdmin(admin),
    });
  }
  if (p === "/api/admin/logout" && method === "POST") return json(200, { ok: true });

  if (p === "/api/client/login" && method === "POST") {
    const email = String(body.email || "").toLowerCase().trim();
    const password = String(body.password || "");
    const user = readLegacyLeadList().find(
      (l) => l.email.toLowerCase() === email && password === "client123",
    );
    if (!user) return error(401, "invalid_credentials", "email or password is incorrect");
    const token = issueToken("client", user);
    return json(200, {
      token,
      token_type: "Bearer",
      expires_in: 8 * 3600,
      csrf: "preview-csrf",
      user: clientUser(user),
      balances: user.balance,
    });
  }

  if (p === "/api/client/signup-request" && method === "POST") {
    const row = {
      id: uid("sr"),
      name: body.name,
      email: body.email,
      password: body.password,
      status: "pending",
      created_at: nowIso(),
    };
    setChainiqResource("signup_requests", [
      ...getChainiqResource("signup_requests", []),
      row,
    ]);
    return json(200, { ok: true, request: row });
  }
  if (p === "/api/client/signup-request/status") {
    return json(200, { status: "pending" });
  }

  if (p.startsWith("/api/client/")) {
    const user = authClient(headers);
    if (p === "/api/client/me") {
      if (!user) return error(401, "unauthorized", "Not signed in.");
      return json(200, { user: clientUser(user), balances: user.balance });
    }
    if (!user) return error(401, "unauthorized", "Not signed in.");
    if (p === "/api/client/workspace" && method === "GET") {
      return json(200, { workspace: getClientWorkspace(user.id) });
    }
    if (p === "/api/client/workspace/request" && method === "POST") {
      const workspace = getClientWorkspace(user.id);
      const request = { id: uid("req"), type: body.type || "enquiry", service: body.service || "", message: body.message || "", status: "open", created_at: nowIso() };
      workspace.requests = [...workspace.requests, request];
      saveClientWorkspace(user.id, workspace);
      return json(201, { request });
    }
    if (!user && method !== "GET") {
      // some client GETs still need auth
    }
    if (p === "/api/client/logout" || p === "/api/client/logout-everywhere") return json(200, { ok: true });
    if (p === "/api/client/transactions") return json(200, { transactions: getChainiqResource("transactions", []).filter((t) => t.user_id === user?.id) });
    if (p === "/api/client/cards") return json(200, { cards: getChainiqResource("cards", []).filter((c) => c.user_id === user?.id) });
    if (p === "/api/client/notifications") return json(200, { notifications: getChainiqResource("client_notifications", []).filter((item) => item.user_id === user.id) });
    if (p === "/api/client/messages" && method === "GET") return json(200, { messages: getChainiqResource("client_messages", []).filter((item) => item.user_id === user.id) });
    if (p === "/api/client/messages" && method === "POST") {
      const message = { id: uid("msg"), user_id: user.id, text: String(body.body || body.text || body.message || ""), sender: "client", created_at: nowIso(), read_at: null };
      setChainiqResource("client_messages", [...getChainiqResource("client_messages", []), message]);
      return json(201, { message });
    }
    if (p === "/api/client/withdrawals") return json(200, { withdrawals: [] });
    if (p === "/api/client/deposit-requests") return json(200, { requests: [] });
    if (p === "/api/client/kyc") return json(200, { kyc: { status: user?.kyc_status || "Not Submitted" } });
    if (p === "/api/client/kyc/profile") return json(200, { profile: {} });
    if (p === "/api/client/preferences") return json(200, { preferences: {} });
    if (p === "/api/client/appointments") return json(200, { appointments: [] });
    if (p === "/api/client/trades") return json(200, { trades: [], orders: [] });
    if (p === "/api/client/presence") return json(200, { ok: true });
    if (method === "GET") return json(200, { ok: true });
    return json(200, { ok: true });
  }

  if (p.startsWith("/api/admin/")) {
    const admin = authAdmin(headers);
    if (p === "/api/admin/me") {
      if (!admin) return error(401, "unauthorized", "Not signed in.");
      return json(200, { admin: publicAdmin(admin), capabilities: admin.capabilities || CAPS });
    }
    if (!admin) return error(401, "unauthorized", "Not signed in.");
    refreshCounts();

    if (p === "/api/admin/settings" && method === "GET") return json(200, { settings: getChainiqPlatformSettings() });
    if (p === "/api/admin/settings" && (method === "PUT" || method === "POST")) {
      return json(200, { settings: updateChainiqPlatformSettings({ ...body, ...body.settings }) });
    }
    if (p === "/api/admin/settings/history") return json(200, { history: [] });

    if (p === "/api/admin/offices" && method === "GET") {
      const only = q.get("include_deleted") === "only";
      return json(200, { offices: listChainiqOffices({ includeDeleted: only }) });
    }
    if (p === "/api/admin/offices" && method === "POST") {
      const office = {
        id: uid("of"),
        name: body.name || "New office",
        manager_id: null,
        manager_name: body.manager_name || null,
        team_count: 0,
        agent_count: 0,
        lead_count: 0,
        created_at: nowIso(),
        deleted_at: null,
      };
      let manager = null;
      if (body.manager_name) {
        manager = {
          id: uid("adm"),
          name: body.manager_name,
          email: body.manager_email || `${uid("m")}@codexdynamics.com`,
          password: body.manager_password || "manager123",
          role: "Office Manager",
          office_id: office.id,
          office_name: office.name,
          team_id: null,
          team_name: null,
          status: "Active",
          last_login_at: null,
          created_at: nowIso(),
          lead_count: 0,
          plain_password: body.manager_password || "manager123",
          capabilities: { ...CAPS },
        };
        office.manager_id = manager.id;
        office.manager_name = manager.name;
        insertChainiqStaff(manager);
      }
      const savedOffice = insertChainiqOffice(office);
      return json(201, { office: savedOffice, manager });
    }

    if (p === "/api/admin/teams" && method === "GET") {
      const only = q.get("include_deleted") === "only";
      return json(200, { teams: listChainiqTeams({ includeDeleted: only, officeId: q.get("office_id") || "" }) });
    }
    if (p === "/api/admin/teams" && method === "POST") {
      const team = {
        id: uid("tm"),
        name: body.name || "New team",
        office_id: body.office_id,
        leader_id: null,
        leader_name: body.leader_name || null,
        max_size: body.max_size || 10,
        agent_count: 0,
        lead_count: 0,
        created_at: nowIso(),
        deleted_at: null,
      };
      let leader = null;
      if (body.leader_name) {
        leader = {
          id: uid("adm"),
          name: body.leader_name,
          email: body.leader_email || `${uid("l")}@codexdynamics.com`,
          password: body.leader_password || "leader123",
          role: "Team Leader",
          office_id: team.office_id,
          office_name: listChainiqOffices().find((o) => o.id === team.office_id)?.name,
          team_id: team.id,
          team_name: team.name,
          status: "Active",
          last_login_at: null,
          created_at: nowIso(),
          lead_count: 0,
          plain_password: body.leader_password || "leader123",
          capabilities: { ...CAPS },
        };
        team.leader_id = leader.id;
        team.leader_name = leader.name;
        insertChainiqStaff(leader);
      }
      const savedTeam = insertChainiqTeam(team);
      return json(201, { team: savedTeam, leader });
    }

    if (p === "/api/admin/staff" && method === "GET") {
      return json(200, {
        staff: listChainiqStaff().map((s) => ({
          ...s,
          password: undefined,
        })),
      });
    }
    if (p === "/api/admin/staff" && method === "POST") {
      const team = listChainiqTeams().find((t) => t.id === body.team_id);
      const row = {
        id: uid("adm"),
        name: body.name || "Agent",
        email: body.email || `${uid("a")}@codexdynamics.com`,
        password: body.password || "agent123",
        role: body.role || "Agent",
        office_id: team?.office_id || body.office_id || null,
        office_name: null,
        team_id: body.team_id || null,
        team_name: team?.name || null,
        status: "Active",
        last_login_at: null,
        created_at: nowIso(),
        lead_count: 0,
        plain_password: body.password || "agent123",
        capabilities: { ...CAPS },
      };
      const savedStaff = insertChainiqStaff(row);
      return json(201, { staff: publicAdmin(savedStaff) });
    }

    if (p === "/api/admin/leads" && method === "GET") {
      const includeDeleted = q.get("include_deleted");
      let leads = readLegacyLeadList();
      if (q.get("stage")) leads = leads.filter((l) => l.stage === q.get("stage"));
      if (q.get("office_id")) leads = leads.filter((l) => String(l.assigned_office_id ?? "") === q.get("office_id"));
      if (q.get("team_id")) leads = leads.filter((l) => String(l.assigned_team_id ?? "") === q.get("team_id"));
      if (q.get("agent_id")) leads = leads.filter((l) => String(l.assigned_agent_id ?? "") === q.get("agent_id"));
      if (q.get("search")) {
        const s = q.get("search").toLowerCase();
        leads = leads.filter((l) => `${l.name} ${l.email}`.toLowerCase().includes(s));
      }
      const limit = Number(q.get("limit") || 500);
      const offset = Number(q.get("offset") || 0);
      const slice = leads.slice(offset, offset + limit);
      const hasMore = offset + slice.length < leads.length;
      return json(200, { leads: slice, total: leads.length, limit, offset, has_more: hasMore, hasMore });
    }
    if (p === "/api/admin/leads" && method === "POST") {
      const first = body.first_name || body.firstName || "New";
      const last = body.last_name || body.lastName || "Lead";
      const legacyResult = legacyCreateLead({
        name: `${first} ${last}`.trim(),
        email: body.email || `${uid("u")}@example.com`,
        phone: body.phone || "",
        company: body.company || "",
        message: body.message || "",
        source: body.source || "manual",
        status: body.stage ? legacyStatusToStage(body.stage) : "new",
        score: Number(body.score ?? 50),
        notes: body.notes || body.comment || "",
        ip_address: body.ip_address || "",
        country: body.country || "United States",
        flag: body.flag || "🇺🇸",
        city: body.city || "",
        postal_code: body.postal_code || "",
        street: body.street || "",
        pages_viewed_count: Number(body.pages_viewed_count ?? 1),
        duration_seconds: Number(body.duration_seconds ?? 0),
      });
      const insertedId = Number(legacyResult?.lastInsertRowid ?? 0);
      const lead = insertedId ? readLegacyLeadById(insertedId) : readLegacyLeadList()[0];
      return json(201, { lead: lead || legacyLeadRowToChainiq(legacyGetAllLeads()[0]) });
    }

    const leadMatch = p.match(/^\/api\/admin\/leads\/([^/]+)(?:\/(.*))?$/);
    if (leadMatch) {
      const id = leadMatch[1];
      const rest = leadMatch[2] || "";
      const lead = readLegacyLeadById(id);
      if (!lead && rest !== "search") return error(404, "not_found", "lead not found");
      if (!rest && method === "GET") return json(200, { lead });
      if (!rest && (method === "PATCH" || method === "PUT" || method === "POST")) {
        const updatedLead = updateLegacyLeadFields(id, body);
        if (body.stage) {
          legacyUpdateLeadStatus(Number(id), legacyStatusToStage(body.stage));
        }
        if (body.notes) {
          legacyUpdateLeadNotes(Number(id), body.notes);
        }
        if (body.comment) {
          const current = readLegacyLeadById(id);
          const noteValue = [current?.notes || "", body.comment].filter(Boolean).join("\n");
          legacyUpdateLeadNotes(Number(id), noteValue);
        }
        return json(200, { lead: readLegacyLeadById(id) || updatedLead });
      }
      if (!rest && method === "DELETE") {
        legacyDeleteLead(Number(id));
        return json(200, { ok: true, deleted: true, lead: null });
      }
      if (rest === "assign") {
        const db = legacyGetDb();
        const current = db.prepare("SELECT * FROM leads WHERE id = ?").get(Number(id));
        if (!current) return error(404, "not_found", "lead not found");
        const officeId = body.assigned_office_id ?? current.assigned_office_id ?? null;
        const teamId = body.assigned_team_id ?? current.assigned_team_id ?? null;
        const agentId = body.assigned_agent_id ?? current.assigned_agent_id ?? null;
        db.prepare("UPDATE leads SET notes = ? WHERE id = ?").run(`${current.notes || ""}\nassigned → office=${officeId || ""}, team=${teamId || ""}, agent=${agentId || ""}`.trim(), Number(id));
        return json(200, { lead: readLegacyLeadById(id) });
      }
      return json(200, { lead, ok: true });
    }

    if (p === "/api/admin/pending-counts") {
      return json(200, { password_resets: 0 });
    }
    if (p === "/api/admin/status") {
      return json(200, { db_ms: 1, online_total: 2, online_staff: 1, online_clients: 1, visitor_today: 12 });
    }
    if (p === "/api/admin/sessions") return json(200, { sessions: getChainiqResource("sessions", []) });
    if (p === "/api/admin/sessions/tracked") return json(200, { sessions: [] });
    if (p === "/api/admin/notifications") return json(200, { notifications: [], unread: 0 });
    const workspaceMatch = p.match(/^\/api\/admin\/client-workspaces\/([^/]+)$/);
    if (workspaceMatch && method === "GET") {
      return json(200, { workspace: getClientWorkspace(decodeURIComponent(workspaceMatch[1])) });
    }
    if (workspaceMatch && (method === "PUT" || method === "PATCH")) {
      const current = getClientWorkspace(decodeURIComponent(workspaceMatch[1]));
      const next = { ...current, ...body };
      return json(200, { workspace: saveClientWorkspace(decodeURIComponent(workspaceMatch[1]), next) });
    }
    if (p === "/api/admin/notifications/sent-log") return json(200, { items: [], total: 0 });
    if (p === "/api/admin/messages") return json(200, { messages: [] });
    if (p === "/api/admin/messages/unread_counts") return json(200, { counts: {} });
    if (p === "/api/admin/transactions") { const transactions = getChainiqResource("transactions", []); return json(200, { transactions, total: transactions.length }); }
    if (p === "/api/admin/signup-requests") return json(200, { requests: getChainiqResource("signup_requests", []) });
    if (p === "/api/admin/password-reset-requests") return json(200, { requests: [] });
    if (p === "/api/admin/audit") { const entries = getChainiqResource("audit", []); return json(200, { entries, total: entries.length }); }

    if (method === "GET") return json(200, { ok: true, items: [], ...emptyPage("items") });
    return json(200, { ok: true });
  }

  return error(404, "not_found", `No API route for ${method} ${p}`);
}

export function headersToObject(headers) {
  const out = {};
  if (!headers) return out;
  if (typeof headers.forEach === "function") {
    headers.forEach((v, k) => {
      out[k] = v;
    });
    return out;
  }
  return { ...headers };
}
