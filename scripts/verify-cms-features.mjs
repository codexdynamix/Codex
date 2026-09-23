import { DatabaseSync } from "node:sqlite";
import { join } from "node:path";

const API_BASE = "http://localhost:3000";

async function run() {
  console.log("=================================================");
  console.log("🚀 CODEX CMS DEEP SMOKE TEST & PERSISTENCE SUITE");
  console.log("=================================================\n");

  const results = [];
  function assert(name, condition, details = "") {
    results.push({ name, passed: Boolean(condition), details });
    console.log(`${condition ? "✅ PASS" : "❌ FAIL"}: ${name} ${details ? `(${details})` : ""}`);
  }

  // -------------------------------------------------------------
  // STEP 1: Verify Initial Site Config via Public API
  // -------------------------------------------------------------
  console.log("--- STEP 1: Fetching initial /api/public/site-config ---");
  const initRes = await fetch(`${API_BASE}/api/public/site-config`);
  assert("Initial API HTTP 200", initRes.status === 200, `status: ${initRes.status}`);
  const initJson = await initRes.json();
  assert("Initial config payload ok", initJson.ok === true && typeof initJson.config === "object");
  const initialConfig = initJson.config;

  // -------------------------------------------------------------
  // STEP 2: Comprehensive Feature Modification Payload
  // Testing all 9 user items:
  // 1) Edit text in each section even hero section
  // 2) Edit pictures (choose sections and edit pictures)
  // 3) Edit colors
  // 4) Edit emails, addresses, phone numbers and socials
  // 5) Change addresses
  // 6) Multiple contacts per social (several WhatsApp, Telegram, Viber, etc.)
  // 7) Several addresses
  // 8) Change the year
  // 9) Change the email where forms are submitted to
  // -------------------------------------------------------------
  console.log("\n--- STEP 2: Mutating all 9 requested CMS capabilities ---");

  const updatedPayload = {
    ...initialConfig,
    siteName: "CODEX QUANTUM LABS",
    // 8) Change the year:
    copyrightYear: "2027",
    // 9) Change form submission email:
    formSubmitEmail: "client-intake-2027@codexdynamics.com",
    // 3) Edit colors:
    colors: {
      primary: "#1D4ED8",
      accent: "#059669",
      background: "#0F172A",
      cardBg: "#1E293B",
      textMain: "#F8FAFC",
      textMuted: "#94A3B8",
    },
    // 1) & 2) Edit text & pictures in Hero:
    hero: {
      badge: "HERO QUANTUM",
      title: "Engineered Precision for Global Category Leaders.",
      subtitle: "Full-stack software architecture, digital products, and brand scaling loops.",
      clips: [
        {
          id: "clip-custom-1",
          label: "Quantum Engine",
          line: "Custom high-speed architecture.",
          src: "/hero/studio.mp4",
          poster: "/uploads/custom_quantum_hero.jpg",
        },
        {
          id: "clip-custom-2",
          label: "Web Platform",
          line: "Interactive web applications.",
          src: "/hero/web-dev.mp4",
          poster: "/hero/web-dev.jpg",
        },
      ],
    },
    // 1) & 2) Edit Studio text and picture:
    studio: {
      badge: "The Benchmark",
      title: "An Elite Collective of Engineers and Designers",
      subtitle: "Bespoke digital experiences built without bureaucracy or handoff friction.",
      heroImage: "/uploads/custom_studio_panorama.jpg",
      heroImageAlt: "Codex Quantum Labs HQ",
      studioCityTag: "Kyiv & San Francisco",
      studioLocationTag: "Gulliver Tower & Howard St · Open in Maps",
      principles: [
        { title: "Pure Utility", copy: "Every interaction is engineered for measurable conversion." },
        { title: "Unified System", copy: "Code, aesthetics, and marketing live in one ecosystem." },
      ],
    },
    // 1) Edit Results text & metrics:
    results: {
      badge: "Verified ROI",
      title: "Audited Metrics That Drive Real Enterprise Valuation",
      subtitle: "Speed, high-converting checkout funnels, and disciplined customer acquisition.",
      metrics: [
        { value: 320, suffix: "+", label: "Shipped Global Platforms", decimals: 0 },
        { value: 7.2, suffix: "x", label: "Average Campaign ROAS", decimals: 1 },
        { value: 18, suffix: " days", label: "Sprint Turnaround", decimals: 0 },
      ],
    },
    // 4) & 6) Multiple contacts per social (several whatsapp, telegram, viber, phones, emails, instagram, facebook):
    socialContacts: [
      {
        id: "wa-primary",
        type: "whatsapp",
        label: "Executive WhatsApp",
        value: "+380 63 999 1122",
        href: "https://wa.me/380639991122",
        isPrimary: true,
      },
      {
        id: "wa-secondary",
        type: "whatsapp",
        label: "Client Support WhatsApp 2",
        value: "+1 415 555 7890",
        href: "https://wa.me/14155557890",
        isPrimary: false,
      },
      {
        id: "ph-1",
        type: "phone",
        label: "Direct Desk Phone",
        value: "+380 44 222 3344",
        href: "tel:+380442223344",
        isPrimary: true,
      },
      {
        id: "ph-2",
        type: "phone",
        label: "US Inbound Toll-Free",
        value: "+1 (800) 555-0199",
        href: "tel:+18005550199",
        isPrimary: false,
      },
      {
        id: "tg-1",
        type: "telegram",
        label: "Official Telegram",
        value: "@codexquantum",
        href: "https://t.me/codexquantum",
        isPrimary: true,
      },
      {
        id: "tg-2",
        type: "telegram",
        label: "Telegram Support Channel 2",
        value: "@codexsupport",
        href: "https://t.me/codexsupport",
        isPrimary: false,
      },
      {
        id: "vb-1",
        type: "viber",
        label: "Viber Desk Line 1",
        value: "+380639991122",
        href: "viber://chat?number=%2B380639991122",
        isPrimary: true,
      },
      {
        id: "vb-2",
        type: "viber",
        label: "Viber Desk Line 2",
        value: "+14155557890",
        href: "viber://chat?number=%2B14155557890",
        isPrimary: false,
      },
      {
        id: "em-1",
        type: "email",
        label: "Managing Partner Desk",
        value: "partner@codexquantum.com",
        href: "mailto:partner@codexquantum.com",
        isPrimary: true,
      },
      {
        id: "em-2",
        type: "email",
        label: "Technical RFPs",
        value: "rfp@codexquantum.com",
        href: "mailto:rfp@codexquantum.com",
        isPrimary: false,
      },
      {
        id: "ig-1",
        type: "instagram",
        label: "Instagram Official",
        value: "@codex.quantum",
        href: "https://www.instagram.com/codex.quantum/",
        isPrimary: true,
      },
      {
        id: "fb-1",
        type: "facebook",
        label: "Facebook Page",
        value: "Codex Quantum",
        href: "https://www.facebook.com/codexquantum",
        isPrimary: true,
      },
    ],
    // 5) & 7) Several physical addresses:
    addresses: [
      {
        id: "addr-sf",
        label: "San Francisco Flagship Studio",
        street: "500 Howard Street, Suite 400",
        city: "San Francisco, CA 94105",
        fullAddress: "500 Howard St, San Francisco, CA 94105, United States",
        lat: 37.7885,
        lng: -122.3985,
        isPrimary: true,
      },
      {
        id: "addr-kyiv",
        label: "Kyiv Engineering Tower",
        street: "Sportyvna Square 1a, Tower A",
        city: "Kyiv, 01023",
        fullAddress: "Sportyvna Square 1a, Gulliver Tower A, Kyiv, Ukraine",
        lat: 50.4385,
        lng: 30.5235,
        isPrimary: false,
      },
      {
        id: "addr-ldn",
        label: "London Client Center",
        street: "100 Bishopsgate, 19th Floor",
        city: "London EC2N 4AG",
        fullAddress: "100 Bishopsgate, London EC2N 4AG, United Kingdom",
        lat: 51.5155,
        lng: -0.0825,
        isPrimary: false,
      },
    ],
  };

  // -------------------------------------------------------------
  // STEP 3: Dispatch POST /api/crm/action with save_site_content
  // -------------------------------------------------------------
  console.log("--- STEP 3: Sending POST /api/crm/action (save_site_content) ---");
  const saveRes = await fetch(`${API_BASE}/api/crm/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      action: "save_site_content",
      payload: { config: updatedPayload },
    }),
  });

  assert("Save Action HTTP 200", saveRes.status === 200, `status: ${saveRes.status}`);
  const saveJson = await saveRes.json();
  assert("Save Action returns ok: true", saveJson.ok === true);
  assert("Save Action returned updated siteName", saveJson.config?.siteName === "CODEX QUANTUM LABS");

  // -------------------------------------------------------------
  // STEP 4: Verify via GET /api/public/site-config (Live Consistency)
  // -------------------------------------------------------------
  console.log("\n--- STEP 4: Verifying Live Consistency from /api/public/site-config ---");
  const liveRes = await fetch(`${API_BASE}/api/public/site-config`);
  const liveJson = await liveRes.json();
  const c = liveJson.config;

  assert("1) Text: Hero title updated", c.hero?.title === "Engineered Precision for Global Category Leaders.");
  assert("1) Text: Studio title updated", c.studio?.title === "An Elite Collective of Engineers and Designers");
  assert("1) Text: Results title updated", c.results?.title === "Audited Metrics That Drive Real Enterprise Valuation");
  assert("2) Pictures: Hero clip poster updated", c.hero?.clips?.[0]?.poster === "/uploads/custom_quantum_hero.jpg");
  assert("2) Pictures: Studio image updated", c.studio?.heroImage === "/uploads/custom_studio_panorama.jpg");
  assert("3) Colors: Primary color updated", c.colors?.primary === "#1D4ED8");
  assert("3) Colors: Accent color updated", c.colors?.accent === "#059669");
  assert("3) Colors: Background color updated", c.colors?.background === "#0F172A");
  assert("4) & 6) Socials: 2 WhatsApp numbers present", c.socialContacts?.filter((s) => s.type === "whatsapp").length === 2);
  assert("4) & 6) Socials: 2 Telegram contacts present", c.socialContacts?.filter((s) => s.type === "telegram").length === 2);
  assert("4) & 6) Socials: 2 Viber contacts present", c.socialContacts?.filter((s) => s.type === "viber").length === 2);
  assert("4) & 6) Socials: 2 Phone lines present", c.socialContacts?.filter((s) => s.type === "phone").length === 2);
  assert("4) & 6) Socials: 2 Email contacts present", c.socialContacts?.filter((s) => s.type === "email").length === 2);
  assert("4) Socials: Instagram link present", c.socialContacts?.some((s) => s.type === "instagram" && s.value === "@codex.quantum"));
  assert("4) Socials: Facebook link present", c.socialContacts?.some((s) => s.type === "facebook" && s.value === "Codex Quantum"));
  assert("5) & 7) Addresses: 3 distinct physical addresses present", c.addresses?.length === 3);
  assert("5) Addresses: San Francisco address present", c.addresses?.some((a) => a.city.includes("San Francisco")));
  assert("5) Addresses: London address present", c.addresses?.some((a) => a.city.includes("London")));
  assert("5) Addresses: Kyiv address present", c.addresses?.some((a) => a.city.includes("Kyiv")));
  assert("8) Year: Copyright year changed to 2027", c.copyrightYear === "2027");
  assert("9) Form email: Form recipient changed", c.formSubmitEmail === "client-intake-2027@codexdynamics.com");

  // -------------------------------------------------------------
  // STEP 5: Verify SQLite Database Persistence Integrity
  // -------------------------------------------------------------
  console.log("\n--- STEP 5: Verifying Raw SQLite Persistence in .data/database.sqlite ---");
  const dbPath = join(process.cwd(), ".data", "database.sqlite");
  const db = new DatabaseSync(dbPath);
  const row = db.prepare("SELECT value FROM settings WHERE key = ?").get("site_content");
  db.close();

  assert("Raw SQLite settings row exists", !!row && !!row.value);
  const dbSaved = JSON.parse(row.value);
  assert("DB Persisted: siteName matches", dbSaved.siteName === "CODEX QUANTUM LABS");
  assert("DB Persisted: copyrightYear is 2027", dbSaved.copyrightYear === "2027");
  assert("DB Persisted: formSubmitEmail matches", dbSaved.formSubmitEmail === "client-intake-2027@codexdynamics.com");
  assert("DB Persisted: 12 social contacts stored", dbSaved.socialContacts?.length === 12);
  assert("DB Persisted: 3 physical addresses stored", dbSaved.addresses?.length === 3);

  // -------------------------------------------------------------
  // STEP 6: Verify Public Site Root HTTP Response (SSR / Streamed HTML)
  // -------------------------------------------------------------
  console.log("\n--- STEP 6: Verifying Public Page HTTP response ---");
  const pageRes = await fetch(`${API_BASE}/`);
  assert("Public Page HTTP 200", pageRes.status === 200);
  const html = await pageRes.text();
  assert("HTML entry point contains streamed DOM", html.includes("<!DOCTYPE html>") && html.includes("</html>"));
  assert("HTML contains rendered layout and navigation", html.includes("<footer") && html.includes("WhatsApp"));

  // -------------------------------------------------------------
  // STEP 7: Clean Reset Test
  // -------------------------------------------------------------
  console.log("\n--- STEP 7: Reset to Default Configuration Test ---");
  const resetRes = await fetch(`${API_BASE}/api/crm/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action: "reset_site_content" }),
  });
  assert("Reset Action HTTP 200", resetRes.status === 200);
  const resetJson = await resetRes.json();
  assert("Reset Action returns ok: true", resetJson.ok === true);
  assert("Reset config restored default siteName 'Codex Dynamics'", resetJson.config?.siteName === "Codex Dynamics");

  // Re-verify raw DB reflects the reset
  const dbAfterReset = new DatabaseSync(dbPath);
  const rowAfterReset = dbAfterReset.prepare("SELECT value FROM settings WHERE key = ?").get("site_content");
  dbAfterReset.close();
  assert("DB settings row removed upon reset", !rowAfterReset);

  // Re-verify API returns default config
  const recheckRes = await fetch(`${API_BASE}/api/public/site-config`);
  const recheckJson = await recheckRes.json();
  assert("API returns default siteName after reset", recheckJson.config?.siteName === "Codex Dynamics");

  console.log("\n=================================================");
  console.log("📊 SMOKE TEST SUMMARY RESULTS");
  console.log("=================================================");
  const passedCount = results.filter((r) => r.passed).length;
  const failedCount = results.filter((r) => !r.passed).length;
  console.log(`Total Checks: ${results.length}`);
  console.log(`Passed:       ${passedCount}`);
  console.log(`Failed:       ${failedCount}`);

  if (failedCount > 0) {
    console.error("\n❌ Some tests failed!");
    process.exit(1);
  } else {
    console.log("\n🎉 ALL 9 CMS CAPABILITIES SMOKE TESTED & PERSISTENCE FULLY VERIFIED!");
    process.exit(0);
  }
}

run().catch((err) => {
  console.error("Test execution failed:", err);
  process.exit(1);
});
