import { chromium } from "playwright";

const urls = [
  "http://127.0.0.1:3000/admin",
  "http://127.0.0.1:3000/admin/login",
  "http://127.0.0.1:3000/admin/login/super-admin",
  "http://127.0.0.1:3000/admin/login/office-manager",
  "http://127.0.0.1:3000/admin/login/team-leader",
  "http://127.0.0.1:3000/admin/login/agent",
  "http://127.0.0.1:3000/admin/staff-login",
  "http://127.0.0.1:3000/login",
  "http://127.0.0.1:3000/client",
];

async function testAll() {
  const browser = await chromium.launch();
  for (const url of urls) {
    const page = await browser.newPage();
    const logs = [];
    page.on("console", (msg) => logs.push({ type: msg.type(), text: msg.text() }));
    page.on("pageerror", (err) => logs.push({ type: "pageerror", text: err.message }));

    try {
      await page.goto(url, { waitUntil: "domcontentloaded", timeout: 8000 });
      await page.waitForTimeout(1500);
      const text = await page.innerText("body");
      const isBlank = !text || text.trim().length === 0;
      console.log(`URL: ${url}`);
      console.log(`  Final URL: ${page.url()}`);
      console.log(`  Is blank: ${isBlank}`);
      console.log(`  Body length: ${text.length}`);
      console.log(`  Snippet: ${text.slice(0, 100).replace(/\n/g, " ")}`);
      const errors = logs.filter((l) => l.type === "pageerror");
      if (errors.length) console.log(`  Page errors:`, errors);
    } catch (e) {
      console.log(`URL: ${url} -> ERROR:`, e.message);
    } finally {
      await page.close();
    }
  }
  await browser.close();
}

testAll().catch(console.error);
