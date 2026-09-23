import { getDb } from "./shared-site-db.mjs";

const CAPS = {
  lead_upload: true,
  create_agent: true,
  trading: true,
  balances: true,
  transactions: true,
  card_management: true,
  crypto_addresses: true,
  registrations: true,
  notifications: true,
  security: true,
  deposits: true,
  withdrawals: true,
  kyc_review: true,
};

function ensureSchema() {
  const db = getDb();
  db.exec(`
    CREATE TABLE IF NOT EXISTS chainiq_resources (
      resource_key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS chainiq_offices (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      manager_id TEXT,
      manager_name TEXT,
      created_at TEXT NOT NULL,
      deleted_at TEXT
    );
    CREATE TABLE IF NOT EXISTS chainiq_teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      office_id TEXT,
      leader_id TEXT,
      leader_name TEXT,
      max_size INTEGER DEFAULT 10,
      created_at TEXT NOT NULL,
      deleted_at TEXT
    );
    CREATE TABLE IF NOT EXISTS chainiq_staff (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password TEXT NOT NULL,
      role TEXT NOT NULL,
      office_id TEXT,
      team_id TEXT,
      status TEXT NOT NULL DEFAULT 'Active',
      last_login_at TEXT,
      created_at TEXT NOT NULL,
      plain_password TEXT,
      capabilities TEXT NOT NULL
    );
  `);

  const created = new Date().toISOString();
  const office = { id: "of_london", name: "London", managerId: "adm_om", managerName: "Olivia Manager" };
  const team = { id: "tm_alpha", name: "Alpha", officeId: office.id, leaderId: "adm_tl", leaderName: "Theo Leader" };
  db.prepare("INSERT OR IGNORE INTO chainiq_offices (id, name, manager_id, manager_name, created_at) VALUES (?, ?, ?, ?, ?)").run(office.id, office.name, office.managerId, office.managerName, created);
  db.prepare("INSERT OR IGNORE INTO chainiq_teams (id, name, office_id, leader_id, leader_name, max_size, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(team.id, team.name, team.officeId, team.leaderId, team.leaderName, 10, created);

  const insert = db.prepare("INSERT OR IGNORE INTO chainiq_staff (id, name, email, password, role, office_id, team_id, status, created_at, plain_password, capabilities) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active', ?, ?, ?)");
  insert.run("adm_sa", "Sam Super", "sarah.b@example.net", "admin123", "Super Admin", null, null, created, "admin123", JSON.stringify(CAPS));
  insert.run("adm_om", "Olivia Manager", "kevin.m@example.com", "manager123", "Office Manager", office.id, null, created, "manager123", JSON.stringify(CAPS));
  insert.run("adm_tl", "Theo Leader", "xena.w@example.org", "leader123", "Team Leader", office.id, team.id, created, "leader123", JSON.stringify(CAPS));
  insert.run("adm_ag", "Ava Agent", "hannah.h@example.com", "agent123", "Agent", office.id, team.id, created, "agent123", JSON.stringify(CAPS));

  const realAdminRow = {
    id: "adm_sa_real",
    name: "Codex Dynamics Administrator",
    email: "admin@codexdynamics.local",
    password: "Admin123!",
    role: "Super Admin",
    office_id: null,
    team_id: null,
    plain_password: "Admin123!",
    capabilities: JSON.stringify(CAPS),
  };
  insert.run(realAdminRow.id, realAdminRow.name, realAdminRow.email, realAdminRow.password, realAdminRow.role, realAdminRow.office_id, realAdminRow.team_id, created, realAdminRow.plain_password, realAdminRow.capabilities);
  db.prepare("UPDATE chainiq_staff SET name = ?, password = ?, role = ?, office_id = ?, team_id = ?, status = 'Active', plain_password = ?, capabilities = ? WHERE LOWER(email) = LOWER(?)").run(
    realAdminRow.name,
    realAdminRow.password,
    realAdminRow.role,
    realAdminRow.office_id,
    realAdminRow.team_id,
    realAdminRow.plain_password,
    realAdminRow.capabilities,
    realAdminRow.email,
  );
}

ensureSchema();

function mapStaff(row) {
  if (!row) return null;
  return {
    ...row,
    capabilities: JSON.parse(row.capabilities || "{}"),
  };
}

export function listChainiqOffices({ includeDeleted = false } = {}) {
  const db = getDb();
  const rows = db.prepare(`SELECT * FROM chainiq_offices ${includeDeleted ? "" : "WHERE deleted_at IS NULL"} ORDER BY name`).all();
  return rows.map((row) => ({
    ...row,
    manager_id: row.manager_id,
    team_count: db.prepare("SELECT COUNT(*) AS count FROM chainiq_teams WHERE office_id = ? AND deleted_at IS NULL").get(row.id).count,
    agent_count: db.prepare("SELECT COUNT(*) AS count FROM chainiq_staff WHERE office_id = ? AND role = 'Agent' AND status = 'Active'").get(row.id).count,
    lead_count: 0,
  }));
}

export function listChainiqTeams({ includeDeleted = false, officeId = "" } = {}) {
  const db = getDb();
  const clauses = includeDeleted ? [] : ["deleted_at IS NULL"];
  const values = [];
  if (officeId) { clauses.push("office_id = ?"); values.push(officeId); }
  const where = clauses.length ? `WHERE ${clauses.join(" AND ")}` : "";
  return db.prepare(`SELECT * FROM chainiq_teams ${where} ORDER BY name`).all(...values).map((row) => ({
    ...row,
    agent_count: db.prepare("SELECT COUNT(*) AS count FROM chainiq_staff WHERE team_id = ? AND role = 'Agent' AND status = 'Active'").get(row.id).count,
    lead_count: 0,
  }));
}

export function listChainiqStaff() {
  return getDb().prepare("SELECT * FROM chainiq_staff ORDER BY name").all().map(mapStaff);
}

export function findChainiqStaffByEmail(email) {
  const normalizedEmail = (email || "").trim();
  const row = getDb().prepare("SELECT * FROM chainiq_staff WHERE LOWER(email) = LOWER(?) AND status = 'Active'").get(normalizedEmail);
  if (row) return mapStaff(row);
  if (normalizedEmail.toLowerCase() === "admin@codexdynamics.local") {
    return mapStaff(getDb().prepare("SELECT * FROM chainiq_staff WHERE LOWER(email) = LOWER(?) AND status = 'Active'").get("admin@codexdynamics.local"));
  }
  return null;
}

export function findChainiqStaffById(id) {
  return mapStaff(getDb().prepare("SELECT * FROM chainiq_staff WHERE id = ? AND status = 'Active'").get(id));
}

export function insertChainiqStaff(row) {
  getDb().prepare("INSERT INTO chainiq_staff (id, name, email, password, role, office_id, team_id, status, created_at, plain_password, capabilities) VALUES (?, ?, ?, ?, ?, ?, ?, 'Active', ?, ?, ?)").run(row.id, row.name, row.email, row.password, row.role, row.office_id || null, row.team_id || null, row.created_at, row.plain_password || row.password, JSON.stringify(CAPS));
  return findChainiqStaffById(row.id);
}

export function insertChainiqOffice(row) {
  getDb().prepare("INSERT INTO chainiq_offices (id, name, manager_id, manager_name, created_at) VALUES (?, ?, ?, ?, ?)").run(row.id, row.name, row.manager_id || null, row.manager_name || null, row.created_at);
  return listChainiqOffices().find((office) => office.id === row.id);
}

export function insertChainiqTeam(row) {
  getDb().prepare("INSERT INTO chainiq_teams (id, name, office_id, leader_id, leader_name, max_size, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)").run(row.id, row.name, row.office_id || null, row.leader_id || null, row.leader_name || null, row.max_size || 10, row.created_at);
  return listChainiqTeams().find((team) => team.id === row.id);
}

const DEFAULT_PLATFORM_SETTINGS = {
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
};

export function getChainiqPlatformSettings() {
  const row = getDb().prepare("SELECT value FROM settings WHERE key = 'chainiq_platform_settings'").get();
  if (!row?.value) return { ...DEFAULT_PLATFORM_SETTINGS };
  try {
    return { ...DEFAULT_PLATFORM_SETTINGS, ...JSON.parse(row.value) };
  } catch {
    return { ...DEFAULT_PLATFORM_SETTINGS };
  }
}

export function updateChainiqPlatformSettings(updates) {
  const settings = { ...getChainiqPlatformSettings(), ...(updates || {}) };
  getDb().prepare("INSERT INTO settings (key, value) VALUES ('chainiq_platform_settings', ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value").run(JSON.stringify(settings));
  return settings;
}

export function getChainiqResource(key, fallback = []) {
  const row = getDb().prepare("SELECT value FROM chainiq_resources WHERE resource_key = ?").get(key);
  if (!row?.value) {
    setChainiqResource(key, fallback);
    return fallback;
  }
  try {
    return JSON.parse(row.value);
  } catch {
    return fallback;
  }
}

export function setChainiqResource(key, value) {
  getDb().prepare("INSERT INTO chainiq_resources (resource_key, value, updated_at) VALUES (?, ?, CURRENT_TIMESTAMP) ON CONFLICT(resource_key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at").run(key, JSON.stringify(value));
  return value;
}

export { CAPS };
