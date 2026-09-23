import assert from "node:assert/strict";
import { test } from "node:test";
import { handleChainiqApi } from "../server/chainiq-api.mjs";
import { getDb, getAllLeads } from "../server/chainiq-site-db.mjs";

const login = async ({ email, password } = { email: "sarah.b@example.net", password: "admin123" }) => {
  const result = await handleChainiqApi({
    method: "POST",
    path: "/api/admin/login",
    rawBody: JSON.stringify({ email, password }),
    headers: {},
  });
  assert.equal(result.status, 200, "admin login should work");
  return result.body.token;
};

test("ChainIQ leads use the shared site database for admin CRUD", async () => {
  const before = getAllLeads().length;
  const token = await login();

  const created = await handleChainiqApi({
    method: "POST",
    path: "/api/admin/leads",
    rawBody: JSON.stringify({
      first_name: "Ada",
      last_name: "Lovelace",
      email: "ada.lovelace@example.com",
      phone: "+44 20 7946 0958",
      stage: "New",
      country: "United Kingdom",
      funnel: "Retail",
    }),
    headers: { Authorization: `Bearer ${token}` },
  });

  assert.equal(created.status, 201, "lead should be created");
  const createdLead = created.body.lead;
  assert.ok(createdLead, "ChainIQ API should return a created lead");
  assert.equal(typeof createdLead.id, "string", "ChainIQ lead IDs should be UI-safe strings");
  assert.equal(createdLead.email, "ada.lovelace@example.com");

  const legacyAfterCreate = getAllLeads();
  assert.ok(legacyAfterCreate.some((lead) => lead.email === "ada.lovelace@example.com"), "legacy DB should store the created lead");

  const listed = await handleChainiqApi({
    method: "GET",
    path: "/api/admin/leads?search=ada.lovelace@example.com",
    headers: { Authorization: `Bearer ${token}` },
  });
  assert.equal(listed.status, 200, "list endpoint should respond");
  assert.ok((listed.body.leads || []).some((lead) => lead.email === "ada.lovelace@example.com"), "search result should include the created lead");

  const updated = await handleChainiqApi({
    method: "PATCH",
    path: `/api/admin/leads/${createdLead.id}`,
    rawBody: JSON.stringify({ stage: "Deposit", comment: "Followed up" }),
    headers: { Authorization: `Bearer ${token}` },
  });

  assert.equal(updated.status, 200, "patch should update lead");
  assert.equal(updated.body.lead.stage, "Deposit");

  const row = getDb().prepare("SELECT * FROM leads WHERE id = ?").get(Number(createdLead.id));
  assert.ok(row, "legacy row should still exist");
  assert.equal(row.status, "qualified", "legacy status should reflect stage conversion");

  const deleted = await handleChainiqApi({
    method: "DELETE",
    path: `/api/admin/leads/${createdLead.id}`,
    headers: { Authorization: `Bearer ${token}` },
  });

  assert.equal(deleted.status, 200, "delete should acknowledge the lead");
  assert.equal(getAllLeads().length, before + 0, "delete should remove the legacy lead");
});

test("public ChainIQ capture writes one shared enquiry and lead record", async () => {
  const email = `public-${Date.now()}@example.com`;
  const beforeLeads = getDb().prepare("SELECT COUNT(*) AS count FROM leads WHERE email = ?").get(email).count;
  const beforeEnquiries = getDb().prepare("SELECT COUNT(*) AS count FROM enquiries WHERE email = ?").get(email).count;

  const result = await handleChainiqApi({
    method: "POST",
    path: "/api/chainiq/leads",
    rawBody: JSON.stringify({
      kind: "enquiry",
      name: "Public Contact",
      email,
      message: "A shared database test enquiry.",
      source: "website_contact_form",
    }),
    headers: {},
  });

  assert.equal(result.status, 201);
  assert.equal(getDb().prepare("SELECT COUNT(*) AS count FROM leads WHERE email = ?").get(email).count, beforeLeads + 1);
  assert.equal(getDb().prepare("SELECT COUNT(*) AS count FROM enquiries WHERE email = ?").get(email).count, beforeEnquiries + 1);

  getDb().prepare("DELETE FROM enquiries WHERE email = ?").run(email);
  getDb().prepare("DELETE FROM leads WHERE email = ?").run(email);
});

test("ChainIQ admin organization and settings are persisted in the shared database", async () => {
  const token = await login();
  const offices = await handleChainiqApi({
    method: "GET",
    path: "/api/admin/offices",
    headers: { Authorization: `Bearer ${token}` },
  });
  const staff = await handleChainiqApi({
    method: "GET",
    path: "/api/admin/staff",
    headers: { Authorization: `Bearer ${token}` },
  });
  const settings = await handleChainiqApi({
    method: "POST",
    path: "/api/admin/settings",
    rawBody: JSON.stringify({ supportEmail: "shared@example.com" }),
    headers: { Authorization: `Bearer ${token}` },
  });

  assert.equal(offices.status, 200);
  assert.ok((offices.body.offices || []).length > 0);
  assert.equal(staff.status, 200);
  assert.ok((staff.body.staff || []).some((row) => row.email === "sarah.b@example.net"));
  assert.equal(settings.body.settings.supportEmail, "shared@example.com");
  assert.equal(getDb().prepare("SELECT value FROM settings WHERE key = 'chainiq_platform_settings'").get().value.includes("shared@example.com"), true);
});
